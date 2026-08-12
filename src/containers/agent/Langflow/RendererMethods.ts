import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  DataSection,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager, getPythonCommandByOs, isWin, parseCustomArg} from '../../../utils/crossUtils';
import {getArgumentType, isValidArg, removeEscapes, replaceAddress} from '../../../utils/rendererUtils';
import langflowArguments from './Arguments';

const INSTALL_TIME_KEY = 'install-time-langflow';
const UPDATE_TIME_KEY = 'update-time-langflow';
const UPDATE_AVAILABLE_KEY = 'update-available-version-langflow';

function checkLinuxArgLine(line: string): 'set' | 'export' | 'var' | undefined {
  if (isWin && line.startsWith('set ')) return 'set';

  if (line.startsWith('export ')) return 'export';

  for (const arg of langflowArguments) {
    if (arg.category === 'General') {
      if ((arg as DataSection).sections[0].items.find(item => item.name === line.split('=')[0])) {
        return 'var';
      }
    }
  }

  return undefined;
}

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines: string = '';
  let cmArgs: string = '';

  args.forEach(arg => {
    if (arg.custom) {
      const res = parseCustomArg(arg);
      if (!res) return;

      if (res.line) lines += res.line + '\n';
      if (res.commandArg) cmArgs += res.commandArg + ' ';
    } else {
      if (arg.name === 'PORT') {
        cmArgs += `--port ${arg.value} `;
        return;
      }
      if (arg.name === 'HOST') {
        cmArgs += `--host ${arg.value} `;
        return;
      }
      if (arg.name.startsWith('--')) {
        if (getArgumentType(arg.name, langflowArguments) === 'CheckBox') {
          if (arg.value !== 'false') {
            cmArgs += `${arg.name} `;
          }
        } else {
          cmArgs += `${arg.name} ${arg.value} `;
        }
        return;
      }

      if (getArgumentType(arg.name, langflowArguments) === 'CheckBox') {
        const eWinResult: string = `set ${arg.name}=true\n`;
        const eResult: string = `export ${arg.name}="true"\n`;
        result += isWin ? eWinResult : eResult;
      } else {
        const eWinResult: string = `set ${arg.name}=${arg.value}\n`;
        const eResult: string = `export ${arg.name}="${arg.value}"\n`;
        result += isWin ? eWinResult : eResult;
      }
    }
  });

  if (lines) result += lines + '\n';

  cmArgs = cmArgs.trim();
  result += `langflow run${cmArgs ? ' ' + cmArgs : ''}`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('#') || line.startsWith('REM') || line.startsWith('@echo')) {
      return;
    }

    if (line.includes('langflow run')) {
      const clArg: string = line.split('langflow run')[1]?.trim();
      if (!clArg) return;

      const clArgs: string[] = clArg.split('--').filter(Boolean);

      clArgs.forEach((arg: string): void => {
        const [id, ...valueParts] = arg.trim().split(' ');
        const name = `--${id}`;
        const value = valueParts.join(' ').replace(/"/g, '');

        if (isValidArg(name, langflowArguments)) {
          if (getArgumentType(name, langflowArguments) === 'CheckBox') {
            argResult.push({name, value: ''});
          } else {
            argResult.push({name, value});
          }
        } else if (isValidArg(id.toUpperCase(), langflowArguments)) {
          argResult.push({name: id.toUpperCase(), value});
        }
      });
    }

    const lineType = checkLinuxArgLine(line);
    if (lineType === 'export' || lineType === 'set') {
      let [name, value] = line.replace(`${lineType} `, '').split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes((value || '').trim());
      if (isValidArg(name, langflowArguments)) {
        argResult.push({name, value});
      }
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  const pipCommand = getPythonCommandByOs().pip;
  stepper.initialSteps(['Getting Started', 'Detect Existing', 'Install Langflow', 'All Done!']);
  stepper.starterStep({disableSelectDir: true}).then(() => {
    stepper.nextStep().then(() => {
      stepper.progressBar(true, 'Checking for existing Langflow installation...');
      stepper.ipc.invoke('is_langflow_installed').then((isInstalled: boolean) => {
        if (isInstalled) {
          stepper.setInstalled();
          const currentDate = new Date();
          stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
          stepper.showFinalStep('success', "You're All Set!", "Langflow is already installed. You're good to go!");
        } else {
          stepper.nextStep().then(() => {
            stepper.executeTerminalCommands([`${pipCommand} install uv`, 'uv pip install langflow']).then(() => {
              stepper.setInstalled();
              const currentDate = new Date();
              stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
              stepper.showFinalStep('success', 'Installation Complete!', 'Your Langflow environment is ready. Enjoy!');
            });
          });
        }
      });
    });
  });
}

function startUpdate(stepper: InstallationStepper) {
  stepper.initialSteps(['Update Langflow', 'Complete Update']);
  stepper.executeTerminalCommands('pip install --upgrade langflow').then(() => {
    const currentDate = new Date();
    stepper.storage.set(UPDATE_TIME_KEY, currentDate.toLocaleString());
    stepper.setUpdated();
    stepper.showFinalStep(
      'success',
      'Langflow Updated Successfully!',
      'Langflow has been updated to the latest version. You can now enjoy the new features and improvements.',
    );
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  callback.setOpenFolders(undefined);

  const descManager = new DescriptionManager(
    [
      {
        title: 'Installation Data',
        items: [
          {label: 'Install Date', result: 'loading'},
          {label: 'Update Date', result: 'loading'},
          {label: 'Current Version', result: 'loading'},
          {label: 'Latest Version', result: 'loading'},
        ],
      },
    ],
    callback,
  );

  api.storage.get(INSTALL_TIME_KEY).then(result => {
    descManager.updateItem(0, 0, result);
  });
  api.storage.get(UPDATE_TIME_KEY).then(result => {
    descManager.updateItem(0, 1, result);
  });
  api.ipc.invoke('current_langflow_version').then(result => {
    descManager.updateItem(0, 2, result);
  });
  api.storage.get(UPDATE_AVAILABLE_KEY).then(result => {
    descManager.updateItem(0, 3, result);
  });
}

function catchAddress(input: string): string | undefined {
  // eslint-disable-next-line no-control-regex
  const cleanInput = input.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
  if (cleanInput.toLowerCase().includes('[OK] Open Langflow'.toLowerCase())) return undefined;
  if (cleanInput.toLowerCase().includes('Uvicorn running on'.toLowerCase())) {
    const match = cleanInput.match(/Uvicorn running on\s+([^\s)]+)/i);
    if (match) {
      let url = match[1].replace(/[.,;:)]+$/, '');
      if (!/^https?:\/\//i.test(url)) {
        url = `http://${url}`;
      }
      return replaceAddress(url);
    }
  }

  const localhostPatterns = [
    /https?:\/\/localhost(?::\d+)?/i,
    /https?:\/\/127\.0\.0\.1(?::\d+)?/i,
    /https?:\/\/0\.0\.0\.0(?::\d+)?/i,
    /https?:\/\/\[::1](?::\d+)?/i,
    /https?:\/\/(?:[\w-]+\.)*localhost(?::\d+)?/i,
  ];

  for (const pattern of localhostPatterns) {
    const match = cleanInput.match(pattern);
    if (match) {
      return replaceAddress(match[0]);
    }
  }

  return undefined;
}

const Langflow_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  parseStringToArgs,
  parseArgsToString,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default Langflow_RM;

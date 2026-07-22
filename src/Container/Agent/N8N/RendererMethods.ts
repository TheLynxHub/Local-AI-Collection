import {isEmpty} from 'lodash-es';

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  DataSection,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager, isWin, parseCustomArg} from '../../../Utils/CrossUtils';
import {catchAddress, getArgumentType, isValidArg, removeEscapes} from '../../../Utils/RendererUtils';
import n8nArguments from './Arguments';

const INSTALL_TIME_KEY = 'install-time-n8n';
const UPDATE_TIME_KEY = 'update-time-n8n';
const UPDATE_AVAILABLE_KEY = 'update-available-version-n8n';

function checkLinuxArgLine(line: string): 'set' | 'export' | 'var' | undefined {
  if (isWin && line.startsWith('set ')) return 'set';

  if (line.startsWith('export ')) return 'export';

  for (const arg of n8nArguments) {
    if (arg.category === 'Environment') {
      if ((arg as DataSection).sections[0].items.find(item => item.name === line.split('=')[0])) {
        return 'var';
      } else {
        return undefined;
      }
    }
  }

  return undefined;
}

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines: string = '';
  let argResult: string = '';

  args.forEach(arg => {
    if (arg.custom) {
      const result = parseCustomArg(arg);
      if (!result) return;

      if (result.line) lines += result.line + '\n';
      if (result.commandArg) argResult += result.commandArg + ' ';
    } else {
      if (getArgumentType(arg.name, n8nArguments) === 'CheckBox') {
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

  result += isEmpty(argResult) ? `\nn8n start` : `\nn8n start ${argResult}`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('#')) {
      return;
    }

    const lineType = checkLinuxArgLine(line);
    if (lineType === 'export' || lineType === 'set') {
      let [name, value] = line.replace(`${lineType} `, '').split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());
      if (isValidArg(name, n8nArguments)) {
        argResult.push({name, value});
      }
    } else if (checkLinuxArgLine(line) === 'var') {
      let [name, value] = line.split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());
      if (isValidArg(name, n8nArguments)) {
        argResult.push({name, value});
      }
    }
  });

  return argResult;
}

// TODO: support selecting available versions or @next
function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['Getting Started', 'Checking NodeJS', 'Detect Existing', 'Install N8N', 'All Done!']);
  stepper.starterStep({disableSelectDir: true}).then(() => {
    stepper.nextStep().then(() => {
      stepper.progressBar(true, 'Checking if NPM is installed...');
      stepper.ipc.invoke('is_npm_available').then((isNpmInstalled: boolean) => {
        if (isNpmInstalled) {
          stepper.nextStep().then(() => {
            stepper.progressBar(true, 'Checking for existing N8N installation...');
            stepper.ipc.invoke('is_n8n_installed').then((isN8nInstalled: boolean) => {
              if (isN8nInstalled) {
                stepper.setInstalled();
                const currentDate = new Date();
                stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
                stepper.showFinalStep('success', "You're All Set!", "N8N is already installed. You're good to go!");
              } else {
                stepper.nextStep().then(() => {
                  stepper.ipc.invoke('is_npm_version_above_12').then((isAbove12: boolean) => {
                    const flags = isAbove12 ? ' --allow-remote=all --dangerously-allow-all-scripts' : '';
                    stepper.executeTerminalCommands(`npm i -g n8n${flags}`).then(() => {
                      stepper.setInstalled();
                      const currentDate = new Date();
                      stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
                      stepper.showFinalStep(
                        'success',
                        'Installation Complete!',
                        'Your N8N environment is ready. Enjoy!',
                      );
                    });
                  });
                });
              }
            });
          });
        } else {
          stepper.showFinalStep(
            'error',
            'NodeJs is not installed!',
            'N8N need NPM! Please install NodeJs then try again.',
          );
        }
      });
    });
  });
}

function startUpdate(stepper: InstallationStepper) {
  stepper.initialSteps(['Update N8N', 'Complete Update']);
  stepper.executeTerminalCommands('npm -g update n8n').then(() => {
    const currentDate = new Date();
    stepper.storage.set(UPDATE_TIME_KEY, currentDate.toLocaleString());
    stepper.setUpdated();
    stepper.showFinalStep(
      'success',
      'N8N Updated Successfully!',
      `N8N has been updated to the latest version. You can now enjoy the new features and improvements.`,
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
  api.ipc.invoke('current_n8n_version').then(result => {
    descManager.updateItem(0, 2, result);
  });
  api.storage.get(UPDATE_AVAILABLE_KEY).then(result => {
    descManager.updateItem(0, 3, result);
  });
}

const N8N_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  parseStringToArgs,
  parseArgsToString,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default N8N_RM;

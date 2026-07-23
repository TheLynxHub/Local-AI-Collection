import {isEmpty} from 'lodash-es';

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager, isWin} from '../../../Utils/CrossUtils';
import {getArgumentType, isValidArg, removeEscapes} from '../../../Utils/RendererUtils';
import hermesAgentArguments from './Arguments';

const INSTALL_TIME_KEY = 'install-time-hermesAgent';
const UPDATE_TIME_KEY = 'update-time-hermesAgent';
const UPDATE_AVAILABLE_KEY = 'update-available-version-hermesAgent';

function checkEnvLine(line: string): 'set' | 'export' | 'var' | undefined {
  if (isWin && line.startsWith('set ')) return 'set';

  if (line.startsWith('export ')) return 'export';

  const varName = line.split('=')[0].trim();
  for (const arg of hermesAgentArguments) {
    if (arg.category === 'Environment Variables' && 'sections' in arg) {
      for (const section of arg.sections) {
        if (section.items.some(item => item.name === varName)) {
          return 'var';
        }
      }
    }
  }

  return undefined;
}

function getArgumentInfo(argName: string): {category: string; type: string; name: string} | undefined {
  for (const data of hermesAgentArguments) {
    if ('sections' in data) {
      for (const section of data.sections) {
        for (const item of section.items) {
          const flag = item.name.split(' ')[0];
          if (flag === argName) {
            return {category: data.category, type: item.type, name: item.name};
          }
        }
      }
    }
  }
  return undefined;
}

export function parseArgsToFiles(args: ChosenArgument[]): {scriptData: string; settingsData: string} {
  const executeCommand = 'hermes';

  const envArgs: ChosenArgument[] = [];
  const cliArgs: ChosenArgument[] = [];
  const settingsArgs: ChosenArgument[] = [];

  args.forEach(arg => {
    const info = getArgumentInfo(arg.name.split(' ')[0]) || getArgumentInfo(arg.name);

    if (info) {
      switch (info.category) {
        case 'Environment Variables':
          envArgs.push(arg);
          break;
        case 'Command Line Arguments':
          cliArgs.push(arg);
          break;
        case 'Settings':
          settingsArgs.push(arg);
          break;
        default:
          break;
      }
    }
  });

  let scriptString = '';

  if (envArgs.length > 0) {
    envArgs.forEach(arg => {
      scriptString += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
    });
    scriptString += '\n\n';
  }

  scriptString += executeCommand;

  cliArgs.forEach(arg => {
    const info = getArgumentInfo(arg.name.split(' ')[0]) || getArgumentInfo(arg.name);
    if (!info) return;

    const flagName = info.name.split(' ')[0];
    if (info.type === 'CheckBox') {
      if (
        arg.value !== 'false' &&
        (arg.value as any) !== false &&
        (arg.value as any) !== 0 &&
        String(arg.value) !== '0'
      ) {
        scriptString += ` ${flagName}`;
      }
    } else if (arg.value !== undefined && arg.value !== null && String(arg.value).trim() !== '') {
      scriptString += ` ${flagName} "${arg.value}"`;
    }
  });

  scriptString += '\n';

  let settingsString = '';
  const settingsJson: any = {};

  if (settingsArgs.length > 0) {
    settingsArgs.forEach(arg => {
      const keys = arg.name.split('.');
      let current = settingsJson;

      keys.slice(0, -1).forEach(key => {
        current[key] = current[key] || {};
        current = current[key];
      });

      let value: any = arg.value;
      if (String(value) === 'true') {
        value = true;
      } else if (String(value) === 'false') {
        value = false;
      }

      current[keys[keys.length - 1]] = value;
    });

    if (!isEmpty(settingsJson)) {
      settingsString = JSON.stringify(settingsJson, null, 2);
    }
  }

  return {scriptData: scriptString, settingsData: settingsString};
}

export function parseArgsToString(args: ChosenArgument[]): string {
  const {settingsData, scriptData} = parseArgsToFiles(args);

  let scriptPreview = `-------------Script File Preview (${isWin ? '.bat' : '.sh'})-------------\n`;

  if (!isEmpty(scriptData)) {
    scriptPreview += scriptData;
  } else {
    scriptPreview += '# No environment variables or command line arguments configured.\n';
  }

  let settingsPreview = '---------------- Settings File (config.yaml) ----------------\n';
  if (!isEmpty(settingsData)) {
    settingsPreview += settingsData;
  } else {
    settingsPreview += '{\n  // No settings configured.\n}';
  }

  return `${scriptPreview}${settingsPreview}`;
}

export function parseFilesToArgs(scriptContent: string, settingsContent: string): ChosenArgument[] {
  const scriptArgs = parseStringToArgs(scriptContent);

  const settingsArgs: ChosenArgument[] = [];
  if (settingsContent) {
    try {
      const settingsJson = JSON.parse(settingsContent);

      const flatten = (obj: any, path = ''): ChosenArgument[] => {
        let result: ChosenArgument[] = [];
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newPath = path ? `${path}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
              result = result.concat(flatten(obj[key], newPath));
            } else {
              const value = typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
              result.push({name: newPath, value});
            }
          }
        }
        return result;
      };

      const flattened = flatten(settingsJson);

      flattened.forEach(arg => {
        if (isValidArg(arg.name, hermesAgentArguments)) {
          settingsArgs.push(arg);
        }
      });
    } catch (error) {
      console.error('Error parsing settings content for Hermes Agent:', error);
    }
  }

  const combinedArgs = new Map<string, string | number>();

  scriptArgs.forEach(arg => combinedArgs.set(arg.name, arg.value));
  settingsArgs.forEach(arg => combinedArgs.set(arg.name, arg.value));

  return Array.from(combinedArgs, ([name, value]) => ({name, value}));
}

export function parseStringToArgs(data: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = data.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('#')) return;

    if (line.startsWith('hermes')) {
      const clArg: string = line.substring(6).trim();
      if (!clArg) return;

      const tokenRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
      const tokens: string[] = [];
      let tokenMatch: RegExpExecArray | null;
      while ((tokenMatch = tokenRegex.exec(clArg)) !== null) {
        tokens.push(tokenMatch[1] ?? tokenMatch[2] ?? tokenMatch[3]);
      }

      for (let i = 0; i < tokens.length; i++) {
        const flag = tokens[i];
        if (!flag.startsWith('-')) continue;

        const info = getArgumentInfo(flag);
        if (!info) continue;

        const type = getArgumentType(info.name, hermesAgentArguments);
        if (type === 'CheckBox') {
          argResult.push({name: info.name, value: 'true'});
        } else {
          const nextToken = tokens[i + 1];
          if (nextToken && !nextToken.startsWith('-')) {
            argResult.push({name: info.name, value: nextToken.replace(/"/g, '')});
            i++;
          } else {
            argResult.push({name: info.name, value: ''});
          }
        }
      }
    }

    const lineType = checkEnvLine(line);
    if (lineType === 'export' || lineType === 'set') {
      let [name, value] = line.replace(`${lineType} `, '').split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());
      if (isValidArg(name, hermesAgentArguments)) {
        argResult.push({name, value});
      }
    } else if (checkEnvLine(line) === 'var') {
      let [name, value] = line.split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());
      if (isValidArg(name, hermesAgentArguments)) {
        argResult.push({name, value});
      }
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['Getting Started', 'Detect Existing', 'Hermes Agent', 'All Done!']);
  stepper.starterStep({disableSelectDir: true}).then(() => {
    stepper.nextStep().then(() => {
      stepper.progressBar(true, 'Checking for existing Hermes Agent installation...');
      stepper.ipc.invoke('is_hermes_agent_installed').then((isInstalled: boolean) => {
        if (isInstalled) {
          stepper.setInstalled();
          const currentDate = new Date();
          stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
          stepper.showFinalStep('success', "You're All Set!", 'Hermes Agent is already installed and ready to use.');
        } else {
          stepper.nextStep().then(() => {
            const installCommand = isWin
              ? 'iex (irm https://hermes-agent.nousresearch.com/install.ps1)'
              : 'curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash';
            stepper.executeTerminalCommands(installCommand).then(() => {
              stepper.setInstalled();
              const currentDate = new Date();
              stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
              stepper.showFinalStep(
                'success',
                'Installation Complete!',
                'Hermes Agent has been installed successfully.',
              );
            });
          });
        }
      });
    });
  });
}

function startUpdate(stepper: InstallationStepper) {
  stepper.initialSteps(['Update Hermes Agent', 'Complete Update']);
  stepper.executeTerminalCommands('hermes update').then(() => {
    const currentDate = new Date();
    stepper.storage.set(UPDATE_TIME_KEY, currentDate.toLocaleString());
    stepper.setUpdated();
    stepper.showFinalStep(
      'success',
      'Hermes Agent Updated Successfully!',
      'Hermes Agent has been updated to the latest available version.',
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
  api.ipc.invoke('current_hermes_agent_version').then(result => {
    descManager.updateItem(0, 2, result);
  });
  api.storage.get(UPDATE_AVAILABLE_KEY).then(result => {
    descManager.updateItem(0, 3, result);
  });
}

const HermesAgent_RM: CardRendererMethods = {
  cardInfo,
  parseStringToArgs,
  parseArgsToString,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default HermesAgent_RM;

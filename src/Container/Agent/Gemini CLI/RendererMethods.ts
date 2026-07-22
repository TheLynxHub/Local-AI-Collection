import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  DataSection,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager, isWin} from '../../../Utils/CrossUtils';
import {getArgumentType, isValidArg, removeEscapes} from '../../../Utils/RendererUtils';
import openArguments from '../../Text/OpenWebUI/Arguments';
import geminiCliArguments from './Arguments';

const INSTALL_TIME_KEY = 'install-time-geminiCli';
const UPDATE_TIME_KEY = 'update-time-geminiCli';
const UPDATE_AVAILABLE_KEY = 'update-available-version-geminiCli';

function checkLinuxArgLine(line: string): 'set' | 'export' | 'var' | undefined {
  if (isWin && line.startsWith('set ')) return 'set';

  if (line.startsWith('export ')) return 'export';

  for (const arg of geminiCliArguments) {
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

/**
 * Finds the category and type of a given argument name.
 * @param argName The name of the argument to look up.
 * @returns An object with the category and type, or undefined if not found.
 */
function getArgumentInfo(argName: string): {category: string; type: string} | undefined {
  for (const data of geminiCliArguments) {
    if ('sections' in data) {
      for (const section of data.sections) {
        for (const item of section.items) {
          if (item.name.split(' ')[0] === argName) {
            return {category: data.category, type: item.type};
          }
        }
      }
    }
  }
  return undefined;
}

export function parseArgsToFiles(args: ChosenArgument[]): {scriptData: string; settingsData: string} {
  const executeCommand = 'gemini';

  const envArgs: ChosenArgument[] = [];
  const cliArgs: ChosenArgument[] = [];
  const settingsArgs: ChosenArgument[] = [];

  // 1. Categorize arguments based on their definition in Arguments.ts
  args.forEach(arg => {
    const info = getArgumentInfo(arg.name);
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
      }
    }
  });

  // 2. Build the Environment Variables script preview
  let scriptString: string = '';
  if (envArgs.length > 0) {
    envArgs.forEach(arg => {
      scriptString += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
    });
    scriptString += '\n\n';
  }

  scriptString += executeCommand;

  // 3. Build the Command Line execution preview
  cliArgs.forEach(arg => {
    const info = getArgumentInfo(arg.name);
    if (info?.type === 'CheckBox') {
      if (arg.value === 'true') {
        scriptString += ` ${arg.name}`;
      }
    } else {
      scriptString += ` ${arg.name} "${arg.value}"`;
    }
  });

  scriptString += '\n';

  // 4. Build the settings.json file preview
  let settingsString: string = '';
  const settingsJson: any = {};
  if (settingsArgs.length > 0) {
    settingsArgs.forEach(arg => {
      const keys = arg.name.split('.');
      let current = settingsJson;
      // Create nested objects if they don't exist
      keys.slice(0, -1).forEach(key => {
        current[key] = current[key] || {};
        current = current[key];
      });

      // Coerce value to the correct type (boolean, number, or string)
      let value: any = arg.value;
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      } else if (!isNaN(Number(value)) && value.trim() !== '' && !isNaN(parseFloat(value))) {
        value = Number(value);
      }

      current[keys[keys.length - 1]] = value;
    });
    settingsString += JSON.stringify(settingsJson, null, 2);
  }

  return {scriptData: scriptString, settingsData: settingsString};
}

export function parseArgsToString(args: ChosenArgument[]): string {
  const {settingsData, scriptData} = parseArgsToFiles(args);

  let envString = `-------------Script File Preview (${isWin ? '.bat' : '.sh'})-------------\n`;

  if (!isEmpty(scriptData)) {
    envString += scriptData;
  } else {
    envString += '# No environment variables or command lines configured.\n';
  }

  let settingsString = '---------------- Settings File (settings.json) ----------------\n';
  if (!isEmpty(settingsData)) {
    settingsString += settingsData;
  } else {
    settingsString += '{\n  // No settings configured.\n}';
  }

  return `${envString}${settingsString}`;
}

export function parseFilesToArgs(scriptContent: string, settingsContent: string): ChosenArgument[] {
  // 1. Parse the script content by reusing the existing function
  const scriptArgs = parseStringToArgs(scriptContent);

  // 2. Parse the settings content (json)
  const settingsArgs: ChosenArgument[] = [];
  if (settingsContent) {
    try {
      const settingsJson = JSON.parse(settingsContent);

      // Helper function to recursively flatten the JSON object
      const flatten = (obj: any, path = ''): ChosenArgument[] => {
        let result: ChosenArgument[] = [];
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newPath = path ? `${path}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
              result = result.concat(flatten(obj[key], newPath));
            } else {
              result.push({name: newPath, value: String(obj[key])});
            }
          }
        }
        return result;
      };

      const flattenedSettings = flatten(settingsJson);

      // Filter to only include valid arguments from the settings file
      flattenedSettings.forEach(arg => {
        if (isValidArg(arg.name, geminiCliArguments)) {
          settingsArgs.push(arg);
        }
      });
    } catch (error) {
      console.error('Error parsing settings.json content:', error);
    }
  }

  // 3. Combine args, with settings overriding script args for any duplicates
  const combinedArgs = new Map<string, string | number>();

  scriptArgs.forEach(arg => combinedArgs.set(arg.name, arg.value));
  settingsArgs.forEach(arg => combinedArgs.set(arg.name, arg.value));

  return Array.from(combinedArgs, ([name, value]) => ({name, value}));
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('#')) {
      return;
    }

    if (line.startsWith('gemini')) {
      const clArg: string = line.split('gemini ')[1];
      if (!clArg) return;

      const clArgs: string[] = clArg.split('--').filter(Boolean);

      const result: ArgType[] = clArgs.map((arg: string): ArgType => {
        const [id, ...value] = arg.trim().split(' ');
        return {
          name: `${id}`.toUpperCase(),
          value: value.join(' ').replace(/"/g, ''),
        };
      });

      result.forEach((value: ArgType): void => {
        if (isValidArg(value.name, openArguments)) {
          if (getArgumentType(value.name, openArguments) === 'CheckBox') {
            argResult.push({name: value.name, value: ''});
          } else {
            argResult.push({name: value.name, value: value.value});
          }
        }
      });
    }

    const lineType = checkLinuxArgLine(line);
    if (lineType === 'export' || lineType === 'set') {
      let [name, value] = line.replace(`${lineType} `, '').split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());
      if (isValidArg(name, openArguments)) {
        argResult.push({name, value});
      }
    } else if (checkLinuxArgLine(line) === 'var') {
      let [name, value] = line.split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());
      if (isValidArg(name, openArguments)) {
        argResult.push({name, value});
      }
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['Getting Started', 'NodeJS', 'Detect Existing', 'Gemini Cli', 'All Done!']);
  stepper.starterStep({disableSelectDir: true}).then(() => {
    stepper.nextStep().then(() => {
      stepper.progressBar(true, 'Checking if NPM is installed...');
      stepper.ipc.invoke('is_gemini_npm_available').then((isNpmInstalled: boolean) => {
        if (isNpmInstalled) {
          stepper.nextStep().then(() => {
            stepper.progressBar(true, 'Checking for existing Gemini Cli installation...');
            stepper.ipc.invoke('is_geminiCli_installed').then((isGeminiCliInstalled: boolean) => {
              if (isGeminiCliInstalled) {
                stepper.setInstalled();
                const currentDate = new Date();
                stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
                stepper.showFinalStep(
                  'success',
                  "You're All Set!",
                  "Gemini Cli is already installed. You're good to go!",
                );
              } else {
                stepper.nextStep().then(() => {
                  stepper.ipc.invoke('is_gemini_npm_version_above_12').then((isAbove12: boolean) => {
                    const flags = isAbove12 ? ' --allow-remote=all --dangerously-allow-all-scripts' : '';
                    stepper.executeTerminalCommands(`npm i -g @google/gemini-cli${flags}`).then(() => {
                      stepper.setInstalled();
                      const currentDate = new Date();
                      stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
                      stepper.showFinalStep(
                        'success',
                        'Installation Complete!',
                        'Your Gemini Cli environment is ready. Enjoy!',
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
            'Gemini Cli need NPM! Please install NodeJs then try again.',
          );
        }
      });
    });
  });
}

function startUpdate(stepper: InstallationStepper) {
  stepper.initialSteps(['Update Gemini Cli', 'Complete Update']);
  stepper.executeTerminalCommands('npm -g update @google/gemini-cli').then(() => {
    const currentDate = new Date();
    stepper.storage.set(UPDATE_TIME_KEY, currentDate.toLocaleString());
    stepper.setUpdated();
    stepper.showFinalStep(
      'success',
      'Gemini Cli Updated Successfully!',
      `Gemini Cli has been updated to the latest version. You can now enjoy the new features and improvements.`,
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
  api.ipc.invoke('current_geminiCli_version').then(result => {
    descManager.updateItem(0, 2, result);
  });
  api.storage.get(UPDATE_AVAILABLE_KEY).then(result => {
    descManager.updateItem(0, 3, result);
  });
}

const GeminiCli_RM: CardRendererMethods = {
  cardInfo,
  parseStringToArgs,
  parseArgsToString,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default GeminiCli_RM;

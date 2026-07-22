import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {getPythonCommandByOs, isWin, parseCustomArg} from '../../../Utils/CrossUtils';
import {CardInfo, catchAddress, getArgumentType, isValidArg} from '../../../Utils/RendererUtils';
import smartGalleryArguments from './Arguments';

const SMARTGALLERY_URL = 'https://github.com/biagiomaf/smart-comfyui-gallery';

function isEnvironmentVariable(name: string): boolean {
  for (const arg of smartGalleryArguments) {
    if (arg.category === 'Environment Variables') {
      if ('sections' in arg) {
        for (const section of arg.sections) {
          if (section.items.some(item => item.name === name)) return true;
        }
      } else if ('items' in arg) {
        return arg.items.some(item => item.name === name);
      }
    }
  }
  return false;
}

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines: string = '';
  let commandArgs: string = '';

  args.forEach(arg => {
    if (arg.custom) {
      const result = parseCustomArg(arg);
      if (!result) return;

      if (result.line) lines += result.line + '\n';
      if (result.commandArg) commandArgs += result.commandArg + ' ';
    } else {
      if (isEnvironmentVariable(arg.name)) {
        const argType = getArgumentType(arg.name, smartGalleryArguments);
        if (argType === 'CheckBox') {
          lines += isWin ? `set ${arg.name}=true\n` : `export ${arg.name}="true"\n`;
        } else if (arg.value !== undefined && arg.value !== '') {
          if (isWin) {
            lines += `set ${arg.name}=${arg.value}\n`;
          } else {
            lines += `export ${arg.name}="${arg.value}"\n`;
          }
        }
      } else {
        const argType = getArgumentType(arg.name, smartGalleryArguments);
        if (argType === 'CheckBox') {
          commandArgs += `${arg.name} `;
        } else if (argType === 'File' || argType === 'Directory') {
          if (arg.value) commandArgs += `${arg.name} "${arg.value}" `;
        } else if (arg.value !== undefined && arg.value !== '') {
          commandArgs += `${arg.name} ${arg.value} `;
        }
      }
    }
  });

  if (lines) {
    result += lines + '\n';
  }

  const pythonCmd = getPythonCommandByOs().python;
  result += `${pythonCmd} smartgallery.py ${commandArgs.trim()}`.trim();

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    line = line.trim();

    // Parse Windows environment variables (set VAR=value)
    if (line.startsWith('set ')) {
      const envLine = line.substring(4);
      const [name, ...valueParts] = envLine.split('=');
      const value = valueParts.join('=').trim();
      if (name && value && isValidArg(name.trim(), smartGalleryArguments)) {
        argResult.push({name: name.trim(), value});
      }
    }

    // Parse Unix environment variables (export VAR="value" or export VAR=value)
    if (line.startsWith('export ')) {
      const envLine = line.substring(7);
      const [name, ...valueParts] = envLine.split('=');
      let value = valueParts.join('=').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (name && value && isValidArg(name.trim(), smartGalleryArguments)) {
        argResult.push({name: name.trim(), value});
      }
    }

    // Parse command line arguments
    if (line.includes('smartgallery.py')) {
      const clArgs = line.split('smartgallery.py')[1]?.trim();
      if (clArgs) {
        const rawArgs = clArgs.split('--').filter(Boolean);
        rawArgs.forEach(rawArg => {
          const [id, ...valParts] = rawArg.trim().split(' ');
          const argName = `--${id}`;
          if (isValidArg(argName, smartGalleryArguments)) {
            const argType = getArgumentType(argName, smartGalleryArguments);
            if (argType === 'CheckBox') {
              argResult.push({name: argName, value: ''});
            } else {
              const val = valParts.join(' ').replace(/"/g, '').trim();
              argResult.push({name: argName, value: val});
            }
          }
        });
      }
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  const pipCommand = getPythonCommandByOs().pip;

  stepper.initialSteps(['SmartGallery', 'Clone', 'Dependencies', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(SMARTGALLERY_URL).then(dir => {
          stepper.nextStep().then(() => {
            stepper
              .executeTerminalCommands(`${pipCommand} install -r requirements.txt`, dir)
              .then(() => {
                stepper.setInstalled(dir);
                stepper.showFinalStep(
                  'success',
                  'SmartGallery installation complete!',
                  'SmartGallery is ready to use. Configure your paths in the launch arguments and start the gallery.',
                );
              })
              .catch(() => {
                stepper.showFinalStep('error', 'Installation failed', 'Failed to install dependencies.');
              });
          });
        });
      });
    } else if (targetDirectory) {
      stepper.utils.validateGitRepository(targetDirectory, SMARTGALLERY_URL).then(isValid => {
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep(
            'success',
            'ComfyUI LoRA Manager located successfully!',
            'Pre-installed LoRA Manager detected. Installation skipped as your existing setup is ready to use.',
          );
        } else {
          // Validate by checking for key files
          stepper.utils.verifyFilesExist(targetDirectory, ['smartgallery.py', 'requirements.txt']).then(filesExist => {
            if (filesExist) {
              stepper.setInstalled(targetDirectory);
              stepper.showFinalStep(
                'success',
                `SmartGallery located successfully!`,
                `Detected a manual installation of SmartGallery. Note: Because this is not a Git repository,` +
                  ' automatic updates and certain version-dependent features may not work as expected.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                'Unable to locate SmartGallery!',
                'Please ensure you have selected the correct folder containing the SmartGallery installation.',
              );
            }
          });
        }
      });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(SMARTGALLERY_URL, undefined, api, callback);
}

const SMARTGALLERY_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default SMARTGALLERY_RM;

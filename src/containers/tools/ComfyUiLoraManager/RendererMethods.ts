import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {getPythonCommandByOs, isWin, parseCustomArg} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, getArgumentType, isValidArg} from '../../../utils/rendererUtils';
import loraManagerArguments from './Arguments';

const LORA_MANAGER_URL = 'https://github.com/willmiao/ComfyUI-Lora-Manager';

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines: string = '';
  let argResult: string = '';

  // Only include command line arguments (--host, --port), not settings
  args.forEach(arg => {
    if (arg.custom) {
      const result = parseCustomArg(arg);
      if (!result) return;

      if (result.line) lines += result.line + '\n';
      if (result.commandArg) argResult += result.commandArg + ' ';
    } else {
      // Skip settings that go to settings.json
      if (
        arg.name === 'civitai_api_key' ||
        arg.name === 'use_portable_settings' ||
        arg.name === 'loras_folders' ||
        arg.name === 'checkpoints_folders' ||
        arg.name === 'embeddings_folders' ||
        arg.name === 'auto_organize_exclusions'
      ) {
        return;
      }

      const argType = getArgumentType(arg.name, loraManagerArguments);
      if (argType === 'CheckBox') {
        argResult += `${arg.name} `;
      } else if (argType === 'File' || argType === 'Directory') {
        argResult += `${arg.name} "${arg.value}" `;
      } else {
        argResult += `${arg.name} ${arg.value} `;
      }
    }
  });

  if (lines) {
    result += lines + '\n';
  }

  const pythonCommand = getPythonCommandByOs().python;

  result += isEmpty(argResult) ? `${pythonCommand} standalone.py` : `${pythonCommand} standalone.py ${argResult}`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    const pythonCommand = getPythonCommandByOs().python;
    if (!line.startsWith(`${pythonCommand} standalone.py`)) return;

    const clArgs: string = line.split(`${pythonCommand} standalone.py `)[1];

    if (!clArgs) return;

    const args: string[] = clArgs.split('--').filter(Boolean);

    const result: ArgType[] = args.map((arg: string): ArgType => {
      const [id, ...value] = arg.trim().split(' ');
      return {
        name: `--${id}`,
        value: value.join(' ').replace(/"/g, ''),
      };
    });

    result.forEach((value: ArgType): void => {
      if (isValidArg(value.name, loraManagerArguments)) {
        if (getArgumentType(value.name, loraManagerArguments) === 'CheckBox') {
          argResult.push({name: value.name, value: ''});
        } else {
          argResult.push({name: value.name, value: value.value});
        }
      }
    });
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  const installReqs = (dir: string) => {
    stepper.executeTerminalCommands('pip install -r requirements.txt', dir).then(() => {
      stepper.setInstalled(dir);
      stepper.showFinalStep(
        'success',
        'ComfyUI LoRA Manager installation complete!',
        'All installation steps completed successfully. Your LoRA Manager is now ready for use. ' +
          'Configure your CivitAI API key and folder paths in the settings to get started.',
      );
    });
  };

  stepper.initialSteps(['ComfyUI LoRA Manager', 'Clone', 'Install Dependencies', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(LORA_MANAGER_URL).then(dir => {
          stepper.nextStep().then(() => {
            installReqs(dir);
          });
        });
      });
    } else if (targetDirectory) {
      stepper.utils.validateGitRepository(targetDirectory, LORA_MANAGER_URL).then(isValid => {
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep(
            'success',
            'ComfyUI LoRA Manager located successfully!',
            'Pre-installed LoRA Manager detected. Installation skipped as your existing setup is ready to use. ' +
              'Make sure to configure your settings.json with CivitAI API key and folder paths.',
          );
        } else {
          stepper.utils.verifyFilesExist(targetDirectory, ['standalone.py', 'requirements.txt']).then(filesExist => {
            if (filesExist) {
              stepper.setInstalled(targetDirectory);
              stepper.showFinalStep(
                'success',
                `ComfyUI LoRA Manager located successfully!`,
                `Detected a manual installation of ComfyUI LoRA Manager. Note: Because this is not a Git repository,` +
                  ' automatic updates and certain version-dependent features may not work as expected.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                'Unable to locate ComfyUI LoRA Manager!',
                'Please ensure you have selected the correct folder containing the LoRA Manager installation.',
              );
            }
          });
        }
      });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(LORA_MANAGER_URL, '', api, callback);
}

const LORA_MANAGER_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default LORA_MANAGER_RM;

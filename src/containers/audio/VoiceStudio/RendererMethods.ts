import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin, parseCustomArg} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, getArgumentType, isValidArg, removeEscapes} from '../../../utils/rendererUtils';
import voiceStudioArguments from './Arguments';

const VOICE_STUDIO_URL = 'https://github.com/debpalash/VoiceStudio';
const BUN_WIN_INSTALL = 'powershell -c "irm bun.sh/install.ps1|iex"';
const BUN_UNIX_INSTALL = 'curl -fsSL https://bun.com/install | bash';

function isEnvironmentVariable(name: string): boolean {
  for (const arg of voiceStudioArguments) {
    if (arg.category === 'Environment Variables') {
      if ('sections' in arg) {
        return arg.sections.some(section => section.items.some(item => item.name === name));
      }
    }
  }
  return false;
}

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let argResult: string = '';
  let lines: string = '';

  args.forEach(arg => {
    if (arg.custom) {
      const customRes = parseCustomArg(arg);
      if (!customRes) return;

      if (customRes.line) lines += customRes.line + '\n';
      if (customRes.commandArg) argResult += customRes.commandArg + ' ';
    } else {
      if (isEnvironmentVariable(arg.name)) {
        if (getArgumentType(arg.name, voiceStudioArguments) === 'CheckBox') {
          lines += isWin ? `set ${arg.name}=1\n` : `export ${arg.name}="1"\n`;
        } else {
          lines += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
        }
      } else {
        const argType = getArgumentType(arg.name, voiceStudioArguments);
        if (argType === 'CheckBox') {
          argResult += `${arg.name} `;
        } else if (argType === 'File' || argType === 'Directory') {
          argResult += `${arg.name} "${arg.value}" `;
        } else {
          argResult += `${arg.name} ${arg.value} `;
        }
      }
    }
  });

  if (lines) result += lines + '\n';

  result += isEmpty(argResult) ? 'bun run desktop-prod:run' : `bun run desktop-prod:run ${argResult}`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('#')) {
      return;
    }

    if (line.startsWith('export ') || line.startsWith('set ')) {
      const prefix = line.startsWith('export ') ? 'export ' : 'set ';
      let [name, value] = line.replace(prefix, '').split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());

      if (isValidArg(name, voiceStudioArguments) && isEnvironmentVariable(name)) {
        argResult.push({name, value});
      }
      return;
    }

    if (!line.includes('bun run desktop-prod:run')) return;

    const clArgs: string = line.split('bun run desktop-prod:run ')[1];
    if (!clArgs) return;

    const splitArgs: string[] = clArgs.split('--').filter(Boolean);

    const result: ArgType[] = splitArgs.map((arg: string): ArgType => {
      const [id, ...value] = arg.trim().split(' ');
      return {
        name: `--${id}`,
        value: value.join(' ').replace(/"/g, ''),
      };
    });

    result.forEach((value: ArgType): void => {
      if (isValidArg(value.name, voiceStudioArguments)) {
        if (getArgumentType(value.name, voiceStudioArguments) === 'CheckBox') {
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
  const cloneAndInstall = () => {
    stepper.nextStep().then(() => {
      stepper.cloneRepository(VOICE_STUDIO_URL).then(dir => {
        stepper.nextStep().then(() => {
          stepper.executeTerminalCommands('bun install', dir).then(() => {
            stepper.nextStep().then(() => {
              stepper.executeTerminalCommands('bun run desktop-prod', dir).then(() => {
                stepper.setInstalled(dir);
                stepper.showFinalStep(
                  'success',
                  'VoiceStudio installation complete!',
                  'All installation steps completed successfully. Your VoiceStudio environment is ready for use.',
                );
              });
            });
          });
        });
      });
    });
  };

  stepper.initialSteps([
    'VoiceStudio',
    'Check Bun',
    'Clone VoiceStudio',
    'Install Dependencies',
    'Build Studio',
    'Finish',
  ]);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.progressBar(true, 'Checking if Bun is installed...');
        stepper.ipc.invoke('is_voicestudio_bun_available').then((isBunInstalled: boolean) => {
          if (isBunInstalled) {
            cloneAndInstall();
          } else {
            stepper.progressBar(true, 'Installing Bun runtime...');
            const installCmd = isWin ? BUN_WIN_INSTALL : BUN_UNIX_INSTALL;
            stepper.executeTerminalCommands(installCmd).then(() => {
              stepper.showFinalStep(
                'success',
                'Bun Installed Successfully!',
                'Bun has been installed. To use it, please restart LynxHub and start the installation again.',
              );
            });
          }
        });
      });
    } else if (targetDirectory) {
      stepper.utils.validateGitRepository(targetDirectory, VOICE_STUDIO_URL).then(isValid => {
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep(
            'success',
            'VoiceStudio located successfully!',
            'Pre-installed VoiceStudio detected. Installation skipped as your existing setup is ready to use.',
          );
        } else {
          stepper.utils.verifyFilesExist(targetDirectory, ['package.json', 'backend/main.py']).then(filesExist => {
            if (filesExist) {
              stepper.setInstalled(targetDirectory);
              stepper.showFinalStep(
                'success',
                'VoiceStudio located successfully!',
                'Detected a manual installation of VoiceStudio.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                'Unable to locate VoiceStudio!',
                'Please ensure you have selected the correct folder containing the VoiceStudio installation.',
              );
            }
          });
        }
      });
    }
  });
}

function startUpdate(stepper: InstallationStepper, dir?: string) {
  stepper.initialSteps(['Fetch Changes', 'Install Dependencies', 'Build Studio', 'Completed']);
  stepper.executeTerminalCommands(['git pull', 'bun install', 'bun run desktop-prod'], dir).then(() => {
    stepper.setUpdated();
    stepper.showFinalStep(
      'success',
      'VoiceStudio Updated Successfully!',
      'VoiceStudio has been updated to the latest version.',
    );
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(VOICE_STUDIO_URL, undefined, api, callback);
}

const VOICE_STUDIO_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default VOICE_STUDIO_RM;

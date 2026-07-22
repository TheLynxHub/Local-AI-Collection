import {isEmpty} from 'lodash-es';

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {getPythonCommandByOs, isWin, parseCustomArg} from '../../../Utils/CrossUtils';
import {CardInfo, catchAddress, getArgumentType} from '../../../Utils/RendererUtils';
import aiToolkitArguments from './Arguments';

const AITOOLKIT_URL = 'https://github.com/ostris/ai-toolkit';

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
      const argType = getArgumentType(arg.name, aiToolkitArguments);
      if (argType === 'Input' && arg.value) {
        // Environment variables
        if (isWin) {
          lines += `set ${arg.name}=${arg.value}\n`;
        } else {
          lines += `export ${arg.name}="${arg.value}"\n`;
        }
      }
    }
  });

  if (!isEmpty(lines)) {
    result += lines + '\n';
  }

  // Set NODE_ENV to empty to prevent Next.js build issues
  if (isWin) {
    result += 'set NODE_ENV=\n\n';
  } else {
    result += 'export NODE_ENV=""\n\n';
  }

  result += isEmpty(argResult) ? 'cd ui\nnpm run build_and_start' : `cd ui\nnpm run build_and_start ${argResult}`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    line = line.trim();

    // Parse Windows environment variables (set VAR=value)
    if (line.startsWith('set ')) {
      const envLine = line.substring(4); // Remove 'set '
      const [name, ...valueParts] = envLine.split('=');
      const value = valueParts.join('=').trim();
      if (name && value) {
        argResult.push({name: name.trim(), value});
      }
    }

    // Parse Unix environment variables (export VAR="value" or export VAR=value)
    if (line.startsWith('export ')) {
      const envLine = line.substring(7); // Remove 'export '
      const [name, ...valueParts] = envLine.split('=');
      let value = valueParts.join('=').trim();
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (name && value) {
        argResult.push({name: name.trim(), value});
      }
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  const pipCommand = getPythonCommandByOs().pip;

  const installReqs = (dir: string) => {
    stepper.executeTerminalCommands(`${pipCommand} install -r requirements.txt`, dir).then(() => {
      stepper.nextStep().then(() => {
        stepper.setInstalled(dir);
        stepper.showFinalStep(
          'success',
          'AI Toolkit installation complete!',
          'All installation steps completed successfully. Your AI Toolkit environment is now ready for use. ',
        );
      });
    });
  };

  stepper.initialSteps(['AI Toolkit', 'Checking NodeJS', 'Clone', 'Install PyTorch', 'Install Dependencies', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.progressBar(true, 'Checking if NPM is installed...');
        stepper.ipc.invoke('is_aitoolkit_npm_available').then((isNpmInstalled: boolean) => {
          if (isNpmInstalled) {
            stepper.nextStep().then(() => {
              stepper.cloneRepository(AITOOLKIT_URL).then(dir => {
                stepper.nextStep().then(() => {
                  stepper
                    .executeTerminalCommands(
                      `${pipCommand} install --no-cache-dir torch==2.9.1 torchvision==0.24.1 torchaudio==2.9.1 ` +
                        '--index-url https://download.pytorch.org/whl/cu128',
                      dir,
                    )
                    .then(() => {
                      stepper.nextStep().then(() => {
                        installReqs(dir);
                      });
                    });
                });
              });
            });
          } else {
            stepper.showFinalStep(
              'error',
              'NodeJS is not installed!',
              'AI Toolkit needs NPM to run the UI! Please install NodeJS then try again.',
            );
          }
        });
      });
    } else if (targetDirectory) {
      // Validate by checking for key files
      stepper.utils.verifyFilesExist(targetDirectory, ['ui', 'run.py', 'toolkit']).then(filesExist => {
        if (filesExist) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep(
            'success',
            'AI Toolkit located successfully!',
            'Pre-installed AI Toolkit detected. Installation skipped as your existing setup is ready to use.',
          );
        } else {
          stepper.showFinalStep(
            'error',
            'Unable to locate AI Toolkit!',
            'Please ensure you have selected the correct folder containing the AI Toolkit installation.',
          );
        }
      });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(AITOOLKIT_URL, undefined, api, callback);
}

const AITOOLKIT_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default AITOOLKIT_RM;

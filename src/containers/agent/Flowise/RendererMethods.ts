import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager, isWin, parseCustomArg} from '../../../utils/crossUtils';
import {getArgumentType, isValidArg} from '../../../utils/rendererUtils';
import flowiseArguments from './Arguments';

const INSTALL_TIME_KEY = 'install-time-flowise';
const UPDATE_TIME_KEY = 'update-time-flowise';
const UPDATE_AVAILABLE_KEY = 'update-available-version-flowise';

const shellCommand = 'npx flowise start';

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
      const argType = getArgumentType(arg.name, flowiseArguments);
      if (argType === 'CheckBox') {
        argResult += `${arg.name}=true `;
      } else if (argType === 'File' || argType === 'Directory') {
        argResult += `${arg.name}="${arg.value}" `;
      } else {
        argResult += `${arg.name}=${arg.value} `;
      }
    }
  });

  if (lines) result += lines + '\n';

  result += isEmpty(argResult) ? shellCommand : `${shellCommand} ${argResult}`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (!line.startsWith(shellCommand)) return;

    const clArgs: string = line.split(`${shellCommand} `)[1];

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
      if (isValidArg(value.name, flowiseArguments)) {
        if (getArgumentType(value.name, flowiseArguments) === 'CheckBox') {
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
  stepper.initialSteps(['Getting Started', 'Checking NodeJS', 'Detect Existing', 'Install Flowise', 'All Done!']);
  stepper.starterStep({disableSelectDir: true}).then(() => {
    stepper.nextStep().then(() => {
      stepper.progressBar(true, 'Checking if NPM is installed...');
      stepper.ipc.invoke('is_flowise_npm_available').then((isNpmInstalled: boolean) => {
        if (isNpmInstalled) {
          stepper.nextStep().then(() => {
            stepper.progressBar(true, 'Checking for existing Flowise installation...');
            stepper.ipc.invoke('is_flowise_installed').then((isFlowInstalled: boolean) => {
              if (isFlowInstalled) {
                stepper.setInstalled();
                const currentDate = new Date();
                stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
                stepper.showFinalStep('success', "You're All Set!", "Flowise is already installed. You're good to go!");
              } else {
                stepper.nextStep().then(() => {
                  stepper.ipc.invoke('is_flowise_npm_version_above_12').then((isAbove12: boolean) => {
                    const flags = isAbove12 ? ' --allow-remote=all --dangerously-allow-all-scripts' : '';
                    stepper.executeTerminalCommands(`npm i -g flowise${flags}`).then(() => {
                      stepper.setInstalled();
                      const currentDate = new Date();
                      stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
                      stepper.showFinalStep(
                        'success',
                        'Installation Complete!',
                        'Your Flowise environment is ready. Enjoy!',
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
            'Flowise need NPM! Please install NodeJs then try again.',
          );
        }
      });
    });
  });
}

function startUpdate(stepper: InstallationStepper) {
  stepper.initialSteps(['Update Flowise', 'Complete Update']);
  stepper.executeTerminalCommands('npm -g update flowise').then(() => {
    const currentDate = new Date();
    stepper.storage.set(UPDATE_TIME_KEY, currentDate.toLocaleString());
    stepper.setUpdated();
    stepper.showFinalStep(
      'success',
      'Flowise Updated Successfully!',
      `Flowise has been updated to the latest version. You can now enjoy the new features and improvements.`,
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
  api.ipc.invoke('current_flowise_version').then(result => {
    descManager.updateItem(0, 2, result);
  });
  api.storage.get(UPDATE_AVAILABLE_KEY).then(result => {
    descManager.updateItem(0, 3, result);
  });
}

function catchAddress(input: string): string | undefined {
  if (input.toLowerCase().includes('listening at')) {
    const portRegex = /:(\d+)(?!.*\d)/;
    const match = input.match(portRegex);

    if (match && match[1]) {
      return `http://localhost:${match[1]}`;
    } else {
      return undefined;
    }
  }

  return undefined;
}

const Flow_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default Flow_RM;

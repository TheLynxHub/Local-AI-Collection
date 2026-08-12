import {isEmpty} from 'lodash-es';

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager, getVenvPythonPath, isWin} from '../../../utils/crossUtils';
import {catchAddress} from '../../../utils/rendererUtils';
import {
  Invoke_Command_ActivateVenv,
  Invoke_Command_CreateVenv,
  Invoke_Command_InstallPip,
  Invoke_Command_InstallUV,
  INVOKEAI_INSTALL_DIR_KEY,
  INVOKEAI_INSTALL_TIME_KEY,
  INVOKEAI_UPDATE_AVAILABLE_KEY,
  INVOKEAI_UPDATE_TIME_KEY,
  invokeGetInputFields,
  invokeGetInputResults,
  invokeGetInstallCommand,
} from './utils/constants';

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = 'schema_version: 4.0.2\n\n';

  const argResult: string = args
    .map(arg => {
      return `${arg.name}: ${arg.value}`;
    })
    .join('\n');

  result += argResult;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('schema_version') || line.startsWith('#') || isEmpty(line.trim())) return;

    const clArgs: string[] = line.split(`: `);

    const [name, value] = clArgs;

    argResult.push({name, value});
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['InvokeAI', 'UV', 'Config', 'Install', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.progressBar(true, 'Detecting UV installation...');
        stepper.ipc.invoke('is_uv_installed').then(isUvInstalled => {
          if (!isUvInstalled) {
            stepper.executeTerminalCommands(Invoke_Command_InstallUV).then(() => {
              stepper.showFinalStep(
                'success',
                'UV Package Manager Installation Complete.',
                'Restart LynxHub and run the installer again to continue installation.',
              );
            });
          } else {
            stepper.nextStep().then(() => {
              stepper.progressBar(true, 'Fetching the latest InvokeAI versions...');
              invokeGetInputFields(stepper.ipc).then(fields => {
                stepper.collectUserInput(fields).then(result => {
                  const {installDirResult} = invokeGetInputResults(result);
                  const installCommand = invokeGetInstallCommand(result);

                  stepper.nextStep().then(() => {
                    stepper
                      .executeTerminalCommands(
                        [
                          Invoke_Command_CreateVenv,
                          Invoke_Command_ActivateVenv,
                          Invoke_Command_InstallPip,
                          installCommand,
                        ],
                        installDirResult,
                      )
                      .then(() => {
                        stepper.setInstalled(installDirResult);
                        const currentDate = new Date();
                        stepper.storage.set(INVOKEAI_INSTALL_TIME_KEY, currentDate.toLocaleString());
                        stepper.storage.set(INVOKEAI_INSTALL_DIR_KEY, installDirResult);
                        stepper.showFinalStep(
                          'success',
                          'InvokeAI Installation Complete.',
                          'Your InvokeAI environment is ready. Enjoy!',
                        );
                      });
                  });
                });
              });
            });
          }
        });
      });
    } else {
      stepper.ipc.invoke('validate_install_dir', targetDirectory).then((isValid: boolean | string) => {
        if (isValid === true) {
          stepper.setInstalled(targetDirectory);
          const currentDate = new Date();
          stepper.storage.set(INVOKEAI_INSTALL_TIME_KEY, currentDate.toLocaleString());
          stepper.storage.set(INVOKEAI_INSTALL_DIR_KEY, targetDirectory);
          stepper.showFinalStep('success', 'InvokeAI Environment Found.', 'Location validated successfully.');
        } else {
          const description: string =
            typeof isValid === 'string' ? isValid : 'Could not find InvokeAI installation in the selected directory.';
          stepper.showFinalStep('error', 'Invalid Environment!', description);
        }
      });
    }
  });
}

function startUpdate(stepper: InstallationStepper, dir?: string) {
  if (!dir) return;

  const venvDir = isWin ? `${dir}\\.venv` : `${dir}/.venv`;
  const pythonPath = getVenvPythonPath(venvDir);

  stepper.initialSteps(['Updating', 'Done']);

  stepper
    .executeTerminalCommands(`${isWin ? '&' : '.'} "${pythonPath}" -m pip install --upgrade "invokeai"`, dir)
    .then(() => {
      const currentDate = new Date();
      stepper.storage.set(INVOKEAI_UPDATE_TIME_KEY, currentDate);

      stepper.setUpdated();
      stepper.showFinalStep(
        'success',
        'InvokeAI Updated Successfully!',
        `InvokeAI has been updated to the latest version. You can now enjoy the new features and improvements.`,
      );
    });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  const dir = api.installationFolder;
  callback.setOpenFolders(dir ? [dir] : undefined);

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

  api.storage.get(INVOKEAI_INSTALL_TIME_KEY).then(result => {
    descManager.updateItem(0, 0, result);
  });
  api.storage.get(INVOKEAI_UPDATE_TIME_KEY).then(result => {
    descManager.updateItem(0, 1, result);
  });
  api.ipc.invoke('invoke_current_version').then(result => {
    descManager.updateItem(0, 2, result);
  });
  api.storage.get(INVOKEAI_UPDATE_AVAILABLE_KEY).then(result => {
    descManager.updateItem(0, 3, result);
  });
}

const INVOKE_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  parseArgsToString,
  parseStringToArgs,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default INVOKE_RM;

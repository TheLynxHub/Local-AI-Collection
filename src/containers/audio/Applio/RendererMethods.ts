import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin} from '../../../utils/crossUtils';
import {CardInfo, catchAddress} from '../../../utils/rendererUtils';

const URL: string = 'https://github.com/IAHispano/Applio';

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['Applio', 'Clone', 'Install', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(URL).then(dir => {
          stepper.nextStep().then(() => {
            const installCmd = isWin ? '.\\run-install.bat' : 'sh run-install.sh';
            stepper.executeTerminalCommands(installCmd, dir).then(() => {
              stepper.setInstalled(dir);
              stepper.showFinalStep(
                'success',
                'Applio Installation Complete!',
                'Applio has been successfully installed. You can now start generating audio.',
              );
            });
          });
        });
      });
    } else if (targetDirectory) {
      stepper.utils.validateGitRepository(targetDirectory, URL).then(isValid => {
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep('success', 'Applio Found!', 'Existing Applio installation located.');
        } else {
          stepper.utils
            .verifyFilesExist(targetDirectory, [isWin ? 'run-applio.bat' : 'run-applio.sh'])
            .then(isExist => {
              if (isExist) {
                stepper.setInstalled(targetDirectory);
                stepper.showFinalStep(
                  'success',
                  'Applio located successfully!',
                  'Detected a manual installation of Applio. Note: Because this is not a Git repository,' +
                    ' automatic updates and certain version-dependent features may not work as expected.',
                );
              } else {
                stepper.showFinalStep(
                  'error',
                  'Invalid Applio Directory',
                  'The selected directory does not appear to contain a valid Applio installation.',
                );
              }
            });
        }
      });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, undefined, api, callback);
}

const APPLIO_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  manager: {
    startInstall,
    updater: {updateType: 'git'},
  },
};

export default APPLIO_RM;

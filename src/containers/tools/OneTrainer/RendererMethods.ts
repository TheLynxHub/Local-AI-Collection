import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin} from '../../../utils/crossUtils';
import {CardInfo} from '../../../utils/rendererUtils';

const URL = 'https://github.com/Nerogar/OneTrainer';

export function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['OneTrainer', 'Clone', 'Install', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(URL).then(dir => {
          stepper.nextStep().then(() => {
            stepper.runTerminalScript(dir, isWin ? 'install.bat' : 'install.sh').then(() => {
              stepper.setInstalled(dir);
              stepper.showFinalStep(
                'success',
                'OneTrainer installation complete!',
                'All installation steps completed successfully. Your OneTrainer environment is now ready for use.',
              );
            });
          });
        });
      });
    } else if (targetDirectory) {
      stepper.utils.validateGitRepository(targetDirectory, URL).then(isValid => {
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep(
            'success',
            'OneTrainer located successfully!',
            'Pre-installed OneTrainer detected. Installation skipped as your existing setup is ready to use.',
          );
        } else {
          stepper.utils.verifyFilesExist(targetDirectory, [isWin ? 'start-ui.bat' : 'start-ui.sh']).then(isExist => {
            if (isExist) {
              stepper.setInstalled(targetDirectory);
              stepper.showFinalStep(
                'success',
                `OneTrainer located successfully!`,
                `Detected a manual installation of OneTrainer. Note: Because this is not a Git repository,` +
                  ' automatic updates and certain version-dependent features may not work as expected.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                'Unable to locate OneTrainer!',
                'Please ensure you have selected the correct folder containing the OneTrainer repository.',
              );
            }
          });
        }
      });
    }
  });
}

function startUpdate(stepper: InstallationStepper, dir?: string) {
  stepper.initialSteps(['Update', 'Finish']);
  if (dir) {
    stepper.runTerminalScript(dir, isWin ? 'update.bat' : 'update.sh').then(() => {
      stepper.setUpdated();
      stepper.showFinalStep('success', 'OneTrainer Updated Successfully!');
    });
  } else {
    stepper.showFinalStep('error', 'Unable to update OneTrainer');
  }
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, undefined, api, callback);
}

const ONETRAINER_RM: CardRendererMethods = {
  cardInfo,
  manager: {
    startInstall,
    updater: {updateType: 'stepper', startUpdate},
  },
};

export default ONETRAINER_RM;

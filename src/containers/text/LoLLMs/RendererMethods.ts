import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin} from '../../../utils/crossUtils';
import {CardInfo, catchAddress} from '../../../utils/rendererUtils';

const title = 'LoLLMs';
const url = 'https://github.com/ParisNeo/lollms-webui';

export function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps([title, 'Clone', 'Install', 'Requirements', 'Finish']);
  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(url).then(dir => {
          stepper.nextStep().then(() => {
            stepper.executeTerminalCommands('git submodule update --init --recursive', dir).then(() => {
              stepper
                .executeTerminalCommands([
                  'pip install -r requirements.txt',
                  'pip install -e .',
                  `${dir}${isWin ? '\\' : '/'}lollms_core`,
                ])
                .then(() => {
                  stepper.setInstalled(dir);
                  stepper.showFinalStep(
                    'success',
                    `${title} installation complete!`,
                    `All installation steps completed successfully. Your ${title} environment is now ready for use.`,
                  );
                });
            });
          });
        });
      });
    } else if (targetDirectory) {
      stepper.utils.validateGitRepository(targetDirectory, url).then(isValid => {
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep(
            'success',
            `${title} located successfully!`,
            `Pre-installed ${title} detected. Installation skipped as your existing setup is ready to use.`,
          );
        } else {
          stepper.utils.verifyFilesExist(targetDirectory, ['app.py']).then(isExist => {
            if (isExist) {
              stepper.setInstalled(targetDirectory);
              stepper.showFinalStep(
                'success',
                `${title} located successfully!`,
                `Detected a manual installation of ${title}. Note: Because this is not a Git repository,` +
                  ' automatic updates and certain version-dependent features may not work as expected.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                `Unable to locate ${title}!`,
                `Please ensure you have selected the correct folder containing the ${title} repository.`,
              );
            }
          });
        }
      });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(url, undefined, api, callback);
}

const LoLLM_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default LoLLM_RM;

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {getPythonCommandByOs} from '../../../utils/crossUtils';
import {CardInfo, catchAddress} from '../../../utils/rendererUtils';

const CHAT_TTS_URL = 'https://github.com/2noise/ChatTTS';

function startInstall(stepper: InstallationStepper) {
  const pipCommand = getPythonCommandByOs().pip;

  const installReqs = (dir: string) => {
    stepper.executeTerminalCommands(`${pipCommand} install -r requirements.txt`, dir).then(() => {
      stepper.nextStep().then(() => {
        stepper.setInstalled(dir);
        stepper.showFinalStep(
          'success',
          'ChatTTS Installation Complete!',
          'ChatTTS has been successfully installed. You can now launch the WebUI to start generating speech.',
        );
      });
    });
  };

  stepper.initialSteps(['ChatTTS', 'Clone', 'Install Dependencies', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(CHAT_TTS_URL).then(dir => {
          stepper.nextStep().then(() => {
            installReqs(dir);
          });
        });
      });
    } else if (targetDirectory) {
      stepper.utils
        .verifyFilesExist(targetDirectory, ['examples/web/webui.py', 'requirements.txt'])
        .then(filesExist => {
          if (filesExist) {
            stepper.setInstalled(targetDirectory);
            stepper.showFinalStep(
              'success',
              'ChatTTS located successfully!',
              'Pre-installed ChatTTS detected. Installation skipped as your existing setup is ready to use.',
            );
          } else {
            stepper.showFinalStep(
              'error',
              'Unable to locate ChatTTS!',
              'Please ensure you have selected the correct folder containing the ChatTTS repository.',
            );
          }
        });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(CHAT_TTS_URL, undefined, api, callback);
}

const CHAT_TTS_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  manager: {
    startInstall,
    updater: {updateType: 'git'},
  },
};

export default CHAT_TTS_RM;

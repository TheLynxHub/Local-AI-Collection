import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin} from '../../../Utils/CrossUtils';
import {CardInfo} from '../../../Utils/RendererUtils';

const URL = 'https://github.com/erew123/alltalk_tts';

export function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['AllTalk TTS', 'Clone', 'Install', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(URL).then(dir => {
          stepper.nextStep().then(() => {
            stepper.runTerminalScript(dir, isWin ? 'atsetup.bat' : 'atsetup.sh').then(() => {
              stepper.setInstalled(dir);
              stepper.showFinalStep(
                'success',
                'AllTalk TTS installation complete!',
                'All installation steps completed successfully. Your AllTalk TTS environment is now ready for use.',
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
            'AllTalk TTS located successfully!',
            'Pre-installed AllTalk TTS detected. Installation skipped as your existing setup is ready to use.',
          );
        } else {
          stepper.utils
            .verifyFilesExist(targetDirectory, [isWin ? 'start_alltalk.bat' : 'start_alltalk.sh'])
            .then(isExist => {
              if (isExist) {
                stepper.setInstalled(targetDirectory);
                stepper.showFinalStep(
                  'success',
                  'AllTalk TTS located successfully!',
                  'Detected a manual installation of AllTalk TTS. Note: Because this is not a Git repository,' +
                    ' automatic updates and certain version-dependent features may not work as expected.',
                );
              } else {
                stepper.showFinalStep(
                  'error',
                  'Unable to locate AllTalk TTS!',
                  'Please ensure you have selected the correct folder containing the AllTalk TTS repository.',
                );
              }
            });
        }
      });
    }
  });
}

function startUpdate(stepper: InstallationStepper, dir?: string) {
  stepper.initialSteps(['Pull Changes', 'Update', 'Finish']);
  if (dir) {
    stepper.executeTerminalCommands('git pull', dir).then(() => {
      stepper.nextStep().then(() => {
        stepper.runTerminalScript(dir, isWin ? 'atsetup.bat' : 'atsetup.sh').then(() => {
          stepper.setUpdated();
          stepper.showFinalStep('success', 'AllTalk TTS Updated Successfully!');
        });
      });
    });
  } else {
    stepper.showFinalStep('error', 'Unable to update AllTalk TTS');
  }
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, undefined, api, callback);
}

function catchAddress(input: string): string | undefined {
  // eslint-disable-next-line no-control-regex
  const gradioDarkPattern = /Gradio Dark.*?:\s*.*?(https?:\/\/.*?)(?=\s|\u001b|$)/i;

  const match: RegExpMatchArray | null = input.match(gradioDarkPattern);
  if (match) {
    return match[1];
  }

  return undefined;
}

const ALLTALK_RM: CardRendererMethods = {
  cardInfo,
  catchAddress,
  manager: {
    startInstall,
    updater: {updateType: 'stepper', startUpdate},
  },
};

export default ALLTALK_RM;

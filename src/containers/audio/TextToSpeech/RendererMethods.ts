import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin} from '../../../utils/crossUtils';
import {CardInfo, GitInstaller} from '../../../utils/rendererUtils';

const URL = 'https://github.com/rsxdalv/TTS-WebUI';

function catchAddress(input: string): string | undefined {
  if (input.toLowerCase().includes('Installed Packages'.toLowerCase())) {
    return 'http://127.0.0.1:7770';
  } else {
    return undefined;
  }
}

function startInstall(stepper: InstallationStepper) {
  GitInstaller('Text to Speech', URL, stepper, [isWin ? 'start_tts_webui.bat' : 'start_tts_webui.sh']);
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, '/extensions', api, callback);
}

const TTS_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};
export default TTS_RM;

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, GitInstaller} from '../../../utils/rendererUtils';
import {fetchExtensionList, parseArgsToString, parseStringToArgs} from '../Automatic1111Sd/SharedRenderer';

const SD_FORGE_URL = 'https://github.com/lllyasviel/stable-diffusion-webui-forge';

function startInstall(stepper: InstallationStepper) {
  GitInstaller('SD Forge', SD_FORGE_URL, stepper, [isWin ? 'webui-user.bat' : 'webui.sh']);
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(SD_FORGE_URL, '/extensions', api, callback);
}

const SD_FORGE_RM: CardRendererMethods = {
  catchAddress,
  fetchExtensionList,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default SD_FORGE_RM;

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, GitInstaller} from '../../../utils/rendererUtils';
import {fetchExtensionList, parseArgsToString, parseStringToArgs} from '../Automatic1111Sd/SharedRenderer';

const SdAMD_URL = 'https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu-forge';

function startInstall(stepper: InstallationStepper) {
  GitInstaller('SD Forge AMDGPU', SdAMD_URL, stepper, [isWin ? 'webui-user.bat' : 'webui.sh']);
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(SdAMD_URL, 'RendererMethods', api, callback);
}

const SD_FORGE_AMD_RM: CardRendererMethods = {
  catchAddress,
  fetchExtensionList,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default SD_FORGE_AMD_RM;

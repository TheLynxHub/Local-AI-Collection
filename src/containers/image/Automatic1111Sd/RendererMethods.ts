import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, GitInstaller} from '../../../utils/rendererUtils';
import {fetchExtensionList, parseArgsToString, parseStringToArgs} from './SharedRenderer';

const A1_URL = 'https://github.com/AUTOMATIC1111/stable-diffusion-webui';

function startInstall(stepper: InstallationStepper) {
  GitInstaller('Automatic1111', A1_URL, stepper, [isWin ? 'webui-user.bat' : 'webui.sh']);
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(A1_URL, '/extensions', api, callback);
}

const A1_RM: CardRendererMethods = {
  catchAddress,
  fetchExtensionList,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default A1_RM;

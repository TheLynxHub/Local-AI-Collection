import {CardMainMethodsInitial, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {ONETRAINER_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {isGitTypeInstalled, utilRunCommands} from '../../../utils/mainUtils';

const BAT_FILE_NAME = isWin ? 'start-ui.bat' : 'start-ui.sh';

async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir);
}

async function updateAvailable(utils: MainModuleUtils, dir?: string) {
  if (!dir) return false;
  return await utils.isPullAvailable(dir);
}

const Nerogar_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(ONETRAINER_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    updateAvailable: () => updateAvailable(utils, installDir),
    isInstalled: () => isGitTypeInstalled(installDir, 'https://github.com/Nerogar/OneTrainer', [BAT_FILE_NAME]),
  };
};

export default Nerogar_MM;

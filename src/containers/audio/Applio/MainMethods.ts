import {CardMainMethodsInitial} from '../../../../../src/common/types/plugins/modules';
import {AG_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {isGitTypeInstalled, utilRunCommands} from '../../../utils/mainUtils';

const BAT_FILE = isWin ? 'run-applio.bat' : 'run-applio.sh';

async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE, dir);
}

const Applio_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(AG_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    isInstalled: () => isGitTypeInstalled(installDir, 'https://github.com/IAHispano/Applio', [BAT_FILE]),
  };
};

export default Applio_MM;

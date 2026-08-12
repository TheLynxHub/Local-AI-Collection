import {CardMainMethodsInitial} from '../../../../../src/common/types/plugins/modules';
import {ALLTALK_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {isGitTypeInstalled, utilRunCommands} from '../../../utils/mainUtils';

const BAT_FILE_NAME = isWin ? 'start_alltalk.bat' : 'start_alltalk.sh';

export async function getRunCommands(): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME);
}

const Rrew123_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(ALLTALK_ID);

  return {
    getRunCommands: () => getRunCommands(),
    isInstalled: () => isGitTypeInstalled(installDir, 'https://github.com/erew123/alltalk_tts', [BAT_FILE_NAME]),
  };
};

export default Rrew123_MM;

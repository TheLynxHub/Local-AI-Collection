import {CardMainMethodsInitial} from '../../../../../src/common/types/plugins/modules';
import {CHAT_TTS_ID} from '../../../Constants';
import {isWin} from '../../../Utils/CrossUtils';
import {isGitTypeInstalled, utilRunCommands} from '../../../Utils/MainUtils';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const DEFAULT_BATCH_DATA: string = isWin
  ? '@echo off\n\npython examples/web/webui.py'
  : '#!/bin/bash\n\npython examples/web/webui.py';

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

const ChatTTS_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(CHAT_TTS_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/2noise/ChatTTS', [
        'examples/web/webui.py',
        'requirements.txt',
      ]),
  };
};

export default ChatTTS_MM;

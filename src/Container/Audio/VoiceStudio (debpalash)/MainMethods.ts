import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {VOICE_STUDIO_ID} from '../../../Constants';
import {isWin} from '../../../Utils/CrossUtils';
import {checkWhich, isGitTypeInstalled, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../Utils/MainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const DEFAULT_BATCH_DATA: string = isWin
  ? '@echo off\n\nbun run desktop-prod:run'
  : '#!/bin/bash\n\nbun run desktop-prod:run';

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

const VoiceStudio_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(VOICE_STUDIO_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    mainIpc: () => utils.ipc.handle('is_voicestudio_bun_available', () => checkWhich('bun')),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/debpalash/VoiceStudio', ['package.json', 'backend/main.py']),
  };
};

export default VoiceStudio_MM;

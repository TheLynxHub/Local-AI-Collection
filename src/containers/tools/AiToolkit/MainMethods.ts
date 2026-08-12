import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {AITOOLKIT_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {
  checkFilesExist,
  checkWhich,
  isGitTypeInstalled,
  utilReadArgs,
  utilRunCommands,
  utilSaveArgs,
} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const DEFAULT_BATCH_DATA: string = isWin
  ? '@echo off\n\nset NODE_ENV=\n\ncd ui\nnpm run build_and_start'
  : '#!/bin/bash\n\nexport NODE_ENV=""\n\ncd ui\nnpm run build_and_start';

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

export async function isInstalled(dir?: string): Promise<boolean> {
  if (!dir) return false;

  return checkFilesExist(dir, ['run.py', 'toolkit']);
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_aitoolkit_npm_available', () => checkWhich('npm'));
}

const AIToolkit_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(AITOOLKIT_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/ostris/ai-toolkit', ['run.py', 'package.json']),
    mainIpc: () => mainIpc(utils),
  };
};

export default AIToolkit_MM;

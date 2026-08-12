import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {SD_AMD_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {isGitTypeInstalled, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const CONFIG_FILE = isWin ? 'webui-user.bat' : 'webui-user.sh';
const EXEC_FILE = isWin ? 'webui-user.bat' : 'webui.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\ncall webui.bat' : '#!/bin/bash\n\n';

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(EXEC_FILE, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, CONFIG_FILE, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(CONFIG_FILE, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

const Ls_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(SD_AMD_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu', [EXEC_FILE]),
  };
};

export default Ls_MM;

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {COMFYUI_ID} from '../../../constants';
import {getPythonCommandByOs, isWin} from '../../../utils/crossUtils';
import {checkWhich, isGitTypeInstalled, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const pythonCommand = getPythonCommandByOs().python;
const DEFAULT_BATCH_DATA: string = isWin
  ? `@echo off\n\n${pythonCommand} main.py`
  : `#!/bin/bash\n\n${pythonCommand} main.py`;

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

function mainIpc(ipc: MainModuleUtils['ipc']) {
  ipc.handle('Comfy_isCondaInstalled', async () => checkWhich('conda'));
}

const Comfy_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(COMFYUI_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () => isGitTypeInstalled(installDir, 'https://github.com/Comfy-Org/ComfyUI', ['main.py', 'comfy']),
    mainIpc: () => mainIpc(utils.ipc),
  };
};

export default Comfy_MM;

import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {LORA_MANAGER_ID} from '../../../constants';
import {getPythonCommandByOs, isWin} from '../../../utils/crossUtils';
import {isGitTypeInstalled, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const pythonCommand = getPythonCommandByOs().python;
const DEFAULT_BATCH_DATA: string = isWin
  ? `@echo off\n\n${pythonCommand} standalone.py`
  : `#!/bin/bash\n\n${pythonCommand} standalone.py`;

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

const LoraManager_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(LORA_MANAGER_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/willmiao/ComfyUI-Lora-Manager', [
        'standalone.py',
        'requirements.txt',
      ]),
  };
};

export default LoraManager_MM;

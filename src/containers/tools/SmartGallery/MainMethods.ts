import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {SMARTGALLERY_ID} from '../../../constants';
import {getPythonCommandByOs, isWin} from '../../../utils/crossUtils';
import {isGitTypeInstalled, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const pythonCmd = getPythonCommandByOs().python;
const DEFAULT_BATCH_DATA: string = isWin
  ? `@echo off\n\n${pythonCmd} smartgallery.py`
  : `#!/bin/bash\n\n${pythonCmd} smartgallery.py`;

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

const SmartGallery_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(SMARTGALLERY_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/biagiomaf/smart-comfyui-gallery', [
        'smartgallery.py',
        'requirements.txt',
      ]),
  };
};

export default SmartGallery_MM;

import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {LLAMA_FACTORY_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {isGitTypeInstalled, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const DEFAULT_BATCH_DATA: string = isWin
  ? '@echo off\n\nllamafactory-cli webui'
  : '#!/bin/bash\n\nllamafactory-cli webui';

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

const LlamaFactory_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(LLAMA_FACTORY_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/hiyouga/LlamaFactory', [
        'pyproject.toml',
        'src/llamafactory/cli.py',
      ]),
  };
};

export default LlamaFactory_MM;

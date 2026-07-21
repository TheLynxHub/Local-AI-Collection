import axios from 'axios';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {UNSLOTH_STUDIO_ID} from '../../../Constants';
import {isWin} from '../../../Utils/CrossUtils';
import {checkWhich, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../Utils/MainUtils';
import {parseArgsToString, parseStringToArgs, TAG_KEY} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nunsloth studio\n' : '#!/bin/bash\n\nunsloth studio\n';

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

async function fetchLatestTag(): Promise<string | undefined> {
  try {
    const response = await axios.get('https://api.github.com/repos/unslothai/unsloth/tags');
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0].name;
    }
  } catch (e) {
    console.error('Failed to fetch Unsloth tags in main process:', e);
  }
  return undefined;
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  const savedTag = utils.storage.get<string>(TAG_KEY);
  if (!savedTag) return false;

  const latestTag = await fetchLatestTag();
  if (savedTag && latestTag && savedTag !== latestTag) {
    return true;
  }
  return false;
}

const isInstalled = () => checkWhich('unsloth');

const Unsloth_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(UNSLOTH_STUDIO_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    updateAvailable: () => updateAvailable(utils),
    isInstalled,
  };
};

export default Unsloth_MM;

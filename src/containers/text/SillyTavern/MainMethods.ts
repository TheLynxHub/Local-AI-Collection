import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {SILLYTAVERN_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {ensureScriptExecutable, initBatchFile, isGitTypeInstalled, utilRunCommands} from '../../../utils/mainUtils';
import {parseArgsToFiles, parseFilesToArgs} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const CONFIG_FILE_NAME = 'config.yml';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\ncall start.bat' : '#!/bin/bash\n\nbash ./start.sh';

async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  if (!dir) return;

  const {commands, configs} = parseArgsToFiles(args);

  const batPath = path.join(dir, BAT_FILE_NAME);
  const configPath = path.join(dir, CONFIG_FILE_NAME);

  await fs.promises.writeFile(batPath, commands);
  await fs.promises.writeFile(configPath, configs);

  // Ensure script is executable on Unix
  if (!isWin) {
    await ensureScriptExecutable(batPath);
  }
}

async function readArgs(dir?: string) {
  if (!dir) return [];
  const batPath = path.join(dir, BAT_FILE_NAME);
  const configPath = path.join(dir, CONFIG_FILE_NAME);

  await initBatchFile(batPath, DEFAULT_BATCH_DATA);

  // Ensure script is executable on Unix
  if (!isWin) {
    await ensureScriptExecutable(batPath);
  }

  const batData = await fs.promises.readFile(batPath, 'utf-8');
  let configData = '';
  try {
    configData = await fs.promises.readFile(configPath, 'utf-8');
  } catch {
    // Config file may not exist yet
  }

  return parseFilesToArgs(batData, configData);
}

const Silly_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(SILLYTAVERN_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/SillyTavern/SillyTavern', [isWin ? 'start.bat' : 'start.sh']),
  };
};

export default Silly_MM;

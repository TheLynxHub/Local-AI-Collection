import path from 'node:path';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {getCdCommand, isWin} from '../../../utils/crossUtils';
import {
  checkWhich,
  ensureScriptExecutable,
  initBatchFile,
  LINE_ENDING,
  utilReadArgs,
  utilSaveArgs,
} from '../../../utils/mainUtils';
import {
  checkNpmPackageUpdate,
  getNpmPackageVersion,
  isNpmPackageInstalled,
  isNpmVersionAbove12,
  uninstallNpmPackage,
} from '../../../utils/npmUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const PACKAGE_NAME = 'flowise';
const CONFIG_FILE = isWin ? 'flowise_config.bat' : 'flowise_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nnpx flowise start' : '#!/bin/bash\n\nnpx flowise start';

async function getRunCommands(configDir?: string): Promise<string | string[]> {
  if (!configDir) return '';

  const filePath = path.resolve(path.join(configDir, CONFIG_FILE));
  await initBatchFile(filePath, DEFAULT_BATCH_DATA);

  // Ensure script is executable on Unix
  if (!isWin) {
    await ensureScriptExecutable(filePath);
  }

  return [getCdCommand(configDir) + LINE_ENDING, `${isWin ? `& "${filePath}"` : `bash "${filePath}"`}${LINE_ENDING}`];
}

async function saveArgs(args: ChosenArgument[], configDir?: string) {
  return await utilSaveArgs(args, CONFIG_FILE, parseArgsToString, configDir);
}

async function readArgs(configDir?: string) {
  return await utilReadArgs(CONFIG_FILE, DEFAULT_BATCH_DATA, parseStringToArgs, configDir);
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  const available = await checkNpmPackageUpdate(PACKAGE_NAME);
  if (available) {
    utils.storage.set('update-available-version-flowise', available);
    return true;
  }

  utils.storage.set('update-available-version-flowise', undefined);
  return false;
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_flowise_installed', () => isNpmPackageInstalled(PACKAGE_NAME));
  utils.ipc.handle('current_flowise_version', () => getNpmPackageVersion(PACKAGE_NAME));
  utils.ipc.handle('is_flowise_npm_available', () => checkWhich('npm'));
  utils.ipc.handle('is_flowise_npm_version_above_12', () => isNpmVersionAbove12());
}

const isInstalled = () => isNpmPackageInstalled(PACKAGE_NAME);

const Flow_MM: CardMainMethodsInitial = utils => {
  const configDir = utils.getConfigDir();

  return {
    updateAvailable: () => updateAvailable(utils),
    getRunCommands: () => getRunCommands(configDir),
    mainIpc: () => mainIpc(utils),
    isInstalled,
    saveArgs: args => saveArgs(args, configDir),
    readArgs: () => readArgs(configDir),
    uninstall: () => uninstallNpmPackage(PACKAGE_NAME),
  };
};

export default Flow_MM;

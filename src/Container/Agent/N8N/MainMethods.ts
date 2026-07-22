import path from 'node:path';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {getCdCommand, isWin} from '../../../Utils/CrossUtils';
import {
  checkWhich,
  ensureScriptExecutable,
  initBatchFile,
  LINE_ENDING,
  utilReadArgs,
  utilSaveArgs,
} from '../../../Utils/MainUtils';
import {
  checkNpmPackageUpdate,
  getNpmPackageVersion,
  isNpmPackageInstalled,
  isNpmVersionAbove12,
  uninstallNpmPackage,
} from '../../../Utils/NpmUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const PACKAGE_NAME = 'n8n';
const CONFIG_FILE = isWin ? 'n8n_config.bat' : 'n8n_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nn8n start' : '#!/bin/bash\n\nn8n start';

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
    utils.storage.set('update-available-version-n8n', available);
    return true;
  }

  utils.storage.set('update-available-version-n8n', undefined);
  return false;
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_n8n_installed', () => isNpmPackageInstalled(PACKAGE_NAME));
  utils.ipc.handle('current_n8n_version', () => getNpmPackageVersion(PACKAGE_NAME));
  utils.ipc.handle('is_n8n_npm_available', () => checkWhich('npm'));
  utils.ipc.handle('is_n8n_npm_version_above_12', () => isNpmVersionAbove12());
}

const isInstalled = () => isNpmPackageInstalled(PACKAGE_NAME);

const N8N_MM: CardMainMethodsInitial = utils => {
  const configDir = utils.getConfigDir();

  return {
    mainIpc: () => mainIpc(utils),
    getRunCommands: () => getRunCommands(configDir),
    isInstalled,
    saveArgs: args => saveArgs(args, configDir),
    readArgs: () => readArgs(configDir),
    updateAvailable: () => updateAvailable(utils),
    uninstall: () => uninstallNpmPackage(PACKAGE_NAME),
  };
};

export default N8N_MM;

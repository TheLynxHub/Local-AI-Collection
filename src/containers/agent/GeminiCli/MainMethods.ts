import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {getCdCommand, isWin} from '../../../utils/crossUtils';
import {checkWhich, ensureScriptExecutable, initBatchFile, LINE_ENDING} from '../../../utils/mainUtils';
import {
  checkNpmPackageUpdate,
  getNpmPackageVersion,
  isNpmPackageInstalled,
  isNpmVersionAbove12,
  uninstallNpmPackage,
} from '../../../utils/npmUtils';
import {parseArgsToFiles, parseFilesToArgs} from './RendererMethods';

const PACKAGE_NAME = '@google/gemini-cli';
const CONFIG_FILE = isWin ? 'geminiCli_config.bat' : 'geminiCli_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\ngemini' : '#!/bin/bash\n\ngemini';

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
  if (!configDir) return;

  const {scriptData, settingsData} = parseArgsToFiles(args);

  const scriptPath = path.join(configDir, CONFIG_FILE);
  const settingsPath = String(args.find(arg => arg.name === 'Settings File Location')?.value);

  await fs.promises.writeFile(scriptPath, scriptData);

  // Ensure script is executable on Unix
  if (!isWin) {
    await ensureScriptExecutable(scriptPath);
  }

  if (settingsPath) {
    try {
      await fs.promises.writeFile(settingsPath, settingsData);
    } catch (e) {
      console.error('Error saving settings.json file for gemini-cli', e);
    }
  }
}

async function readArgs(configDir?: string) {
  if (!configDir) return [];

  const scriptPath = path.join(configDir, CONFIG_FILE);

  await initBatchFile(scriptPath, DEFAULT_BATCH_DATA);

  // Ensure script is executable on Unix
  if (!isWin) {
    await ensureScriptExecutable(scriptPath);
  }

  const scriptData = await fs.promises.readFile(scriptPath, 'utf-8');

  return parseFilesToArgs(scriptData, '');
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  const available = await checkNpmPackageUpdate(PACKAGE_NAME);
  if (available) {
    utils.storage.set('update-available-version-geminiCli', available);
    return true;
  }

  utils.storage.set('update-available-version-geminiCli', undefined);
  return false;
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_geminiCli_installed', () => isNpmPackageInstalled(PACKAGE_NAME));
  utils.ipc.handle('current_geminiCli_version', () => getNpmPackageVersion(PACKAGE_NAME));
  utils.ipc.handle('is_gemini_npm_available', () => checkWhich('npm'));
  utils.ipc.handle('is_gemini_npm_version_above_12', () => isNpmVersionAbove12());
}

const isInstalled = () => isNpmPackageInstalled(PACKAGE_NAME);

const GeminiCli_MM: CardMainMethodsInitial = utils => {
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

export default GeminiCli_MM;

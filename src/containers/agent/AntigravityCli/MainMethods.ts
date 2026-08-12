import {exec} from 'node:child_process';
import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {getCdCommand, isWin} from '../../../utils/crossUtils';
import {checkWhich, ensureScriptExecutable, initBatchFile, LINE_ENDING} from '../../../utils/mainUtils';
import {parseArgsToFiles, parseFilesToArgs} from './RendererMethods';

const CONFIG_FILE = isWin ? 'agy_config.bat' : 'agy_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nagy' : '#!/bin/bash\n\nagy';

async function getRunCommands(configDir?: string): Promise<string | string[]> {
  if (!configDir) return '';

  const filePath = path.resolve(path.join(configDir, CONFIG_FILE));
  await initBatchFile(filePath, DEFAULT_BATCH_DATA);

  if (!isWin) {
    await ensureScriptExecutable(filePath);
  }

  return [getCdCommand(configDir) + LINE_ENDING, `${isWin ? `& "${filePath}"` : `bash "${filePath}"`}${LINE_ENDING}`];
}

async function saveArgs(args: ChosenArgument[], configDir?: string) {
  if (!configDir) return;

  const {scriptData, settingsData} = parseArgsToFiles(args);

  const scriptPath = path.join(configDir, CONFIG_FILE);
  const settingsPathArg = args.find(arg => arg.name === 'Settings File Location')?.value;
  const settingsPath =
    settingsPathArg && String(settingsPathArg).trim() !== '' && String(settingsPathArg) !== 'undefined'
      ? String(settingsPathArg)
      : undefined;

  let finalScript = scriptData;
  if (settingsPath) {
    const marker = isWin ? `REM SETTINGS_FILE="${settingsPath}"\n` : `# SETTINGS_FILE="${settingsPath}"\n`;
    finalScript = marker + scriptData;
  }

  await fs.promises.writeFile(scriptPath, finalScript);

  if (!isWin) {
    await ensureScriptExecutable(scriptPath);
  }

  if (settingsPath && settingsData) {
    try {
      await fs.promises.writeFile(settingsPath, settingsData);
    } catch (e) {
      console.error('Error saving settings file for Antigravity CLI', e);
    }
  }
}

async function readArgs(configDir?: string) {
  if (!configDir) return [];

  const scriptPath = path.join(configDir, CONFIG_FILE);

  await initBatchFile(scriptPath, DEFAULT_BATCH_DATA);

  if (!isWin) {
    await ensureScriptExecutable(scriptPath);
  }

  const scriptDataFull = await fs.promises.readFile(scriptPath, 'utf-8');

  const lines = scriptDataFull.split('\n');
  let settingsPath: string | undefined;
  const filteredLines: string[] = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('REM SETTINGS_FILE=') || trimmed.startsWith('# SETTINGS_FILE=')) {
      const [, rawPath] = trimmed.split('=');
      settingsPath = rawPath?.replace(/^"|"$/g, '');
    } else {
      filteredLines.push(line);
    }
  });

  const scriptData = filteredLines.join('\n');

  let settingsContent = '';
  if (settingsPath) {
    try {
      settingsContent = await fs.promises.readFile(settingsPath, 'utf-8');
    } catch (e) {
      console.error('Error reading settings file for Antigravity CLI', e);
    }
  }

  return parseFilesToArgs(scriptData, settingsContent);
}

function getManifestPlatform(): string {
  const platform = process.platform;
  const arch = process.arch;

  if (platform === 'win32') {
    return arch === 'arm64' ? 'windows_arm64' : 'windows_amd64';
  }
  if (platform === 'darwin') {
    return arch === 'arm64' ? 'darwin_arm64' : 'darwin_amd64';
  }
  return arch === 'arm64' ? 'linux_arm64' : 'linux_amd64';
}

async function fetchLatestManifestVersion(): Promise<string | undefined> {
  try {
    const platform = getManifestPlatform();
    const url = `https://antigravity-cli-auto-updater-974169037036.us-central1.run.app/manifests/${platform}.json`;
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const data = (await res.json()) as {version?: string};
    return data.version;
  } catch (e) {
    console.error('Failed to fetch Antigravity CLI release manifest:', e);
    return undefined;
  }
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  try {
    const currentRaw = await getAntigravityCliVersion();
    const latestVersion = await fetchLatestManifestVersion();
    if (latestVersion) {
      utils.storage.set('update-available-version-antigravityCli', latestVersion);
    }
    if (currentRaw && latestVersion && currentRaw !== 'unknown') {
      const match = currentRaw.match(/\d+\.\d+\.\d+/);
      const currentVersion = match ? match[0] : currentRaw;
      if (currentVersion !== latestVersion) {
        return true;
      }
    }
  } catch (e) {
    console.error('Error checking update for Antigravity CLI:', e);
  }

  return false;
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_antigravity_cli_installed', () => checkWhich('agy'));
  utils.ipc.handle('current_antigravity_cli_version', () => getAntigravityCliVersion());
}

function getAntigravityCliVersion(): Promise<string> {
  return new Promise(resolve => {
    exec('agy --version', (error, stdout) => {
      if (error) {
        resolve('unknown');
        return;
      }
      const version = stdout.trim();
      resolve(version || 'unknown');
    });
  });
}

const isInstalled = () => checkWhich('agy');

const AntigravityCli_MM: CardMainMethodsInitial = utils => {
  const configDir = utils.getConfigDir();

  return {
    mainIpc: () => mainIpc(utils),
    getRunCommands: () => getRunCommands(configDir),
    isInstalled,
    saveArgs: args => saveArgs(args, configDir),
    readArgs: () => readArgs(configDir),
    updateAvailable: () => updateAvailable(utils),
  };
};

export default AntigravityCli_MM;

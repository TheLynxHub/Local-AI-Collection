import {exec} from 'node:child_process';
import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {getCdCommand, isWin} from '../../../Utils/CrossUtils';
import {checkWhich, ensureScriptExecutable, initBatchFile, LINE_ENDING} from '../../../Utils/MainUtils';
import {parseArgsToFiles, parseFilesToArgs} from './RendererMethods';

const CONFIG_FILE = isWin ? 'hermes_config.bat' : 'hermes_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nhermes' : '#!/bin/bash\n\nhermes';

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
      console.error('Error saving settings file for Hermes Agent', e);
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
      console.error('Error reading settings file for Hermes Agent', e);
    }
  }

  return parseFilesToArgs(scriptData, settingsContent);
}

function parseVersionAndDate(raw: string): string {
  if (!raw || raw === 'unknown') return 'unknown';
  const fullMatch = raw.match(/(v?\d+\.\d+\.\d+\s*\(\d{4}\.\d+\.\d+\))/i);
  if (fullMatch) {
    return fullMatch[1];
  }
  const verMatch = raw.match(/(v?\d+\.\d+\.\d+)/i);
  if (verMatch) {
    return verMatch[1];
  }
  const dateMatch = raw.match(/(v?\d{4}\.\d+\.\d+)/i);
  if (dateMatch) {
    return dateMatch[1];
  }
  return raw.trim();
}

function getHermesAgentVersion(): Promise<string> {
  return new Promise(resolve => {
    exec('hermes --version', (error, stdout) => {
      if (error) {
        resolve('unknown');
        return;
      }
      const parsed = parseVersionAndDate(stdout);
      resolve(parsed || 'unknown');
    });
  });
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_hermes_agent_installed', () => checkWhich('hermes'));
  utils.ipc.handle('current_hermes_agent_version', () => getHermesAgentVersion());
}

async function fetchLatestHermesVersion(): Promise<string | undefined> {
  try {
    const res = await fetch('https://api.github.com/repos/NousResearch/hermes-agent/releases/latest', {
      headers: {
        'User-Agent': 'LynxHub-App',
      },
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as {tag_name?: string; name?: string};

    if (data.name) {
      const parsedName = parseVersionAndDate(data.name);
      if (parsedName && parsedName !== 'unknown') return parsedName;
    }
    if (data.tag_name) {
      const parsedTag = parseVersionAndDate(data.tag_name);
      if (parsedTag && parsedTag !== 'unknown') return parsedTag;
    }
    return undefined;
  } catch (e) {
    console.error('Failed to fetch Hermes Agent release info:', e);
    return undefined;
  }
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  try {
    const currentVersion = await getHermesAgentVersion();
    const latestVersion = await fetchLatestHermesVersion();

    if (latestVersion) {
      utils.storage.set('update-available-version-hermesAgent', latestVersion);
    }

    if (currentVersion && latestVersion && currentVersion !== 'unknown') {
      if (currentVersion !== latestVersion) {
        return true;
      }
    }
  } catch (e) {
    console.error('Error checking update for Hermes Agent:', e);
  }

  return false;
}

const isInstalled = () => checkWhich('hermes');

const HermesAgent_MM: CardMainMethodsInitial = utils => {
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

export default HermesAgent_MM;

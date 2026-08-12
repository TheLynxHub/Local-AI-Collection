import {exec} from 'node:child_process';
import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {getCdCommand, isWin} from '../../../utils/crossUtils';
import {checkWhich, ensureScriptExecutable, initBatchFile, LINE_ENDING} from '../../../utils/mainUtils';
import {parseArgsToFiles, parseFilesToArgs} from './RendererMethods';

const CONFIG_FILE = isWin ? 'claude_config.bat' : 'claude_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nclaude' : '#!/bin/bash\n\nclaude';

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

  // Ensure script is executable on Unix
  if (!isWin) {
    await ensureScriptExecutable(scriptPath);
  }

  if (settingsPath && settingsData) {
    try {
      await fs.promises.writeFile(settingsPath, settingsData);
    } catch (e) {
      console.error('Error saving settings.json file for Claude Code', e);
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
      console.error('Error reading settings.json file for Claude Code', e);
    }
  }

  return parseFilesToArgs(scriptData, settingsContent);
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  void utils;
  return false;
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_claude_code_installed', () => checkWhich('claude'));
  utils.ipc.handle('current_claude_code_version', () => getClaudeCodeVersion());
}

function getClaudeCodeVersion(): Promise<string> {
  return new Promise(resolve => {
    exec('claude --version', (error, stdout) => {
      if (error) {
        resolve('unknown');
        return;
      }
      const version = stdout.trim();
      resolve(version || 'unknown');
    });
  });
}

const isInstalled = () => checkWhich('claude');

const ClaudeCode_MM: CardMainMethodsInitial = utils => {
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

export default ClaudeCode_MM;

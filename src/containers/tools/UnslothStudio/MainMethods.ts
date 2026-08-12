import path from 'node:path';

import axios from 'axios';
import treeKill from 'tree-kill';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {UNSLOTH_STUDIO_ID} from '../../../constants';
import {getCdCommand, isWin} from '../../../utils/crossUtils';
import {
  checkWhich,
  determineShell,
  ensureScriptExecutable,
  initBatchFile,
  LINE_ENDING,
  utilReadArgs,
  utilSaveArgs,
} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs, TAG_KEY} from './RendererMethods';

const CONFIG_FILE = isWin ? 'unsloth-studio_config.bat' : 'unsloth-studio_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nunsloth studio' : '#!/bin/bash\n\nunsloth studio';

export async function getRunCommands(configDir?: string): Promise<string | string[]> {
  console.log('start run');
  if (!configDir) return '';

  const filePath = path.resolve(path.join(configDir, CONFIG_FILE));
  await initBatchFile(filePath, DEFAULT_BATCH_DATA);
  console.log('filePath', filePath);

  if (!isWin) {
    await ensureScriptExecutable(filePath);
  }

  console.log('run', [
    getCdCommand(configDir) + LINE_ENDING,
    `${isWin ? `& "${filePath}"` : `bash "${filePath}"`}${LINE_ENDING}`,
  ]);

  return [getCdCommand(configDir) + LINE_ENDING, `${isWin ? `& "${filePath}"` : `bash "${filePath}"`}${LINE_ENDING}`];
}

async function saveArgs(args: ChosenArgument[], configDir?: string) {
  return await utilSaveArgs(args, CONFIG_FILE, parseArgsToString, configDir);
}

export async function readArgs(configDir?: string) {
  return await utilReadArgs(CONFIG_FILE, DEFAULT_BATCH_DATA, parseStringToArgs, configDir);
}

async function fetchLatestTag(): Promise<string | undefined> {
  try {
    const response = await axios.get('https://api.github.com/repos/unslothai/unsloth/releases');
    if (response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].tag_name) {
      return response.data[0].tag_name;
    }
  } catch (e) {
    console.error('Failed to fetch Unsloth releases in main process:', e);
  }

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
  try {
    const savedTag = utils.storage.get<string>(TAG_KEY);
    const latestTag = await fetchLatestTag();
    if (latestTag) {
      utils.storage.set('update-available-tag-unsloth-studio', latestTag);
    }
    if (savedTag && latestTag && savedTag !== latestTag) {
      return true;
    }
  } catch (e) {
    console.error('Failed to check update for Unsloth Studio:', e);
  }

  return false;
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_unsloth_installed', () => checkWhich('unsloth'));
}

const isInstalled = () => checkWhich('unsloth');

async function uninstall(utils: MainModuleUtils): Promise<void> {
  return new Promise(resolve => {
    const ptyProcess = utils.pty.spawn(determineShell(), [], {});

    ptyProcess.onExit(() => {
      if (ptyProcess.pid) {
        treeKill(ptyProcess.pid);
        ptyProcess.kill();
      }
      resolve();
    });

    utils.getExtensions_TerminalPreCommands(UNSLOTH_STUDIO_ID).forEach(command => ptyProcess.write(command));

    const uninstallCmd = isWin
      ? `irm https://raw.githubusercontent.com/unslothai/unsloth/main/scripts/uninstall.ps1 | iex${LINE_ENDING}`
      : `curl -fsSL https://raw.githubusercontent.com/unslothai/unsloth/main/scripts/uninstall.sh | sh${LINE_ENDING}`;

    ptyProcess.write(uninstallCmd);
    ptyProcess.write(`exit${LINE_ENDING}`);
  });
}

const Unsloth_MM: CardMainMethodsInitial = utils => {
  const configDir = utils.getConfigDir();

  return {
    mainIpc: () => mainIpc(utils),
    getRunCommands: () => getRunCommands(configDir),
    readArgs: () => readArgs(configDir),
    saveArgs: args => saveArgs(args, configDir),
    updateAvailable: () => updateAvailable(utils),
    isInstalled,
    uninstall: () => uninstall(utils),
  };
};

export default Unsloth_MM;

import path from 'node:path';

import {compare} from 'semver';
import treeKill from 'tree-kill';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {OPEN_WEBUI_ID} from '../../../constants';
import {getCdCommand, isWin, removeAnsi} from '../../../utils/crossUtils';
import {
  determineShell,
  ensureScriptExecutable,
  getLatestPipPackageVersion,
  getPipPackageVersion,
  initBatchFile,
  LINE_ENDING,
  utilReadArgs,
  utilSaveArgs,
} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const CONFIG_FILE = isWin ? 'open-webui_config.bat' : 'open-webui_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nopen-webui serve' : '#!/bin/bash\n\nopen-webui serve';

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

async function isInstalled(utils: MainModuleUtils): Promise<boolean> {
  const result = await getPipPackageVersion('open-webui', utils, OPEN_WEBUI_ID);
  return !!result;
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  try {
    const currentVersion = await getPipPackageVersion('open-webui', utils, OPEN_WEBUI_ID);
    const latestVersion = await getLatestPipPackageVersion('open-webui');
    if (currentVersion && latestVersion && compare(currentVersion, latestVersion) === -1) {
      utils.storage.set('update-available-version-openwebui', latestVersion);
      return true;
    }
  } catch (err) {
    console.error('Error checking update for open-webui', err);
    utils.storage.set('update-available-version-openwebui', undefined);
    return false;
  }

  utils.storage.set('update-available-version-openwebui', undefined);
  return false;
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_openwebui_installed', () => isInstalled(utils));
  utils.ipc.handle('current_openwebui_version', () => getPipPackageVersion('open-webui', utils, OPEN_WEBUI_ID));
}

async function uninstall(utils: MainModuleUtils): Promise<void> {
  return new Promise((resolve, reject) => {
    const ptyProcess = utils.pty.spawn(determineShell(), [], {});
    let output = '';

    ptyProcess.onData((data: any) => {
      output += data;
    });

    ptyProcess.onExit(() => {
      if (ptyProcess.pid) {
        treeKill(ptyProcess.pid);
        ptyProcess.kill();
      }

      const cleanOutput = removeAnsi(output);
      const lines = cleanOutput.split(LINE_ENDING);

      const successRegex = /Successfully\s+uninstalled\s+open-webui/i;
      const proceedRegex = /Proceed\s+\(Y\/n\)\?\s*$/i;
      const uninstallingRegex = /Uninstalling\s+open-webui/i;

      const hasSuccess =
        lines.some(line => successRegex.test(line)) ||
        (lines.some(line => uninstallingRegex.test(line)) && lines.some(line => proceedRegex.test(line)));

      if (hasSuccess) {
        resolve();
      } else {
        reject(new Error(`Error uninstalling open-webui.`));
      }
    });

    utils.getExtensions_TerminalPreCommands(OPEN_WEBUI_ID).forEach(command => ptyProcess.write(command));

    ptyProcess.write(`pip uninstall -y open-webui${LINE_ENDING}`);
    ptyProcess.write(`exit${LINE_ENDING}`);
  });
}

const OpenWebUI_MM: CardMainMethodsInitial = utils => {
  const configDir = utils.getConfigDir();

  return {
    getRunCommands: () => getRunCommands(configDir),
    updateAvailable: () => updateAvailable(utils),
    isInstalled: () => isInstalled(utils),
    mainIpc: () => mainIpc(utils),
    saveArgs: args => saveArgs(args, configDir),
    readArgs: () => readArgs(configDir),
    uninstall: () => uninstall(utils),
  };
};

export default OpenWebUI_MM;

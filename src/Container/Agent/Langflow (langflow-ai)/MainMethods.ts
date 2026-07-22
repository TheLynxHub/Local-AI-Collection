import path from 'node:path';

import {compare} from 'semver';
import treeKill from 'tree-kill';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {LANGFLOW_ID} from '../../../Constants';
import {getCdCommand, isWin, removeAnsi} from '../../../Utils/CrossUtils';
import {
  determineShell,
  ensureScriptExecutable,
  getLatestPipPackageVersion,
  getPipPackageVersion,
  initBatchFile,
  LINE_ENDING,
  utilReadArgs,
  utilSaveArgs,
} from '../../../Utils/MainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const CONFIG_FILE = isWin ? 'langflow_config.bat' : 'langflow_config.sh';
const DEFAULT_BATCH_DATA: string = isWin ? '@echo off\n\nlangflow run' : '#!/bin/bash\n\nlangflow run';

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
  return await utilSaveArgs(args, CONFIG_FILE, parseArgsToString, configDir);
}

async function readArgs(configDir?: string) {
  return await utilReadArgs(CONFIG_FILE, DEFAULT_BATCH_DATA, parseStringToArgs, configDir);
}

async function isInstalled(utils: MainModuleUtils): Promise<boolean> {
  const result = await getPipPackageVersion('langflow', utils, LANGFLOW_ID);
  return !!result;
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  try {
    const currentVersion = await getPipPackageVersion('langflow', utils, LANGFLOW_ID);
    const latestVersion = await getLatestPipPackageVersion('langflow');
    if (currentVersion && latestVersion && compare(currentVersion, latestVersion) === -1) {
      utils.storage.set('update-available-version-langflow', latestVersion);
      return true;
    }
  } catch (err) {
    console.error('Error checking update for langflow', err);
    utils.storage.set('update-available-version-langflow', undefined);
    return false;
  }

  utils.storage.set('update-available-version-langflow', undefined);
  return false;
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_langflow_installed', () => isInstalled(utils));
  utils.ipc.handle('current_langflow_version', () => getPipPackageVersion('langflow', utils, LANGFLOW_ID));
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

      const successRegex = /Successfully\s+uninstalled\s+langflow/i;
      const proceedRegex = /Proceed\s+\(Y\/n\)\?\s*$/i;
      const uninstallingRegex = /Uninstalling\s+langflow/i;

      const hasSuccess =
        lines.some(line => successRegex.test(line)) ||
        (lines.some(line => uninstallingRegex.test(line)) && lines.some(line => proceedRegex.test(line)));

      if (hasSuccess) {
        resolve();
      } else {
        reject(new Error(`Failed to uninstall langflow: ${output}`));
      }
    });

    utils.getExtensions_TerminalPreCommands(LANGFLOW_ID).forEach(command => ptyProcess.write(command));

    ptyProcess.write(`pip uninstall -y langflow${LINE_ENDING}`);
    ptyProcess.write(`exit${LINE_ENDING}`);
  });
}

const Langflow_MM: CardMainMethodsInitial = utils => {
  const configDir = utils.getConfigDir();

  return {
    mainIpc: () => mainIpc(utils),
    getRunCommands: () => getRunCommands(configDir),
    isInstalled: () => isInstalled(utils),
    saveArgs: args => saveArgs(args, configDir),
    readArgs: () => readArgs(configDir),
    updateAvailable: () => updateAvailable(utils),
    uninstall: () => uninstall(utils),
  };
};

export default Langflow_MM;

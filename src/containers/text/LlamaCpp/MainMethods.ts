import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {LLAMA_CPP_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {fetchLlamaCppReleases, getLatestLlamaCppTag} from './utils/github';

export const LLAMA_CPP_INSTALL_TIME_KEY = 'install-time-llamaCpp';
export const LLAMA_CPP_INSTALL_DIR_KEY = 'install-dir-llamaCpp';
export const LLAMA_CPP_UPDATE_TIME_KEY = 'update-time-llamaCpp';
export const LLAMA_CPP_VERSION_KEY = 'version-llamaCpp';
export const LLAMA_CPP_PLATFORM_KEY = 'platform-llamaCpp';

export function getLlamaExecutablePath(dir?: string): string | undefined {
  if (!dir || !fs.existsSync(dir)) return undefined;

  const binaries = isWin
    ? ['llama-server.exe', 'llama-cli.exe', 'server.exe', 'main.exe']
    : ['llama-server', 'llama-cli', 'server', 'main'];

  for (const bin of binaries) {
    const fullPath = path.join(dir, bin);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  // Check subfolders in case extraction created a subfolder
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const subDir = path.join(dir, item);
      if (fs.statSync(subDir).isDirectory()) {
        for (const bin of binaries) {
          const fullPath = path.join(subDir, bin);
          if (fs.existsSync(fullPath)) {
            return fullPath;
          }
        }
      }
    }
  } catch (e) {
    console.error('Error searching subdirectories for llama.cpp binary:', e);
  }

  return undefined;
}

function getArgsFilePath(dir: string): string {
  return path.join(dir, 'llama-server.args.json');
}

async function saveArgs(args: ChosenArgument[], dir?: string): Promise<void> {
  if (!dir) return;
  try {
    const filePath = getArgsFilePath(dir);
    await fs.promises.writeFile(filePath, JSON.stringify(args, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving llama.cpp arguments:', error);
  }
}

async function readArgs(dir?: string): Promise<ChosenArgument[]> {
  if (!dir) return [];
  try {
    const filePath = getArgsFilePath(dir);
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading llama.cpp arguments:', error);
  }
  return [];
}

async function getRunCommands(utils: MainModuleUtils): Promise<string> {
  const dir = utils.getInstallDir(LLAMA_CPP_ID);
  const exePath = getLlamaExecutablePath(dir);

  if (!exePath) {
    return isWin ? 'echo "llama-server executable not found!"' : 'echo "llama-server executable not found!"';
  }

  const savedArgs = await readArgs(dir);
  let command = `"${exePath}"`;

  if (savedArgs.length > 0) {
    savedArgs.forEach(arg => {
      if (String(arg.value) === 'true' || String(arg.value) === '1') {
        command += ` ${arg.name}`;
      } else if (arg.value !== undefined && arg.value !== null && String(arg.value).trim() !== '') {
        command += ` ${arg.name} "${arg.value}"`;
      }
    });
  } else {
    command += ' --host 127.0.0.1 --port 8080 --cors';
  }

  return command;
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  try {
    const currentVersion = await utils.storage.get<string>(LLAMA_CPP_VERSION_KEY);
    if (!currentVersion || currentVersion === 'unknown') return false;

    const latestTag = await getLatestLlamaCppTag();
    if (!latestTag || latestTag === 'unknown') return false;

    return currentVersion !== latestTag;
  } catch (error) {
    console.error('Error checking llama.cpp updates:', error);
    return false;
  }
}

async function isInstalled(utils: MainModuleUtils): Promise<boolean> {
  const dir = utils.getInstallDir(LLAMA_CPP_ID);
  return getLlamaExecutablePath(dir) !== undefined;
}

async function uninstall(utils: MainModuleUtils): Promise<void> {
  const dir = utils.getInstallDir(LLAMA_CPP_ID);
  if (dir && fs.existsSync(dir)) {
    await utils.removeDir(dir);
  }
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('validate_llama_cpp_install_dir', (_event, dir: string) => {
    const exe = getLlamaExecutablePath(dir);
    return exe !== undefined;
  });

  utils.ipc.handle('fetch_llama_cpp_releases', async () => {
    return await fetchLlamaCppReleases();
  });

  utils.ipc.handle('fetch_llama_cpp_latest_tag', async () => {
    return await getLatestLlamaCppTag();
  });
}

const LlamaCpp_MM: CardMainMethodsInitial = utils => {
  return {
    mainIpc: () => mainIpc(utils),
    getRunCommands: () => getRunCommands(utils),
    isInstalled: () => isInstalled(utils),
    saveArgs: args => saveArgs(args, utils.getInstallDir(LLAMA_CPP_ID)),
    readArgs: () => readArgs(utils.getInstallDir(LLAMA_CPP_ID)),
    updateAvailable: () => updateAvailable(utils),
    uninstall: () => uninstall(utils),
  };
};

export default LlamaCpp_MM;

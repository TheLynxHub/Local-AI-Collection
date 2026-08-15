import {execFile} from 'node:child_process';
import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {LLAMA_CPP_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {
  fetchLlamaCppReleases,
  getLatestLlamaCppTag,
  LLAMA_CPP_INSTALL_DIR_KEY,
  LLAMA_CPP_INSTALL_TIME_KEY,
  LLAMA_CPP_PLATFORM_KEY,
  LLAMA_CPP_UPDATE_TIME_KEY,
} from './utils/github';

export {LLAMA_CPP_INSTALL_DIR_KEY, LLAMA_CPP_INSTALL_TIME_KEY, LLAMA_CPP_PLATFORM_KEY, LLAMA_CPP_UPDATE_TIME_KEY};

export function getLlamaExecutablePath(dir?: string): string | undefined {
  if (!dir || !fs.existsSync(dir)) return undefined;

  const binaries = isWin
    ? ['llama-server.exe', 'llama-cli.exe', 'llama.exe', 'server.exe', 'main.exe']
    : ['llama-server', 'llama-cli', 'llama', 'server', 'main'];

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

export function parseLlamaVersion(raw?: string): string | undefined {
  if (!raw) return undefined;
  const text = raw.trim();

  // Pattern 1: 'build 10424', 'build: 10424', '(build 10424,'
  const buildMatch = text.match(/\bbuild[:\s]+(\d+)\b/i);
  if (buildMatch) {
    return `b${buildMatch[1]}`;
  }

  // Pattern 2: 'version: 10375' or 'version: b10375'
  const versionNumMatch = text.match(/\bversion:\s*b?(\d+)\b/i);
  if (versionNumMatch) {
    return `b${versionNumMatch[1]}`;
  }

  // Pattern 3: 'b10375-ba360efe1' or 'b10375'
  const bTagMatch = text.match(/\b(b\d+)(?:-[a-f0-9]+)?\b/i);
  if (bTagMatch) {
    return bTagMatch[1].toLowerCase();
  }

  // Pattern 4: Semver like 'v0.1.0' or '0.1.0'
  const semverMatch = text.match(/\b(v?\d+\.\d+\.\d+(?:-[a-z0-9.]+)?)\b/i);
  if (semverMatch) {
    return semverMatch[1];
  }

  return text.split('\n')[0].trim();
}

export function getLlamaVersion(dir?: string): Promise<string> {
  return new Promise(resolve => {
    const exePath = getLlamaExecutablePath(dir);
    if (!exePath) {
      resolve('unknown');
      return;
    }

    execFile(exePath, ['--version'], {timeout: 10000}, (_error, stdout, stderr) => {
      const output = `${stdout || ''}\n${stderr || ''}`.trim();
      if (!output) {
        resolve('unknown');
        return;
      }
      resolve(parseLlamaVersion(output) || 'unknown');
    });
  });
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
  let command = isWin ? `& "${exePath}"` : `"${exePath}"`;

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
    const dir = utils.getInstallDir(LLAMA_CPP_ID);
    const currentVersion = await getLlamaVersion(dir);
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

  utils.ipc.handle('current_llama_cpp_version', async (_event, dir?: string) => {
    const targetDir = dir || utils.getInstallDir(LLAMA_CPP_ID);
    return await getLlamaVersion(targetDir);
  });

  utils.ipc.handle('fetch_llama_cpp_releases', async () => {
    return await fetchLlamaCppReleases();
  });

  utils.ipc.handle('fetch_llama_cpp_latest_tag', async () => {
    return await getLatestLlamaCppTag();
  });

  utils.ipc.handle('copy_llama_cpp_files', async (_event, src: string, dest: string) => {
    try {
      await fs.promises.mkdir(dest, {recursive: true});
      await fs.promises.cp(src, dest, {recursive: true, force: true});
    } catch (error: any) {
      console.error('Failed to copy llama.cpp files:', error);
      if (error?.code === 'EPERM' || error?.code === 'EACCES') {
        throw new Error(
          `Permission denied (EPERM) writing to "${dest}". Please choose a directory with write permissions.`,
          {cause: error},
        );
      }
      throw new Error(`Failed to copy files to "${dest}": ${error?.message || error}`, {cause: error});
    }
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

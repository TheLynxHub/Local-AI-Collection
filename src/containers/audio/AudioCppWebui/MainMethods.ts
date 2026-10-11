import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {AUDIO_CPP_WEBUI_ID} from '../../../constants';
import {isWin} from '../../../utils/crossUtils';
import {checkDirExist, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';
import {fetchAudioCppReleases, getLatestAudioCppTag} from './utils/github';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const DEFAULT_BATCH_DATA: string = isWin
  ? '@echo off\n\n' +
    'set AUDIOCPP_NO_BROWSER=1\n' +
    'if exist "%~dp0venv\\Scripts\\python.exe" (\n' +
    '  "%~dp0venv\\Scripts\\python.exe" webui\\webui.py\n' +
    ') else (\n' +
    '  python webui\\webui.py\n' +
    ')'
  : '#!/usr/bin/env bash\n\n' +
    'export AUDIOCPP_NO_BROWSER="1"\n' +
    'if [ -f "./venv/bin/python" ]; then\n' +
    '  ./venv/bin/python webui/webui.py\n' +
    'else\n' +
    '  python webui/webui.py\n' +
    'fi';

export async function isAudioCppInstalled(dir?: string): Promise<boolean> {
  if (!dir) return false;
  const exists = await checkDirExist(dir);
  if (!exists) return false;

  const keyFiles = [
    'run_webui.bat',
    'run_native_webui.bat',
    'run_server.bat',
    path.join('webui', 'webui.py'),
    path.join('gpu', 'audiocpp_server.exe'),
    path.join('cpu', 'audiocpp_server.exe'),
    'audiocpp_server.exe',
    'audiocpp_server',
    'CMakeLists.txt',
    'requirements.txt',
  ];

  for (const file of keyFiles) {
    if (fs.existsSync(path.join(dir, file))) {
      return true;
    }
  }

  return false;
}

export async function getInstalledVersion(dir?: string): Promise<string> {
  if (!dir || !fs.existsSync(dir)) return 'unknown';

  const versionJsonPath = path.join(dir, 'version.json');
  if (fs.existsSync(versionJsonPath)) {
    try {
      const data = JSON.parse(await fs.promises.readFile(versionJsonPath, 'utf8'));
      if (data?.version) return `v${data.version}`;
    } catch {
      // Fall through if file is corrupt
    }
  }

  // Check manifest files
  try {
    const files = await fs.promises.readdir(dir);
    const manifest = files.find(f => f.startsWith('manifest-') && f.endsWith('.json'));
    if (manifest) {
      const tagMatch = manifest.match(/manifest-(v[\d.]+)\.json/i);
      if (tagMatch) return tagMatch[1];
    }
  } catch {
    // Ignore read errors
  }

  return 'unknown';
}

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string): Promise<void> {
  await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);
}

export async function readArgs(dir?: string): Promise<ChosenArgument[]> {
  return await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  try {
    const dir = utils.getInstallDir(AUDIO_CPP_WEBUI_ID);
    const currentVersion = await getInstalledVersion(dir);
    if (!currentVersion || currentVersion === 'unknown') return false;

    const latestTag = await getLatestAudioCppTag();
    if (!latestTag || latestTag === 'unknown') return false;

    return !latestTag.includes(currentVersion.replace(/^v/, ''));
  } catch (error) {
    console.error('Error checking audio.cpp-webui updates:', error);
    return false;
  }
}

async function uninstall(utils: MainModuleUtils): Promise<void> {
  const dir = utils.getInstallDir(AUDIO_CPP_WEBUI_ID);
  if (dir && fs.existsSync(dir)) {
    await utils.removeDir(dir);
  }
}

function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('validate_audiocpp_install_dir', async (_event, dir: string) => {
    return await isAudioCppInstalled(dir);
  });

  utils.ipc.handle('current_audiocpp_version', async (_event, dir?: string) => {
    const targetDir = dir || utils.getInstallDir(AUDIO_CPP_WEBUI_ID);
    return await getInstalledVersion(targetDir);
  });

  utils.ipc.handle('fetch_audiocpp_releases', async () => {
    return await fetchAudioCppReleases();
  });

  utils.ipc.handle('fetch_audiocpp_latest_tag', async () => {
    return await getLatestAudioCppTag();
  });

  utils.ipc.handle('copy_audiocpp_files', async (_event, src: string, dest: string) => {
    try {
      await fs.promises.mkdir(dest, {recursive: true});
      const payloadPath = path.join(src, 'payload');
      const actualSrc = fs.existsSync(payloadPath) ? payloadPath : src;
      await fs.promises.cp(actualSrc, dest, {recursive: true, force: true});
    } catch (error: any) {
      console.error('Failed to copy audio.cpp-webui files:', error);
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

const AudioCppWebui_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(AUDIO_CPP_WEBUI_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    mainIpc: () => mainIpc(utils),
    isInstalled: () => isAudioCppInstalled(installDir),
    updateAvailable: () => updateAvailable(utils),
    uninstall: () => uninstall(utils),
  };
};

export default AudioCppWebui_MM;

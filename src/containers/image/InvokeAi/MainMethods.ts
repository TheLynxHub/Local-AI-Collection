import path from 'node:path';

import {compare} from 'semver';

import {CardMainMethodsInitial, ChosenArgument, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {INVOKE_ID} from '../../../constants';
import {extractGitUrl} from '../../../utils/crossUtils';
import {
  checkDirExist,
  checkWhich,
  getLatestPipPackageVersion,
  isVenvDirectory,
  LINE_ENDING,
  utilReadArgs,
  utilSaveArgs,
} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';
import {Invoke_Command_ActivateVenv, INVOKEAI_UPDATE_AVAILABLE_KEY} from './utils/constants';
import {invokeGetCurrentVersion, invokeGetLatestReleases, invokeValidateInstallation} from './utils/mainUtils';

const CONFIG_FILE = 'invokeai.yaml';
const DEFAULT_CONFIG_DATA = 'schema_version: 4.0.2\n\n';

async function getRunCommands(dir?: string): Promise<string | string[]> {
  return [`${Invoke_Command_ActivateVenv}${LINE_ENDING}`, `invokeai-web --root ${dir}${LINE_ENDING}`];
}

export async function saveArgs(args: ChosenArgument[], dir?: string) {
  return await utilSaveArgs(args, CONFIG_FILE, parseArgsToString, dir);
}

export async function readArgs(dir?: string) {
  return await utilReadArgs(CONFIG_FILE, DEFAULT_CONFIG_DATA, parseStringToArgs, dir);
}

async function mainIpc(utils: MainModuleUtils) {
  utils.ipc.handle('is_uv_installed', () => {
    return checkWhich('uv');
  });

  utils.ipc.handle('invoke_latest_versions', () => {
    const {owner, repo} = extractGitUrl('https://github.com/invoke-ai/InvokeAI');
    return invokeGetLatestReleases(owner, repo);
  });

  utils.ipc.handle('invoke_current_version', () => invokeGetCurrentVersion(utils.storage));

  utils.ipc.handle('validate_install_dir', (_, dir: string) => {
    const venvDir = path.join(dir, '.venv');

    const isVenvDir = isVenvDirectory(venvDir);
    if (!isVenvDir) return false;

    return invokeValidateInstallation(dir);
  });
}

async function updateAvailable(utils: MainModuleUtils): Promise<boolean> {
  const currentVersion = await invokeGetCurrentVersion(utils.storage);

  if (!currentVersion) return false;

  const latestVersion = await getLatestPipPackageVersion('invokeai');

  if (currentVersion && latestVersion && compare(currentVersion, latestVersion) === -1) {
    utils.storage.set(INVOKEAI_UPDATE_AVAILABLE_KEY, latestVersion);
    return true;
  }

  utils.storage.set(INVOKEAI_UPDATE_AVAILABLE_KEY, undefined);
  return false;
}

async function isInstalled(dir: string | undefined) {
  if (!dir) return false;

  const isFolderExist = await checkDirExist(dir);
  if (!isFolderExist) return false;

  const venvDir = path.join(dir, '.venv');
  const isVenvDir = isVenvDirectory(venvDir);
  if (!isVenvDir) return false;

  return invokeValidateInstallation(dir) === true;
}

const Invoke_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(INVOKE_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    updateAvailable: () => updateAvailable(utils),
    mainIpc: () => mainIpc(utils),
    isInstalled: () => isInstalled(installDir),
  };
};

export default Invoke_MM;

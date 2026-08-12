import {execSync} from 'node:child_process';
import path, {resolve} from 'node:path';

import axios, {AxiosResponse} from 'axios';

import {GitHubRelease, StorageType} from '../../../../../../src/common/types/plugins/modules';
import {getVenvPythonPath} from '../../../../utils/crossUtils';
import {getPipPackageVersionCustom, isVenvDirectory} from '../../../../utils/mainUtils';
import {INVOKEAI_INSTALL_DIR_KEY} from './constants';

export async function invokeGetLatestReleases(owner: string, repo: string): Promise<string[]> {
  try {
    const response: AxiosResponse<GitHubRelease[]> = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/releases`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );

    const releases = response.data;

    return releases.map(release => {
      const tagName = release.tag_name;
      return tagName.startsWith('v') ? tagName.slice(1) : tagName;
    });
  } catch (error) {
    console.error('Error fetching releases from GitHub:', error);
    return [];
  }
}

export function invokeValidateInstallation(dir: string): boolean | string {
  const venvPath = resolve(`${dir}/.venv`);
  const pythonPath = getVenvPythonPath(venvPath);

  if (!pythonPath) {
    console.error(`Could not find Python executable for directory: ${venvPath}`);
    return `Could not find Python executable for directory: ${venvPath}`;
  }

  try {
    const command = `"${pythonPath}" -c "import invokeai"`;

    execSync(command, {stdio: 'pipe'});

    console.log(`Validation successful: 'invokeai' package found using ${pythonPath}`);
    return true;
  } catch (err: any) {
    console.warn(`Validation failed: 'invokeai' package not found or error executing Python at ${pythonPath}.`, err);
    return err.message;
  }
}

export async function invokeGetCurrentVersion(storage: StorageType) {
  const dir = storage.get(INVOKEAI_INSTALL_DIR_KEY) as string | undefined;
  if (!dir) return null;

  const venvDir = path.join(dir, '.venv');
  const isDir = isVenvDirectory(venvDir);

  if (!isDir) return null;

  const pythonExe = getVenvPythonPath(venvDir);

  return await getPipPackageVersionCustom(pythonExe, 'invokeai');
}

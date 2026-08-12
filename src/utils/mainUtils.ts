import {exec, execSync} from 'node:child_process';
import {platform} from 'node:os';
import {join} from 'node:path';

import axios from 'axios';
import fs, {promises} from 'graceful-fs';
import {existsSync} from 'graceful-fs';
import {RemoteWithRefs, simpleGit} from 'simple-git';
import treeKill from 'tree-kill';
import which from 'which';

import {ChosenArgument, MainModuleUtils} from '../../../src/common/types/plugins/modules';
import {getVenvPythonPath, isWin} from './crossUtils';

export const LINE_ENDING = isWin ? '\r' : '\n';

export async function initBatchFile(filePath: string, data: string) {
  try {
    await fs.promises.access(filePath);
  } catch (error) {
    console.log(error);
    await fs.promises.writeFile(filePath, data, {encoding: 'utf-8'});
    // Make shell scripts executable on Unix systems
    if (!isWin && (filePath.endsWith('.sh') || !filePath.includes('.'))) {
      await fs.promises.chmod(filePath, 0o755);
    }
  }
}

/**
 * Ensures a shell script file has proper shebang and is executable on Unix systems.
 * @param filePath Path to the script file
 */
export async function ensureScriptExecutable(filePath: string): Promise<void> {
  if (isWin) return;

  try {
    // Read current content
    const content = await fs.promises.readFile(filePath, 'utf-8');

    // Check if shebang is missing for .sh files
    if (filePath.endsWith('.sh') && !content.startsWith('#!')) {
      // Prepend shebang if missing
      await fs.promises.writeFile(filePath, `#!/bin/bash\n${content}`, {encoding: 'utf-8'});
    }

    // Make executable
    await fs.promises.chmod(filePath, 0o755);
  } catch (error) {
    console.error(`Error ensuring script executable: ${filePath}`, error);
  }
}

export async function utilRunCommands(
  batFileName: string,
  dir?: string,
  defaultData?: string,
): Promise<string | string[]> {
  if (dir && defaultData) {
    const filePath = join(dir, batFileName);
    await initBatchFile(filePath, defaultData);
    // Ensure script is executable on Unix
    if (!isWin) {
      await ensureScriptExecutable(filePath);
    }
  }

  return `${isWin ? '.\\' : 'bash ./'}${batFileName}${LINE_ENDING}`;
}

export async function utilSaveArgs(
  args: ChosenArgument[],
  batFileName: string,
  parser: (args: ChosenArgument[]) => string,
  cardDir?: string,
) {
  if (!cardDir) return;
  const result = parser(args);
  const filePath = join(cardDir, batFileName);

  await fs.promises.writeFile(filePath, result);

  // Ensure script is executable on Unix
  if (!isWin && batFileName.endsWith('.sh')) {
    await ensureScriptExecutable(filePath);
  }
}

export async function utilReadArgs(
  batFileName: string,
  defaultData: string,
  parser: (args: string) => ChosenArgument[],
  cardDir?: string,
) {
  if (!cardDir) return [];
  const filePath = join(cardDir, batFileName);

  await initBatchFile(filePath, defaultData);

  // Ensure script is executable on Unix
  if (!isWin && batFileName.endsWith('.sh')) {
    await ensureScriptExecutable(filePath);
  }

  const data = await fs.promises.readFile(filePath, 'utf-8');

  if (!data) return [];

  return parser(data);
}

/**
 * Gets the highest available PowerShell version on the system.
 * @returns The major version number of PowerShell, or 0 if PowerShell is not found.
 */
export function getPowerShellVersion(): number {
  const command = '$PSVersionTable.PSVersion.Major';

  try {
    // Try PowerShell Core (pwsh.exe) first
    const pwshVersion = parseInt(
      execSync(`pwsh.exe -NoProfile -Command "${command}"`, {
        encoding: 'utf8' as const,
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim(),
      10,
    );
    if (pwshVersion >= 7) return pwshVersion;

    // Fall back to Windows PowerShell (powershell.exe)
    const psVersion = parseInt(
      execSync(`powershell.exe -NoProfile -Command "${command}"`, {
        encoding: 'utf8' as const,
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim(),
      10,
    );
    return psVersion >= 5 ? psVersion : 0;
  } catch (err) {
    console.error('Error determining PowerShell version:', err);
    return 0;
  }
}

/**
 * Determines the appropriate shell based on the operating system and PowerShell version.
 * @returns The shell command to use.
 */
export function determineShell(): string {
  switch (platform()) {
    case 'darwin':
      return 'zsh';
    case 'linux':
      return 'bash';
    case 'win32':
    default:
      return getPowerShellVersion() >= 5 ? 'pwsh.exe' : 'powershell.exe';
  }
}

export async function checkWhich(name: string) {
  try {
    await which(name);
    return true;
  } catch {
    return false;
  }
}

export async function getPipPackageVersion(
  packageName: string,
  utils: MainModuleUtils,
  id?: string,
): Promise<string | null> {
  return new Promise(resolve => {
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
      const lines = output.split(/\r?\n/);
      const versionLine = lines.find(line => line.toLowerCase().includes('version:'));
      if (versionLine) {
        const version = versionLine.split(': ')[1].trim();
        resolve(version);
      } else {
        resolve(null);
      }
    });

    if (id) utils.getExtensions_TerminalPreCommands(id).forEach(command => ptyProcess.write(command));

    ptyProcess.write(`pip show ${packageName}${LINE_ENDING}`);
    ptyProcess.write(`exit${LINE_ENDING}`);
  });
}

export async function getPipPackageVersionCustom(pythonExePath: string, packageName: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const command = `"${pythonExePath}" -m pip show ${packageName}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        if (stderr && stderr.includes(`Package(s) not found: ${packageName}`)) {
          resolve(null);
          return;
        }
        reject(`Error getting package info for ${packageName}: ${error.message}`);
        return;
      }
      if (stderr) {
        console.warn(`stderr when getting package info for ${packageName}: ${stderr}`);
      }

      const lines = stdout.split('\n');
      for (const line of lines) {
        if (line.startsWith('Version:')) {
          const version = line.replace('Version:', '').trim();
          resolve(version);
          return;
        }
      }

      console.warn(`Could not find Version in pip show output for ${packageName}`);
      resolve(null);
    });
  });
}

export async function getLatestPipPackageVersion(packageName: string): Promise<string | null> {
  const url = `https://pypi.org/pypi/${packageName}/json`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data && data.info && data.info.version) {
      return data.info.version;
    } else {
      console.error(`Could not find version information for ${packageName} in the response.`);
      return null;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error(`Package ${packageName} not found on PyPI.`);
      } else {
        console.error(`Error fetching package information for ${packageName}:`, error.message);
      }
    } else {
      console.error(`An unexpected error occurred while fetching package information:`, error);
    }
    return null;
  }
}

export function isVenvDirectory(dirPath: string): boolean {
  try {
    if (!existsSync(dirPath)) {
      return false;
    }

    const pythonExePath = getVenvPythonPath(dirPath);
    if (!existsSync(pythonExePath)) {
      return false;
    }

    const libPath = join(dirPath, 'lib');
    return existsSync(libPath);
  } catch (err) {
    console.error(`Error checking if directory is a venv: ${err}`);
    return false;
  }
}

function formatGitUrl(url: string): string | undefined {
  const githubRegex = /^https:\/\/github\.com\/.+$/;

  if (!githubRegex.test(url)) {
    console.log(`This url: ${url} isn't a GitHub Repository`);
    return undefined;
  }

  return url.endsWith('.git') ? url.slice(0, -4) : url;
}

export async function isGitRoot(dir: string, repoUrl: string): Promise<boolean> {
  try {
    const result: RemoteWithRefs[] = await simpleGit(dir).getRemotes(true);
    return formatGitUrl(result[0]?.refs.fetch) === formatGitUrl(repoUrl);
  } catch (_) {
    return false;
  }
}

export async function checkDirExist(dir: string) {
  if (!dir) return false;

  try {
    await promises.access(dir);
  } catch (error) {
    return false;
  }

  return true;
}

export async function checkFilesExist(dir: string, files: string[]) {
  try {
    for (const file of files) {
      const fullPath = join(dir, file);
      try {
        await promises.access(fullPath);
      } catch (error) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function isGitTypeInstalled(dir: string | undefined, url: string, files: string[]) {
  if (!dir) return false;

  const isFolderExist = await checkDirExist(dir);
  if (!isFolderExist) return false;

  const isRepo = await isGitRoot(dir, url);
  if (isRepo) return true;

  return checkFilesExist(dir, files);
}

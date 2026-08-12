import {exec} from 'node:child_process';
import {promisify} from 'node:util';

const execAsync = promisify(exec);

export async function isNpmPackageInstalled(packageName: string): Promise<boolean> {
  try {
    // Use --depth=0 to avoid scanning the entire node_modules tree
    // Use --json for reliable parsing
    const {stdout} = await execAsync(`npm list -g --depth=0 ${packageName} --json`);
    const data = JSON.parse(stdout);
    return !!(data.dependencies && data.dependencies[packageName]);
  } catch (error: any) {
    // npm list returns non-zero exit code if there are problems (e.g. missing peer deps)
    // or if the package is not found. We try to parse stdout anyway.
    if (error.stdout) {
      try {
        const data = JSON.parse(error.stdout);
        return !!(data.dependencies && data.dependencies[packageName]);
      } catch {
        return false;
      }
    }
    return false;
  }
}

export async function getNpmPackageVersion(packageName: string): Promise<string> {
  try {
    const {stdout} = await execAsync(`npm list -g --depth=0 ${packageName} --json`);
    const data = JSON.parse(stdout);
    if (data.dependencies && data.dependencies[packageName] && data.dependencies[packageName].version) {
      return data.dependencies[packageName].version;
    }
    return '';
  } catch (error: any) {
    if (error.stdout) {
      try {
        const data = JSON.parse(error.stdout);
        if (data.dependencies && data.dependencies[packageName] && data.dependencies[packageName].version) {
          return data.dependencies[packageName].version;
        }
      } catch {
        return '';
      }
    }
    return '';
  }
}

export async function checkNpmPackageUpdate(packageName: string): Promise<string | null> {
  try {
    // npm outdated returns exit code 1 if there are updates, so we expect this to often "fail"
    const {stdout} = await execAsync(`npm outdated -g ${packageName} --json`);
    // If exit code 0, usually means no updates or empty output
    if (!stdout) return null;

    const data = JSON.parse(stdout);
    if (data[packageName] && data[packageName].latest) {
      return data[packageName].latest;
    }
    return null;
  } catch (error: any) {
    if (error.stdout) {
      try {
        const data = JSON.parse(error.stdout);
        if (data[packageName] && data[packageName].latest) {
          return data[packageName].latest;
        }
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function uninstallNpmPackage(packageName: string): Promise<void> {
  try {
    await execAsync(`npm -g rm ${packageName}`);
  } catch (error: any) {
    throw new Error(`Error uninstalling ${packageName}. ${error.message}`, {cause: error});
  }
}

export async function getNpmVersion(): Promise<string> {
  try {
    const {stdout} = await execAsync('npm -v');
    return stdout.trim();
  } catch {
    return '';
  }
}

export async function getNpmMajorVersion(): Promise<number> {
  const version = await getNpmVersion();
  const match = version.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export async function isNpmVersionAbove12(): Promise<boolean> {
  const major = await getNpmMajorVersion();
  return major >= 12;
}

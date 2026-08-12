import {CardInfoCallback, CardInfoDescriptions, ChosenArgument} from '../../../src/common/types/plugins/modules';

function detectIsWin(): boolean {
  // Renderer process - use preload-exposed platform
  if (typeof window !== 'undefined' && window.osPlatform) {
    return window.osPlatform === 'win32';
  }
  // Main process - use process.platform directly (synchronous)
  if (typeof process !== 'undefined' && process.platform) {
    return process.platform === 'win32';
  }
  // Fallback (shouldn't happen in Electron)
  return true;
}

function detectIsMac(): boolean {
  // Renderer process - use preload-exposed platform
  if (typeof window !== 'undefined' && window.osPlatform) {
    return window.osPlatform === 'darwin';
  }
  // Main process - use process.platform directly (synchronous)
  if (typeof process !== 'undefined' && process.platform) {
    return process.platform === 'darwin';
  }
  // Fallback (shouldn't happen in Electron)
  return true;
}

export const isWin: boolean = detectIsWin();
export const isMac: boolean = detectIsMac();

export const scriptCommentStr = isWin ? 'REM' : '#';
export const scriptEnvStr = isWin ? 'set' : 'export';

export function getPythonCommandByOs() {
  if (isMac) return {pip: 'pip3', python: 'python3'};
  return {pip: 'pip', python: 'python'};
}

export function formatSize(size: number | undefined): string {
  if (!size) return '0KB';
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
}

export class DescriptionManager {
  description: CardInfoDescriptions;
  callback: CardInfoCallback;

  constructor(description: CardInfoDescriptions, callback: CardInfoCallback) {
    this.description = description;
    this.callback = callback;
    this.callback.setDescription(description);
  }

  public updateItem(sectionIndex: number, itemIndex: number, value: string | 'loading' | undefined | null) {
    if (this.description) {
      this.description[sectionIndex].items[itemIndex].result = value;
      this.callback.setDescription([...this.description]);
    }
  }
}

export function extractGitUrl(url: string): {owner: string; repo: string; platform: 'github' | 'gitlab'} {
  // Regular expression to match GitHub and GitLab repository URLs with or without protocol
  const gitRepoRegex = /^(https?:\/\/)?(www\.)?(github|gitlab)\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/;
  const match = url.match(gitRepoRegex);

  if (!match) {
    throw new Error(`Invalid Git repository URL: ${url}`);
  }

  const [, , , platform, owner, repo] = match;
  return {owner, repo, platform: platform as 'github' | 'gitlab'};
}

export function removeAnsi(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

export function getCdCommand(dirPath: string): string {
  const escapedPath = dirPath.replace(/ /g, '\\ ');
  const quotedPath = `"${dirPath}"`;

  if (isWin) {
    return `cd ${quotedPath}`;
  } else {
    return `cd ${escapedPath}`;
  }
}

export function getVenvPythonPath(venvPath: string): string {
  return isWin ? `${venvPath}\\Scripts\\python.exe` : `${venvPath}/bin/python`;
}

export function parseCustomArg(item: ChosenArgument) {
  const {custom, value} = item;
  if (!custom) return undefined;

  let commandArg: string | undefined = undefined;
  let line: string | undefined = undefined;

  switch (custom.kind) {
    case 'envVar':
      if (custom.type === 'CheckBox') {
        line = isWin ? `set ${item.name}=true` : `export ${item.name}="true"`;
      } else {
        line = isWin ? `set ${item.name}=${item.value}` : `export ${item.name}="${item.value}"`;
      }
      break;
    case 'commandLine':
      if (custom.type === 'CheckBox') {
        commandArg = `${item.name}`;
      } else if (custom.type === 'File' || custom.type === 'Directory') {
        commandArg = `${item.name} "${item.value}"`;
      } else {
        commandArg = `${item.name} ${item.value}`;
      }
      break;
    case 'custom':
      line = value as string;
      break;
    case 'comment':
      line = scriptCommentStr + ' ' + value;
      break;
    default:
      return undefined;
  }

  return {commandArg, line};
}

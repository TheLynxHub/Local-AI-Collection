import {isEmpty} from 'lodash-es';

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
  ParsedPreview,
} from '../../../../../src/common/types/plugins/modules';
import {ArgumentValue} from '../../../types';
import {DescriptionManager, isWin} from '../../../utils/crossUtils';
import {getArgumentType, isMultiFilePreviewSupported, isValidArg, removeEscapes} from '../../../utils/rendererUtils';
import claudeCodeArguments from './Arguments';

const INSTALL_TIME_KEY = 'install-time-claudeCode';
const UPDATE_TIME_KEY = 'update-time-claudeCode';

function checkEnvLine(line: string): 'set' | 'export' | 'var' | undefined {
  if (isWin && line.startsWith('set ')) return 'set';

  if (line.startsWith('export ')) return 'export';

  const varName = line.split('=')[0].trim();
  for (const arg of claudeCodeArguments) {
    if (arg.category === 'Environment Variables' && 'sections' in arg) {
      for (const section of arg.sections) {
        if (section.items.some(item => item.name === varName)) {
          return 'var';
        }
      }
    }
  }

  return undefined;
}

function getArgumentInfo(argName: string): {category: string; type: string; name: string} | undefined {
  for (const data of claudeCodeArguments) {
    if ('sections' in data) {
      for (const section of data.sections) {
        for (const item of section.items) {
          const flag = item.name.split(' ')[0];
          if (flag === argName) {
            return {category: data.category, type: item.type, name: item.name};
          }
        }
      }
    }
  }
  return undefined;
}

export function parseArgsToFiles(args: ChosenArgument[]): {scriptData: string; settingsData: string} {
  const executeCommand = 'claude';

  const envArgs: ChosenArgument[] = [];
  const cliArgs: ChosenArgument[] = [];
  const settingsArgs: ChosenArgument[] = [];

  args.forEach(arg => {
    const info = getArgumentInfo(arg.name.split(' ')[0]) || getArgumentInfo(arg.name);

    if (info) {
      switch (info.category) {
        case 'Environment Variables':
          envArgs.push(arg);
          break;
        case 'Command Line Arguments':
          cliArgs.push(arg);
          break;
        case 'Settings':
          settingsArgs.push(arg);
          break;
        default:
          break;
      }
    } else if (arg.name === 'Settings File Location') {
      // handled in main methods
    }
  });

  let scriptString = '';

  if (envArgs.length > 0) {
    envArgs.forEach(arg => {
      scriptString += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
    });
    scriptString += '\n\n';
  }

  scriptString += executeCommand;

  cliArgs.forEach(arg => {
    const info = getArgumentInfo(arg.name.split(' ')[0]) || getArgumentInfo(arg.name);
    if (!info) return;

    const flagName = info.name.split(' ')[0];
    if (info.type === 'CheckBox') {
      if (
        arg.value !== 'false' &&
        (arg.value as any) !== false &&
        (arg.value as any) !== 0 &&
        String(arg.value) !== '0'
      ) {
        scriptString += ` ${flagName}`;
      }
    } else if (arg.value !== undefined && arg.value !== null && String(arg.value).trim() !== '') {
      scriptString += ` ${flagName} "${arg.value}"`;
    }
  });

  scriptString += '\n';

  let settingsString = '';
  const settingsJson: any = {};

  if (settingsArgs.length > 0) {
    const raw = settingsArgs.find(a => a.name === 'settings.raw');
    if (raw && raw.value) {
      try {
        const parsed = JSON.parse(String(raw.value));
        Object.assign(settingsJson, parsed);
      } catch (e) {
        console.error('Error parsing settings.raw for Claude Code:', e);
      }
    } else {
      settingsArgs.forEach(arg => {
        if (arg.name === 'settings.raw') return;

        const keys = arg.name.split('.');
        let current = settingsJson;

        keys.slice(0, -1).forEach(key => {
          current[key] = current[key] || {};
          current = current[key];
        });

        let value: any = arg.value;
        if (String(value) === 'true') {
          value = true;
        } else if (String(value) === 'false') {
          value = false;
        } else if (
          typeof value === 'string' &&
          !isNaN(Number(value)) &&
          value.trim() !== '' &&
          !isNaN(parseFloat(value))
        ) {
          value = Number(value);
        } else if (
          typeof value === 'string' &&
          (value.trim().startsWith('[') ||
            value.trim().startsWith('{') ||
            ['enabledPlugins', 'extraKnownMarketplaces', 'allowedMcpServers', 'deniedMcpServers'].includes(keys[0]))
        ) {
          try {
            value = JSON.parse(value);
          } catch {
            // keep as string if invalid JSON
          }
        }

        current[keys[keys.length - 1]] = value;
      });
    }

    if (!isEmpty(settingsJson)) {
      settingsString = JSON.stringify(settingsJson, null, 2);
    }
  }

  return {scriptData: scriptString, settingsData: settingsString};
}

export function parseArgsToString(args: ChosenArgument[]): ParsedPreview {
  const {settingsData, scriptData} = parseArgsToFiles(args);

  const scriptTitle = `Script File Preview (${isWin ? '.bat' : '.sh'})`;
  const scriptContent = !isEmpty(scriptData)
    ? scriptData
    : '# No environment variables or command line arguments configured.\n';

  const settingsTitle = 'Settings File (settings.json)';
  const settingsContent = !isEmpty(settingsData) ? settingsData : '{\n  // No settings configured.\n}';

  if (isMultiFilePreviewSupported) {
    return [
      {title: scriptTitle, data: scriptContent},
      {title: settingsTitle, data: settingsContent},
    ];
  }

  const scriptPreview = `-------------${scriptTitle}-------------\n${scriptContent}`;
  const settingsPreview = `---------------- ${settingsTitle} ----------------\n${settingsContent}`;

  return `${scriptPreview}${settingsPreview}`;
}

export function parseFilesToArgs(scriptContent: string, settingsContent: string): ChosenArgument[] {
  const scriptArgs = parseStringToArgs(scriptContent);

  const settingsArgs: ChosenArgument[] = [];
  if (settingsContent) {
    try {
      const settingsJson = JSON.parse(settingsContent);

      const flatten = (obj: any, path = ''): ChosenArgument[] => {
        let result: ChosenArgument[] = [];
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newPath = path ? `${path}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
              result = result.concat(flatten(obj[key], newPath));
            } else {
              const value = typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
              result.push({name: newPath, value});
            }
          }
        }
        return result;
      };

      const flattened = flatten(settingsJson);

      flattened.forEach(arg => {
        if (isValidArg(arg.name, claudeCodeArguments)) {
          settingsArgs.push(arg);
        }
      });
    } catch (error) {
      console.error('Error parsing settings.json content for Claude Code:', error);
    }
  }

  const combinedArgs = new Map<string, ArgumentValue>();

  scriptArgs.forEach(arg => combinedArgs.set(arg.name, arg.value));
  settingsArgs.forEach(arg => combinedArgs.set(arg.name, arg.value));

  return Array.from(combinedArgs, ([name, value]) => ({name, value}));
}

export function parseStringToArgs(data: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = data.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('#')) return;

    if (line.startsWith('claude')) {
      const clArg: string = line.substring(6).trim();
      if (!clArg) return;

      const tokenRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
      const tokens: string[] = [];
      let tokenMatch: RegExpExecArray | null;
      while ((tokenMatch = tokenRegex.exec(clArg)) !== null) {
        tokens.push(tokenMatch[1] ?? tokenMatch[2] ?? tokenMatch[3]);
      }

      for (let i = 0; i < tokens.length; i++) {
        const flag = tokens[i];
        if (!flag.startsWith('-')) continue;

        const info = getArgumentInfo(flag);
        if (!info) continue;

        const type = getArgumentType(info.name, claudeCodeArguments);
        if (type === 'CheckBox') {
          argResult.push({name: info.name, value: 'true'});
        } else {
          const nextToken = tokens[i + 1];
          if (nextToken && !nextToken.startsWith('-')) {
            argResult.push({name: info.name, value: nextToken.replace(/"/g, '')});
            i++;
          } else {
            argResult.push({name: info.name, value: ''});
          }
        }
      }
    }

    const lineType = checkEnvLine(line);
    if (lineType === 'export' || lineType === 'set') {
      let [name, value] = line.replace(`${lineType} `, '').split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());
      if (isValidArg(name, claudeCodeArguments)) {
        argResult.push({name, value});
      }
    } else if (checkEnvLine(line) === 'var') {
      let [name, value] = line.split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());
      if (isValidArg(name, claudeCodeArguments)) {
        argResult.push({name, value});
      }
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['Getting Started', 'Detect Existing', 'Claude Code', 'All Done!']);
  stepper.starterStep({disableSelectDir: true}).then(() => {
    stepper.nextStep().then(() => {
      stepper.progressBar(true, 'Checking for existing Claude Code installation...');
      stepper.ipc.invoke('is_claude_code_installed').then((isInstalled: boolean) => {
        if (isInstalled) {
          stepper.setInstalled();
          const currentDate = new Date();
          stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
          stepper.showFinalStep('success', "You're All Set!", 'Claude Code is already installed and ready to use.');
        } else {
          stepper.nextStep().then(() => {
            const installCommand = isWin
              ? 'irm https://claude.ai/install.ps1 | iex'
              : 'curl -fsSL https://claude.ai/install.sh | bash';
            stepper.executeTerminalCommands(installCommand).then(() => {
              stepper.setInstalled();
              const currentDate = new Date();
              stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
              stepper.showFinalStep(
                'success',
                'Installation Complete!',
                'Claude Code has been installed successfully.',
              );
            });
          });
        }
      });
    });
  });
}

function startUpdate(stepper: InstallationStepper) {
  stepper.initialSteps(['Update Claude Code', 'Complete Update']);
  const installCommand = isWin
    ? 'irm https://claude.ai/install.ps1 | iex'
    : 'curl -fsSL https://claude.ai/install.sh | bash';
  stepper.executeTerminalCommands(installCommand).then(() => {
    const currentDate = new Date();
    stepper.storage.set(UPDATE_TIME_KEY, currentDate.toLocaleString());
    stepper.setUpdated();
    stepper.showFinalStep(
      'success',
      'Claude Code Updated Successfully!',
      'Claude Code has been updated to the latest available version.',
    );
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  callback.setOpenFolders(undefined);

  const descManager = new DescriptionManager(
    [
      {
        title: 'Installation Data',
        items: [
          {label: 'Install Date', result: 'loading'},
          {label: 'Update Date', result: 'loading'},
          {label: 'Current Version', result: 'loading'},
        ],
      },
    ],
    callback,
  );

  api.storage.get(INSTALL_TIME_KEY).then(result => {
    descManager.updateItem(0, 0, result);
  });
  api.storage.get(UPDATE_TIME_KEY).then(result => {
    descManager.updateItem(0, 1, result);
  });
  api.ipc.invoke('current_claude_code_version').then(result => {
    descManager.updateItem(0, 2, result);
  });
}

const ClaudeCode_RM: CardRendererMethods = {
  cardInfo,
  parseStringToArgs,
  parseArgsToString,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default ClaudeCode_RM;

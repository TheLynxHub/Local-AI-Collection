import {isEmpty} from 'lodash-es';

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager, isWin, parseCustomArg} from '../../../utils/crossUtils';
import {getArgumentType, isValidArg, replaceAddress} from '../../../utils/rendererUtils';
import unslothStudioArguments from './Arguments';

const INSTALL_TIME_KEY = 'install-time-unsloth-studio';
const UPDATE_TIME_KEY = 'update-time-unsloth-studio';
export const TAG_KEY = 'installed-tag-unsloth-studio';

const INSTALL_COMMAND = isWin
  ? 'irm https://unsloth.ai/install.ps1 | iex'
  : 'curl -fsSL https://unsloth.ai/install.sh | sh';

export async function fetchLatestUnslothTag(): Promise<string | undefined> {
  try {
    const response = await fetch('https://api.github.com/repos/unslothai/unsloth/releases');
    if (response.ok) {
      const data = (await response.json()) as {tag_name: string}[];
      if (Array.isArray(data) && data.length > 0 && data[0].tag_name) {
        return data[0].tag_name;
      }
    }
  } catch (e) {
    console.error('Failed to fetch Unsloth releases:', e);
  }

  try {
    const response = await fetch('https://api.github.com/repos/unslothai/unsloth/tags');
    if (response.ok) {
      const data = (await response.json()) as {name: string}[];
      if (Array.isArray(data) && data.length > 0) {
        return data[0].name;
      }
    }
  } catch (e) {
    console.error('Failed to fetch Unsloth tags:', e);
  }
  return undefined;
}

function getCategoryType(name: string): 'cl' | 'env' {
  if (name.startsWith('-')) {
    return 'cl';
  }
  return 'env';
}

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines: string = '';
  let clResult: string = '';

  args.forEach(arg => {
    if (arg.custom) {
      const customRes = parseCustomArg(arg);
      if (!customRes) return;
      if (customRes.line) lines += customRes.line + '\n';
      if (customRes.commandArg) clResult += customRes.commandArg + ' ';
    } else {
      const cat = getCategoryType(arg.name);
      if (cat === 'env') {
        if (arg.value !== undefined && arg.value !== null && arg.value !== '') {
          if (isWin) {
            lines += `set ${arg.name}=${arg.value}\n`;
          } else {
            lines += `export ${arg.name}="${arg.value}"\n`;
          }
        }
      } else if (cat === 'cl') {
        const argType = getArgumentType(arg.name, unslothStudioArguments);
        if (argType === 'CheckBox') {
          if (String(arg.value) === 'true' || arg.value === '') {
            clResult += `${arg.name} `;
          }
        } else if (arg.value !== undefined && arg.value !== null && arg.value !== '') {
          if (argType === 'File' || argType === 'Directory') {
            clResult += `${arg.name} "${arg.value}" `;
          } else {
            clResult += `${arg.name} ${arg.value} `;
          }
        }
      }
    }
  });

  if (!isEmpty(lines)) {
    result += lines + '\n';
  }

  result += isEmpty(clResult) ? 'unsloth studio\n' : `unsloth studio ${clResult.trim()}\n`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    line = line.trim();
    if (line.startsWith('#') || line.startsWith('@echo') || line.startsWith('REM')) {
      return;
    }

    if (line.startsWith('set ')) {
      const envLine = line.substring(4);
      const [name, ...valueParts] = envLine.split('=');
      const varName = name ? name.trim() : '';
      let value = valueParts.join('=').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (varName && value) {
        if (isValidArg(varName, unslothStudioArguments)) {
          argResult.push({name: varName, value});
        }
      }
    } else if (line.startsWith('export ')) {
      const envLine = line.substring(7);
      const [name, ...valueParts] = envLine.split('=');
      const varName = name ? name.trim() : '';
      let value = valueParts.join('=').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (varName && value) {
        if (isValidArg(varName, unslothStudioArguments)) {
          argResult.push({name: varName, value});
        }
      }
    } else if (line.startsWith('unsloth studio')) {
      const clArgs = line.substring('unsloth studio'.length).trim();
      if (!clArgs) return;

      const argsList: string[] = clArgs.split('--').filter(Boolean);
      argsList.forEach((arg: string): void => {
        const [id, ...valueParts] = arg.trim().split(' ');
        const name = `--${id}`;
        const value = valueParts.join(' ').replace(/"/g, '').trim();

        if (isValidArg(name, unslothStudioArguments)) {
          if (getArgumentType(name, unslothStudioArguments) === 'CheckBox') {
            argResult.push({name, value: ''});
          } else {
            argResult.push({name, value});
          }
        }
      });
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['Unsloth Studio', 'Detect Existing', 'Install Dependencies', 'Finish']);

  stepper.starterStep({disableSelectDir: true}).then(() => {
    stepper.nextStep().then(() => {
      stepper.progressBar(true, 'Checking for existing Unsloth installation...');
      stepper.ipc.invoke('is_unsloth_installed').then(async (isUnslothInstalled: boolean) => {
        if (isUnslothInstalled) {
          stepper.setInstalled();
          const currentDate = new Date();
          stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());

          const latestTag = await fetchLatestUnslothTag();
          if (latestTag) {
            stepper.storage.set(TAG_KEY, latestTag);
          }

          stepper.showFinalStep(
            'success',
            'Unsloth Studio Located!',
            'Pre-installed Unsloth Studio detected. Installation skipped as your existing setup is ready to use.',
          );
        } else {
          stepper.nextStep().then(() => {
            stepper
              .executeTerminalCommands(INSTALL_COMMAND)
              .then(async () => {
                stepper.setInstalled();
                const currentDate = new Date();
                stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());

                const latestTag = await fetchLatestUnslothTag();
                if (latestTag) {
                  stepper.storage.set(TAG_KEY, latestTag);
                }

                stepper.showFinalStep(
                  'success',
                  'Unsloth Studio installation complete!',
                  'All installation steps completed successfully. Your Unsloth Studio environment is ready for use.',
                );
              })
              .catch(() => {
                stepper.showFinalStep(
                  'error',
                  'Installation failed',
                  'Failed to install Unsloth Studio. Please check the terminal logs and try again.',
                );
              });
          });
        }
      });
    });
  });
}

function startUpdate(stepper: InstallationStepper) {
  stepper.initialSteps(['Update Unsloth Studio', 'Finish']);

  stepper
    .executeTerminalCommands(INSTALL_COMMAND)
    .then(async () => {
      const currentDate = new Date();
      stepper.storage.set(UPDATE_TIME_KEY, currentDate.toLocaleString());

      const latestTag = await fetchLatestUnslothTag();
      if (latestTag) {
        stepper.storage.set(TAG_KEY, latestTag);
      }

      stepper.setUpdated();
      stepper.showFinalStep(
        'success',
        'Unsloth Studio Updated Successfully!',
        'Unsloth Studio has been re-installed and updated to the latest version.',
      );
    })
    .catch(() => {
      stepper.showFinalStep(
        'error',
        'Update Failed',
        'Failed to update Unsloth Studio. Please check the terminal logs and try again.',
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
          {label: 'Installed Tag', result: 'loading'},
          {label: 'Latest Tag', result: 'loading'},
        ],
      },
    ],
    callback,
  );

  api.storage.get(INSTALL_TIME_KEY).then(result => {
    descManager.updateItem(0, 0, result || 'N/A');
  });
  api.storage.get(UPDATE_TIME_KEY).then(result => {
    descManager.updateItem(0, 1, result || 'N/A');
  });
  api.storage.get(TAG_KEY).then(result => {
    descManager.updateItem(0, 2, result || 'Unknown');
  });
  fetchLatestUnslothTag().then(latestTag => {
    descManager.updateItem(0, 3, latestTag || 'Unknown');
  });
}

export function catchAddress(input: string): string | undefined {
  const localhostPatterns = [
    /https?:\/\/localhost(?::\d+)?/i,
    /https?:\/\/127\.0\.0\.1(?::\d+)?/i,
    /https?:\/\/0\.0\.0\.0(?::\d+)?/i,
    /https?:\/\/\[::1](?::\d+)?/i,
    /https?:\/\/(?:[\w-]+\.)*localhost(?::\d+)?/i,
    /https?:\/\/[a-z0-9-]+\.trycloudflare\.com/i,
  ];

  for (const pattern of localhostPatterns) {
    const match = input.match(pattern);
    if (match) {
      return replaceAddress(match[0]);
    }
  }

  if (input.toLowerCase().includes('running on') || input.toLowerCase().includes('unsloth studio')) {
    return 'http://localhost:8888';
  }

  return undefined;
}

const UNSLOTH_STUDIO_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default UNSLOTH_STUDIO_RM;

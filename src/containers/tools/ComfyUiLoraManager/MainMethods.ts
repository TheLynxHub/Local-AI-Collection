import path from 'node:path';

import fs from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {LORA_MANAGER_ID} from '../../../constants';
import {getPythonCommandByOs, isWin} from '../../../utils/crossUtils';
import {isGitTypeInstalled, utilReadArgs, utilRunCommands, utilSaveArgs} from '../../../utils/mainUtils';
import {parseArgsToString, parseStringToArgs} from './RendererMethods';

const BAT_FILE_NAME = isWin ? 'lynx-user.bat' : 'lynx-user.sh';
const pythonCommand = getPythonCommandByOs().python;
const DEFAULT_BATCH_DATA: string = isWin
  ? `@echo off\n\n${pythonCommand} standalone.py`
  : `#!/bin/bash\n\n${pythonCommand} standalone.py`;
const SETTINGS_FILE = 'settings.json';

const DEFAULT_SETTINGS: {
  use_portable_settings: boolean;
  civitai_api_key: string;
  folder_paths: {
    loras: string[];
    checkpoints: string[];
    embeddings: string[];
  };
  auto_organize_exclusions: string[];
} = {
  use_portable_settings: true,
  civitai_api_key: '',
  folder_paths: {
    loras: [],
    checkpoints: [],
    embeddings: [],
  },
  auto_organize_exclusions: [],
};

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  if (!dir) return;

  // Save command line args to batch file
  await utilSaveArgs(args, BAT_FILE_NAME, parseArgsToString, dir);

  // Save settings.json
  const settingsPath = path.join(dir, SETTINGS_FILE);
  const settings = {...DEFAULT_SETTINGS};

  // Extract settings from args
  args.forEach(arg => {
    if (arg.name === 'civitai_api_key' && arg.value) {
      settings.civitai_api_key = arg.value as string;
    } else if (arg.name === 'use_portable_settings') {
      const val = arg.value;
      settings.use_portable_settings = val === 'true' || val === 'True' || val === '1';
    } else if (arg.name === 'loras_folders' && arg.value) {
      settings.folder_paths.loras = (arg.value as string)
        .split(',')
        .map(p => p.trim())
        .filter(Boolean);
    } else if (arg.name === 'checkpoints_folders' && arg.value) {
      settings.folder_paths.checkpoints = (arg.value as string)
        .split(',')
        .map(p => p.trim())
        .filter(Boolean);
    } else if (arg.name === 'embeddings_folders' && arg.value) {
      settings.folder_paths.embeddings = (arg.value as string)
        .split(',')
        .map(p => p.trim())
        .filter(Boolean);
    } else if (arg.name === 'auto_organize_exclusions' && arg.value) {
      settings.auto_organize_exclusions = (arg.value as string)
        .split(',')
        .map(p => p.trim())
        .filter(Boolean);
    }
  });

  try {
    await fs.promises.writeFile(settingsPath, JSON.stringify(settings, null, 2));
  } catch (e) {
    console.error('Error saving settings.json for LoRA Manager:', e);
  }
}

export async function readArgs(dir?: string): Promise<ChosenArgument[]> {
  if (!dir) return [];

  // Read command line args from batch file
  const cmdArgs = await utilReadArgs(BAT_FILE_NAME, DEFAULT_BATCH_DATA, parseStringToArgs, dir);

  // Read settings.json
  const settingsPath = path.join(dir, SETTINGS_FILE);
  let settings = {...DEFAULT_SETTINGS};

  try {
    const settingsContent = await fs.promises.readFile(settingsPath, 'utf-8');
    settings = JSON.parse(settingsContent);
  } catch (e) {
    // Settings file doesn't exist or is invalid, use defaults
  }

  // Merge settings into args
  const settingsArgs: ChosenArgument[] = [
    {name: 'civitai_api_key', value: settings.civitai_api_key || ''},
    {name: 'use_portable_settings', value: String(settings.use_portable_settings)},
    {name: 'loras_folders', value: settings.folder_paths.loras.join(', ')},
    {name: 'checkpoints_folders', value: settings.folder_paths.checkpoints.join(', ')},
    {name: 'embeddings_folders', value: settings.folder_paths.embeddings.join(', ')},
    {name: 'auto_organize_exclusions', value: settings.auto_organize_exclusions.join(', ')},
  ];

  return [...cmdArgs, ...settingsArgs];
}

const LoraManager_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(LORA_MANAGER_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/willmiao/ComfyUI-Lora-Manager', [
        'standalone.py',
        'requirements.txt',
      ]),
  };
};

export default LoraManager_MM;

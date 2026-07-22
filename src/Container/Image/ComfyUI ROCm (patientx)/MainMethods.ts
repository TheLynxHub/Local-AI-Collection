import {join} from 'node:path';

import {promises} from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {COMFYUI_ROCM_ID} from '../../../Constants';
import {initBatchFile, isGitTypeInstalled, utilRunCommands} from '../../../Utils/MainUtils';
import {getArgumentType, isValidArg} from '../../../Utils/RendererUtils';
import comfyRocmArguments from './Arguments';

const BAT_FILE_NAME = 'comfyui-user.bat';
const DEFAULT_BATCH_DATA: string =
  '@echo off\n' +
  'setlocal enabledelayedexpansion\n' +
  'title [comfyui-rocm]\n' +
  '\n' +
  'set "PYTHON_DIR=%~dp0python_env"\n' +
  'set "PATH=%PYTHON_DIR%;%PYTHON_DIR%\\Scripts;%PATH%"\n' +
  '\n' +
  'set "COMMANDLINE_ARGS="\n' +
  '\n' +
  'python_env\\python.exe main.py %COMMANDLINE_ARGS%\n' +
  'pause';

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  if (!dir) return;

  const filePath = join(dir, BAT_FILE_NAME);
  await initBatchFile(filePath, DEFAULT_BATCH_DATA);

  const fileContent = await promises.readFile(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  let commandLineArgs = '';
  const envVars: Record<string, string | number> = {};

  args.forEach(arg => {
    if (
      arg.name === 'PYTHON' ||
      arg.name === 'GIT' ||
      arg.name === 'VENV_DIR' ||
      arg.name === 'MIOPEN_FIND_MODE' ||
      arg.name === 'MIOPEN_LOG_LEVEL' ||
      arg.name === 'TRITON_OVERRIDE_ARCH' ||
      arg.name === 'COMFYUI_ENABLE_MIOPEN' ||
      arg.name === 'FLASH_ATTENTION_TRITON_AMD_ENABLE' ||
      arg.name === 'PYTORCH_TUNABLEOP_ENABLED' ||
      arg.name === 'PYTORCH_TUNABLEOP_VERBOSE' ||
      arg.name === 'PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED'
    ) {
      envVars[arg.name] = arg.value;
      return;
    }

    const argType = getArgumentType(arg.name, comfyRocmArguments);
    if (argType === 'CheckBox') {
      commandLineArgs += `${arg.name} `;
    } else if (argType === 'File' || argType === 'Directory') {
      commandLineArgs += `${arg.name} "${arg.value}" `;
    } else {
      commandLineArgs += `${arg.name} ${arg.value} `;
    }
  });

  const originalFilePath = join(dir, 'comfyui-rocm.bat');
  const originalDefaults: Record<string, string> = {};

  try {
    if (
      await promises
        .access(originalFilePath)
        .then(() => true)
        .catch(() => false)
    ) {
      const originalContent = await promises.readFile(originalFilePath, 'utf-8');
      const originalLines = originalContent.split('\n');

      originalLines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('set "') || trimmedLine.startsWith('set ')) {
          const match = trimmedLine.match(/set\s+"?([^=]+)="?([^"]*)"?/);
          if (match) {
            const [, envName, envValue] = match;
            const cleanEnvName = envName.trim();
            const cleanEnvValue = envValue.trim();
            if (cleanEnvName !== 'COMMANDLINE_ARGS' && cleanEnvName !== 'PARAMS') {
              originalDefaults[cleanEnvName] = cleanEnvValue;
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Error reading original comfyui-rocm.bat:', error);
  }

  const foundEnvVars = new Set<string>();
  const linesToRemove = new Set<number>();

  const updatedLines = lines.map((line, index) => {
    const trimmedLine = line.trim();

    const envVarNames = [
      'PYTHON',
      'GIT',
      'VENV_DIR',
      'MIOPEN_FIND_MODE',
      'MIOPEN_LOG_LEVEL',
      'TRITON_OVERRIDE_ARCH',
      'COMFYUI_ENABLE_MIOPEN',
      'FLASH_ATTENTION_TRITON_AMD_ENABLE',
      'PYTORCH_TUNABLEOP_ENABLED',
      'PYTORCH_TUNABLEOP_VERBOSE',
      'PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED',
    ];

    for (const envName of envVarNames) {
      const isCommented = trimmedLine.startsWith('::');
      const lineToCheck = isCommented ? trimmedLine.substring(2).trim() : trimmedLine;

      if (lineToCheck.startsWith(`set "${envName}=`) || lineToCheck.startsWith(`set ${envName}=`)) {
        if (isCommented && foundEnvVars.has(envName)) {
          linesToRemove.add(index);
          return line;
        }

        foundEnvVars.add(envName);

        if (envVars[envName] !== undefined) {
          return `set "${envName}=${envVars[envName]}"`;
        } else if (originalDefaults[envName] !== undefined) {
          return `set "${envName}=${originalDefaults[envName]}"`;
        } else {
          linesToRemove.add(index);
          return line;
        }
      }
    }

    if (trimmedLine.startsWith('set "COMMANDLINE_ARGS=')) {
      return `set "COMMANDLINE_ARGS=${commandLineArgs.trim()}"`;
    }

    return line;
  });

  const filteredLines = updatedLines.filter((_, index) => !linesToRemove.has(index));

  const cleanedLines: string[] = [];
  let emptyLineCount = 0;

  for (const line of filteredLines) {
    if (line.trim() === '' || line.trim() === '::') {
      emptyLineCount++;
      if (emptyLineCount <= 2) {
        cleanedLines.push(line);
      }
    } else {
      emptyLineCount = 0;
      cleanedLines.push(line);
    }
  }

  let insertionIndex = -1;
  for (let i = 0; i < cleanedLines.length; i++) {
    const trimmedLine = cleanedLines[i].trim();
    if (trimmedLine.startsWith('set "COMMANDLINE_ARGS=')) {
      insertionIndex = i + 1;
      break;
    }
  }

  if (insertionIndex === -1) {
    for (let i = 0; i < cleanedLines.length; i++) {
      if (cleanedLines[i].includes('python.exe main.py')) {
        insertionIndex = i;
        break;
      }
    }
  }

  const linesToInsert: string[] = [];
  if (envVars.TRITON_OVERRIDE_ARCH !== undefined && !foundEnvVars.has('TRITON_OVERRIDE_ARCH')) {
    if (insertionIndex > 0 && cleanedLines[insertionIndex - 1].trim() !== '') {
      linesToInsert.push('');
    }
    linesToInsert.push(`set "TRITON_OVERRIDE_ARCH=${envVars.TRITON_OVERRIDE_ARCH}"`);
  }

  if (linesToInsert.length > 0 && insertionIndex !== -1) {
    cleanedLines.splice(insertionIndex, 0, ...linesToInsert);
  }

  await promises.writeFile(filePath, cleanedLines.join('\n'), 'utf-8');
}

export async function readArgs(dir?: string) {
  if (!dir) return [];

  const filePath = join(dir, BAT_FILE_NAME);
  await initBatchFile(filePath, DEFAULT_BATCH_DATA);

  const fileContent = await promises.readFile(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  const argResult: ChosenArgument[] = [];

  lines.forEach(line => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('set "') || trimmedLine.startsWith('set ')) {
      const match = trimmedLine.match(/set\s+"?([^=]+)="?([^"]*)"?/);
      if (match) {
        const [, envName, envValue] = match;
        const cleanEnvName = envName.trim();
        const cleanEnvValue = envValue.trim();

        if (
          cleanEnvName === 'PYTHON' ||
          cleanEnvName === 'GIT' ||
          cleanEnvName === 'VENV_DIR' ||
          cleanEnvName === 'MIOPEN_FIND_MODE' ||
          cleanEnvName === 'MIOPEN_LOG_LEVEL' ||
          cleanEnvName === 'TRITON_OVERRIDE_ARCH' ||
          cleanEnvName === 'COMFYUI_ENABLE_MIOPEN' ||
          cleanEnvName === 'FLASH_ATTENTION_TRITON_AMD_ENABLE' ||
          cleanEnvName === 'PYTORCH_TUNABLEOP_ENABLED' ||
          cleanEnvName === 'PYTORCH_TUNABLEOP_VERBOSE' ||
          cleanEnvName === 'PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED'
        ) {
          argResult.push({name: cleanEnvName, value: cleanEnvValue});
        } else if (cleanEnvName === 'COMMANDLINE_ARGS') {
          const argsString = cleanEnvValue;
          if (!argsString) return;

          const args = argsString.split('--').filter(Boolean);

          args.forEach(arg => {
            const [id, ...valueParts] = arg.trim().split(' ');
            const argName = `--${id}`;
            const argValue = valueParts.join(' ').replace(/"/g, '');

            if (isValidArg(argName, comfyRocmArguments)) {
              const argType = getArgumentType(argName, comfyRocmArguments);
              if (argType === 'CheckBox') {
                argResult.push({name: argName, value: ''});
              } else {
                argResult.push({name: argName, value: argValue});
              }
            }
          });
        }
      }
    }
  });

  return argResult;
}

const ComfyRocm_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(COMFYUI_ROCM_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/patientx-cfz/comfyui-rocm', [
        BAT_FILE_NAME,
        'comfyui-rocm.bat',
      ]),
  };
};

export default ComfyRocm_MM;

import {join} from 'node:path';

import {promises} from 'graceful-fs';

import {CardMainMethodsInitial, ChosenArgument} from '../../../../../src/common/types/plugins/modules';
import {COMFYUI_ZLUDA_ID} from '../../../Constants';
import {initBatchFile, isGitTypeInstalled, utilRunCommands} from '../../../Utils/MainUtils';
import {getArgumentType, isValidArg} from '../../../Utils/RendererUtils';
import comfyZludaArguments from './Arguments';

const BAT_FILE_NAME = 'comfyui-user.bat';
const DEFAULT_BATCH_DATA: string =
  '@echo off\n' +
  '\n' +
  'set "MIOPEN_FIND_MODE=2"\n' +
  'set "MIOPEN_LOG_LEVEL=3"\n' +
  '\n' +
  'set "PYTHON=%~dp0venv\\Scripts\\python.exe"\n' +
  'set "GIT="\n' +
  'set "VENV_DIR=.\\venv"\n' +
  '\n' +
  'set "COMMANDLINE_ARGS="\n' +
  '\n' +
  'set "ZLUDA_COMGR_LOG_LEVEL=1"\n' +
  '\n' +
  '.\\zluda\\zluda.exe -- %PYTHON% main.py %COMMANDLINE_ARGS%' +
  '\npause';

export async function getRunCommands(dir?: string): Promise<string | string[]> {
  return await utilRunCommands(BAT_FILE_NAME, dir, DEFAULT_BATCH_DATA);
}

async function saveArgs(args: ChosenArgument[], dir?: string) {
  if (!dir) return;

  const filePath = join(dir, BAT_FILE_NAME);
  await initBatchFile(filePath, DEFAULT_BATCH_DATA);

  const fileContent = await promises.readFile(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  // Build command line arguments string
  let commandLineArgs = '';
  const envVars: Record<string, string | number> = {};

  // Collect user-selected arguments
  args.forEach(arg => {
    // Handle environment variables
    if (
      arg.name === 'PYTHON' ||
      arg.name === 'GIT' ||
      arg.name === 'VENV_DIR' ||
      arg.name === 'MIOPEN_FIND_MODE' ||
      arg.name === 'MIOPEN_LOG_LEVEL' ||
      arg.name === 'ZLUDA_COMGR_LOG_LEVEL' ||
      arg.name === 'TRITON_OVERRIDE_ARCH' ||
      arg.name === 'PYTORCH_TUNABLEOP_ENABLED' ||
      arg.name === 'PYTORCH_TUNABLEOP_VERBOSE' ||
      arg.name === 'PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED'
    ) {
      envVars[arg.name] = arg.value;
      return;
    }

    // Handle command line arguments
    const argType = getArgumentType(arg.name, comfyZludaArguments);
    if (argType === 'CheckBox') {
      commandLineArgs += `${arg.name} `;
    } else if (argType === 'File' || argType === 'Directory') {
      commandLineArgs += `${arg.name} "${arg.value}" `;
    } else {
      commandLineArgs += `${arg.name} ${arg.value} `;
    }
  });

  // Read the original comfyui-n.bat to get default values
  const originalFilePath = join(dir, 'comfyui-n.bat');
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
            if (cleanEnvName !== 'COMMANDLINE_ARGS') {
              originalDefaults[cleanEnvName] = cleanEnvValue;
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Error reading original comfyui-n.bat:', error);
  }

  // Track which env vars were found in the file
  const foundEnvVars = new Set<string>();
  const linesToRemove = new Set<number>();

  // Update existing lines
  const updatedLines = lines.map((line, index) => {
    const trimmedLine = line.trim();

    // Update environment variables
    const envVarNames = [
      'PYTHON',
      'GIT',
      'VENV_DIR',
      'MIOPEN_FIND_MODE',
      'MIOPEN_LOG_LEVEL',
      'ZLUDA_COMGR_LOG_LEVEL',
      'TRITON_OVERRIDE_ARCH',
      'PYTORCH_TUNABLEOP_ENABLED',
      'PYTORCH_TUNABLEOP_VERBOSE',
      'PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED',
    ];

    for (const envName of envVarNames) {
      // Check for both active and commented lines
      const isCommented = trimmedLine.startsWith('::');
      const lineToCheck = isCommented ? trimmedLine.substring(2).trim() : trimmedLine;

      if (lineToCheck.startsWith(`set "${envName}=`) || lineToCheck.startsWith(`set ${envName}=`)) {
        // If this is a commented duplicate from previous removals, mark for deletion
        if (isCommented && foundEnvVars.has(envName)) {
          linesToRemove.add(index);
          return line;
        }

        foundEnvVars.add(envName);

        // If user provided a value, use it (uncommented)
        if (envVars[envName] !== undefined) {
          return `set "${envName}=${envVars[envName]}"`;
        }
        // If user removed it and it exists in original defaults, use default
        else if (originalDefaults[envName] !== undefined) {
          return `set "${envName}=${originalDefaults[envName]}"`;
        }
        // If user removed it and it doesn't exist in original, mark for deletion
        else {
          linesToRemove.add(index);
          return line;
        }
      }
    }

    // Update COMMANDLINE_ARGS
    if (trimmedLine.startsWith('set "COMMANDLINE_ARGS=')) {
      return `set "COMMANDLINE_ARGS=${commandLineArgs.trim()}"`;
    }

    return line;
  });

  // Remove marked lines (filter out duplicates and user-added vars that were removed)
  const filteredLines = updatedLines.filter((_, index) => !linesToRemove.has(index));

  // Clean up consecutive empty lines (keep max 2 consecutive empty lines)
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

  // Insert missing environment variables that user set but don't exist in file
  // Find the best insertion point (after COMMANDLINE_ARGS or before the zluda.exe line)
  let insertionIndex = -1;
  for (let i = 0; i < cleanedLines.length; i++) {
    const trimmedLine = cleanedLines[i].trim();
    if (trimmedLine.startsWith('set "COMMANDLINE_ARGS=')) {
      insertionIndex = i + 1;
      break;
    }
  }

  // If no COMMANDLINE_ARGS found, insert before zluda.exe line
  if (insertionIndex === -1) {
    for (let i = 0; i < cleanedLines.length; i++) {
      if (cleanedLines[i].includes('zluda.exe')) {
        insertionIndex = i;
        break;
      }
    }
  }

  // Insert missing env vars
  const linesToInsert: string[] = [];
  if (envVars.TRITON_OVERRIDE_ARCH !== undefined && !foundEnvVars.has('TRITON_OVERRIDE_ARCH')) {
    // Only add empty line if the previous line is not already empty
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

    // Parse environment variables
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
          cleanEnvName === 'ZLUDA_COMGR_LOG_LEVEL' ||
          cleanEnvName === 'TRITON_OVERRIDE_ARCH' ||
          cleanEnvName === 'PYTORCH_TUNABLEOP_ENABLED' ||
          cleanEnvName === 'PYTORCH_TUNABLEOP_VERBOSE' ||
          cleanEnvName === 'PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED'
        ) {
          argResult.push({name: cleanEnvName, value: cleanEnvValue});
        } else if (cleanEnvName === 'COMMANDLINE_ARGS') {
          // Parse command line arguments
          const argsString = cleanEnvValue;
          if (!argsString) return;

          const args = argsString.split('--').filter(Boolean);

          args.forEach(arg => {
            const [id, ...valueParts] = arg.trim().split(' ');
            const argName = `--${id}`;
            const argValue = valueParts.join(' ').replace(/"/g, '');

            // Check if the argument is valid
            if (isValidArg(argName, comfyZludaArguments)) {
              const argType = getArgumentType(argName, comfyZludaArguments);
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

const ComfyZluda_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(COMFYUI_ZLUDA_ID);

  return {
    getRunCommands: () => getRunCommands(installDir),
    readArgs: () => readArgs(installDir),
    saveArgs: args => saveArgs(args, installDir),
    isInstalled: () =>
      isGitTypeInstalled(installDir, 'https://github.com/patientx/ComfyUI-Zluda', [BAT_FILE_NAME, 'comfyui-n.bat']),
  };
};

export default ComfyZluda_MM;

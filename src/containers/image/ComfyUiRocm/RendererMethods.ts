import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {ArgumentValue} from '../../../types';
import {parseCustomArg} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, getArgumentType, isValidArg} from '../../../utils/rendererUtils';
import comfyRocmArguments from './Arguments';

const URL = 'https://github.com/patientx-cfz/comfyui-rocm';

export function parseArgsToString(args: ChosenArgument[]): string {
  let result = '';
  let lines: string = '';
  let argResult = '';
  const envVars: Record<string, ArgumentValue> = {};

  args.forEach(arg => {
    if (arg.custom) {
      const parsed = parseCustomArg(arg);
      if (!parsed) return;

      if (parsed.line) lines += parsed.line + '\n';
      if (parsed.commandArg) argResult += parsed.commandArg + ' ';
    } else {
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
        argResult += `${arg.name} `;
      } else if (argType === 'File' || argType === 'Directory') {
        argResult += `${arg.name} "${arg.value}" `;
      } else {
        argResult += `${arg.name} ${arg.value} `;
      }
    }
  });

  if (envVars.MIOPEN_FIND_MODE !== undefined) {
    result += `set "MIOPEN_FIND_MODE=${envVars.MIOPEN_FIND_MODE}"\n`;
  }
  if (envVars.MIOPEN_LOG_LEVEL !== undefined) {
    result += `set "MIOPEN_LOG_LEVEL=${envVars.MIOPEN_LOG_LEVEL}"\n`;
  }
  if (Object.keys(envVars).some(k => k === 'MIOPEN_FIND_MODE' || k === 'MIOPEN_LOG_LEVEL')) {
    result += '\n';
  }

  if (envVars.PYTHON !== undefined) {
    result += `set "PYTHON=${envVars.PYTHON}"\n`;
  }
  if (envVars.GIT !== undefined) {
    result += `set "GIT=${envVars.GIT}"\n`;
  }
  if (envVars.VENV_DIR !== undefined) {
    result += `set "VENV_DIR=${envVars.VENV_DIR}"\n`;
  }
  if (Object.keys(envVars).some(k => k === 'PYTHON' || k === 'GIT' || k === 'VENV_DIR')) {
    result += '\n';
  }

  result += `set "COMMANDLINE_ARGS=${argResult.trim()}"\n\n`;

  if (envVars.TRITON_OVERRIDE_ARCH !== undefined) {
    result += `set "TRITON_OVERRIDE_ARCH=${envVars.TRITON_OVERRIDE_ARCH}"\n\n`;
  }

  if (lines) result += lines + '\n';

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('set')) {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const argName = parts[0].split(' ')[1]?.trim();
        const argValue = parts[1]?.trim();
        if (
          argName === 'PYTHON' ||
          argName === 'GIT' ||
          argName === 'VENV_DIR' ||
          argName === 'MIOPEN_FIND_MODE' ||
          argName === 'MIOPEN_LOG_LEVEL' ||
          argName === 'TRITON_OVERRIDE_ARCH' ||
          argName === 'COMFYUI_ENABLE_MIOPEN' ||
          argName === 'FLASH_ATTENTION_TRITON_AMD_ENABLE' ||
          argName === 'PYTORCH_TUNABLEOP_ENABLED' ||
          argName === 'PYTORCH_TUNABLEOP_VERBOSE' ||
          argName === 'PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED'
        ) {
          argResult.push({name: argName, value: argValue});
        }
      }
    } else if (line.includes('python.exe main.py')) {
      const clArgs: string = line.split('python.exe main.py ')[1];

      if (!clArgs) return;

      const splitArgs: string[] = clArgs.split('--').filter(Boolean);

      const result: ArgType[] = splitArgs.map((arg: string): ArgType => {
        const [id, ...value] = arg.trim().split(' ');
        return {
          name: `--${id}`,
          value: value.join(' ').replace(/"/g, ''),
        };
      });

      result.forEach((value: ArgType): void => {
        if (isValidArg(value.name, comfyRocmArguments)) {
          if (getArgumentType(value.name, comfyRocmArguments) === 'CheckBox') {
            argResult.push({name: value.name, value: ''});
          } else {
            argResult.push({name: value.name, value: value.value});
          }
        }
      });
    }
  });

  return argResult;
}

const customArguments = [
  {name: 'PYTHON', value: '%~dp0python_env\\python.exe'},
  {name: 'VENV_DIR', value: './python_env'},
  {
    name: '--disable-auto-launch',
    value: '',
  },
  {
    name: '--use-quad-cross-attention',
    value: '',
  },
  {
    name: '--disable-triton-backend',
    value: '',
  },
  {
    name: '--enable-manager',
    value: '',
  },
  {
    name: '--enable-manager-legacy-ui',
    value: '',
  },
];

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['ComfyUI ROCm', 'Clone', 'Install', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(URL).then(dir => {
          stepper.nextStep().then(() => {
            stepper.runTerminalScript(dir, 'install.bat').then(() => {
              stepper.setInstalled(dir);
              stepper.postInstall.config({
                customArguments: {
                  presetName: 'ROCm Config',
                  customArguments,
                },
              });
              stepper.showFinalStep(
                'success',
                'ComfyUI-ROCm installation complete!',
                'All installation steps completed successfully. Your ComfyUI-ROCm environment is now ready for use.',
              );
            });
          });
        });
      });
    } else if (targetDirectory) {
      stepper.utils.validateGitRepository(targetDirectory, URL).then(isValid => {
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.postInstall.config({
            customArguments: {
              presetName: 'ROCm Config',
              customArguments,
            },
          });
          stepper.showFinalStep(
            'success',
            'ComfyUI-ROCm located successfully!',
            'Pre-installed ComfyUI-ROCm detected. Installation skipped as your existing setup is ready to use.',
          );
        } else {
          stepper.utils.verifyFilesExist(targetDirectory, ['comfyui-rocm.bat', 'comfyui-user.bat']).then(filesExist => {
            if (filesExist) {
              stepper.setInstalled(targetDirectory);
              stepper.postInstall.config({
                customArguments: {
                  presetName: 'ROCm Config',
                  customArguments,
                },
              });
              stepper.showFinalStep(
                'success',
                'ComfyUI-ROCm located successfully!',
                'Pre-installed ComfyUI-ROCm detected. Installation skipped as your existing setup is ready to use.' +
                  ' Note: Git repository not detected - updating may not work as expected.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                'Unable to locate ComfyUI-ROCm!',
                'Please ensure you have selected the correct folder containing the ComfyUI-ROCm repository.',
              );
            }
          });
        }
      });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, '/custom_nodes', api, callback);
}

const COMFYUI_ROCM_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default COMFYUI_ROCM_RM;

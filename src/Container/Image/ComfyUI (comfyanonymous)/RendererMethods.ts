import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {getPythonCommandByOs, isWin, parseCustomArg} from '../../../Utils/CrossUtils';
import {CardInfo, catchAddress, getArgumentType, isValidArg, removeEscapes} from '../../../Utils/RendererUtils';
import comfyArguments from './Arguments';

const COMFYUI_URL = 'https://github.com/comfyanonymous/ComfyUI';

function isEnvironmentVariable(name: string): boolean {
  for (const arg of comfyArguments) {
    if (arg.category === 'Environment Variables') {
      if ('items' in arg) {
        return arg.items.some(item => item.name === name);
      }
    }
  }
  return false;
}

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let argResult: string = '';
  let lines: string = '';

  args.forEach(arg => {
    if (arg.custom) {
      const result = parseCustomArg(arg);
      if (!result) return;

      if (result.line) lines += result.line + '\n';
      if (result.commandArg) argResult += result.commandArg + ' ';
    } else {
      if (isEnvironmentVariable(arg.name)) {
        // Handle environment variables
        if (getArgumentType(arg.name, comfyArguments) === 'CheckBox') {
          lines += isWin ? `set ${arg.name}=true\n` : `export ${arg.name}="true"\n`;
        } else {
          lines += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
        }
      } else {
        // Handle command line arguments
        const argType = getArgumentType(arg.name, comfyArguments);
        if (argType === 'CheckBox') {
          argResult += `${arg.name} `;
        } else if (argType === 'File' || argType === 'Directory') {
          argResult += `${arg.name} "${arg.value}" `;
        } else {
          argResult += `${arg.name} ${arg.value} `;
        }
      }
    }
  });

  if (lines) result += lines + '\n';

  const pythonCommand = getPythonCommandByOs().python;
  result += isEmpty(argResult) ? `${pythonCommand} main.py` : `${pythonCommand} main.py ${argResult}`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    // Skip comments
    if (line.startsWith('#')) {
      return;
    }

    // Check for environment variables (export on Linux, set on Windows)
    if (line.startsWith('export ') || line.startsWith('set ')) {
      const prefix = line.startsWith('export ') ? 'export ' : 'set ';
      let [name, value] = line.replace(prefix, '').split('=');
      name = removeEscapes(name.trim());
      value = removeEscapes(value.trim());

      if (isValidArg(name, comfyArguments) && isEnvironmentVariable(name)) {
        argResult.push({name, value});
      }
      return;
    }

    const pythonCommand = getPythonCommandByOs().python;
    // Check for command line arguments
    if (!line.startsWith(`${pythonCommand} main.py`)) return;

    // Extract the command line arguments and clear falsy values
    const clArgs: string = line.split(`${pythonCommand} main.py `)[1];

    if (!clArgs) return;

    const args: string[] = clArgs.split('--').filter(Boolean);

    // Map each argument to an object with id and value
    const result: ArgType[] = args.map((arg: string): ArgType => {
      const [id, ...value] = arg.trim().split(' ');
      return {
        name: `--${id}`,
        value: value.join(' ').replace(/"/g, ''),
      };
    });

    // Process each argument
    result.forEach((value: ArgType): void => {
      // Check if the argument exists or valid
      if (isValidArg(value.name, comfyArguments)) {
        if (getArgumentType(value.name, comfyArguments) === 'CheckBox') {
          argResult.push({name: value.name, value: ''});
        } else {
          argResult.push({name: value.name, value: value.value});
        }
      }
    });
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  const selectOptions = [
    'NONE',
    'NVIDIA CU130',
    'NVIDIA CU132 Nightly',
    'AMD GPUs (Windows and Linux) RDNA 3 (RX 7000 series)',
    'AMD GPUs (Windows and Linux) RDNA 3.5 (Strix halo/Ryzen AI Max+ 365)',
    'AMD GPUs (Windows and Linux) RDNA 4 (RX 9000 series)',
    'AMD GPUs (Linux only) ROCm 7.2',
    'AMD GPUs (Linux only) ROCm 7.2 Nightly',
    'Mac Apple silicon',
    'Mac Apple silicon (Conda)',
    'Mac x86 (Conda)',
    'Intel GPUs (Windows and Linux)',
    'Intel GPUs Nightly (Windows and Linux)',
  ];

  const getPyTorchInstallCommand = (selectedOption: string) => {
    switch (selectedOption) {
      case 'Mac Apple silicon':
        return (
          'pip3 install --pre torch torchvision torchaudio --extra-index-url ' +
          'https://download.pytorch.org/whl/nightly/cpu'
        );
      case 'Mac Apple silicon (Conda)':
        return 'conda install pytorch torchvision torchaudio -c pytorch-nightly';
      case 'Mac x86 (Conda)':
        return 'conda install pytorch torchvision torchaudio -c pytorch-nightly';

      case 'AMD GPUs (Linux only) ROCm 7.2':
        return 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2';
      case 'AMD GPUs (Linux only) ROCm 7.2 Nightly':
        return (
          'pip install --pre torch torchvision torchaudio --index-url ' +
          'https://download.pytorch.org/whl/nightly/rocm7.2'
        );

      case 'AMD GPUs (Windows and Linux) RDNA 3 (RX 7000 series)':
        return (
          'pip install --pre torch torchvision torchaudio --index-url ' +
          'https://rocm.nightlies.amd.com/v2/gfx110X-all/'
        );
      case 'AMD GPUs (Windows and Linux) RDNA 3.5 (Strix halo/Ryzen AI Max+ 365)':
        return (
          'pip install --pre torch torchvision torchaudio --index-url ' + 'https://rocm.nightlies.amd.com/v2/gfx1151/'
        );
      case 'AMD GPUs (Windows and Linux) RDNA 4 (RX 9000 series)':
        return (
          'pip install --pre torch torchvision torchaudio --index-url ' +
          'https://rocm.nightlies.amd.com/v2/gfx120X-all/'
        );

      case 'Intel GPUs (Windows and Linux)':
        return 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/xpu';
      case 'Intel GPUs Nightly (Windows and Linux)':
        return (
          'pip install --pre torch torchvision torchaudio --index-url ' + 'https://download.pytorch.org/whl/nightly/xpu'
        );

      default:
      case 'NVIDIA CU130':
        return 'pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu130';
      case 'NVIDIA CU132 Nightly':
        return (
          'pip install --pre torch torchvision torchaudio --index-url ' +
          'https://download.pytorch.org/whl/nightly/cu132'
        );
    }
  };

  const installReqs = (dir: string) => {
    stepper
      .executeTerminalCommands(['pip install -r requirements.txt', 'pip install -r manager_requirements.txt'], dir)
      .then(() => {
        stepper.setInstalled(dir);
        stepper.postInstall.config({
          customArguments: {
            presetName: 'Lynx Config',
            customArguments: [
              {
                name: '--enable-manager',
                value: '',
              },
            ],
          },
        });
        stepper.showFinalStep(
          'success',
          'ComfyUI installation complete!',
          'All installation steps completed successfully. ' + 'Your ComfyUI environment is now ready for use.',
        );
      });
  };

  const getMacCondaInstallCommand = (selectedOption: string) => {
    switch (selectedOption) {
      case 'Mac x86 (Conda)':
        return [
          'curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh',
          'sh Miniconda3-latest-MacOSX-x86_64.sh',
        ];
      case 'Mac Apple silicon (Conda)':
      default:
        return [
          'curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh',
          'sh Miniconda3-latest-MacOSX-arm64.sh',
        ];
    }
  };

  stepper.initialSteps(['ComfyUI', 'Clone', 'PyTorch Version', 'Install PyTorch', 'Install Dependencies', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(COMFYUI_URL).then(dir => {
          stepper.nextStep().then(() => {
            stepper
              .collectUserInput([
                {
                  id: 'gpu_type',
                  type: 'select',
                  label: 'Please Select PyTorch Version (Gpu)',
                  selectOptions,
                  defaultValue: selectOptions[0],
                  isRequired: true,
                },
              ])
              .then(result => {
                const selectedOption = result[0].result as string;
                if (selectedOption === 'NONE') {
                  // Skip PyTorch install, go directly to dependencies
                  stepper.nextStep().then(() => {
                    stepper.nextStep().then(() => {
                      installReqs(dir);
                    });
                  });
                } else if (selectedOption === 'Mac x86 (Conda)' || selectedOption === 'Mac Apple silicon (Conda)') {
                  stepper.ipc.invoke('Comfy_isCondaInstalled').then((isInstalled: boolean) => {
                    if (isInstalled) {
                      stepper.nextStep().then(() => {
                        stepper.executeTerminalCommands(getPyTorchInstallCommand(selectedOption), dir).then(() => {
                          stepper.nextStep().then(() => {
                            installReqs(dir);
                          });
                        });
                      });
                    } else {
                      stepper.initialSteps([
                        'ComfyUI',
                        'Clone',
                        'PyTorch Version',
                        'Conda',
                        'Install PyTorch',
                        'Dependencies',
                        'Finish',
                      ]);
                      stepper.nextStep().then(() => {
                        stepper.executeTerminalCommands(getMacCondaInstallCommand(selectedOption), dir).then(() => {
                          stepper.nextStep().then(() => {
                            stepper.executeTerminalCommands(getPyTorchInstallCommand(selectedOption), dir).then(() => {
                              stepper.nextStep().then(() => {
                                installReqs(dir);
                              });
                            });
                          });
                        });
                      });
                    }
                  });
                } else {
                  stepper.nextStep().then(() => {
                    stepper.executeTerminalCommands(getPyTorchInstallCommand(selectedOption), dir).then(() => {
                      stepper.nextStep().then(() => {
                        installReqs(dir);
                      });
                    });
                  });
                }
              });
          });
        });
      });
    } else if (targetDirectory) {
      // First try git validation
      stepper.utils.validateGitRepository(targetDirectory, COMFYUI_URL).then(isValid => {
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep(
            'success',
            'ComfyUI located successfully!',
            'Pre-installed ComfyUI detected. Installation skipped as your existing setup is ready to use.',
          );
        } else {
          // Fallback to file-based detection if git validation fails
          stepper.utils.verifyFilesExist(targetDirectory, ['comfy', 'main.py']).then(filesExist => {
            if (filesExist) {
              stepper.setInstalled(targetDirectory);
              stepper.showFinalStep(
                'success',
                `ComfyUI located successfully!`,
                `Detected a manual installation of ComfyUI. Note: Because this is not a Git repository,` +
                  ' automatic updates and certain version-dependent features may not work as expected.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                'Unable to locate ComfyUI!',
                'Please ensure you have selected the correct folder containing the ComfyUI installation ',
              );
            }
          });
        }
      });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(COMFYUI_URL, '/custom_nodes', api, callback);
}

const COMFYUI_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default COMFYUI_RM;

import {isEmpty} from 'lodash-es';

import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {getPythonCommandByOs, isWin, parseCustomArg} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, getArgumentType, isValidArg} from '../../../utils/rendererUtils';
import llamaFactoryArguments from './Arguments';

const LLAMA_FACTORY_URL = 'https://github.com/hiyouga/LlamaFactory';

function getCategoryType(name: string): 'cl' | 'env' {
  if (name.startsWith('-')) {
    return 'cl';
  }
  return 'env';
}

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines = '';
  let clResult = '';

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
        const argType = getArgumentType(arg.name, llamaFactoryArguments);
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

  result += isEmpty(clResult) ? 'llamafactory-cli webui\n' : `llamafactory-cli webui ${clResult.trim()}\n`;

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
        if (isValidArg(varName, llamaFactoryArguments)) {
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
        if (isValidArg(varName, llamaFactoryArguments)) {
          argResult.push({name: varName, value});
        }
      }
    } else if (line.startsWith('llamafactory-cli webui') || line.startsWith('python src/webui.py')) {
      const startCmd = line.startsWith('llamafactory-cli webui') ? 'llamafactory-cli webui' : 'python src/webui.py';
      const clArgs = line.substring(startCmd.length).trim();
      if (!clArgs) return;

      const argsList: string[] = clArgs.split('--').filter(Boolean);
      argsList.forEach((arg: string): void => {
        const [id, ...valueParts] = arg.trim().split(' ');
        const name = `--${id}`;
        const value = valueParts.join(' ').replace(/"/g, '').trim();

        if (isValidArg(name, llamaFactoryArguments)) {
          if (getArgumentType(name, llamaFactoryArguments) === 'CheckBox') {
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
  const pipCommand = getPythonCommandByOs().pip;

  const installReqs = (dir: string) => {
    stepper.executeTerminalCommands(`${pipCommand} install -e .[metrics]`, dir).then(() => {
      stepper.nextStep().then(() => {
        stepper.setInstalled(dir);
        stepper.showFinalStep(
          'success',
          'LLaMA Factory installation complete!',
          'All installation steps completed successfully. Your LLaMA Factory environment is ready for use.',
        );
      });
    });
  };

  stepper.initialSteps(['LLaMA Factory', 'Clone', 'Install Dependencies', 'Finish']);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      stepper.nextStep().then(() => {
        stepper.cloneRepository(LLAMA_FACTORY_URL).then(dir => {
          stepper.nextStep().then(() => {
            installReqs(dir);
          });
        });
      });
    } else if (targetDirectory) {
      stepper.utils
        .verifyFilesExist(targetDirectory, ['pyproject.toml', 'src/llamafactory/cli.py'])
        .then(filesExist => {
          if (filesExist) {
            stepper.setInstalled(targetDirectory);
            stepper.showFinalStep(
              'success',
              'LLaMA Factory located successfully!',
              'Pre-installed LLaMA Factory detected. Installation skipped as your existing setup is ready to use.',
            );
          } else {
            stepper.showFinalStep(
              'error',
              'Unable to locate LLaMA Factory!',
              'Please ensure you have selected the correct folder containing the LLaMA Factory repository.',
            );
          }
        });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(LLAMA_FACTORY_URL, undefined, api, callback);
}

const LLAMA_FACTORY_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default LLAMA_FACTORY_RM;

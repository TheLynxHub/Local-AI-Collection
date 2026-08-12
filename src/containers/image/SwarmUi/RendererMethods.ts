import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  ExtensionData,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin, parseCustomArg} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, getArgumentType, GitInstaller, isValidArg} from '../../../utils/rendererUtils';
import mcMonkeyArguments from './Arguments';

const shellCommand = isWin ? 'call launch-windows.bat' : 'bash ./launch-linux.sh';
const URL = 'https://github.com/mcmonkeyprojects/SwarmUI';

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines: string = '';
  let argResult: string = '';

  args.forEach(arg => {
    if (arg.custom) {
      const result = parseCustomArg(arg);
      if (!result) return;

      if (result.line) lines += result.line + '\n';
      if (result.commandArg) argResult += result.commandArg + ' ';
    } else {
      const argType = getArgumentType(arg.name, mcMonkeyArguments);
      if (argType === 'CheckBox') {
        argResult += `${arg.name} `;
      } else if (argType === 'File' || argType === 'Directory') {
        argResult += `${arg.name} "${arg.value}" `;
      } else {
        argResult += `${arg.name} ${arg.value} `;
      }
    }
  });

  if (lines) result += lines + '\n';

  result += isEmpty(argResult) ? shellCommand : `${shellCommand} ${argResult}`;

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (!line.startsWith(shellCommand)) return;

    // Extract the command line arguments and clear falsy values
    const clArgs: string = line.split(`${shellCommand} `)[1];

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
      if (isValidArg(value.name, mcMonkeyArguments)) {
        if (getArgumentType(value.name, mcMonkeyArguments) === 'CheckBox') {
          argResult.push({name: value.name, value: ''});
        } else {
          argResult.push({name: value.name, value: value.value});
        }
      }
    });
  });

  return argResult;
}

async function fetchExtensionList(): Promise<ExtensionData[]> {
  return [
    {
      url: 'https://github.com/Quaggles/SwarmUI-FaceTools',
      title: 'SwarmUI-FaceTools',
      description:
        'A SwarmUI extension that adds parameters for ReActor and FaceRestoreCF nodes to the the generate tab.',
      stars: 8,
    },
    {
      url: 'https://github.com/mcmonkey4eva/SwarmComfyDeployBackendExt',
      title: 'Swarm ComfyDeploy Backend Extension',
      description: 'An extension for SwarmUI to use ComfyDeploy as a backend.',
      stars: 1,
    },
    {
      url: 'https://github.com/kalebbroo/SwarmUI-MagicPromptExtension',
      title: 'SwarmUI MagicPrompt Extension',
      description:
        'The MagicPrompt Extension provides a simple and intuitive way directly in SwarmUI to generate text' +
        ' prompts for Stable Diffusion images. This uses your local Ollama LLMs.',
      stars: 7,
    },
    {
      url: 'https://github.com/Quaggles/SwarmUI-FaceTools',
      title: 'SwarmUI-FaceTools',
      description:
        'A SwarmUI extension that adds parameters for ReActor and FaceRestoreCF nodes to the the generate tab.',
      stars: 8,
    },
  ];
}

function startInstall(stepper: InstallationStepper) {
  GitInstaller('SwarmUI', URL, stepper, [isWin ? 'launch-windows.bat' : 'launch-linux.sh']);
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, '/src/Extensions', api, callback);
}

const SWARM_RM: CardRendererMethods = {
  catchAddress,
  fetchExtensionList,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default SWARM_RM;

import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isWin, parseCustomArg} from '../../../utils/crossUtils';
import {CardInfo, catchAddress, getArgumentType, GitInstaller, isValidArg} from '../../../utils/rendererUtils';
import stabilityArguments from './Arguments';

const shellCommand = isWin ? 'call run.bat' : 'bash ./run.sh';
const URL = 'https://github.com/gitmylo/audio-webui';

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
      const argType = getArgumentType(arg.name, stabilityArguments);
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
      if (isValidArg(value.name, stabilityArguments)) {
        if (getArgumentType(value.name, stabilityArguments) === 'CheckBox') {
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
  GitInstaller('Audio Generation', URL, stepper, [isWin ? 'run.bat' : 'run.sh']);
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, '/extensions', api, callback);
}

const AG_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default AG_RM;

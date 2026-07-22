import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {isMac, isWin, parseCustomArg} from '../../../Utils/CrossUtils';
import {CardInfo, getArgumentType, GitInstaller, isValidArg, replaceAddress} from '../../../Utils/RendererUtils';
import oobaboogaArguments from './Arguments';
import {fetchExtensionList} from './ExtensionsList';

const shellCommand = isWin ? 'call start_windows.bat' : isMac ? 'bash ./start_macos.sh' : 'bash ./start_linux.sh';
const URL = 'https://github.com/oobabooga/textgen';

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
      const argType = getArgumentType(arg.name, oobaboogaArguments);
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
      if (isValidArg(value.name, oobaboogaArguments)) {
        if (getArgumentType(value.name, oobaboogaArguments) === 'CheckBox') {
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
  GitInstaller('Text Generation', URL, stepper, [
    isWin ? 'start_windows.bat' : isMac ? 'start_macos.sh' : 'start_linux.sh',
  ]);
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, '/extensions', api, callback);
}

export function catchAddress(input: string): string | undefined {
  const webUiPattern = /Running on local URL:\s*(https?:\/\/[^\s]+)/i;

  const match = input.match(webUiPattern);

  if (match) {
    return replaceAddress(match[1]);
  }

  return undefined;
}

const TG_RM: CardRendererMethods = {
  catchAddress,
  fetchExtensionList,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default TG_RM;

import {isEmpty} from 'lodash-es';

import {
  ArgType,
  Category,
  ChosenArgument,
  DataSection,
  ExtensionData,
} from '../../../../../src/common/types/plugins/modules';
import {isWin, parseCustomArg} from '../../../utils/crossUtils';
import {getArgumentType, isValidArg, removeEscapes} from '../../../utils/rendererUtils';
import automatic1111Arguments from './Arguments';

export async function fetchExtensionList(): Promise<ExtensionData[]> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui-extensions/master/index.json',
    );
    const extensions = await response.json();
    return extensions.extensions.map((extension: any) => ({
      title: extension.name,
      description: extension.description,
      url: extension.url,
      stars: extension.stars,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

function getTypeByCategoryName(category: string): Category {
  switch (category) {
    case 'Command Line Arguments':
      return 'cl';
    case 'Environment':
    case 'Environment Variables':
      return 'env';
    default:
      return undefined;
  }
}

function getCategoryType(name: string): Category {
  if (!name) return undefined;

  for (const argument of automatic1111Arguments) {
    if ('sections' in argument) {
      for (const section of argument.sections) {
        if (section.items.some(item => item.name === name)) {
          if (section.section === 'Variables') return 'envVar';
          return getTypeByCategoryName(argument.category);
        }
      }
    } else {
      if (argument.items.some(item => item.name === name)) {
        return getTypeByCategoryName(argument.category);
      }
    }
  }

  return undefined;
}

export function parseArgsToString(args: ChosenArgument[]): string {
  let result: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines: string = '';
  let clResult: string = '';

  args.forEach(arg => {
    if (arg.custom) {
      const result = parseCustomArg(arg);
      if (!result) return;

      if (result.line) lines += result.line + '\n';
      if (result.commandArg) clResult += result.commandArg + ' ';
    } else {
      const cat = getCategoryType(arg.name);
      if (cat !== 'cl') {
        const eWinResult: string = `set ${arg.name}=${arg.value}\n`;
        const eResult: string = cat === 'env' ? `export ${arg.name}="${arg.value}"\n` : `${arg.name}="${arg.value}"\n`;
        if (arg.name !== 'COMMANDLINE_ARGS') result += isWin ? eWinResult : eResult;
      } else if (cat === 'cl') {
        const argType = getArgumentType(arg.name, automatic1111Arguments);
        if (argType === 'CheckBox') {
          clResult += `${arg.name} `;
        } else if (argType === 'File' || argType === 'Directory') {
          clResult += isWin ? `${arg.name} "${arg.value}" ` : `${arg.name} ${arg.value} `;
        } else {
          clResult += `${arg.name} ${arg.value} `;
        }
      }
    }
  });

  if (lines) result += lines + '\n';

  if (!isEmpty(clResult))
    result += isWin ? `set COMMANDLINE_ARGS=${clResult}\n` : `export COMMANDLINE_ARGS=${clResult}\n`;

  result += isWin ? `\ncall webui.bat` : ``;

  return result;
}

function checkLinuxArgLine(line: string): 'set' | 'export' | 'var' | undefined {
  if (isWin && line.startsWith('set ')) return 'set';

  if (line.startsWith('export ')) return 'export';

  for (const arg of automatic1111Arguments) {
    if (arg.category === 'Environment') {
      if ((arg as DataSection).sections[0].items.find(item => item.name === line.split('=')[0])) {
        return 'var';
      } else {
        return undefined;
      }
    }
  }

  return undefined;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((line: string): void => {
    if (line.startsWith('#')) {
      return;
    } else if (line.startsWith(`${isWin ? 'set' : 'export'} COMMANDLINE_ARGS=`)) {
      argResult.push({name: 'COMMANDLINE_ARGS', value: ''});
      // Extract the command line arguments and clear falsy values
      const clArgs: string = line.split('=')[1];

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
        if (isValidArg(value.name, automatic1111Arguments)) {
          if (getArgumentType(value.name, automatic1111Arguments) === 'CheckBox') {
            argResult.push({name: value.name, value: ''});
          } else {
            argResult.push({name: value.name, value: value.value});
          }
        }
      });
    } else {
      const lineType = checkLinuxArgLine(line);
      if (lineType === 'export' || lineType === 'set') {
        // If line starts with 'set ' or 'export ', extract the environment variable id and value
        let [name, value] = line.replace(`${lineType} `, '').split('=');
        name = removeEscapes(name.trim());
        value = removeEscapes(value.trim());
        if (isValidArg(name, automatic1111Arguments)) {
          argResult.push({name, value});
        }
      } else if (checkLinuxArgLine(line) === 'var') {
        let [name, value] = line.split('=');
        name = removeEscapes(name.trim());
        value = removeEscapes(value.trim());
        if (isValidArg(name, automatic1111Arguments)) {
          argResult.push({name, value});
        }
      }
    }
  });

  return argResult;
}

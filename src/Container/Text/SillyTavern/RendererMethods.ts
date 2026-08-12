import {dump, load} from 'js-yaml';
import {isEmpty} from 'lodash-es';

import {
  ArgType,
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  InstallationStepper,
  ParsedPreview,
} from '../../../../../src/common/types/plugins/modules';
import {isWin, parseCustomArg} from '../../../Utils/CrossUtils';
import {
  CardInfo,
  catchAddress,
  getArgumentType,
  GitInstaller,
  isMultiFilePreviewSupported,
  isValidArg,
} from '../../../Utils/RendererUtils';
import sillyArguments from './Arguments';

const shellCommand = isWin ? 'call start.bat' : 'bash ./start.sh';
const URL = 'https://github.com/SillyTavern/SillyTavern';

/**
 * Checks if an argument is a configuration-file argument or a command-line argument.
 * @param name The name of the argument.
 * @returns {boolean | undefined} `true` if it's a config arg, `false` if it's a command-line arg, `undefined` if not found.
 */
function isConfigArg(name: string): boolean | undefined {
  if (isEmpty(name)) return undefined;

  for (const argument of sillyArguments) {
    // Configuration arguments are defined within 'sections'
    if ('sections' in argument) {
      for (const section of argument.sections) {
        const found = section.items.find(item => item.name === name);
        if (found) return true;
      }
    } else {
      // Command-line arguments are directly in 'items'
      const found = argument.items.find(item => item.name === name);
      if (found) return false;
    }
  }

  return undefined;
}

/**
 * Finds the full definition of an argument from the sillyArguments structure.
 * @param name - The name of the argument to find.
 * @returns The argument item definition or undefined if not found.
 */
function getArgDefinition(name: string) {
  for (const category of sillyArguments) {
    const items = 'sections' in category ? category.sections.flatMap(section => section.items) : category.items;
    const found = items.find(item => item.name === name);
    if (found) {
      return found;
    }
  }
  return undefined;
}

/**
 * Sets a nested property on an object based on a dot-notation path.
 * @param obj The object to modify.
 * @param path The dot-notation path (e.g., "logging.minLogLevel").
 * @param value The value to set.
 */
function setNestedValue(obj: Record<string, any>, path: string, value: any) {
  const keys = path.split('.');
  let current = obj;
  while (keys.length > 1) {
    const key = keys.shift()!;
    if (typeof current[key] === 'undefined') {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[0]] = value;
}

/**
 * NEW: Parses arguments into an object with separate file contents.
 * @param args The chosen arguments from the UI.
 * @returns An object with `commands` and `configs` string properties.
 */
export function parseArgsToFiles(args: ChosenArgument[]): {commands: string; configs: string} {
  let commandArgs: string = '';
  let lines: string = '';
  const configObject: Record<string, any> = {};

  // This logic is identical to parseArgsToString for separating arguments
  args.forEach(arg => {
    if (arg.custom) {
      const result = parseCustomArg(arg);
      if (!result) return;

      if (result.line) lines += result.line + '\n';
      if (result.commandArg) commandArgs += result.commandArg + ' ';
    } else {
      const isConfig = isConfigArg(arg.name);

      if (isConfig === true) {
        const definition = getArgDefinition(arg.name);
        if (!definition) return;

        let processedValue: any = arg.value;
        if (definition.type === 'CheckBox') {
          processedValue = true;
        } else if (typeof definition.defaultValue === 'number') {
          processedValue = Number(arg.value) || definition.defaultValue;
        } else if (definition.defaultValue === 'true' || definition.defaultValue === 'false') {
          processedValue = arg.value.toString().toLowerCase() === 'true';
        }
        setNestedValue(configObject, arg.name, processedValue);
      } else if (isConfig === false) {
        const argType = getArgumentType(arg.name, sillyArguments);
        if (argType === 'CheckBox') {
          commandArgs += `${arg.name} `;
        } else if (argType === 'File' || argType === 'Directory') {
          commandArgs += `${arg.name} "${arg.value}" `;
        } else {
          commandArgs += `${arg.name} ${arg.value} `;
        }
      }
    }
  });

  // Build the command file content
  let commandResult: string = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  if (lines) commandResult += lines + '\n';
  commandResult += isEmpty(commandArgs) ? shellCommand : `${shellCommand} ${commandArgs.trim()}`;

  // Build the config file content
  const configResult = isEmpty(configObject) ? '# No configuration options were selected to save.' : dump(configObject);

  return {
    commands: commandResult,
    configs: configResult,
  };
}

export function parseArgsToString(args: ChosenArgument[]): ParsedPreview {
  const {commands, configs} = parseArgsToFiles(args);

  const commandTitle = `Script File Preview (${isWin ? '.bat' : '.sh'})`;
  const configTitle = 'Configuration File Preview (config.yml)';

  if (isMultiFilePreviewSupported) {
    return [
      {title: commandTitle, data: commands},
      {title: configTitle, data: configs},
    ];
  }

  let finalResult: string = `-------------${commandTitle}-------------`;
  finalResult += `\n\n${commands}\n\n`;
  finalResult += `-------------${configTitle}-------------`;
  finalResult += `\n\n${configs}`;

  return finalResult;
}

/**
 * Recursively flattens a nested config object into a ChosenArgument array.
 */
function flattenConfigObject(obj: any, prefix = ''): ChosenArgument[] {
  let results: ChosenArgument[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        results = results.concat(flattenConfigObject(value, newPrefix));
      } else {
        const definition = getArgDefinition(newPrefix);
        if (definition?.type === 'CheckBox' && value === true) {
          results.push({name: newPrefix, value: ''});
        } else {
          results.push({name: newPrefix, value: String(value)});
        }
      }
    }
  }
  return results;
}

export function parseFilesToArgs(commands: string, configs: string): ChosenArgument[] {
  // 1. Parse Command-line arguments from the commands string
  const commandArgResult: ChosenArgument[] = [];
  if (!isEmpty(commands)) {
    const lines: string[] = commands.split('\n');
    lines.forEach((line: string): void => {
      if (!line.startsWith(shellCommand)) return;

      const clArgs: string = line.split(`${shellCommand} `)[1];
      if (!clArgs) return;

      const args: string[] = clArgs.split('--').filter(Boolean);
      const result: ArgType[] = args.map((arg: string): ArgType => {
        const [id, ...value] = arg.trim().split(' ');
        return {name: `--${id}`, value: value.join(' ').replace(/"/g, '')};
      });

      result.forEach((value: ArgType): void => {
        if (isValidArg(value.name, sillyArguments)) {
          commandArgResult.push({
            name: value.name,
            value: getArgumentType(value.name, sillyArguments) === 'CheckBox' ? '' : value.value,
          });
        }
      });
    });
  }

  // 2. Parse YAML configuration from the configs string
  let configArgResult: ChosenArgument[] = [];
  if (!isEmpty(configs)) {
    try {
      const parsedYaml = load(configs); // <-- Changed to use load from js-yaml
      if (typeof parsedYaml === 'object' && parsedYaml !== null) {
        configArgResult = flattenConfigObject(parsedYaml);
      }
    } catch (e) {
      console.error('Failed to parse YAML config string:', e);
    }
  }

  // 3. Combine and return both results
  return [...commandArgResult, ...configArgResult];
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
      if (isValidArg(value.name, sillyArguments)) {
        if (getArgumentType(value.name, sillyArguments) === 'CheckBox') {
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
  GitInstaller('SillyTavern', URL, stepper, [isWin ? 'start.bat' : 'start.sh']);
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(URL, undefined, api, callback);
}

const SILLYTAVERN_RM: CardRendererMethods = {
  catchAddress,
  parseArgsToString,
  parseStringToArgs,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'git'}},
};

export default SILLYTAVERN_RM;

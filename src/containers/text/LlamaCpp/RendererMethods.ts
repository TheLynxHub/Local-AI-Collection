import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  GitHubRelease,
  InstallationStepper,
  ParsedPreview,
  UserInputField,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager} from '../../../utils/crossUtils';
import {catchAddress} from '../../../utils/rendererUtils';
import llamaCppArguments from './Arguments';
import {
  detectDefaultPlatformKey,
  findAssetUrlForPlatform,
  LLAMA_CPP_INSTALL_DIR_KEY,
  LLAMA_CPP_INSTALL_TIME_KEY,
  LLAMA_CPP_PLATFORM_KEY,
  LLAMA_CPP_UPDATE_TIME_KEY,
  LLAMA_PLATFORM_OPTIONS,
} from './utils/github';

function getArgumentInfo(argName: string): {category: string; type: string; name: string} | undefined {
  for (const data of llamaCppArguments) {
    if ('sections' in data) {
      for (const section of data.sections) {
        for (const item of section.items) {
          const flag = item.name.split(' ')[0];
          if (flag === argName) {
            return {category: data.category, type: item.type, name: item.name};
          }
        }
      }
    }
  }
  return undefined;
}

export function parseArgsToFiles(args: ChosenArgument[]): {scriptData: string} {
  let scriptString = 'llama-server';

  args.forEach(arg => {
    const info = getArgumentInfo(arg.name.split(' ')[0]) || getArgumentInfo(arg.name);
    const flagName = info ? info.name.split(' ')[0] : arg.name;

    if (info && info.type === 'CheckBox') {
      if (
        arg.value !== 'false' &&
        (arg.value as any) !== false &&
        (arg.value as any) !== 0 &&
        String(arg.value) !== '0'
      ) {
        scriptString += ` ${flagName}`;
      }
    } else if (arg.value !== undefined && arg.value !== null && String(arg.value).trim() !== '') {
      scriptString += ` ${flagName} "${arg.value}"`;
    }
  });

  scriptString += '\n';
  return {scriptData: scriptString};
}

export function parseArgsToString(args: ChosenArgument[]): ParsedPreview {
  const {scriptData} = parseArgsToFiles(args);
  return scriptData;
}

export function parseStringToArgs(data: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = data.split('\n');

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || !trimmed) return;

    if (trimmed.startsWith('llama-server') || trimmed.startsWith('llama-cli')) {
      const clArg = trimmed.replace(/^(llama-server|llama-cli)\s*/, '');
      const tokenRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
      const tokens: string[] = [];
      let tokenMatch: RegExpExecArray | null;

      while ((tokenMatch = tokenRegex.exec(clArg)) !== null) {
        tokens.push(tokenMatch[1] ?? tokenMatch[2] ?? tokenMatch[3]);
      }

      for (let i = 0; i < tokens.length; i++) {
        const flag = tokens[i];
        if (!flag.startsWith('-')) continue;

        const info = getArgumentInfo(flag);
        const nameToUse = info ? info.name : flag;
        const isCheckBox = info ? info.type === 'CheckBox' : false;

        if (isCheckBox) {
          argResult.push({name: nameToUse, value: 'true'});
        } else {
          const nextToken = tokens[i + 1];
          if (nextToken && !nextToken.startsWith('-')) {
            argResult.push({name: nameToUse, value: nextToken.replace(/"/g, '')});
            i++;
          } else {
            argResult.push({name: nameToUse, value: 'true'});
          }
        }
      }
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['llama.cpp', 'Configure Options', 'Download & Extract', 'Finish']);

  stepper.starterStep({disableSelectDir: true}).then(() => {
    stepper.nextStep().then(() => {
      stepper.progressBar(true, 'Fetching recent llama.cpp releases from GitHub...');

      stepper.ipc.invoke('fetch_llama_cpp_releases').then((releases: GitHubRelease[]) => {
        const recentReleases = releases.slice(0, 15);
        const versionOptions = recentReleases.map(r => r.tag_name);
        const defaultVersion = versionOptions[0] || 'latest';

        const platformLabels = LLAMA_PLATFORM_OPTIONS.map(opt => opt.label);
        const defaultPlatformKey = detectDefaultPlatformKey();
        const defaultPlatformOption =
          LLAMA_PLATFORM_OPTIONS.find(opt => opt.key === defaultPlatformKey) || LLAMA_PLATFORM_OPTIONS[0];
        const defaultPlatformLabel = defaultPlatformOption.label;

        const inputFields: UserInputField[] = [
          {
            id: 'install_dir',
            label: 'Installation Folder',
            type: 'directory',
            isRequired: true,
          },
          {
            id: 'version',
            label: 'Release Version',
            type: 'select',
            selectOptions: versionOptions.length > 0 ? versionOptions : ['latest'],
            defaultValue: defaultVersion,
            isRequired: true,
          },
          {
            id: 'platform',
            label: 'Architecture / Platform / Acceleration Backend',
            type: 'select',
            selectOptions: platformLabels,
            defaultValue: defaultPlatformLabel,
            isRequired: true,
          },
        ];

        stepper.collectUserInput(inputFields, 'llama.cpp Setup Options').then(results => {
          const installDir = (results.find(r => r.id === 'install_dir')?.result as string) || '';
          const selectedVersionTag = (results.find(r => r.id === 'version')?.result as string) || defaultVersion;
          const selectedPlatformLabel =
            (results.find(r => r.id === 'platform')?.result as string) || defaultPlatformLabel;

          const selectedPlatformOption =
            LLAMA_PLATFORM_OPTIONS.find(opt => opt.label === selectedPlatformLabel) || defaultPlatformOption;

          const chosenRelease = recentReleases.find(r => r.tag_name === selectedVersionTag) || recentReleases[0];
          const assetUrl = chosenRelease
            ? findAssetUrlForPlatform(chosenRelease.assets, selectedPlatformOption.key)
            : undefined;

          if (!assetUrl) {
            stepper.showFinalStep(
              'error',
              'Download Error',
              'Could not find a matching release binary asset for your selection.',
            );
            return;
          }

          stepper.nextStep().then(() => {
            stepper.progressBar(true, `Downloading llama.cpp (${selectedVersionTag})...`);
            stepper.downloadFileFromUrl(assetUrl).then(downloadedFilePath => {
              stepper.progressBar(true, 'Decompressing archive with 7z...');
              stepper.utils.decompressFile(downloadedFilePath).then(extractedDir => {
                stepper.progressBar(true, 'Finalizing installation...');
                stepper.ipc.invoke('copy_llama_cpp_files', extractedDir, installDir).then(() => {
                  stepper.setInstalled(installDir);
                  const now = new Date().toLocaleString();
                  stepper.storage.set(LLAMA_CPP_INSTALL_TIME_KEY, now);
                  stepper.storage.set(LLAMA_CPP_INSTALL_DIR_KEY, installDir);
                  stepper.storage.set(LLAMA_CPP_PLATFORM_KEY, selectedPlatformOption.key);

                  stepper.showFinalStep(
                    'success',
                    'llama.cpp Ready!',
                    `Installed llama.cpp version ${selectedVersionTag} successfully to ${installDir}.`,
                  );
                });
              });
            });
          });
        });
      });
    });
  });
}

function startUpdate(stepper: InstallationStepper, dir?: string) {
  if (!dir) return;

  stepper.initialSteps(['Checking Release', 'Updating llama.cpp', 'Done']);

  stepper.storage.get<string>(LLAMA_CPP_PLATFORM_KEY).then(platformKey => {
    const activePlatformKey = platformKey || detectDefaultPlatformKey();

    stepper.ipc.invoke('fetch_llama_cpp_releases').then((releases: GitHubRelease[]) => {
      const latestRelease = releases[0];
      if (!latestRelease) {
        stepper.showFinalStep('error', 'Update Failed', 'Failed to fetch latest llama.cpp release metadata.');
        return;
      }

      const assetUrl = findAssetUrlForPlatform(latestRelease.assets, activePlatformKey);
      if (!assetUrl) {
        stepper.showFinalStep('error', 'Update Failed', 'Could not locate matching release asset for update.');
        return;
      }

      stepper.nextStep().then(() => {
        stepper.progressBar(true, `Downloading latest release (${latestRelease.tag_name})...`);
        stepper.downloadFileFromUrl(assetUrl).then(downloadedFilePath => {
          stepper.progressBar(true, 'Decompressing update package via 7z...');
          stepper.utils.decompressFile(downloadedFilePath).then(extractedDir => {
            stepper.progressBar(true, 'Replacing binary files...');
            stepper.ipc.invoke('copy_llama_cpp_files', extractedDir, dir).then(() => {
              stepper.setUpdated();
              const now = new Date().toLocaleString();
              stepper.storage.set(LLAMA_CPP_UPDATE_TIME_KEY, now);

              stepper.showFinalStep(
                'success',
                'llama.cpp Updated!',
                `Successfully updated llama.cpp to version ${latestRelease.tag_name}.`,
              );
            });
          });
        });
      });
    });
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  const dir = api.installationFolder;
  callback.setOpenFolders(dir ? [dir] : undefined);

  const descManager = new DescriptionManager(
    [
      {
        title: 'Installation Data',
        items: [
          {label: 'Install Date', result: 'loading'},
          {label: 'Update Date', result: 'loading'},
          {label: 'Current Version', result: 'loading'},
          {label: 'Platform / Backend', result: 'loading'},
          {label: 'Latest Version', result: 'loading'},
        ],
      },
    ],
    callback,
  );

  api.storage.get(LLAMA_CPP_INSTALL_TIME_KEY).then(result => {
    descManager.updateItem(0, 0, result || 'Not Recorded');
  });

  api.storage.get(LLAMA_CPP_UPDATE_TIME_KEY).then(result => {
    descManager.updateItem(0, 1, result || 'Never Updated');
  });

  api.ipc.invoke('current_llama_cpp_version', dir).then((result: string) => {
    descManager.updateItem(0, 2, result || 'Unknown');
  });

  api.storage.get(LLAMA_CPP_PLATFORM_KEY).then(key => {
    const opt = LLAMA_PLATFORM_OPTIONS.find(o => o.key === key);
    descManager.updateItem(0, 3, opt ? opt.label : key || 'Default');
  });

  api.ipc.invoke('fetch_llama_cpp_latest_tag').then(result => {
    descManager.updateItem(0, 4, result || 'Unknown');
  });
}

const LlamaCpp_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  parseArgsToString,
  parseStringToArgs,
  manager: {
    startInstall,
    updater: {
      updateType: 'stepper',
      startUpdate,
    },
  },
};

export default LlamaCpp_RM;

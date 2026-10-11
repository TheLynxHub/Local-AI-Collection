import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  ChosenArgument,
  GitHubRelease,
  InstallationStepper,
  UserInputField,
} from '../../../../../src/common/types/plugins/modules';
import {DescriptionManager, formatSize, getPythonCommandByOs, isWin, parseCustomArg} from '../../../utils/crossUtils';
import {catchAddress, getArgumentType, isValidArg, removeEscapes} from '../../../utils/rendererUtils';
import audioCppArguments from './Arguments';
import {
  AUDIOCPP_INSTALL_DIR_KEY,
  AUDIOCPP_INSTALL_TIME_KEY,
  AUDIOCPP_PLATFORM_KEY,
  AUDIOCPP_PLATFORM_OPTIONS,
  AUDIOCPP_UPDATE_TIME_KEY,
  AUDIOCPP_VERSION_KEY,
  detectDefaultPlatform,
  findAppAsset,
  findCoreAsset,
} from './utils/github';

const REPO_URL = 'https://github.com/kigner/audio.cpp-webui';

export function parseArgsToString(args: ChosenArgument[]): string {
  let result = isWin ? '@echo off\n\n' : '#!/bin/bash\n\n';
  let lines = '';
  let launchMode = 'webui';
  let serverModel = 'qwen3-tts';
  let serverPort = '8088';
  let serverDevice = '0';
  let voiceRef = '';

  args.forEach(arg => {
    if (arg.custom) {
      const customRes = parseCustomArg(arg);
      if (customRes?.line) lines += customRes.line + '\n';
    } else {
      if (arg.name === 'AUDIOCPP_LAUNCH_MODE') {
        launchMode = String(arg.value || 'webui');
        return;
      }
      if (arg.name === 'AUDIOCPP_MODEL_ID') {
        serverModel = String(arg.value || 'qwen3-tts');
        return;
      }
      if (arg.name === 'AUDIOCPP_PORT') {
        serverPort = String(arg.value || '8088');
        lines += isWin ? `set AUDIOCPP_PORT=${serverPort}\n` : `export AUDIOCPP_PORT="${serverPort}"\n`;
        return;
      }
      if (arg.name === 'AUDIOCPP_DEVICE') {
        serverDevice = String(arg.value || '0');
        lines += isWin ? `set AUDIOCPP_DEVICE=${serverDevice}\n` : `export AUDIOCPP_DEVICE="${serverDevice}"\n`;
        return;
      }
      if (arg.name === 'AUDIOCPP_VOICE_REF') {
        voiceRef = String(arg.value || '');
        if (voiceRef) {
          lines += isWin ? `set AUDIOCPP_VOICE_REF=${voiceRef}\n` : `export AUDIOCPP_VOICE_REF="${voiceRef}"\n`;
        }
        return;
      }

      const argType = getArgumentType(arg.name, audioCppArguments);
      if (argType === 'CheckBox') {
        const isTrue = arg.value !== 'false' && (arg.value as any) !== false && arg.value !== '0';
        if (isTrue) {
          lines += isWin ? `set ${arg.name}=1\n` : `export ${arg.name}="1"\n`;
        }
      } else if (arg.value !== undefined && arg.value !== null && String(arg.value).trim() !== '') {
        if (arg.name === 'AUDIOCPP_BACKEND' && arg.value === 'auto') {
          return;
        }
        lines += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
      }
    }
  });

  if (lines) result += lines + '\n';

  if (isWin) {
    if (launchMode === 'native_webui') {
      result += 'call run_native_webui.bat\n';
    } else if (launchMode === 'server') {
      result += `call run_server.bat ${serverModel} ${serverPort} ${serverDevice}${voiceRef ? ` "${voiceRef}"` : ''}\n`;
    } else {
      result +=
        'if exist "%~dp0venv\\Scripts\\python.exe" (\n' +
        '  "%~dp0venv\\Scripts\\python.exe" webui\\webui.py\n' +
        ') else (\n' +
        '  python webui\\webui.py\n' +
        ')\n';
    }
  } else {
    if (launchMode === 'server') {
      result += `python tools/server.py --model ${serverModel} --port ${serverPort}\n`;
    } else {
      result +=
        'if [ -f "./venv/bin/python" ]; then\n' +
        '  ./venv/bin/python webui/webui.py\n' +
        'else\n' +
        '  python webui/webui.py\n' +
        'fi\n';
    }
  }

  return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
  const argResult: ChosenArgument[] = [];
  const lines: string[] = args.split('\n');

  lines.forEach((rawLine: string): void => {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith('@echo') || line.startsWith('REM')) {
      return;
    }

    if (line.includes('run_native_webui.bat')) {
      argResult.push({name: 'AUDIOCPP_LAUNCH_MODE', value: 'native_webui'});
      return;
    }

    if (line.includes('run_server.bat')) {
      argResult.push({name: 'AUDIOCPP_LAUNCH_MODE', value: 'server'});
      const parts = line.replace('call run_server.bat', '').trim().split(' ').filter(Boolean);
      if (parts[0]) argResult.push({name: 'AUDIOCPP_MODEL_ID', value: parts[0]});
      if (parts[1]) argResult.push({name: 'AUDIOCPP_PORT', value: parts[1]});
      if (parts[2]) argResult.push({name: 'AUDIOCPP_DEVICE', value: parts[2]});
      if (parts[3]) argResult.push({name: 'AUDIOCPP_VOICE_REF', value: parts[3].replace(/"/g, '')});
      return;
    }

    if (line.includes('run_webui.bat') || line.includes('webui/webui.py') || line.includes('webui\\webui.py')) {
      argResult.push({name: 'AUDIOCPP_LAUNCH_MODE', value: 'webui'});
      return;
    }

    if (line.startsWith('set ') || line.startsWith('export ')) {
      const prefix = line.startsWith('set ') ? 'set ' : 'export ';
      const [varName, ...valueParts] = line.slice(prefix.length).split('=');
      const name = removeEscapes((varName || '').trim());
      let value = removeEscapes(valueParts.join('=').trim());
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      if (isValidArg(name, audioCppArguments)) {
        argResult.push({name, value});
      }
    }
  });

  return argResult;
}

function startInstall(stepper: InstallationStepper) {
  stepper.initialSteps(['audio.cpp WebUI', 'Setup Options', 'Download & Install', 'Finish']);

  stepper
    .starterStep()
    .then(({targetDirectory, chosen}) => {
      if (targetDirectory && chosen !== 'install') {
        stepper.ipc
          .invoke('validate_audiocpp_install_dir', targetDirectory)
          .then((isValid: boolean) => {
            if (isValid) {
              stepper.setInstalled(targetDirectory);
              stepper.storage.set(AUDIOCPP_INSTALL_TIME_KEY, new Date().toLocaleString());
              stepper.storage.set(AUDIOCPP_INSTALL_DIR_KEY, targetDirectory);
              stepper.showFinalStep(
                'success',
                'audio.cpp WebUI located successfully!',
                'Detected an existing installation of audio.cpp WebUI. Your environment is ready for use.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                'Unable to locate audio.cpp WebUI!',
                'Please select a valid folder containing audio.cpp WebUI launcher scripts or binaries.',
              );
            }
          })
          .catch(err => {
            stepper.showFinalStep('error', 'Validation Error', `Failed to validate folder: ${err?.message || err}`);
          });
        return;
      }

      stepper.nextStep().then(() => {
        const defaultPlatformKey = detectDefaultPlatform();
        const platformLabels = AUDIOCPP_PLATFORM_OPTIONS.map(opt => opt.label);
        const defaultPlatformLabel =
          AUDIOCPP_PLATFORM_OPTIONS.find(opt => opt.key === defaultPlatformKey)?.label || platformLabels[0];

        const methodFields: UserInputField[] = [
          {
            id: 'install_method',
            label: 'Installation Method / Acceleration',
            type: 'select',
            selectOptions: platformLabels,
            defaultValue: defaultPlatformLabel,
            isRequired: true,
          },
        ];

        stepper
          .collectUserInput(methodFields, 'Select Installation Method')
          .then(methodResults => {
            const selectedMethodLabel =
              (methodResults.find(r => r.id === 'install_method')?.result as string) || defaultPlatformLabel;

            const selectedPlatformOption =
              AUDIOCPP_PLATFORM_OPTIONS.find(opt => opt.label === selectedMethodLabel) || AUDIOCPP_PLATFORM_OPTIONS[0];

            if (selectedPlatformOption.key === 'git') {
              stepper.nextStep().then(() => {
                stepper
                  .cloneRepository(REPO_URL)
                  .then(clonedDir => {
                    stepper.progressBar(true, 'Installing WebUI dependencies with pip...');
                    const pipCmd = getPythonCommandByOs().pip;
                    stepper
                      .executeTerminalCommands(`${pipCmd} install -r webui/requirements.txt`, clonedDir)
                      .then(() => {
                        stepper.setInstalled(clonedDir);
                        const now = new Date().toLocaleString();
                        stepper.storage.set(AUDIOCPP_INSTALL_TIME_KEY, now);
                        stepper.storage.set(AUDIOCPP_INSTALL_DIR_KEY, clonedDir);
                        stepper.storage.set(AUDIOCPP_PLATFORM_KEY, 'git');
                        stepper.storage.set(AUDIOCPP_VERSION_KEY, 'git-source');
                        stepper.showFinalStep(
                          'success',
                          'audio.cpp WebUI Ready!',
                          `Successfully cloned audio.cpp-webui and initialized environment in ${clonedDir}.`,
                        );
                      })
                      .catch(() => {
                        stepper.setInstalled(clonedDir);
                        const now = new Date().toLocaleString();
                        stepper.storage.set(AUDIOCPP_INSTALL_TIME_KEY, now);
                        stepper.storage.set(AUDIOCPP_INSTALL_DIR_KEY, clonedDir);
                        stepper.storage.set(AUDIOCPP_PLATFORM_KEY, 'git');
                        stepper.storage.set(AUDIOCPP_VERSION_KEY, 'git-source');
                        stepper.showFinalStep(
                          'warning' as any,
                          'Repository Cloned with Warnings',
                          'Cloned repository successfully, but some Python dependencies ' +
                            'could not be installed automatically. You can install them via ' +
                            'the Dependencies menu option.',
                        );
                      });
                  })
                  .catch(err => {
                    stepper.showFinalStep(
                      'error',
                      'Clone Failed',
                      `Failed to clone repository: ${err?.message || err}`,
                    );
                  });
              });
              return;
            }

            stepper.nextStep().then(() => {
              stepper.progressBar(true, 'Fetching release information from GitHub...');

              stepper.ipc
                .invoke('fetch_audiocpp_releases')
                .then((releases: GitHubRelease[]) => {
                  const versionOptions = releases.map(r => r.tag_name);
                  const defaultVersion = versionOptions[0] || 'latest';

                  const portableFields: UserInputField[] = [
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
                  ];

                  stepper
                    .collectUserInput(portableFields, 'Portable Release Setup')
                    .then(portableResults => {
                      const installDir = (portableResults.find(r => r.id === 'install_dir')?.result as string) || '';
                      const selectedVersionTag =
                        (portableResults.find(r => r.id === 'version')?.result as string) || defaultVersion;

                      const chosenRelease = releases.find(r => r.tag_name === selectedVersionTag) || releases[0];
                      if (!chosenRelease) {
                        stepper.showFinalStep('error', 'Download Error', 'No matching release found on GitHub.');
                        return;
                      }

                      const appAsset = findAppAsset(chosenRelease.assets);
                      const platformKey = selectedPlatformOption.key === 'cpu' ? 'cpu' : 'cuda';
                      const coreAsset = findCoreAsset(chosenRelease.assets, platformKey);

                      if (!appAsset || !coreAsset) {
                        stepper.showFinalStep(
                          'error',
                          'Download Error',
                          'Could not locate app or core binary assets in the selected GitHub release.',
                        );
                        return;
                      }

                      stepper.progressBar(true, `Downloading audio.cpp App (${chosenRelease.tag_name})...`);
                      stepper
                        .downloadFileFromUrl(appAsset.browser_download_url)
                        .then(downloadedAppZip => {
                          stepper.progressBar(true, 'Decompressing audio.cpp App package with 7z...');
                          stepper.utils
                            .decompressFile(downloadedAppZip)
                            .then(extractedAppDir => {
                              stepper.progressBar(true, 'Deploying App files to installation folder...');
                              stepper.ipc
                                .invoke('copy_audiocpp_files', extractedAppDir, installDir)
                                .then(() => {
                                  const coreName = selectedPlatformOption.key.toUpperCase();
                                  stepper.progressBar(true, `Downloading audio.cpp Core ${coreName} binaries...`);
                                  stepper
                                    .downloadFileFromUrl(coreAsset.browser_download_url)
                                    .then(downloadedCoreZip => {
                                      stepper.progressBar(true, 'Decompressing Core runtime binaries with 7z...');
                                      stepper.utils
                                        .decompressFile(downloadedCoreZip)
                                        .then(extractedCoreDir => {
                                          stepper.progressBar(true, 'Deploying Core runtime binaries...');
                                          stepper.ipc
                                            .invoke('copy_audiocpp_files', extractedCoreDir, installDir)
                                            .then(() => {
                                              stepper.progressBar(true, 'Installing WebUI dependencies with pip...');
                                              const pipCmd = getPythonCommandByOs().pip;
                                              stepper
                                                .executeTerminalCommands(
                                                  `${pipCmd} install -r webui/requirements.txt`,
                                                  installDir,
                                                )
                                                .then(() => {
                                                  stepper.setInstalled(installDir);
                                                  const now = new Date().toLocaleString();
                                                  stepper.storage.set(AUDIOCPP_INSTALL_TIME_KEY, now);
                                                  stepper.storage.set(AUDIOCPP_INSTALL_DIR_KEY, installDir);
                                                  stepper.storage.set(
                                                    AUDIOCPP_PLATFORM_KEY,
                                                    selectedPlatformOption.key,
                                                  );
                                                  stepper.storage.set(AUDIOCPP_VERSION_KEY, chosenRelease.tag_name);

                                                  stepper.showFinalStep(
                                                    'success',
                                                    'audio.cpp WebUI Ready!',
                                                    `Installed audio.cpp WebUI ${chosenRelease.tag_name} ` +
                                                      `(${selectedPlatformOption.key.toUpperCase()}) ` +
                                                      `successfully to ${installDir}.`,
                                                  );
                                                })
                                                .catch(() => {
                                                  stepper.setInstalled(installDir);
                                                  const now = new Date().toLocaleString();
                                                  stepper.storage.set(AUDIOCPP_INSTALL_TIME_KEY, now);
                                                  stepper.storage.set(AUDIOCPP_INSTALL_DIR_KEY, installDir);
                                                  stepper.storage.set(
                                                    AUDIOCPP_PLATFORM_KEY,
                                                    selectedPlatformOption.key,
                                                  );
                                                  stepper.storage.set(AUDIOCPP_VERSION_KEY, chosenRelease.tag_name);

                                                  const coreKey = selectedPlatformOption.key.toUpperCase();
                                                  const warningMsg =
                                                    `Installed audio.cpp Core ${coreKey} binaries. ` +
                                                    'Dependencies can be installed via the Dependencies menu option.';

                                                  stepper.showFinalStep(
                                                    'warning' as any,
                                                    'audio.cpp WebUI Installed (Native Ready)',
                                                    warningMsg,
                                                  );
                                                });
                                            })
                                            .catch(err => {
                                              stepper.showFinalStep(
                                                'error',
                                                'Installation Failed',
                                                `Failed to deploy Core binaries: ${err?.message || err}`,
                                              );
                                            });
                                        })
                                        .catch(err => {
                                          stepper.showFinalStep(
                                            'error',
                                            'Decompression Failed',
                                            `Failed to decompress Core package: ${err?.message || err}`,
                                          );
                                        });
                                    })
                                    .catch(err => {
                                      stepper.showFinalStep(
                                        'error',
                                        'Download Failed',
                                        `Failed to download Core runtime: ${err?.message || err}`,
                                      );
                                    });
                                })
                                .catch(err => {
                                  stepper.showFinalStep(
                                    'error',
                                    'Deployment Failed',
                                    `Failed to deploy App files: ${err?.message || err}`,
                                  );
                                });
                            })
                            .catch(err => {
                              stepper.showFinalStep(
                                'error',
                                'Decompression Failed',
                                `Failed to decompress App package: ${err?.message || err}`,
                              );
                            });
                        })
                        .catch(err => {
                          stepper.showFinalStep(
                            'error',
                            'Download Failed',
                            `Failed to download App package: ${err?.message || err}`,
                          );
                        });
                    })
                    .catch(err => {
                      stepper.showFinalStep(
                        'error',
                        'Setup Error',
                        `Error collecting portable options: ${err?.message || err}`,
                      );
                    });
                })
                .catch(err => {
                  stepper.showFinalStep('error', 'Fetch Failed', `Failed to fetch releases: ${err?.message || err}`);
                });
            });
          })
          .catch(err => {
            stepper.showFinalStep('error', 'Setup Error', `Error selecting method: ${err?.message || err}`);
          });
      });
    })
    .catch(err => {
      stepper.showFinalStep('error', 'Setup Failed', `Initialization error: ${err?.message || err}`);
    });
}

function startUpdate(stepper: InstallationStepper, dir?: string) {
  if (!dir) return;

  stepper.initialSteps(['Checking Updates', 'Updating audio.cpp WebUI', 'Finish']);

  stepper.utils.validateGitRepository(dir, REPO_URL).then(isGitRepo => {
    if (isGitRepo) {
      stepper.nextStep().then(() => {
        stepper.progressBar(true, 'Pulling latest changes from Git...');
        stepper
          .executeTerminalCommands('git pull', dir)
          .then(() => {
            stepper.setUpdated();
            stepper.storage.set(AUDIOCPP_UPDATE_TIME_KEY, new Date().toLocaleString());
            stepper.showFinalStep(
              'success',
              'audio.cpp WebUI Updated!',
              'Successfully pulled latest changes for audio.cpp-webui.',
            );
          })
          .catch(err => {
            stepper.showFinalStep('error', 'Update Failed', `Failed to pull updates: ${err?.message || err}`);
          });
      });
      return;
    }

    stepper.storage
      .get<'cuda' | 'cpu' | 'git'>(AUDIOCPP_PLATFORM_KEY)
      .then(savedPlatform => {
        const platformKey = savedPlatform === 'cpu' ? 'cpu' : 'cuda';

        stepper.ipc
          .invoke('fetch_audiocpp_releases')
          .then((releases: GitHubRelease[]) => {
            const latestRelease = releases[0];
            if (!latestRelease) {
              stepper.showFinalStep('error', 'Update Failed', 'Failed to retrieve latest release information.');
              return;
            }

            const appAsset = findAppAsset(latestRelease.assets);
            const coreAsset = findCoreAsset(latestRelease.assets, platformKey);

            if (!appAsset || !coreAsset) {
              stepper.showFinalStep('error', 'Update Failed', 'Release packages missing for update.');
              return;
            }

            stepper.nextStep().then(() => {
              stepper.progressBar(true, `Downloading updated App (${latestRelease.tag_name})...`);
              stepper
                .downloadFileFromUrl(appAsset.browser_download_url)
                .then(downloadedAppZip => {
                  stepper.progressBar(true, 'Extracting App updates...');
                  stepper.utils
                    .decompressFile(downloadedAppZip)
                    .then(extractedAppDir => {
                      stepper.ipc
                        .invoke('copy_audiocpp_files', extractedAppDir, dir)
                        .then(() => {
                          stepper.progressBar(true, 'Downloading updated Core binaries...');
                          stepper
                            .downloadFileFromUrl(coreAsset.browser_download_url)
                            .then(downloadedCoreZip => {
                              stepper.progressBar(true, 'Extracting Core binaries...');
                              stepper.utils
                                .decompressFile(downloadedCoreZip)
                                .then(extractedCoreDir => {
                                  stepper.ipc
                                    .invoke('copy_audiocpp_files', extractedCoreDir, dir)
                                    .then(() => {
                                      stepper.setUpdated();
                                      const now = new Date().toLocaleString();
                                      stepper.storage.set(AUDIOCPP_UPDATE_TIME_KEY, now);
                                      stepper.storage.set(AUDIOCPP_VERSION_KEY, latestRelease.tag_name);

                                      stepper.showFinalStep(
                                        'success',
                                        'audio.cpp WebUI Updated!',
                                        `Successfully updated audio.cpp WebUI to version ${latestRelease.tag_name}.`,
                                      );
                                    })
                                    .catch(err => {
                                      stepper.showFinalStep(
                                        'error',
                                        'Update Failed',
                                        `Failed to deploy Core binaries: ${err?.message || err}`,
                                      );
                                    });
                                })
                                .catch(err => {
                                  stepper.showFinalStep(
                                    'error',
                                    'Update Failed',
                                    `Failed to extract Core updates: ${err?.message || err}`,
                                  );
                                });
                            })
                            .catch(err => {
                              stepper.showFinalStep(
                                'error',
                                'Update Failed',
                                `Failed to download Core updates: ${err?.message || err}`,
                              );
                            });
                        })
                        .catch(err => {
                          stepper.showFinalStep(
                            'error',
                            'Update Failed',
                            `Failed to deploy App updates: ${err?.message || err}`,
                          );
                        });
                    })
                    .catch(err => {
                      stepper.showFinalStep(
                        'error',
                        'Update Failed',
                        `Failed to extract App updates: ${err?.message || err}`,
                      );
                    });
                })
                .catch(err => {
                  stepper.showFinalStep(
                    'error',
                    'Update Failed',
                    `Failed to download App updates: ${err?.message || err}`,
                  );
                });
            });
          })
          .catch(err => {
            stepper.showFinalStep('error', 'Update Failed', `Error fetching releases: ${err?.message || err}`);
          });
      })
      .catch(err => {
        stepper.showFinalStep('error', 'Storage Error', `Failed to read platform settings: ${err?.message || err}`);
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
          {label: 'Last Updated', result: 'loading'},
          {label: 'Current Version', result: 'loading'},
          {label: 'Platform / Backend', result: 'loading'},
          {label: 'Latest Release', result: 'loading'},
        ],
      },
      {
        title: 'Disk Usage',
        items: [{label: 'Total Size', result: 'loading'}],
      },
    ],
    callback,
  );

  api.storage
    .get(AUDIOCPP_INSTALL_TIME_KEY)
    .then(result => {
      descManager.updateItem(0, 0, result || 'Not Recorded');
    })
    .catch(() => {
      descManager.updateItem(0, 0, 'Not Recorded');
    });

  api.storage
    .get(AUDIOCPP_UPDATE_TIME_KEY)
    .then(result => {
      descManager.updateItem(0, 1, result || 'Never Updated');
    })
    .catch(() => {
      descManager.updateItem(0, 1, 'Never Updated');
    });

  api.ipc
    .invoke('current_audiocpp_version', dir)
    .then((result: string) => {
      descManager.updateItem(0, 2, result || 'Unknown');
    })
    .catch(() => {
      descManager.updateItem(0, 2, 'Unknown');
    });

  api.storage
    .get(AUDIOCPP_PLATFORM_KEY)
    .then(key => {
      const opt = AUDIOCPP_PLATFORM_OPTIONS.find(o => o.key === key);
      descManager.updateItem(0, 3, opt ? opt.label : key || 'Default');
    })
    .catch(() => {
      descManager.updateItem(0, 3, 'Default');
    });

  api.ipc
    .invoke('fetch_audiocpp_latest_tag')
    .then(result => {
      descManager.updateItem(0, 4, result || 'Unknown');
    })
    .catch(() => {
      descManager.updateItem(0, 4, 'Unknown');
    });

  if (dir) {
    api
      .getFolderSize(dir)
      .then(result => {
        descManager.updateItem(1, 0, formatSize(result));
      })
      .catch(() => {
        descManager.updateItem(1, 0, 'Unknown');
      });
  } else {
    descManager.updateItem(1, 0, undefined);
  }
}

const AudioCppWebui_RM: CardRendererMethods = {
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

export default AudioCppWebui_RM;

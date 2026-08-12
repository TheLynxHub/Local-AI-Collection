import {RendererIpcTypes, UserInputField, UserInputResult} from '../../../../../../src/common/types/plugins/modules';
import {getPythonCommandByOs, isWin} from '../../../../utils/crossUtils';

export const Invoke_Command_CreateVenv: string =
  'uv venv --relocatable --prompt invoke --python 3.12 --python-preference only-managed .venv';
export const Invoke_Command_ActivateVenv: string = isWin ? '.venv\\Scripts\\activate' : 'source .venv/bin/activate';
const pythonCommand = getPythonCommandByOs().python;
export const Invoke_Command_InstallPip: string = `${pythonCommand} -m ensurepip --upgrade`;

export const Invoke_Command_InstallUV = isWin
  ? 'powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"'
  : 'wget -qO- https://astral.sh/uv/install.sh | sh';

// Torch backends by version - see https://invoke-ai.github.io/InvokeAI/installation/manual/
export const getTorchBackendForVersion = (version: string): {cuda: string; rocm: string} => {
  const [major, minor] = version.split('.').map(Number);

  // v6.0 and later
  if (major >= 6) {
    return {cuda: 'cu128', rocm: 'rocm7.1'};
  }
  // v5.12 and later
  if (major === 5 && minor >= 12) {
    return {cuda: 'cu128', rocm: 'rocm6.3'};
  }
  // v5.10 to v5.11
  if (major === 5 && minor >= 10 && minor <= 11) {
    return {cuda: 'cu126', rocm: 'rocm6.2.4'};
  }
  // v5.0 to v5.9.1
  if (major === 5 && minor >= 0 && minor <= 9) {
    return {cuda: 'cu124', rocm: 'rocm6.1'};
  }
  // v4.x
  if (major === 4) {
    return {cuda: 'cu124', rocm: 'rocm5.2'};
  }

  // Default to latest for unknown versions
  return {cuda: 'cu128', rocm: 'rocm7.1'};
};

export const Invoke_PyPI = {
  cuda: 'Windows or Linux with an Nvidia GPU',
  rocm: 'Linux with an AMD GPU',
  cpu: 'No GPU',
};
export const Invoke_PackageSpec = {
  invokeai: 'invokeai: Nvidia 30xx series GPU or newer, or do not have an Nvidia GPU',
  invokeaiXformers: 'invokeai[xformers]:  Nvidia 20xx series GPU or older',
};

export const INVOKEAI_INSTALL_TIME_KEY = 'install-time-invokeai';
export const INVOKEAI_INSTALL_DIR_KEY = 'install-dir-invokeai';
export const INVOKEAI_UPDATE_TIME_KEY = 'update-time-invokeai';
export const INVOKEAI_UPDATE_AVAILABLE_KEY = 'update-version-invokeai';

export const invokeGetInputFields = async (ipc: RendererIpcTypes): Promise<UserInputField[]> => {
  const releases: string[] = await ipc.invoke('invoke_latest_versions');

  return [
    {
      label: 'Installation Directory',
      id: 'install_dir',
      type: 'directory',

      isRequired: true,
    },
    {
      label: 'InvokeAI Version',
      id: 'invoke_version',
      type: 'select',
      selectOptions: releases,

      defaultValue: releases[0],
      isRequired: true,
    },
    {
      label: 'Package Specifier',
      id: 'package_spec',
      type: 'select',
      selectOptions: [Invoke_PackageSpec.invokeai, Invoke_PackageSpec.invokeaiXformers],

      defaultValue: Invoke_PackageSpec.invokeai,
      isRequired: true,
    },
    {
      label: 'Torch Backend',
      id: 'torch_backend',
      type: 'select',
      selectOptions: [Invoke_PyPI.cuda, Invoke_PyPI.rocm, Invoke_PyPI.cpu, 'Others'],

      defaultValue: Invoke_PyPI.cuda,
      isRequired: true,
    },
  ];
};

export const invokeGetInputResults = (items: UserInputResult[]) => {
  let installDirResult: string = '';
  let packageSpecResult: string = '';
  let torchBackendResult: string = '';
  let version: string = '';
  let torchBackendChoice: string = '';

  // First pass: extract all values
  items.forEach(item => {
    if (item.id === 'install_dir') {
      installDirResult = item.result as string;
    } else if (item.id === 'invoke_version') {
      version = item.result as string;
    } else if (item.id === 'package_spec') {
      switch (item.result) {
        case Invoke_PackageSpec.invokeaiXformers:
          packageSpecResult = 'invokeai[xformers]';
          break;
        case Invoke_PackageSpec.invokeai:
        default:
          packageSpecResult = 'invokeai';
      }
    } else if (item.id === 'torch_backend') {
      torchBackendChoice = item.result as string;
    }
  });

  console.log('the invoke version is', version);

  // Second pass: process torch backend after we have the version
  if (torchBackendChoice) {
    const backends = getTorchBackendForVersion(version);

    switch (torchBackendChoice) {
      case Invoke_PyPI.rocm:
        torchBackendResult = backends.rocm;
        break;
      case Invoke_PyPI.cuda:
        torchBackendResult = backends.cuda;
        break;
      case Invoke_PyPI.cpu:
        torchBackendResult = 'cpu';
        break;
      default:
      case 'Others':
        torchBackendResult = '';
        break;
    }
  }

  console.log('the torchBackendResult is', torchBackendResult);

  return {installDirResult, version, packageSpecResult, torchBackendResult};
};

export const invokeGetInstallCommand = (items: UserInputResult[]) => {
  const {version, torchBackendResult, packageSpecResult} = invokeGetInputResults(items);
  const torchBackend = torchBackendResult ? ` --torch-backend=${torchBackendResult}` : '';
  return (
    `uv pip install ${packageSpecResult}==${version} --python 3.12 ` +
    `--python-preference only-managed${torchBackend} --force-reinstall`
  );
};

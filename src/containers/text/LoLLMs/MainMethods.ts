import {CardMainMethodsInitial, MainModuleUtils} from '../../../../../src/common/types/plugins/modules';
import {LoLLMS_ID} from '../../../constants';
import {getPythonCommandByOs} from '../../../utils/crossUtils';
import {isGitTypeInstalled, LINE_ENDING} from '../../../utils/mainUtils';

async function getRunCommands(): Promise<string | string[]> {
  const pythonCommand = getPythonCommandByOs().python;
  return `${pythonCommand} app.py ${LINE_ENDING}`;
}

async function updateAvailable(utils: MainModuleUtils, dir?: string) {
  if (!dir) return false;

  return await utils.isPullAvailable(dir);
}

const LoLLM_MM: CardMainMethodsInitial = utils => {
  const installDir = utils.getInstallDir(LoLLMS_ID);

  return {
    getRunCommands,
    updateAvailable: () => updateAvailable(utils, installDir),
    isInstalled: () => isGitTypeInstalled(installDir, 'https://github.com/ParisNeo/lollms-webui', ['app.py']),
  };
};

export default LoLLM_MM;

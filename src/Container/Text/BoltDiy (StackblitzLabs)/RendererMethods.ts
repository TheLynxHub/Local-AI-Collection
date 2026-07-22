import {
  CardInfoApi,
  CardInfoCallback,
  CardRendererMethods,
  InstallationStepper,
} from '../../../../../src/common/types/plugins/modules';
import {CardInfo} from '../../../Utils/RendererUtils';

const REPO_URL = 'https://github.com/stackblitz-labs/bolt.diy';

const StarterSteps = ['Start', 'Check NodeJS', 'Bolt.Diy', 'Packages', 'Done!'];

function startInstall(stepper: InstallationStepper) {
  const next = () => stepper.nextStep();
  const progress = (message: string) => stepper.progressBar(true, message);

  const checkNode = (): Promise<boolean> => stepper.ipc.invoke('is_boltdiy_nodejs_installed');
  const installPackages = (dir: string) =>
    stepper.ipc.invoke('is_boltdiy_npm_version_above_12').then((isAbove12: boolean) => {
      const flags = isAbove12 ? ' --allow-remote=all --dangerously-allow-all-scripts' : '';
      return stepper.executeTerminalCommands(`npm i${flags}`, dir);
    });
  const installBolt = () => {
    stepper.cloneRepository(REPO_URL).then(dir => {
      next().then(() => {
        installPackages(dir).then(() => {
          stepper.setInstalled(dir);
          stepper.showFinalStep('success', 'Installation Complete!', 'Your Bolt.Diy environment is ready. Enjoy!');
        });
      });
    });
  };

  stepper.initialSteps(StarterSteps);

  stepper.starterStep().then(({targetDirectory, chosen}) => {
    if (chosen === 'install') {
      next().then(() => {
        progress('Checking for NodeJS availability...');
        checkNode().then(isNodeAvailable => {
          if (isNodeAvailable) {
            next().then(() => installBolt());
          } else {
            stepper.showFinalStep('error', 'NodeJS is not installed!', 'Please install NodeJS LTS and try again.');
          }
        });
      });
    } else if (targetDirectory) {
      stepper.utils.validateGitRepository(targetDirectory, REPO_URL).then(isValid => {
        const title = 'Bolt.Diy';
        if (isValid) {
          stepper.setInstalled(targetDirectory);
          stepper.showFinalStep(
            'success',
            `${title} located successfully!`,
            `Pre-installed ${title} detected. Installation skipped as your existing setup is ready to use.`,
          );
        } else {
          stepper.utils.verifyFilesExist(targetDirectory, ['package.json']).then(isExist => {
            if (isExist) {
              stepper.setInstalled(targetDirectory);
              stepper.showFinalStep(
                'success',
                `${title} located successfully!`,
                `Detected a manual installation of ${title}. Note: Because this is not a Git repository,` +
                  ' automatic updates and certain version-dependent features may not work as expected.',
              );
            } else {
              stepper.showFinalStep(
                'error',
                `Unable to locate ${title}!`,
                `Please ensure you have selected the correct folder containing the ${title} repository.`,
              );
            }
          });
        }
      });
    }
  });
}

async function cardInfo(api: CardInfoApi, callback: CardInfoCallback) {
  return CardInfo(REPO_URL, undefined, api, callback);
}

function catchAddress(line: string): string | undefined {
  const addressRegex =
    // eslint-disable-next-line max-len, no-control-regex
    /https?:\/\/(?:localhost|\[?[\da-fA-F:]+]?)(?:\s*\x1b\[[0-9;]*m\s*)*(:?\s*(?:\x1b\[[0-9;]*m\s*)*\d+\s*(?:\x1b\[[0-9;]*m\s*)*)?\/?/;

  const match = line.match(addressRegex);

  if (match) {
    let address = match[0];

    if (address.endsWith('/') && address.length > 8 && address !== 'http://' && address !== 'https://') {
      address = address.slice(0, -1);
    }

    // eslint-disable-next-line no-control-regex
    address = address.replace(/\x1b\[[0-9;]*m/g, '');
    address = address.replace(/\s/g, '');

    return address;
  }

  return undefined;
}

function startUpdate(stepper: InstallationStepper, dir?: string) {
  stepper.initialSteps(['Updating', 'Completed']);
  stepper.executeTerminalCommands('git pull && npm i', dir).then(() => {
    stepper.setUpdated();
    stepper.showFinalStep(
      'success',
      'Bolt.Diy Updated Successfully!',
      `Bolt.Diy has been updated to the latest version. You can now enjoy the new features and improvements.`,
    );
  });
}

const BOLT_DIY_RM: CardRendererMethods = {
  catchAddress,
  cardInfo,
  manager: {startInstall, updater: {updateType: 'stepper', startUpdate}},
};

export default BOLT_DIY_RM;

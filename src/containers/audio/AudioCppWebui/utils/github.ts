import {GitHubRelease, GitHubReleaseAsset} from '../../../../../../src/common/types/plugins/modules';
import {isLinux, isMac, isWin} from '../../../../utils/crossUtils';

export const AUDIOCPP_RELEASES_URL = 'https://api.github.com/repos/kigner/audio.cpp-webui/releases';

export const AUDIOCPP_INSTALL_TIME_KEY = 'install-time-audioCppWebui';
export const AUDIOCPP_INSTALL_DIR_KEY = 'install-dir-audioCppWebui';
export const AUDIOCPP_UPDATE_TIME_KEY = 'update-time-audioCppWebui';
export const AUDIOCPP_PLATFORM_KEY = 'platform-audioCppWebui';
export const AUDIOCPP_VERSION_KEY = 'version-audioCppWebui';

export type AudioCppPlatformOption = {
  label: string;
  key: 'cuda' | 'cpu' | 'git';
};

export const AUDIOCPP_PLATFORM_OPTIONS: AudioCppPlatformOption[] = [
  {label: 'Windows Portable (CUDA GPU - Recommended)', key: 'cuda'},
  {label: 'Windows Portable (CPU)', key: 'cpu'},
  {label: 'Git Clone (Source Repository)', key: 'git'},
];

export function detectDefaultPlatform(): 'cuda' | 'cpu' | 'git' {
  if (isWin) return 'cuda';
  if (isMac || isLinux) return 'git';
  return 'cpu';
}

export async function fetchAudioCppReleases(): Promise<GitHubRelease[]> {
  try {
    const response = await fetch(AUDIOCPP_RELEASES_URL, {
      headers: {
        'User-Agent': 'LynxHub-Desktop',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const releases: GitHubRelease[] = await response.json();
    return releases.filter(
      r => !r.draft && Boolean(r.assets?.some(a => a.name.endsWith('.zip') || a.name.endsWith('.tar.gz'))),
    );
  } catch (error) {
    console.error('Failed to fetch audio.cpp-webui releases from GitHub:', error);
    return [];
  }
}

export async function getLatestAudioCppTag(): Promise<string> {
  const releases = await fetchAudioCppReleases();
  return releases[0]?.tag_name || 'unknown';
}

export function findAppAsset(assets: GitHubReleaseAsset[]): GitHubReleaseAsset | undefined {
  return assets.find(a => a.name.toLowerCase().includes('app') && a.name.endsWith('.zip'));
}

export function findCoreAsset(assets: GitHubReleaseAsset[], backend: 'cuda' | 'cpu'): GitHubReleaseAsset | undefined {
  if (backend === 'cuda') {
    return assets.find(
      a =>
        a.name.toLowerCase().includes('core-cuda') ||
        (a.name.toLowerCase().includes('cuda') && a.name.endsWith('.zip')),
    );
  }
  return assets.find(
    a => a.name.toLowerCase().includes('core-cpu') || (a.name.toLowerCase().includes('cpu') && a.name.endsWith('.zip')),
  );
}

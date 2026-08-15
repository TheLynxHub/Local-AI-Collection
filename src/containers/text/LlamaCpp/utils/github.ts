import {GitHubRelease, GitHubReleaseAsset} from '../../../../../../src/common/types/plugins/modules';
import {isLinux, isMac, isWin} from '../../../../utils/crossUtils';

export const LLAMA_CPP_RELEASES_URL = 'https://api.github.com/repos/ggml-org/llama.cpp/releases';

export const LLAMA_CPP_INSTALL_TIME_KEY = 'install-time-llamaCpp';
export const LLAMA_CPP_INSTALL_DIR_KEY = 'install-dir-llamaCpp';
export const LLAMA_CPP_UPDATE_TIME_KEY = 'update-time-llamaCpp';
export const LLAMA_CPP_PLATFORM_KEY = 'platform-llamaCpp';

export type LlamaPlatformOption = {
  label: string;
  key: string;
  pattern: RegExp;
};

export const LLAMA_PLATFORM_OPTIONS: LlamaPlatformOption[] = [
  // Windows
  {label: 'Windows x64 (CUDA 12)', key: 'win-cuda12-x64', pattern: /bin-win-cuda-12.*-x64\.zip$/i},
  {label: 'Windows x64 (CUDA 13)', key: 'win-cuda13-x64', pattern: /bin-win-cuda-13.*-x64\.zip$/i},
  {label: 'Windows arm64 (CUDA 13) (preview)', key: 'win-cuda13-arm64', pattern: /bin-win-cuda-13.*-arm64\.zip$/i},
  {label: 'Windows x64 (CPU)', key: 'win-cpu-x64', pattern: /bin-win-cpu-x64\.zip$/i},
  {label: 'Windows arm64 (CPU)', key: 'win-cpu-arm64', pattern: /bin-win-cpu-arm64\.zip$/i},
  {
    label: 'Windows arm64 (OpenCL Adreno)',
    key: 'win-opencl-adreno-arm64',
    pattern: /bin-win-opencl-adreno-arm64\.zip$/i,
  },
  {label: 'Windows x64 (Vulkan)', key: 'win-vulkan-x64', pattern: /bin-win-vulkan-x64\.zip$/i},
  {label: 'Windows x64 (OpenVINO)', key: 'win-openvino-x64', pattern: /bin-win-openvino.*-x64\.zip$/i},
  {label: 'Windows x64 (SYCL)', key: 'win-sycl-x64', pattern: /bin-win-sycl-x64\.zip$/i},
  {label: 'Windows x64 (ROCm 7.14)', key: 'win-rocm-x64', pattern: /bin-win-rocm.*-x64\.zip$/i},

  // macOS / iOS
  {label: 'macOS Apple Silicon (arm64)', key: 'macos-arm64', pattern: /bin-macos-arm64\.tar\.gz$/i},
  {label: 'macOS Intel (x64)', key: 'macos-x64', pattern: /bin-macos-x64\.tar\.gz$/i},
  {label: 'iOS XCFramework', key: 'ios-xcframework', pattern: /xcframework\.zip$/i},

  // Linux
  {label: 'Ubuntu x64 (CPU)', key: 'ubuntu-cpu-x64', pattern: /bin-ubuntu-x64\.tar\.gz$/i},
  {label: 'Ubuntu arm64 (CPU)', key: 'ubuntu-cpu-arm64', pattern: /bin-ubuntu-arm64\.tar\.gz$/i},
  {label: 'Ubuntu s390x (CPU)', key: 'ubuntu-cpu-s390x', pattern: /bin-ubuntu-s390x\.tar\.gz$/i},
  {label: 'Ubuntu x64 (Vulkan)', key: 'ubuntu-vulkan-x64', pattern: /bin-ubuntu-vulkan-x64\.tar\.gz$/i},
  {label: 'Ubuntu arm64 (Vulkan)', key: 'ubuntu-vulkan-arm64', pattern: /bin-ubuntu-vulkan-arm64\.tar\.gz$/i},
  {label: 'Ubuntu x64 (ROCm 7.14)', key: 'ubuntu-rocm-x64', pattern: /bin-ubuntu-rocm.*-x64\.tar\.gz$/i},
  {label: 'Ubuntu x64 (OpenVINO)', key: 'ubuntu-openvino-x64', pattern: /bin-ubuntu-openvino.*-x64\.tar\.gz$/i},
  {label: 'Ubuntu x64 (SYCL FP32)', key: 'ubuntu-sycl-fp32-x64', pattern: /bin-ubuntu-sycl-fp32-x64\.tar\.gz$/i},
  {label: 'Ubuntu x64 (SYCL FP16)', key: 'ubuntu-sycl-fp16-x64', pattern: /bin-ubuntu-sycl-fp16-x64\.tar\.gz$/i},

  // Android
  {label: 'Android arm64 (CPU)', key: 'android-arm64', pattern: /bin-android-arm64\.tar\.gz$/i},
];

export function detectDefaultPlatformKey(): string {
  if (isWin) {
    return 'win-cuda12-x64';
  }
  if (isMac) {
    return 'macos-arm64';
  }
  if (isLinux) {
    return 'ubuntu-cpu-x64';
  }
  return 'win-cpu-x64';
}

export async function fetchLlamaCppReleases(): Promise<GitHubRelease[]> {
  try {
    const response = await fetch(LLAMA_CPP_RELEASES_URL, {
      headers: {
        'User-Agent': 'LynxHub-Desktop',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const releases: GitHubRelease[] = await response.json();
    return releases.filter(r => !r.prerelease);
  } catch (error) {
    console.error('Failed to fetch llama.cpp releases from GitHub:', error);
    return [];
  }
}

export function findAssetUrlForPlatform(assets: GitHubReleaseAsset[], platformKey: string): string | undefined {
  const option = LLAMA_PLATFORM_OPTIONS.find(opt => opt.key === platformKey);
  if (!option) {
    const defaultAsset = assets.find(a => a.name.endsWith('.zip') || a.name.endsWith('.tar.gz'));
    return defaultAsset?.browser_download_url;
  }

  const matchedAsset = assets.find(a => option.pattern.test(a.name));
  if (matchedAsset) {
    return matchedAsset.browser_download_url;
  }

  // Fallback match based on keywords
  const fallbackAsset = assets.find(a => {
    if (platformKey.startsWith('win-') && a.name.includes('win')) return true;
    if (platformKey.startsWith('ubuntu-') && a.name.includes('ubuntu')) return true;
    if (platformKey.startsWith('macos-') && a.name.includes('macos')) return true;
    return false;
  });

  return fallbackAsset?.browser_download_url || assets[0]?.browser_download_url;
}

export async function getLatestLlamaCppTag(): Promise<string> {
  const releases = await fetchLlamaCppReleases();
  return releases[0]?.tag_name || 'unknown';
}

import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const smartGalleryArguments: ArgumentsData = [
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'Paths',
        items: [
          {
            name: 'BASE_OUTPUT_PATH',
            type: 'Directory',
            description: 'Path to ComfyUI output folder (e.g., C:/ComfyUI/output)',
          },
          {
            name: 'BASE_INPUT_PATH',
            type: 'Directory',
            description: 'Path to ComfyUI input folder (e.g., C:/ComfyUI/input)',
          },
          {
            name: 'BASE_SMARTGALLERY_PATH',
            type: 'Directory',
            description: 'Path to SmartGallery data folder (defaults to output path if not set)',
          },
          {
            name: 'BASE_MODELS_PATH',
            type: 'Directory',
            description: 'Path to ComfyUI models folder (for Docker, Stability Matrix, or custom setups)',
          },
          {
            name: 'LORAS_PATH',
            type: 'Directory',
            description: 'Path to LoRAs folder (defaults to BASE_MODELS_PATH/loras)',
          },
          {
            name: 'CHECKPOINTS_PATH',
            type: 'Directory',
            description: 'Path to Checkpoints folder (defaults to BASE_MODELS_PATH/checkpoints)',
          },
          {
            name: 'UNET_PATH',
            type: 'Directory',
            description: 'Path to UNet folder (defaults to BASE_MODELS_PATH/unet)',
          },
          {
            name: 'DELETE_TO',
            type: 'Directory',
            description: 'Optional trash directory. Deleted files will be moved here instead of permanent deletion.',
          },
        ],
      },
      {
        section: 'Performance & Media',
        items: [
          {
            name: 'FFPROBE_MANUAL_PATH',
            type: 'File',
            description:
              'Path to ffprobe executable (e.g., C:/ffmpeg/bin/ffprobe.exe). ' +
              'Required for extracting workflows from video files.',
          },
          {
            name: 'SERVER_PORT',
            type: 'Input',
            description: 'Port for SmartGallery server',
            defaultValue: '8189',
          },
          {
            name: 'THUMBNAIL_WIDTH',
            type: 'Input',
            description: 'Width (in pixels) of generated thumbnails (default: 300)',
            defaultValue: '300',
          },
          {
            name: 'WEBP_ANIMATED_FPS',
            type: 'Input',
            description: 'Assumed frame rate for animated WebP files (default: 16.0)',
            defaultValue: '16.0',
          },
          {
            name: 'PAGE_SIZE',
            type: 'Input',
            description: 'Max number of files to load per page in gallery grid (default: 100)',
            defaultValue: '100',
          },
          {
            name: 'BATCH_SIZE',
            type: 'Input',
            description: 'Number of files to process per database sync batch (default: 500)',
            defaultValue: '500',
          },
          {
            name: 'STREAM_THRESHOLD_MB',
            type: 'Input',
            description: 'File size threshold in MB above which videos are transcoded/streamed (default: 20)',
            defaultValue: '20',
          },
          {
            name: 'MAX_PARALLEL_WORKERS',
            type: 'Input',
            description: 'Max CPU worker threads for indexing/thumbnails (leave empty to use all CPU cores)',
          },
          {
            name: 'GENERATE_WAVEFORMS',
            type: 'CheckBox',
            description: 'Automatically generate dynamic audio waveforms for audio files during indexing',
          },
        ],
      },
      {
        section: 'Security & Integration',
        items: [
          {
            name: 'ADMIN_PASSWORD',
            type: 'Input',
            description: 'Admin password for securing gallery interface or Exhibition portal',
          },
          {
            name: 'SECRET_KEY',
            type: 'Input',
            description: 'Flask secret key for session security (generated randomly if unset)',
          },
          {
            name: 'COMFYUI_SERVER_URL',
            type: 'Input',
            description: 'ComfyUI server URL for queuing generations directly from Nodepad',
            defaultValue: 'http://127.0.0.1:8188',
          },
          {
            name: 'ENABLE_AI_SEARCH',
            type: 'CheckBox',
            description: 'Enable experimental AI Search features (requires separate AI service)',
          },
        ],
      },
    ],
  },
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Server & Authentication',
        items: [
          {
            name: '--exhibition',
            type: 'CheckBox',
            description: 'Start in Exhibition Mode (client-facing review portal with hidden workflows)',
          },
          {
            name: '--force-login',
            type: 'CheckBox',
            description: 'Force login requirement on the main gallery workspace interface',
          },
          {
            name: '--enable-guest-login',
            type: 'CheckBox',
            description: 'Allow anonymous guest access in Exhibition mode',
          },
          {
            name: '--blind-rating',
            type: 'CheckBox',
            description: 'Hide global average ratings in Exhibition mode to prevent reviewer bias',
          },
          {
            name: '--admin-pass',
            type: 'Input',
            description: 'Set or reset the Admin password directly via command-line option',
          },
          {
            name: '--port',
            type: 'Input',
            description: 'Override server port via command-line option (e.g. 8189)',
          },
        ],
      },
    ],
  },
];

export default smartGalleryArguments;

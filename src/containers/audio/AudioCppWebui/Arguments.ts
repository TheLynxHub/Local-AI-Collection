import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const audioCppArguments: ArgumentsData = [
  {
    category: 'Launch Mode',
    sections: [
      {
        section: 'Execution Target',
        items: [
          {
            name: 'AUDIOCPP_LAUNCH_MODE',
            description:
              'Choose launch mode: Python/Gradio WebUI (full task UI), Native WebUI (C++ upstream UI), or API Server.',
            type: 'DropDown',
            defaultValue: 'webui',
            values: ['webui', 'native_webui', 'server'],
          },
        ],
      },
    ],
  },
  {
    category: 'Server & Network Settings',
    sections: [
      {
        section: 'Host and Port',
        items: [
          {
            name: 'AUDIOCPP_HOST',
            description: 'Hostname or IP address to bind server / WebUI to. Default: 127.0.0.1.',
            type: 'Input',
            defaultValue: '127.0.0.1',
          },
          {
            name: 'AUDIOCPP_NATIVE_PORT',
            description: 'Port for the native WebUI server. Default: 8080.',
            type: 'Number',
            defaultValue: 8080,
            numberMin: 1,
            numberMax: 65535,
          },
          {
            name: 'AUDIOCPP_PORT',
            description: 'Port for API server mode. Default: 8088.',
            type: 'Number',
            defaultValue: 8088,
            numberMin: 1,
            numberMax: 65535,
          },
          {
            name: 'AUDIOCPP_NO_BROWSER',
            description: 'Do not automatically launch system default browser (LynxHub opens inside app tabs).',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
    ],
  },
  {
    category: 'Hardware & Inference Settings',
    sections: [
      {
        section: 'Compute Acceleration',
        items: [
          {
            name: 'AUDIOCPP_BACKEND',
            description: 'Inference backend. Auto chooses GPU if NVIDIA driver/build available, else CPU.',
            type: 'DropDown',
            defaultValue: 'auto',
            values: ['auto', 'gpu', 'cpu'],
          },
          {
            name: 'AUDIOCPP_DEVICE',
            description: 'CUDA GPU device index (default: 0).',
            type: 'Number',
            defaultValue: 0,
            numberMin: 0,
          },
          {
            name: 'AUDIOCPP_THREADS',
            description: 'Number of compute threads for ggml audio inference backend.',
            type: 'Number',
            numberMin: 1,
          },
          {
            name: 'AUDIOCPP_LOAD_TIMEOUT',
            description: 'Seconds to wait for a model to finish loading before timeout (default: 300).',
            type: 'Number',
            defaultValue: 300,
            numberMin: 10,
          },
        ],
      },
    ],
  },
  {
    category: 'Server Mode Options',
    sections: [
      {
        section: 'Model & Voice Configuration',
        items: [
          {
            name: 'AUDIOCPP_MODEL_ID',
            description:
              'Model ID from models_catalog.json to serve in server mode (e.g., qwen3-tts, qwen3-asr, vibevoice, supertonic).',
            type: 'Input',
            defaultValue: 'qwen3-tts',
          },
          {
            name: 'AUDIOCPP_MODE',
            description: 'Model inference mode in server (offline or streaming).',
            type: 'DropDown',
            defaultValue: 'offline',
            values: ['offline', 'streaming'],
          },
          {
            name: 'AUDIOCPP_VOICE_REF',
            description: 'Path to reference voice WAV file for baked-in default voice cloning.',
            type: 'File',
          },
          {
            name: 'AUDIOCPP_REF_TEXT',
            description: 'Transcript text of the reference audio (required for some models like Qwen3-TTS).',
            type: 'Input',
          },
        ],
      },
    ],
  },
];

export default audioCppArguments;

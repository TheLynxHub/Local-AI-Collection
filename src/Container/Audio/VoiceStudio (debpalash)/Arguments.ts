import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const voiceStudioArguments: ArgumentsData = [
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'General & Server',
        items: [
          {
            name: 'PORT',
            description: 'Server listening port (default: 3900)',
            type: 'Input',
            defaultValue: '3900',
          },
          {
            name: 'OMNIVOICE_DATA_DIR',
            description: 'Custom path for models, voices, and projects storage',
            type: 'Directory',
          },
          {
            name: 'OMNIVOICE_SERVER_MODE',
            description: 'Run server in headless/server mode (disables local origin restriction)',
            type: 'CheckBox',
          },
          {
            name: 'OMNIVOICE_PUBLIC_API_BASE',
            description: 'Public API base URL when behind a reverse proxy',
            type: 'Input',
          },
          {
            name: 'OMNIVOICE_TRUSTED_NETWORKS',
            description: 'Comma-separated trusted network CIDRs for remote access',
            type: 'Input',
          },
          {
            name: 'OMNIVOICE_LOG_LEVEL',
            description: 'Log verbosity level (INFO, DEBUG, WARNING, ERROR)',
            type: 'DropDown',
            defaultValue: 'INFO',
            values: ['INFO', 'DEBUG', 'WARNING', 'ERROR'],
          },
        ],
      },
      {
        section: 'Hardware & Compute',
        items: [
          {
            name: 'TORCH_COMPILE_DISABLE',
            description: 'Disable torch.compile / Triton compilation (fixes Windows OOM issues)',
            type: 'CheckBox',
          },
          {
            name: 'OMNIVOICE_TORCH_VARIANT',
            description: 'PyTorch variant selection (cuda, rocm, cpu)',
            type: 'DropDown',
            defaultValue: 'cuda',
            values: ['cuda', 'rocm', 'cpu'],
          },
          {
            name: 'ASR_COMPUTE_TYPE',
            description: 'Precision for ASR engines (WhisperX, Faster-Whisper)',
            type: 'DropDown',
            defaultValue: 'float16',
            values: ['float16', 'int8', 'float32'],
          },
          {
            name: 'HSA_OVERRIDE_GFX_VERSION',
            description: 'AMD GPU architecture override for ROCm (e.g. 11.0.0 for consumer RDNA3 cards)',
            type: 'Input',
          },
        ],
      },
      {
        section: 'HuggingFace & Downloads',
        items: [
          {
            name: 'HF_TOKEN',
            description: 'HuggingFace user access token for diarization & heavy models',
            type: 'Input',
          },
          {
            name: 'OMNIVOICE_CACHE_DIR',
            description: 'Directory path to route all HF and PyTorch model weight caches',
            type: 'Directory',
          },
          {
            name: 'UV_HTTP_TIMEOUT',
            description: 'HTTP timeout in seconds for uv package downloads (default: 120)',
            type: 'Input',
            defaultValue: '120',
          },
        ],
      },
    ],
  },
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Backend Flags',
        items: [
          {
            name: '--host',
            description: 'Host interface to bind (e.g. 127.0.0.1 or 0.0.0.0)',
            type: 'Input',
            defaultValue: '127.0.0.1',
          },
          {
            name: '--port',
            description: 'Port number to listen on',
            type: 'Input',
            defaultValue: '3900',
          },
          {
            name: '--diagnose',
            description: 'Run self-check diagnostics on startup',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
];

export default voiceStudioArguments;

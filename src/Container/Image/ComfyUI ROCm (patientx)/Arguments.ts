import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const comfyRocmArguments: ArgumentsData = [
  {
    category: 'Environment Variables',
    items: [
      {
        name: 'MIOPEN_FIND_MODE',
        description: 'MIOpen find mode for AMD GPUs.',
        type: 'Input',
        defaultValue: '2',
      },
      {
        name: 'MIOPEN_LOG_LEVEL',
        description: 'MIOpen log level for AMD GPUs.',
        type: 'Input',
        defaultValue: '0',
      },
      {
        name: 'PYTHON',
        description: 'Sets a custom path for Python executable.',
        type: 'File',
        defaultValue: '"%~dp0/python_env/python.exe"',
      },
      {
        name: 'GIT',
        description: 'Sets a custom path for Git executable. Leave empty to use system Git.',
        type: 'File',
        defaultValue: '',
      },
      {
        name: 'VENV_DIR',
        description: 'Specifies the path for the virtual environment/python directory.',
        type: 'Directory',
        defaultValue: './python_env',
      },
      {
        name: 'TRITON_OVERRIDE_ARCH',
        description:
          'Override GPU architecture for Triton (e.g., gfx1030, gfx1100). Find yours at https://llvm.org/docs/AMDGPUUsage.html#processors',
        type: 'Input',
        defaultValue: '',
      },
      {
        name: 'COMFYUI_ENABLE_MIOPEN',
        description: 'Enable MIOpen in ComfyUI.',
        type: 'Input',
        defaultValue: '0',
      },
      {
        name: 'FLASH_ATTENTION_TRITON_AMD_ENABLE',
        description: 'Enable Flash Attention Triton AMD backend.',
        type: 'Input',
        defaultValue: 'TRUE',
      },
      {
        name: 'PYTORCH_TUNABLEOP_ENABLED',
        description: 'Enable PyTorch TunableOp optimization.',
        type: 'Input',
        defaultValue: '1',
      },
      {
        name: 'PYTORCH_TUNABLEOP_VERBOSE',
        description: 'Enable verbose logging for PyTorch TunableOp.',
        type: 'Input',
        defaultValue: '1',
      },
      {
        name: 'PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED',
        description: 'Enable hipBLASLt in PyTorch TunableOp.',
        type: 'Input',
        defaultValue: '0',
      },
    ],
  },
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Network',
        items: [
          {
            name: '--listen',
            description:
              'Specify the IP address to listen on (default: 127.0.0.1). You can give a list of ip addresses by separating them with a comma like: 127.2.2.2,127.3.3.3 If --listen is provided without an argument, it defaults to 0.0.0.0,:: (listens on all ipv4 and ipv6)',
            type: 'Input',
            defaultValue: '127.0.0.1',
          },
          {
            name: '--port',
            description: 'Set the listen port.',
            type: 'Input',
            defaultValue: 8188,
          },
          {
            name: '--tls-keyfile',
            description:
              'Path to TLS (SSL) key file. Enables TLS, makes app accessible at https://... requires --tls-certfile to function',
            type: 'File',
          },
          {
            name: '--tls-certfile',
            description:
              'Path to TLS (SSL) certificate file. Enables TLS, makes app accessible at https://... requires --tls-keyfile to function',
            type: 'File',
          },
          {
            name: '--enable-cors-header',
            description:
              "Enable CORS (Cross-Origin Resource Sharing) with optional origin or allow all with default '*'.",
            type: 'Input',
          },
          {
            name: '--max-upload-size',
            description: 'Set the maximum upload size in MB.',
            type: 'Input',
            defaultValue: 100,
          },
          {
            name: '--supports-fp8-compute',
            description: 'ComfyUI will act like if the device supports fp8 compute.',
            type: 'CheckBox',
          },
          {
            name: '--disable-api-nodes',
            description:
              'Disable loading all api nodes. Also prevents the frontend from communicating with the internet.',
            type: 'CheckBox',
          },
          {
            name: '--enable-compress-response-body',
            description: 'Enable compressing response body.',
            type: 'CheckBox',
          },
          {
            name: '--comfy-api-base',
            description: 'Set the base URL for the ComfyUI API. (default: https://api.comfy.org)',
            type: 'Input',
            defaultValue: 'https://api.comfy.org',
          },
        ],
      },
      {
        section: 'Paths',
        items: [
          {
            name: '--base-directory',
            description:
              'Set the ComfyUI base directory for models, custom_nodes, input, output, temp, and user directories.',
            type: 'Directory',
          },
          {
            name: '--extra-model-paths-config',
            description: 'Load one or more extra_model_paths.yaml files.',
            type: 'File',
          },
          {
            name: '--output-directory',
            description: 'Set the ComfyUI output directory. Overrides --base-directory.',
            type: 'Directory',
          },
          {
            name: '--temp-directory',
            description:
              'Set the ComfyUI temp directory (default is in the ComfyUI directory). Overrides --base-directory.',
            type: 'Directory',
          },
          {
            name: '--input-directory',
            description: 'Set the ComfyUI input directory. Overrides --base-directory.',
            type: 'Directory',
          },
          {
            name: '--user-directory',
            description: 'Set the ComfyUI user directory with an absolute path. Overrides --base-directory.',
            type: 'Directory',
          },
          {
            name: '--models-directory',
            description: 'Set the ComfyUI models directory. Overrides the models folder in --base-directory.',
            type: 'Directory',
          },
          {
            name: '--front-end-root',
            description:
              'The local filesystem path to the directory where the frontend is located. Overrides --front-end-version.',
            type: 'Directory',
          },
        ],
      },
      {
        section: 'Execution',
        items: [
          {
            name: '--auto-launch',
            description: 'Automatically launch ComfyUI in the default browser.',
            type: 'CheckBox',
          },
          {
            name: '--disable-auto-launch',
            description: 'Disable auto launching the browser.',
            type: 'CheckBox',
          },
          {
            name: '--cuda-device',
            description:
              "Set the ids of cuda devices this instance will use, as a comma-separated list (e.g. '0' or '0,1'). All other devices will not be visible.",
            type: 'Input',
          },
          {
            name: '--default-device',
            description: 'Set the id of the default device, all other devices will stay visible.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Precision',
        items: [
          {
            name: '--force-fp32',
            description: 'Force fp32 (If this makes your GPU work better please report it).',
            type: 'CheckBox',
          },
          {
            name: '--force-fp16',
            description: 'Force fp16.',
            type: 'CheckBox',
          },
          {
            name: '--fp32-unet',
            description: 'Run the diffusion model in fp32.',
            type: 'CheckBox',
          },
          {
            name: '--fp64-unet',
            description: 'Run the diffusion model in fp64.',
            type: 'CheckBox',
          },
          {
            name: '--bf16-unet',
            description: 'Run the diffusion model in bf16.',
            type: 'CheckBox',
          },
          {
            name: '--fp16-unet',
            description: 'Run the diffusion model in fp16',
            type: 'CheckBox',
          },
          {
            name: '--fp8_e4m3fn-unet',
            description: 'Store unet weights in fp8_e4m3fn.',
            type: 'CheckBox',
          },
          {
            name: '--fp8_e5m2-unet',
            description: 'Store unet weights in fp8_e5m2.',
            type: 'CheckBox',
          },
          {
            name: '--fp16-vae',
            description: 'Run the VAE in fp16, might cause black images.',
            type: 'CheckBox',
          },
          {
            name: '--fp32-vae',
            description: 'Run the VAE in full precision fp32.',
            type: 'CheckBox',
          },
          {
            name: '--bf16-vae',
            description: 'Run the VAE in bf16.',
            type: 'CheckBox',
          },
          {
            name: '--cpu-vae',
            description: 'Run the VAE on the CPU.',
            type: 'CheckBox',
          },
          {
            name: '--fp8_e4m3fn-text-enc',
            description: 'Store text encoder weights in fp8 (e4m3fn variant).',
            type: 'CheckBox',
          },
          {
            name: '--fp8_e5m2-text-enc',
            description: 'Store text encoder weights in fp8 (e5m2 variant).',
            type: 'CheckBox',
          },
          {
            name: '--fp16-text-enc',
            description: 'Store text encoder weights in fp16.',
            type: 'CheckBox',
          },
          {
            name: '--fp32-text-enc',
            description: 'Store text encoder weights in fp32.',
            type: 'CheckBox',
          },
          {
            name: '--bf16-text-enc',
            description: 'Store text encoder weights in bf16.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Optimizations',
        items: [
          {
            name: '--enable-triton-backend',
            description:
              'ComfyUI will enable the use of Triton backend in comfy-kitchen. Is disabled at launch by default.',
            type: 'CheckBox',
          },
          {
            name: '--disable-triton-backend',
            description:
              'Force-disable the comfy-kitchen Triton backend, overriding the automatic ROCm/AMD default and --enable-triton-backend.',
            type: 'CheckBox',
          },
          {
            name: '--preview-method',
            description: 'Default preview method for sampler nodes.',
            type: 'DropDown',
            values: ['none', 'auto', 'latent2rgb', 'taesd'],
            defaultValue: 'auto',
          },
          {
            name: '--preview-size',
            description: 'Sets the maximum preview size for sampler nodes.',
            type: 'Input',
            defaultValue: 512,
          },
          {
            name: '--cache-classic',
            description: 'Use the old style (aggressive) caching.',
            type: 'CheckBox',
          },
          {
            name: '--cache-lru',
            description: 'Use LRU caching with a maximum of N node results cached. May use more RAM/VRAM.',
            type: 'Input',
            defaultValue: 0,
          },
          {
            name: '--cache-none',
            description: 'Reduced RAM/VRAM usage at the expense of executing every node for each run.',
            type: 'CheckBox',
          },
          {
            name: '--use-quad-cross-attention',
            description: 'Use the sub-quadratic cross attention optimization.',
            type: 'CheckBox',
          },
          {
            name: '--use-pytorch-cross-attention',
            description: 'Use the new pytorch 2.0 cross attention function.',
            type: 'CheckBox',
          },
          {
            name: '--use-sage-attention',
            description: 'Use sage attention.',
            type: 'CheckBox',
          },
          {
            name: '--use-flash-attention',
            description: 'Use FlashAttention.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Memory Management',
        items: [
          {
            name: '--gpu-only',
            description: 'Store and run everything (text encoders/CLIP models, etc... on the GPU).',
            type: 'CheckBox',
          },
          {
            name: '--highvram',
            description:
              'By default models will be unloaded to CPU memory after being used. This option keeps them in GPU memory.',
            type: 'CheckBox',
          },
          {
            name: '--lowvram',
            description:
              "Doesn't do anything if dynamic vram is enabled. If dynamic vram isn't being used this option makes the text encoders run on the CPU.",
            type: 'CheckBox',
          },
          {
            name: '--novram',
            description: "When lowvram isn't enough.",
            type: 'CheckBox',
          },
          {
            name: '--cpu',
            description: 'To use the CPU for everything (slow).',
            type: 'CheckBox',
          },
          {
            name: '--disable-smart-memory',
            description:
              'Force ComfyUI to agressively offload to regular ram instead of keeping models in vram when it can.',
            type: 'CheckBox',
          },
          {
            name: '--disable-pinned-memory',
            description: 'Disable pinned memory use.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Miscellaneous',
        items: [
          {
            name: '--enable-manager',
            description: 'Enable the ComfyUI-Manager feature.',
            type: 'CheckBox',
          },
          {
            name: '--disable-manager-ui',
            description:
              'Disables only the ComfyUI-Manager UI and endpoints. Scheduled installations and similar background tasks will still operate.',
            type: 'CheckBox',
          },
          {
            name: '--enable-manager-legacy-ui',
            description: 'Enables the legacy UI of ComfyUI-Manager. Implies --enable-manager.',
            type: 'CheckBox',
          },
          {
            name: '--verbose',
            description: 'Set the logging level',
            type: 'DropDown',
            defaultValue: 'INFO',
            values: ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'],
          },
        ],
      },
    ],
  },
];

export default comfyRocmArguments;

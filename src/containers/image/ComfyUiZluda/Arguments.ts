import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const comfyuizludaArguments: ArgumentsData = [
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
        defaultValue: '3',
      },
      {
        name: 'PYTHON',
        description: 'Sets a custom path for Python executable.',
        type: 'File',
        defaultValue: '"%~dp0/venv/Scripts/python.exe"',
      },
      {
        name: 'GIT',
        description: 'Sets a custom path for Git executable. Leave empty to use system Git.',
        type: 'File',
        defaultValue: '',
      },
      {
        name: 'VENV_DIR',
        description:
          'Specifies the path for the virtual environment. Default is venv. Special value - runs the script without creating virtual environment.',
        type: 'Directory',
        defaultValue: './venv',
      },
      {
        name: 'TRITON_OVERRIDE_ARCH',
        description:
          'Override GPU architecture for Triton (e.g., gfx1030, gfx1031). Find yours at https://llvm.org/docs/AMDGPUUsage.html#processors',
        type: 'Input',
        defaultValue: '',
      },
      {
        name: 'ZLUDA_COMGR_LOG_LEVEL',
        description: 'Zluda log level',
        type: 'Input',
        defaultValue: '1',
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
            name: '--oneapi-device-selector',
            description: 'Sets the oneAPI device(s) this instance will use.',
            type: 'Input',
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
          {
            name: '--cuda-malloc',
            description: 'Enable cudaMallocAsync (enabled by default for torch 2.0 and up).',
            type: 'CheckBox',
          },
          {
            name: '--disable-cuda-malloc',
            description: 'Disable cudaMallocAsync.',
            type: 'CheckBox',
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
            name: '--fp8_e8m0fnu-unet',
            description: 'Store unet weights in fp8_e8m0fnu.',
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
          {
            name: '--fp16-intermediates',
            description: 'Experimental: Use fp16 for intermediate tensors between nodes instead of fp32.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Optimizations',
        items: [
          {
            name: '--force-channels-last',
            description: 'Force channels last format when inferencing the models.',
            type: 'CheckBox',
          },
          {
            name: '--directml',
            description: 'Use torch-directml.',
            type: 'Input',
          },
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
            name: '--cache-ram',
            description:
              'Use RAM pressure caching with the specified headroom thresholds. This is the default caching mode. The first value sets the active-cache threshold; the optional second value sets the inactive-cache/pin threshold. Defaults when no values are provided: active 10% of system RAM (min 2GB, max 10GB), inactive 100% of system RAM (max 96GB).',
            type: 'Input',
            defaultValue: 0,
          },
          {
            name: '--use-split-cross-attention',
            description: 'Use the split cross attention optimization. Ignored when xformers is used.',
            type: 'CheckBox',
          },
          {
            name: '--use-quad-cross-attention',
            description: 'Use the sub-quadratic cross attention optimization . Ignored when xformers is used.',
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
          {
            name: '--disable-xformers',
            description: 'Disable xformers.',
            type: 'CheckBox',
          },
          {
            name: '--force-upcast-attention',
            description: 'Force enable attention upcasting, please report if it fixes black images.',
            type: 'CheckBox',
          },
          {
            name: '--dont-upcast-attention',
            description: 'Disable all upcasting of attention. Should be unnecessary except for debugging.',
            type: 'CheckBox',
          },
          {
            name: '--force-non-blocking',
            description:
              'Force ComfyUI to use non-blocking operations for all applicable tensors. This may improve performance on some non-Nvidia systems but can cause issues with some workflows.',
            type: 'CheckBox',
          },
          {
            name: '--fast',
            description:
              'Enable some untested and potentially quality deteriorating optimizations. This is used to test new features so using it might crash your comfyui. --fast with no arguments enables everything. You can pass a list specific optimizations if you only want to enable specific ones. Current valid optimizations: {}',
            type: 'DropDown',
            values: ['', 'fp16_accumulation', 'fp8_matrix_mult', 'cublas_ops', 'autotune'],
            defaultValue: '',
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
            name: '--enable-dynamic-vram',
            description: "Enable dynamic VRAM on systems where it's not enabled by default.",
            type: 'CheckBox',
          },
          {
            name: '--disable-dynamic-vram',
            description: 'Disable dynamic VRAM and use estimate based model loading.',
            type: 'CheckBox',
          },
          {
            name: '--vram-headroom',
            description:
              'Set the amount of vram in GB for DynamicVRAM to maintain as extra headroom above default. ComfyUI will try and keep this much VRAM completely free and unused, even counting VRAM from other apps.',
            type: 'Input',
            defaultValue: 0,
          },
          {
            name: '--fast-disk',
            description:
              'Prefer disk-backed dynamic loading and offload over unpinned RAM. Can be faster for users with fast NVME disks.',
            type: 'CheckBox',
          },
          {
            name: '--high-ram',
            description:
              'Can improve performance slightly on high RAM or on systems where pagefile use is preferred over model loading.',
            type: 'CheckBox',
          },
          {
            name: '--reserve-vram',
            description:
              'Set the amount of vram in GB you want to reserve for use by your OS/other software. By default some amount is reserved depending on your OS.',
            type: 'Input',
          },
          {
            name: '--async-offload',
            description:
              'Use async weight offloading. An optional argument controls the amount of offload streams. Default is 2. Enabled by default on Nvidia.',
            type: 'Input',
          },
          {
            name: '--disable-async-offload',
            description: 'Disable async weight offloading.',
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
          {
            name: '--database-url',
            description: "Specify the database URL, e.g. for an in-memory database you can use 'sqlite:///:memory:'.",
            type: 'Input',
            defaultValue: '',
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
            name: '--enable-assets',
            description: 'Enable the assets system (API routes, database synchronization, and background scanning).',
            type: 'CheckBox',
          },
          {
            name: '--enable-asset-hashing',
            description:
              'Compute blake3 content hashes when scanning assets. Hashing enables future asset-portability features (deduplication, cross-machine model resolution) but adds startup cost and per-output cost on large models directories. Off by default; enable to opt in.',
            type: 'CheckBox',
          },
          {
            name: '--feature-flag',
            description:
              'Set a server feature flag. Use KEY=VALUE to set an explicit value, or bare KEY to set it to true. Can be specified multiple times. Boolean values (true/false) and numbers are auto-converted.',
            type: 'Input',
          },
          {
            name: '--list-feature-flags',
            description: 'Print the registry of known CLI-settable feature flags as JSON and exit.',
            type: 'CheckBox',
          },
          {
            name: '--debug-hang',
            description: 'Enable stack trace dumps on Ctrl-C for debugging hangs.',
            type: 'CheckBox',
          },
          {
            name: '--front-end-version',
            description: 'Specifies the version of the frontend to be used. (default: comfyanonymous/ComfyUI@latest)',
            type: 'Input',
            defaultValue: 'comfyanonymous/ComfyUI@latest',
          },
          {
            name: '--default-hashing-function',
            description:
              'Allows you to choose the hash function to use for duplicate filename / contents comparison. Default is sha256.',
            type: 'DropDown',
            defaultValue: 'sha256',
            values: ['md5', 'sha1', 'sha256', 'sha512'],
          },
          {
            name: '--deterministic',
            description:
              'Make pytorch use slower deterministic algorithms when it can. Note that this might not make images deterministic in all cases.',
            type: 'CheckBox',
          },
          {
            name: '--mmap-torch-files',
            description: 'Use mmap when loading ckpt/pt files.',
            type: 'CheckBox',
          },
          {
            name: '--disable-mmap',
            description: "Don't use mmap when loading safetensors.",
            type: 'CheckBox',
          },
          {
            name: '--dont-print-server',
            description: "Don't print server output.",
            type: 'CheckBox',
          },
          {
            name: '--quick-test-for-ci',
            description: 'Quick test for CI.',
            type: 'CheckBox',
          },
          {
            name: '--windows-standalone-build',
            description:
              'Windows standalone build: Enable convenient things that most people using the standalone windows build will probably enjoy (like auto opening the page on startup).',
            type: 'CheckBox',
          },
          {
            name: '--disable-metadata',
            description: 'Disable saving prompt metadata in files.',
            type: 'CheckBox',
          },
          {
            name: '--disable-all-custom-nodes',
            description: 'Disable loading all custom nodes.',
            type: 'CheckBox',
          },
          {
            name: '--whitelist-custom-nodes',
            description: 'Specify custom node folders to load even when --disable-all-custom-nodes is enabled.',
            type: 'Input',
            defaultValue: '[]',
          },
          {
            name: '--multi-user',
            description: 'Enables per-user storage.',
            type: 'CheckBox',
          },
          {
            name: '--verbose',
            description: 'Set the logging level',
            type: 'DropDown',
            defaultValue: 'INFO',
            values: ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'],
          },
          {
            name: '--log-stdout',
            description: 'Send normal process output to stdout instead of stderr (default).',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
];

export default comfyuizludaArguments;

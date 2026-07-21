import {ArgumentsData, DataItem, DataSection} from '../../../../../src/common/types/plugins/modules';
import {getPythonCommandByOs, isWin} from '../../../Utils/CrossUtils';

const automatic1111Arguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    condition: 'COMMANDLINE_ARGS',
    sections: [
      {
        items: [
          {
            defaultValue: false,
            description: 'Show this help message and exit.',
            name: '--help',
            type: 'CheckBox',
          },
          {
            description: 'Terminate after installation',
            name: '--exit',
            type: 'CheckBox',
          },
          {
            defaultValue: './',
            description: 'base path where all user data is stored',
            name: '--data-dir',
            type: 'Directory',
          },
          {
            defaultValue: 'configs/stable-diffusion/v1-inference.yaml',
            description: 'Path to config which constructs model.',
            name: '--config',
            type: 'File',
          },
          {
            defaultValue: 'model.ckpt',
            description:
              'Path to checkpoint of Stable Diffusion model; if specified, this checkpoint will' +
              ' be added to the list of checkpoints and loaded.',
            name: '--ckpt',
            type: 'File',
          },
          {
            description: 'Path to directory with Stable Diffusion checkpoints.',
            name: '--ckpt-dir',
            type: 'Directory',
          },
          {
            defaultValue: false,
            description: "Don't download SD1.5 model even if no model is found.",
            name: '--no-download-sd-model',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: "do not download CLIP model even if it's not included in the checkpoint",
            name: '--do-not-download-clip',
            type: 'CheckBox',
          },
          {
            description: 'Path to Variational Autoencoders model | disables all settings related to VAE.',
            name: '--vae-dir',
            type: 'Directory',
          },
          {
            description: 'Checkpoint to use as VAE; setting this argument',
            name: '--vae-path',
            type: 'File',
          },
          {
            defaultValue: 'GFPGAN/',
            description: 'GFPGAN directory.',
            name: '--gfpgan-dir',
            type: 'Directory',
          },
          {
            defaultValue: 'GFPGAN model file name.',
            name: '--gfpgan-model',
            type: 'Input',
          },
          {
            defaultValue: 'models/Codeformer/',
            description: 'Path to directory with codeformer model file(s).',
            name: '--codeformer-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/GFPGAN',
            description: 'Path to directory with GFPGAN model file(s).',
            name: '--gfpgan-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/ESRGAN',
            description: 'Path to directory with ESRGAN model file(s).',
            name: '--esrgan-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/BSRGAN',
            description: 'Path to directory with BSRGAN model file(s).',
            name: '--bsrgan-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/RealESRGAN',
            description: 'Path to directory with RealESRGAN model file(s).',
            name: '--realesrgan-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/ScuNET',
            description: 'Path to directory with ScuNET model file(s).',
            name: '--scunet-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/SwinIR',
            description: 'Path to directory with SwinIR and SwinIR v2 model file(s).',
            name: '--swinir-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/LDSR',
            description: 'Path to directory with LDSR model file(s).',
            name: '--ldsr-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/DAT',
            description: 'Path to directory with DAT model file(s).',
            name: '--dat-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'models/Lora',
            description: 'Path to directory with Lora networks.',
            name: '--lora-dir',
            type: 'Directory',
          },
          {
            description: 'Path to directory with CLIP model file(s).',
            name: '--clip-models-path',
            type: 'Directory',
          },
          {
            defaultValue: 'embeddings/',
            description: 'Embeddings directory for textual inversion (default: embeddings).',
            name: '--embeddings-dir',
            type: 'Directory',
          },
          {
            defaultValue: 'textual_inversion_templates',
            description: 'Directory with textual inversion templates.',
            name: '--textual-inversion-templates-dir',
            type: 'Directory',
          },
          {
            defaultValue: 'models/hypernetworks/',
            description: 'hypernetwork directory.',
            name: '--hypernetwork-dir',
            type: 'Directory',
          },
          {
            defaultValue: 'localizations/',
            description: 'Localizations directory.',
            name: '--localizations-dir',
            type: 'Directory',
          },
          {
            defaultValue: 'styles.csv',
            description: 'Path or wildcard path of styles files, allow multiple entries.',
            name: '--styles-file',
            type: 'File',
          },
          {
            defaultValue: 'ui-config.json',
            description: 'Filename to use for UI configuration.',
            name: '--ui-config-file',
            type: 'File',
          },
          {
            defaultValue: false,
            description:
              'Do not hide progress bar in gradio UI (we hide it because it' +
              ' slows down ML if you have hardware acceleration in browser).',
            name: '--no-progressbar-hiding',
            type: 'CheckBox',
          },
          {
            defaultValue: 16,
            description: 'Maximum batch count value for the UI.',
            name: '--max-batch-count',
            type: 'Input',
          },
          {
            defaultValue: 'config.json',
            description: 'Filename to use for UI settings.',
            name: '--ui-settings-file',
            type: 'File',
          },
          {
            defaultValue: false,
            description: 'Allow custom script execution from web UI.',
            name: '--allow-code',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Use `share=True` for gradio and make the UI accessible through their site.',
            name: '--share',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Launch gradio with 0.0.0.0 as server name, allowing to respond to network requests.',
            name: '--listen',
            type: 'CheckBox',
          },
          {
            defaultValue: 7860,
            description:
              'Launch gradio with given server port, you need root/admin rights for ports' +
              ' < 1024; defaults to 7860 if available.',
            name: '--port',
            type: 'Input',
          },
          {
            defaultValue: false,
            description: 'Hide directory configuration from web UI.',
            name: '--hide-ui-dir-config',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'disable editing of all settings globally',
            name: '--freeze-settings',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'disable editing settings in specific sections of the settings page by specifying a' +
              ' comma-delimited list such like "saving-images,upscaling". The list of setting names' +
              ' can be found in the modules/shared_options.py file',
            name: '--freeze-settings-in-sections',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'disable editing of individual settings by specifying a comma-delimited list like' +
              ' "samples_save,samples_format". The list of setting names can be found in the config.json file',
            name: '--freeze-specific-settings',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Enable extensions tab regardless of other options.',
            name: '--enable-insecure-extension-access',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Launch gradio with `--debug` option.',
            name: '--gradio-debug',
            type: 'CheckBox',
          },
          {
            description:
              'Set gradio authentication like `username:password`; or comma-delimit multiple like `u1:p1,u2:p2,u3:p3`.',
            name: '--gradio-auth',
            type: 'Input',
          },
          {
            description:
              'Set gradio authentication file path ex. `/path/to/auth/file` same auth format as `--gradio-auth`.',
            name: '--gradio-auth-path',
            type: 'File',
          },
          {
            defaultValue: false,
            description: 'Do not output progress bars to console.',
            name: '--disable-console-progressbars',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Print prompts to console when generating with txt2img and img2img.',
            name: '--enable-console-prompts',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Launch web UI with API.',
            name: '--api',
            type: 'CheckBox',
          },
          {
            description:
              'Set authentication for API like `username:password`; or ' +
              'comma-delimit multiple like `u1:p1,u2:p2,u3:p3`.',
            name: '--api-auth',
            type: 'Input',
          },
          {
            defaultValue: false,
            description: 'Enable logging of all API requests.',
            name: '--api-log',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Only launch the API, without the UI.',
            name: '--nowebui',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: "Don't load model to quickly launch UI.",
            name: '--ui-debug-mode',
            type: 'CheckBox',
          },
          {
            description:
              'Select the default CUDA device to use (export `CUDA_VISIBLE_DEVICES=0,1` etc might be needed before).',
            name: '--device-id',
            type: 'Input',
          },
          {
            defaultValue: false,
            description: 'Administrator privileges.',
            name: '--administrator',
            type: 'CheckBox',
          },
          {
            description: 'Allowed CORS origin(s) in the form of a comma-separated list (no spaces).',
            name: '--cors-allow-origins',
            type: 'Input',
          },
          {
            description: 'Allowed CORS origin(s) in the form of a single regular expression.',
            name: '--cors-allow-origins-regex',
            type: 'Input',
          },
          {
            description: 'Partially enables TLS, requires `--tls-certfile` to fully function.',
            name: '--tls-keyfile',
            type: 'File',
          },
          {
            description: 'Partially enables TLS, requires `--tls-keyfile` to fully function.',
            name: '--tls-certfile',
            type: 'File',
          },
          {
            defaultValue: false,
            description: 'When passed, enables the use of self-signed certificates.',
            name: '--disable-tls-verify',
            type: 'CheckBox',
          },
          {
            description: 'Sets hostname of server.',
            name: '--server-name',
            type: 'Input',
          },
          {
            defaultValue: false,
            description:
              'Disables gradio queue; causes the webpage to use http requests' +
              ' instead of websockets; was the default in earlier versions.',
            name: '--no-gradio-queue',
            type: 'CheckBox',
          },
          {
            description: "Add path to Gradio's `allowed_paths`; make it possible to serve files from it.",
            name: '--gradio-allowed-path',
            type: 'Directory',
          },
          {
            defaultValue: false,
            description: 'Disable SHA-256 hashing of checkpoints to help loading performance.',
            name: '--no-hashing',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Do not check versions of torch and xformers.',
            name: '--skip-version-check',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Do not check versions of Python.',
            name: '--skip-python-version-check',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Do not check if CUDA is able to work properly.',
            name: '--skip-torch-cuda-test',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Skip installation of packages.',
            name: '--skip-install',
            type: 'CheckBox',
          },
          {
            description: 'log level; one of: CRITICAL, ERROR, WARNING, INFO, DEBUG',
            name: '--loglevel',
            type: 'DropDown',
            values: ['CRITICAL', 'ERROR', 'WARNING', 'INFO', 'DEBUG'],
          },
          {
            defaultValue: false,
            description: "launch.py argument: print a detailed log of what's happening at startup",
            name: '--log-startup',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'enable server stop/restart/kill via api',
            name: '--api-server-stop',
            type: 'CheckBox',
          },
          {
            defaultValue: 30,
            description: 'set timeout_keep_alive for uvicorn',
            name: '--timeout-keep-alive',
            type: 'Input',
          },
        ],
        section: 'Configuration',
      },
      {
        items: [
          {
            defaultValue: false,
            description: 'Enable xformers for cross attention layers.',
            name: '--xformers',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Enable xformers for cross attention layers regardless of whether the' +
              ' checking code thinks you can run it; ***do not make bug reports if' +
              ' this fails to work***.',
            name: '--force-enable-xformers',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Enable xformers with Flash Attention to improve reproducibility (supported for SD2.x or variant only).',
            name: '--xformers-flash-attention',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Enable scaled dot product cross-attention layer optimization; requires PyTorch 2.*',
            name: '--opt-sdp-attention',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Enable scaled dot product cross-attention layer optimization without memory' +
              ' efficient attention, makes image generation deterministic; requires PyTorch 2.*',
            name: '--opt-sdp-no-mem-attention',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              "Force-enables Doggettx's cross-attention layer optimization. By default," +
              " it's on for CUDA-enabled systems.",
            name: '--opt-split-attention',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              "Force-enables InvokeAI's cross-attention layer optimization. By default," +
              " it's on when CUDA is unavailable.",
            name: '--opt-split-attention-invokeai',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Enable older version of split attention optimization that does not consume all VRAM available.',
            name: '--opt-split-attention-v1',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Enable memory efficient sub-quadratic cross-attention layer optimization.',
            name: '--opt-sub-quad-attention',
            type: 'CheckBox',
          },
          {
            defaultValue: 1024,
            description: 'Query chunk size for the sub-quadratic cross-attention layer optimization to use.',
            name: '--sub-quad-q-chunk-size',
            type: 'Input',
          },
          {
            description: 'KV chunk size for the sub-quadratic cross-attention layer optimization to use.',
            name: '--sub-quad-kv-chunk-size',
            type: 'Input',
          },
          {
            description:
              'The percentage of VRAM threshold for the sub-quadratic cross-attention' +
              ' layer optimization to use chunking.',
            name: '--sub-quad-chunk-threshold',
            type: 'Input',
          },
          {
            defaultValue: false,
            description:
              'Enable alternative layout for 4d tensors, may result in faster inference' +
              ' **only** on Nvidia cards with Tensor cores (16xx and higher).',
            name: '--opt-channelslast',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Force-disables cross-attention layer optimization.',
            name: '--disable-opt-split-attention',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Do not check if produced images/latent spaces have nans; useful for running without a checkpoint in CI.',
            name: '--disable-nan-check',
            type: 'CheckBox',
          },
          {
            description: 'Use CPU as torch device for specified modules.',
            name: '--use-cpu',
            type: 'DropDown',
            values: ['all', 'sd', 'interrogate', 'gfpgan', 'bsrgan', 'esrgan', 'scunet', 'codeformer'],
          },
          {
            defaultValue: false,
            description: 'Use Intel XPU as torch device',
            name: '--use-ipex',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Do not switch the model to 16-bit floats.',
            name: '--no-half',
            type: 'CheckBox',
          },
          {
            defaultValue: 'autocast',
            description: 'Evaluate at this precision.',
            name: '--precision',
            type: 'DropDown',
            values: ['full', 'autocast'],
          },
          {
            defaultValue: false,
            description: 'Do not switch the VAE model to 16-bit floats.',
            name: '--no-half-vae',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Upcast sampling. No effect with `--no-half`. Usually produces similar results' +
              ' to `--no-half` with better performance while using less memory.',
            name: '--upcast-sampling',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Enable Stable Diffusion model optimizations for sacrificing a some performance for low VRAM usage.',
            name: '--medvram',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'enable `--medvram` optimization just for SDXL models',
            name: '--medvram-sdxl',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Enable Stable Diffusion model optimizations for sacrificing a lot of speed for very low VRAM usage.',
            name: '--lowvram',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Load Stable Diffusion checkpoint weights to VRAM instead of RAM.',
            name: '--lowram',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'disable an optimization that reduces RAM use when loading a model',
            name: '--disable-model-loading-ram-optimization',
            type: 'CheckBox',
          },
        ],
        section: 'Performance',
      },
      {
        items: [
          {
            defaultValue: false,
            description: "Open the web UI URL in the system's default browser upon launch.",
            name: '--autolaunch',
            type: 'CheckBox',
          },
          {
            description:
              'Open the web UI with the specified theme (`light` or `dark`). If not specified,' +
              ' uses the default browser theme.',
            name: '--theme',
            type: 'DropDown',
          },
          {
            defaultValue: false,
            description: 'Use textbox for seeds in UI (no up/down, but possible to input long seeds).',
            name: '--use-textbox-seed',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Disable checking PyTorch models for malicious code.',
            name: '--disable-safe-unpickle',
            type: 'CheckBox',
          },
          {
            description: 'ngrok authtoken, alternative to gradio `--share`.',
            name: '--ngrok',
            type: 'Input',
          },
          {
            defaultValue: 'us',
            description: 'The region in which ngrok should start.',
            name: '--ngrok-region',
            type: 'Input',
          },
          {
            description:
              'The options to pass to ngrok in JSON format, e.g.: `{"authtoken_from_env":true,' +
              ' "basic_auth":"user:password", "oauth_provider":"google", "oauth_allow_emails":"user@asdf.com"}`',
            name: '--ngrok-options',
            type: 'Input',
          },
          {
            description:
              'On startup, notifies whether or not your web UI version (commit) is up-to-date' +
              ' with the current master branch.',
            name: '--update-check',
            type: 'CheckBox',
          },
          {
            description: 'On startup, it pulls the latest updates for all extensions you have installed.',
            name: '--update-all-extensions',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Force-reinstall xformers. Useful for upgrading - but remove it after upgrading' +
              " or you'll reinstall xformers perpetually.",
            name: '--reinstall-xformers',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'Force-reinstall torch. Useful for upgrading - but remove it after upgrading' +
              " or you'll reinstall torch perpetually.",
            name: '--reinstall-torch',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Run test to validate web UI functionality, see wiki topic for more details.',
            name: '--tests',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'Do not run tests even if `--tests` option is specified.',
            name: '--no-tests',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description:
              'launch.py argument: dump limited sysinfo file (without information' +
              ' about extensions, options) to disk and quit',
            name: '--dump-sysinfo',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'disable all non-built-in extensions from running',
            name: '--disable-all-extensions',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'disable all extensions from running',
            name: '--disable-extra-extensions',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: 'if load a model at web start, only take effect when --nowebui',
            name: '--skip-load-model-at-start',
            type: 'CheckBox',
          },
          {
            defaultValue: false,
            description: "allow any symbols except '/' in filenames. May conflict with your browser and file system",
            name: '--unix-filenames-sanitization',
            type: 'CheckBox',
          },
          {
            defaultValue: 128,
            description:
              'maximal length of filenames of saved images, longer filenames will be truncated.' +
              ' if overridden it can potentially cause issues with the file system',
            name: '--filenames-max-length',
            type: 'Input',
          },
          {
            defaultValue: false,
            description: 'disable read prompt from last generation feature; disables `--data-path/params.txt`',
            name: '--no-prompt-history',
            type: 'CheckBox',
          },
        ],
        section: 'Features',
      },
    ],
  },
];

const winEV: DataItem = {
  category: 'Environment Variables',
  items: [
    {
      description: 'Sets a custom path for Python executable.',
      name: 'PYTHON',
      type: 'File',
    },
    {
      description:
        'Specifies the path for the virtual environment. Default is venv.' +
        ' Special value - runs the script without creating virtual environment.',
      name: 'VENV_DIR',
      type: 'Directory',
    },
    {
      description: 'Additional commandline arguments for the main program.',
      name: 'COMMANDLINE_ARGS',
      type: 'CheckBox',
    },
    {
      description:
        'Set to anything to make the program not exit with an error' +
        ' if an unexpected commandline argument is encountered.',
      name: 'IGNORE_CMD_ARGS_ERRORS',
      type: 'CheckBox',
    },
    {
      description:
        'Name of requirements.txt file with dependencies that will be' +
        ' installed when launch.py is run. Defaults to requirements_versions.txt.',
      name: 'REQS_FILE',
      type: 'Input',
    },
    {
      description: 'Command for installing PyTorch.',
      name: 'TORCH_COMMAND',
      type: 'Input',
    },
    {
      description: '`--index-url` parameter for pip.',
      name: 'INDEX_URL',
      type: 'Input',
    },
    {
      description: 'Path to where transformers library will download and keep its files related to the CLIP model.',
      name: 'TRANSFORMERS_CACHE',
      type: 'Directory',
    },
    {
      description:
        'Select GPU to use for your instance on a system with multiple GPUs. For example, if you' +
        ' want to use secondary GPU, put "1".\n(add a new line to webui-user.bat not in' +
        ' COMMANDLINE_ARGS): `set CUDA_VISIBLE_DEVICES=0`\nAlternatively, just use `--device-id`' +
        ' flag in `COMMANDLINE_ARGS`.',
      name: 'CUDA_VISIBLE_DEVICES',
      type: 'Input',
    },
    {
      description:
        "Log verbosity. Supports any valid logging level supported by Python's built-in" +
        ' `logging` module. Defaults to `INFO` if not set.',
      name: 'SD_WEBUI_LOG_LEVEL',
      type: 'Input',
    },
    {
      description: 'Cache file path. Defaults to `cache.json` in the root directory if not set.',
      name: 'SD_WEBUI_CACHE_FILE',
      type: 'File',
    },
    {
      description:
        'A value set by `launcher script` (like webui.bat webui.sh) informing Webui that' +
        ' restart function is available',
      name: 'SD_WEBUI_RESTAR',
      type: 'CheckBox',
    },
    {
      description:
        'A internal value signifying if webui is currently restarting or reloading, used for disabling' +
        ' certain actions asuch as auto launching browser.\nset to `1` disables auto launching browser\n' +
        'set to `0` enables auto launch even when restarting\nCertain extensions might use this value' +
        ' for similar purpose.',
      name: 'SD_WEBUI_RESTARTING',
      type: 'CheckBox',
    },
  ],
};

const linEV: DataSection = {
  category: 'Environment',
  sections: [
    {
      section: 'Variables',
      items: [
        {
          description: 'Install directory without trailing slash',
          name: 'install_dir',
          type: 'Input',
          defaultValue: '/home/$(whoami)',
        },
        {
          description: 'Name of the subdirectory',
          name: 'clone_dir',
          type: 'Input',
          defaultValue: 'stable-diffusion-webui',
        },
        {
          description: 'python3 executable',
          name: 'python_cmd',
          type: 'Input',
          defaultValue: 'python3',
        },
        {
          description: 'python3 venv without trailing slash (defaults to ${install_dir}/${clone_dir}/venv)',
          name: 'venv_dir',
          type: 'Input',
          defaultValue: 'venv',
        },
      ],
    },
    {
      section: 'Arguments',
      items: [
        {
          description: 'Commandline arguments for webui.py',
          name: 'COMMANDLINE_ARGS',
          type: 'CheckBox',
        },
        {
          description: 'Script to launch to start the app',
          name: 'LAUNCH_SCRIPT',
          type: 'Input',
          defaultValue: 'launch.py',
        },
        {
          description: 'Install command for torch',
          name: 'TORCH_COMMAND',
          type: 'Input',
          defaultValue:
            `${getPythonCommandByOs().pip} install torch==1.12.1+cu113 ` +
            '--extra-index-url https://download.pytorch.org/whl/cu113',
        },
        {
          description: 'Requirements file to use for stable-diffusion-webui',
          name: 'REQS_FILE',
          type: 'Input',
          defaultValue: 'requirements_versions.txt',
        },
        {
          description: 'Fixed git repo for K_DIFFUSION_PACKAGE',
          name: 'K_DIFFUSION_PACKAGE',
          type: 'Input',
          defaultValue: '',
        },
        {
          description: 'Fixed git repo for GFPGAN_PACKAGE',
          name: 'GFPGAN_PACKAGE',
          type: 'Input',
          defaultValue: '',
        },
        {
          description: 'Fixed git commit for Stable Diffusion',
          name: 'STABLE_DIFFUSION_COMMIT_HASH',
          type: 'Input',
          defaultValue: '',
        },
        {
          description: 'Fixed git commit for CodeFormer',
          name: 'CODEFORMER_COMMIT_HASH',
          type: 'Input',
          defaultValue: '',
        },
        {
          description: 'Fixed git commit for BLIP',
          name: 'BLIP_COMMIT_HASH',
          type: 'Input',
          defaultValue: '',
        },
        {
          description: 'Enable accelerated launch',
          name: 'ACCELERATE',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          description: 'Disable TCMalloc',
          name: 'NO_TCMALLOC',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
  ],
};

automatic1111Arguments.unshift(isWin ? winEV : linEV);

export default automatic1111Arguments;

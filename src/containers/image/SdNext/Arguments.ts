import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const vladmandicArguments: ArgumentsData = [
  {
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
    ],
  },
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Configuration',
        items: [
          {
            name: '--config',
            description: 'Use specific server configuration file, default: config.json',
            type: 'File',
          },
          {
            name: '--ui-config',
            description: 'Use specific UI configuration file, default: ui-config.json',
            type: 'File',
          },
          {
            name: '--medvram',
            description: 'Split model stages and keep only active part in VRAM',
            type: 'CheckBox',
          },
          {
            name: '--lowvram',
            description: 'Split model components and keep only active part in VRAM',
            type: 'CheckBox',
          },
          {
            name: '--freeze',
            description: 'Disable editing settings',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Paths',
        items: [
          {
            name: '--ckpt',
            description: 'Path to model checkpoint to load immediately',
            type: 'File',
          },
          {
            name: '--data-dir',
            description: 'Base path where all user data is stored',
            type: 'Directory',
          },
          {
            name: '--models-dir',
            description: 'Base path where all models are stored',
            type: 'Directory',
          },
          {
            name: '--allowed-paths',
            description: 'Add additional paths to paths allowed for web access',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Diagnostics',
        items: [
          {
            name: '--no-hashing',
            description: 'Disable hashing of checkpoints',
            type: 'CheckBox',
          },
          {
            name: '--no-metadata',
            description: 'Disable reading of metadata from models',
            type: 'CheckBox',
          },
          {
            name: '--disable-queue',
            description: 'Disable queues',
            type: 'CheckBox',
          },
          {
            name: '--device-id',
            description: 'Select the default CUDA device to use',
            type: 'Input',
          },
        ],
      },
      {
        section: 'HTTP',
        items: [
          {
            name: '--server-name',
            description: 'Sets hostname of server',
            type: 'Input',
          },
          {
            name: '--tls-keyfile',
            description: 'Enable TLS and specify key file',
            type: 'File',
          },
          {
            name: '--tls-certfile',
            description: 'Enable TLS and specify cert file',
            type: 'File',
          },
          {
            name: '--tls-selfsign',
            description: 'Enable TLS with self-signed certificates',
            type: 'CheckBox',
          },
          {
            name: '--cors-origins',
            description: 'Allowed CORS origins as comma-separated list',
            type: 'Input',
          },
          {
            name: '--cors-regex',
            description: 'Allowed CORS origins as regular expression',
            type: 'Input',
          },
          {
            name: '--subpath',
            description: 'Customize the URL subpath for usage with reverse proxy',
            type: 'Input',
          },
          {
            name: '--autolaunch',
            description: "Open the UI URL in the system's default browser upon launch",
            type: 'CheckBox',
          },
          {
            name: '--auth',
            description: 'Set access authentication like "user:pwd,user:pwd"',
            type: 'Input',
          },
          {
            name: '--auth-file',
            description: 'Set access authentication using file',
            type: 'File',
          },
          {
            name: '--api-only',
            description: 'Run in API only mode without starting UI',
            type: 'CheckBox',
          },
          {
            name: '--share',
            description: 'Enable UI accessible through Gradio site',
            type: 'CheckBox',
          },
          {
            name: '--insecure',
            description: 'Enable extensions tab regardless of other options',
            type: 'CheckBox',
          },
          {
            name: '--listen',
            description: 'Launch web server using public IP address',
            type: 'CheckBox',
          },
          {
            name: '--port',
            description: 'Launch web server with given server port',
            type: 'Input',
            defaultValue: 7860,
          },
        ],
      },
      {
        section: 'Setup',
        items: [
          {
            name: '--reset',
            description: 'Reset main repository to latest version',
            type: 'CheckBox',
          },
          {
            name: '--upgrade',
            description: 'Upgrade main repository to latest version',
            type: 'CheckBox',
          },
          {
            name: '--requirements',
            description: 'Force re-check of requirements',
            type: 'CheckBox',
          },
          {
            name: '--reinstall',
            description: 'Force reinstallation of all requirements',
            type: 'CheckBox',
          },
          {
            name: '--uv',
            description: 'Use uv instead of pip to install the packages',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Startup',
        items: [
          {
            name: '--quick',
            description: 'Bypass version checks',
            type: 'CheckBox',
          },
          {
            name: '--skip-requirements',
            description: 'Skips checking and installing requirements',
            type: 'CheckBox',
          },
          {
            name: '--skip-extensions',
            description: 'Skips running individual extension installers',
            type: 'CheckBox',
          },
          {
            name: '--skip-git',
            description: 'Skips running all GIT operations',
            type: 'CheckBox',
          },
          {
            name: '--skip-torch',
            description: 'Skips running Torch checks',
            type: 'CheckBox',
          },
          {
            name: '--skip-all',
            description: 'Skips running all checks',
            type: 'CheckBox',
          },
          {
            name: '--skip-env',
            description: 'Skips setting of env variables during startup',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Compute Engine',
        items: [
          {
            name: '--use-directml',
            description: 'Use DirectML if no compatible GPU is detected',
            type: 'CheckBox',
          },
          {
            name: '--use-openvino',
            description: 'Use Intel OpenVINO backend',
            type: 'CheckBox',
          },
          {
            name: '--use-ipex',
            description: 'Force use Intel OneAPI XPU backend',
            type: 'CheckBox',
          },
          {
            name: '--use-cuda',
            description: 'Force use nVidia CUDA backend',
            type: 'CheckBox',
          },
          {
            name: '--use-rocm',
            description: 'Force use AMD ROCm backend',
            type: 'CheckBox',
          },
          {
            name: '--use-zluda',
            description: 'Force use ZLUDA, AMD GPUs only',
            type: 'CheckBox',
          },
          {
            name: '--use-xformers',
            description: 'Force use xFormers cross-optimization',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Diagnostics',
        items: [
          {
            name: '--safe',
            description: 'Run in safe mode with no user extensions',
            type: 'CheckBox',
          },
          {
            name: '--experimental',
            description: 'Allow unsupported versions of libraries',
            type: 'CheckBox',
          },
          {
            name: '--test',
            description: 'Run test only and exit',
            type: 'CheckBox',
          },
          {
            name: '--version',
            description: 'Print version information',
            type: 'CheckBox',
          },
          {
            name: '--ignore',
            description: 'Ignore any errors and attempt to continue',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Logging',
        items: [
          {
            name: '--log',
            description: 'Set log file',
            type: 'File',
          },
          {
            name: '--debug',
            description: 'Run installer with debug logging',
            type: 'CheckBox',
          },
          {
            name: '--profile',
            description: 'Run profiler',
            type: 'CheckBox',
          },
          {
            name: '--monitor',
            description: 'Monitor load and log in specific periods',
            type: 'Input',
            defaultValue: 0,
          },
          {
            name: '--docs',
            description: 'Mount API docs',
            type: 'CheckBox',
          },
          {
            name: '--api-log',
            description: 'Enable logging of all API requests',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
];

export default vladmandicArguments;

import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const bmaltaisArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    items: [
      {
        name: '--config',
        description: 'Path to the toml config file for interface defaults',
        type: 'File',
        defaultValue: './config.toml',
      },
      {
        name: '--debug',
        description: 'Enable debug mode.',
        type: 'CheckBox',
      },
      {
        name: '--listen',
        description: 'Specify the IP address to listen on for connections to Gradio.',
        type: 'Input',
        defaultValue: '127.0.0.1',
      },
      {
        name: '--username',
        description: 'Set a username for authentication.',
        type: 'Input',
        defaultValue: '',
      },
      {
        name: '--password',
        description: 'Set a password for authentication.',
        type: 'Input',
        defaultValue: '',
      },
      {
        name: '--server_port',
        description: 'Define the port to run the server listener on.',
        type: 'Input',
        defaultValue: '0',
      },
      {
        name: '--inbrowser',
        description: 'Open the Gradio UI in a web browser.',
        type: 'CheckBox',
      },
      {
        name: '--share',
        description: 'Share the Gradio UI.',
        type: 'CheckBox',
      },
      {
        name: '--headless',
        description: 'Indicates whether the server is headless.',
        type: 'CheckBox',
      },
      {
        name: '--language',
        description: 'Set custom language',
        type: 'Input',
      },
      {
        name: '--use-ipex',
        description: 'Use IPEX environment.',
        type: 'CheckBox',
      },
      {
        name: '--use-rocm',
        description: 'Use ROCm environment.',
        type: 'CheckBox',
      },
      {
        name: '--do_not_use_shell',
        description: 'Enforce not to use shell=True when running external commands.',
        type: 'CheckBox',
      },
      {
        name: '--do_not_share',
        description: 'Do not share the Gradio UI.',
        type: 'CheckBox',
      },
      {
        name: '--root_path',
        description: '`root_path` for Gradio to enable reverse proxy support. e.g. /kohya_ss',
        type: 'Input',
      },
      {
        name: '--requirements',
        description: 'Requirements file to use for validation.',
        type: 'File',
      },
      {
        name: '--noverify',
        description: 'Disable requirements verification.',
        type: 'CheckBox',
      },
    ],
  },
  {
    category: 'Environment Variables',
    items: [
      {
        name: 'TF_ENABLE_ONEDNN_OPTS',
        description: 'Enable or disable TensorFlow C++ oneDNN optimizations (default: 0).',
        type: 'Input',
        defaultValue: '0',
      },
      {
        name: 'TF_CPP_MIN_LOG_LEVEL',
        description: 'Set TensorFlow C++ logging level (0=all, 1=no INFO, 2=no WARNING, 3=no ERROR).',
        type: 'Input',
        defaultValue: '2',
      },
      {
        name: 'TENSORBOARD_PORT',
        description: 'Specify custom port for TensorBoard server instance.',
        type: 'Input',
      },
      {
        name: 'TENSORBOARD_HOST',
        description: 'Specify custom host IP address for TensorBoard.',
        type: 'Input',
      },
      {
        name: 'HF_HOME',
        description: 'Custom cache and home directory for HuggingFace assets and models.',
        type: 'Directory',
      },
      {
        name: 'LOG_LEVEL',
        description: 'Logging level for setup and environment validation (e.g. INFO, DEBUG, WARNING).',
        type: 'Input',
      },
    ],
  },
];

export default bmaltaisArguments;

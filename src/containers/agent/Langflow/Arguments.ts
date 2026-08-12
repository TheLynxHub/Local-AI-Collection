import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const langflowArguments: ArgumentsData = [
  {
    category: 'General',
    sections: [
      {
        section: 'Basic Configuration',
        items: [
          {
            name: 'PORT',
            description: 'The HTTP port Langflow runs on',
            type: 'Input',
            defaultValue: 7860,
          },
          {
            name: 'HOST',
            description: 'The host address to bind the server to',
            type: 'Input',
            defaultValue: '127.0.0.1',
          },
          {
            name: 'LANGFLOW_AUTO_LOGIN',
            description: 'Enable automatic login without credentials',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--open-browser',
            description: 'Open the browser automatically after starting the server',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--backend-only',
            description: 'Run only the backend server without serving frontend assets',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: '--frontend-path',
            description: 'Path to custom frontend directory containing build files',
            type: 'Directory',
          },
        ],
      },
      {
        section: 'Logging & Environment',
        items: [
          {
            name: 'LANGFLOW_LOG_LEVEL',
            description: 'Set logging level for Langflow backend',
            type: 'DropDown',
            values: ['debug', 'info', 'warning', 'error', 'critical'],
            defaultValue: 'info',
          },
          {
            name: 'LANGFLOW_ENV_FILE',
            description: 'Path to custom .env file',
            type: 'File',
          },
          {
            name: 'LANGFLOW_COMPONENTS_PATH',
            description: 'Path to custom components directory',
            type: 'Directory',
          },
          {
            name: '--log-file',
            description: 'Path to the log file',
            type: 'File',
          },
          {
            name: '--log-rotation',
            description: 'Log rotation rule (Time/Size)',
            type: 'Input',
          },
          {
            name: 'DO_NOT_TRACK',
            description: 'Opt out of anonymous telemetry usage data collection',
            type: 'CheckBox',
            defaultValue: false,
          },
        ],
      },
      {
        section: 'Performance & SSL',
        items: [
          {
            name: '--workers',
            description: 'Number of worker processes',
            type: 'Input',
          },
          {
            name: '--worker-timeout',
            description: 'Worker process timeout in seconds',
            type: 'Input',
          },
          {
            name: '--ssl-cert-file-path',
            description: 'Defines the SSL certificate file path',
            type: 'File',
          },
          {
            name: '--ssl-key-file-path',
            description: 'Defines the SSL key file path',
            type: 'File',
          },
        ],
      },
    ],
  },
];

export default langflowArguments;

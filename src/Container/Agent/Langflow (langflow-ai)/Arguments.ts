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
            name: '--backend-only',
            description: 'Run only the backend server without serving frontend assets',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: '--frontend-only',
            description: 'Run only the frontend server',
            type: 'CheckBox',
            defaultValue: false,
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
        ],
      },
    ],
  },
];

export default langflowArguments;

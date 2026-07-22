import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const hermesAgentArguments: ArgumentsData = [
  {
    category: 'LynxHub Configuration',
    items: [
      {
        name: 'Settings File Location',
        description:
          'Optional path to a config.yaml or settings file. If set, LynxHub writes settings here from the Settings section.',
        type: 'File',
      },
    ],
  },
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'API & Provider Options',
        items: [
          {
            name: 'NOUS_API_KEY',
            description: 'API key for Nous Portal / Nous Research API.',
            type: 'Input',
          },
          {
            name: 'OPENROUTER_API_KEY',
            description: 'API key for OpenRouter provider.',
            type: 'Input',
          },
          {
            name: 'OPENAI_API_KEY',
            description: 'API key for OpenAI provider.',
            type: 'Input',
          },
          {
            name: 'ANTHROPIC_API_KEY',
            description: 'API key for Anthropic provider.',
            type: 'Input',
          },
          {
            name: 'HERMES_YOLO_MODE',
            description: 'Set to 1 or true to enable auto-approval of all command prompts.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Networking & Proxy',
        items: [
          {
            name: 'HTTPS_PROXY',
            description: 'HTTPS proxy URL for network traffic.',
            type: 'Input',
          },
          {
            name: 'HTTP_PROXY',
            description: 'HTTP proxy URL for network traffic.',
            type: 'Input',
          },
        ],
      },
    ],
  },
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Core Execution Options',
        items: [
          {
            name: '--model <model_name>',
            description: 'Specify LLM provider and model (e.g. nous/hermes-3-llama-3.1-405b).',
            type: 'Input',
          },
          {
            name: '-p <prompt>',
            description: 'Run a single prompt non-interactively and exit.',
            type: 'Input',
          },
          {
            name: '--yolo',
            description: 'Bypass all approval prompts and auto-approve command executions.',
            type: 'CheckBox',
          },
          {
            name: '--portal',
            description: 'Use Nous Portal subscription setup for models and tool gateway.',
            type: 'CheckBox',
          },
          {
            name: '--debug',
            description: 'Enable verbose debug logging.',
            type: 'CheckBox',
          },
          {
            name: '--help',
            description: 'Displays help information about Hermes Agent commands.',
            type: 'CheckBox',
          },
          {
            name: '--version',
            description: 'Displays the version of Hermes Agent.',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
  {
    category: 'Settings',
    sections: [
      {
        section: 'General & Learning',
        items: [
          {
            name: 'learning.enabled',
            description: 'Enable autonomous skill creation and procedural memory learning loop.',
            type: 'CheckBox',
          },
          {
            name: 'learning.autoSaveSkills',
            description: 'Automatically save skills generated during task execution.',
            type: 'CheckBox',
          },
          {
            name: 'telemetry.enabled',
            description: 'Permit metric collection and crash log streaming.',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
];

export default hermesAgentArguments;

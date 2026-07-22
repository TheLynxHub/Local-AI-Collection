import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const antigravityCliArguments: ArgumentsData = [
  {
    category: 'LynxHub Configuration',
    items: [
      {
        name: 'Settings File Location',
        description: 'Optional path to a settings file. If set, LynxHub writes custom configuration here.',
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
            name: 'GEMINI_API_KEY',
            description: 'Optional Gemini API key for Antigravity CLI.',
            type: 'Input',
          },
          {
            name: 'ANTIGRAVITY_API_KEY',
            description: 'Optional Antigravity API key or token.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Networking & Proxy',
        items: [
          {
            name: 'HTTPS_PROXY',
            description: 'HTTPS proxy URL for Antigravity CLI network traffic.',
            type: 'Input',
          },
          {
            name: 'HTTP_PROXY',
            description: 'HTTP proxy URL for Antigravity CLI network traffic.',
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
        section: 'Execution Options',
        items: [
          {
            name: '-p <prompt>',
            description: 'Run in print mode, executing the given prompt and outputting to standard output.',
            type: 'Input',
          },
          {
            name: '--model <model_name>',
            description: 'Model to use for this session.',
            type: 'Input',
          },
          {
            name: '--resume <session_id>',
            description: 'Resume a previous session by ID.',
            type: 'Input',
          },
          {
            name: '--continue',
            description: 'Continue the most recent session in the current directory.',
            type: 'CheckBox',
          },
          {
            name: '--approval-mode <mode>',
            description: 'Approval mode for tool execution and code edits (e.g. auto, manual).',
            type: 'Input',
          },
          {
            name: '--bg',
            description: 'Run as a background agent process.',
            type: 'CheckBox',
          },
          {
            name: '--safe-mode',
            description: 'Start with custom hooks and integrations disabled for troubleshooting.',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
];

export default antigravityCliArguments;

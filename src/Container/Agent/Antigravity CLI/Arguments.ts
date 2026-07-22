import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const antigravityCliArguments: ArgumentsData = [
  {
    category: 'LynxHub Configuration',
    items: [
      {
        name: 'Settings File Location',
        description:
          'Optional path to a settings.json file. If set, LynxHub writes JSON here from the Settings section.',
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
            description: 'Continue the most recent session in current directory without prompt.',
            type: 'CheckBox',
          },
          {
            name: '--approval-mode <mode>',
            description: 'Approval mode for tool execution and code edits (e.g. auto, manual).',
            type: 'Input',
          },
          {
            name: '--bg',
            description: 'Start session as a background agent process.',
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
  {
    category: 'Settings',
    sections: [
      {
        section: 'General & Appearance',
        items: [
          {
            name: 'colorScheme',
            description:
              'Color theme: "light", "solarized light", "colorblind-friendly light", "dark", "solarized dark", "colorblind-friendly dark", "tokyo night", or "terminal".',
            type: 'Input',
          },
          {
            name: 'altScreenMode',
            description: 'Screen buffer usage: "default", "always", or "never".',
            type: 'Input',
          },
          {
            name: 'verbosity',
            description:
              'Visual verbosity level: "high" (full thoughts and tool outputs) or "low" (minimal indicator).',
            type: 'Input',
          },
          {
            name: 'runningLightSpeed',
            description: 'Progress animation speed: "fast", "medium", "slow", or "off".',
            type: 'Input',
          },
          {
            name: 'showTips',
            description: 'Display helpful agentic tips above the prompt panel during generation turns.',
            type: 'CheckBox',
          },
          {
            name: 'showFeedbackSurvey',
            description: 'Display periodic quality feedback surveys upon task completions.',
            type: 'CheckBox',
          },
          {
            name: 'notifications',
            description: 'Emit system desktop and terminal bell notifications upon task completion.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Security & Permissions',
        items: [
          {
            name: 'toolPermission',
            description:
              'Global safety presets: "request-review", "proceed-in-sandbox", "always-proceed", or "strict".',
            type: 'Input',
          },
          {
            name: 'artifactReviewPolicy',
            description: 'Code review policy: "asks-for-review", "agent-decides", or "always-proceed".',
            type: 'Input',
          },
          {
            name: 'enableTerminalSandbox',
            description: 'Restrict all local execution commands launched by agents to OS containment rings.',
            type: 'CheckBox',
          },
          {
            name: 'allowNonWorkspaceAccess',
            description: 'Permit file read/write tools to navigate outside recognized workspace roots.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Account & Telemetry',
        items: [
          {
            name: 'useG1Credits',
            description: 'Use personal AI credits for model calls once plan quotas are exhausted.',
            type: 'CheckBox',
          },
          {
            name: 'enableTelemetry',
            description: 'Permit metric collection and crash log streaming to improve tool reliability.',
            type: 'CheckBox',
          },
          {
            name: 'editor',
            description: 'Target text editor utility ("auto", "vim", "emacs").',
            type: 'Input',
          },
        ],
      },
    ],
  },
];

export default antigravityCliArguments;

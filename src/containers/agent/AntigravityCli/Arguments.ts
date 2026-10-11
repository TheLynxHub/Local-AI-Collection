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
          {
            name: 'NO_PROXY',
            description: 'Space or comma separated list of hosts to bypass the proxy.',
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
            description: 'Model for the current CLI session.',
            type: 'Input',
          },
          {
            name: '-p <prompt>',
            description: 'Run a single prompt non-interactively and print the response.',
            type: 'Input',
          },
          {
            name: '--prompt-interactive <prompt>',
            description: 'Run an initial prompt interactively and continue the session.',
            type: 'Input',
          },
          {
            name: '--continue',
            description: 'Continue the most recent conversation.',
            type: 'CheckBox',
          },
          {
            name: '--conversation <session_id>',
            description: 'Resume a previous conversation by ID.',
            type: 'Input',
          },
          {
            name: '--agent <agent_name>',
            description: 'Agent for the current CLI session.',
            type: 'Input',
          },
          {
            name: '--effort <level>',
            description: 'Reasoning effort for the current CLI session (low|medium|high|xhigh|max).',
            type: 'DropDown',
            values: ['low', 'medium', 'high', 'xhigh', 'max'],
            defaultValue: 'high',
          },
          {
            name: '--mode <mode>',
            description: 'Set the agent execution mode for this session (accept-edits, plan).',
            type: 'DropDown',
            values: ['accept-edits', 'plan'],
          },
          {
            name: '--output-format <format>',
            description: 'Output format for print mode (text, json, stream-json).',
            type: 'DropDown',
            values: ['text', 'json', 'stream-json'],
            defaultValue: 'text',
          },
          {
            name: '--input-format <format>',
            description: 'Input format for print mode (text, stream-json).',
            type: 'DropDown',
            values: ['text', 'stream-json'],
            defaultValue: 'text',
          },
          {
            name: '--json-schema <schema>',
            description: 'Optional JSON schema string or path to a schema file to enforce structured output.',
            type: 'Input',
          },
          {
            name: '--project <project_id>',
            description: 'Project ID or project name for the current CLI session.',
            type: 'Input',
          },
          {
            name: '--new-project',
            description: 'Create a new project for this session.',
            type: 'CheckBox',
          },
          {
            name: '--remote-control',
            description: 'Create a remote connection for the CLI session on startup.',
            type: 'CheckBox',
          },
          {
            name: '--add-dir <directory_path>',
            description: 'Add a directory to the workspace (repeatable).',
            type: 'Directory',
          },
          {
            name: '--dangerously-skip-permissions',
            description: 'Auto-approve all tool permission requests without prompting.',
            type: 'CheckBox',
          },
          {
            name: '--disable-slash-commands',
            description: 'Disable slash command and skill expansion in print mode.',
            type: 'CheckBox',
          },
          {
            name: '--sandbox',
            description: 'Run in a sandbox with terminal restrictions enabled.',
            type: 'CheckBox',
          },
          {
            name: '--log-file <file_path>',
            description: 'Override CLI log file path.',
            type: 'File',
          },
          {
            name: '--print-timeout <duration>',
            description: 'Optional time limit for print mode; 0 waits until the turn completes (default: 0s).',
            type: 'Input',
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
            name: 'model',
            description: 'Default model in settings.json.',
            type: 'Input',
            defaultValue: 'Gemini 3.8 Flash (Medium)',
          },
          {
            name: 'colorScheme',
            description:
              'Color theme: "light", "solarized light", "colorblind-friendly light", "dark", "solarized dark", "colorblind-friendly dark", "tokyo night", or "terminal".',
            type: 'DropDown',
            values: [
              'dark',
              'light',
              'solarized light',
              'colorblind-friendly light',
              'solarized dark',
              'colorblind-friendly dark',
              'tokyo night',
              'terminal',
            ],
            defaultValue: 'dark',
          },
          {
            name: 'altScreenMode',
            description: 'Screen buffer usage: "default", "always", or "never".',
            type: 'DropDown',
            values: ['default', 'always', 'never'],
            defaultValue: 'default',
          },
          {
            name: 'verbosity',
            description:
              'Visual verbosity level: "high" (full thoughts and tool outputs) or "low" (minimal indicator).',
            type: 'DropDown',
            values: ['high', 'low'],
            defaultValue: 'high',
          },
          {
            name: 'runningLightSpeed',
            description: 'Progress animation speed: "fast", "medium", "slow", or "off".',
            type: 'DropDown',
            values: ['fast', 'medium', 'slow', 'off'],
            defaultValue: 'medium',
          },
          {
            name: 'showTips',
            description: 'Display helpful agentic tips above the prompt panel during generation turns.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'showFeedbackSurvey',
            description: 'Display periodic quality feedback surveys upon task completions.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'notifications',
            description: 'Emit system desktop and terminal bell notifications upon task completion.',
            type: 'CheckBox',
            defaultValue: true,
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
            type: 'DropDown',
            values: ['request-review', 'proceed-in-sandbox', 'always-proceed', 'strict'],
            defaultValue: 'request-review',
          },
          {
            name: 'artifactReviewPolicy',
            description: 'Code review policy: "asks-for-review", "agent-decides", or "always-proceed".',
            type: 'DropDown',
            values: ['asks-for-review', 'agent-decides', 'always-proceed'],
            defaultValue: 'asks-for-review',
          },
          {
            name: 'enableTerminalSandbox',
            description: 'Restrict all local execution commands launched by agents to OS containment rings.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'allowNonWorkspaceAccess',
            description: 'Permit file read/write tools to navigate outside recognized workspace roots.',
            type: 'CheckBox',
            defaultValue: false,
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
            defaultValue: false,
          },
          {
            name: 'enableTelemetry',
            description: 'Permit metric collection and crash log streaming to improve tool reliability.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'editor',
            description: 'Target text editor utility ("auto", "vim", "emacs", "code").',
            type: 'DropDown',
            values: ['auto', 'vim', 'emacs', 'code'],
            defaultValue: 'auto',
          },
        ],
      },
    ],
  },
];

export default antigravityCliArguments;

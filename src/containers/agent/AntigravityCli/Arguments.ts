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
            description: 'Timeout for print mode wait (default 5m0s).',
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

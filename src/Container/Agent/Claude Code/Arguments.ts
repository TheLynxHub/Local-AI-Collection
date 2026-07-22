import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const claudeCodeArguments: ArgumentsData = [
  {
    category: 'LynxHub Configuration',
    items: [
      {
        name: 'Settings File Location',
        description:
          'Optional path to a claude settings.json file. If set, LynxHub writes JSON here from the Settings section.',
        type: 'File',
      },
    ],
  },
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'Core Authentication',
        items: [
          {
            name: 'ANTHROPIC_API_KEY',
            description: 'Your Anthropic API key used by Claude Code.',
            type: 'Input',
          },
          {
            name: 'ANTHROPIC_AUTH_TOKEN',
            description: 'Custom value for the Authorization header (prefixed with Bearer).',
            type: 'Input',
          },
          {
            name: 'ANTHROPIC_BASE_URL',
            description: 'Override the API endpoint to route requests through a proxy or gateway.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Telemetry & OpenTelemetry',
        items: [
          {
            name: 'CLAUDE_CODE_ENABLE_TELEMETRY',
            description: 'Enable Claude Code telemetry collection when set to 1.',
            type: 'Input',
          },
          {
            name: 'DISABLE_TELEMETRY',
            description: 'Set to 1 to disable telemetry collection.',
            type: 'Input',
          },
          {
            name: 'OTEL_METRICS_EXPORTER',
            description: 'OpenTelemetry metrics exporter (otlp, prometheus, console).',
            type: 'Input',
          },
          {
            name: 'OTEL_LOGS_EXPORTER',
            description: 'OpenTelemetry logs exporter (otlp, console).',
            type: 'Input',
          },
          {
            name: 'OTEL_EXPORTER_OTLP_PROTOCOL',
            description: 'OTLP protocol, usually grpc or http.',
            type: 'Input',
          },
          {
            name: 'OTEL_EXPORTER_OTLP_ENDPOINT',
            description: 'OTLP collector endpoint such as http://localhost:4317.',
            type: 'Input',
          },
          {
            name: 'OTEL_EXPORTER_OTLP_HEADERS',
            description: 'Optional OTLP authentication headers as a single string.',
            type: 'Input',
          },
          {
            name: 'OTEL_METRIC_EXPORT_INTERVAL',
            description: 'Metric export interval in milliseconds.',
            type: 'Input',
          },
          {
            name: 'OTEL_LOGS_EXPORT_INTERVAL',
            description: 'Log export interval in milliseconds.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Vertex AI & Agent Platform',
        items: [
          {
            name: 'CLAUDE_CODE_USE_VERTEX',
            description: 'Set to 1 to enable Google Vertex AI / Agent Platform integration.',
            type: 'Input',
          },
          {
            name: 'CLOUD_ML_REGION',
            description: 'Default Vertex AI region, e.g. global or us-east5.',
            type: 'Input',
          },
          {
            name: 'ANTHROPIC_VERTEX_PROJECT_ID',
            description: 'Google Cloud project ID used for Vertex AI.',
            type: 'Input',
          },
          {
            name: 'DISABLE_PROMPT_CACHING',
            description: 'Set to 1 to disable prompt caching when using Vertex AI.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Amazon Bedrock',
        items: [
          {
            name: 'CLAUDE_CODE_USE_BEDROCK',
            description: 'Set to 1 to enable Amazon Bedrock integration.',
            type: 'Input',
          },
          {
            name: 'AWS_REGION',
            description: 'Default AWS region for Bedrock, e.g. us-east-1.',
            type: 'Input',
          },
          {
            name: 'AWS_PROFILE',
            description: 'Optional AWS profile name to use when calling Bedrock.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Networking & Proxy',
        items: [
          {
            name: 'HTTPS_PROXY',
            description: 'HTTPS proxy URL for Claude Code network traffic.',
            type: 'Input',
          },
          {
            name: 'HTTP_PROXY',
            description: 'HTTP proxy URL for Claude Code network traffic.',
            type: 'Input',
          },
          {
            name: 'NO_PROXY',
            description: 'Space or comma separated list of hosts to bypass the proxy.',
            type: 'Input',
          },
          {
            name: 'API_TIMEOUT_MS',
            description: 'Timeout for API requests in milliseconds (default: 600000).',
            type: 'Input',
          },
          {
            name: 'CLAUDE_CODE_GIT_BASH_PATH',
            description: 'Custom path to bash.exe when using portable Git on Windows.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'AWS Credentials',
        items: [
          {
            name: 'AWS_ACCESS_KEY_ID',
            description: 'AWS access key for Bedrock or other AWS integrations.',
            type: 'Input',
          },
          {
            name: 'AWS_SECRET_ACCESS_KEY',
            description: 'AWS secret access key.',
            type: 'Input',
          },
          {
            name: 'AWS_SESSION_TOKEN',
            description: 'Optional AWS session token when using temporary credentials.',
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
        section: 'Core',
        items: [
          {
            name: '--model <model_name>',
            description: 'Claude model to use for this session (e.g. opus, sonnet, haiku, or a full model name).',
            type: 'Input',
          },
          {
            name: '-p <prompt>',
            description: 'Run in non-interactive print mode and answer the given prompt to standard output.',
            type: 'Input',
          },
          {
            name: '--resume <session_id>',
            description: 'Resume a previous Claude Code session by ID or name.',
            type: 'Input',
          },
          {
            name: '--continue',
            description: 'Continue the most recent session in current directory without prompt.',
            type: 'CheckBox',
          },
          {
            name: '--output-format <format>',
            description: 'Output format for print mode (text, json, stream-json).',
            type: 'Input',
          },
          {
            name: '--effort <level>',
            description: 'Set effort level for session (low, medium, high, xhigh, max, ultracode).',
            type: 'Input',
          },
          {
            name: '--fallback-model <models>',
            description: 'Automatic fallback model(s) when primary model is overloaded (comma-separated).',
            type: 'Input',
          },
          {
            name: '--bg',
            description: 'Start session as a background agent and return immediately.',
            type: 'CheckBox',
          },
          {
            name: '--bare',
            description: 'Minimal mode: skip auto-discovery of hooks, skills, plugins, MCP servers.',
            type: 'CheckBox',
          },
          {
            name: '--safe-mode',
            description: 'Start with all customizations disabled to troubleshoot broken configurations.',
            type: 'CheckBox',
          },
          {
            name: '--worktree <name>',
            description: 'Start Claude in an isolated git worktree at .claude/worktrees/<name>.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Permissions',
        items: [
          {
            name: '--permission-mode <mode>',
            description: 'Permission mode (default, acceptEdits, plan, auto, dontAsk, bypassPermissions, manual).',
            type: 'Input',
          },
          {
            name: '--permission-prompt-tool <tool>',
            description: 'Tool to use when prompting for permissions in print mode, such as mcp_auth_tool.',
            type: 'Input',
          },
          {
            name: '--dangerously-skip-permissions',
            description: 'Skip permission prompts. Equivalent to bypassPermissions mode.',
            type: 'CheckBox',
          },
          {
            name: '--allow-dangerously-skip-permissions',
            description: 'Add bypassPermissions to Shift+Tab mode cycle without starting in it.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Tools and Directories',
        items: [
          {
            name: '--tools <tools>',
            description: 'Restrict which built-in tools Claude can use (e.g. "Bash,Edit,Read").',
            type: 'Input',
          },
          {
            name: '--allowedTools <tools>',
            description: 'Comma or space separated list of tools Claude may use without extra confirmation.',
            type: 'Input',
          },
          {
            name: '--disallowedTools <tools>',
            description: 'Comma or space separated list of tools Claude should not use automatically.',
            type: 'Input',
          },
          {
            name: '--add-dir <dir1,dir2,...>',
            description: 'Additional directories for Claude to treat as part of the workspace.',
            type: 'Directory',
          },
          {
            name: '--system-prompt <prompt>',
            description: 'Replace the entire system prompt with custom text string.',
            type: 'Input',
          },
          {
            name: '--system-prompt-file <file>',
            description: 'File path containing a custom system prompt replacing the default prompt.',
            type: 'File',
          },
          {
            name: '--append-system-prompt <prompt>',
            description: 'Append custom text to the end of default system prompt.',
            type: 'Input',
          },
          {
            name: '--append-system-prompt-file <file>',
            description: 'File path containing text to append to the default system prompt.',
            type: 'File',
          },
          {
            name: '--mcp-config <file>',
            description: 'Load MCP servers from JSON files or strings (space-separated).',
            type: 'File',
          },
          {
            name: '--strict-mcp-config',
            description: 'Only use MCP servers from --mcp-config, ignoring all other MCP configurations.',
            type: 'CheckBox',
          },
          {
            name: '--settings <file>',
            description: 'Path to a settings JSON file or inline JSON overriding settings.json.',
            type: 'File',
          },
        ],
      },
    ],
  },
  {
    category: 'Settings',
    sections: [
      {
        section: 'Core',
        items: [
          {
            name: 'settings.raw',
            description:
              'Optional raw JSON for settings.json. If provided, it is written as-is and other Settings keys are ignored.',
            type: 'Input',
          },
          {
            name: 'model',
            description: 'Default Claude model in settings.json. Used when CLI --model is not provided.',
            type: 'Input',
          },
          {
            name: 'effortLevel',
            description: 'Persist default effort level across sessions (low, medium, high, xhigh).',
            type: 'Input',
          },
          {
            name: 'fallbackModel',
            description: 'Fallback model chain array (e.g. ["sonnet", "haiku"]) when primary is overloaded.',
            type: 'Input',
          },
          {
            name: 'fastMode',
            description: 'Turn fast mode on for sessions where available.',
            type: 'CheckBox',
          },
          {
            name: 'editorMode',
            description: 'Key binding mode for the input prompt (normal, vim).',
            type: 'Input',
          },
          {
            name: 'autoUpdatesChannel',
            description: 'Release channel to follow for updates (latest, stable).',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Permissions',
        items: [
          {
            name: 'permissions.defaultMode',
            description: 'Default permission mode, for example plan or active.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Telemetry & Env',
        items: [
          {
            name: 'env.CLAUDE_CODE_ENABLE_TELEMETRY',
            description: 'Enable telemetry via env section in settings.json.',
            type: 'Input',
          },
          {
            name: 'env.OTEL_METRICS_EXPORTER',
            description: 'Telemetry metrics exporter configured in settings.json env.',
            type: 'Input',
          },
          {
            name: 'env.OTEL_LOGS_EXPORTER',
            description: 'Telemetry logs exporter configured in settings.json env.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Sandbox',
        items: [
          {
            name: 'sandbox.enabled',
            description: 'Enable Claude Code sandbox in settings.json.',
            type: 'CheckBox',
          },
          {
            name: 'sandbox.autoAllowBashIfSandboxed',
            description: 'Automatically allow bash commands when sandbox is enabled.',
            type: 'CheckBox',
          },
          {
            name: 'sandbox.excludedCommands',
            description: 'Commands to exclude from sandbox execution, such as docker.',
            type: 'Input',
          },
          {
            name: 'sandbox.network.allowUnixSockets',
            description: 'Comma separated list of Unix socket paths allowed inside the sandbox.',
            type: 'Input',
          },
          {
            name: 'sandbox.network.allowLocalBinding',
            description: 'Whether local network binding is allowed inside the sandbox.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Plugins & Marketplaces',
        items: [
          {
            name: 'enabledPlugins',
            description: 'JSON map of enabled plugins (plugin@marketplace: true/false).',
            type: 'Input',
          },
          {
            name: 'extraKnownMarketplaces',
            description: 'JSON map defining extra plugin marketplaces for Claude Code.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Status Line',
        items: [
          {
            name: 'statusLine.type',
            description: 'Status line type, usually command.',
            type: 'Input',
          },
          {
            name: 'statusLine.command',
            description: 'Command to generate the status line content.',
            type: 'Input',
          },
          {
            name: 'statusLine.padding',
            description: 'Optional numeric padding value for the status line.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'MCP Servers',
        items: [
          {
            name: 'allowedMcpServers',
            description: 'JSON array or object describing MCP servers that are allowed by managed settings.',
            type: 'Input',
          },
          {
            name: 'deniedMcpServers',
            description: 'JSON array or object describing MCP servers that are denied by managed settings.',
            type: 'Input',
          },
        ],
      },
    ],
  },
];

export default claudeCodeArguments;

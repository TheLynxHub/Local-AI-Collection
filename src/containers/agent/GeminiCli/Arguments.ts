import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const geminiCliArguments: ArgumentsData = [
  {
    category: 'LynxHub Configuration',
    items: [
      {
        name: 'Settings File Location',
        description:
          '!!Please backup your existing settings.json, this will overwrite it!!. Choose a custom location to save your `settings.json` configuration file.',
        type: 'File',
      },
    ],
  },
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'Authentication & API',
        items: [
          {
            name: 'GEMINI_API_KEY',
            description: 'Your API key for the Gemini API.',
            type: 'Input',
          },
          {
            name: 'GOOGLE_API_KEY',
            description: 'Your Google Cloud API key, required for using Vertex AI in express mode.',
            type: 'Input',
          },
          {
            name: 'GOOGLE_CLOUD_PROJECT',
            description: 'Your Google Cloud Project ID, required for using Code Assist or Vertex AI.',
            type: 'Input',
          },
          {
            name: 'GOOGLE_APPLICATION_CREDENTIALS',
            description: 'The path to your Google Application Credentials JSON file.',
            type: 'File',
          },
          {
            name: 'GOOGLE_CLOUD_LOCATION',
            description:
              'Your Google Cloud Project Location (e.g., us-central1), required for using Vertex AI in non-express mode.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Configuration',
        items: [
          {
            name: 'GEMINI_MODEL',
            description: 'Specifies the default Gemini model to use.',
            type: 'Input',
          },
          {
            name: 'GEMINI_SANDBOX',
            description:
              'Alternative to the `sandbox` setting. Accepts true, false, docker, podman, or a custom command string.',
            type: 'Input',
          },
          {
            name: 'SEATBELT_PROFILE',
            description: 'Switches the Seatbelt (`sandbox-exec`) profile on macOS.',
            type: 'DropDown',
            defaultValue: 'permissive-open',
            values: ['permissive-open', 'strict'],
          },
          {
            name: 'CLI_TITLE',
            description: 'Set a custom title for the CLI window.',
            type: 'Input',
          },
          {
            name: 'CODE_ASSIST_ENDPOINT',
            description: 'Specifies the endpoint for the code assist server.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Telemetry',
        items: [
          {
            name: 'OTLP_GOOGLE_CLOUD_PROJECT',
            description: 'Your Google Cloud Project ID for Telemetry in Google Cloud.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Debugging & Display',
        items: [
          {
            name: 'DEBUG',
            description: 'Set to true or 1 to enable verbose debug logging.',
            type: 'Input',
          },
          {
            name: 'DEBUG_MODE',
            description: 'Set to true or 1 to enable verbose debug logging.',
            type: 'Input',
          },
          {
            name: 'NO_COLOR',
            description: 'Set to any value to disable all color output in the CLI.',
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
        section: 'Core Functionality',
        items: [
          {
            name: '--model <model_name>',
            description: 'Specifies the Gemini model to use for this session.',
            type: 'Input',
          },
          {
            name: '--prompt <your_prompt>',
            description: 'Pass a prompt directly to the command for non-interactive mode.',
            type: 'Input',
          },
          {
            name: '--prompt-interactive <your_prompt>',
            description: 'Starts an interactive session with the provided prompt as the initial input.',
            type: 'Input',
          },
          {
            name: '--all-files',
            description: 'Recursively includes all files within the current directory as context.',
            type: 'CheckBox',
          },
          {
            name: '--include-directories <dir1,dir2,...>',
            description: 'Includes additional directories in the workspace for multi-directory support.',
            type: 'Directory',
          },
        ],
      },
      {
        section: 'Tool & Sandbox Control',
        items: [
          {
            name: '--sandbox',
            description: 'Enables sandbox mode for this session.',
            type: 'CheckBox',
          },
          {
            name: '--sandbox-image',
            description: 'Sets the sandbox image URI.',
            type: 'Input',
          },
          {
            name: '--yolo',
            description: 'Enables YOLO mode, which automatically approves all tool calls.',
            type: 'CheckBox',
          },
          {
            name: '--approval-mode <mode>',
            description: 'Sets the approval mode for tool calls.',
            type: 'DropDown',
            values: ['default', 'auto_edit', 'yolo'],
          },
          {
            name: '--allowed-tools <tool1,tool2,...>',
            description: 'A comma-separated list of tool names that will bypass the confirmation dialog.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Telemetry & Checkpointing',
        items: [
          {
            name: '--telemetry',
            description: 'Enables telemetry.',
            type: 'CheckBox',
          },
          {
            name: '--telemetry-target',
            description: 'Sets the telemetry target.',
            type: 'Input',
          },
          {
            name: '--telemetry-otlp-endpoint',
            description: 'Sets the OTLP endpoint for telemetry.',
            type: 'Input',
          },
          {
            name: '--telemetry-otlp-protocol',
            description: 'Sets the OTLP protocol for telemetry.',
            type: 'DropDown',
            defaultValue: 'grpc',
            values: ['grpc', 'http'],
          },
          {
            name: '--telemetry-log-prompts',
            description: 'Enables logging of prompts for telemetry.',
            type: 'CheckBox',
          },
          {
            name: '--checkpointing',
            description: 'Enables checkpointing.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Extensions & Display',
        items: [
          {
            name: '--extensions <extension_name ...>',
            description: 'Specifies a list of extensions to use for the session.',
            type: 'Input',
          },
          {
            name: '--list-extensions',
            description: 'Lists all available extensions and exits.',
            type: 'CheckBox',
          },
          {
            name: '--proxy',
            description: 'Sets the proxy for the CLI.',
            type: 'Input',
          },
          {
            name: '--screen-reader',
            description: 'Enables screen reader mode for better TUI compatibility.',
            type: 'CheckBox',
          },
          {
            name: '--show-memory-usage',
            description: 'Displays the current memory usage.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Help & Version',
        items: [
          {
            name: '--debug',
            description: 'Enables debug mode for this session, providing more verbose output.',
            type: 'CheckBox',
          },
          {
            name: '--help',
            description: 'Displays help information about command-line arguments.',
            type: 'CheckBox',
          },
          {
            name: '--version',
            description: 'Displays the version of the CLI.',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
  {
    category: 'Settings',
    condition: 'Settings File Location',
    sections: [
      {
        section: 'general',
        items: [
          {
            name: 'general.preferredEditor',
            description: 'The preferred editor to open files in.',
            type: 'Input',
          },
          {
            name: 'general.vimMode',
            description: 'Enable Vim keybindings.',
            type: 'CheckBox',
          },
          {
            name: 'general.disableAutoUpdate',
            description: 'Disable automatic updates.',
            type: 'CheckBox',
          },
          {
            name: 'general.disableUpdateNag',
            description: 'Disable update notification prompts.',
            type: 'CheckBox',
          },
          {
            name: 'general.checkpointing.enabled',
            description: 'Enable session checkpointing for recovery.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'ui',
        items: [
          {
            name: 'ui.theme',
            description: 'The color theme for the UI.',
            type: 'DropDown',
            values: [
              'ANSI',
              'ANSI Light',
              'Atom One',
              'Ayu',
              'Ayu Light',
              'Default',
              'Default Light',
              'Dracula',
              'GitHub',
              'GitHub Light',
              'Google Code',
              'Xcode',
            ],
            defaultValue: 'Default',
          },
          {
            name: 'ui.customThemes',
            description: 'Custom theme definitions.',
            type: 'Input',
            defaultValue: {},
          },
          {
            name: 'ui.hideWindowTitle',
            description: 'Hide the window title bar.',
            type: 'CheckBox',
          },
          {
            name: 'ui.hideTips',
            description: 'Hide helpful tips in the UI.',
            type: 'CheckBox',
          },
          {
            name: 'ui.hideBanner',
            description: 'Hide the application banner.',
            type: 'CheckBox',
          },
          {
            name: 'ui.hideFooter',
            description: 'Hide the footer from the UI.',
            type: 'CheckBox',
          },
          {
            name: 'ui.showMemoryUsage',
            description: 'Display memory usage information in the UI.',
            type: 'CheckBox',
          },
          {
            name: 'ui.showLineNumbers',
            description: 'Show line numbers in the chat.',
            type: 'CheckBox',
          },
          {
            name: 'ui.showCitations',
            description: 'Show citations for generated text in the chat.',
            type: 'CheckBox',
          },
          {
            name: 'ui.accessibility.disableLoadingPhrases',
            description: 'Disable loading phrases for accessibility.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'ide',
        items: [
          {
            name: 'ide.enabled',
            description: 'Enable IDE integration mode.',
            type: 'CheckBox',
          },
          {
            name: 'ide.hasSeenNudge',
            description: 'Whether the user has seen the IDE integration nudge.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'privacy',
        items: [
          {
            name: 'privacy.usageStatisticsEnabled',
            description: 'Enable collection of usage statistics.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'model',
        items: [
          {
            name: 'model.name',
            description: 'The Gemini model to use for conversations.',
            type: 'Input',
          },
          {
            name: 'model.maxSessionTurns',
            description: 'Maximum number of user/model/tool turns to keep in a session. -1 means unlimited.',
            type: 'Input',
            defaultValue: -1,
          },
          {
            name: 'model.summarizeToolOutput',
            description: 'Enables or disables the summarization of tool output.',
            type: 'Input',
          },
          {
            name: 'model.chatCompression.contextPercentageThreshold',
            description:
              "Sets the threshold for chat history compression as a percentage of the model's total token limit.",
            type: 'Input',
            defaultValue: 0.7,
          },
          {
            name: 'model.skipNextSpeakerCheck',
            description: 'Skip the next speaker check.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'context',
        items: [
          {
            name: 'context.fileName',
            description: 'The name of the context file(s).',
            type: 'File',
          },
          {
            name: 'context.importFormat',
            description: 'The format to use when importing memory.',
            type: 'Input',
          },
          {
            name: 'context.discoveryMaxDirs',
            description: 'Maximum number of directories to search for memory.',
            type: 'Input',
            defaultValue: 200,
          },
          {
            name: 'context.includeDirectories',
            description: 'Additional directories to include in the workspace context.',
            type: 'Directory',
            defaultValue: [],
          },
          {
            name: 'context.loadFromIncludeDirectories',
            description: 'If true, /memory refresh loads GEMINI.md from all added directories.',
            type: 'CheckBox',
          },
          {
            name: 'context.fileFiltering.respectGitIgnore',
            description: 'Respect .gitignore files when searching.',
            type: 'CheckBox',
          },
          {
            name: 'context.fileFiltering.respectGeminiIgnore',
            description: 'Respect .geminiignore files when searching.',
            type: 'CheckBox',
          },
          {
            name: 'context.fileFiltering.enableRecursiveFileSearch',
            description: 'Enable searching recursively for filenames when completing @ prefixes.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'tools',
        items: [
          {
            name: 'tools.sandbox',
            description: 'Sandbox execution environment (can be a boolean or a path string).',
            type: 'Input',
          },
          {
            name: 'tools.usePty',
            description: 'Use node-pty for shell command execution.',
            type: 'CheckBox',
          },
          {
            name: 'tools.core',
            description: 'Restricts the set of built-in tools with an allowlist.',
            type: 'Input',
          },
          {
            name: 'tools.exclude',
            description: 'Tool names to exclude from discovery.',
            type: 'Input',
          },
          {
            name: 'tools.allowed',
            description: 'A list of tool names that will bypass the confirmation dialog.',
            type: 'Input',
          },
          {
            name: 'tools.discoveryCommand',
            description: 'Command to run for tool discovery.',
            type: 'Input',
          },
          {
            name: 'tools.callCommand',
            description: 'Defines a custom shell command for calling a specific tool.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'mcp',
        items: [
          {
            name: 'mcp.serverCommand',
            description: 'Command to start an MCP server.',
            type: 'Input',
          },
          {
            name: 'mcp.allowed',
            description: 'An allowlist of MCP servers to allow.',
            type: 'Input',
          },
          {
            name: 'mcp.excluded',
            description: 'A denylist of MCP servers to exclude.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'security',
        items: [
          {
            name: 'security.folderTrust.enabled',
            description: 'Setting to track whether Folder trust is enabled.',
            type: 'CheckBox',
          },
          {
            name: 'security.auth.selectedType',
            description: 'The currently selected authentication type.',
            type: 'Input',
          },
          {
            name: 'security.auth.enforcedType',
            description: 'The required auth type (useful for enterprises).',
            type: 'Input',
          },
          {
            name: 'security.auth.useExternal',
            description: 'Whether to use an external authentication flow.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'advanced',
        items: [
          {
            name: 'advanced.autoConfigureMemory',
            description: 'Automatically configure Node.js memory limits.',
            type: 'CheckBox',
          },
          {
            name: 'advanced.dnsResolutionOrder',
            description: 'The DNS resolution order.',
            type: 'Input',
          },
          {
            name: 'advanced.excludedEnvVars',
            description: 'Environment variables to exclude from project context.',
            type: 'Input',
            defaultValue: ['DEBUG', 'DEBUG_MODE'],
          },
          {
            name: 'advanced.bugCommand',
            description: 'Configuration for the bug report command.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'telemetry',
        items: [
          {
            name: 'telemetry.enabled',
            description: 'Whether or not telemetry is enabled.',
            type: 'CheckBox',
          },
          {
            name: 'telemetry.target',
            description: 'The destination for collected telemetry.',
            type: 'DropDown',
            values: ['local', 'gcp'],
          },
          {
            name: 'telemetry.otlpEndpoint',
            description: 'The endpoint for the OTLP Exporter.',
            type: 'Input',
          },
          {
            name: 'telemetry.otlpProtocol',
            description: 'The protocol for the OTLP Exporter.',
            type: 'DropDown',
            values: ['grpc', 'http'],
          },
          {
            name: 'telemetry.logPrompts',
            description: 'Whether or not to include the content of user prompts in the logs.',
            type: 'CheckBox',
          },
          {
            name: 'telemetry.outfile',
            description: 'The file to write telemetry to when target is local.',
            type: 'File',
          },
        ],
      },
    ],
  },
];

export default geminiCliArguments;

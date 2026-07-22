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
            description: 'API key for OpenRouter provider (recommended for multi-model access).',
            type: 'Input',
          },
          {
            name: 'OPENAI_API_KEY',
            description: 'API key for OpenAI or custom OpenAI-compatible endpoints.',
            type: 'Input',
          },
          {
            name: 'OPENAI_BASE_URL',
            description: 'Base URL for custom OpenAI-compatible endpoints (vLLM, SGLang, Ollama, etc.).',
            type: 'Input',
          },
          {
            name: 'ANTHROPIC_API_KEY',
            description: 'API key for Anthropic Console / Claude provider.',
            type: 'Input',
          },
          {
            name: 'ANTHROPIC_BASE_URL',
            description: 'Override base URL for Anthropic-compatible endpoints.',
            type: 'Input',
          },
          {
            name: 'GOOGLE_API_KEY',
            description: 'API key for Google AI Studio / Gemini provider (alias: GEMINI_API_KEY).',
            type: 'Input',
          },
          {
            name: 'DEEPSEEK_API_KEY',
            description: 'API key for direct DeepSeek access.',
            type: 'Input',
          },
          {
            name: 'FIREWORKS_API_KEY',
            description: 'API key for Fireworks AI provider.',
            type: 'Input',
          },
          {
            name: 'GLM_API_KEY',
            description: 'API key for z.ai / ZhipuAI GLM provider (alias: ZAI_API_KEY).',
            type: 'Input',
          },
          {
            name: 'KIMI_API_KEY',
            description: 'API key for Kimi / Moonshot AI provider.',
            type: 'Input',
          },
          {
            name: 'DASHSCOPE_API_KEY',
            description: 'API key for Qwen Cloud (Alibaba DashScope) provider.',
            type: 'Input',
          },
          {
            name: 'MINIMAX_API_KEY',
            description: 'API key for MiniMax provider.',
            type: 'Input',
          },
          {
            name: 'XAI_API_KEY',
            description: 'API key for xAI (Grok) provider.',
            type: 'Input',
          },
          {
            name: 'MISTRAL_API_KEY',
            description: 'API key for Mistral provider (Voxtral STT & TTS).',
            type: 'Input',
          },
          {
            name: 'OLLAMA_API_KEY',
            description: 'API key for Ollama Cloud provider.',
            type: 'Input',
          },
          {
            name: 'OLLAMA_BASE_URL',
            description: 'Base URL for local or remote Ollama server (default: http://localhost:11434).',
            type: 'Input',
          },
          {
            name: 'NVIDIA_API_KEY',
            description: 'API key for NVIDIA NIM provider.',
            type: 'Input',
          },
          {
            name: 'COPILOT_GITHUB_TOKEN',
            description: 'GitHub token for GitHub Copilot API integration.',
            type: 'Input',
          },
          {
            name: 'AZURE_FOUNDRY_API_KEY',
            description: 'API key for Microsoft Azure Foundry / Azure OpenAI.',
            type: 'Input',
          },
          {
            name: 'HERMES_YOLO_MODE',
            description: 'Set to 1 or true to enable auto-approval of all command prompts.',
            type: 'Input',
          },
          {
            name: 'HERMES_MODEL',
            description: 'Override default model name at process level.',
            type: 'Input',
          },
          {
            name: 'HERMES_HOME',
            description: 'Override Hermes config and state directory (default: ~/.hermes).',
            type: 'Directory',
          },
        ],
      },
      {
        section: 'Tool & Integration APIs',
        items: [
          {
            name: 'FIRECRAWL_API_KEY',
            description: 'API key for Firecrawl web scraping, search, and cloud browser.',
            type: 'Input',
          },
          {
            name: 'FIRECRAWL_API_URL',
            description: 'Custom Firecrawl API endpoint for self-hosted instances.',
            type: 'Input',
          },
          {
            name: 'PARALLEL_API_KEY',
            description: 'API key for Parallel AI search.',
            type: 'Input',
          },
          {
            name: 'TAVILY_API_KEY',
            description: 'API key for Tavily AI web search.',
            type: 'Input',
          },
          {
            name: 'SEARXNG_URL',
            description: 'SearXNG instance URL for free self-hosted web search.',
            type: 'Input',
          },
          {
            name: 'EXA_API_KEY',
            description: 'API key for Exa AI search.',
            type: 'Input',
          },
          {
            name: 'BRAVE_SEARCH_API_KEY',
            description: 'API key for Brave Search.',
            type: 'Input',
          },
          {
            name: 'BROWSERBASE_API_KEY',
            description: 'API key for Browserbase cloud browser.',
            type: 'Input',
          },
          {
            name: 'BROWSER_USE_API_KEY',
            description: 'API key for Browser Use cloud browser.',
            type: 'Input',
          },
          {
            name: 'FAL_KEY',
            description: 'API key for FAL image generation.',
            type: 'Input',
          },
          {
            name: 'KREA_API_KEY',
            description: 'API key for Krea 2 image generation.',
            type: 'Input',
          },
          {
            name: 'GROQ_API_KEY',
            description: 'API key for Groq Whisper speech-to-text.',
            type: 'Input',
          },
          {
            name: 'ELEVENLABS_API_KEY',
            description: 'API key for ElevenLabs premium TTS voices.',
            type: 'Input',
          },
          {
            name: 'HONCHO_API_KEY',
            description: 'API key for Honcho user modeling memory system.',
            type: 'Input',
          },
          {
            name: 'SUPERMEMORY_API_KEY',
            description: 'API key for Supermemory semantic long-term memory.',
            type: 'Input',
          },
          {
            name: 'DAYTONA_API_KEY',
            description: 'API key for Daytona cloud sandboxes.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Messaging Platforms',
        items: [
          {
            name: 'TELEGRAM_BOT_TOKEN',
            description: 'Bot token from @BotFather for Telegram gateway.',
            type: 'Input',
          },
          {
            name: 'TELEGRAM_ALLOWED_USERS',
            description: 'Comma-separated list of allowed Telegram user IDs.',
            type: 'Input',
          },
          {
            name: 'DISCORD_BOT_TOKEN',
            description: 'Bot token for Discord gateway.',
            type: 'Input',
          },
          {
            name: 'DISCORD_ALLOWED_USERS',
            description: 'Comma-separated list of allowed Discord user IDs.',
            type: 'Input',
          },
          {
            name: 'SLACK_BOT_TOKEN',
            description: 'Bot token (xoxb-...) for Slack gateway.',
            type: 'Input',
          },
          {
            name: 'SLACK_APP_TOKEN',
            description: 'App-level token (xapp-...) for Slack Socket Mode.',
            type: 'Input',
          },
          {
            name: 'SLACK_ALLOWED_USERS',
            description: 'Comma-separated list of allowed Slack user IDs.',
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
          {
            name: 'NO_PROXY',
            description: 'Comma-separated domain or IP list to bypass proxy.',
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
            description: 'Specify LLM provider and model (e.g. openrouter:anthropic/claude-sonnet-4).',
            type: 'Input',
          },
          {
            name: '--provider <provider_name>',
            description: 'Force a specific provider (openrouter, nous, anthropic, openai-api, gemini, etc.).',
            type: 'Input',
          },
          {
            name: '-q <prompt>',
            description: 'Run a single prompt non-interactively and exit.',
            type: 'Input',
          },
          {
            name: '-p <prompt>',
            description: 'Run a single prompt non-interactively and exit.',
            type: 'Input',
          },
          {
            name: '-z <prompt>',
            description: 'Scripted one-shot mode (single prompt in, plain response text out, no banner/spinner).',
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
            name: '--toolsets <toolsets>',
            description: 'Enable a comma-separated set of toolsets (e.g. web,terminal,skills).',
            type: 'Input',
          },
          {
            name: '--skills <skills>',
            description: 'Preload one or more skills for the session (comma-separated).',
            type: 'Input',
          },
          {
            name: '--resume <session_id>',
            description: 'Resume a previous session by ID or title.',
            type: 'Input',
          },
          {
            name: '--continue [name]',
            description: 'Resume the most recent session, or session matching title.',
            type: 'Input',
          },
          {
            name: '--worktree',
            description: 'Start in an isolated git worktree for parallel-agent workflows.',
            type: 'CheckBox',
          },
          {
            name: '--checkpoints',
            description: 'Enable filesystem checkpoints before destructive file changes.',
            type: 'CheckBox',
          },
          {
            name: '--pass-session-id',
            description: 'Include the session ID in the agent system prompt.',
            type: 'CheckBox',
          },
          {
            name: '--ignore-user-config',
            description: 'Ignore ~/.hermes/config.yaml and fall back to built-in defaults.',
            type: 'CheckBox',
          },
          {
            name: '--ignore-rules',
            description: 'Skip auto-injection of AGENTS.md, SOUL.md, .cursorrules, memory, and skills.',
            type: 'CheckBox',
          },
          {
            name: '--safe-mode',
            description: 'Troubleshooting mode: disable ALL user config, rules, plugins, shell hooks, and MCP servers.',
            type: 'CheckBox',
          },
          {
            name: '--tui',
            description: 'Launch the TUI interface instead of classic CLI REPL.',
            type: 'CheckBox',
          },
          {
            name: '--cli',
            description: 'Force classic prompt_toolkit REPL interface.',
            type: 'CheckBox',
          },
          {
            name: '--source <source>',
            description: 'Session source tag for filtering (default: cli).',
            type: 'Input',
          },
          {
            name: '--max-turns <turns>',
            description: 'Maximum tool-calling iterations per turn.',
            type: 'Number',
          },
          {
            name: '--profile <profile_name>',
            description: 'Select which Hermes profile to use for this invocation.',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Display & Help Options',
        items: [
          {
            name: '-v',
            description: 'Enable verbose logging output.',
            type: 'CheckBox',
          },
          {
            name: '-Q',
            description: 'Programmatic quiet mode: suppress banner, spinner, and tool previews.',
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
    condition: 'Settings File Location',
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
          {
            name: 'updates.pre_update_backup',
            description: 'Pre-update safety backup mode before running hermes update.',
            type: 'DropDown',
            defaultValue: 'quick',
            values: ['quick', 'full', 'off'],
          },
        ],
      },
      {
        section: 'Terminal Environment & Sandboxing',
        items: [
          {
            name: 'terminal.backend',
            description: 'Execution backend for terminal commands (local, docker, ssh, modal, daytona, singularity).',
            type: 'DropDown',
            defaultValue: 'local',
            values: ['local', 'docker', 'ssh', 'modal', 'daytona', 'singularity'],
          },
          {
            name: 'terminal.timeout',
            description: 'Per-command execution timeout in seconds.',
            type: 'Number',
            defaultValue: 180,
          },
          {
            name: 'terminal.home_mode',
            description: 'Subprocess HOME directory policy for launched tools.',
            type: 'DropDown',
            defaultValue: 'auto',
            values: ['auto', 'real', 'profile'],
          },
          {
            name: 'terminal.persistent_shell',
            description: 'Maintain a long-lived bash shell process across commands (default true for SSH).',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'terminal.docker_image',
            description: 'Docker container image for Docker terminal backend.',
            type: 'Input',
            defaultValue: 'nikolaik/python-nodejs:python3.11-nodejs20',
          },
          {
            name: 'terminal.docker_run_as_host_user',
            description: 'Run Docker container as host UID:GID to avoid root file ownership issues.',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'terminal.docker_network',
            description: 'Enable network access inside Docker container (false = air-gap with --network=none).',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'Memory & Context Controls',
        items: [
          {
            name: 'memory.memory_enabled',
            description: 'Enable persistent long-term memory system.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'memory.user_profile_enabled',
            description: 'Enable automatic user profile modeling across sessions.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'memory.write_approval',
            description: 'Require user approval before staging or writing memory entries.',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'skills.guard_agent_created',
            description: 'Scan agent-created skills for dangerous keyword patterns.',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'skills.write_approval',
            description: 'Gate all agent skill creations and modifications behind explicit review.',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'context_file_max_chars',
            description: 'Maximum character limit for loaded context files (SOUL.md, AGENTS.md, etc.).',
            type: 'Number',
            defaultValue: 20000,
          },
          {
            name: 'file_read_max_chars',
            description: 'Maximum character limit per single read_file tool call.',
            type: 'Number',
            defaultValue: 100000,
          },
          {
            name: 'worktree',
            description: 'Automatically run in an isolated git worktree per session.',
            type: 'CheckBox',
            defaultValue: false,
          },
        ],
      },
      {
        section: 'Tool Output Truncation',
        items: [
          {
            name: 'tool_output.max_bytes',
            description: 'Maximum character cap for terminal tool output before truncation.',
            type: 'Number',
            defaultValue: 50000,
          },
          {
            name: 'tool_output.max_lines',
            description: 'Maximum line limit for read_file pagination.',
            type: 'Number',
            defaultValue: 2000,
          },
          {
            name: 'tool_output.max_line_length',
            description: 'Maximum character length per line in line-numbered read_file views.',
            type: 'Number',
            defaultValue: 2000,
          },
        ],
      },
    ],
  },
];

export default hermesAgentArguments;

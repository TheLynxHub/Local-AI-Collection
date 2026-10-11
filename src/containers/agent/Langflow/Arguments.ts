import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const langflowArguments: ArgumentsData = [
  {
    category: 'General',
    sections: [
      {
        section: 'Server & Execution',
        items: [
          {
            name: 'PORT',
            description: 'The HTTP port Langflow runs on',
            type: 'Number',
            defaultValue: 7860,
            numberMin: 1,
            numberMax: 65535,
          },
          {
            name: 'HOST',
            description: 'The host address to bind the server to',
            type: 'Input',
            defaultValue: '127.0.0.1',
          },
          {
            name: '--deployment-profile',
            description: "Deployment profile: 'dev' or 'prod' (runs fail-loud production infrastructure checks)",
            type: 'DropDown',
            values: ['dev', 'prod'],
            defaultValue: 'dev',
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
            name: '--dev',
            description: 'Run in development mode (may contain experimental features)',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: '--frontend-path',
            description: 'Path to custom frontend directory containing build files',
            type: 'Directory',
          },
          {
            name: '--store',
            description: 'Enables store features',
            type: 'CheckBox',
          },
          {
            name: '--auto-saving',
            description: 'Defines if auto save is enabled',
            type: 'CheckBox',
          },
          {
            name: '--auto-saving-interval',
            description: 'Debounce time for auto save in milliseconds',
            type: 'Number',
            numberMin: 0,
          },
          {
            name: '--max-file-size-upload',
            description: 'Maximum file size allowed for upload in MB',
            type: 'Number',
            numberMin: 1,
          },
          {
            name: '--health-check-max-retries',
            description: 'Number of retries for the server health check',
            type: 'Number',
            numberMin: 0,
          },
          {
            name: '--webhook-polling-interval',
            description: 'Polling interval for webhooks in seconds',
            type: 'Number',
            numberMin: 1,
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
            description: 'Log rotation rule (e.g. 10 MB or 1 day)',
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
            type: 'Number',
            numberMin: 1,
          },
          {
            name: '--worker-timeout',
            description: 'Worker process timeout in seconds',
            type: 'Number',
            numberMin: 1,
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
  {
    category: 'Database & Storage',
    sections: [
      {
        section: 'Database Configuration',
        items: [
          {
            name: 'LANGFLOW_DATABASE_URL',
            description: 'Database connection URL (SQLite or PostgreSQL)',
            type: 'Input',
            defaultValue: 'sqlite:///./langflow.db',
          },
          {
            name: 'LANGFLOW_CONFIG_DIR',
            description: 'Directory where files, logs, and database are stored',
            type: 'Directory',
          },
          {
            name: 'LANGFLOW_SAVE_DB_IN_CONFIG_DIR',
            description: 'Save database in the config directory instead of root',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'LANGFLOW_DATABASE_CONNECTION_RETRY',
            description: 'Retry database connection if initial attempt fails',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'LANGFLOW_STORE_ENVIRONMENT_VARIABLES',
            description: 'Store environment variables securely in the database',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
  {
    category: 'Authentication & Security',
    sections: [
      {
        section: 'Authentication',
        items: [
          {
            name: 'LANGFLOW_AUTO_LOGIN',
            description: 'Enable automatic login without credentials',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'LANGFLOW_SUPERUSER',
            description: 'Superuser username for administrative login',
            type: 'Input',
          },
          {
            name: 'LANGFLOW_SUPERUSER_PASSWORD',
            description: 'Superuser password for administrative login',
            type: 'Input',
          },
          {
            name: 'LANGFLOW_ENABLE_SUPERUSER_CLI',
            description: 'Allow superuser creation via CLI',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'LANGFLOW_API_KEY_SOURCE',
            description: 'Source for validating API keys (database or environment variable)',
            type: 'DropDown',
            values: ['db', 'env'],
            defaultValue: 'db',
          },
          {
            name: 'LANGFLOW_API_KEY',
            description: "Static API key when LANGFLOW_API_KEY_SOURCE is set to 'env'",
            type: 'Input',
          },
          {
            name: '--remove-api-keys',
            description: 'Remove API keys from projects saved in the database',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Security & Rate Limiting',
        items: [
          {
            name: 'LANGFLOW_RATE_LIMIT_PER_MINUTE',
            description: 'Number of login attempts allowed per minute per IP',
            type: 'Number',
            defaultValue: 5,
            numberMin: 1,
          },
          {
            name: 'LANGFLOW_PUBLIC_FLOW_RATE_LIMIT_PER_MINUTE',
            description: 'Number of anonymous public-flow runs allowed per minute per IP',
            type: 'Number',
            defaultValue: 20,
            numberMin: 1,
          },
          {
            name: 'LANGFLOW_RATE_LIMIT_STORAGE_URI',
            description: 'Storage backend for rate limit counters (memory:// or redis://host:port)',
            type: 'Input',
            defaultValue: 'memory://',
          },
          {
            name: 'LANGFLOW_RATE_LIMIT_TRUST_PROXY',
            description: 'Trust X-Forwarded-For header for client IP when behind a trusted proxy',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'LANGFLOW_SSRF_PROTECTION_ENABLED',
            description: 'Block requests to private IP ranges, localhost, and cloud metadata endpoints',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'LANGFLOW_SSRF_ALLOWED_HOSTS',
            description: 'Comma-separated list of allowed hosts/IPs/CIDRs when SSRF protection is enabled',
            type: 'Input',
          },
        ],
      },
    ],
  },
  {
    category: 'Cache & Queue',
    sections: [
      {
        section: 'Cache & Job Queue',
        items: [
          {
            name: 'LANGFLOW_CACHE_TYPE',
            description: 'Cache storage backend type',
            type: 'DropDown',
            values: ['memory', 'redis', 'async'],
            defaultValue: 'memory',
          },
          {
            name: '--cache',
            description: 'LangChain cache type to use',
            type: 'DropDown',
            values: ['InMemoryCache', 'SQLiteCache'],
          },
          {
            name: 'LANGFLOW_JOB_QUEUE_TYPE',
            description: 'Job queue type for background task execution (redis required for multi-worker)',
            type: 'DropDown',
            values: ['in-memory', 'redis'],
            defaultValue: 'in-memory',
          },
          {
            name: 'LANGFLOW_REDIS_HOST',
            description: 'Redis server hostname for cache and queue',
            type: 'Input',
            defaultValue: 'localhost',
          },
          {
            name: 'LANGFLOW_REDIS_PORT',
            description: 'Redis server port',
            type: 'Number',
            defaultValue: 6379,
            numberMin: 1,
            numberMax: 65535,
          },
          {
            name: 'LANGFLOW_REDIS_DB',
            description: 'Redis database index',
            type: 'Number',
            defaultValue: 0,
            numberMin: 0,
          },
          {
            name: 'LANGFLOW_REDIS_CACHE_EXPIRE',
            description: 'Redis cache expiration TTL in seconds',
            type: 'Number',
            defaultValue: 3600,
            numberMin: 1,
          },
        ],
      },
    ],
  },
  {
    category: 'MCP',
    sections: [
      {
        section: 'Model Context Protocol',
        items: [
          {
            name: 'LANGFLOW_MCP_COMPOSER_ENABLED',
            description: 'Enable MCP composer feature in MCP projects',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'LANGFLOW_MCP_SESSION_CLEANUP_INTERVAL',
            description: 'Interval in seconds to scan for and reap idle MCP sessions (minimum 30)',
            type: 'Number',
            defaultValue: 120,
            numberMin: 30,
          },
          {
            name: 'LANGFLOW_MCP_SESSION_IDLE_TIMEOUT',
            description: 'Seconds of inactivity before closing an idle MCP session',
            type: 'Number',
            defaultValue: 400,
            numberMin: 1,
          },
          {
            name: 'LANGFLOW_MCP_MAX_SESSIONS_PER_SERVER',
            description: 'Maximum concurrent live sessions per MCP server URL/command',
            type: 'Number',
            defaultValue: 10,
            numberMin: 1,
          },
        ],
      },
    ],
  },
];

export default langflowArguments;

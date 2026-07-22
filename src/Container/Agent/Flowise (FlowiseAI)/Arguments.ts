import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const flowiseArguments: ArgumentsData = [
  {
    category: 'General',
    sections: [
      {
        section: 'Basic Configuration',
        items: [
          {
            name: '--PORT',
            description: 'The HTTP port Flowise runs on',
            type: 'Input',
            defaultValue: 3000,
          },
          {
            name: '--APP_URL',
            description: 'Public application URL',
            type: 'Input',
            defaultValue: 'http://localhost:3000',
          },
          {
            name: '--CORS_ORIGINS',
            description: 'The allowed origins for all cross-origin HTTP calls',
            type: 'Input',
          },
          {
            name: '--CORS_ALLOW_CREDENTIALS',
            description: 'Allow credentials for cross-origin HTTP requests',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: '--MCP_CORS_ORIGINS',
            description: 'The allowed origins for MCP server cross-origin HTTP calls',
            type: 'Input',
          },
          {
            name: '--IFRAME_ORIGINS',
            description: 'The allowed origins for iframe src embedding',
            type: 'Input',
          },
          {
            name: '--FLOWISE_USERNAME',
            description: 'Username to login',
            type: 'Input',
          },
          {
            name: '--FLOWISE_PASSWORD',
            description: 'Password to login',
            type: 'Input',
          },
          {
            name: '--FLOWISE_FILE_SIZE_LIMIT',
            description: 'Upload File Size Limit',
            type: 'Input',
            defaultValue: '50mb',
          },
          {
            name: '--NUMBER_OF_PROXIES',
            description: 'Rate Limit Proxy count',
            type: 'Input',
            defaultValue: 1,
          },
        ],
      },
      {
        section: 'Logging',
        items: [
          {
            name: '--DEBUG',
            description: 'Print logs from components',
            type: 'CheckBox',
          },
          {
            name: '--LOG_PATH',
            description: 'Location where log files are stored',
            type: 'Input',
            defaultValue: 'your-path/Flowise/logs',
          },
          {
            name: '--LOG_LEVEL',
            description: 'Different levels of logs',
            type: 'DropDown',
            values: ['error', 'warn', 'info', 'verbose', 'debug'],
            defaultValue: 'info',
          },
          {
            name: '--LOG_JSON_SPACES',
            description: 'Spaces to beautify JSON logs',
            type: 'Input',
            defaultValue: 2,
          },
          {
            name: '--LOG_SANITIZE_BODY_FIELDS',
            description: 'Comma-separated list of request body fields to sanitize in logs',
            type: 'Input',
            defaultValue:
              'password,pwd,pass,secret,token,apikey,api_key,accesstoken,access_token,refreshtoken,' +
              'refresh_token,clientsecret,client_secret,privatekey,private_key,secretkey,secret_key,' +
              'auth,authorization,credential,credentials',
          },
          {
            name: '--LOG_SANITIZE_HEADER_FIELDS',
            description: 'Comma-separated list of HTTP header fields to sanitize in logs',
            type: 'Input',
            defaultValue: 'authorization,x-api-key,x-auth-token,cookie',
          },
        ],
      },

      {
        section: 'Tool Function Dependencies',
        items: [
          {
            name: '--TOOL_FUNCTION_BUILTIN_DEP',
            description: 'NodeJS built-in modules to be used for Tool Function',
            type: 'Input',
          },
          {
            name: '--TOOL_FUNCTION_EXTERNAL_DEP',
            description: 'External modules to be used for Tool Function',
            type: 'Input',
          },
          {
            name: '--ALLOW_BUILTIN_DEP',
            description: 'Allow project dependencies to be used such as cheerio, typeorm',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
  {
    category: 'Database',
    condition: 'DATABASE_TYPE === "sqlite"',
    sections: [
      {
        section: 'SQLite Configuration',
        items: [
          {
            name: '--DATABASE_TYPE',
            description: 'Type of database to store the flowise data',
            type: 'DropDown',
            values: ['sqlite', 'mysql', 'postgres', 'mariadb'],
            defaultValue: 'sqlite',
          },
          {
            name: '--DATABASE_PATH',
            description: 'Location where database is saved (When DATABASE_TYPE is sqlite)',
            type: 'Input',
            defaultValue: 'your-home-dir/.flowise',
          },
        ],
      },
    ],
  },
  {
    category: 'Database',
    condition: 'DATABASE_TYPE !== "sqlite"',
    sections: [
      {
        section: 'Database Configuration',
        items: [
          {
            name: '--DATABASE_TYPE',
            description: 'Type of database to store the flowise data',
            type: 'DropDown',
            values: ['sqlite', 'mysql', 'postgres', 'mariadb'],
            defaultValue: 'sqlite',
          },
          {
            name: '--DATABASE_HOST',
            description: 'Host URL or IP address (When DATABASE_TYPE is not sqlite)',
            type: 'Input',
          },
          {
            name: '--DATABASE_PORT',
            description: 'Database port (When DATABASE_TYPE is not sqlite)',
            type: 'Input',
          },
          {
            name: '--DATABASE_USER',
            description: 'Database username (When DATABASE_TYPE is not sqlite)',
            type: 'Input',
          },
          {
            name: '--DATABASE_PASSWORD',
            description: 'Database password (When DATABASE_TYPE is not sqlite)',
            type: 'Input',
          },
          {
            name: '--DATABASE_NAME',
            description: 'Database name (When DATABASE_TYPE is not sqlite)',
            type: 'Input',
          },
          {
            name: '--DATABASE_SSL_KEY_BASE64',
            description: 'Database SSL client cert in base64 (takes priority over DATABASE_SSL)',
            type: 'Input',
          },
          {
            name: '--DATABASE_REJECT_UNAUTHORIZED',
            description: 'Reject unauthorized SSL certificates for database connection',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'Postgres Specific',
        items: [
          {
            name: '--DATABASE_SSL',
            description: 'Database connection over SSL (When DATABASE_TYPE is postgres)',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },

  {
    category: 'Encryption',
    condition: 'SECRETKEY_STORAGE_TYPE === "local"',
    sections: [
      {
        section: 'Encryption Key Storage',
        items: [
          {
            name: '--SECRETKEY_STORAGE_TYPE',
            description: 'How to store the encryption key',
            type: 'DropDown',
            values: ['local', 'aws'],
            defaultValue: 'local',
          },
          {
            name: '--SECRETKEY_PATH',
            description: 'Local file path where encryption key is saved',
            type: 'Input',
            defaultValue: 'Flowise/packages/server',
          },
          {
            name: '--FLOWISE_SECRETKEY_OVERWRITE',
            description: 'Encryption key to be used instead of the existing key',
            type: 'Input',
          },
        ],
      },
    ],
  },
  {
    category: 'Encryption',
    condition: 'SECRETKEY_STORAGE_TYPE === "aws"',
    sections: [
      {
        section: 'Encryption Key Storage',
        items: [
          {
            name: '--SECRETKEY_STORAGE_TYPE',
            description: 'How to store the encryption key',
            type: 'DropDown',
            values: ['local', 'aws'],
            defaultValue: 'local',
          },
          {
            name: '--SECRETKEY_AWS_ACCESS_KEY',
            description: 'AWS Access Key for Secret Manager',
            type: 'Input',
          },
          {
            name: '--SECRETKEY_AWS_SECRET_KEY',
            description: 'AWS Secret Key for Secret Manager',
            type: 'Input',
          },
          {
            name: '--SECRETKEY_AWS_REGION',
            description: 'AWS Region for Secret Manager',
            type: 'Input',
          },
          {
            name: '--SECRETKEY_AWS_NAME',
            description: 'Secret name in AWS Secrets Manager',
            type: 'Input',
            defaultValue: 'FlowiseEncryptionKey',
          },
          {
            name: '--SECRETKEY_AWS_AUTH_PREFIX',
            description: 'Prefix for auth secret names in AWS Secrets Manager',
            type: 'Input',
            defaultValue: 'Flowise',
          },
          {
            name: '--FLOWISE_SECRETKEY_OVERWRITE',
            description: 'Encryption key to be used instead of the existing key',
            type: 'Input',
          },
        ],
      },
    ],
  },
  {
    category: 'Authentication',
    sections: [
      {
        section: 'Auth Parameters & Tokens',
        items: [
          {
            name: '--JWT_ISSUER',
            description: 'JWT token issuer name',
            type: 'Input',
            defaultValue: 'Flowise',
          },
          {
            name: '--JWT_AUDIENCE',
            description: 'JWT token audience name',
            type: 'Input',
            defaultValue: 'Flowise',
          },
          {
            name: '--JWT_TOKEN_EXPIRY_IN_MINUTES',
            description: 'JWT access token expiry time in minutes',
            type: 'Input',
            defaultValue: 360,
          },
          {
            name: '--JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES',
            description: 'JWT refresh token expiry time in minutes',
            type: 'Input',
            defaultValue: 43200,
          },
          {
            name: '--EXPIRE_AUTH_TOKENS_ON_RESTART',
            description: 'Expire all authentication tokens on app restart',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--INVITE_TOKEN_EXPIRY_IN_HOURS',
            description: 'Workspace invite token expiry time in hours',
            type: 'Input',
            defaultValue: 24,
          },
          {
            name: '--PASSWORD_RESET_TOKEN_EXPIRY_IN_MINS',
            description: 'Password reset token expiry time in minutes',
            type: 'Input',
            defaultValue: 15,
          },
          {
            name: '--PASSWORD_SALT_HASH_ROUNDS',
            description: 'Salt hash rounds for password hashing',
            type: 'Input',
            defaultValue: 10,
          },
        ],
      },
    ],
  },
  {
    category: 'Storage',
    sections: [
      {
        section: 'Storage Configuration',
        items: [
          {
            name: '--STORAGE_TYPE',
            description: 'Type of storage for uploaded files. default is `local`',
            type: 'DropDown',
            values: ['local', 's3', 'gcs', 'azure'],
            defaultValue: 'local',
          },
        ],
      },
      {
        section: 'Local Storage',
        items: [
          {
            name: '--BLOB_STORAGE_PATH',
            description: 'Local folder path where uploaded files are stored when `STORAGE_TYPE` is `local`',
            type: 'Input',
            defaultValue: 'your-home-dir/.flowise/storage',
          },
        ],
      },
      {
        section: 'S3 Storage',
        items: [
          {
            name: '--S3_STORAGE_BUCKET_NAME',
            description: 'Bucket name to hold the uploaded files when `STORAGE_TYPE` is `s3`',
            type: 'Input',
          },
          {
            name: '--S3_STORAGE_ACCESS_KEY_ID',
            description: 'AWS Access Key',
            type: 'Input',
          },
          {
            name: '--S3_STORAGE_SECRET_ACCESS_KEY',
            description: 'AWS Secret Key',
            type: 'Input',
          },
          {
            name: '--S3_STORAGE_REGION',
            description: 'Region for S3 bucket',
            type: 'Input',
          },
          {
            name: '--S3_ENDPOINT_URL',
            description: 'Custom Endpoint for S3',
            type: 'Input',
          },
          {
            name: '--S3_FORCE_PATH_STYLE',
            description: 'Set this to true to force the request to use path-style addressing',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'GCS Storage',
        items: [
          {
            name: '--GOOGLE_CLOUD_STORAGE_PROJ_ID',
            description: 'The GCP project id for cloud storage & logging when `STORAGE_TYPE` is `gcs`',
            type: 'Input',
          },
          {
            name: '--GOOGLE_CLOUD_STORAGE_CREDENTIAL',
            description: 'The credential key file path when `STORAGE_TYPE` is `gcs`',
            type: 'Input',
          },
          {
            name: '--GOOGLE_CLOUD_STORAGE_BUCKET_NAME',
            description: 'Bucket name to hold the uploaded files when `STORAGE_TYPE` is `gcs`',
            type: 'Input',
          },
          {
            name: '--GOOGLE_CLOUD_UNIFORM_BUCKET_ACCESS',
            description: 'Enable uniform bucket level access when `STORAGE_TYPE` is `gcs`',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'Azure Storage',
        items: [
          {
            name: '--AZURE_BLOB_STORAGE_CONNECTION_STRING',
            description: 'Azure Blob Storage connection string when `STORAGE_TYPE` is `azure`',
            type: 'Input',
          },
          {
            name: '--AZURE_BLOB_STORAGE_ACCOUNT_NAME',
            description: 'Azure Blob Storage account name when `STORAGE_TYPE` is `azure`',
            type: 'Input',
          },
          {
            name: '--AZURE_BLOB_STORAGE_ACCOUNT_KEY',
            description: 'Azure Blob Storage account key when `STORAGE_TYPE` is `azure`',
            type: 'Input',
          },
          {
            name: '--AZURE_BLOB_STORAGE_CONTAINER_NAME',
            description: 'Azure Blob Storage container name when `STORAGE_TYPE` is `azure`',
            type: 'Input',
          },
        ],
      },
    ],
  },
  {
    category: 'Queue',
    sections: [
      {
        section: 'Queue Configuration',
        items: [
          {
            name: '--MODE',
            description: 'Flowise execution mode (main or queue)',
            type: 'DropDown',
            values: ['main', 'queue'],
            defaultValue: 'main',
          },
          {
            name: '--QUEUE_NAME',
            description: 'Name of the Redis BullMQ queue',
            type: 'Input',
            defaultValue: 'flowise-queue',
          },
          {
            name: '--REDIS_HOST',
            description: 'Redis server hostname',
            type: 'Input',
            defaultValue: 'localhost',
          },
          {
            name: '--REDIS_PORT',
            description: 'Redis server port',
            type: 'Input',
            defaultValue: 6379,
          },
          {
            name: '--REDIS_URL',
            description: 'Full connection URL for Redis',
            type: 'Input',
          },
          {
            name: '--REDIS_USERNAME',
            description: 'Redis server username',
            type: 'Input',
          },
          {
            name: '--REDIS_PASSWORD',
            description: 'Redis server password',
            type: 'Input',
          },
          {
            name: '--REDIS_TLS',
            description: 'Enable TLS connection for Redis',
            type: 'CheckBox',
          },
          {
            name: '--WORKER_CONCURRENCY',
            description: 'Worker concurrency for background queue tasks',
            type: 'Input',
            defaultValue: 100000,
          },
          {
            name: '--ENABLE_BULLMQ_DASHBOARD',
            description: 'Enable BullMQ dashboard monitoring',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
  {
    category: 'Nodes',
    sections: [
      {
        section: 'Node Visibility',
        items: [
          {
            name: '--SHOW_COMMUNITY_NODES',
            description: 'Show nodes created by community',
            type: 'CheckBox',
          },
          {
            name: '--DISABLED_NODES',
            description: 'Hide nodes from UI (comma separated list of node names)',
            type: 'Input',
          },
        ],
      },
    ],
  },
  {
    category: 'Security',
    sections: [
      {
        section: 'Security Configuration',
        items: [
          {
            name: '--HTTP_DENY_LIST',
            description: 'Blocks HTTP requests to specified URLs or domains in MCP servers (comma-separated)',
            type: 'Input',
          },
          {
            name: '--HTTP_SECURITY_CHECK',
            description: 'Enables default security check for dangerous HTTP domains',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--PATH_TRAVERSAL_SAFETY',
            description: 'Enables checks on paths to prevent path traversal attacks',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--CUSTOM_MCP_SECURITY_CHECK',
            description: 'Enables comprehensive security validation for Custom MCP configurations',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--CUSTOM_MCP_PROTOCOL',
            description: 'Sets the default protocol for Custom MCP communications',
            type: 'DropDown',
            values: ['stdio', 'sse'],
            defaultValue: 'stdio',
          },
          {
            name: '--CUSTOM_MCP_TOOLS_MAX_BYTES',
            description: 'Maximum payload size in bytes for Custom MCP tools',
            type: 'Input',
            defaultValue: 524288,
          },
          {
            name: '--CUSTOM_MCP_AUTHORIZE_TIMEOUT_MS',
            description: 'Authorization timeout in milliseconds for Custom MCP tools',
            type: 'Input',
            defaultValue: 15000,
          },
          {
            name: '--CUSTOM_MCP_ALLOWED_ENV_VARS',
            description: 'Comma-separated list of env var names a Custom MCP stdio config may set',
            type: 'Input',
          },
          {
            name: '--CUSTOM_MCP_ALLOWED_COMMANDS',
            description: 'Comma-separated list of commands a Custom MCP stdio config may run',
            type: 'Input',
          },
          {
            name: '--TRUST_PROXY',
            description: 'Express trust proxy setting',
            type: 'Input',
          },
          {
            name: '--OAUTH2_SECURITY_CHECK',
            description: 'Enables security validation for OAuth2 tokens',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--OAUTH2_ALLOWED_TOKEN_DOMAINS',
            description: 'Comma-separated list of additional OAuth2 provider domains to allow',
            type: 'Input',
          },
        ],
      },
    ],
  },
  {
    category: 'Telemetry & Metrics',
    sections: [
      {
        section: 'Telemetry',
        items: [
          {
            name: '--DISABLE_FLOWISE_TELEMETRY',
            description: 'Turn off telemetry',
            type: 'CheckBox',
          },
          {
            name: '--POSTHOG_PUBLIC_API_KEY',
            description: 'PostHog public API key for metrics collection',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Metrics Configuration',
        items: [
          {
            name: '--ENABLE_METRICS',
            description: 'Enable Prometheus/OpenTelemetry metrics collection',
            type: 'CheckBox',
          },
          {
            name: '--METRICS_PROVIDER',
            description: 'Metrics collection provider',
            type: 'DropDown',
            values: ['prometheus', 'open_telemetry'],
            defaultValue: 'prometheus',
          },
          {
            name: '--METRICS_INCLUDE_NODE_METRICS',
            description: 'Include Node.js runtime metrics in collection',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--METRICS_SERVICE_NAME',
            description: 'Service name reported to metrics provider',
            type: 'Input',
            defaultValue: 'FlowiseAI',
          },
          {
            name: '--METRICS_OPEN_TELEMETRY_METRIC_ENDPOINT',
            description: 'Endpoint for OpenTelemetry metrics export',
            type: 'Input',
            defaultValue: 'http://localhost:4318/v1/metrics',
          },
          {
            name: '--METRICS_OPEN_TELEMETRY_PROTOCOL',
            description: 'Protocol used for OpenTelemetry metrics export',
            type: 'DropDown',
            values: ['http', 'grpc', 'proto'],
            defaultValue: 'http',
          },
          {
            name: '--METRICS_OPEN_TELEMETRY_DEBUG',
            description: 'Enable debug logging for OpenTelemetry export',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
  {
    category: 'Models',
    sections: [
      {
        section: 'Model Configuration',
        items: [
          {
            name: '--MODEL_LIST_CONFIG_JSON',
            description: 'File path to load list of models from your local config file',
            type: 'Input',
            defaultValue: '/your_model_list_config_file_path',
          },
        ],
      },
    ],
  },
  {
    category: 'Execution & Tools',
    sections: [
      {
        section: 'Document Loaders & Automation',
        items: [
          {
            name: '--PUPPETEER_EXECUTABLE_FILE_PATH',
            description: 'Executable path for Chrome/Chromium used by Puppeteer document loaders',
            type: 'Input',
          },
          {
            name: '--PLAYWRIGHT_EXECUTABLE_FILE_PATH',
            description: 'Executable path for Chrome/Chromium used by Playwright document loaders',
            type: 'Input',
          },
          {
            name: '--MIN_SCHEDULE_INTERVAL_SECONDS',
            description: 'Minimum allowed interval in seconds for scheduled tasks',
            type: 'Input',
            defaultValue: 60,
          },
        ],
      },
    ],
  },
];

export default flowiseArguments;

/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const miscEnv: DataSection = {
  category: 'Misc Environment Variables',
  sections: [
    {
      section: 'Cloud Storage',
      items: [
        {
          name: 'STORAGE_PROVIDER',
          description: 'Sets the storage provider.',
          type: 'DropDown',
          values: ['s3', 'gcs', 'azure'],
        },
      ],
    },
    {
      section: 'Amazon S3 Storage',
      items: [
        {
          name: 'S3_ACCESS_KEY_ID',
          description: 'Sets the access key ID for S3 storage.',
          type: 'Input',
        },
        {
          name: 'S3_ADDRESSING_STYLE',
          description: "Specifies the addressing style to use for S3 storage (e.g., 'path', 'virtual').",
          type: 'Input',
        },
        {
          name: 'S3_BUCKET_NAME',
          description: 'Sets the bucket name for S3 storage.',
          type: 'Input',
        },
        {
          name: 'S3_ENDPOINT_URL',
          description: 'Sets the endpoint URL for S3 storage.',
          type: 'Input',
        },
        {
          name: 'S3_KEY_PREFIX',
          description: 'Sets the key prefix for a S3 object.',
          type: 'Input',
        },
        {
          name: 'S3_REGION_NAME',
          description: 'Sets the region name for S3 storage.',
          type: 'Input',
        },
        {
          name: 'S3_SECRET_ACCESS_KEY',
          description: 'Sets the secret access key for S3 storage.',
          type: 'Input',
        },
        {
          name: 'S3_USE_ACCELERATE_ENDPOINT',
          description: 'Specifies whether to use the accelerated endpoint for S3 storage.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'S3_ENABLE_TAGGING',
          description:
            'Enables S3 object tagging after uploads for better organization, searching, and integration with file management policies. Always set to `False` when using Cloudflare R2, as R2 does not support object tagging.',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
    {
      section: 'Google Cloud Storage',
      items: [
        {
          name: 'GOOGLE_APPLICATION_CREDENTIALS_JSON',
          description: 'Contents of Google Application Credentials JSON file.',
          type: 'Input',
        },
        {
          name: 'GCS_BUCKET_NAME',
          description: 'Sets the bucket name for Google Cloud Storage. Bucket must already exist.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Microsoft Azure Storage',
      items: [
        {
          name: 'AZURE_STORAGE_ENDPOINT',
          description: 'Sets the endpoint URL for Azure Storage.',
          type: 'Input',
        },
        {
          name: 'AZURE_STORAGE_CONTAINER_NAME',
          description: 'Sets the container name for Azure Storage.',
          type: 'Input',
        },
        {
          name: 'AZURE_STORAGE_KEY',
          description: 'Set the access key for Azure Storage.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'OpenTelemetry Configuration',
      items: [
        {
          name: 'ENABLE_OTEL',
          description:
            'Enables or disables OpenTelemetry for observability. When enabled, tracing, metrics, and logging data can be collected and exported to an OTLP endpoint.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_OTEL_TRACES',
          description:
            'Enables or disables OpenTelemetry trace collection and export. When enabled, distributed tracing data is sent to the configured OTLP endpoint. This variable works in conjunction with `ENABLE_OTEL`.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_OTEL_METRICS',
          description:
            'Enables or disables OpenTelemetry metrics collection and export. This variable works in conjunction with `ENABLE_OTEL`.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_OTEL_LOGS',
          description:
            'Enables or disables OpenTelemetry logging export. When enabled, application logs are sent to the configured OTLP endpoint. This variable works in conjunction with `ENABLE_OTEL`.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'OTEL_EXPORTER_OTLP_ENDPOINT',
          description:
            'Specifies the default OTLP (OpenTelemetry Protocol) endpoint for exporting traces, metrics, and logs. This can be overridden for metrics if `OTEL_METRICS_EXPORTER_OTLP_ENDPOINT` is set, and for logs if `OTEL_LOGS_EXPORTER_OTLP_ENDPOINT` is set.',
          type: 'Input',
          defaultValue: 'http://localhost:4317',
        },
        {
          name: 'OTEL_METRICS_EXPORTER_OTLP_ENDPOINT',
          description:
            'Specifies the dedicated OTLP endpoint for exporting OpenTelemetry metrics. If not set, it defaults to the value of `OTEL_EXPORTER_OTLP_ENDPOINT`. This is useful when separate endpoints for traces and metrics are used.',
          type: 'Input',
        },
        {
          name: 'OTEL_LOGS_EXPORTER_OTLP_ENDPOINT',
          description:
            'Specifies the dedicated OTLP endpoint for exporting OpenTelemetry logs. If not set, it defaults to the value of `OTEL_EXPORTER_OTLP_ENDPOINT`. This is useful when separate endpoints for logs, traces, and metrics are used.',
          type: 'Input',
        },
        {
          name: 'OTEL_EXPORTER_OTLP_INSECURE',
          description:
            'If set to `True`, the OTLP exporter will use an insecure connection (e.g., HTTP for gRPC) for traces. For metrics, its behavior is governed by `OTEL_METRICS_EXPORTER_OTLP_INSECURE`, and for logs by `OTEL_LOGS_EXPORTER_OTLP_INSECURE`.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'OTEL_METRICS_EXPORTER_OTLP_INSECURE',
          description:
            'If set to `True`, the OTLP exporter will use an insecure connection for metrics. If not specified, it uses the value of `OTEL_EXPORTER_OTLP_INSECURE`.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'OTEL_LOGS_EXPORTER_OTLP_INSECURE',
          description:
            'If set to `True`, the OTLP exporter will use an insecure connection for logs. If not specified, it uses the value of `OTEL_EXPORTER_OTLP_INSECURE`.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'OTEL_SERVICE_NAME',
          description:
            'Sets the service name that will be reported to your OpenTelemetry collector or observability platform. This helps identify your Open WebUI instance.',
          type: 'Input',
          defaultValue: 'open-webui',
        },
        {
          name: 'OTEL_RESOURCE_ATTRIBUTES',
          description:
            'Allows you to define additional resource attributes to be attached to all telemetry data, in a comma-separated `key1=val1,key2=val2` format.',
          type: 'Input',
        },
        {
          name: 'OTEL_TRACES_SAMPLER',
          description:
            'Configures the sampling strategy for OpenTelemetry traces. This determines which traces are collected and exported to reduce data volume.',
          type: 'Input',
          defaultValue: 'parentbased_always_on',
        },
        {
          name: 'OTEL_BASIC_AUTH_USERNAME',
          description:
            'Sets the username for basic authentication with the default OTLP endpoint. This applies to traces, and by default, to metrics and logs unless overridden by their specific authentication variables.',
          type: 'Input',
        },
        {
          name: 'OTEL_BASIC_AUTH_PASSWORD',
          description:
            'Sets the password for basic authentication with the default OTLP endpoint. This applies to traces, and by default, to metrics and logs unless overridden by their specific authentication variables.',
          type: 'Input',
        },
        {
          name: 'OTEL_METRICS_BASIC_AUTH_USERNAME',
          description:
            'Sets the username for basic authentication specifically for the OTLP metrics endpoint. If not specified, it uses the value of `OTEL_BASIC_AUTH_USERNAME`.',
          type: 'Input',
        },
        {
          name: 'OTEL_METRICS_BASIC_AUTH_PASSWORD',
          description:
            'Sets the password for basic authentication specifically for the OTLP metrics endpoint. If not specified, it uses the value of `OTEL_BASIC_AUTH_PASSWORD`.',
          type: 'Input',
        },
        {
          name: 'OTEL_LOGS_BASIC_AUTH_USERNAME',
          description:
            'Sets the username for basic authentication specifically for the OTLP logs endpoint. If not specified, it uses the value of `OTEL_BASIC_AUTH_USERNAME`.',
          type: 'Input',
        },
        {
          name: 'OTEL_LOGS_BASIC_AUTH_PASSWORD',
          description:
            'Sets the password for basic authentication specifically for the OTLP logs endpoint. If not specified, it uses the value of `OTEL_BASIC_AUTH_PASSWORD`.',
          type: 'Input',
        },
        {
          name: 'OTEL_OTLP_SPAN_EXPORTER',
          description:
            'Specifies the default protocol for exporting OpenTelemetry traces (gRPC or HTTP). This can be overridden for metrics if `OTEL_METRICS_OTLP_SPAN_EXPORTER` is set, and for logs if `OTEL_LOGS_OTLP_SPAN_EXPORTER` is set.',
          type: 'DropDown',
          values: ['grpc', 'http'],
          defaultValue: 'grpc',
        },
        {
          name: 'OTEL_METRICS_OTLP_SPAN_EXPORTER',
          description:
            'Specifies the protocol for exporting OpenTelemetry metrics (gRPC or HTTP). If not specified, it uses the value of `OTEL_OTLP_SPAN_EXPORTER`.',
          type: 'DropDown',
          values: ['grpc', 'http'],
        },
        {
          name: 'OTEL_LOGS_OTLP_SPAN_EXPORTER',
          description:
            'Specifies the protocol for exporting OpenTelemetry logs (gRPC or HTTP). If not specified, it uses the value of `OTEL_OTLP_SPAN_EXPORTER`.',
          type: 'DropDown',
          values: ['grpc', 'http'],
        },
      ],
    },
    {
      section: 'Database Pool',
      items: [
        {
          name: 'DATABASE_URL',
          description: 'Specifies the database URL to connect to.',
          type: 'Input',
          defaultValue: 'sqlite:///${DATA_DIR}/webui.db',
        },
        {
          name: 'DATABASE_SCHEMA',
          description: 'Specifies the database schema to connect to.',
          type: 'Input',
        },
        {
          name: 'DATABASE_POOL_SIZE',
          description: 'Specifies the pooling strategy and size of the database pool.',
          type: 'Input',
        },
        {
          name: 'DATABASE_POOL_MAX_OVERFLOW',
          description: 'Specifies the database pool max overflow.',
          type: 'Input',
          defaultValue: 0,
        },
        {
          name: 'DATABASE_POOL_TIMEOUT',
          description: 'Specifies the database pool timeout in seconds to get a connection.',
          type: 'Input',
          defaultValue: 30,
        },
        {
          name: 'DATABASE_POOL_RECYCLE',
          description: 'Specifies the database pool recycle time in seconds.',
          type: 'Input',
          defaultValue: 3600,
        },
        {
          name: 'DATABASE_ENABLE_SQLITE_WAL',
          description:
            'Enables or disables SQLite WAL (Write-Ahead Logging) mode. When enabled, SQLite transactions can be managed more efficiently, allowing multiple readers and one writer concurrently, which can improve database performance, especially under high concurrency. **This setting only applies to SQLite databases.**',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
    {
      section: 'Database Configuration',
      items: [
        {
          name: 'ENABLE_DB_MIGRATIONS',
          description:
            'Enables or disables automatic database migrations on startup. When enabled, the application will automatically apply pending database schema changes. Disable this in production environments where you want to control migrations manually.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'DATABASE_TYPE',
          description:
            'Specifies the type of database to use. Supported values include `sqlite`, `postgresql`, `mysql`, etc. This determines which database driver and connection logic will be used.',
          type: 'Input',
        },
        {
          name: 'DATABASE_USER',
          description:
            'Specifies the username for database authentication when using external databases like PostgreSQL or MySQL.',
          type: 'Input',
        },
        {
          name: 'DATABASE_PASSWORD',
          description:
            'Specifies the password for database authentication when using external databases like PostgreSQL or MySQL.',
          type: 'Input',
        },
        {
          name: 'DATABASE_HOST',
          description: 'Specifies the hostname or IP address of the database server.',
          type: 'Input',
        },
        {
          name: 'DATABASE_PORT',
          description: 'Specifies the port number on which the database server is listening.',
          type: 'Input',
        },
        {
          name: 'DATABASE_NAME',
          description: 'Specifies the name of the database to connect to.',
          type: 'Input',
        },
        {
          name: 'DATABASE_USER_ACTIVE_STATUS_UPDATE_INTERVAL',
          description:
            'Sets the interval in seconds for updating user active status in the database. This controls how frequently user activity timestamps are written to the database. Higher values reduce database writes but may result in less accurate activity tracking.',
          type: 'Input',
        },
        {
          name: 'DATABASE_ENABLE_SESSION_SHARING',
          description:
            'Enables or disables session sharing across multiple application instances using the database. When enabled, user sessions are stored in the database rather than in-memory, allowing users to maintain their session across different application instances.',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
    {
      section: 'Redis',
      items: [
        {
          name: 'REDIS_URL',
          description: 'Specifies the URL of the Redis instance or cluster host for storing application state.',
          type: 'Input',
        },
        {
          name: 'REDIS_SENTINEL_HOSTS',
          description:
            'Comma-separated list of Redis Sentinels for app state. If specified, the "hostname" in `REDIS_URL` will be interpreted as the Sentinel service name.',
          type: 'Input',
        },
        {
          name: 'REDIS_SENTINEL_PORT',
          description: 'Sentinel port for app state Redis.',
          type: 'Input',
          defaultValue: 26379,
        },
        {
          name: 'REDIS_CLUSTER',
          description:
            'Connect to a Redis Cluster instead of a single instance or using Redis Sentinels. If `True`, `REDIS_URL` must also be defined.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'REDIS_KEY_PREFIX',
          description:
            'Customizes the Redis key prefix used for storing configuration values. This allows multiple Open WebUI instances to share the same Redis instance without key conflicts. When operating in Redis cluster mode, the prefix is formatted as `{prefix}:` (e.g., `{open-webui}:config:*`) to enable multi-key operations on configuration keys within the same hash slot.',
          type: 'Input',
          defaultValue: 'open-webui',
        },
        {
          name: 'REDIS_SOCKET_CONNECT_TIMEOUT',
          description:
            'Sets the timeout in seconds for establishing a connection to Redis. If the connection cannot be established within this time, the operation will fail.',
          type: 'Input',
          defaultValue: 5,
        },
        {
          name: 'ENABLE_STAR_SESSIONS_MIDDLEWARE',
          description:
            'Enables or disables Starlette sessions middleware for managing user sessions. When enabled, session data is stored server-side and managed through cookies.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_WEBSOCKET_SUPPORT',
          description: 'Enables websocket support in Open WebUI.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'WEBSOCKET_MANAGER',
          description: 'Specifies the websocket manager to use (in this case, Redis).',
          type: 'Input',
          defaultValue: 'redis',
        },
        {
          name: 'WEBSOCKET_REDIS_URL',
          description:
            'Specifies the URL of the Redis instance or cluster host for websocket communication. It is distinct from `REDIS_URL` and in practice, it is recommended to set both.',
          type: 'Input',
          defaultValue: '${REDIS_URL}',
        },
        {
          name: 'WEBSOCKET_SENTINEL_HOSTS',
          description:
            'Comma-separated list of Redis Sentinels for websocket. If specified, the "hostname" in `WEBSOCKET_REDIS_URL` will be interpreted as the Sentinel service name.',
          type: 'Input',
        },
        {
          name: 'WEBSOCKET_SENTINEL_PORT',
          description: 'Sentinel port for websocket Redis.',
          type: 'Input',
          defaultValue: 26379,
        },
        {
          name: 'WEBSOCKET_REDIS_CLUSTER',
          description:
            'Specifies that websocket should communicate with a Redis Cluster instead of a single instance or using Redis Sentinels. If `True`, `WEBSOCKET_REDIS_URL` and/or `REDIS_URL` must also be defined.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WEBSOCKET_REDIS_OPTIONS',
          description:
            'Specifies additional Redis connection options for websocket communication in JSON format. This can include parameters like connection pool settings, retry logic, or other Redis client configuration options.',
          type: 'Input',
        },
        {
          name: 'WEBSOCKET_SERVER_LOGGING',
          description:
            'Enables or disables logging for the WebSocket server. When enabled, WebSocket connection events, messages, and errors are logged for debugging and monitoring purposes.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WEBSOCKET_SERVER_ENGINEIO_LOGGING',
          description:
            'Enables or disables Engine.IO logging for the WebSocket server. Engine.IO is the underlying transport layer for Socket.IO. When enabled, detailed Engine.IO events and operations are logged.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WEBSOCKET_SERVER_PING_TIMEOUT',
          description:
            'Sets the timeout in seconds for WebSocket ping operations. If a client does not respond to a ping within this time, the connection is considered dead and will be closed.',
          type: 'Input',
          defaultValue: 60,
        },
        {
          name: 'WEBSOCKET_SERVER_PING_INTERVAL',
          description:
            'Sets the interval in seconds between WebSocket ping messages sent to clients. This helps detect disconnected clients and maintain connection health.',
          type: 'Input',
          defaultValue: 25,
        },
        {
          name: 'REDIS_SOCKET_KEEPALIVE',
          description: 'Enables TCP SO_KEEPALIVE on all Redis client sockets.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'REDIS_SENTINEL_MAX_RETRY_COUNT',
          description: 'Sets maximum number of retries for Redis operations when using Sentinel failover.',
          type: 'Input',
          defaultValue: 2,
        },
        {
          name: 'REDIS_RECONNECT_DELAY',
          description: 'Optional reconnect delay in milliseconds for Redis Sentinel retry logic.',
          type: 'Input',
        },
        {
          name: 'REDIS_HEALTH_CHECK_INTERVAL',
          description: 'How often in seconds redis-py should PING an idle pooled connection before reusing it.',
          type: 'Input',
        },
        {
          name: 'WEBSOCKET_REDIS_LOCK_TIMEOUT',
          description: 'Sets the timeout in seconds for Redis locks used by the websocket manager.',
          type: 'Input',
          defaultValue: 60,
        },
        {
          name: 'WEBSOCKET_EVENT_CALLER_TIMEOUT',
          description: 'Sets the timeout in seconds for event calls generated by tools and actions.',
          type: 'Input',
          defaultValue: 300,
        },
        {
          name: 'DATABASE_USE_IAM_AUTH',
          description: 'Authenticate to AWS RDS PostgreSQL using short-lived IAM auth tokens.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'DATABASE_SQLITE_PRAGMA_SYNCHRONOUS',
          description: 'Sets the SQLite PRAGMA synchronous value.',
          type: 'DropDown',
          values: ['OFF', 'NORMAL', 'FULL', 'EXTRA'],
          defaultValue: 'NORMAL',
        },
        {
          name: 'DATABASE_SQLITE_PRAGMA_BUSY_TIMEOUT',
          description: 'Sets the SQLite PRAGMA busy_timeout value in milliseconds.',
          type: 'Input',
          defaultValue: 5000,
        },
        {
          name: 'DATABASE_SQLITE_PRAGMA_CACHE_SIZE',
          description: 'Sets the SQLite PRAGMA cache_size value.',
          type: 'Input',
          defaultValue: -65536,
        },
        {
          name: 'DATABASE_SQLITE_PRAGMA_TEMP_STORE',
          description: 'Sets the SQLite PRAGMA temp_store value.',
          type: 'DropDown',
          values: ['DEFAULT', 'FILE', 'MEMORY'],
          defaultValue: 'MEMORY',
        },
        {
          name: 'DATABASE_SQLITE_PRAGMA_MMAP_SIZE',
          description: 'Sets the SQLite PRAGMA mmap_size value in bytes.',
          type: 'Input',
          defaultValue: 268435456,
        },
        {
          name: 'DATABASE_SQLITE_PRAGMA_JOURNAL_SIZE_LIMIT',
          description: 'Sets the SQLite PRAGMA journal_size_limit value in bytes.',
          type: 'Input',
          defaultValue: 67108864,
        },
      ],
    },
    {
      section: 'Uvicorn Settings',
      items: [
        {
          name: 'UVICORN_WORKERS',
          description:
            'Controls the number of worker processes that Uvicorn spawns to handle requests. Each worker runs its own instance of the application in a separate process.',
          type: 'Input',
          defaultValue: 1,
        },
      ],
    },
    {
      section: 'Cache Settings',
      items: [
        {
          name: 'CACHE_CONTROL',
          description:
            'Sets the Cache-Control header for all HTTP responses. Supports standard directives like `public`, `private`, `no-cache`, `no-store`, `must-revalidate`, `max-age=seconds`, etc. If an invalid value is provided, defaults to `"no-store, max-age=0"` (no caching).',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Proxy Settings',
      items: [
        {
          name: 'http_proxy',
          description: 'Sets the URL for the HTTP proxy.',
          type: 'Input',
        },
        {
          name: 'https_proxy',
          description: 'Sets the URL for the HTTPS proxy.',
          type: 'Input',
        },
        {
          name: 'no_proxy',
          description:
            'Lists domain extensions (or IP addresses) for which the proxy should not be used, separated by commas.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Logging',
      items: [
        {
          name: 'GLOBAL_LOG_LEVEL',
          description:
            'Sets the global logging level for the application. Controls the verbosity of logs across all components. Valid values: DEBUG, INFO, WARNING, ERROR, CRITICAL.',
          type: 'DropDown',
          values: ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'],
          defaultValue: 'INFO',
        },
        {
          name: 'ENABLE_AUDIT_STDOUT',
          description:
            'Enables or disables audit logging to standard output (console). When enabled, audit events are printed to stdout for real-time monitoring and debugging.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_AUDIT_LOGS_FILE',
          description:
            'Enables or disables audit logging to a file. When enabled, audit events are written to a log file specified by `AUDIT_LOGS_FILE_PATH` for persistent storage and analysis.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'AUDIT_LOGS_FILE_PATH',
          description:
            'Specifies the file path where audit logs will be written when `ENABLE_AUDIT_LOGS_FILE` is enabled. The path can be absolute or relative to the application directory.',
          type: 'Input',
          defaultValue: './audit.log',
        },
        {
          name: 'AUDIT_LOG_FILE_ROTATION_SIZE',
          description:
            'Sets the maximum size in bytes for audit log files before rotation occurs. When the log file reaches this size, it will be rotated (renamed with a timestamp) and a new log file will be created. Set to 0 to disable rotation.',
          type: 'Input',
          defaultValue: 10485760,
        },
        {
          name: 'AUDIT_UVICORN_LOGGER_NAMES',
          description:
            'Comma-separated list of Uvicorn logger names to include in audit logs. This allows fine-grained control over which Uvicorn components generate audit logs.',
          type: 'Input',
        },
        {
          name: 'AUDIT_LOG_LEVEL',
          description:
            'Sets the logging level specifically for audit logs. This can be different from `GLOBAL_LOG_LEVEL` to control audit log verbosity independently. Valid values: DEBUG, INFO, WARNING, ERROR, CRITICAL.',
          type: 'DropDown',
          values: ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'],
          defaultValue: 'INFO',
        },
        {
          name: 'LOG_FORMAT',
          description: 'Specifies format of log output (TEXT or JSON).',
          type: 'DropDown',
          values: ['TEXT', 'JSON'],
          defaultValue: 'TEXT',
        },
        {
          name: 'AUDIT_INCLUDED_PATHS',
          description: 'Comma-separated list of URL paths to include in audit logging.',
          type: 'Input',
        },
        {
          name: 'MAX_BODY_LOG_SIZE',
          description:
            'Sets the maximum size in bytes for request/response bodies to include in logs. Bodies larger than this size will be truncated in log entries to prevent excessive log file growth. Set to 0 to disable body logging.',
          type: 'Input',
          defaultValue: 1024,
        },
        {
          name: 'AUDIT_EXCLUDED_PATHS',
          description:
            'Comma-separated list of URL paths to exclude from audit logging. Useful for excluding health check endpoints or other high-frequency, low-value endpoints from audit logs to reduce noise.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Provider Multi-Instance & Passthrough',
      items: [
        {
          name: 'OLLAMA_API_CONFIGS',
          description: 'Multi-instance configuration object for Ollama providers as a JSON string.',
          type: 'Input',
          defaultValue: '{}',
        },
        {
          name: 'OPENAI_API_CONFIGS',
          description: 'Multi-instance configuration object for OpenAI providers as a JSON string.',
          type: 'Input',
          defaultValue: '{}',
        },
        {
          name: 'ENABLE_OPENAI_API_PASSTHROUGH',
          description: 'Passthrough raw OpenAI API requests directly to upstream endpoints.',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
    {
      section: 'Context Compaction',
      items: [
        {
          name: 'ENABLE_CONTEXT_COMPACTION',
          description: 'Enables automatic chat context compaction for long conversation histories.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'CONTEXT_COMPACTION_TOKEN_THRESHOLD',
          description: 'Token count threshold required to trigger automatic context compaction.',
          type: 'Input',
          defaultValue: 0,
        },
        {
          name: 'CONTEXT_COMPACTION_TOKEN_CAP',
          description: 'Target token cap after context compaction is executed.',
          type: 'Input',
          defaultValue: 0,
        },
        {
          name: 'CONTEXT_COMPACTION_PROMPT_TEMPLATE',
          description: 'Prompt template used to summarize previous conversation history during compaction.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Memory Optimization',
      items: [
        {
          name: 'ENABLE_MEMORY_BACKGROUND_REVIEW',
          description: 'Enables background processing for user memory deduplication and cleanup.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'MEMORIES_REVIEW_INTERVAL_TURNS',
          description: 'Number of chat completion turns between background memory reviews.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'MEMORIES_CONTEXT_CHAR_LIMIT',
          description: 'Maximum character limit for total memory context injected into prompts.',
          type: 'Input',
          defaultValue: 2000,
        },
        {
          name: 'MEMORIES_USER_CHAR_LIMIT',
          description: 'Maximum character limit per individual user memory.',
          type: 'Input',
          defaultValue: 500,
        },
      ],
    },
    {
      section: 'Install Required Python Packages',
      items: [
        {
          name: 'ENABLE_PLUGINS',
          description: "Master switch for Open WebUI's built-in Tools and Functions.",
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_PIP_INSTALL_FRONTMATTER_REQUIREMENTS',
          description: 'Auto run pip install for Python packages declared in function and tool frontmatter.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'PIP_OPTIONS',
          description:
            'Specifies additional command-line options that pip should use when installing packages. For example, you can include flags such as `--upgrade`, `--user`, or `--no-cache-dir` to control the installation process.',
          type: 'Input',
        },
        {
          name: 'PIP_PACKAGE_INDEX_OPTIONS',
          description:
            'Defines custom package index behavior for pip. This can include specifying additional or alternate index URLs (e.g., `--extra-index-url`), authentication credentials, or other parameters to manage how packages are retrieved from different locations.',
          type: 'Input',
        },
      ],
    },
  ],
};

export default miscEnv;

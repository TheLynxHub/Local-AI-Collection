import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const sillyArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    items: [
      {name: '--version', description: 'Show version number', type: 'CheckBox'},
      {
        name: '--global',
        description: 'Use global data and config paths instead of the server directory',
        type: 'CheckBox',
      },
      {
        name: '--configPath',
        description: 'Path to the config file (only for standalone mode)',
        type: 'File',
      },
      {
        name: '--dataRoot',
        description: 'Root directory for data storage (only for standalone mode)',
        type: 'Directory',
      },
      {
        name: '--port',
        description:
          "Sets the port under which SillyTavern will run. If not provided falls back to yaml config 'port'.",
        type: 'Input',
      },
      {
        name: '--listen',
        description:
          "SillyTavern is listening on all network interfaces. If not provided falls back to yaml config 'listen'.",
        type: 'CheckBox',
      },
      {name: '--whitelist', description: 'Enables whitelist mode', type: 'CheckBox'},
      {name: '--basicAuthMode', description: 'Enables basic authentication', type: 'CheckBox'},
      {name: '--enableIPv4', description: 'Enables the IPv4 protocol', type: 'CheckBox'},
      {name: '--enableIPv6', description: 'Enables the IPv6 protocol', type: 'CheckBox'},
      {name: '--listenAddressIPv4', description: 'Specifies the IPv4 address to listen on', type: 'Input'},
      {name: '--listenAddressIPv6', description: 'Specifies the IPv6 address to listen on', type: 'Input'},
      {
        name: '--dnsPreferIPv6',
        description: "Prefers IPv6 for dns. If not provided falls back to yaml config 'preferIPv6'.",
        type: 'CheckBox',
      },
      {name: '--ssl', description: 'Enables SSL', type: 'CheckBox'},
      {name: '--certPath', description: 'Path to your certificate file.', type: 'File'},
      {name: '--keyPath', description: 'Path to your private key file.', type: 'File'},
      {name: '--keyPassphrase', description: 'Passphrase for the SSL private key', type: 'Input'},
      {
        name: '--browserLaunchEnabled',
        description: 'Automatically launches SillyTavern in the browser.',
        type: 'CheckBox',
      },
      {name: '--browserLaunchHostname', description: 'Sets the browser launch hostname', type: 'Input'},
      {name: '--browserLaunchPort', description: 'Overrides the port for browser launch', type: 'Input'},
      {
        name: '--browserLaunchAvoidLocalhost',
        description: "Avoids using 'localhost' for browser launch in auto mode",
        type: 'CheckBox',
      },
      {
        name: '--corsProxy',
        description: "Enables CORS proxy. If not provided falls back to yaml config 'enableCorsProxy'.",
        type: 'CheckBox',
      },
      {name: '--requestProxyEnabled', description: 'Enables a use of proxy for outgoing requests', type: 'CheckBox'},
      {name: '--requestProxyUrl', description: 'Request proxy URL (HTTP or SOCKS protocols)', type: 'Input'},
      {
        name: '--requestProxyBypass',
        description: 'Request proxy bypass list (space separated list of hosts)',
        type: 'Input',
      },
      {name: '--disableCsrf', description: 'Disables CSRF protection', type: 'CheckBox'},
      {name: '--enableKeepAlive', description: 'Enable HTTP/HTTPS keep-alive globally', type: 'CheckBox'},
      {
        name: '--heartbeatInterval',
        description: 'Interval in seconds to write a heartbeat file. 0 to disable.',
        type: 'Input',
      },
    ],
  },
  {
    category: 'Configuration',
    sections: [
      {
        section: 'Data Configuration',
        items: [
          {
            name: 'dataRoot',
            description: 'Root directory for user data storage (standalone mode only)',
            type: 'Directory',
            defaultValue: './data',
          },
          {
            name: 'skipContentCheck',
            description: 'Skip new default content checks',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'enableDownloadableTokenizers',
            description: 'Enable on-demand tokenizer downloads',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'whitelistImportDomains',
            description: 'List of trusted domains for importing web-hosted character cards and assets',
            type: 'Input',
            defaultValue: '["localhost", "cdn.discordapp.com", "files.catbox.moe", "raw.githubusercontent.com"]',
          },
        ],
      },
      {
        section: 'Logging Configuration',
        items: [
          {
            name: 'logging.minLogLevel',
            description: 'Minimum log level to display in the terminal',
            type: 'DropDown',
            defaultValue: 0,
            values: ['0 (DEBUG)', '1 (INFO)', '2 (WARN)', '3 (ERROR)'],
          },
          {
            name: 'logging.enableAccessLog',
            description: 'Write server access log to file and console',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'Network Configuration',
        items: [
          {
            name: 'listen',
            description: 'Enable listening for incoming connections',
            type: 'CheckBox',
            defaultValue: false,
          },
          {name: 'port', description: 'Server listening port', type: 'Input', defaultValue: 8000},
          {
            name: 'heartbeatInterval',
            description: 'Interval in seconds to write a heartbeat file for Docker healthchecks. Set to 0 to disable',
            type: 'Input',
            defaultValue: 0,
          },
          {
            name: 'enableKeepAlive',
            description: 'Enable HTTP/HTTPS keep-alive globally',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'protocol.ipv4',
            description: 'Enable listening on IPv4 protocol',
            type: 'DropDown',
            defaultValue: 'true',
            values: ['true', 'false', 'auto'],
          },
          {
            name: 'protocol.ipv6',
            description: 'Enable listening on IPv6 protocol',
            type: 'DropDown',
            defaultValue: 'false',
            values: ['true', 'false', 'auto'],
          },
          {
            name: 'listenAddress.ipv4',
            description: 'Listen on specific IPv4 address',
            type: 'Input',
            defaultValue: '0.0.0.0',
          },
          {
            name: 'listenAddress.ipv6',
            description: 'Listen on specific IPv6 address',
            type: 'Input',
            defaultValue: '[::]',
          },
          {name: 'dnsPreferIPv6', description: 'Prefer IPv6 for DNS resolution', type: 'CheckBox', defaultValue: false},
        ],
      },
      {
        section: 'SSL Configuration',
        items: [
          {name: 'ssl.enabled', description: 'Enable SSL/TLS', type: 'CheckBox', defaultValue: false},
          {
            name: 'ssl.keyPath',
            description: 'Path to SSL private key',
            type: 'File',
            defaultValue: './certs/privkey.pem',
          },
          {
            name: 'ssl.certPath',
            description: 'Path to SSL certificate',
            type: 'File',
            defaultValue: './certs/cert.pem',
          },
          {
            name: 'ssl.keyPassphrase',
            description: 'Passphrase for the SSL private key. Leave empty if not required',
            type: 'Input',
            defaultValue: '',
          },
        ],
      },
      {
        section: 'Security Configuration - IP Whitelisting',
        items: [
          {name: 'whitelistMode', description: 'Enable IP whitelist filtering', type: 'CheckBox', defaultValue: true},
          {
            name: 'enableForwardedWhitelist',
            description: 'Check forwarded headers for whitelisted IPs',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'whitelist',
            description: 'List of allowed IP addresses',
            type: 'Input',
            defaultValue: '["::1", "127.0.0.1"]',
          },
          {
            name: 'whitelistDockerHosts',
            description: 'Automatically whitelist Docker host IPs',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'Security Configuration - Forwarded Headers',
        items: [
          {
            name: 'forwardedHeaders.xRealIp',
            description: 'Use the X-Real-IP header for client IP detection',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'forwardedHeaders.xForwardedFor',
            description: 'Use the X-Forwarded-For header for client IP detection',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'forwardedHeaders.cfConnectingIp',
            description: 'Use the CF-Connecting-IP header for client IP detection',
            type: 'CheckBox',
            defaultValue: false,
          },
        ],
      },
      {
        section: 'Security Configuration - Private Address Whitelisting',
        items: [
          {
            name: 'privateAddressWhitelist.enabled',
            description: 'Enable private address whitelisting to block requests to private IP ranges',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'privateAddressWhitelist.allowUnresolvedHosts',
            description: 'Allow requests to hosts that cannot be resolved',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'privateAddressWhitelist.log.blockedRequests',
            description: 'Log blocked requests that resolve to private IP addresses',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'privateAddressWhitelist.log.allowedRequests',
            description: 'Log allowed requests that resolve to private IP addresses',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'privateAddressWhitelist.allowedRanges',
            description: 'List of allowed private IP addresses and CIDR ranges',
            type: 'Input',
            defaultValue: '["127.0.0.0/8", "::1/128"]',
          },
        ],
      },
      {
        section: 'Security Configuration - Host Whitelisting',
        items: [
          {
            name: 'hostWhitelist.enabled',
            description: 'Enable host whitelisting',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'hostWhitelist.scan',
            description: 'Log incoming requests from untrusted hosts',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'hostWhitelist.hosts',
            description: 'List of trusted hostnames',
            type: 'Input',
            defaultValue: '[]',
          },
        ],
      },
      {
        section: 'Security Configuration - Security Overrides',
        items: [
          {
            name: 'allowKeysExposure',
            description: 'Allow unmasked API key exposure in the UI',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'disableCsrfProtection',
            description: 'Disable CSRF protection (not recommended)',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'securityOverride',
            description: 'Disable startup security checks (not recommended)',
            type: 'CheckBox',
            defaultValue: false,
          },
        ],
      },
      {
        section: 'CORS Proxy & CORS Configuration',
        items: [
          {name: 'enableCorsProxy', description: 'Enable CORS proxy middleware', type: 'CheckBox', defaultValue: false},
          {
            name: 'cors.enabled',
            description: 'Enable or disable CORS middleware',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'cors.origin',
            description: 'Allowed CORS origins. "null" matches default browser file origin',
            type: 'Input',
            defaultValue: '["null"]',
          },
          {
            name: 'cors.methods',
            description: 'Allowed HTTP methods',
            type: 'Input',
            defaultValue: '["OPTIONS"]',
          },
          {
            name: 'cors.allowedHeaders',
            description: 'Allowed request headers',
            type: 'Input',
            defaultValue: '[]',
          },
          {
            name: 'cors.exposedHeaders',
            description: 'Exposed response headers',
            type: 'Input',
            defaultValue: '[]',
          },
          {
            name: 'cors.credentials',
            description: 'Allow credentials (cookies, authorization headers)',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'cors.maxAge',
            description: 'Preflight cache max age in seconds',
            type: 'Input',
            defaultValue: '',
          },
        ],
      },
      {
        section: 'User Authentication',
        items: [
          {name: 'basicAuthMode', description: 'Enable basic authentication', type: 'CheckBox', defaultValue: false},
          {name: 'basicAuthUser.username', description: 'Basic auth username', type: 'Input', defaultValue: 'user'},
          {name: 'basicAuthUser.password', description: 'Basic auth password', type: 'Input', defaultValue: 'password'},
          {name: 'enableUserAccounts', description: 'Enable multi-user mode', type: 'CheckBox', defaultValue: false},
          {
            name: 'enableDiscreetLogin',
            description: 'Hide user list on login screen',
            type: 'CheckBox',
            defaultValue: false,
          },
          {name: 'sessionTimeout', description: 'User session timeout in seconds', type: 'Input', defaultValue: -1},
          {
            name: 'perUserBasicAuth',
            description: 'Use account credentials for basic auth',
            type: 'CheckBox',
            defaultValue: false,
          },
        ],
      },
      {
        section: 'SSO Auto-Login',
        items: [
          {
            name: 'sso.trustedProxies',
            description: 'List of trusted proxy IPs for SSO authentication',
            type: 'Input',
            defaultValue: '["127.0.0.1", "::1"]',
          },
          {
            name: 'sso.autheliaAuth',
            description: 'Enable Authelia-based auto-login',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'sso.authentikAuth',
            description: 'Enable Authentik-based auto-login',
            type: 'CheckBox',
            defaultValue: false,
          },
        ],
      },
      {
        section: 'Rate Limiting Configuration',
        items: [
          {
            name: 'rateLimiting.preferRealIpHeader',
            description: 'Use IP from forwarded headers instead of socket IP for rate limiting',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'rateLimiting.accountsLoginMaxAttempts',
            description: 'Maximum account login attempts before temporary lockout (0 to disable)',
            type: 'Input',
            defaultValue: 5,
          },
          {
            name: 'rateLimiting.accountsRecoverMaxAttempts',
            description: 'Maximum account recovery attempts before temporary lockout (0 to disable)',
            type: 'Input',
            defaultValue: 5,
          },
          {
            name: 'rateLimiting.basicAuthMaxAttempts',
            description: 'Maximum basic auth attempts before temporary lockout (0 to disable)',
            type: 'Input',
            defaultValue: 5,
          },
          {
            name: 'rateLimiting.accountsResetMaxAttempts',
            description: 'Maximum account reset attempts before temporary lockout (0 to disable)',
            type: 'Input',
            defaultValue: 5,
          },
        ],
      },
      {
        section: 'Request Proxy Configuration',
        items: [
          {
            name: 'requestProxy.enabled',
            description: 'Enable proxy for outgoing requests',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'requestProxy.url',
            description: 'Proxy server URL',
            type: 'Input',
            defaultValue: 'socks5://username:password@example.com:1080',
          },
          {
            name: 'requestProxy.bypass',
            description: 'Hosts to bypass proxy',
            type: 'Input',
            defaultValue: '["localhost", "127.0.0.1"]',
          },
          {
            name: 'requestOverrides',
            description: 'API request overrides for KoboldAI and Text Completion APIs',
            type: 'Input',
            defaultValue: '[]',
          },
        ],
      },
      {
        section: 'Browser Launch Configuration',
        items: [
          {
            name: 'browserLaunch.enabled',
            description: 'Open the browser automatically on server startup',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'browserLaunch.browser',
            description: 'Browser to use for opening the URL',
            type: 'DropDown',
            defaultValue: 'default',
            values: ['default', 'chrome', 'firefox', 'edge', 'brave'],
          },
          {
            name: 'browserLaunch.hostname',
            description: 'Override the hostname for browser launch',
            type: 'Input',
            defaultValue: 'auto',
          },
          {
            name: 'browserLaunch.port',
            description: 'Override the port for browser launch',
            type: 'Input',
            defaultValue: -1,
          },
          {
            name: 'browserLaunch.avoidLocalhost',
            description: "Avoid using 'localhost' in a launch URL",
            type: 'CheckBox',
            defaultValue: false,
          },
        ],
      },
      {
        section: 'Performance Configuration',
        items: [
          {
            name: 'performance.lazyLoadCharacters',
            description: 'Lazy-load character data',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'performance.useDiskCache',
            description: 'Enables disk caching for character cards',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'performance.memoryCacheCapacity',
            description: 'Maximum memory cache capacity',
            type: 'Input',
            defaultValue: '100mb',
          },
          {
            name: 'performance.requestCompression.enabled',
            description: 'Enable gzip compression for client requests with large payloads',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'performance.requestCompression.minPayloadSize',
            description: 'Minimum payload size to trigger compression (0 to compress all)',
            type: 'Input',
            defaultValue: '256kb',
          },
          {
            name: 'performance.requestCompression.maxPayloadSize',
            description: 'Hard upper payload size limit for compression (0 for any size)',
            type: 'Input',
            defaultValue: '8mb',
          },
          {
            name: 'performance.requestCompression.timeout',
            description: 'Timeout for request compression in milliseconds',
            type: 'Input',
            defaultValue: 4000,
          },
        ],
      },
      {
        section: 'Cache Buster Configuration',
        items: [
          {
            name: 'cacheBuster.enabled',
            description: 'Clear browser cache on first load or after uploading image files',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'cacheBuster.userAgentPattern',
            description: 'Only clear cache for the specified user agent regex pattern.',
            type: 'Input',
            defaultValue: '',
          },
        ],
      },
      {
        section: 'Thumbnailing Configuration',
        items: [
          {
            name: 'thumbnails.enabled',
            description: 'Enable thumbnail generation',
            type: 'CheckBox',
            defaultValue: true,
          },
          {name: 'thumbnails.quality', description: 'JPEG thumbnail quality', type: 'Input', defaultValue: 95},
          {
            name: 'thumbnails.format',
            description: 'Image format for thumbnails',
            type: 'DropDown',
            defaultValue: 'jpg',
            values: ['jpg', 'png'],
          },
          {
            name: 'thumbnails.dimensions.bg',
            description: 'Background thumbnails size',
            type: 'Input',
            defaultValue: '[160, 90]',
          },
          {
            name: 'thumbnails.dimensions.avatar',
            description: 'Avatar thumbnails size',
            type: 'Input',
            defaultValue: '[96, 144]',
          },
          {
            name: 'thumbnails.dimensions.persona',
            description: 'Persona thumbnails size',
            type: 'Input',
            defaultValue: '[96, 144]',
          },
        ],
      },
      {
        section: 'Backup Configuration',
        items: [
          {
            name: 'backups.allowFullDataBackup',
            description: 'Allow users to create a full backup archive of their data',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'backups.chat.enabled',
            description: 'Enable automatic chat backups',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'backups.chat.checkIntegrity',
            description: 'Verify integrity of chat files before saving',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'backups.common.numberOfBackups',
            description: 'Number of backups to keep',
            type: 'Input',
            defaultValue: 50,
          },
          {
            name: 'backups.chat.throttleInterval',
            description: 'Backup throttle interval (ms)',
            type: 'Input',
            defaultValue: 10000,
          },
          {
            name: 'backups.chat.maxTotalBackups',
            description: 'Maximum total chat backups to keep',
            type: 'Input',
            defaultValue: -1,
          },
        ],
      },
      {
        section: 'Extensions Configuration',
        items: [
          {name: 'extensions.enabled', description: 'Enable UI extensions', type: 'CheckBox', defaultValue: true},
          {
            name: 'extensions.autoUpdate',
            description: 'Auto-update extensions (if enabled by the extension manifest)',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'extensions.models.autoDownload',
            description: 'Enable automatic model downloads',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'extensions.models.classification',
            description: 'HuggingFace model ID for classification',
            type: 'Input',
            defaultValue: 'Cohee/distilbert-base-uncased-go-emotions-onnx',
          },
          {
            name: 'extensions.models.captioning',
            description: 'HuggingFace model ID for image captioning',
            type: 'Input',
            defaultValue: 'Xenova/vit-gpt2-image-captioning',
          },
          {
            name: 'extensions.models.embedding',
            description: 'HuggingFace model ID for embeddings',
            type: 'Input',
            defaultValue: 'Cohee/jina-embeddings-v2-base-en',
          },
          {
            name: 'extensions.models.speechToText',
            description: 'HuggingFace model ID for speech-to-text',
            type: 'Input',
            defaultValue: 'Xenova/whisper-small',
          },
          {
            name: 'extensions.models.textToSpeech',
            description: 'HuggingFace model ID for text-to-speech',
            type: 'Input',
            defaultValue: 'Xenova/speecht5_tts',
          },
        ],
      },
      {
        section: 'Git Configuration',
        items: [
          {
            name: 'git.backend',
            description: 'Git backend for plugin/extension repository operations',
            type: 'DropDown',
            defaultValue: 'auto',
            values: ['auto', 'system', 'builtin'],
          },
        ],
      },
      {
        section: 'Server Plugins',
        items: [
          {
            name: 'enableServerPlugins',
            description: 'Enable server-side plugins',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'enableServerPluginsAutoUpdate',
            description: 'Attempt to automatically update server plugins on startup',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'API Integration Settings',
        items: [
          {
            name: 'promptPlaceholder',
            description: 'Default message for empty prompts',
            type: 'Input',
            defaultValue: '[Start a new chat]',
          },
          {
            name: 'openai.randomizeUserId',
            description: 'Randomize user ID for API calls',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'openai.captionSystemPrompt',
            description: 'System message for caption completion',
            type: 'Input',
            defaultValue: '',
          },
          {
            name: 'mistral.enablePrefix',
            description: 'Enable reply prefilling. The prefix will be echoed in the response',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'ollama.keepAlive',
            description: 'Model keep-alive duration (seconds)',
            type: 'Input',
            defaultValue: -1,
          },
          {
            name: 'ollama.batchSize',
            description: 'Controls the "num_batch" (batch size) parameter of the generation request',
            type: 'Input',
            defaultValue: -1,
          },
          {
            name: 'claude.enableSystemPromptCache',
            description: 'Enable system prompt caching',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'claude.cachingAtDepth',
            description: 'Enable message history caching',
            type: 'Input',
            defaultValue: -1,
          },
          {
            name: 'claude.extendedTTL',
            description: 'Use 1h TTL instead of the default 5m.',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'claude.enableAdaptiveThinking',
            description: 'Enables adaptive thinking for supported models (Opus 4.6+)',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'gemini.apiVersion',
            description: 'API endpoint version (AI Studio only)',
            type: 'DropDown',
            defaultValue: 'v1beta',
            values: ['v1beta', 'v1alpha'],
          },
          {
            name: 'gemini.thoughtSignatures',
            description: 'Adds thought signatures to requests (Gemini 3 and above)',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: 'gemini.enableSystemPromptCache',
            description: 'Enables caching of the system prompt (OpenRouter only)',
            type: 'CheckBox',
            defaultValue: false,
          },
          {
            name: 'gemini.image.personGeneration',
            description: 'Person generation setting for Imagen',
            type: 'DropDown',
            defaultValue: 'allow_adult',
            values: ['dont_allow', 'allow_adult', 'allow_all'],
          },
          {
            name: 'deepl.formality',
            description: 'Translation formality level',
            type: 'DropDown',
            defaultValue: 'default',
            values: ['default', 'more', 'less', 'prefer_more', 'prefer_less'],
          },
        ],
      },
    ],
  },
];

export default sillyArguments;

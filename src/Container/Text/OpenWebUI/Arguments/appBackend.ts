/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const appBackend: DataSection = {
  category: 'App/Backend',
  sections: [
    {
      section: 'General',
      items: [
        {
          name: 'WEBUI_URL',
          description:
            'Specifies the URL where your Open WebUI installation is reachable. Needed for search engine support and OAuth/SSO.',
          type: 'Input',
          defaultValue: 'http://localhost:3000',
        },
        {
          name: 'ENABLE_SIGNUP',
          description: 'Toggles user account creation.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'WEBUI_ADMIN_EMAIL',
          description:
            'Specifies the email address for an admin account to be created automatically on first startup when no users exist. This enables headless/automated deployments without manual account creation. When combined with `WEBUI_ADMIN_PASSWORD`, the admin account is created during application startup, and `ENABLE_SIGNUP` is automatically disabled to prevent unauthorized account creation.',
          type: 'Input',
        },
        {
          name: 'WEBUI_ADMIN_PASSWORD',
          description:
            'Specifies the password for the admin account to be created automatically on first startup when no users exist. Must be used in conjunction with `WEBUI_ADMIN_EMAIL`. The password is securely hashed before storage using the same mechanism as manual account creation.',
          type: 'Input',
        },
        {
          name: 'WEBUI_ADMIN_NAME',
          description:
            'Specifies the display name for the automatically created admin account. This is used when `WEBUI_ADMIN_EMAIL` and `WEBUI_ADMIN_PASSWORD` are configured for headless admin creation.',
          type: 'Input',
          defaultValue: 'Admin',
        },
        {
          name: 'ENABLE_SIGNUP_PASSWORD_CONFIRMATION',
          description:
            'If set to True, a "Confirm Password" field is added to the sign-up page to help users avoid typos when creating their password.',
          type: 'CheckBox',
        },
        {
          name: 'ENABLE_API_OUTLET_FILTERS',
          description:
            'When enabled, outlet filter functions also run for completions requested directly through the API, not only for chats made from the Open WebUI interface.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_LOGIN_FORM',
          description:
            'Toggles email, password, sign-in and "or" (only when ENABLE_OAUTH_SIGNUP is set to True) elements.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_PASSWORD_CHANGE_FORM',
          description:
            'Controls visibility of the password change UI in Settings > Account. Set to false for SSO-focused deployments.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'PASSWORD_HASH_ALGORITHM',
          description: 'Selects the algorithm used to hash new user passwords.',
          type: 'DropDown',
          values: ['bcrypt', 'argon2'],
          defaultValue: 'bcrypt',
        },
        {
          name: 'DEFAULT_LOCALE',
          description: 'Sets the default locale for the application.',
          type: 'Input',
          defaultValue: 'en',
        },
        {
          name: 'DEFAULT_MODELS',
          description: 'Sets a default Language Model.',
          type: 'Input',
        },
        {
          name: 'DEFAULT_PINNED_MODELS',
          description:
            "Comma-separated list of model IDs to pin by default for new users who haven't customized their pinned models. This provides a pre-selected set of frequently used models in the model selector for new accounts.",
          type: 'Input',
        },
        {
          name: 'DEFAULT_MODEL_METADATA',
          description: 'Sets global default metadata (JSON object string) for all models.',
          type: 'Input',
          defaultValue: '{}',
        },
        {
          name: 'DEFAULT_MODEL_PARAMS',
          description:
            'Sets global default parameters (temperature, top_p, max_tokens, etc.) for all models as a JSON object.',
          type: 'Input',
          defaultValue: '{}',
        },
        {
          name: 'DEFAULT_GROUP_ID',
          description: 'Sets the default group ID to assign to new users upon registration.',
          type: 'Input',
        },
        {
          name: 'DEFAULT_GROUP_SHARE_PERMISSION',
          description: 'Controls the default "Who can share to this group" setting for newly created groups.',
          type: 'DropDown',
          values: ['members', 'true', 'false'],
          defaultValue: 'members',
        },
        {
          name: 'DEFAULT_USER_ROLE',
          description: 'Sets the default role assigned to new users.',
          type: 'DropDown',
          values: ['pending', 'user', 'admin'],
          defaultValue: 'pending',
        },
        {
          name: 'PENDING_USER_OVERLAY_TITLE',
          description: 'Sets a custom title for the pending user overlay.',
          type: 'Input',
        },
        {
          name: 'PENDING_USER_OVERLAY_CONTENT',
          description: 'Sets a custom text content for the pending user overlay.',
          type: 'Input',
        },
        {
          name: 'ENABLE_CALENDAR',
          description: 'Enables or disables the Calendar feature for managing events and scheduled automations.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_AUTOMATIONS',
          description: 'Enables or disables the Automations feature globally.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'AUTOMATION_MAX_COUNT',
          description: 'Sets the maximum number of automations a non-admin user can create (empty for unlimited).',
          type: 'Input',
        },
        {
          name: 'AUTOMATION_MIN_INTERVAL',
          description:
            'Sets the minimum allowed interval in seconds between automation recurrences for non-admin users.',
          type: 'Input',
        },
        {
          name: 'AUTOMATION_AUTH_TOKEN_EXPIRES_IN',
          description: 'Lifetime of the short-lived auth token an automation uses to call back into Open WebUI.',
          type: 'Input',
          defaultValue: '1h',
        },
        {
          name: 'SCHEDULER_POLL_INTERVAL',
          description:
            'Sets the interval in seconds between unified scheduler ticks for automations and calendar alerts.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'CALENDAR_ALERT_LOOKAHEAD_MINUTES',
          description: 'Default lookahead window in minutes for calendar event alerts.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'PENDING_USER_OVERLAY_CONTENT',
          description: 'Sets a custom text content for the pending user overlay.',
          type: 'Input',
        },
        {
          name: 'ENABLE_CHANNELS',
          description: 'Enables or disables channel support.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_FOLDERS',
          description:
            'Enables or disables the folders feature, allowing users to organize their chats into folders in the sidebar.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'FOLDER_MAX_FILE_COUNT',
          description:
            'Sets the maximum number of files processing allowed per folder. Default is none (empty string) which is unlimited.',
          type: 'Input',
        },
        {
          name: 'ENABLE_NOTES',
          description:
            'Enables or disables the notes feature, allowing users to create and manage personal notes within Open WebUI.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_MEMORIES',
          description:
            'Enables or disables the memory feature, allowing models to store and retrieve long-term information about users.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_MEMORY_SYSTEM_CONTEXT',
          description: "Controls whether stored memories are injected into the model's system context.",
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'WEBHOOK_URL',
          description: 'Sets a webhook for integration with Discord/Slack/Microsoft Teams.',
          type: 'Input',
        },
        {
          name: 'ENABLE_ADMIN_EXPORT',
          description:
            'Controls whether admins can export data, chats and the database in the admin panel. Database exports only work for SQLite databases for now.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_ADMIN_CHAT_ACCESS',
          description:
            "Enables admin users to directly access the chats of other users. When disabled, admins can no longer accesss user's chats in the admin panel. If you disable this, consider disabling `ENABLE_ADMIN_EXPORT` too, if you are using SQLite, as the exports also contain user chats.",
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_ADMIN_ANALYTICS',
          description:
            'Controls whether the admin-panel Analytics tab is visible and the analytics API router is mounted.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_PASSWORD_AUTH',
          description:
            'Allows both password and SSO authentication methods to coexist when set to True. When set to False, it disables all password-based login attempts on the /signin and /ldap endpoints, enforcing strict SSO-only authentication. Disable this setting in production environments with fully configured SSO to prevent credential-based account takeover attacks; keep it enabled if you require password authentication as a backup or have not yet completed SSO configuration. Should never be disabled if OAUTH/SSO is not being used.',
          type: 'CheckBox',
        },
        {
          name: 'BYPASS_ADMIN_ACCESS_CONTROL',
          description:
            'When disabled, admin users are treated like regular users for workspace access (models, knowledge, prompts and tools) and only see items they have explicit permission to access through the existing access control system. This also applies to the visibility of models in the model selector - admins will be treated as regular users: base models and custom models they do not have explicit permission to access, will be hidden. If set to `True` (Default), admins have access to all created items in the workspace area and all models in the model selector, regardless of access permissions.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_USER_WEBHOOKS',
          description: 'Enables or disables user webhooks.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'RESPONSE_WATERMARK',
          description:
            'Sets a custom text that will be included when you copy a message in the chat. E.g. `"This text is AI generated"` -> will add "This text is AI generated" to every message, when copied.',
          type: 'Input',
        },
        {
          name: 'IFRAME_CSP',
          description: 'Sets a Content-Security-Policy applied to all srcdoc iframes rendered in the UI.',
          type: 'Input',
        },
        {
          name: 'THREAD_POOL_SIZE',
          description:
            'Sets the thread pool size for FastAPI/AnyIO blocking calls. By default (when set to `0`) FastAPI/AnyIO use `40` threads. In case of large instances and many concurrent users, it may be needed to increase `THREAD_POOL_SIZE` to prevent blocking.',
          type: 'Input',
          defaultValue: 0,
        },
        {
          name: 'ENABLE_CUSTOM_MODEL_FALLBACK',
          description:
            "Controls whether custom models should fall back to a default model if their assigned base model is missing. When set to `True`, if a custom model's base model is not found, the system will use the first model from the configured `DEFAULT_MODELS` list instead of returning an error.",
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_PUBLIC_ACTIVE_USERS_COUNT',
          description:
            'Controls whether the active user count is visible to all users or restricted to administrators only. When set to `False`, only admin users can see how many users are currently active, reducing backend load and addressing privacy concerns in large deployments.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_USER_STATUS',
          description:
            'Globally enables or disables user status functionality. When disabled, the status UI (including blinking active/away indicators and status messages) is hidden across the application, and user status API endpoints are restricted.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_EASTER_EGGS',
          description: 'Enables or disables easter egg features in the UI.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_IMAGE_CONTENT_TYPE_EXTENSION_FALLBACK',
          description: 'Enables fallback extension-to-MIME resolution for images on minimal containers.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_PROFILE_IMAGE_URL_FORWARDING',
          description: 'Controls whether profile image endpoints redirect to external http(s) profile URLs.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'PROFILE_IMAGE_ALLOWED_MIME_TYPES',
          description: 'Allowlist of comma-separated MIME types accepted when serving data URI profile images.',
          type: 'Input',
          defaultValue: 'image/png,image/jpeg,image/gif,image/webp',
        },
        {
          name: 'PROFILE_IMAGE_MAX_DATA_URI_SIZE',
          description: 'Maximum size in bytes allowed for base64 data URI profile images (default 2MB).',
          type: 'Input',
          defaultValue: 2097152,
        },
        {
          name: 'CHAT_RESPONSE_MAX_TOOL_CALL_ITERATIONS',
          description: 'Maximum number of tool call iterations permitted in a single chat completion turn.',
          type: 'Input',
          defaultValue: 15,
        },
        {
          name: 'ENABLE_RESPONSES_API_STATEFUL',
          description: 'Enables stateful completions via the OpenAI-compatible Responses API endpoint.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_BASE_MODELS_CACHE',
          description:
            'When enabled, caches the list of base models from connected Ollama and OpenAI-compatible endpoints in memory. This reduces the number of API calls made to external model providers when loading the model selector, improving performance particularly for deployments with many users or slow connections to model endpoints. Can also be configured from Admin Panel > Settings > Connections > "Cache Base Model List".',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'MODELS_CACHE_TTL',
          description:
            'Sets the cache time-to-live in seconds for model list responses from OpenAI and Ollama endpoints. This reduces API calls by caching the available models list for the specified duration. Set to empty string to disable caching entirely.',
          type: 'Input',
          defaultValue: 1,
        },
        {
          name: 'SHOW_ADMIN_DETAILS',
          description: 'Toggles whether to show admin user details in the interface.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ADMIN_EMAIL',
          description: 'Sets the admin email shown by `SHOW_ADMIN_DETAILS`',
          type: 'Input',
        },
        {
          name: 'ENV',
          description: 'Environment setting.',
          type: 'DropDown',
          values: ['dev', 'prod'],
          defaultValue: 'dev',
        },
        {
          name: 'ENABLE_PERSISTENT_CONFIG',
          description: 'If set to `False`, all `PersistentConfig` variables are treated as regular variables.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'CUSTOM_NAME',
          description: 'Sets `WEBUI_NAME` but polls **api.openwebui.com** for metadata.',
          type: 'Input',
        },
        {
          name: 'WEBUI_NAME',
          description: 'Sets the main WebUI name. Appends `(Open WebUI)` if overridden.',
          type: 'Input',
          defaultValue: 'Open WebUI',
        },
        {
          name: 'PORT',
          description: 'Sets the port to run Open WebUI from.',
          type: 'Input',
          defaultValue: 8080,
        },
        {
          name: 'ENABLE_REALTIME_CHAT_SAVE',
          description:
            "When enabled, the system saves each chunk of streamed chat data to the database in real time to ensure maximum data persistency. This feature provides robust data recovery and allows accurate session tracking. However, the tradeoff is increased latency, as saving to the database introduces a delay. Disabling this feature can improve performance and reduce delays, but it risks potential data loss in the event of a system failure or crash. Use based on your application's requirements and acceptable tradeoffs.",
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_CHAT_RESPONSE_BASE64_IMAGE_URL_CONVERSION',
          description:
            'When set to true, it automatically uploads base64-encoded images exceeding 1KB in markdown and converts them into image file URLs to reduce the size of response text. Some multimodal models directly output images as Base64 strings within the Markdown content. This results in larger response bodies, placing strain on CPU, network, Redis, and database resources.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'CHAT_STREAM_RESPONSE_CHUNK_MAX_BUFFER_SIZE',
          description:
            'Sets the maximum buffer size in bytes for handling stream response chunks. When a single chunk exceeds this limit, the system returns an empty JSON object and skips subsequent oversized data until encountering normally-sized chunks. This prevents memory issues when dealing with extremely large responses from certain providers (e.g., models like gemini-2.5-flash-image or services returning extensive web search data exceeding). Set to an empty string or a negative value to disable chunk size limitations entirely. Recommended values are 16-20 MB (`16777216`) or larger depending on the image size of the image generation model (4K images may need even more).',
          type: 'Input',
        },
        {
          name: 'CHAT_RESPONSE_STREAM_DELTA_CHUNK_SIZE',
          description:
            "Sets a system-wide minimum value for the number of tokens to batch together before sending them to the client during a streaming response. This allows an administrator to enforce a baseline level of performance and stability across the entire system by preventing excessively small chunk sizes that can cause high CPU load. The final chunk size used for a response will be the highest value set among this global variable, the model's advanced parameters, or the per-chat settings. The default is 1, which applies no minimum batching at the global level.",
          type: 'Input',
          defaultValue: 1,
        },
        {
          name: 'BYPASS_MODEL_ACCESS_CONTROL',
          description:
            "Bypasses model access control. When set to `true`, all users (and admins alike) will have access to all models, regardless of the model's privacy setting (Private, Public, Shared with certain groups). This is useful for smaller or individual Open WebUI installations where model access restrictions may not be needed.",
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WEBUI_BUILD_HASH',
          description: 'Used for identifying the Git SHA of the build for releases.',
          type: 'Input',
          defaultValue: 'dev-build',
        },
        {
          name: 'WEBUI_BANNERS',
          description: 'List of banners to show to users.',
          type: 'Input',
        },
        {
          name: 'USE_CUDA_DOCKER',
          description:
            'Builds the Docker image with NVIDIA CUDA support. Enables GPU acceleration for local Whisper and embeddings.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'DOCKER',
          description:
            'Indicates whether Open WebUI is running inside a Docker container. Used internally for environment detection.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'USE_CUDA',
          description:
            'Controls whether to use CUDA acceleration for local models. When set to `true`, attempts to detect and use available NVIDIA GPUs. The code reads the environment variable `USE_CUDA_DOCKER` to set this internal boolean variable.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'DEVICE_TYPE',
          description:
            'Specifies the device type for model execution. Automatically set to `cuda` if CUDA is available and enabled, or `mps` for Apple Silicon.',
          type: 'Input',
          defaultValue: 'cpu',
        },
        {
          name: 'EXTERNAL_PWA_MANIFEST_URL',
          description:
            'When defined as a fully qualified URL (e.g., https://path/to/manifest.webmanifest), requests sent to /manifest.json will use the external manifest file. When not defined, the default manifest.json file will be used.',
          type: 'Input',
        },
        {
          name: 'ENABLE_TITLE_GENERATION',
          description: 'Enables or disables chat title generation.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_COMPRESSION_MIDDLEWARE',
          description: 'Enables gzip compression middleware for HTTP responses to reduce bandwidth usage.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'LICENSE_KEY',
          description: 'Specifies the license key to use (for Enterprise users only).',
          type: 'Input',
        },
        {
          name: 'SSL_ASSERT_FINGERPRINT',
          description: 'Specifies the SSL assert fingerprint to use.',
          type: 'Input',
        },
        {
          name: 'DEFAULT_PROMPT_SUGGESTIONS',
          description: 'List of prompt suggestions.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'AIOHTTP Client',
      items: [
        {
          name: 'AIOHTTP_CLIENT_TIMEOUT',
          description:
            'Specifies the timeout duration in seconds for the AIOHTTP client. This impacts things such as connections to Ollama and OpenAI endpoints.',
          type: 'Input',
          defaultValue: 300,
        },
        {
          name: 'AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST',
          description:
            'Sets the timeout in seconds for fetching the model list. This can be useful in cases where network latency requires a longer timeout duration to successfully retrieve the model list.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST',
          description:
            'Sets the timeout in seconds for fetching the model list. This can be useful in cases where network latency requires a longer timeout duration to successfully retrieve the model list.',
          type: 'Input',
        },
        {
          name: 'AIOHTTP_CLIENT_SESSION_SSL',
          description:
            'Controls SSL/TLS verification for AIOHTTP client sessions when connecting to external APIs (e.g., Ollama Embeddings).',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'AIOHTTP_CLIENT_TIMEOUT_TOOL_SERVER_DATA',
          description: 'Sets the timeout in seconds for retrieving data from tool servers via AIOHTTP client.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'AIOHTTP_CLIENT_SESSION_TOOL_SERVER_SSL',
          description: 'Controls SSL/TLS verification specifically for tool server connections via AIOHTTP client.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'REQUESTS_VERIFY',
          description:
            'Controls SSL/TLS verification for synchronous `requests` (e.g., Tika, External Reranker). Set to `False` to bypass certificate verification for self-signed certificates.',
          type: 'CheckBox',
          defaultValue: true,
        },
      ],
    },
    {
      section: 'Directories',
      items: [
        {
          name: 'DATA_DIR',
          description: 'Specifies the base directory for data storage, including uploads, cache, vector database, etc.',
          type: 'Input',
          defaultValue: './data',
        },
        {
          name: 'FONTS_DIR',
          description: 'Specifies the directory for fonts.',
          type: 'Input',
        },
        {
          name: 'FRONTEND_BUILD_DIR',
          description: 'Specifies the location of the built frontend files.',
          type: 'Input',
          defaultValue: '../build',
        },
        {
          name: 'STATIC_DIR',
          description: 'Specifies the directory for static files, such as the favicon.',
          type: 'Input',
          defaultValue: './static',
        },
      ],
    },
    {
      section: 'Ollama',
      items: [
        {
          name: 'ENABLE_OLLAMA_API',
          description: 'Enables the use of Ollama APIs.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'OLLAMA_BASE_URL',
          description: 'Configures the Ollama backend URL.',
          type: 'Input',
          defaultValue: 'http://localhost:11434',
        },
        {
          name: 'OLLAMA_BASE_URLS',
          description:
            'Configures load-balanced Ollama backend hosts, separated by ;. Takes precedence over OLLAMA_BASE_URL.',
          type: 'Input',
        },
        {
          name: 'USE_OLLAMA_DOCKER',
          description: 'Builds the Docker image with a bundled Ollama instance.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'K8S_FLAG',
          description:
            'If set, assumes Helm chart deployment and sets OLLAMA_BASE_URL to http://ollama-service.open-webui.svc.cluster.local:11434',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
    {
      section: 'OpenAI',
      items: [
        {
          name: 'ENABLE_OPENAI_API',
          description: 'Enables the use of OpenAI APIs.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'OPENAI_API_BASE_URL',
          description: 'Configures the OpenAI base API URL.',
          type: 'Input',
          defaultValue: 'https://api.openai.com/v1',
        },
        {
          name: 'OPENAI_API_BASE_URLS',
          description: 'Supports balanced OpenAI base API URLs, semicolon-separated.',
          type: 'Input',
        },
        {
          name: 'OPENAI_API_KEY',
          description: 'Sets the OpenAI API key.',
          type: 'Input',
        },
        {
          name: 'OPENAI_API_KEYS',
          description: 'Supports multiple OpenAI API keys, semicolon-separated.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Tasks',
      items: [
        {
          name: 'TASK_MODEL',
          description:
            'The default model to use for tasks such as title and web search query generation when using Ollama models.',
          type: 'Input',
        },
        {
          name: 'TASK_MODEL_EXTERNAL',
          description:
            'The default model to use for tasks such as title and web search query generation when using OpenAI-compatible endpoints.',
          type: 'Input',
        },
        {
          name: 'TITLE_GENERATION_PROMPT_TEMPLATE',
          description: 'Prompt to use when generating chat titles.',
          type: 'Input',
        },
        {
          name: 'ENABLE_FOLLOW_UP_GENERATION',
          description: 'Enables or disables follow up generation.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'FOLLOW_UP_GENERATION_PROMPT_TEMPLATE',
          description: 'Prompt to use for generating several relevant follow-up questions.',
          type: 'Input',
        },
        {
          name: 'TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE',
          description: 'Prompt to use when calling tools.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Code Execution',
      items: [
        {
          name: 'ENABLE_CODE_EXECUTION',
          description: 'Enables or disables code execution.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'CODE_EXECUTION_ENGINE',
          description: 'Specifies the code execution engine to use.',
          type: 'Input',
          defaultValue: 'pyodide',
        },
        {
          name: 'CODE_EXECUTION_JUPYTER_URL',
          description: 'Specifies the Jupyter URL to use for code execution.',
          type: 'Input',
        },
        {
          name: 'CODE_EXECUTION_JUPYTER_AUTH',
          description: 'Specifies the Jupyter authentication method to use for code execution.',
          type: 'Input',
        },
        {
          name: 'CODE_EXECUTION_JUPYTER_AUTH_TOKEN',
          description: 'Specifies the Jupyter authentication token to use for code execution.',
          type: 'Input',
        },
        {
          name: 'CODE_EXECUTION_JUPYTER_AUTH_PASSWORD',
          description: 'Specifies the Jupyter authentication password to use for code execution.',
          type: 'Input',
        },
        {
          name: 'CODE_EXECUTION_JUPYTER_TIMEOUT',
          description: 'Specifies the timeout for Jupyter code execution.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Code Interpreter',
      items: [
        {
          name: 'ENABLE_CODE_INTERPRETER',
          description: 'Enables or disables code interpreter.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'CODE_INTERPRETER_ENGINE',
          description: 'Specifies the code interpreter engine to use.',
          type: 'Input',
          defaultValue: 'pyodide',
        },
        {
          name: 'CODE_INTERPRETER_BLACKLISTED_MODULES',
          description:
            'Specifies a comma-separated list of Python modules that are blacklisted and cannot be imported or used within the code interpreter. This enhances security by preventing access to potentially sensitive or system-level functionalities.',
          type: 'Input',
        },
        {
          name: 'CODE_INTERPRETER_PROMPT_TEMPLATE',
          description: 'Specifies the prompt template to use for code interpreter.',
          type: 'Input',
        },
        {
          name: 'CODE_INTERPRETER_JUPYTER_URL',
          description: 'Specifies the Jupyter URL to use for code interpreter.',
          type: 'Input',
        },
        {
          name: 'CODE_INTERPRETER_JUPYTER_AUTH',
          description: 'Specifies the Jupyter authentication method to use for code interpreter.',
          type: 'Input',
        },
        {
          name: 'CODE_INTERPRETER_JUPYTER_AUTH_TOKEN',
          description: 'Specifies the Jupyter authentication token to use for code interpreter.',
          type: 'Input',
        },
        {
          name: 'CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD',
          description: 'Specifies the Jupyter authentication password to use for code interpreter.',
          type: 'Input',
        },
        {
          name: 'CODE_INTERPRETER_JUPYTER_TIMEOUT',
          description: 'Specifies the timeout for the Jupyter code interpreter.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Direct Connections (OpenAPI/MCPO Tool Servers)',
      items: [
        {
          name: 'ENABLE_DIRECT_CONNECTIONS',
          description: 'Enables or disables direct connections.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'TOOL_SERVER_CONNECTIONS',
          description:
            'Comma-separated list of tool server connection URLs for direct connections to OpenAPI/MCPO tool servers.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Autocomplete',
      items: [
        {
          name: 'ENABLE_AUTOCOMPLETE_GENERATION',
          description: 'Enables or disables autocomplete generation.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH',
          description: 'Sets the maximum input length for autocomplete generation.',
          type: 'Input',
          defaultValue: -1,
        },
        {
          name: 'AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE',
          description: 'Sets the prompt template for autocomplete generation.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Evaluation Arena Model',
      items: [
        {
          name: 'ENABLE_EVALUATION_ARENA_MODELS',
          description: 'Enables or disables evaluation arena models.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_MESSAGE_RATING',
          description: 'Enables message rating feature.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_COMMUNITY_SHARING',
          description: 'Controls whether users are shown the share to community button.',
          type: 'CheckBox',
          defaultValue: true,
        },
      ],
    },
    {
      section: 'Tags Generation',
      items: [
        {
          name: 'ENABLE_TAGS_GENERATION',
          description: 'Enables or disables tag generation.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'TAGS_GENERATION_PROMPT_TEMPLATE',
          description: 'Sets the prompt template for tag generation.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'API Key Endpoint Restrictions',
      items: [
        {
          name: 'ENABLE_API_KEYS',
          description:
            'Enables the API key creation feature, allowing users to generate API keys for programmatic access to Open WebUI.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_API_KEYS_ENDPOINT_RESTRICTIONS',
          description:
            'Enables API key endpoint restrictions for added security and configurability, allowing administrators to limit which endpoints can be accessed using API keys.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'API_KEYS_ALLOWED_ENDPOINTS',
          description:
            'Specifies a comma-separated list of allowed API endpoints when API key endpoint restrictions are enabled.',
          type: 'Input',
        },
        {
          name: 'JWT_EXPIRES_IN',
          description:
            'Sets the JWT expiration time in seconds. Valid time units: `s`, `m`, `h`, `d`, `w` or `-1` for no expiration.',
          type: 'Input',
          defaultValue: '4w',
        },
      ],
    },
  ],
};

export default appBackend;

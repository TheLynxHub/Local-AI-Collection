import {DataItem} from '../../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const securityVariables: DataItem = {
  category: 'Security Variables',
  items: [
    {
      name: 'ENABLE_FORWARD_USER_INFO_HEADERS',
      description:
        'Forwards user information (name, ID, email, role and chat-id) as X-headers to OpenAI API and Ollama API.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'FORWARD_USER_INFO_HEADER_USER_NAME',
      description: 'Custom HTTP header name for forwarding user display name.',
      type: 'Input',
      defaultValue: 'X-OpenWebUI-User-Name',
    },
    {
      name: 'FORWARD_USER_INFO_HEADER_USER_ID',
      description: 'Custom HTTP header name for forwarding user ID.',
      type: 'Input',
      defaultValue: 'X-OpenWebUI-User-Id',
    },
    {
      name: 'FORWARD_USER_INFO_HEADER_USER_EMAIL',
      description: 'Custom HTTP header name for forwarding user email.',
      type: 'Input',
      defaultValue: 'X-OpenWebUI-User-Email',
    },
    {
      name: 'FORWARD_USER_INFO_HEADER_USER_ROLE',
      description: 'Custom HTTP header name for forwarding user role.',
      type: 'Input',
      defaultValue: 'X-OpenWebUI-User-Role',
    },
    {
      name: 'FORWARD_SESSION_INFO_HEADER_CHAT_ID',
      description: 'Custom HTTP header name for forwarding chat session ID.',
      type: 'Input',
      defaultValue: 'X-OpenWebUI-Chat-Id',
    },
    {
      name: 'FORWARD_SESSION_INFO_HEADER_MESSAGE_ID',
      description: 'Custom HTTP header name for forwarding chat message ID.',
      type: 'Input',
      defaultValue: 'X-OpenWebUI-Message-Id',
    },
    {
      name: 'FORWARD_USER_INFO_HEADER_JWT_SECRET',
      description: 'Secret key used to sign forwarded user info JWT header.',
      type: 'Input',
    },
    {
      name: 'FORWARD_USER_INFO_HEADER_JWT',
      description: 'Custom HTTP header name for forwarding signed user info JWT.',
      type: 'Input',
      defaultValue: 'X-OpenWebUI-Jwt',
    },
    {
      name: 'FORWARD_USER_INFO_HEADER_JWT_EXPIRES_SECONDS',
      description: 'Expiration time in seconds for forwarded user info JWT.',
      type: 'Input',
      defaultValue: 3600,
    },
    {
      name: 'CUSTOM_API_KEY_HEADER',
      description: 'Specifies a custom HTTP header name for API key authentication.',
      type: 'Input',
      defaultValue: 'X-OpenWebUI-Key',
    },
    {
      name: 'ENABLE_VALVE_ENCRYPTION',
      description: 'Encrypts tool and function valves stored in the database.',
      type: 'CheckBox',
      defaultValue: true,
    },
    {
      name: 'ENABLE_WEB_LOADER_SSL_VERIFICATION',
      description: 'Bypass SSL Verification for RAG on Websites.',
      type: 'CheckBox',
      defaultValue: true,
    },
    {
      name: 'ENABLE_PASSWORD_VALIDATION',
      description:
        'Enables password complexity validation for user accounts. When enabled, passwords must meet the complexity requirements defined by `PASSWORD_VALIDATION_REGEX_PATTERN` during signup, password updates, and user creation operations. This helps enforce stronger password policies across the application.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'PASSWORD_VALIDATION_HINT',
      description: 'Custom hint message displayed when password policy validation fails.',
      type: 'Input',
    },
    {
      name: 'PASSWORD_VALIDATION_REGEX_PATTERN',
      description:
        'Regular expression pattern used to validate password complexity when `ENABLE_PASSWORD_VALIDATION` is enabled. The default pattern requires passwords to be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      type: 'Input',
      defaultValue: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$`,
    },
    {
      name: 'WEBUI_SESSION_COOKIE_SAME_SITE',
      description: 'Sets the `SameSite` attribute for session cookies.',
      type: 'DropDown',
      values: ['lax', 'strict', 'none'],
      defaultValue: 'lax',
    },
    {
      name: 'WEBUI_SESSION_COOKIE_SECURE',
      description: 'Sets the `Secure` attribute for session cookies if set to `True`.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'WEBUI_AUTH_COOKIE_SAME_SITE',
      description: 'Sets the `SameSite` attribute for auth cookies.',
      type: 'DropDown',
      values: ['lax', 'strict', 'none'],
      defaultValue: 'lax',
    },
    {
      name: 'WEBUI_AUTH_COOKIE_SECURE',
      description: 'Sets the `Secure` attribute for auth cookies if set to `True`.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'WEBUI_AUTH',
      description: 'This setting enables or disables authentication.',
      type: 'CheckBox',
      defaultValue: true,
    },
    {
      name: 'WEBUI_SECRET_KEY',
      description: 'Overrides the randomly generated string used for JSON Web Token.',
      type: 'Input',
      defaultValue: 't0p-s3cr3t',
    },
    {
      name: 'ENABLE_VERSION_UPDATE_CHECK',
      description:
        'When enabled, the application makes automatic update checks and notifies you about version updates.',
      type: 'CheckBox',
      defaultValue: true,
    },
    {
      name: 'OFFLINE_MODE',
      description: "Disables Open WebUI's network connections for update checks and automatic model downloads.",
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'HF_HUB_OFFLINE',
      description:
        'Tells Hugging Face whether we want to launch in offline mode, so to not connect to hugging face and prevent all automatic model downloads',
      type: 'Input',
      defaultValue: 0,
    },
    {
      name: 'RESET_CONFIG_ON_START',
      description: 'Resets the `config.json` file on startup.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'SAFE_MODE',
      description: 'Enables safe mode, which disables potentially unsafe features, deactivating all functions.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'CORS_ALLOW_ORIGIN',
      description: 'Sets the allowed origins for Cross-Origin Resource Sharing (CORS).',
      type: 'Input',
      defaultValue: '*',
    },
    {
      name: 'CORS_ALLOW_CUSTOM_SCHEME',
      description:
        'Sets a list of further allowed schemes for Cross-Origin Resource Sharing (CORS). Allows you to specify additional custom URL schemes, beyond the standard `http` and `https`, that are permitted as valid origins for Cross-Origin Resource Sharing (CORS).',
      type: 'Input',
    },
    {
      name: 'RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE',
      description: 'Determines whether to allow custom models defined on the Hub in their own modeling files.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'RAG_RERANKING_MODEL_TRUST_REMOTE_CODE',
      description:
        'Determines whether to allow custom models defined on the Hub in their own. modeling files for reranking.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'RAG_EMBEDDING_MODEL_AUTO_UPDATE',
      description: 'Toggles automatic update of the Sentence-Transformer model.',
      type: 'CheckBox',
      defaultValue: true,
    },
    {
      name: 'RAG_RERANKING_MODEL_AUTO_UPDATE',
      description: 'Toggles automatic update of the reranking model.',
      type: 'CheckBox',
      defaultValue: true,
    },
  ],
};

export default securityVariables;

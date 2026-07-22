/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const security: DataItem = {
  category: 'Security',
  items: [
    {
      name: 'N8N_SECURITY_POLICY_MANAGED_BY_ENV',
      type: 'CheckBox',
      defaultValue: false,
      description:
        'Set to `true` to manage the security policy from environment variables. When `true`, n8n applies security policy variables on startup and locks UI controls.',
    },
    {
      name: 'N8N_MFA_ENFORCED_ENABLED',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether to enforce two-factor authentication for all users (`true`) or not (`false`).',
    },
    {
      name: 'N8N_PERSONAL_SPACE_PUBLISHING_ENABLED',
      type: 'CheckBox',
      defaultValue: true,
      description: 'Whether users can publish from their personal space (`true`) or not (`false`).',
    },
    {
      name: 'N8N_PERSONAL_SPACE_SHARING_ENABLED',
      type: 'CheckBox',
      defaultValue: true,
      description: 'Whether users can share resources from their personal space (`true`) or not (`false`).',
    },
    {
      name: 'N8N_BLOCK_ENV_ACCESS_IN_NODE',
      type: 'CheckBox',
      description:
        'Whether to allow users to access environment variables in expressions and the Code node (false) or not (true).',
    },
    {
      name: 'N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES',
      type: 'CheckBox',
      defaultValue: true,
      description:
        'Set to `true` to block access to all files in the .n8n directory and user defined configuration files.',
    },
    {
      name: 'N8N_BLOCK_FILE_PATTERNS',
      type: 'Input',
      defaultValue: '^(.*/)*\\.git(/.*)*$',
      description:
        'Regex patterns for files and folders that ReadWriteFile and ReadBinaryFiles nodes cannot access. Separate multiple patterns with semicolons.',
    },
    {
      name: 'N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS',
      type: 'CheckBox',
      description:
        'Set to `true` to try to set 0600 permissions for the settings file, giving only the owner read and write access.',
    },
    {
      name: 'N8N_RESTRICT_FILE_ACCESS_TO',
      type: 'Input',
      defaultValue: '~/.n8n-files',
      description:
        'Limits access to files in these directories. Provide multiple files as a semicolon-separated list (";").',
    },
    {
      name: 'N8N_CONTENT_SECURITY_POLICY',
      type: 'Input',
      defaultValue: '{}',
      description:
        'Set Content-Security-Policy headers as helmet.js nested directives object. For example, `{ "frame-ancestors": ["http://localhost:3000"] }`',
    },
    {
      name: 'N8N_CONTENT_SECURITY_POLICY_REPORT_ONLY',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether to set the Content-Security-Policy-Report-Only header instead of Content-Security-Policy.',
    },
    {
      name: 'N8N_CROSS_ORIGIN_OPENER_POLICY',
      type: 'DropDown',
      defaultValue: 'same-origin-allow-popups',
      values: ['same-origin', 'same-origin-allow-popups'],
      description: 'Configuration for the Cross-Origin-Opener-Policy header.',
    },
    {
      name: 'N8N_INSECURE_DISABLE_WEBHOOK_IFRAME_SANDBOX',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether to disable HTML sandboxing for webhooks.',
    },
    {
      name: 'N8N_INSECURE_DISABLE_FORM_HTML_SANDBOX',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether to disable CSP sandboxing for form pages (Form Trigger, Send and Wait).',
    },
    {
      name: 'N8N_GIT_NODE_DISABLE_BARE_REPOS',
      type: 'CheckBox',
      defaultValue: true,
      description: 'Set to `true` to prevent the Git node from working with bare repositories, enhancing security.',
    },
    {
      name: 'N8N_GIT_NODE_ENABLE_HOOKS',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Set to `true` to allow the Git node to execute Git hooks.',
    },
    {
      name: 'N8N_GIT_NODE_ENABLE_ALL_CONFIG_KEYS',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether to enable arbitrary git config keys in the Git node.',
    },
    {
      name: 'N8N_AWS_SYSTEM_CREDENTIALS_ACCESS_ENABLED',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether to allow access to AWS system credentials (e.g. in awsAssumeRole credentials).',
    },
    {
      name: 'N8N_AWS_SYSTEM_CREDENTIALS_SDK_SOURCES',
      type: 'Input',
      defaultValue: 'all',
      description:
        'Which AWS system-credential sources resolve via the AWS SDK. Accepts `all`, `none`, or a comma-separated subset.',
    },
    {
      name: 'N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW',
      type: 'Input',
      defaultValue: 90,
      description: "Number of days to consider a workflow abandoned if it's not executed.",
    },
    {
      name: 'N8N_SECURE_COOKIE',
      type: 'CheckBox',
      description: 'Ensures that cookies are only sent over HTTPS, enhancing security.',
    },
    {
      name: 'N8N_SAMESITE_COOKIE',
      type: 'DropDown',
      defaultValue: 'lax',
      values: ['strict', 'lax', 'none'],
      description:
        'Controls cross-site cookie behavior:\n- strict: Sent only for first-party requests.\n- lax (default): Sent with top-level navigation requests.\n- none: Sent in all contexts (requires HTTPS).',
    },
  ],
};

export default security;

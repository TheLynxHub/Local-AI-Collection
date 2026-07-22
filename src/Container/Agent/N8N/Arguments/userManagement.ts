/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const userManagement: DataItem = {
  category: 'User Management & Auth',
  items: [
    {name: 'N8N_EMAIL_MODE', type: 'Input', defaultValue: 'smtp', description: 'Enable emails.'},
    {name: 'N8N_SMTP_HOST', type: 'Input', description: 'your_SMTP_server_name'},
    {name: 'N8N_SMTP_PORT', type: 'Input', description: 'your_SMTP_server_port'},
    {name: 'N8N_SMTP_USER', type: 'Input', description: 'your_SMTP_username'},
    {name: 'N8N_SMTP_PASS', type: 'Input', description: 'your_SMTP_password'},
    {
      name: 'N8N_SMTP_OAUTH_SERVICE_CLIENT',
      type: 'Input',
      description: 'If using 2LO with a service account this is your client ID',
    },
    {
      name: 'N8N_SMTP_OAUTH_PRIVATE_KEY',
      type: 'Input',
      description: 'If using 2LO with a service account this is your private key',
    },
    {
      name: 'N8N_SMTP_SENDER',
      type: 'Input',
      description:
        'Sender email address. You can optionally include the sender name. Example with name: N8N <contact@n8n.com>',
    },
    {
      name: 'N8N_SMTP_SSL',
      type: 'CheckBox',
      defaultValue: true,
      description: 'Whether to use SSL for SMTP (true) or not (false).',
    },
    {
      name: 'N8N_SMTP_STARTTLS',
      type: 'CheckBox',
      defaultValue: true,
      description: 'Whether to use STARTTLS for SMTP (true) or not (false).',
    },
    {
      name: 'N8N_UM_EMAIL_TEMPLATES_INVITE',
      type: 'Input',
      description: 'Full path to your HTML email template. This overrides the default template for invite emails.',
    },
    {
      name: 'N8N_UM_EMAIL_TEMPLATES_PWRESET',
      type: 'Input',
      description:
        'Full path to your HTML email template. This overrides the default template for password reset emails.',
    },
    {
      name: 'N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED',
      type: 'Input',
      description:
        'Overrides the default HTML template for notifying users that a workflow was shared. Provide the full path to the template.',
    },
    {
      name: 'N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED',
      type: 'Input',
      description:
        'Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template.',
    },
    {
      name: 'N8N_UM_EMAIL_TEMPLATES_PROJECT_SHARED',
      type: 'Input',
      description:
        'Overrides the default HTML template for notifying users that a project was shared. Provide the full path to the template.',
    },
    {
      name: 'N8N_USER_MANAGEMENT_JWT_SECRET',
      type: 'Input',
      description: 'Set a specific JWT secret. By default, n8n generates one on start.',
    },
    {
      name: 'N8N_USER_MANAGEMENT_JWT_DURATION_HOURS',
      type: 'Input',
      defaultValue: 168,
      description: 'Set an expiration date for the JWTs in hours.',
    },
    {
      name: 'N8N_USER_MANAGEMENT_JWT_REFRESH_TIMEOUT_HOURS',
      type: 'Input',
      defaultValue: 0,
      description:
        'How many hours before the JWT expires to automatically refresh it. 0 means 25% of N8N_USER_MANAGEMENT_JWT_DURATION_HOURS. -1 means it will never refresh, which forces users to log in again after the period defined in N8N_USER_MANAGEMENT_JWT_DURATION_HOURS.',
    },
    {
      name: 'N8N_MFA_ENABLED',
      type: 'CheckBox',
      defaultValue: true,
      description:
        'Whether to enable two-factor authentication (true) or disable (false). n8n ignores this if existing users have 2FA enabled.',
    },
    {
      name: 'N8N_INVITE_LINKS_EMAIL_ONLY',
      type: 'CheckBox',
      description:
        'When set to true, n8n will only deliver invite links via email and will not expose them through the API. This option enhances security by preventing invite URLs from being accessible programmatically, or to high privileged users.',
    },
  ],
};

export default userManagement;

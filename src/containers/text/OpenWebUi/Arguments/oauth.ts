/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const oauth: DataSection = {
  category: 'OAuth',
  sections: [
    {
      section: 'General',
      items: [
        {
          name: 'ENABLE_OAUTH_SIGNUP',
          description: 'Enables account creation when signing up via OAuth. Distinct from `ENABLE_SIGNUP`.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_OAUTH_PERSISTENT_CONFIG',
          description: 'Controls whether OAuth-related settings are persisted in the database after the first launch.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'OAUTH_SUB_CLAIM',
          description:
            "Overrides the default claim used to identify a user's unique ID (`sub`) from the OAuth/OIDC provider's user info response. By default, Open WebUI attempts to infer this from the provider's configuration. This variable allows you to explicitly specify which claim to use. For example, if your identity provider uses 'employee_id' as the unique identifier, you would set this variable to 'employee_id'.",
          type: 'Input',
        },
        {
          name: 'OAUTH_MERGE_ACCOUNTS_BY_EMAIL',
          description:
            'If enabled, merges OAuth accounts with existing accounts using the same email address. This is considered unsafe as not all OAuth providers will verify email addresses and can lead to potential account takeovers.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_OAUTH_WITHOUT_EMAIL',
          description:
            'Enables authentication with OpenID Connect (OIDC) providers that do not support or expose an email scope. When enabled, Open WebUI will create and manage user accounts without requiring an email address from the OAuth provider.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'OAUTH_UPDATE_PICTURE_ON_LOGIN',
          description: 'If enabled, updates the local user profile picture with the OAuth-provided picture on login.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_OAUTH_ID_TOKEN_COOKIE',
          description:
            'Controls whether the **legacy** `oauth_id_token` cookie (unsafe, not recommended, token can go stale/orphaned) is set in the browser upon a successful OAuth login. This is provided for **backward compatibility** with custom tools or older versions that might rely on scraping this cookie. **The new, recommended approach is to use the server-side session management.**',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'OAUTH_CLIENT_INFO_ENCRYPTION_KEY',
          description:
            'Specifies the secret key used to encrypt and decrypt OAuth client tokens stored server-side in the database. This is a critical security component for OAuth client tokens. If not set, it defaults to using the main `WEBUI_SECRET_KEY`, but it is highly recommended to set it to a unique, securely generated value for production environments. `OAUTH_CLIENT_INFO_ENCRYPTION_KEY` is used in conjunction with OAuth 2.1 MCP server authentication.',
          type: 'Input',
        },
        {
          name: 'OAUTH_SESSION_TOKEN_ENCRYPTION_KEY',
          description:
            'Specifies the secret key used to encrypt and decrypt OAuth tokens stored server-side in the database. This is a critical security component for protecting user credentials at rest. If not set, it defaults to using the main `WEBUI_SECRET_KEY`, but it is highly recommended to set it to a unique, securely generated value for production environments.',
          type: 'Input',
        },
        {
          name: 'WEBUI_AUTH_TRUSTED_EMAIL_HEADER',
          description: 'Defines the trusted request header for authentication. See [SSO docs](/features/sso).',
          type: 'Input',
        },
        {
          name: 'WEBUI_AUTH_TRUSTED_NAME_HEADER',
          description:
            'Defines the trusted request header for the username of anyone registering with the `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` header. See [SSO docs](/features/sso).',
          type: 'Input',
        },
        {
          name: 'WEBUI_AUTH_TRUSTED_GROUPS_HEADER',
          description:
            'Defines the trusted request header containing a comma-separated list of group memberships for the user when using trusted header authentication. See [SSO docs](/features/sso).',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Google',
      items: [
        {
          name: 'GOOGLE_CLIENT_ID',
          description: 'Sets the client ID for Google OAuth.',
          type: 'Input',
        },
        {
          name: 'GOOGLE_CLIENT_SECRET',
          description: 'Sets the client secret for Google OAuth.',
          type: 'Input',
        },
        {
          name: 'GOOGLE_OAUTH_SCOPE',
          description: 'Sets the scope for Google OAuth authentication.',
          type: 'Input',
          defaultValue: 'openid email profile',
        },
        {
          name: 'GOOGLE_REDIRECT_URI',
          description: 'Sets the redirect URI for Google OAuth.',
          type: 'Input',
          defaultValue: '<backend>/oauth/google/callback',
        },
      ],
    },
    {
      section: 'Microsoft',
      items: [
        {
          name: 'MICROSOFT_CLIENT_ID',
          description: 'Sets the client ID for Microsoft OAuth.',
          type: 'Input',
        },
        {
          name: 'MICROSOFT_CLIENT_SECRET',
          description: 'Sets the client secret for Microsoft OAuth.',
          type: 'Input',
        },
        {
          name: 'MICROSOFT_CLIENT_TENANT_ID',
          description: 'Sets the tenant ID for Microsoft OAuth.',
          type: 'Input',
        },
        {
          name: 'MICROSOFT_OAUTH_SCOPE',
          description: 'Sets the scope for Microsoft OAuth authentication.',
          type: 'Input',
          defaultValue: 'openid email profile',
        },
        {
          name: 'MICROSOFT_REDIRECT_URI',
          description: 'Sets the redirect URI for Microsoft OAuth.',
          type: 'Input',
          defaultValue: '<backend>/oauth/microsoft/callback',
        },
        {
          name: 'MICROSOFT_CLIENT_LOGIN_BASE_URL',
          description:
            'Sets the base login URL for Microsoft OAuth authentication. Allows configuration of alternative login endpoints for government clouds or custom deployments.',
          type: 'Input',
          defaultValue: 'https://login.microsoftonline.com',
        },
        {
          name: 'MICROSOFT_CLIENT_PICTURE_URL',
          description:
            'Specifies the Microsoft Graph API endpoint for retrieving user profile pictures during OAuth authentication.',
          type: 'Input',
          defaultValue: 'https://graph.microsoft.com/v1.0/me/photo/$value',
        },
      ],
    },
    {
      section: 'Feishu',
      items: [
        {
          name: 'FEISHU_CLIENT_ID',
          description: 'Sets the client ID for Feishu OAuth.',
          type: 'Input',
        },
        {
          name: 'FEISHU_CLIENT_SECRET',
          description: 'Sets the client secret for Feishu OAuth.',
          type: 'Input',
        },
        {
          name: 'FEISHU_CLIENT_SCOPE',
          description: 'Specifies the scope for Feishu OAuth authentication.',
          type: 'Input',
          defaultValue: 'contact:user.base:readonly',
        },
        {
          name: 'FEISHU_CLIENT_REDIRECT_URI',
          description: 'Sets the redirect URI for Feishu OAuth.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'GitHub',
      items: [
        {
          name: 'GITHUB_CLIENT_ID',
          description: 'Sets the client ID for GitHub OAuth.',
          type: 'Input',
        },
        {
          name: 'GITHUB_CLIENT_SECRET',
          description: 'Sets the client secret for GitHub OAuth.',
          type: 'Input',
        },
        {
          name: 'GITHUB_CLIENT_SCOPE',
          description: 'Specifies the scope for GitHub OAuth authentication.',
          type: 'Input',
          defaultValue: 'user:email',
        },
        {
          name: 'GITHUB_CLIENT_REDIRECT_URI',
          description: 'Sets the redirect URI for GitHub OAuth.',
          type: 'Input',
          defaultValue: '<backend>/oauth/github/callback',
        },
      ],
    },
    {
      section: 'OpenID (OIDC)',
      items: [
        {
          name: 'OAUTH_CLIENT_ID',
          description: 'Sets the client ID for OIDC.',
          type: 'Input',
        },
        {
          name: 'OAUTH_CLIENT_SECRET',
          description: 'Sets the client secret for OIDC.',
          type: 'Input',
        },
        {
          name: 'OPENID_PROVIDER_URL',
          description: 'Path to the `.well-known/openid-configuration` endpoint',
          type: 'Input',
        },
        {
          name: 'OPENID_REDIRECT_URI',
          description: 'Sets the redirect URI for OIDC',
          type: 'Input',
          defaultValue: '<backend>/oauth/oidc/callback',
        },
        {
          name: 'OAUTH_SCOPES',
          description: 'Sets the scope for OIDC authentication. `openid` and `email` are required.',
          type: 'Input',
          defaultValue: 'openid email profile',
        },
        {
          name: 'OAUTH_CODE_CHALLENGE_METHOD',
          description: 'Specifies the code challenge method for OAuth authentication.',
          type: 'Input',
        },
        {
          name: 'OAUTH_PROVIDER_NAME',
          description: 'Sets the name for the OIDC provider.',
          type: 'Input',
          defaultValue: 'SSO',
        },
        {
          name: 'OAUTH_USERNAME_CLAIM',
          description: 'Set username claim for OpenID.',
          type: 'Input',
          defaultValue: 'name',
        },
        {
          name: 'OAUTH_EMAIL_CLAIM',
          description: 'Set email claim for OpenID.',
          type: 'Input',
          defaultValue: 'email',
        },
        {
          name: 'OAUTH_PICTURE_CLAIM',
          description: 'Set picture (avatar) claim for OpenID.',
          type: 'Input',
          defaultValue: 'picture',
        },
        {
          name: 'OAUTH_GROUP_CLAIM',
          description: 'Specifies the group claim for OAuth authentication.',
          type: 'Input',
          defaultValue: 'groups',
        },
        {
          name: 'ENABLE_OAUTH_ROLE_MANAGEMENT',
          description: 'Enables role management for OAuth delegation.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_OAUTH_GROUP_MANAGEMENT',
          description: 'Enables or disables OAuth group management.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_OAUTH_GROUP_CREATION',
          description:
            "When enabled, groups from OAuth claims that don't exist in Open WebUI will be automatically created.",
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'OAUTH_BLOCKED_GROUPS',
          description:
            'JSON array of group names that are blocked from accessing the application. Users belonging to these groups will be denied access even if they have valid OAuth credentials.',
          type: 'Input',
        },
        {
          name: 'OAUTH_ROLES_CLAIM',
          description: 'Sets the roles claim to look for in the OIDC token.',
          type: 'Input',
          defaultValue: 'roles',
        },
        {
          name: 'OAUTH_ALLOWED_ROLES',
          description: 'Sets the roles that are allowed access to the platform.',
          type: 'Input',
          defaultValue: 'user,admin',
        },
        {
          name: 'OAUTH_ADMIN_ROLES',
          description: 'Sets the roles that are considered administrators.',
          type: 'Input',
          defaultValue: 'admin',
        },
        {
          name: 'OAUTH_ROLES_SEPARATOR',
          description:
            'Allows custom role separators for for splitting the `OAUTH_*_ROLES` variables. Meant for OAuth roles that contain commas; useful for roles specified in LDAP syntax or other systems where commas are part of role names. If the claim is a string and contains the separator, it will be also split by that separator.',
          type: 'Input',
          defaultValue: ',',
        },
        {
          name: 'OAUTH_GROUPS_SEPARATOR',
          description:
            'Specifies the delimiter used to parse multiple group names from the OAuth group claim. This separator is used when the identity provider returns group memberships as a delimited string rather than an array. Useful when integrating with systems that use non-standard separators or when group names themselves contain commas.',
          type: 'Input',
          defaultValue: ';',
        },
        {
          name: 'OAUTH_ALLOWED_DOMAINS',
          description: 'Specifies the allowed domains for OAuth authentication. (e.g. "example1.com,example2.com").',
          type: 'Input',
          defaultValue: '*',
        },
        {
          name: 'OAUTH_AUDIENCE',
          description:
            "Specifies an audience parameter passed to the OAuth provider's authorization endpoint during login. Some providers (such as Auth0 and Ory) use this value to determine the type of access token returned—without it, providers typically return an opaque token, while with it, they return a JWT that can be decoded and validated. This parameter is not part of the official OAuth/OIDC spec for authorization endpoints but is widely supported by some providers.",
          type: 'Input',
        },
      ],
    },
  ],
};

export default oauth;

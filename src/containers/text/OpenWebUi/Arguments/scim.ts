/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const scim: DataItem = {
  category: 'SCIM',
  items: [
    {
      name: 'SCIM_ENABLED',
      description:
        'Enables or disables SCIM 2.0 (System for Cross-domain Identity Management) support for automated user and group provisioning from identity providers like Okta, Azure AD, and Google Workspace.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'SCIM_TOKEN',
      description:
        'Sets the bearer token for SCIM authentication. This token must be provided by identity providers when making SCIM API requests. Generate a secure random token (e.g., using `openssl rand -base64 32`) and configure it in both Open WebUI and your identity provider.',
      type: 'Input',
    },
  ],
};

export default scim;

/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const license: DataItem = {
  category: 'License',
  items: [
    {name: 'N8N_HIDE_USAGE_PAGE', type: 'CheckBox', description: 'Hide the usage and plans page in the app.'},
    {
      name: 'N8N_LICENSE_ACTIVATION_KEY',
      type: 'Input',
      defaultValue: '',
      description: 'Activation key to initialize license. Not applicable if the n8n instance was already activated.',
    },
    {
      name: 'N8N_LICENSE_AUTO_RENEW_ENABLED',
      type: 'CheckBox',
      description:
        'Enables (true) or disables (false) autorenewal for licenses. If disabled, you need to manually renew the license every 10 days by navigating to **Settings** > **Usage and plan**, and pressing `F5`. Failure to renew the license will disable all licensed features.',
    },
    {
      name: 'N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN',
      type: 'CheckBox',
      description:
        'Controls whether the instance releases floating entitlements back to the pool upon shutdown. Set to `true` to allow other instances to reuse the entitlements, or `false` to retain them. For production instances that must always keep their licensed features, set this to `false`.',
    },
    {
      name: 'N8N_LICENSE_SERVER_URL',
      type: 'Input',
      defaultValue: 'https://license.n8n.io/v1',
      description: 'Server URL to retrieve license.',
    },
    {
      name: 'N8N_LICENSE_TENANT_ID',
      type: 'Input',
      defaultValue: 1,
      description: 'Tenant ID associated with the license. Only set this variable if explicitly instructed by n8n.',
    },
    {
      name: 'https_proxy_license_server',
      type: 'Input',
      defaultValue: 'https://user:pass@proxy:port',
      description: 'Proxy server URL for HTTPS requests to retrieve license. This variable name needs to be lowercase.',
    },
  ],
};

export default license;

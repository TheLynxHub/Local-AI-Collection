/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const credentials: DataItem = {
  category: 'Credentials',
  items: [
    {name: 'CREDENTIALS_OVERWRITE_DATA', type: 'Input', description: 'Overwrites for credentials.'},
    {
      name: 'CREDENTIALS_OVERWRITE_ENDPOINT',
      type: 'Input',
      description: 'The API endpoint to fetch credentials.',
    },
    {
      name: 'CREDENTIALS_OVERWRITE_PERSISTENCE',
      type: 'CheckBox',
      description:
        'Enable database persistence for credential overwrites. Required for multiinstance or queue mode to propagate overwrites to workers through a publish/subscribe approach.',
    },
    {
      name: 'CREDENTIALS_DEFAULT_NAME',
      type: 'Input',
      defaultValue: 'My credentials',
      description: 'The default name for credentials.',
    },
  ],
};

export default credentials;

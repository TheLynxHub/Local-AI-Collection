/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const sourceControl: DataItem = {
  category: 'Source Control',
  items: [
    {
      name: 'N8N_SOURCECONTROL_DEFAULT_SSH_KEY_TYPE',
      type: 'DropDown',
      defaultValue: 'ed25519',
      values: ['ed25519', 'rsa'],
      description: 'Set to `rsa` to make RSA the default SSH key type for Source control setup.',
    },
  ],
};

export default sourceControl;

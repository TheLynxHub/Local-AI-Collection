/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const sourceControl: DataItem = {
  category: 'Source Control',
  items: [
    {
      name: 'N8N_SOURCECONTROL_DEFAULT_SSH_KEY_TYPE',
      type: 'Input',
      defaultValue: 'ed25519',
      description: 'Set to `rsa` to make RSA the default SSH key type for Source control setup.',
    },
  ],
};

export default sourceControl;

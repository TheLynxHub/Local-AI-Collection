/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const externalHooksSecrets: DataSection = {
  category: 'External Hooks & Secrets',
  sections: [
    {
      section: 'External Hooks',
      items: [
        {
          name: 'EXTERNAL_HOOK_FILES',
          type: 'Input',
          description:
            'Files containing backend external hooks. Provide multiple files as a colon-separated list (":").',
        },
        {
          name: 'EXTERNAL_FRONTEND_HOOKS_URLS',
          type: 'Input',
          description:
            'URLs to files containing frontend external hooks. Provide multiple URLs as a colon-separated list (":").',
        },
      ],
    },
    {
      section: 'External Secrets',
      items: [
        {
          name: 'N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL',
          type: 'Input',
          defaultValue: 300,
          description: 'How often (in seconds) to check for secret updates.',
        },
      ],
    },
  ],
};

export default externalHooksSecrets;

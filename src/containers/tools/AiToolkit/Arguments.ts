import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const aiToolkitArguments: ArgumentsData = [
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'Network',
        items: [
          {
            name: 'PORT',
            description: 'Custom port for the Next.js web interface (default: 8675).',
            type: 'Number',
            defaultValue: 8675,
            numberMin: 1,
            numberMax: 65535,
          },
        ],
      },
      {
        section: 'Security & Access',
        items: [
          {
            name: 'AI_TOOLKIT_AUTH',
            description:
              'Set an authentication token to secure the UI. This token will be required to access the web interface. ' +
              'Highly recommended when hosting on cloud providers or any network that is not secure.',
            type: 'Input',
          },
          {
            name: 'HF_TOKEN',
            description: 'Hugging Face user access token for downloading gated models and datasets.',
            type: 'Input',
          },
        ],
      },
    ],
  },
];

export default aiToolkitArguments;

import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const aiToolkitArguments: ArgumentsData = [
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'Security',
        items: [
          {
            name: 'AI_TOOLKIT_AUTH',
            description:
              'Set an authentication token to secure the UI. This token will be required to access the web interface. ' +
              'Highly recommended when hosting on cloud providers or any network that is not secure.',
            type: 'Input',
          },
        ],
      },
    ],
  },
];

export default aiToolkitArguments;

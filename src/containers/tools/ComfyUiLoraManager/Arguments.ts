import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const loraManagerArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Network',
        items: [
          {
            name: '--host',
            description: 'Specify the IP address to listen on (default: 127.0.0.1)',
            type: 'Input',
            defaultValue: '127.0.0.1',
          },
          {
            name: '--port',
            description: 'Set the listen port (default: 8188)',
            type: 'Input',
            defaultValue: 8188,
          },
        ],
      },
    ],
  },
];

export default loraManagerArguments;

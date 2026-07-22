/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const externalStorage: DataItem = {
  category: 'External Storage',
  items: [
    {
      name: 'N8N_EXTERNAL_STORAGE_S3_HOST',
      type: 'Input',
      description:
        'Host of the n8n bucket in S3-compatible external storage. For example, `s3.us-east-1.amazonaws.com`',
    },
    {
      name: 'N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME',
      type: 'Input',
      description: 'Name of the n8n bucket in S3-compatible external storage.',
    },
    {
      name: 'N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION',
      type: 'Input',
      description: 'Region of the n8n bucket in S3-compatible external storage. For example, `us-east-1`',
    },
    {
      name: 'N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY',
      type: 'Input',
      description: 'Access key in S3-compatible external storage',
    },
    {
      name: 'N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET',
      type: 'Input',
      description: 'Access secret in S3-compatible external storage.',
    },
    {
      name: 'N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT',
      type: 'CheckBox',
      description:
        'Use automatic credential detection to authenticate S3 calls for external storage. This will ignore the access key and access secret and use the default credential provider chain.',
    },
  ],
};

export default externalStorage;

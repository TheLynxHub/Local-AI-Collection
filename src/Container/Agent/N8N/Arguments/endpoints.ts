/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const endpoints: DataItem = {
  category: 'Endpoints',
  items: [
    {
      name: 'N8N_PAYLOAD_SIZE_MAX',
      type: 'Input',
      defaultValue: 16,
      description: 'The maximum payload size in MiB.',
    },
    {
      name: 'N8N_FORMDATA_FILE_SIZE_MAX',
      type: 'Input',
      defaultValue: 200,
      description: 'Max payload size for files in form-data webhook payloads in MiB.',
    },
    {name: 'N8N_METRICS', type: 'CheckBox', description: 'Whether to enable the /metrics endpoint.'},
    {
      name: 'N8N_METRICS_PREFIX',
      type: 'Input',
      defaultValue: 'n8n_',
      description: 'Optional prefix for n8n specific metrics names.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_DEFAULT_METRICS',
      type: 'CheckBox',
      description: 'Whether to expose default system and node.js metrics.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_CACHE_METRICS',
      type: 'CheckBox',
      description: 'Whether to include metrics (true) for cache hits and misses, or not include them (false).',
    },
    {
      name: 'N8N_METRICS_INCLUDE_MESSAGE_EVENT_BUS_METRICS',
      type: 'CheckBox',
      description: 'Whether to include metrics (true) for events, or not include them (false).',
    },
    {
      name: 'N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL',
      type: 'CheckBox',
      description: 'Whether to include a label for the workflow ID on workflow metrics.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_NODE_TYPE_LABEL',
      type: 'CheckBox',
      description: 'Whether to include a label for the node type on node metrics.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL',
      type: 'CheckBox',
      description: 'Whether to include a label for the credential type on credential metrics.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_API_ENDPOINTS',
      type: 'CheckBox',
      description: 'Whether to expose metrics for API endpoints.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_API_PATH_LABEL',
      type: 'CheckBox',
      description: 'Whether to include a label for the path of API invocations.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_API_METHOD_LABEL',
      type: 'CheckBox',
      description: 'Whether to include a label for the HTTP method (GET, POST, ...) of API invocations.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_API_STATUS_CODE_LABEL',
      type: 'CheckBox',
      description: 'Whether to include a label for the HTTP status code (200, 404, ...) of API invocations.',
    },
    {
      name: 'N8N_METRICS_INCLUDE_QUEUE_METRICS',
      type: 'CheckBox',
      description: 'Whether to include metrics for jobs in scaling mode.',
    },
    {
      name: 'N8N_METRICS_QUEUE_METRICS_INTERVAL',
      type: 'Input',
      defaultValue: 20,
      description: 'How often (in seconds) to update queue metrics.',
    },
    {
      name: 'N8N_ENDPOINT_REST',
      type: 'Input',
      defaultValue: 'rest',
      description: 'The path used for REST endpoint.',
    },
    {
      name: 'N8N_ENDPOINT_WEBHOOK',
      type: 'Input',
      defaultValue: 'webhook',
      description: 'The path used for webhook endpoint.',
    },
    {
      name: 'N8N_ENDPOINT_WEBHOOK_TEST',
      type: 'Input',
      defaultValue: 'webhook-test',
      description: 'The path used for test-webhook endpoint.',
    },
    {
      name: 'N8N_ENDPOINT_WEBHOOK_WAIT',
      type: 'Input',
      defaultValue: 'webhook-waiting',
      description: 'The path used for waiting-webhook endpoint.',
    },
    {
      name: 'WEBHOOK_URL',
      type: 'Input',
      description: 'Used to manually provide the Webhook URL when running n8n behind a reverse proxy.',
    },
    {
      name: 'N8N_DISABLE_PRODUCTION_MAIN_PROCESS',
      type: 'CheckBox',
      description:
        'Disable production webhooks from main process. This helps ensure no HTTP traffic load to main process when using webhook-specific processes.',
    },
  ],
};

export default endpoints;

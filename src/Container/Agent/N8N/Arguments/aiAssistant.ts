/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const aiAssistant: DataItem = {
  category: 'AI Assistant',
  items: [
    {
      name: 'N8N_AI_ENABLED',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether AI features (such as AI nodes and AI assistant) are enabled globally.',
    },
    {
      name: 'N8N_AI_ASSISTANT_BASE_URL',
      type: 'Input',
      description:
        'Base URL of the AI assistant service, specified as `https://ai-assistant.n8n.io`. Required if you self-host n8n and want to enable the AI Assistant.',
    },
    {
      name: 'N8N_AI_ALLOW_SENDING_PARAMETER_VALUES',
      type: 'CheckBox',
      defaultValue: true,
      description:
        'Whether workflow and node parameter values may be sent to AI providers. When false, only structure or placeholders are sent.',
    },
    {
      name: 'N8N_AI_AGENT_MAX_PASSTHROUGH_BINARY_SIZE_BYTES',
      type: 'Input',
      defaultValue: 52428800,
      description:
        'Maximum size in bytes of a single binary file (e.g. an image or PDF) that the AI Agent node will pass through to a model. Default: 50 MB (52428800 bytes).',
    },
  ],
};

export default aiAssistant;

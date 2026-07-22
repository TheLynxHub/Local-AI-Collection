/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const aiAssistant: DataItem = {
  category: 'AI Assistant',
  items: [
    {
      name: 'N8N_AI_ASSISTANT_BASE_URL',
      type: 'Input',
      description:
        'Base URL of the AI assistant service, specified as `https://ai-assistant.n8n.io`. Required if you self-host n8n and want to enable the AI Assistant.',
    },
  ],
};

export default aiAssistant;

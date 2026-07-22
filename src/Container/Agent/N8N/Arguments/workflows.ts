/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const workflows: DataSection = {
  category: 'Workflows',
  sections: [
    {
      section: 'Workflows',
      items: [
        {
          name: 'N8N_ONBOARDING_FLOW_DISABLED',
          type: 'CheckBox',
          description: 'Whether to disable onboarding tips when creating a new workflow (true) or not (false).',
        },
        {
          name: 'N8N_WORKFLOW_ACTIVATION_BATCH_SIZE',
          type: 'Input',
          defaultValue: 1,
          description: 'How many workflows to publish simultaneously during startup.',
        },
        {
          name: 'N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION',
          type: 'Input',
          defaultValue: 'workflowsFromSameOwner',
          description:
            'Which workflows can call a workflow. Options are: any, none, workflowsFromAList, workflowsFromSameOwner. This feature requires Workflow sharing.',
        },
        {
          name: 'N8N_WORKFLOW_TAGS_DISABLED',
          type: 'CheckBox',
          description: 'Whether to disable workflow tags (true) or enable tags (false).',
        },
        {
          name: 'WORKFLOWS_DEFAULT_NAME',
          type: 'Input',
          defaultValue: 'My workflow',
          description: 'The default name used for new workflows.',
        },
      ],
    },
    {
      section: 'Workflow History',
      items: [
        {
          name: 'N8N_WORKFLOW_HISTORY_PRUNE_TIME',
          type: 'Input',
          defaultValue: -1,
          description:
            'How long to keep workflow history versions before automatically deleting them (in hours). Set to `-1` to keep all versions indefinitely.',
        },
      ],
    },
  ],
};

export default workflows;

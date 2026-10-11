/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const executions: DataItem = {
  category: 'Executions',
  items: [
    {
      name: 'EXECUTIONS_MODE',
      type: 'DropDown',
      defaultValue: 'regular',
      values: ['regular', 'queue'],
      description: 'Whether executions should run directly or using queue.',
    },
    {
      name: 'EXECUTIONS_TIMEOUT',
      type: 'Number',
      defaultValue: -1,
      numberMin: -1,
      description:
        'Sets a default timeout (in seconds) to all workflows after which n8n stops their execution. Users can override this for individual workflows up to the duration set in EXECUTIONS_TIMEOUT_MAX. Set EXECUTIONS_TIMEOUT to -1 to disable.',
    },
    {
      name: 'EXECUTIONS_TIMEOUT_MAX',
      type: 'Number',
      defaultValue: 3600,
      numberMin: 1,
      description: 'The maximum execution time (in seconds) that users can set for an individual workflow.',
    },
    {
      name: 'N8N_AI_TIMEOUT_MAX',
      type: 'Number',
      defaultValue: 3600000,
      numberMin: 1000,
      description:
        'Sets the HTTP request timeout in milliseconds for AI and LLM nodes (such as OpenAI, Anthropic, Mistral, and Ollama). This controls how long n8n waits for responses from AI services before timing out. Useful for slower local AI services or complex prompts that require longer processing time.',
    },
    {
      name: 'EXECUTIONS_DATA_SAVE_ON_ERROR',
      type: 'DropDown',
      defaultValue: 'all',
      values: ['all', 'none'],
      description: 'Whether n8n saves execution data on error.',
    },
    {
      name: 'EXECUTIONS_DATA_SAVE_ON_SUCCESS',
      type: 'DropDown',
      defaultValue: 'all',
      values: ['all', 'none'],
      description: 'Whether n8n saves execution data on success.',
    },
    {
      name: 'EXECUTIONS_DATA_SAVE_ON_PROGRESS',
      type: 'CheckBox',
      description: 'Whether to save progress for each node executed (true) or not (false).',
    },
    {
      name: 'EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS',
      type: 'CheckBox',
      description: 'Whether to save data of executions when started manually.',
    },
    {
      name: 'EXECUTIONS_DATA_PRUNE',
      type: 'CheckBox',
      defaultValue: true,
      description: 'Whether to delete data of past executions on a rolling basis.',
    },
    {
      name: 'EXECUTIONS_DATA_MAX_AGE',
      type: 'Number',
      defaultValue: 336,
      numberMin: 1,
      description: "The execution age (in hours) before it's deleted.",
    },
    {
      name: 'EXECUTIONS_DATA_PRUNE_MAX_COUNT',
      type: 'Number',
      defaultValue: 10000,
      numberMin: 0,
      description: 'Maximum number of executions to keep in the database. 0 = no limit',
    },
    {
      name: 'EXECUTIONS_DATA_HARD_DELETE_BUFFER',
      type: 'Number',
      defaultValue: 1,
      numberMin: 0,
      description:
        'How old (hours) the finished execution data has to be to get hard-deleted. By default, this buffer excludes recent executions as the user may need them while building a workflow.',
    },
    {
      name: 'EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL',
      type: 'Number',
      defaultValue: 15,
      numberMin: 1,
      description: 'How often (minutes) execution data should be hard-deleted.',
    },
    {
      name: 'EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL',
      type: 'Number',
      defaultValue: 60,
      numberMin: 1,
      description: 'How often (minutes) execution data should be soft-deleted.',
    },
    {
      name: 'EXECUTIONS_DATA_MAX_DISPLAY_SIZE',
      type: 'Number',
      defaultValue: 104857600,
      numberMin: 0,
      description:
        'Max byte size of execution run data to load for display. Executions whose data exceeds this are returned without run data. 0 disables.',
    },
    {
      name: 'N8N_CONCURRENCY_PRODUCTION_LIMIT',
      type: 'Number',
      defaultValue: -1,
      numberMin: -1,
      description:
        'Max production executions allowed to run concurrently, in both regular and scaling modes. -1 to disable in regular mode.',
    },
    {
      name: 'N8N_CONCURRENCY_EVALUATION_LIMIT',
      type: 'Number',
      defaultValue: -1,
      numberMin: -1,
      description: 'Max evaluation executions allowed to run concurrently. -1 means unlimited.',
    },
    {
      name: 'N8N_EXECUTIONS_QUEUE_RECOVERY_INTERVAL',
      type: 'Number',
      defaultValue: 180,
      numberMin: 1,
      description: 'How often (in minutes) to check for queue recovery.',
    },
    {
      name: 'N8N_EXECUTIONS_QUEUE_RECOVERY_BATCH',
      type: 'Number',
      defaultValue: 100,
      numberMin: 1,
      description: 'Size of batch of executions to check for queue recovery.',
    },
    {
      name: 'N8N_EXECUTIONS_QUEUE_KEEP_LAST_COMPLETED',
      type: 'Number',
      defaultValue: 0,
      numberMin: 0,
      description:
        'How many completed Bull jobs to keep in Redis. 0 removes completed jobs immediately; n keeps the last n.',
    },
    {
      name: 'N8N_EXECUTIONS_QUEUE_KEEP_LAST_FAILED',
      type: 'Number',
      defaultValue: 0,
      numberMin: 0,
      description: 'How many failed Bull jobs to keep in Redis. 0 removes failed jobs immediately; n keeps the last n.',
    },
    {
      name: 'N8N_WORKFLOW_AUTODEACTIVATION_ENABLED',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether workflows are automatically unpublished after repeated crashed executions.',
    },
    {
      name: 'N8N_WORKFLOW_AUTODEACTIVATION_MAX_LAST_EXECUTIONS',
      type: 'Number',
      defaultValue: 3,
      numberMin: 1,
      description: 'Number of crashed executions before unpublishing a workflow.',
    },
  ],
};

export default executions;

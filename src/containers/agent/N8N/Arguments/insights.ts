/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const insights: DataItem = {
  category: 'Insights',
  items: [
    {
      name: 'N8N_DISABLED_MODULES',
      type: 'Input',
      description: 'Set to `insights` to disable the feature and metrics collection for an instance.',
    },
    {
      name: 'N8N_INSIGHTS_COMPACTION_BATCH_SIZE',
      type: 'Input',
      defaultValue: 500,
      description: 'The number of raw insights data to compact in a single batch.',
    },
    {
      name: 'N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS',
      type: 'Input',
      defaultValue: 180,
      description: 'The maximum age (in days) of daily insights data to compact.',
    },
    {
      name: 'N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS',
      type: 'Input',
      defaultValue: 90,
      description: 'The maximum age (in days) of hourly insights data to compact.',
    },
    {
      name: 'N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES',
      type: 'Input',
      defaultValue: 60,
      description: 'Interval (in minutes) at which compaction should run.',
    },
    {
      name: 'N8N_INSIGHTS_FLUSH_BATCH_SIZE',
      type: 'Input',
      defaultValue: 1000,
      description: 'The maximum number of insights data to keep in the buffer before flushing.',
    },
    {
      name: 'N8N_INSIGHTS_FLUSH_INTERVAL_SECONDS',
      type: 'Input',
      defaultValue: 30,
      description: 'The interval (in seconds) at which the insights data should be flushed to the database.',
    },
  ],
};

export default insights;

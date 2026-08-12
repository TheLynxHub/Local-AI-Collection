/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const queueMode: DataItem = {
  category: 'Queue Mode',
  items: [
    {
      name: 'OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS',
      type: 'CheckBox',
      description: 'Set to `true` if you want manual executions to run on the worker rather than on main.',
    },
    {name: 'QUEUE_BULL_PREFIX', type: 'Input', description: 'Prefix to use for all queue keys.'},
    {name: 'QUEUE_BULL_REDIS_DB', type: 'Input', defaultValue: 0, description: 'The Redis database used.'},
    {name: 'QUEUE_BULL_REDIS_HOST', type: 'Input', defaultValue: 'localhost', description: 'The Redis host.'},
    {name: 'QUEUE_BULL_REDIS_PORT', type: 'Input', defaultValue: 6379, description: 'The Redis port used.'},
    {
      name: 'QUEUE_BULL_REDIS_USERNAME',
      type: 'Input',
      description: "The Redis username (needs Redis version 6 or above). Don't define it for Redis < 6 compatibility",
    },
    {name: 'QUEUE_BULL_REDIS_PASSWORD', type: 'Input', description: 'The Redis password.'},
    {
      name: 'QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD',
      type: 'Input',
      defaultValue: 10000,
      description: 'The Redis timeout threshold (in ms).',
    },
    {
      name: 'QUEUE_BULL_REDIS_CLUSTER_NODES',
      type: 'Input',
      description:
        'Expects a comma-separated list of Redis Cluster nodes in the format `host:port`, for the Redis client to initially connect to. If running in queue mode (`EXECUTIONS_MODE = queue`), setting this variable will create a Redis Cluster client instead of a Redis client, and n8n will ignore `QUEUE_BULL_REDIS_HOST` and `QUEUE_BULL_REDIS_PORT`.',
    },
    {name: 'QUEUE_BULL_REDIS_TLS', type: 'CheckBox', description: 'Enable TLS on Redis connections.'},
    {
      name: 'QUEUE_BULL_REDIS_DUALSTACK',
      type: 'CheckBox',
      description: 'Enable dual-stack support (IPv4 and IPv6) on Redis connections.',
    },
    {
      name: 'QUEUE_WORKER_TIMEOUT',
      type: 'Input',
      defaultValue: 30,
      description:
        '**Deprecated** Use `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` instead. How long should n8n wait (seconds) for running executions before exiting worker process on shutdown.',
    },
    {
      name: 'QUEUE_HEALTH_CHECK_ACTIVE',
      type: 'CheckBox',
      description: 'Whether to enable health checks (true) or disable (false).',
    },
    {
      name: 'QUEUE_HEALTH_CHECK_PORT',
      type: 'Input',
      defaultValue: 5678,
      description:
        'The port to serve health checks on. If you experience a port conflict error when starting a worker server using its default port, change this.',
    },
    {
      name: 'QUEUE_WORKER_LOCK_DURATION',
      type: 'Input',
      defaultValue: 60000,
      description: 'How long (in ms) is the lease period for a worker to work on a message.',
    },
    {
      name: 'QUEUE_WORKER_LOCK_RENEW_TIME',
      type: 'Input',
      defaultValue: 10000,
      description: 'How frequently (in ms) should a worker renew the lease time.',
    },
    {
      name: 'QUEUE_WORKER_STALLED_INTERVAL',
      type: 'Input',
      defaultValue: 30000,
      description: 'How often should a worker check for stalled jobs (use 0 for never).',
    },
    {
      name: 'QUEUE_WORKER_MAX_STALLED_COUNT',
      type: 'Input',
      defaultValue: 1,
      description: 'Maximum amount of times a stalled job will be re-processed.',
    },
    {
      name: 'N8N_MULTI_MAIN_SETUP_ENABLED',
      type: 'CheckBox',
      description: 'Whether to enable multi-main setup for queue mode (license required).',
    },
    {
      name: 'N8N_MULTI_MAIN_SETUP_KEY_TTL',
      type: 'Input',
      defaultValue: 10,
      description: 'Time to live (in seconds) for leader key in multi-main setup.',
    },
    {
      name: 'N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL',
      type: 'Input',
      defaultValue: 3,
      description: 'Interval (in seconds) for leader check in multi-main setup.',
    },
  ],
};

export default queueMode;

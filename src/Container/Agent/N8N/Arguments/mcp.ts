/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const mcp: DataItem = {
  category: 'Model Context Protocol (MCP)',
  items: [
    {
      name: 'N8N_MCP_MANAGED_BY_ENV',
      type: 'CheckBox',
      defaultValue: false,
      description:
        'Set to `true` to manage MCP settings from environment variables. When `true`, n8n applies the MCP variables on every startup and locks the matching UI controls.',
    },
    {
      name: 'N8N_MCP_ACCESS_ENABLED',
      type: 'CheckBox',
      defaultValue: false,
      description: 'Whether to enable instance-level MCP access (`true`) or not (`false`).',
    },
    {
      name: 'N8N_MCP_SERVER_SESSION_IDLE_TTL_MS',
      type: 'Input',
      defaultValue: 900000,
      description:
        'Time in milliseconds an MCP server session may stay idle before it is evicted and its resources released. Default: 15 minutes (900000 ms).',
    },
    {
      name: 'N8N_MCP_SERVER_SESSION_SWEEP_INTERVAL_MS',
      type: 'Input',
      defaultValue: 300000,
      description:
        'Interval in milliseconds between sweeps that evict idle MCP server sessions. Default: 5 minutes (300000 ms).',
    },
    {
      name: 'N8N_MCP_CLIENT_CACHE_TTL_MS',
      type: 'Input',
      defaultValue: 300000,
      description:
        'Time in milliseconds a cached MCP client is kept alive after its last use before being evicted. Default: 5 minutes (300000 ms).',
    },
    {
      name: 'N8N_MCP_CLIENT_CACHE_MAX_SIZE',
      type: 'Input',
      defaultValue: 500,
      description: 'Maximum number of MCP clients kept in the in-memory session cache. Default: 500.',
    },
  ],
};

export default mcp;

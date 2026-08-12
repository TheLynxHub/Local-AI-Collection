/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const nodes: DataItem = {
  category: 'Nodes',
  items: [
    {
      name: 'N8N_COMMUNITY_PACKAGES_ENABLED',
      type: 'CheckBox',
      defaultValue: true,
      description:
        'Enables (true) or disables (false) the functionality to install and load community nodes. If set to false, neither verified nor unverified community packages will be available, regardless of their individual settings.',
    },
    {
      name: 'N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV',
      type: 'CheckBox',
      defaultValue: false,
      description:
        'Set to `true` to manage installed community packages from environment variables. Reconciles installed packages against N8N_COMMUNITY_PACKAGES on startup.',
    },
    {
      name: 'N8N_COMMUNITY_PACKAGES',
      type: 'Input',
      description:
        'JSON array of community packages to install. Each entry is an object with a `name` (required) and optional `version` and `checksum` fields.',
    },
    {
      name: 'N8N_COMMUNITY_PACKAGES_PREVENT_LOADING',
      type: 'CheckBox',
      description:
        'Prevents (true) or allows (false) loading installed community nodes on instance startup. Use this if a faulty node prevents the instance from starting.',
    },
    {
      name: 'N8N_COMMUNITY_PACKAGES_REGISTRY',
      type: 'Input',
      defaultValue: 'https://registry.npmjs.org',
      description: 'NPM registry URL to pull community packages from (license required).',
    },
    {
      name: 'N8N_CUSTOM_EXTENSIONS',
      type: 'Input',
      description: 'Specify the path to directories containing your custom nodes.',
    },
    {
      name: 'N8N_PYTHON_ENABLED',
      type: 'CheckBox',
      description: 'Whether to enable Python execution on the Code node.',
    },
    {
      name: 'N8N_UNVERIFIED_PACKAGES_ENABLED',
      type: 'CheckBox',
      description:
        'When N8N_COMMUNITY_PACKAGES_ENABLED is true, this variable controls whether to enable the installation and use of unverified community nodes from an NPM registry (true) or not (false).',
    },
    {
      name: 'N8N_VERIFIED_PACKAGES_ENABLED',
      type: 'CheckBox',
      description:
        'When N8N_COMMUNITY_PACKAGES_ENABLED is true, this variable controls whether to show verified community nodes in the nodes panel for installation and use (true) or to hide them (false).',
    },
    {
      name: 'NODE_FUNCTION_ALLOW_BUILTIN',
      type: 'Input',
      description:
        'Permit users to import specific built-in modules in the Code node. Use * to allow all. n8n disables importing modules by default.',
    },
    {
      name: 'NODE_FUNCTION_ALLOW_EXTERNAL',
      type: 'Input',
      description:
        'Permit users to import specific external modules (from n8n/node_modules) in the Code node. n8n disables importing modules by default.',
    },
    {
      name: 'NODES_ERROR_TRIGGER_TYPE',
      type: 'Input',
      defaultValue: 'n8n-nodes-base.errorTrigger',
      description: 'Specify which node type to use as Error Trigger.',
    },
    {
      name: 'NODES_EXCLUDE',
      type: 'Input',
      defaultValue: '["n8n-nodes-base.executeCommand", "n8n-nodes-base.localFileTrigger"]',
      description:
        'Specify which nodes not to load. For example, to block nodes that can be a security risk if users aren\'t trustworthy: NODES_EXCLUDE: "["n8n-nodes-base.executeCommand", "@n8n/n8n-nodes-langchain.lmChatDeepSeek"]". To enable all nodes, specify NODES_EXCLUDE: "[]".',
    },
    {name: 'NODES_INCLUDE', type: 'Input', description: 'Specify which nodes to load.'},
  ],
};

export default nodes;

import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const unslothStudioArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Server Configuration',
        items: [
          {
            name: '--host',
            description: 'The host address to bind the server to (use 0.0.0.0 for external access).',
            defaultValue: '127.0.0.1',
            type: 'Input',
          },
          {
            name: '--port',
            description: 'The port the server will listen on.',
            defaultValue: 8888,
            type: 'Number',
          },
          {
            name: '--parallel',
            description: 'llama-server parallel decode slots (1..64). Default is 1.',
            defaultValue: 1,
            type: 'Number',
          },
          {
            name: '--api-only',
            description: 'Run API server only, no frontend serving.',
            defaultValue: false,
            type: 'CheckBox',
          },
          {
            name: '--silent',
            description: 'Run the server silently without verbose output.',
            defaultValue: false,
            type: 'CheckBox',
          },
          {
            name: '--verbose',
            description: 'Log every API request, including the high-frequency polling.',
            defaultValue: false,
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Security & Access',
        items: [
          {
            name: '--secure',
            description:
              'Expose ONLY a secure Cloudflare HTTPS link. Binds localhost and fails closed if the tunnel cannot start.',
            defaultValue: false,
            type: 'CheckBox',
          },
          {
            name: '--cloudflare',
            description: 'Expose Unsloth on a public Cloudflare HTTPS tunnel for non-api-only wildcard binds.',
            defaultValue: false,
            type: 'CheckBox',
          },
          {
            name: '--enable-tools',
            description: 'Force server-side tools (web search, code execution) on.',
            defaultValue: false,
            type: 'CheckBox',
          },
          {
            name: '--disable-tools',
            description: 'Force server-side tools (web search, code execution) off.',
            defaultValue: false,
            type: 'CheckBox',
          },
          {
            name: '--password',
            description: 'Set the INITIAL admin password non-interactively (only sets password on first run).',
            defaultValue: '',
            type: 'Input',
          },
        ],
      },
    ],
  },
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'Performance & Optimization',
        items: [
          {
            name: 'UNSLOTH_USE_TRITON',
            description: 'Explicitly enable Triton-based kernel optimizations (1 to enable).',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'UNSLOTH_CPU_THREADS',
            description: "Cap Unsloth's native CPU thread pools on high-core hosts.",
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'UNSLOTH_LLAMA_CPP_BACKEND',
            description: 'Force CPU fallback or specify backend for llama.cpp prebuilt (e.g. cpu).',
            defaultValue: '',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Security & Auth',
        items: [
          {
            name: 'UNSLOTH_STUDIO_PASSWORD',
            description: 'Set the initial admin password non-interactively via environment variable.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'UNSLOTH_STUDIO_BOOTSTRAP_TIMEOUT',
            description: 'Set the bootstrap password timeout in seconds (default 3600). Use 0 or negative to disable.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'UNSLOTH_STUDIO_ENABLE_MCP',
            description: 'Enable the Model Context Protocol (MCP) control endpoint (1 to enable).',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'UNSLOTH_STUDIO_MCP_TOKEN',
            description: 'Token/secret required to authenticate with the MCP control endpoint.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'UNSLOTH_DISABLE_TOOL_CALL_HEALING',
            description: 'Disable self-healing tool calling mechanism in inference (1 to disable).',
            defaultValue: '',
            type: 'Input',
          },
        ],
      },
    ],
  },
];

export default unslothStudioArguments;

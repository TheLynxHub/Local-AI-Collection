import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const llamaCppArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Server & Network Settings',
        items: [
          {
            name: '--host',
            description: 'Hostname or IP address to listen on, or bind to UNIX socket (.sock). Default: 127.0.0.1.',
            type: 'Input',
            defaultValue: '127.0.0.1',
          },
          {
            name: '--port',
            description: 'Port to listen on. Default: 8080.',
            type: 'Number',
            defaultValue: 8080,
            numberMin: 1,
            numberMax: 65535,
          },
          {
            name: '--path',
            description: 'Path for static web assets directory to serve custom web frontend UI.',
            type: 'Directory',
          },
          {
            name: '--api-key',
            description: 'API key required for authenticating client requests to HTTP server (comma-separated list).',
            type: 'Input',
          },
          {
            name: '--cors-origins',
            description: 'Comma-separated list of allowed origins for CORS. Default: *',
            type: 'Input',
            defaultValue: '*',
          },
          {
            name: '--threads',
            description: 'Number of CPU threads to use during generation processing (-t).',
            type: 'Number',
            numberMin: 1,
            numberMax: 128,
          },
          {
            name: '--threads-http',
            description: 'Number of threads used to process HTTP requests.',
            type: 'Number',
            defaultValue: -1,
          },
          {
            name: '--timeout',
            description: 'Server read/write timeout in seconds. Default: 3600.',
            type: 'Number',
            defaultValue: 3600,
            numberMin: 1,
          },
          {
            name: '--metrics',
            description: 'Enable Prometheus compatible metrics endpoint /metrics.',
            type: 'CheckBox',
          },
          {
            name: '--slots',
            description: 'Expose slots monitoring endpoint.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--ui',
            description: 'Whether to enable the Web UI frontend.',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'Model & Loading Options',
        items: [
          {
            name: '--model',
            description: 'Path to local GGUF model file (-m).',
            type: 'File',
          },
          {
            name: '--model-url',
            description: 'HTTP/HTTPS URL to download model file automatically (-mu).',
            type: 'Input',
          },
          {
            name: '--hf-repo',
            description: 'Hugging Face model repository (e.g. ggml-org/GLM-4.7-Flash-GGUF:Q4_K_M).',
            type: 'Input',
          },
          {
            name: '--hf-file',
            description: 'Hugging Face model file. If specified, overrides quant in --hf-repo.',
            type: 'Input',
          },
          {
            name: '--hf-token',
            description: 'Hugging Face access token for private or gated models.',
            type: 'Input',
          },
          {
            name: '--load-mode',
            description: 'Model loading mode: auto, none, mmap, mlock, mmap+mlock, dio (DirectIO).',
            type: 'DropDown',
            values: ['auto', 'none', 'mmap', 'mlock', 'mmap+mlock', 'dio'],
            defaultValue: 'auto',
          },
          {
            name: '--ctx-size',
            description: 'Size of the prompt context window (-c). Default: 0 (loaded from model).',
            type: 'Number',
            defaultValue: 4096,
            numberMin: 0,
            numberMax: 1048576,
          },
          {
            name: '--batch-size',
            description: 'Logical maximum batch size (-b). Default: 2048.',
            type: 'Number',
            defaultValue: 2048,
            numberMin: 1,
          },
          {
            name: '--ubatch-size',
            description: 'Physical maximum batch size (-ub). Default: 512.',
            type: 'Number',
            defaultValue: 512,
            numberMin: 1,
          },
          {
            name: '--parallel',
            description: 'Number of server slots for parallel decoding (-np). Default: -1 (auto).',
            type: 'Number',
            defaultValue: -1,
          },
        ],
      },
      {
        section: 'Reasoning & Thinking Parameters',
        items: [
          {
            name: '--reasoning',
            description: 'Enable reasoning/thinking in chat (-rea): on, off, auto (detect from template).',
            type: 'DropDown',
            values: ['auto', 'on', 'off'],
            defaultValue: 'auto',
          },
          {
            name: '--reasoning-format',
            description: 'Controls thought tag extraction format: auto, none, deepseek, deepseek-legacy.',
            type: 'DropDown',
            values: ['auto', 'none', 'deepseek', 'deepseek-legacy'],
            defaultValue: 'auto',
          },
          {
            name: '--reasoning-budget',
            description: 'Token budget for thinking: -1 for unrestricted, 0 for immediate end, N>0 for token budget.',
            type: 'Number',
            defaultValue: -1,
          },
          {
            name: '--reasoning-budget-message',
            description: 'Message injected before end-of-thinking tag when reasoning budget is exhausted.',
            type: 'Input',
          },
          {
            name: '--reasoning-preserve',
            description: 'Preserve reasoning trace in full history, not just the last assistant message.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Hardware & Acceleration Offloading',
        items: [
          {
            name: '--n-gpu-layers',
            description: 'Max number of layers to store in VRAM (-ngl). Number, auto, or all.',
            type: 'Input',
            defaultValue: 'auto',
          },
          {
            name: '--device',
            description: 'Comma-separated list of devices to use for offloading (-dev, e.g. CUDA0, Vulkan0).',
            type: 'Input',
          },
          {
            name: '--flash-attn',
            description: 'Set Flash Attention use (-fa): auto, on, or off.',
            type: 'DropDown',
            values: ['auto', 'on', 'off'],
            defaultValue: 'auto',
          },
          {
            name: '--cont-batching',
            description: 'Enable continuous dynamic batching (-cb).',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--cache-type-k',
            description: 'KV cache data type for K (-ctk): f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1.',
            type: 'DropDown',
            values: ['f16', 'f32', 'bf16', 'q8_0', 'q4_0', 'q4_1', 'iq4_nl', 'q5_0', 'q5_1'],
            defaultValue: 'f16',
          },
          {
            name: '--cache-type-v',
            description: 'KV cache data type for V (-ctv): f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1.',
            type: 'DropDown',
            values: ['f16', 'f32', 'bf16', 'q8_0', 'q4_0', 'q4_1', 'iq4_nl', 'q5_0', 'q5_1'],
            defaultValue: 'f16',
          },
          {
            name: '--split-mode',
            description: 'How to split model across multiple GPUs (-sm): layer, row, tensor, none.',
            type: 'DropDown',
            values: ['layer', 'row', 'tensor', 'none'],
            defaultValue: 'layer',
          },
          {
            name: '--main-gpu',
            description: 'Main GPU index to use (-mg). Default: 0.',
            type: 'Number',
            defaultValue: 0,
            numberMin: 0,
          },
          {
            name: '--tensor-split',
            description: 'Fraction of model offloaded to each GPU (-ts), e.g. 3,1 for 75%/25%.',
            type: 'Input',
          },
          {
            name: '--cpu-moe',
            description: 'Keep all Mixture of Experts (MoE) weights in CPU (-cmoe).',
            type: 'CheckBox',
          },
          {
            name: '--n-cpu-moe',
            description: 'Keep MoE weights of first N layers in CPU (-ncmoe).',
            type: 'Number',
          },
          {
            name: '--numa',
            description: 'NUMA optimization strategy: distribute, isolate, numactl.',
            type: 'DropDown',
            values: ['distribute', 'isolate', 'numactl'],
          },
        ],
      },
      {
        section: 'Multimodal & Projector Options',
        items: [
          {
            name: '--mmproj',
            description: 'Path to multimodal projector file (-mm).',
            type: 'File',
          },
          {
            name: '--mmproj-url',
            description: 'URL to download multimodal projector file (-mmu).',
            type: 'Input',
          },
          {
            name: '--mmproj-auto',
            description: 'Automatically use multimodal projector file if available.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--mmproj-offload',
            description: 'Enable GPU offloading for multimodal projector.',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'Built-in Tools & Agent Capabilities',
        items: [
          {
            name: '--agent',
            description: 'Enable CORS proxy and all built-in agent tools (-ag).',
            type: 'CheckBox',
          },
          {
            name: '--tools',
            description: 'Comma-separated list of built-in tools or "all" (e.g. read_file, exec_shell_command).',
            type: 'Input',
          },
          {
            name: '--tools-runtime',
            description: 'Separate runtime environment for tools: none, docker:, podman:, ssh:.',
            type: 'Input',
          },
          {
            name: '--mcp-servers-config',
            description: 'Path to JSON file with MCP server definitions (Cursor-compatible format).',
            type: 'File',
          },
        ],
      },
      {
        section: 'Speculative Decoding',
        items: [
          {
            name: '--spec-type',
            description: 'Types of speculative decoding: none, draft-simple, draft-eagle3, draft-mtp, ngram-simple.',
            type: 'Input',
          },
          {
            name: '--model-draft',
            description: 'Path to draft GGUF model file for speculative decoding (-md).',
            type: 'File',
          },
          {
            name: '--n-gpu-layers-draft',
            description: 'Max number of draft model layers to store in VRAM (-ngld).',
            type: 'Input',
            defaultValue: 'auto',
          },
          {
            name: '--spec-draft-n-max',
            description: 'Number of tokens to draft for speculative decoding. Default: 3.',
            type: 'Number',
            defaultValue: 3,
          },
        ],
      },
      {
        section: 'Sampling & Generation Parameters',
        items: [
          {
            name: '--temp',
            description: 'Temperature sampling value. Higher = creative, lower = deterministic. Default: 0.8.',
            type: 'Number',
            defaultValue: 0.8,
            numberStep: 0.05,
            numberMin: 0,
            numberMax: 2,
          },
          {
            name: '--top-p',
            description: 'Top-P (nucleus) sampling threshold. Default: 0.95.',
            type: 'Number',
            defaultValue: 0.95,
            numberStep: 0.05,
            numberMin: 0,
            numberMax: 1,
          },
          {
            name: '--top-k',
            description: 'Top-K sampling limit. Default: 40 (0 = disabled).',
            type: 'Number',
            defaultValue: 40,
            numberMin: 0,
          },
          {
            name: '--min-p',
            description: 'Min-P sampling threshold. Default: 0.05 (0.0 = disabled).',
            type: 'Number',
            defaultValue: 0.05,
            numberStep: 0.01,
            numberMin: 0,
            numberMax: 1,
          },
          {
            name: '--repeat-penalty',
            description: 'Penalize repeat sequence of tokens. Default: 1.0.',
            type: 'Number',
            defaultValue: 1.0,
            numberStep: 0.05,
            numberMin: 1.0,
          },
          {
            name: '--repeat-last-n',
            description: 'Last N tokens to consider for penalizing repeat sequences. Default: 64.',
            type: 'Number',
            defaultValue: 64,
          },
          {
            name: '--presence-penalty',
            description: 'Repeat alpha presence penalty.',
            type: 'Number',
            defaultValue: 0,
            numberStep: 0.1,
          },
          {
            name: '--frequency-penalty',
            description: 'Repeat alpha frequency penalty.',
            type: 'Number',
            defaultValue: 0,
            numberStep: 0.1,
          },
          {
            name: '--dry-multiplier',
            description: 'DRY sampling multiplier. Default: 0.0 (disabled).',
            type: 'Number',
            defaultValue: 0,
            numberStep: 0.1,
          },
          {
            name: '--dry-base',
            description: 'DRY sampling base value. Default: 1.75.',
            type: 'Number',
            defaultValue: 1.75,
            numberStep: 0.05,
          },
          {
            name: '--dry-allowed-length',
            description: 'Allowed length for DRY sampling. Default: 2.',
            type: 'Number',
            defaultValue: 2,
          },
          {
            name: '--dry-penalty-last-n',
            description: 'DRY penalty for the last N tokens. Default: 64.',
            type: 'Number',
            defaultValue: 64,
          },
          {
            name: '--dynatemp-range',
            description: 'Dynamic temperature range. Default: 0.0 (disabled).',
            type: 'Number',
            defaultValue: 0,
            numberStep: 0.1,
          },
          {
            name: '--dynatemp-exp',
            description: 'Dynamic temperature exponent. Default: 1.0.',
            type: 'Number',
            defaultValue: 1.0,
            numberStep: 0.1,
          },
          {
            name: '--mirostat',
            description: 'Use Mirostat sampling (0 = disabled, 1 = Mirostat 1.0, 2 = Mirostat 2.0).',
            type: 'DropDown',
            values: ['0', '1', '2'],
            defaultValue: '0',
          },
        ],
      },
      {
        section: 'Prompt & Chat Templates',
        items: [
          {
            name: '--chat-template',
            description: 'Pre-defined chat template or custom Jinja template string.',
            type: 'Input',
          },
          {
            name: '--jinja',
            description: 'Enable Jinja template engine for chat parsing.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--prefill-assistant',
            description: 'Prefill assistant response if last message is an assistant message.',
            type: 'CheckBox',
            defaultValue: true,
          },
          {
            name: '--system-prompt',
            description: 'Default system prompt string.',
            type: 'Input',
          },
          {
            name: '--prompt-file',
            description: 'Path to text file containing prompt template.',
            type: 'File',
          },
        ],
      },
    ],
  },
];

export default llamaCppArguments;

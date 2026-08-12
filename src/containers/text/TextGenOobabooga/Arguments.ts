import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const oobaboogaArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Basic settings',
        items: [
          {
            name: '--user-data-dir',
            description: 'Path to the user data directory. Default: auto-detected.',
            type: 'Directory',
          },
          {
            name: '--multi-user',
            description:
              'Multi-user mode. Chat histories are not saved or automatically loaded.' +
              ' Warning: this is likely not safe for sharing publicly.',
            type: 'CheckBox',
          },
          {
            name: '--character',
            description: 'The name of the character to load in chat mode by default.',
            type: 'Input',
          },
          {
            name: '--model',
            description: 'Name of the model to load by default.',
            type: 'Input',
          },
          {
            name: '--lora',
            description:
              'The list of LoRAs to load. If you want to load more than one LoRA, write the names separated by spaces.',
            type: 'Input',
          },
          {
            name: '--model-dir',
            description: 'Path to directory with all the models.',
            type: 'Directory',
            defaultValue: 'user_data/models',
          },
          {
            name: '--lora-dir',
            description: 'Path to directory with all the loras.',
            type: 'Directory',
            defaultValue: 'user_data/loras',
          },
          {
            name: '--model-menu',
            description: 'Show a model menu in the terminal when the web UI is first launched.',
            type: 'CheckBox',
          },
          {
            name: '--settings',
            description:
              'Load the default interface settings from this yaml file. See user_data/settings-template.yaml' +
              ' for an example. If you create a file called user_data/settings.yaml, this file will be loaded' +
              ' by default without the need to use the --settings flag.',
            type: 'File',
          },
          {
            name: '--extensions',
            description:
              'The list of extensions to load. If you want to load more than one extension, write ' +
              'the names separated by spaces.',
            type: 'Input',
          },
          {
            name: '--verbose',
            description: 'Print the prompts to the terminal.',
            type: 'CheckBox',
          },
          {
            name: '--idle-timeout',
            description:
              'Unload model after this many minutes of inactivity. It will be automatically' +
              ' reloaded when you try to use it again.',
            type: 'Input',
            defaultValue: '0',
          },
        ],
      },
      {
        section: 'Image model',
        items: [
          {
            name: '--image-model',
            description: 'Name of the image model to select on startup (overrides saved setting).',
            type: 'Input',
          },
          {
            name: '--image-model-dir',
            description: 'Path to directory with all the image models.',
            type: 'Directory',
            defaultValue: 'user_data/image_models',
          },
          {
            name: '--image-dtype',
            description: 'Data type for image model.',
            type: 'DropDown',
            values: ['bfloat16', 'float16'],
          },
          {
            name: '--image-attn-backend',
            description: 'Attention backend for image model.',
            type: 'DropDown',
            values: ['flash_attention_2', 'sdpa'],
          },
          {
            name: '--image-cpu-offload',
            description: 'Enable CPU offloading for image model.',
            type: 'CheckBox',
          },
          {
            name: '--image-compile',
            description: 'Compile the image model for faster inference.',
            type: 'CheckBox',
          },
          {
            name: '--image-quant',
            description: 'Quantization method for image model.',
            type: 'DropDown',
            values: ['none', 'bnb-8bit', 'bnb-4bit', 'torchao-int8wo', 'torchao-fp4', 'torchao-float8wo'],
          },
        ],
      },
      {
        section: 'Model loader',
        items: [
          {
            name: '--loader',
            description:
              'Choose the model loader manually, otherwise, it will get autodetected. Valid options:' +
              ' Transformers, llama.cpp, ExLlamav3_HF, ExLlamav3, TensorRT-LLM.',
            type: 'DropDown',
            values: ['Transformers', 'llama.cpp', 'ExLlamav3_HF', 'ExLlamav3', 'TensorRT-LLM'],
          },
        ],
      },
      {
        section: 'Context and cache',
        items: [
          {
            name: '--ctx-size',
            description:
              'Context size in tokens. 0 = auto for llama.cpp (requires gpu-layers=-1), 8192 for other loaders.',
            type: 'Input',
            defaultValue: '0',
          },
          {
            name: '--cache-type',
            description:
              'KV cache type; valid options: llama.cpp - fp16, q8_0, q4_0;' +
              ' ExLlamaV3 - fp16, q2 to q8 (can specify k_bits and v_bits separately, e.g. q4_q8).',
            type: 'Input',
            defaultValue: 'fp16',
          },
        ],
      },
      {
        section: 'Speculative decoding',
        items: [
          {
            name: '--model-draft',
            description: 'Path to the draft model for speculative decoding.',
            type: 'File',
          },
          {
            name: '--draft-max',
            description: 'Number of tokens to draft for speculative decoding.',
            type: 'Input',
            defaultValue: '3',
          },
          {
            name: '--gpu-layers-draft',
            description: 'Number of layers to offload to the GPU for the draft model.',
            type: 'Input',
            defaultValue: '256',
          },
          {
            name: '--device-draft',
            description: 'Comma-separated list of devices to use for offloading the draft model. Example: CUDA0,CUDA1',
            type: 'Input',
          },
          {
            name: '--ctx-size-draft',
            description: 'Size of the prompt context for the draft model. If 0, uses the same as the main model.',
            type: 'Input',
            defaultValue: '0',
          },
          {
            name: '--spec-type',
            description:
              'Speculative decoding type. Recommended: draft-mtp if the main model is an MTP build, otherwise ngram-mod.',
            type: 'DropDown',
            values: ['none', 'draft-mtp', 'ngram-mod', 'ngram-simple', 'ngram-map-k', 'ngram-map-k4v'],
            defaultValue: 'none',
          },
          {
            name: '--spec-ngram-size-n',
            description: 'N-gram lookup size for ngram speculative decoding.',
            type: 'Input',
            defaultValue: '24',
          },
          {
            name: '--spec-ngram-size-m',
            description: 'Draft n-gram size for ngram speculative decoding.',
            type: 'Input',
            defaultValue: '48',
          },
          {
            name: '--spec-ngram-min-hits',
            description: 'Minimum n-gram hits for ngram-map speculative decoding.',
            type: 'Input',
            defaultValue: '1',
          },
        ],
      },
      {
        section: 'llama.cpp',
        items: [
          {
            name: '--gpu-layers',
            description: 'Number of layers to offload to the GPU. -1 = auto.',
            type: 'Input',
            defaultValue: '-1',
          },
          {
            name: '--cpu-moe',
            description: 'Move the experts to the CPU (for MoE models).',
            type: 'CheckBox',
          },
          {
            name: '--mmproj',
            description: 'Path to the mmproj file for vision models.',
            type: 'File',
          },
          {
            name: '--streaming-llm',
            description:
              'Activate StreamingLLM to avoid re-evaluating the entire prompt when old messages are removed.',
            type: 'CheckBox',
          },
          {
            name: '--tensor-split',
            description: 'Split the model across multiple GPUs. Comma-separated list of proportions. Example: 60,40.',
            type: 'Input',
          },
          {
            name: '--split-mode',
            description:
              'How to split the model across multiple GPUs. "tensor" can make multi-GPU significantly faster.',
            type: 'DropDown',
            values: ['layer', 'row', 'tensor', 'none'],
            defaultValue: 'layer',
          },
          {
            name: '--no-mmap',
            description: 'Prevent mmap from being used.',
            type: 'CheckBox',
          },
          {
            name: '--mlock',
            description: 'Force the system to keep the model in RAM.',
            type: 'CheckBox',
          },
          {
            name: '--no-kv-offload',
            description: 'Do not offload the K, Q, V to the GPU. This saves VRAM but reduces performance.',
            type: 'CheckBox',
          },
          {
            name: '--batch-size',
            description:
              'Maximum number of prompt tokens to batch together when calling llama-server (application level batch size).',
            type: 'Input',
            defaultValue: '1024',
          },
          {
            name: '--ubatch-size',
            description:
              'Maximum number of prompt tokens to batch together when calling llama-server (device level physical batch size).',
            type: 'Input',
            defaultValue: '1024',
          },
          {
            name: '--threads',
            description: 'Number of threads to use.',
            type: 'Input',
            defaultValue: '0',
          },
          {
            name: '--threads-batch',
            description: 'Number of threads to use for batches/prompt processing.',
            type: 'Input',
            defaultValue: '0',
          },
          {
            name: '--numa',
            description: 'Activate NUMA task allocation for llama.cpp.',
            type: 'CheckBox',
          },
          {
            name: '--parallel',
            description: 'Number of parallel request slots. The context size is divided equally among slots.',
            type: 'Input',
            defaultValue: '1',
          },
          {
            name: '--fit-target',
            description: 'Target VRAM margin per device for auto GPU layers, comma-separated list of values in MiB.',
            type: 'Input',
            defaultValue: '512',
          },
          {
            name: '--extra-flags',
            description: 'Extra flags to pass to llama-server. Example: "--jinja --rpc 192.168.1.100:50052".',
            type: 'Input',
          },
          {
            name: '--ik',
            description: 'Use ik_llama.cpp instead of upstream llama.cpp. Requires ik_llama_cpp_binaries package.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Transformers/Accelerate',
        items: [
          {
            name: '--cpu',
            description: 'Use the CPU to generate text. Warning: Training on CPU is extremely slow.',
            type: 'CheckBox',
          },
          {
            name: '--cpu-memory',
            description: 'Maximum CPU memory in GiB. Use this for CPU offloading.',
            type: 'Input',
          },
          {
            name: '--disk',
            description:
              'If the model is too large for your GPU(s) and CPU combined, send the remaining layers to the disk.',
            type: 'CheckBox',
          },
          {
            name: '--disk-cache-dir',
            description: 'Directory to save the disk cache to.',
            type: 'Directory',
            defaultValue: 'user_data/cache',
          },
          {
            name: '--load-in-8bit',
            description: 'Load the model with 8-bit precision (using bitsandbytes).',
            type: 'CheckBox',
          },
          {
            name: '--bf16',
            description: 'Load the model with bfloat16 precision. Requires NVIDIA Ampere GPU.',
            type: 'CheckBox',
          },
          {
            name: '--no-cache',
            description:
              'Set use_cache to False while generating text. This reduces VRAM usage slightly,' +
              ' but it comes at a performance cost.',
            type: 'CheckBox',
          },
          {
            name: '--trust-remote-code',
            description: 'Set trust_remote_code=True while loading the model. Necessary for some models.',
            type: 'CheckBox',
          },
          {
            name: '--force-safetensors',
            description: 'Set use_safetensors=True while loading the model. This prevents arbitrary code execution.',
            type: 'CheckBox',
          },
          {
            name: '--no_use_fast',
            description:
              "Set use_fast=False while loading the tokenizer (it's True by default). Use this if you" +
              ' have any problems related to use_fast.',
            type: 'CheckBox',
          },
          {
            name: '--attn-implementation',
            description: 'Attention implementation. Valid options: sdpa, eager, flash_attention_2.',
            type: 'DropDown',
            values: ['sdpa', 'eager', 'flash_attention_2'],
            defaultValue: 'sdpa',
          },
        ],
      },
      {
        section: 'bitsandbytes 4-bit',
        items: [
          {
            name: '--load-in-4bit',
            description: 'Load the model with 4-bit precision (using bitsandbytes).',
            type: 'CheckBox',
          },
          {
            name: '--use_double_quant',
            description: 'use_double_quant for 4-bit.',
            type: 'CheckBox',
          },
          {
            name: '--compute_dtype',
            description: 'compute dtype for 4-bit. Valid options: bfloat16, float16, float32.',
            type: 'DropDown',
            values: ['bfloat16', 'float16', 'float32'],
            defaultValue: 'float16',
          },
          {
            name: '--quant_type',
            description: 'quant_type for 4-bit. Valid options: nf4, fp4.',
            type: 'DropDown',
            values: ['nf4', 'fp4'],
            defaultValue: 'nf4',
          },
        ],
      },
      {
        section: 'ExLlamaV3',
        items: [
          {
            name: '--gpu-split',
            description:
              'Comma-separated list of VRAM (in GB) to use per GPU device for model layers. Example: 20,7,7.',
            type: 'Input',
          },
          {
            name: '--enable-tp',
            description: 'Enable Tensor Parallelism (TP) to split the model across GPUs.',
            type: 'CheckBox',
          },
          {
            name: '--tp-backend',
            description: 'The backend for tensor parallelism. Valid options: native, nccl. Default: native.',
            type: 'DropDown',
            values: ['native', 'nccl'],
            defaultValue: 'native',
          },
          {
            name: '--cfg-cache',
            description: 'Create an additional cache for CFG negative prompts. Necessary to use CFG with that loader.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Gradio',
        items: [
          {
            name: '--listen',
            description: 'Make the web UI reachable from your local network.',
            type: 'CheckBox',
          },
          {
            name: '--listen-port',
            description: 'The listening port that the server will use.',
            type: 'Input',
          },
          {
            name: '--listen-host',
            description: 'The hostname that the server will use.',
            type: 'Input',
          },
          {
            name: '--share',
            description: 'Create a public URL. This is useful for running the web UI on Google Colab or similar.',
            type: 'CheckBox',
          },
          {
            name: '--auto-launch',
            description: 'Open the web UI in the default browser upon launch.',
            type: 'CheckBox',
          },
          {
            name: '--gradio-auth',
            description:
              'Set Gradio authentication password in the format "username:password". Multiple credentials' +
              ' can also be supplied with "u1:p1,u2:p2,u3:p3".',
            type: 'Input',
          },
          {
            name: '--gradio-auth-path',
            description:
              'Set the Gradio authentication file path. The file should contain one or more user:password' +
              ' pairs in the same format as above.',
            type: 'File',
          },
          {
            name: '--ssl-keyfile',
            description: 'The path to the SSL certificate key file.',
            type: 'File',
          },
          {
            name: '--ssl-certfile',
            description: 'The path to the SSL certificate cert file.',
            type: 'File',
          },
          {
            name: '--subpath',
            description: 'Customize the subpath for gradio, use with reverse proxy',
            type: 'Input',
          },
          {
            name: '--old-colors',
            description: 'Use the legacy Gradio colors, before the December/2024 update.',
            type: 'CheckBox',
          },
          {
            name: '--portable',
            description: 'Hide features not available in portable mode like training.',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'API',
        items: [
          {
            name: '--api',
            description: 'Enable the API server.',
            type: 'CheckBox',
          },
          {
            name: '--public-api',
            description: 'Create a public URL for the API using Cloudflare.',
            type: 'CheckBox',
          },
          {
            name: '--public-api-id',
            description: 'Tunnel ID for named Cloudflare Tunnel. Use together with public-api option.',
            type: 'Input',
          },
          {
            name: '--api-port',
            description: 'The listening port for the API.',
            type: 'Input',
            defaultValue: '5000',
          },
          {
            name: '--api-key',
            description: 'API authentication key.',
            type: 'Input',
          },
          {
            name: '--admin-key',
            description:
              'API authentication key for admin tasks like loading and unloading models. If not set,' +
              ' will be the same as --api-key.',
            type: 'Input',
          },
          {
            name: '--nowebui',
            description: 'Do not launch the Gradio UI. Useful for launching the API in standalone mode.',
            type: 'CheckBox',
          },
          {
            name: '--api-enable-ipv6',
            description: 'Enable IPv6 for the API',
            type: 'CheckBox',
          },
          {
            name: '--api-disable-ipv4',
            description: 'Disable IPv4 for the API',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'API generation defaults',
        items: [
          {
            name: '--temperature',
            description: 'Temperature sampling default override.',
            type: 'Input',
          },
          {
            name: '--dynatemp-low',
            description: 'Dynamic temperature low bound.',
            type: 'Input',
          },
          {
            name: '--dynatemp-high',
            description: 'Dynamic temperature high bound.',
            type: 'Input',
          },
          {
            name: '--dynatemp-exponent',
            description: 'Dynamic temperature exponent.',
            type: 'Input',
          },
          {
            name: '--smoothing-factor',
            description: 'Smoothing factor for samplers.',
            type: 'Input',
          },
          {
            name: '--smoothing-curve',
            description: 'Smoothing curve for samplers.',
            type: 'Input',
          },
          {
            name: '--top-p',
            description: 'Top P sampling cutoff.',
            type: 'Input',
            defaultValue: '0.95',
          },
          {
            name: '--top-k',
            description: 'Top K sampling cutoff.',
            type: 'Input',
          },
          {
            name: '--min-p',
            description: 'Min P sampling cutoff.',
            type: 'Input',
          },
          {
            name: '--top-n-sigma',
            description: 'Top N Sigma cutoff.',
            type: 'Input',
          },
          {
            name: '--typical-p',
            description: 'Typical P sampling cutoff.',
            type: 'Input',
          },
          {
            name: '--xtc-threshold',
            description: 'XTC threshold.',
            type: 'Input',
          },
          {
            name: '--xtc-probability',
            description: 'XTC probability.',
            type: 'Input',
          },
          {
            name: '--epsilon-cutoff',
            description: 'Epsilon cutoff.',
            type: 'Input',
          },
          {
            name: '--eta-cutoff',
            description: 'Eta cutoff.',
            type: 'Input',
          },
          {
            name: '--tfs',
            description: 'TFS sampling value.',
            type: 'Input',
          },
          {
            name: '--top-a',
            description: 'Top A sampling cutoff.',
            type: 'Input',
          },
          {
            name: '--adaptive-target',
            description: 'Adaptive target value.',
            type: 'Input',
          },
          {
            name: '--adaptive-decay',
            description: 'Adaptive decay value.',
            type: 'Input',
          },
          {
            name: '--dry-multiplier',
            description: 'DRY multiplier.',
            type: 'Input',
          },
          {
            name: '--dry-allowed-length',
            description: 'DRY allowed length.',
            type: 'Input',
          },
          {
            name: '--dry-base',
            description: 'DRY base.',
            type: 'Input',
          },
          {
            name: '--repetition-penalty',
            description: 'Repetition penalty.',
            type: 'Input',
          },
          {
            name: '--frequency-penalty',
            description: 'Frequency penalty.',
            type: 'Input',
          },
          {
            name: '--presence-penalty',
            description: 'Presence penalty.',
            type: 'Input',
          },
          {
            name: '--encoder-repetition-penalty',
            description: 'Encoder repetition penalty.',
            type: 'Input',
          },
          {
            name: '--no-repeat-ngram-size',
            description: 'No repeat ngram size.',
            type: 'Input',
          },
          {
            name: '--repetition-penalty-range',
            description: 'Repetition penalty range.',
            type: 'Input',
          },
          {
            name: '--penalty-alpha',
            description: 'Penalty alpha.',
            type: 'Input',
          },
          {
            name: '--guidance-scale',
            description: 'Guidance scale.',
            type: 'Input',
          },
          {
            name: '--mirostat-mode',
            description: 'Mirostat mode.',
            type: 'Input',
          },
          {
            name: '--mirostat-tau',
            description: 'Mirostat tau.',
            type: 'Input',
          },
          {
            name: '--mirostat-eta',
            description: 'Mirostat eta.',
            type: 'Input',
          },
          {
            name: '--do-sample',
            description: 'Do sample during generation.',
            type: 'CheckBox',
          },
          {
            name: '--dynamic-temperature',
            description: 'Enable dynamic temperature.',
            type: 'CheckBox',
          },
          {
            name: '--temperature-last',
            description: 'Apply temperature sampler last.',
            type: 'CheckBox',
          },
          {
            name: '--sampler-priority',
            description: 'Sampler priority order string.',
            type: 'Input',
          },
          {
            name: '--dry-sequence-breakers',
            description: 'DRY sequence breakers string.',
            type: 'Input',
          },
          {
            name: '--enable-thinking',
            description: 'Enable thinking/reasoning output blocks.',
            type: 'CheckBox',
          },
          {
            name: '--reasoning-effort',
            description: 'Reasoning effort level.',
            type: 'DropDown',
            values: ['low', 'medium', 'high'],
            defaultValue: 'medium',
          },
          {
            name: '--preserve-thinking',
            description: 'Preserve thinking blocks from prior turns in the chat template.',
            type: 'CheckBox',
          },
          {
            name: '--chat-template-file',
            description:
              'Path to a chat template file (.jinja, .jinja2, or .yaml) to use as default instruction template.',
            type: 'File',
          },
        ],
      },
      {
        section: 'Electron',
        items: [
          {
            name: '--no-electron',
            description: 'In portable builds, skip the Electron desktop window and use browser instead.',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
];

export default oobaboogaArguments;

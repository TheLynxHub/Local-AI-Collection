import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const llamaFactoryArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Server Configuration',
        items: [
          {
            name: '--host',
            description: 'The host address to bind the web server to (e.g., 127.0.0.1 or 0.0.0.0).',
            defaultValue: '127.0.0.1',
            type: 'Input',
          },
          {
            name: '--port',
            description: 'The port for the LLaMA Board web UI (default 7860).',
            defaultValue: 7860,
            type: 'Number',
          },
          {
            name: '--share',
            description: 'Share the Gradio interface publicly via shareable URL.',
            defaultValue: false,
            type: 'CheckBox',
          },
          {
            name: '--lang',
            description: 'Language for the web interface (en, zh, ru, ko, or ja).',
            defaultValue: 'en',
            type: 'DropDown',
            values: ['en', 'zh', 'ru', 'ko', 'ja'],
          },
        ],
      },
    ],
  },
  {
    category: 'Environment Variables',
    sections: [
      {
        section: 'Hub & Hardware Options',
        items: [
          {
            name: 'USE_MODELSCOPE_HUB',
            description: 'Set to 1 to download models and datasets from ModelScope Hub instead of Hugging Face.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'USE_OPENMIND_HUB',
            description: 'Set to 1 to download models and datasets from Modelers Hub (OpenMind).',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'CUDA_VISIBLE_DEVICES',
            description: 'Specify GPU device indices to utilize for training/inference (e.g., 0 or 0,1).',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'DISABLE_VERSION_CHECK',
            description: 'Set to 1 to bypass library and dependency version checks.',
            defaultValue: '',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Web UI & Server Options',
        items: [
          {
            name: 'GRADIO_SERVER_NAME',
            description: 'Set the host address for the Gradio web UI server (e.g., 127.0.0.1 or 0.0.0.0).',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'GRADIO_SHARE',
            description: 'Set to 1 to share the Gradio interface publicly via a shareable URL.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'GRADIO_IPV6',
            description: 'Set to 1 to enable IPv6 network support for the Gradio server.',
            defaultValue: '',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Backend & Training Acceleration',
        items: [
          {
            name: 'USE_RAY',
            description: 'Set to 1 to enable Ray distributed framework backend for training.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'USE_KT',
            description: 'Set to 1 to enable KTransformers SFT backend engine.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'USE_MCA',
            description: 'Set to 1 to enable Megatron-core training backend with mcore_adapter.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'FORCE_TORCHRUN',
            description: 'Set to 1 to force using torchrun for multi-GPU distributed training.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'OPTIM_TORCH',
            description: 'Set to 1 to optimize PyTorch CUDA memory allocator (expandable_segments:True).',
            defaultValue: '',
            type: 'Input',
          },
        ],
      },
      {
        section: 'Multimodal Placeholders',
        items: [
          {
            name: 'IMAGE_PLACEHOLDER',
            description: 'Specify a custom placeholder token for image inputs in multimodal prompts.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'AUDIO_PLACEHOLDER',
            description: 'Specify a custom placeholder token for audio inputs in multimodal prompts.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'VIDEO_PLACEHOLDER',
            description: 'Specify a custom placeholder token for video inputs in multimodal prompts.',
            defaultValue: '',
            type: 'Input',
          },
        ],
      },
    ],
  },
];

export default llamaFactoryArguments;

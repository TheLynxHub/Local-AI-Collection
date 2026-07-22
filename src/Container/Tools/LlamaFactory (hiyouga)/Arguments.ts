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
            description: 'Language for the web interface (en or zh).',
            defaultValue: 'en',
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
            description: 'Set to 1 to download models and datasets from Modelers Hub.',
            defaultValue: '',
            type: 'Input',
          },
          {
            name: 'CUDA_VISIBLE_DEVICES',
            description: 'Specify GPU device indices to utilize for training/inference (e.g. 0 or 0,1).',
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
    ],
  },
];

export default llamaFactoryArguments;

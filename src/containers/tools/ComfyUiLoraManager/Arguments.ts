import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

/* eslint max-len: 0 */

const loraManagerArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Network',
        items: [
          {
            name: '--host',
            description: 'Specify the IP address to listen on (default: 127.0.0.1)',
            type: 'Input',
            defaultValue: '127.0.0.1',
          },
          {
            name: '--port',
            description: 'Set the listen port (default: 8188)',
            type: 'Input',
            defaultValue: 8188,
          },
        ],
      },
    ],
  },
  {
    category: 'Settings Configuration',
    sections: [
      {
        section: 'General',
        items: [
          {
            name: 'civitai_api_key',
            description:
              'Your CivitAI API key for downloading models. Get it from your CivitAI profile settings. Required for downloading models from CivitAI.',
            type: 'Input',
          },
          {
            name: 'use_portable_settings',
            description:
              'Enable portable mode to store settings.json in the project directory instead of user settings directory. Recommended for standalone installations.',
            type: 'CheckBox',
            defaultValue: true,
          },
        ],
      },
      {
        section: 'Folder Paths',
        items: [
          {
            name: 'loras_folders',
            description:
              'Comma-separated list of paths to your LoRA model folders. Example: C:/ComfyUI/models/loras, D:/AI/loras',
            type: 'Directory',
          },
          {
            name: 'checkpoints_folders',
            description:
              'Comma-separated list of paths to your checkpoint model folders. Example: C:/ComfyUI/models/checkpoints, D:/AI/checkpoints',
            type: 'Directory',
          },
          {
            name: 'embeddings_folders',
            description:
              'Comma-separated list of paths to your embeddings folders. Example: C:/ComfyUI/models/embeddings, D:/AI/embeddings',
            type: 'Directory',
          },
        ],
      },
      {
        section: 'Advanced',
        items: [
          {
            name: 'auto_organize_exclusions',
            description:
              'Comma-separated (,) list of folder paths to exclude from auto-organization. Models in these folders will not be automatically moved.',
            type: 'Input',
          },
        ],
      },
    ],
  },
];

export default loraManagerArguments;

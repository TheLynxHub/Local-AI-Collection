import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const gitmyloArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    sections: [
      {
        section: 'Install',
        items: [
          {
            name: '--skip-install',
            description: 'Skip installing packages',
            type: 'CheckBox',
          },
          {
            name: '--skip-venv',
            description: 'Skip creating/activating venv, also skips install (for advanced users)',
            type: 'CheckBox',
          },
          {
            name: '--no-data-cache',
            description: "Don\\'t override the default huggingface_hub cache path.",
            type: 'CheckBox',
          },
          {
            name: '--verbose',
            description: 'Show more info, like logs during installs',
            type: 'CheckBox',
          },
        ],
      },
      {
        section: 'Gradio',
        items: [
          {
            name: '--share',
            description: 'Share this gradio instance.',
            type: 'CheckBox',
          },
          {
            name: '--username',
            description: 'Gradio username',
            type: 'Input',
          },
          {
            name: '--password',
            description: 'Gradio password (defaults to "password")',
            type: 'Input',
            defaultValue: 'password',
          },
          {
            name: '--theme',
            description: 'Gradio theme',
            type: 'Input',
            defaultValue: 'gradio/soft',
          },
          {
            name: '--listen',
            description: 'Listen on 0.0.0.0',
            type: 'CheckBox',
          },
          {
            name: '--port',
            description: 'Use a different port, automatic when not set.',
            type: 'Input',
          },
          {
            name: '--launch',
            description: 'Automatically open a browser window when the webui launches.',
            type: 'CheckBox',
          },
        ],
      },
    ],
  },
];

export default gitmyloArguments;

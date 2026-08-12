import {PagesData} from '../../../../src/common/types/plugins/modules';
import {BOLT_DIY_ID, LLAMA_CPP_ID, LoLLMS_ID, OPEN_WEBUI_ID, SILLYTAVERN_ID, TG_ID} from '../../constants';
import BOLT_DIY_RM from './BoltDiy/RendererMethods';
import llamaArguments from './LlamaCpp/Arguments';
import LLAMA_CPP_RM from './LlamaCpp/RendererMethods';
import LoLLM_RM from './LoLLMs/RendererMethods';
import openArguments from './OpenWebUi/Arguments';
import OPEN_WEBUI_RM from './OpenWebUi/RendererMethods';
import sillyArguments from './SillyTavern/Arguments';
import SILLYTAVERN_RM from './SillyTavern/RendererMethods';
import oobaboogaArguments from './TextGenOobabooga/Arguments';
import TG_RM from './TextGenOobabooga/RendererMethods';

const textPage: PagesData = {
  routePath: 'textGen_page',
  cards: [
    {
      id: TG_ID,
      title: 'TextGen',
      description: 'A Gradio web UI for Large Language Models.',
      repoUrl: 'https://github.com/oobabooga/textgen',
      type: 'text',
      extensionsDir: '/extensions',
      supportCustomArguments: true,
      arguments: oobaboogaArguments,
      methods: TG_RM,
      installationType: 'git',
    },
    {
      id: LLAMA_CPP_ID,
      title: 'llama.cpp',
      description: 'LLM inference in C/C++',
      repoUrl: 'https://github.com/ggml-org/llama.cpp',
      type: 'text',
      installationType: 'others',
      uninstallType: 'removeFolder',
      supportCustomArguments: true,
      arguments: llamaArguments,
      methods: LLAMA_CPP_RM,
      developer: 'ggml-org',
    },
    {
      id: OPEN_WEBUI_ID,
      title: 'Open WebUI',
      description: 'User-friendly, feature-rich self-hosted WebUI for LLMs supporting Ollama and OpenAI APIs.',
      repoUrl: 'https://github.com/open-webui/open-webui',
      type: 'text',
      methods: OPEN_WEBUI_RM,
      supportCustomArguments: true,
      installationType: 'others',
      uninstallType: 'others',
      arguments: openArguments,
    },
    {
      id: BOLT_DIY_ID,
      title: 'Bolt.Diy',
      description: 'Prompt, run, edit, and deploy full-stack web applications using any LLM you want!',
      repoUrl: 'https://github.com/stackblitz-labs/bolt.diy',
      type: 'text',
      methods: BOLT_DIY_RM,
      installationType: 'others',
      uninstallType: 'removeFolder',
    },
    {
      id: SILLYTAVERN_ID,
      title: 'SillyTavern',
      description: 'LLM frontend for power users with unified API interface, extensions, and customizable UI.',
      repoUrl: 'https://github.com/SillyTavern/SillyTavern',
      type: 'text',
      supportCustomArguments: true,
      arguments: sillyArguments,
      methods: SILLYTAVERN_RM,
      installationType: 'git',
    },
    {
      id: LoLLMS_ID,
      title: 'LoLLMs',
      description: 'Lord of Large Language and Multi modal Systems Web User Interface',
      repoUrl: 'https://github.com/ParisNeo/lollms-webui',
      type: 'text',
      methods: LoLLM_RM,
      installationType: 'git',
    },
  ],
};

export default textPage;

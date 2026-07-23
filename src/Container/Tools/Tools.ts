import {PagesData} from '../../../../src/common/types/plugins/modules';
import {
  AITOOLKIT_ID,
  KOHYA_ID,
  LLAMA_FACTORY_ID,
  LORA_MANAGER_ID,
  ONETRAINER_ID,
  SMARTGALLERY_ID,
  UNSLOTH_STUDIO_ID,
} from '../../Constants';
import aiToolkitArguments from './AI Toolkit (ostris)/Arguments';
import AITOOLKIT_RM from './AI Toolkit (ostris)/RendererMethods';
import loraManagerArguments from './ComfyUI-Lora-Manager (willmiao)/Arguments';
import LORA_MANAGER_RM from './ComfyUI-Lora-Manager (willmiao)/RendererMethods';
import bmaltaisArguments from './Kohyas GUI (bmaltais)/Arguments';
import KOHYA_GUI_RM from './Kohyas GUI (bmaltais)/RendererMethods';
import llamaFactoryArguments from './LlamaFactory (hiyouga)/Arguments';
import LLAMA_FACTORY_RM from './LlamaFactory (hiyouga)/RendererMethods';
import ONETRAINER_RM from './OneTrainer (Nerogar)/RendererMethods';
import smartGalleryArguments from './SmartGallery (biagiomaf)/Arguments';
import SMARTGALLERY_RM from './SmartGallery (biagiomaf)/RendererMethods';
import unslothStudioArguments from './Unsloth Studio/Arguments';
import UNSLOTH_STUDIO_RM from './Unsloth Studio/RendererMethods';

/* eslint max-len: 0 */

const toolsPage: PagesData = {
  routePath: 'tools_page',
  cards: [
    {
      id: ONETRAINER_ID,
      title: 'OneTrainer',
      description: 'OneTrainer is a one-stop solution for all your stable diffusion training needs.',
      repoUrl: 'https://github.com/Nerogar/OneTrainer',
      type: 'image',
      supportCustomArguments: true,
      methods: ONETRAINER_RM,
      installationType: 'git',
    },
    {
      id: KOHYA_ID,
      title: "Kohya's GUI",
      description: 'User-friendly Gradio GUI and CLI for training Stable Diffusion models and LoRAs.',
      repoUrl: 'https://github.com/bmaltais/kohya_ss',
      type: 'image',
      arguments: bmaltaisArguments,
      methods: KOHYA_GUI_RM,
      installationType: 'git',
    },
    {
      id: AITOOLKIT_ID,
      title: 'AI Toolkit',
      description: 'The ultimate all-in-one training suite and GUI for fine-tuning diffusion models.',
      repoUrl: 'https://github.com/ostris/ai-toolkit',
      type: 'image',
      supportCustomArguments: true,
      arguments: aiToolkitArguments,
      methods: AITOOLKIT_RM,
      installationType: 'git',
    },
    {
      id: SMARTGALLERY_ID,
      title: 'SmartGallery',
      description: 'A fast, offline-capable digital asset manager and gallery for ComfyUI outputs.',
      repoUrl: 'https://github.com/biagiomaf/smart-comfyui-gallery',
      type: 'image',
      arguments: smartGalleryArguments,
      supportCustomArguments: true,
      methods: SMARTGALLERY_RM,
      installationType: 'git',
    },
    {
      id: LORA_MANAGER_ID,
      title: 'ComfyUI LoRA Manager',
      description:
        'Comprehensive toolset for organizing, previewing, downloading, and applying LoRA models in ComfyUI.',
      repoUrl: 'https://github.com/willmiao/ComfyUI-Lora-Manager',
      type: 'image',
      supportCustomArguments: true,
      arguments: loraManagerArguments,
      methods: LORA_MANAGER_RM,
      installationType: 'git',
    },
    {
      id: UNSLOTH_STUDIO_ID,
      title: 'Unsloth Studio',
      description: 'An open-source, no-code web UI for training and running LLMs locally.',
      repoUrl: 'https://github.com/unslothai/unsloth',
      type: 'text',
      supportCustomArguments: true,
      arguments: unslothStudioArguments,
      methods: UNSLOTH_STUDIO_RM,
      installationType: 'others',
    },
    {
      id: LLAMA_FACTORY_ID,
      title: 'LLaMA Factory',
      description: 'Unified efficient fine-tuning of 100+ Large Language Models with CLI and Web UI.',
      repoUrl: 'https://github.com/hiyouga/LlamaFactory',
      type: 'text',
      supportCustomArguments: true,
      arguments: llamaFactoryArguments,
      methods: LLAMA_FACTORY_RM,
      installationType: 'git',
    },
  ],
};

export default toolsPage;

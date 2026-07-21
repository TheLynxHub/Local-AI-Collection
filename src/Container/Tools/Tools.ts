import {PagesData} from '../../../../src/common/types/plugins/modules';
import {
  AITOOLKIT_ID,
  KOHYA_ID,
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
      description:
        "This repository primarily provides a Gradio GUI for Kohya's Stable Diffusion trainers." +
        'The GUI allows you to set the training parameters and generate and run the required CLI commands to train the model.',
      repoUrl: 'https://github.com/bmaltais/kohya_ss',
      type: 'image',
      arguments: bmaltaisArguments,
      methods: KOHYA_GUI_RM,
      installationType: 'git',
    },
    {
      id: AITOOLKIT_ID,
      title: 'AI Toolkit',
      description:
        'AI Toolkit is an all-in-one training suite for diffusion models. Supports training LoRA models for FLUX.1, ' +
        'Stable Diffusion, and other diffusion models on consumer-grade hardware. Features a web-based UI for easy ' +
        'configuration and monitoring of training jobs.',
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
      description:
        'A fast, offline-capable gallery for ComfyUI outputs with workflow extraction. Browse and manage your ' +
        'generated images and videos with automatic thumbnail generation, workflow metadata extraction, and ' +
        'advanced filtering. Works independently of ComfyUI.',
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
        'A comprehensive toolset that streamlines organizing, downloading, and applying LoRA models in ComfyUI. ' +
        'Features recipe management, checkpoint organization, one-click workflow integration, and a browser extension ' +
        'for Civitai. Access the interface at http://localhost:8188/loras',
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
      description:
        'Unsloth Studio is an open-source, no-code web UI designed for training, running, and exporting AI models locally. ' +
        'Train 500+ models up to 2x faster with 70% less VRAM on NVIDIA and AMD GPUs across Windows, Linux, and macOS.',
      repoUrl: 'https://github.com/unslothai/unsloth',
      type: 'text',
      supportCustomArguments: true,
      arguments: unslothStudioArguments,
      methods: UNSLOTH_STUDIO_RM,
      installationType: 'others',
    },
  ],
};

export default toolsPage;

import {PagesData} from '../../../../src/common/types/plugins/modules';
import {
  A1_ID,
  AITOOLKIT_ID,
  COMFYUI_ID,
  COMFYUI_ROCM_ID,
  COMFYUI_ZLUDA_ID,
  INVOKE_ID,
  KOHYA_ID,
  LORA_MANAGER_ID,
  ONETRAINER_ID,
  SD_AMD_ID,
  SD_FORGE_AMD_ID,
  SD_FORGE_ID,
  SD_NEXT_ID,
  SD_UIUX_ID,
  SMARTGALLERY_ID,
  SWARM_ID,
} from '../../constants';
import {isPagesFixed} from '../../utils/rendererUtils';
import {arguments as aiToolkitArguments, rendererMethods as AITOOLKIT_RM} from '../tools/AiToolkit';
import {arguments as loraManagerArguments, rendererMethods as LORA_MANAGER_RM} from '../tools/ComfyUiLoraManager';
import {arguments as bmaltaisArguments, rendererMethods as KOHYA_GUI_RM} from '../tools/KohyasGui';
import {rendererMethods as ONETRAINER_RM} from '../tools/OneTrainer';
import {arguments as smartGalleryArguments, rendererMethods as SMARTGALLERY_RM} from '../tools/SmartGallery';
import {arguments as automatic1111Arguments, rendererMethods as A1_RM} from './Automatic1111Sd';
import {arguments as comfyArguments, rendererMethods as COMFYUI_RM} from './ComfyUi';
import {arguments as comfyRocmArguments, rendererMethods as COMFYUI_ROCM_RM} from './ComfyUiRocm';
import {arguments as comfyZludaArguments, rendererMethods as COMFYUI_ZLUDA_RM} from './ComfyUiZluda';
import {arguments as invokeArguments, rendererMethods as INVOKE_RM} from './InvokeAi';
import {arguments as lshqqytigerArguments, rendererMethods as SD_AMD_RM} from './SdAmdgpu';
import {rendererMethods as SD_FORGE_RM} from './SdForge';
import {arguments as lshqqytigerForgeArguments, rendererMethods as SD_FORGE_AMD_RM} from './SdForgeAmdgpu';
import {arguments as vladmandicArguments, rendererMethods as SD_NEXT_RM} from './SdNext';
import {rendererMethods as SD_UIUX_RM} from './SdUiUx';
import {arguments as mcMonkeyArguments, rendererMethods as SWARM_RM} from './SwarmUi';

/* eslint max-len: 0 */

const imagePage: PagesData = {
  routePath: 'imageGen_page',
  cards: [
    {
      id: COMFYUI_ID,
      title: 'ComfyUI',
      description: 'The most powerful and modular diffusion model GUI and backend with a node interface.',
      repoUrl: 'https://github.com/Comfy-Org/ComfyUI',
      type: 'image',
      supportCustomArguments: true,
      arguments: comfyArguments,
      methods: COMFYUI_RM,
      installationType: 'git',
    },
    {
      id: SD_FORGE_ID,
      title: 'SD Forge',
      description: 'Platform built on Stable Diffusion WebUI optimizing resource management and speeding up inference.',
      repoUrl: 'https://github.com/lllyasviel/stable-diffusion-webui-forge',
      type: 'image',
      supportCustomArguments: true,
      arguments: automatic1111Arguments,
      methods: SD_FORGE_RM,
      installationType: 'git',
    },
    {
      id: INVOKE_ID,
      title: 'InvokeAI',
      description: 'Leading creative engine empowering professionals and enthusiasts to generate visual media with AI.',
      repoUrl: 'https://github.com/invoke-ai/InvokeAI',
      type: 'image',
      methods: INVOKE_RM,
      arguments: invokeArguments,
      installationType: 'others',
    },
    {
      id: SD_NEXT_ID,
      title: 'SD Next',
      description: 'Advanced Implementation of Stable Diffusion and other Diffusion-based generative image models',
      repoUrl: 'https://github.com/vladmandic/sdnext',
      extensionsDir: '/extensions',
      type: 'image',
      supportCustomArguments: true,
      arguments: vladmandicArguments,
      methods: SD_NEXT_RM,
      installationType: 'git',
    },
    {
      id: A1_ID,
      title: 'Stable Diffusion',
      description: 'A web interface for Stable Diffusion, implemented using Gradio library.',
      repoUrl: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
      extensionsDir: '/extensions',
      type: 'image',
      supportCustomArguments: true,
      arguments: automatic1111Arguments,
      methods: A1_RM,
      installationType: 'git',
    },
    {
      id: COMFYUI_ZLUDA_ID,
      title: 'ComfyUI Zluda',
      description: 'Modular stable diffusion GUI with a graph interface, enhanced with ZLUDA for AMD GPUs.',
      repoUrl: 'https://github.com/patientx/ComfyUI-Zluda',
      extensionsDir: '/custom_nodes',
      type: 'image',
      supportCustomArguments: true,
      arguments: comfyZludaArguments,
      methods: COMFYUI_ZLUDA_RM,
      installationType: 'git',
    },
    {
      id: COMFYUI_ROCM_ID,
      title: 'ComfyUI ROCm',
      description: 'Modular stable diffusion GUI with a graph interface, enhanced with ROCm for AMD GPUs.',
      repoUrl: 'https://github.com/patientx-cfz/comfyui-rocm',
      extensionsDir: '/custom_nodes',
      type: 'image',
      supportCustomArguments: true,
      arguments: comfyRocmArguments,
      methods: COMFYUI_ROCM_RM,
      installationType: 'git',
    },
    {
      id: SD_AMD_ID,
      title: 'Stable Diffusion AMDGPU',
      description: 'A web interface for Stable Diffusion, implemented using Gradio library.',
      repoUrl: 'https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu',
      extensionsDir: '/extensions',
      type: 'image',
      supportCustomArguments: true,
      arguments: lshqqytigerArguments,
      methods: SD_AMD_RM,
      installationType: 'git',
    },
    {
      id: SD_FORGE_AMD_ID,
      title: 'SD Forge AMDGPU',
      description: 'Platform built on Stable Diffusion WebUI optimizing resource management and speeding up inference.',
      repoUrl: 'https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu-forge',
      extensionsDir: '/extensions',
      type: 'image',
      supportCustomArguments: true,
      arguments: lshqqytigerForgeArguments,
      methods: SD_FORGE_AMD_RM,
      installationType: 'git',
    },
    {
      id: SWARM_ID,
      title: 'SwarmUI',
      description:
        'Modular AI image generation WebUI emphasizing accessible powertools, high performance, and extensibility.',
      repoUrl: 'https://github.com/mcmonkeyprojects/SwarmUI',
      type: 'image',
      extensionsDir: '/src/Extensions',
      supportCustomArguments: true,
      arguments: mcMonkeyArguments,
      methods: SWARM_RM,
      installationType: 'git',
    },
    {
      id: SD_UIUX_ID,
      title: 'SD UI-UX',
      description: 'A bespoke, highly adaptable, blazing fast user interface for Stable Diffusion.',
      repoUrl: 'https://github.com/anapnoe/stable-diffusion-webui-ux',
      type: 'image',
      extensionsDir: '/extensions',
      supportCustomArguments: true,
      arguments: automatic1111Arguments,
      methods: SD_UIUX_RM,
      installationType: 'git',
    },
  ],
};

if (!isPagesFixed) {
  imagePage.cards.push(
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
  );
}

export default imagePage;

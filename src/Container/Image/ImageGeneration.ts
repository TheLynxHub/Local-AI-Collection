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
} from '../../Constants';
import {isPagesFixed} from '../../Utils/RendererUtils';
import aiToolkitArguments from '../Tools/AI Toolkit (ostris)/Arguments';
import AITOOLKIT_RM from '../Tools/AI Toolkit (ostris)/RendererMethods';
import loraManagerArguments from '../Tools/ComfyUI-Lora-Manager (willmiao)/Arguments';
import LORA_MANAGER_RM from '../Tools/ComfyUI-Lora-Manager (willmiao)/RendererMethods';
import bmaltaisArguments from '../Tools/Kohyas GUI (bmaltais)/Arguments';
import KOHYA_GUI_RM from '../Tools/Kohyas GUI (bmaltais)/RendererMethods';
import ONETRAINER_RM from '../Tools/OneTrainer (Nerogar)/RendererMethods';
import smartGalleryArguments from '../Tools/SmartGallery (biagiomaf)/Arguments';
import SMARTGALLERY_RM from '../Tools/SmartGallery (biagiomaf)/RendererMethods';
import comfyArguments from './ComfyUI (comfyanonymous)/Arguments';
import COMFYUI_RM from './ComfyUI (comfyanonymous)/RendererMethods';
import comfyRocmArguments from './ComfyUI ROCm (patientx)/Arguments';
import COMFYUI_ROCM_RM from './ComfyUI ROCm (patientx)/RendererMethods';
import comfyZludaArguments from './ComfyUI Zluda (patientx)/Arguments';
import COMFYUI_ZLUDA_RM from './ComfyUI Zluda (patientx)/RendererMethods';
import invokeArguments from './InvokeAI/Arguments';
import INVOKE_RM from './InvokeAI/RendererMethods';
import automatic1111Arguments from './SD (AUTOMATIC1111)/Arguments';
import A1_RM from './SD (AUTOMATIC1111)/RendererMethods';
import lshqqytigerArguments from './SD AMDGPU (lshqqytiger)/Arguments';
import SD_AMD_RM from './SD AMDGPU (lshqqytiger)/RendererMethods';
import SD_FORGE_RM from './SD Forge (lllyasviel)/RendererMethods';
import lshqqytigerForgeArguments from './SD Forge AMDGPU (lshqqytiger)/Arguments';
import SD_FORGE_AMD_RM from './SD Forge AMDGPU (lshqqytiger)/RendererMethods';
import vladmandicArguments from './SD Next (vladmandic)/Arguments';
import SD_NEXT_RM from './SD Next (vladmandic)/RendererMethods';
import SD_UIUX_RM from './SD UI-UX (anapnoe)/RendererMethods';
import mcMonkeyArguments from './SwarmUI (mcmonkeyprojects)/Arguments';
import SWARM_RM from './SwarmUI (mcmonkeyprojects)/RendererMethods';

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

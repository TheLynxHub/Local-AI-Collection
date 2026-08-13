import {PagesData} from '../../../../src/common/types/plugins/modules';
import {
  A1_ID,
  COMFYUI_ID,
  COMFYUI_ROCM_ID,
  COMFYUI_ZLUDA_ID,
  INVOKE_ID,
  SD_AMD_ID,
  SD_FORGE_AMD_ID,
  SD_FORGE_ID,
  SD_NEXT_ID,
  SD_UIUX_ID,
  SWARM_ID,
} from '../../constants';
import automatic1111Arguments from './Automatic1111Sd/Arguments';
import A1_RM from './Automatic1111Sd/RendererMethods';
import comfyArguments from './ComfyUi/Arguments';
import COMFYUI_RM from './ComfyUi/RendererMethods';
import comfyRocmArguments from './ComfyUiRocm/Arguments';
import COMFYUI_ROCM_RM from './ComfyUiRocm/RendererMethods';
import comfyZludaArguments from './ComfyUiZluda/Arguments';
import COMFYUI_ZLUDA_RM from './ComfyUiZluda/RendererMethods';
import invokeArguments from './InvokeAi/Arguments';
import INVOKE_RM from './InvokeAi/RendererMethods';
import lshqqytigerArguments from './SdAmdgpu/Arguments';
import SD_AMD_RM from './SdAmdgpu/RendererMethods';
import SD_FORGE_RM from './SdForge/RendererMethods';
import lshqqytigerForgeArguments from './SdForgeAmdgpu/Arguments';
import SD_FORGE_AMD_RM from './SdForgeAmdgpu/RendererMethods';
import vladmandicArguments from './SdNext/Arguments';
import SD_NEXT_RM from './SdNext/RendererMethods';
import SD_UIUX_RM from './SdUiUx/RendererMethods';
import mcMonkeyArguments from './SwarmUi/Arguments';
import SWARM_RM from './SwarmUi/RendererMethods';

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

export default imagePage;

import {MainModules, MainModuleUtils} from '../../src/common/types/plugins/modules';
import {
  A1_ID,
  AG_ID,
  AITOOLKIT_ID,
  ALLTALK_ID,
  ANTIGRAVITY_CLI_ID,
  APPLIO_ID,
  BOLT_DIY_ID,
  CLAUDE_CODE_ID,
  COMFYUI_ID,
  COMFYUI_ROCM_ID,
  COMFYUI_ZLUDA_ID,
  FLOWISEAI_ID,
  GeminiCli_ID,
  INVOKE_ID,
  KOHYA_ID,
  LoLLMS_ID,
  LORA_MANAGER_ID,
  N8N_ID,
  ONETRAINER_ID,
  OPEN_WEBUI_ID,
  SD_AMD_ID,
  SD_FORGE_AMD_ID,
  SD_FORGE_ID,
  SD_NEXT_ID,
  SD_UIUX_ID,
  SILLYTAVERN_ID,
  SMARTGALLERY_ID,
  SWARM_ID,
  TG_ID,
  TTS_ID,
  UNSLOTH_STUDIO_ID,
} from './Constants';
import AntigravityCli_MM from './Container/Agent/Antigravity CLI/MainMethods';
import ClaudeCode_MM from './Container/Agent/Claude Code/MainMethods';
import Flow_MM from './Container/Agent/Flowise (FlowiseAI)/MainMethods';
import GeminiCli_MM from './Container/Agent/Gemini CLI/MainMethods';
import N8N_MM from './Container/Agent/N8N/MainMethods';
import Rrew123_MM from './Container/Audio/AllTalk TTS (erew123)/MainMethods';
import Applio_MM from './Container/Audio/Applio/MainMethods';
import Gitmylo_MM from './Container/Audio/Audio Generation (gitmylo)/MainMethods';
import Rsx_MM from './Container/Audio/Text to Speech (rsxdalv)/MainMethods';
import Comfy_MM from './Container/Image/ComfyUI (comfyanonymous)/MainMethods';
import ComfyRocm_MM from './Container/Image/ComfyUI ROCm (patientx)/MainMethods';
import ComfyZluda_MM from './Container/Image/ComfyUI Zluda (patientx)/MainMethods';
import Invoke_MM from './Container/Image/InvokeAI/MainMethods';
import A1_MM from './Container/Image/SD (AUTOMATIC1111)/MainMethods';
import Ls_MM from './Container/Image/SD AMDGPU (lshqqytiger)/MainMethods';
import Vlad_MM from './Container/Image/SD Next (vladmandic)/MainMethods';
import McMonkey_MM from './Container/Image/SwarmUI (mcmonkeyprojects)/MainMethods';
import BOLT_DIY_MM from './Container/Text/BoltDiy (StackblitzLabs)/MainMethods';
import LoLLM_MM from './Container/Text/LoLLMs (ParisNeo)/MainMethods';
import OpenWebUI_MM from './Container/Text/OpenWebUI/MainMethods';
import Silly_MM from './Container/Text/SillyTavern/MainMethods';
import Ooba_MM from './Container/Text/Text Generation (oobabooga)/MainMethods';
import AIToolkit_MM from './Container/Tools/AI Toolkit (ostris)/MainMethods';
import LoraManager_MM from './Container/Tools/ComfyUI-Lora-Manager (willmiao)/MainMethods';
import Bmaltais_MM from './Container/Tools/Kohyas GUI (bmaltais)/MainMethods';
import Nerogar_MM from './Container/Tools/OneTrainer (Nerogar)/MainMethods';
import SmartGallery_MM from './Container/Tools/SmartGallery (biagiomaf)/MainMethods';
import Unsloth_MM from './Container/Tools/Unsloth Studio/MainMethods';

export default async function initialModule(utils: MainModuleUtils): Promise<MainModules[]> {
  return [
    {id: COMFYUI_ID, methods: () => Comfy_MM(utils)},
    {id: A1_ID, methods: () => A1_MM(utils, 'https://github.com/AUTOMATIC1111/stable-diffusion-webui')},
    {id: SD_AMD_ID, methods: () => Ls_MM(utils)},
    {id: SD_FORGE_ID, methods: () => A1_MM(utils, 'https://github.com/AUTOMATIC1111/stable-diffusion-webui')},
    {
      id: SD_FORGE_AMD_ID,
      methods: () => A1_MM(utils, 'https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu-forge'),
    },
    {id: SD_NEXT_ID, methods: () => Vlad_MM(utils)},
    {id: SWARM_ID, methods: () => McMonkey_MM(utils)},
    {id: KOHYA_ID, methods: () => Bmaltais_MM(utils)},
    {id: TG_ID, methods: () => Ooba_MM(utils)},
    {id: TTS_ID, methods: () => Rsx_MM(utils)},
    {id: AG_ID, methods: () => Gitmylo_MM(utils)},
    {id: SILLYTAVERN_ID, methods: () => Silly_MM(utils)},
    {id: SD_UIUX_ID, methods: () => A1_MM(utils, 'https://github.com/anapnoe/stable-diffusion-webui-ux')},
    {id: AITOOLKIT_ID, methods: () => AIToolkit_MM(utils)},
    {id: SMARTGALLERY_ID, methods: () => SmartGallery_MM(utils)},
    {id: LORA_MANAGER_ID, methods: () => LoraManager_MM(utils)},
    {id: COMFYUI_ZLUDA_ID, methods: () => ComfyZluda_MM(utils)},
    {id: COMFYUI_ROCM_ID, methods: () => ComfyRocm_MM(utils)},
    {id: ONETRAINER_ID, methods: () => Nerogar_MM(utils)},
    {id: INVOKE_ID, methods: () => Invoke_MM(utils)},
    {id: ALLTALK_ID, methods: () => Rrew123_MM(utils)},
    {id: OPEN_WEBUI_ID, methods: () => OpenWebUI_MM(utils)},
    {id: FLOWISEAI_ID, methods: () => Flow_MM(utils)},
    {id: LoLLMS_ID, methods: () => LoLLM_MM(utils)},
    {id: BOLT_DIY_ID, methods: () => BOLT_DIY_MM(utils)},
    {id: N8N_ID, methods: () => N8N_MM(utils)},
    {id: GeminiCli_ID, methods: () => GeminiCli_MM(utils)},
    {id: CLAUDE_CODE_ID, methods: () => ClaudeCode_MM(utils)},
    {id: ANTIGRAVITY_CLI_ID, methods: () => AntigravityCli_MM(utils)},
    {id: APPLIO_ID, methods: () => Applio_MM(utils)},
    {id: UNSLOTH_STUDIO_ID, methods: () => Unsloth_MM(utils)},
  ];
}

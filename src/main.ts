import {MainModules, MainModuleUtils} from '../../src/common/types/plugins/modules';
import {
  A1_ID,
  AG_ID,
  AITOOLKIT_ID,
  ALLTALK_ID,
  ANTIGRAVITY_CLI_ID,
  APPLIO_ID,
  BOLT_DIY_ID,
  CHAT_TTS_ID,
  CLAUDE_CODE_ID,
  COMFYUI_ID,
  COMFYUI_ROCM_ID,
  COMFYUI_ZLUDA_ID,
  FLOWISEAI_ID,
  GeminiCli_ID,
  HERMES_AGENT_ID,
  INVOKE_ID,
  KOHYA_ID,
  LANGFLOW_ID,
  LLAMA_CPP_ID,
  LLAMA_FACTORY_ID,
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
  VOICE_STUDIO_ID,
} from './constants';
import AntigravityCli_MM from './containers/agent/AntigravityCli/MainMethods';
import ClaudeCode_MM from './containers/agent/ClaudeCode/MainMethods';
import Flow_MM from './containers/agent/Flowise/MainMethods';
import GeminiCli_MM from './containers/agent/GeminiCli/MainMethods';
import HermesAgent_MM from './containers/agent/HermesAgent/MainMethods';
import Langflow_MM from './containers/agent/Langflow/MainMethods';
import N8N_MM from './containers/agent/N8N/MainMethods';
import Rrew123_MM from './containers/audio/AllTalkTts/MainMethods';
import Applio_MM from './containers/audio/Applio/MainMethods';
import Gitmylo_MM from './containers/audio/AudioGitmylo/MainMethods';
import ChatTTS_MM from './containers/audio/ChatTts/MainMethods';
import Rsx_MM from './containers/audio/TextToSpeech/MainMethods';
import VoiceStudio_MM from './containers/audio/VoiceStudio/MainMethods';
import A1_MM from './containers/image/Automatic1111Sd/MainMethods';
import Comfy_MM from './containers/image/ComfyUi/MainMethods';
import ComfyRocm_MM from './containers/image/ComfyUiRocm/MainMethods';
import ComfyZluda_MM from './containers/image/ComfyUiZluda/MainMethods';
import Invoke_MM from './containers/image/InvokeAi/MainMethods';
import Ls_MM from './containers/image/SdAmdgpu/MainMethods';
import Vlad_MM from './containers/image/SdNext/MainMethods';
import McMonkey_MM from './containers/image/SwarmUi/MainMethods';
import BOLT_DIY_MM from './containers/text/BoltDiy/MainMethods';
import LlamaCpp_MM from './containers/text/LlamaCpp/MainMethods';
import LoLLM_MM from './containers/text/LoLLMs/MainMethods';
import OpenWebUI_MM from './containers/text/OpenWebUi/MainMethods';
import Silly_MM from './containers/text/SillyTavern/MainMethods';
import Ooba_MM from './containers/text/TextGenOobabooga/MainMethods';
import AIToolkit_MM from './containers/tools/AiToolkit/MainMethods';
import LoraManager_MM from './containers/tools/ComfyUiLoraManager/MainMethods';
import Bmaltais_MM from './containers/tools/KohyasGui/MainMethods';
import LlamaFactory_MM from './containers/tools/LlamaFactory/MainMethods';
import Nerogar_MM from './containers/tools/OneTrainer/MainMethods';
import SmartGallery_MM from './containers/tools/SmartGallery/MainMethods';
import Unsloth_MM from './containers/tools/UnslothStudio/MainMethods';

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
    {id: LLAMA_CPP_ID, methods: () => LlamaCpp_MM(utils)},
    {id: FLOWISEAI_ID, methods: () => Flow_MM(utils)},

    {id: LANGFLOW_ID, methods: () => Langflow_MM(utils)},

    {id: LoLLMS_ID, methods: () => LoLLM_MM(utils)},
    {id: BOLT_DIY_ID, methods: () => BOLT_DIY_MM(utils)},
    {id: N8N_ID, methods: () => N8N_MM(utils)},
    {id: GeminiCli_ID, methods: () => GeminiCli_MM(utils)},
    {id: CLAUDE_CODE_ID, methods: () => ClaudeCode_MM(utils)},
    {id: ANTIGRAVITY_CLI_ID, methods: () => AntigravityCli_MM(utils)},
    {id: HERMES_AGENT_ID, methods: () => HermesAgent_MM(utils)},
    {id: APPLIO_ID, methods: () => Applio_MM(utils)},
    {id: CHAT_TTS_ID, methods: () => ChatTTS_MM(utils)},
    {id: VOICE_STUDIO_ID, methods: () => VoiceStudio_MM(utils)},
    {id: UNSLOTH_STUDIO_ID, methods: () => Unsloth_MM(utils)},
    {id: LLAMA_FACTORY_ID, methods: () => LlamaFactory_MM(utils)},
  ];
}

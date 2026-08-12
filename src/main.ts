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
import {mainMethods as AntigravityCli_MM} from './containers/agent/AntigravityCli';
import {mainMethods as ClaudeCode_MM} from './containers/agent/ClaudeCode';
import {mainMethods as Flow_MM} from './containers/agent/Flowise';
import {mainMethods as GeminiCli_MM} from './containers/agent/GeminiCli';
import {mainMethods as HermesAgent_MM} from './containers/agent/HermesAgent';
import {mainMethods as Langflow_MM} from './containers/agent/Langflow';
import {mainMethods as N8N_MM} from './containers/agent/N8N';
import {mainMethods as Rrew123_MM} from './containers/audio/AllTalkTts';
import {mainMethods as Applio_MM} from './containers/audio/Applio';
import {mainMethods as Gitmylo_MM} from './containers/audio/AudioGitmylo';
import {mainMethods as ChatTTS_MM} from './containers/audio/ChatTts';
import {mainMethods as Rsx_MM} from './containers/audio/TextToSpeech';
import {mainMethods as VoiceStudio_MM} from './containers/audio/VoiceStudio';
import {mainMethods as A1_MM} from './containers/image/Automatic1111Sd';
import {mainMethods as Comfy_MM} from './containers/image/ComfyUi';
import {mainMethods as ComfyRocm_MM} from './containers/image/ComfyUiRocm';
import {mainMethods as ComfyZluda_MM} from './containers/image/ComfyUiZluda';
import {mainMethods as Invoke_MM} from './containers/image/InvokeAi';
import {mainMethods as Ls_MM} from './containers/image/SdAmdgpu';
import {mainMethods as Vlad_MM} from './containers/image/SdNext';
import {mainMethods as McMonkey_MM} from './containers/image/SwarmUi';
import {mainMethods as BOLT_DIY_MM} from './containers/text/BoltDiy';
import {mainMethods as LlamaCpp_MM} from './containers/text/LlamaCpp';
import {mainMethods as LoLLM_MM} from './containers/text/LoLLMs';
import {mainMethods as OpenWebUI_MM} from './containers/text/OpenWebUi';
import {mainMethods as Silly_MM} from './containers/text/SillyTavern';
import {mainMethods as Ooba_MM} from './containers/text/TextGenOobabooga';
import {mainMethods as AIToolkit_MM} from './containers/tools/AiToolkit';
import {mainMethods as LoraManager_MM} from './containers/tools/ComfyUiLoraManager';
import {mainMethods as Bmaltais_MM} from './containers/tools/KohyasGui';
import {mainMethods as LlamaFactory_MM} from './containers/tools/LlamaFactory';
import {mainMethods as Nerogar_MM} from './containers/tools/OneTrainer';
import {mainMethods as SmartGallery_MM} from './containers/tools/SmartGallery';
import {mainMethods as Unsloth_MM} from './containers/tools/UnslothStudio';

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

import {PagesData} from '../../../../src/common/types/plugins/modules';
import {AG_ID, ALLTALK_ID, APPLIO_ID, CHAT_TTS_ID, TTS_ID, VOICE_STUDIO_ID} from '../../Constants';
import ALLTALK_RM from './AllTalk TTS (erew123)/RendererMethods';
import APPLIO_RM from './Applio/RendererMethods';
import gitmyloArguments from './Audio Generation (gitmylo)/Arguments';
import AG_RM from './Audio Generation (gitmylo)/RendererMethods';
import CHAT_TTS_RM from './ChatTTS (2noise)/RendererMethods';
import TTS_RM from './Text to Speech (rsxdalv)/RendererMethods';
import voiceStudioArguments from './VoiceStudio (debpalash)/Arguments';
import VOICE_STUDIO_RM from './VoiceStudio (debpalash)/RendererMethods';

const audioPage: PagesData = {
  routePath: 'audioGen_page',
  cards: [
    {
      id: TTS_ID,
      title: 'TTS WebUI',
      description: 'A unified WebUI for speech synthesis, voice conversion, audio generation, and music models.',
      repoUrl: 'https://github.com/rsxdalv/TTS-WebUI',
      type: 'audio',
      extensionsDir: '/extensions',
      methods: TTS_RM,
      installationType: 'git',
    },
    {
      id: AG_ID,
      title: 'Audio Generation',
      description: 'A webui for different audio related Neural Networks',
      repoUrl: 'https://github.com/gitmylo/audio-webui',
      type: 'audio',
      supportCustomArguments: true,
      arguments: gitmyloArguments,
      extensionsDir: '/extensions',
      methods: AG_RM,
      installationType: 'git',
    },
    {
      id: ALLTALK_ID,
      title: 'AllTalk TTS',
      description: 'Advanced text-to-speech engine based on Coqui TTS with low VRAM support and voice cloning.',
      repoUrl: 'https://github.com/erew123/alltalk_tts',
      type: 'audio',
      methods: ALLTALK_RM,
      installationType: 'git',
    },
    {
      id: APPLIO_ID,
      title: 'Applio',
      description: 'A simple, high-quality voice conversion tool focused on ease of use and performance.',
      repoUrl: 'https://github.com/IAHispano/Applio',
      type: 'audio',
      methods: APPLIO_RM,
      installationType: 'git',
    },
    {
      id: CHAT_TTS_ID,
      title: 'ChatTTS',
      description: 'Generative speech model for daily dialogue scenarios supporting conversational TTS.',
      repoUrl: 'https://github.com/2noise/ChatTTS',
      type: 'audio',
      methods: CHAT_TTS_RM,
      installationType: 'git',
    },
    {
      id: VOICE_STUDIO_ID,
      title: 'VoiceStudio',
      description:
        'The open-source ElevenLabs alternative AI Voice Clone, Dub, Dictate, Transcribe, Audiobook creator ' +
        'and Voice workflow studio.',

      repoUrl: 'https://github.com/debpalash/VoiceStudio',
      type: 'audio',
      supportCustomArguments: true,
      arguments: voiceStudioArguments,
      methods: VOICE_STUDIO_RM,
      installationType: 'git',
    },
  ],
};

export default audioPage;

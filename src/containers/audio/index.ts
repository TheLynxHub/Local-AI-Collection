import {PagesData} from '../../../../src/common/types/plugins/modules';
import {AG_ID, ALLTALK_ID, APPLIO_ID, CHAT_TTS_ID, TTS_ID, VOICE_STUDIO_ID} from '../../constants';
import {rendererMethods as ALLTALK_RM} from './AllTalkTts';
import {rendererMethods as APPLIO_RM} from './Applio';
import {arguments as gitmyloArguments, rendererMethods as AG_RM} from './AudioGitmylo';
import {rendererMethods as CHAT_TTS_RM} from './ChatTts';
import {rendererMethods as TTS_RM} from './TextToSpeech';
import {arguments as voiceStudioArguments, rendererMethods as VOICE_STUDIO_RM} from './VoiceStudio';

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

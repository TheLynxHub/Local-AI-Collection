import {PagesData} from '../../../../src/common/types/plugins/modules';
import {AG_ID, ALLTALK_ID, APPLIO_ID, CHAT_TTS_ID, TTS_ID} from '../../Constants';
import ALLTALK_RM from './AllTalk TTS (erew123)/RendererMethods';
import APPLIO_RM from './Applio/RendererMethods';
import gitmyloArguments from './Audio Generation (gitmylo)/Arguments';
import AG_RM from './Audio Generation (gitmylo)/RendererMethods';
import CHAT_TTS_RM from './ChatTTS (2noise)/RendererMethods';
import TTS_RM from './Text to Speech (rsxdalv)/RendererMethods';

const audioPage: PagesData = {
  routePath: 'audioGen_page',
  cards: [
    {
      id: TTS_ID,
      title: 'Text to Speech',
      description:
        'TTS Generation Web UI (Bark, MusicGen + AudioGen, Tortoise, RVC, Vocos,' +
        ' Demucs, SeamlessM4T, MAGNet, StyleTTS2, MMS)',
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
      description:
        'AllTalk is based on the Coqui TTS engine, similar to the Coqui_tts extension for Text generation webUI, ' +
        'however supports a variety of advanced features, such as a settings page, low VRAM support, DeepSpeed, ' +
        'narrator, model finetuning, custom models, wav file maintenance. It can also be used with 3rd Party ' +
        'software via JSON calls.',
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
      description:
        'A generative speech model for daily dialogue scenarios such as LLM assistants, ' +
        'supporting conversational TTS with fine-grained prosodic control.',
      repoUrl: 'https://github.com/2noise/ChatTTS',
      type: 'audio',
      methods: CHAT_TTS_RM,
      installationType: 'git',
    },
  ],
};

export default audioPage;

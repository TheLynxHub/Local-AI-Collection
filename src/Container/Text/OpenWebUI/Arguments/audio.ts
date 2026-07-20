/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const audio: DataSection = {
  category: 'Audio',
  sections: [
    {
      section: 'Whisper Speech-to-Text (Local)',
      items: [
        {
          name: 'WHISPER_MODEL',
          description:
            'Sets the Whisper model to use for Speech-to-Text. The backend used is faster_whisper with quantization to `int8`.',
          type: 'Input',
          defaultValue: 'base',
        },
        {
          name: 'WHISPER_MODEL_DIR',
          description: 'Specifies the directory to store Whisper model files.',
          type: 'Input',
          defaultValue: '${DATA_DIR}/cache/whisper/models',
        },
        {
          name: 'WHISPER_VAD_FILTER',
          description: 'Specifies whether to apply a Voice Activity Detection (VAD) filter to Whisper Speech-to-Text.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WHISPER_COMPUTE_TYPE',
          description:
            'Sets the compute type for Whisper model inference. Defaults to `int8` for CPU and `float16` for CUDA (with fallback to `int8/int8_float16`).',
          type: 'Input',
        },
        {
          name: 'WHISPER_MODEL_AUTO_UPDATE',
          description: 'Toggles automatic update of the Whisper model.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WHISPER_LANGUAGE',
          description:
            'Specifies the ISO 639-1 language Whisper uses for STT (ISO 639-2 for Hawaiian and Cantonese). Whisper predicts the language by default.',
          type: 'Input',
        },
        {
          name: 'WHISPER_MULTILINGUAL',
          description:
            'Toggles whether to use the multilingual Whisper model. When set to `False`, the system will use the English-only model for better performance in English-centric tasks. When `True`, it supports multiple languages.',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
    {
      section: 'Speech-to-Text (OpenAI)',
      items: [
        {
          name: 'AUDIO_STT_ENGINE',
          description: 'Specifies the Speech-to-Text engine to use.',
          type: 'DropDown',
          values: ['', 'openai', 'deepgram', 'azure', 'mistral'],
        },
        {
          name: 'AUDIO_STT_MODEL',
          description: 'Specifies the Speech-to-Text model to use for OpenAI-compatible endpoints.',
          type: 'Input',
          defaultValue: 'whisper-1',
        },
        {
          name: 'AUDIO_STT_OPENAI_API_BASE_URL',
          description: 'Sets the OpenAI-compatible base URL to use for Speech-to-Text.',
          type: 'Input',
          defaultValue: '${OPENAI_API_BASE_URL}',
        },
        {
          name: 'AUDIO_STT_OPENAI_API_KEY',
          description: 'Sets the OpenAI API key to use for Speech-to-Text.',
          type: 'Input',
          defaultValue: '${OPENAI_API_KEY}',
        },
      ],
    },
    {
      section: 'Speech-to-Text (Mistral)',
      items: [
        {
          name: 'AUDIO_STT_MISTRAL_API_KEY',
          description: 'Sets the Mistral API key to use for Speech-to-Text.',
          type: 'Input',
        },
        {
          name: 'AUDIO_STT_MISTRAL_API_BASE_URL',
          description: 'Specifies the Mistral API base URL to use for Speech-to-Text.',
          type: 'Input',
          defaultValue: 'https://api.mistral.ai/v1',
        },
        {
          name: 'AUDIO_STT_MISTRAL_USE_CHAT_COMPLETIONS',
          description:
            'Enables using Mistral chat completions endpoint for Speech-to-Text instead of the dedicated STT endpoint.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'AUDIO_STT_SUPPORTED_CONTENT_TYPES',
          description: 'Comma-separated list of supported audio content types for Speech-to-Text.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Speech-to-Text (Azure)',
      items: [
        {
          name: 'AUDIO_STT_AZURE_API_KEY',
          description: 'Specifies the Azure API key to use for Speech-to-Text.',
          type: 'Input',
        },
        {
          name: 'AUDIO_STT_AZURE_REGION',
          description: 'Specifies the Azure region to use for Speech-to-Text.',
          type: 'Input',
        },
        {
          name: 'AUDIO_STT_AZURE_BASE_URL',
          description: 'Specifies the Azure base URL to use for Speech-to-Text. Overrides the default Azure endpoint.',
          type: 'Input',
        },
        {
          name: 'AUDIO_STT_AZURE_MAX_SPEAKERS',
          description: 'Sets the maximum number of speakers for Azure Speech-to-Text diarization.',
          type: 'Input',
          defaultValue: 3,
        },
        {
          name: 'AUDIO_STT_AZURE_LOCALES',
          description: 'Specifies the locales to use for Azure Speech-to-Text.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Speech-to-Text (Deepgram)',
      items: [
        {
          name: 'DEEPGRAM_API_KEY',
          description: 'Specifies the Deepgram API key to use for Speech-to-Text.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Text-to-Speech',
      items: [
        {
          name: 'AUDIO_TTS_API_KEY',
          description: 'Sets the API key for Text-to-Speech.',
          type: 'Input',
        },
        {
          name: 'AUDIO_TTS_ENGINE',
          description: 'Specifies the Text-to-Speech engine to use.',
          type: 'DropDown',
          values: ['', 'azure', 'elevenlabs', 'openai', 'transformers'],
        },
        {
          name: 'AUDIO_TTS_MODEL',
          description: 'Specifies the OpenAI text-to-speech model to use.',
          type: 'Input',
          defaultValue: 'tts-1',
        },
        {
          name: 'AUDIO_TTS_VOICE',
          description: 'Sets the OpenAI text-to-speech voice to use.',
          type: 'Input',
          defaultValue: 'alloy',
        },
        {
          name: 'AUDIO_TTS_SPLIT_ON',
          description: 'Sets the OpenAI text-to-speech split on to use.',
          type: 'Input',
          defaultValue: 'punctuation',
        },
      ],
    },
    {
      section: 'Azure Text-to-Speech',
      items: [
        {
          name: 'AUDIO_TTS_AZURE_SPEECH_REGION',
          description: 'Sets the region for Azure Text to Speech.',
          type: 'Input',
        },
        {
          name: 'AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT',
          description: 'Sets the output format for Azure Text to Speech.',
          type: 'Input',
          defaultValue: 'audio-24khz-160kbitrate-mono-mp3',
        },
        {
          name: 'AUDIO_TTS_AZURE_SPEECH_BASE_URL',
          description: 'Sets the base URL for Azure Text to Speech. Overrides the default Azure endpoint.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'OpenAI Text-to-Speech',
      items: [
        {
          name: 'AUDIO_TTS_OPENAI_API_BASE_URL',
          description: 'Sets the OpenAI-compatible base URL to use for text-to-speech.',
          type: 'Input',
          defaultValue: '${OPENAI_API_BASE_URL}',
        },
        {
          name: 'AUDIO_TTS_OPENAI_API_KEY',
          description: 'Sets the API key to use for text-to-speech.',
          type: 'Input',
          defaultValue: '${OPENAI_API_KEY}',
        },
        {
          name: 'AUDIO_TTS_OPENAI_PARAMS',
          description: 'Additional parameters for OpenAI text-to-speech API in JSON format.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Elevenlabs Text-to-Speech',
      items: [
        {
          name: 'ELEVENLABS_API_BASE_URL',
          description:
            'Configures custom ElevenLabs API endpoints, enabling support for EU residency API requirements and other regional deployments.',
          type: 'Input',
          defaultValue: 'https://api.elevenlabs.io',
        },
      ],
    },
    {
      section: 'Voice Mode',
      items: [
        {
          name: 'VOICE_MODE_PROMPT_TEMPLATE',
          description:
            'Sets the prompt template for voice mode interactions. This template is used to format voice input before sending to the model.',
          type: 'Input',
        },
      ],
    },
  ],
};

export default audio;

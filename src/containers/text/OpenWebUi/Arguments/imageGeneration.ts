/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const imageGeneration: DataSection = {
  category: 'Image Generation',
  sections: [
    {
      section: 'General',
      items: [
        {
          name: 'ENABLE_IMAGE_GENERATION',
          description: 'Enables or disables image generation features.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'IMAGE_GENERATION_ENGINE',
          description: 'Specifies the engine to use for image generation.',
          type: 'DropDown',
          values: ['openai', 'comfyui', 'automatic1111', 'gemini'],
          defaultValue: 'openai',
        },
        {
          name: 'IMAGE_GENERATION_MODEL',
          description: 'Default model to use for image generation (e.g., `dall-e-3`, `gemini-2.0-flash-exp`).',
          type: 'Input',
        },
        {
          name: 'ENABLE_IMAGE_PROMPT_GENERATION',
          description: 'Enables or disables automatic enhancement of user prompts for better image generation results.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE',
          description: 'Specifies the template to use for generating image prompts.',
          type: 'Input',
        },
        {
          name: 'IMAGE_SIZE',
          description:
            'Sets the default output dimensions for generated images in WIDTHxHEIGHT format (e.g., `1024x1024`).',
          type: 'Input',
          defaultValue: '512x512',
        },
        {
          name: 'IMAGE_STEPS',
          description:
            'Sets the default iteration steps for image generation. Used for ComfyUI and AUTOMATIC1111 engines.',
          type: 'Input',
          defaultValue: 50,
        },
      ],
    },
    {
      section: 'Image Editing',
      items: [
        {
          name: 'ENABLE_IMAGE_EDIT',
          description:
            'When disabled, Image Editing will not be used and instead, images will be created only using the image generation engine.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'IMAGE_EDIT_ENGINE',
          description:
            'Configures the engine used for image editing operations, enabling modification of existing images using text prompts.',
          type: 'DropDown',
          values: ['openai', 'gemini', 'comfyui'],
          defaultValue: 'openai',
        },
        {
          name: 'IMAGE_EDIT_MODEL',
          description:
            'Specifies the model to use for image editing operations within the selected engine (e.g., `dall-e-2`, `gemini-2.5-flash`).',
          type: 'Input',
        },
        {
          name: 'IMAGE_EDIT_SIZE',
          description:
            'Defines the output dimensions for edited images in WIDTHxHEIGHT format (e.g., `1024x1024`). Leave empty to preserve original dimensions.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'AUTOMATIC1111',
      items: [
        {
          name: 'AUTOMATIC1111_BASE_URL',
          description: "Specifies the URL to AUTOMATIC1111's Stable Diffusion API (e.g., `http://127.0.0.1:7860`).",
          type: 'Input',
        },
        {
          name: 'AUTOMATIC1111_API_AUTH',
          description: 'Sets the AUTOMATIC1111 API authentication credentials if required.',
          type: 'Input',
        },
        {
          name: 'AUTOMATIC1111_PARAMS',
          description:
            'Additional parameters in JSON format to pass to AUTOMATIC1111 API requests (e.g., `{"cfg_scale": 7, "sampler_name": "Euler a", "scheduler": "normal"}`).',
          type: 'Input',
        },
      ],
    },
    {
      section: 'ComfyUI',
      items: [
        {
          name: 'COMFYUI_BASE_URL',
          description: 'Specifies the URL to the ComfyUI image generation API (e.g., `http://127.0.0.1:8188`).',
          type: 'Input',
        },
        {
          name: 'COMFYUI_API_KEY',
          description: 'Sets the API key for ComfyUI authentication.',
          type: 'Input',
        },
        {
          name: 'COMFYUI_WORKFLOW',
          description:
            'Defines the ComfyUI workflow configuration in JSON format. Export from ComfyUI using "Save (API Format)" to ensure compatibility.',
          type: 'Input',
        },
        {
          name: 'COMFYUI_WORKFLOW_NODES',
          description:
            'Specifies the ComfyUI workflow node mappings for image generation, defining which nodes handle prompt, model, dimensions, and other parameters. Configured automatically via the admin UI.',
          type: 'Input',
        },
        {
          name: 'IMAGES_EDIT_COMFYUI_BASE_URL',
          description:
            'Configures the ComfyUI base URL for image editing operations, enabling self-hosted ComfyUI workflows for image manipulation.',
          type: 'Input',
        },
        {
          name: 'IMAGES_EDIT_COMFYUI_API_KEY',
          description:
            'Provides authentication for ComfyUI image editing API requests when the ComfyUI instance requires API key authentication.',
          type: 'Input',
        },
        {
          name: 'IMAGES_EDIT_COMFYUI_WORKFLOW',
          description:
            'Defines the ComfyUI workflow configuration in JSON format for image editing operations. Must include nodes for image input, prompt, and output. Export from ComfyUI using "Save (API Format)".',
          type: 'Input',
        },
        {
          name: 'IMAGES_EDIT_COMFYUI_WORKFLOW_NODES',
          description:
            'Specifies the ComfyUI workflow node mappings for image editing, defining which nodes handle image input, prompt, model, dimensions, and other parameters. Configured automatically via the admin UI.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Gemini',
      items: [
        {
          name: 'GEMINI_API_BASE_URL',
          description: "Specifies the URL to Gemini's API.",
          type: 'Input',
        },
        {
          name: 'GEMINI_API_KEY',
          description: 'Sets the Gemini API key.',
          type: 'Input',
        },
        {
          name: 'IMAGES_GEMINI_API_BASE_URL',
          description: "Specifies the URL to Gemini's image generation API.",
          type: 'Input',
          defaultValue: '${GEMINI_API_BASE_URL}',
        },
        {
          name: 'IMAGES_GEMINI_API_KEY',
          description: 'Sets the Gemini API key for image generation.',
          type: 'Input',
          defaultValue: '${GEMINI_API_KEY}',
        },
        {
          name: 'IMAGES_GEMINI_ENDPOINT_METHOD',
          description:
            'Specifies the Gemini API endpoint method for image generation, supporting both legacy Imagen models and newer Gemini models with image generation capabilities.',
          type: 'DropDown',
          values: ['predict', 'generateContent'],
        },
        {
          name: 'IMAGES_EDIT_GEMINI_API_BASE_URL',
          description: 'Configures the Gemini API base URL for image editing operations with Gemini models.',
          type: 'Input',
          defaultValue: '${GEMINI_API_BASE_URL}',
        },
        {
          name: 'IMAGES_EDIT_GEMINI_API_KEY',
          description: 'Provides authentication for Gemini image editing API requests.',
          type: 'Input',
          defaultValue: '${GEMINI_API_KEY}',
        },
      ],
    },
    {
      section: 'Jina',
      items: [
        {
          name: 'JINA_API_BASE_URL',
          description: 'Sets the base URL for Jina API. Allows using custom or self-hosted Jina-compatible endpoints.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'OpenAI DALL-E',
      items: [
        {
          name: 'IMAGES_OPENAI_API_BASE_URL',
          description: 'Sets the OpenAI-compatible base URL to use for DALL-E image generation.',
          type: 'Input',
          defaultValue: '${OPENAI_API_BASE_URL}',
        },
        {
          name: 'IMAGES_OPENAI_API_VERSION',
          description:
            'Optional setting. If provided it sets the `api-version` query parameter when calling the image generation endpoint. Required for Azure OpenAI deployments.',
          type: 'Input',
        },
        {
          name: 'IMAGES_OPENAI_API_KEY',
          description: 'Sets the API key to use for DALL-E image generation.',
          type: 'Input',
          defaultValue: '${OPENAI_API_KEY}',
        },
        {
          name: 'IMAGES_OPENAI_API_PARAMS',
          description:
            'Additional parameters for OpenAI image generation API in JSON format. Allows customization of API-specific settings such as quality parameters for DALL-E models (e.g., `{"quality": "hd"}` for dall-e-3).',
          type: 'Input',
        },
        {
          name: 'IMAGES_EDIT_OPENAI_API_BASE_URL',
          description:
            'Configures the OpenAI API base URL specifically for image editing operations, allowing separate endpoints from image generation.',
          type: 'Input',
          defaultValue: '${OPENAI_API_BASE_URL}',
        },
        {
          name: 'IMAGES_EDIT_OPENAI_API_VERSION',
          description:
            'Specifies the OpenAI API version for image editing, enabling support for Azure OpenAI deployments with versioned endpoints.',
          type: 'Input',
        },
        {
          name: 'IMAGES_EDIT_OPENAI_API_KEY',
          description:
            'Provides authentication for OpenAI image editing API requests, with support for separate keys from image generation.',
          type: 'Input',
          defaultValue: '${OPENAI_API_KEY}',
        },
      ],
    },
  ],
};

export default imageGeneration;

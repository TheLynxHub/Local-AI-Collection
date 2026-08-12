/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const userPermissions: DataSection = {
  category: 'User Permissions',
  sections: [
    {
      section: 'Chat Permissions',
      items: [
        {
          name: 'USER_PERMISSIONS_CHAT_CONTROLS',
          description:
            'Acts as a master switch to enable or disable the main "Controls" button and panel in the chat interface. **If this is set to False, users will not see the Controls button, and the granular permissions below will have no effect**.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_VALVES',
          description:
            'When `USER_PERMISSIONS_CHAT_CONTROLS` is enabled, this setting specifically controls the visibility of the "Valves" section within the chat controls panel.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_SYSTEM_PROMPT',
          description:
            'When `USER_PERMISSIONS_CHAT_CONTROLS` is enabled, this setting specifically controls the visibility of the customizable "System Prompt" section within the chat controls panel, folders and the user settings.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_PARAMS',
          description:
            'When `USER_PERMISSIONS_CHAT_CONTROLS` is enabled, this setting specifically controls the visibility of the "Advanced Parameters" section within the chat controls panel.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_FILE_UPLOAD',
          description: 'Enables or disables user permission to upload files to chats.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_DELETE',
          description: 'Enables or disables user permission to delete chats.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_EDIT',
          description: 'Enables or disables user permission to edit chats.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_DELETE_MESSAGE',
          description:
            'Enables or disables user permission to delete individual messages within chats. This provides granular control over message deletion capabilities separate from full chat deletion.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_CONTINUE_RESPONSE',
          description:
            'Enables or disables user permission to continue AI responses. When disabled, users cannot use the "Continue Response" button, which helps prevent potential system prompt leakage through response continuation manipulation.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_REGENERATE_RESPONSE',
          description:
            'Enables or disables user permission to regenerate AI responses. Controls access to both the standard regenerate button and the guided regeneration menu.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_RATE_RESPONSE',
          description:
            'Enables or disables user permission to rate AI responses using the thumbs up/down feedback system. This controls access to the response rating functionality for evaluation and feedback collection.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_STT',
          description: 'Enables or disables user permission to use Speech-to-Text in chats.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_TTS',
          description: 'Enables or disables user permission to use Text-to-Speech in chats.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_CALL',
          description: 'Enables or disables user permission to make calls in chats.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_CHAT_MULTIPLE_MODELS',
          description: 'Enables or disables user permission to use multiple models in chats.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_CHAT_TEMPORARY',
          description: 'Enables or disables user permission to create temporary chats.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED',
          description: 'Enables or disables enforced temporary chats for users.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Feature Permissions',
      items: [
        {
          name: 'USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS',
          description: 'Enables or disables user permission to access direct tool servers.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_FEATURES_WEB_SEARCH',
          description: 'Enables or disables user permission to use the web search feature.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_FEATURES_IMAGE_GENERATION',
          description: 'Enables or disables user permission to use the image generation feature.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_FEATURES_CODE_INTERPRETER',
          description: 'Enables or disables user permission to use code interpreter feature.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_FEATURES_MEMORIES',
          description: 'Enables or disables user permission to use the memory feature.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_FEATURES_FOLDERS',
          description: 'Enables or disables the visibility of the Folders feature (chat sidebar) to users.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_FEATURES_NOTES',
          description: 'Enables or disables the visibility of the Notes feature to users.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_FEATURES_CHANNELS',
          description: 'Enables or disables the ability for users to create their own group channels.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_FEATURES_API_KEYS',
          description:
            'Sets the permission for API key creation feature for users. When enabled, users will have the ability to create and manage API keys for programmatic access.',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
    {
      section: 'Workspace Permissions',
      items: [
        {
          name: 'USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS',
          description: 'Enables or disables user permission to access workspace models.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS',
          description: 'Enables or disables user permission to access workspace knowledge.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS',
          description: 'Enables or disables user permission to access workspace prompts.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS',
          description: 'Enables or disables user permission to access workspace tools.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING',
          description: 'Enables or disables public sharing of workspace models.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING',
          description: 'Enables or disables public sharing of workspace knowledge.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING',
          description: 'Enables or disables public sharing of workspace prompts.',
          type: 'Input',
        },
        {
          name: 'USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING',
          description: 'Enables or disables public sharing of workspace tools.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Settings Permissions',
      items: [
        {
          name: 'USER_PERMISSIONS_SETTINGS_INTERFACE',
          description:
            'Enables or disables user / group permissions for the interface settings section in the Settings Modal.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'USER_PERMISSIONS_NOTES_ALLOW_PUBLIC_SHARING',
          description: 'Enables or disables public sharing of notes.',
          type: 'Input',
        },
      ],
    },
  ],
};

export default userPermissions;

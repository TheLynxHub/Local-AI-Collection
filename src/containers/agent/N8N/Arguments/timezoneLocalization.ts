/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const timezoneLocalization: DataItem = {
  category: 'Timezone & Localization',
  items: [
    {
      name: 'GENERIC_TIMEZONE',
      type: 'Input',
      defaultValue: 'America/New_York',
      description: 'The n8n instance timezone. Important for schedule nodes (such as Cron).',
    },
    {
      name: 'N8N_DEFAULT_LOCALE',
      type: 'Input',
      defaultValue: 'en',
      description:
        "A locale identifier, compatible with the Accept-Language header. n8n doesn't support regional identifiers, such as `de-AT`. When running in a locale other than the default, n8n displays UI strings in the selected locale, and falls back to `en` for any untranslated strings.",
    },
  ],
};

export default timezoneLocalization;

/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const logs: DataItem = {
  category: 'Logs',
  items: [
    {
      name: 'N8N_LOG_LEVEL',
      type: 'DropDown',
      defaultValue: 'info',
      values: ['info', 'warn', 'error', 'debug'],
      description: 'Log output level. Refer to Log levels for details.',
    },
    {
      name: 'N8N_LOG_OUTPUT',
      type: 'DropDown',
      defaultValue: 'console',
      values: ['console', 'file'],
      description: 'Where to output logs. Provide multiple values as a comma-separated list.',
    },
    {
      name: 'N8N_LOG_FORMAT',
      type: 'DropDown',
      defaultValue: 'text',
      values: ['text', 'json'],
      description:
        'The log format to use. `text` prints human readable messages. `json` prints one JSON object per line containing the message, level, timestamp, and all metadata. This is useful for production monitoring as well as debugging.',
    },
    {
      name: 'N8N_LOG_CRON_ACTIVE_INTERVAL',
      type: 'Input',
      defaultValue: 0,
      description: 'Interval in minutes to log currently active cron jobs. Set to 0 to disable.',
    },
    {
      name: 'N8N_LOG_FILE_COUNT_MAX',
      type: 'Input',
      defaultValue: 100,
      description: 'Max number of log files to keep.',
    },
    {
      name: 'N8N_LOG_FILE_SIZE_MAX',
      type: 'Input',
      defaultValue: 16,
      description: 'Max size of each log file in MB.',
    },
    {
      name: 'N8N_LOG_FILE_LOCATION',
      type: 'Input',
      defaultValue: '<n8n-directory-path>/logs/n8n.log',
      description: 'Log file location. Requires N8N_LOG_OUTPUT set to `file`.',
    },
    {name: 'DB_LOGGING_ENABLED', type: 'CheckBox', description: 'Whether to enable database-specific logging.'},
    {
      name: 'DB_LOGGING_OPTIONS',
      type: 'DropDown',
      defaultValue: 'error',
      values: ['query', 'error', 'schema', 'warn', 'info', 'log'],
      description: 'Database log output level. To enable all logging, specify `all`. Refer to TypeORM logging options',
    },
    {
      name: 'DB_LOGGING_MAX_EXECUTION_TIME',
      type: 'Input',
      defaultValue: 1000,
      description:
        'Maximum execution time (in milliseconds) before n8n logs a warning. Set to 0 to disable long running query warning.',
    },
    {
      name: 'CODE_ENABLE_STDOUT',
      type: 'CheckBox',
      description:
        "Set to `true` to send Code node logs from `console.log` or `print` to the process's stdout, only for production executions.",
    },
    {
      name: 'NO_COLOR',
      type: 'Input',
      defaultValue: 'undefined',
      description:
        'Set to any value to output logs without ANSI colors. For more information, see the no-color.org website.',
    },
    {
      name: 'N8N_EVENTBUS_CHECKUNSENTINTERVAL',
      type: 'Input',
      defaultValue: 0,
      description:
        'How often (in milliseconds) to check for unsent event messages. Can in rare cases send message twice. Set to 0 to disable it.',
    },
    {
      name: 'N8N_EVENTBUS_LOGWRITER_SYNCFILEACCESS',
      type: 'CheckBox',
      description: 'Whether all file access happens synchronously within the thread (true) or not (false).',
    },
    {
      name: 'N8N_EVENTBUS_LOGWRITER_KEEPLOGCOUNT',
      type: 'Input',
      defaultValue: 3,
      description: 'Number of event log files to keep.',
    },
    {
      name: 'N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB',
      type: 'Input',
      defaultValue: 10240,
      description: 'Maximum size (in kilo-bytes) of an event log file before a new one starts.',
    },
    {
      name: 'N8N_EVENTBUS_LOGWRITER_LOGBASENAME',
      type: 'Input',
      defaultValue: 'n8nEventLog',
      description: 'Basename of the event log file.',
    },
  ],
};

export default logs;

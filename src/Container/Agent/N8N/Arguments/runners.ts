/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const runners: DataItem = {
  category: 'Task Runners',
  items: [
    {name: 'N8N_RUNNERS_ENABLED', type: 'CheckBox', description: 'Are task runners enabled.'},
    {
      name: 'N8N_RUNNERS_MODE',
      type: 'DropDown',
      defaultValue: 'internal',
      values: ['internal', 'external'],
      description:
        'How to launch and run the task runner. `internal` means n8n will launch a task runner as child process. `external` means an external orchestrator will launch the task runner.',
    },
    {
      name: 'N8N_RUNNERS_AUTH_TOKEN',
      type: 'Input',
      defaultValue: 'Random string',
      description: 'Shared secret used by a task runner to authenticate to n8n. Required when using `external` mode.',
    },
    {
      name: 'N8N_RUNNERS_BROKER_PORT',
      type: 'Input',
      defaultValue: 5679,
      description: 'Port the task broker listens on for task runner connections.',
    },
    {
      name: 'N8N_RUNNERS_BROKER_LISTEN_ADDRESS',
      type: 'Input',
      defaultValue: '127.0.0.1',
      description: 'Address the task broker listens on.',
    },
    {
      name: 'N8N_RUNNERS_MAX_PAYLOAD',
      type: 'Input',
      defaultValue: 1073741824,
      description: 'Maximum payload size in bytes for communication between a task broker and a task runner.',
    },
    {
      name: 'N8N_RUNNERS_MAX_OLD_SPACE_SIZE',
      type: 'Input',
      description:
        'The --max-old-space-size option to use for a task runner (in MB). By default, Node.js will set this based on available memory.',
    },
    {
      name: 'N8N_RUNNERS_MAX_CONCURRENCY',
      type: 'Input',
      defaultValue: 5,
      description: 'The number of concurrent tasks a task runner can execute at a time.',
    },
    {
      name: 'N8N_RUNNERS_TASK_TIMEOUT',
      type: 'Input',
      defaultValue: 300,
      description:
        'The maximum time, in seconds, a task can run before the runner stops it and restarts. This value must be greater than 0.',
    },
    {
      name: 'N8N_RUNNERS_HEARTBEAT_INTERVAL',
      type: 'Input',
      defaultValue: 30,
      description:
        "The interval, in seconds, at which the runner must send a heartbeat to the broker. If the runner doesn't send a heartbeat in time, the task stops and the runner restarts. This value must be greater than 0.",
    },
    {
      name: 'N8N_RUNNERS_INSECURE_MODE',
      type: 'CheckBox',
      description:
        'Whether to disable all security measures in the task runner, for compatibility with modules that rely on insecure JS features. **Discouraged for production use.**',
    },
    {
      name: 'N8N_RUNNERS_TASK_REQUEST_TIMEOUT',
      type: 'Input',
      defaultValue: 20,
      description:
        'How long (in seconds) a task request can wait for a runner to become available before timing out. This prevents workflows from hanging indefinitely when no runners are available. Must be greater than 0.',
    },
    {
      name: 'N8N_RUNNERS_LAUNCHER_LOG_LEVEL',
      type: 'DropDown',
      defaultValue: 'info',
      values: ['debug', 'info', 'warn', 'error'],
      description: 'Which log messages to show.',
    },
    {
      name: 'N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT',
      type: 'Input',
      defaultValue: 15,
      description: 'The number of seconds to wait before shutting down an idle runner.',
    },
    {
      name: 'N8N_RUNNERS_TASK_BROKER_URI',
      type: 'Input',
      defaultValue: 'http://127.0.0.1:5679',
      description: 'The URI of the task broker server (n8n instance).',
    },
    {
      name: 'N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT',
      type: 'Input',
      defaultValue: 5680,
      description: "Port for the launcher's health check server.",
    },
    {name: 'NODE_OPTIONS', type: 'Input', description: 'Options for Node.js.'},
    {
      name: 'N8N_RUNNERS_GRANT_TOKEN',
      type: 'Input',
      defaultValue: 'Random string',
      description:
        'Token the runner uses to authenticate with the task broker. This is automatically provided by the launcher.',
    },
    {
      name: 'N8N_RUNNERS_ALLOW_PROTOTYPE_MUTATION',
      type: 'CheckBox',
      description:
        'Whether to allow prototype mutation for external libraries. Set to `true` to allow modules that rely on runtime prototype mutation (for example, `puppeteer`) at the cost of relaxing security.',
    },
    {
      name: 'N8N_RUNNERS_STDLIB_ALLOW',
      type: 'Input',
      description:
        'Python standard library modules that you can use in the Code node, including their submodules. Use `*` to allow all stdlib modules. n8n disables all Python standard library imports by default.',
    },
    {
      name: 'N8N_RUNNERS_EXTERNAL_ALLOW',
      type: 'Input',
      description:
        'Third-party Python modules that are allowed to be used in the Code node, including their submodules. Use `*` to allow all external modules. n8n disables all third-party Python modules by default. Third-party Python modules must be included in the `n8nio/runners` image.',
    },
    {
      name: 'N8N_RUNNERS_BUILTINS_DENY',
      type: 'Input',
      defaultValue:
        'eval,exec,compile,open,input,breakpoint,getattr,object,type,vars,setattr,delattr,hasattr,dir,memoryview,__build_class__,globals,locals',
      description:
        "Python built-ins that you can't use in the Code node. Set to an empty string to allow all built-ins.",
    },
    {
      name: 'N8N_BLOCK_RUNNER_ENV_ACCESS',
      type: 'CheckBox',
      defaultValue: true,
      description:
        "Whether to block access to the runner's environment from within Python code tasks. Set to `false` to enable all Python code node users access to the runner's environment via `os.environ`. For security reasons, environment variable access is blocked by default.",
    },
  ],
};

export default runners;

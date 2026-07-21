import {ArgumentsData} from '../../../../../src/common/types/plugins/modules';

const mcMonkeyArguments: ArgumentsData = [
  {
    category: 'Command Line Arguments',
    items: [
      {
        name: '--data_dir',
        description: 'Override the default data directory.',
        type: 'Directory',
        defaultValue: 'Data',
      },
      {
        name: '--settings_file',
        description:
          'If your settings file is anywhere other than the default, you must specify as a command line arg.',
        type: 'File',
        defaultValue: 'Data/Settings.fds',
      },
      {
        name: '--backends_file',
        description:
          'If your backends file is anywhere other than the default, you must specify as a command line arg.',
        type: 'File',
        defaultValue: 'Data/Backends.fds',
      },
      {
        name: '--environment',
        description:
          'Can be `development` or `production` to set what ASP.NET Web Environment to use. `Development`' +
          ' gives detailed debug logs and errors, while `Production` is optimized for normal usage.',
        type: 'DropDown',
        defaultValue: 'Production',
        values: ['development', 'production'],
      },
      {
        name: '--host',
        description: "Can be used to override the 'Network.Host' server setting.",
        type: 'Input',
        defaultValue: 'localhost',
      },
      {
        name: '--port',
        description: "Can be used to override the 'Network.Port' server setting.",
        type: 'Input',
        defaultValue: '7801',
      },
      {
        name: '--asp_loglevel',
        description:
          'Sets the minimum log level for ASP.NET web logger, as any of: `Trace`, `Debug`, `Information`,' +
          " `Warning`, `Error`, `Critical`, `None`. Note 'information' here spams debug output.",
        type: 'DropDown',
        defaultValue: 'warning',
        values: ['Trace', 'Debug', 'Information', 'Warning', 'Error', 'Critical', 'None'],
      },
      {
        name: '--loglevel',
        description:
          'Minimum SwarmUI log level, as any of: `Debug`, `Info`, `Init`, `Warning`, `Error`,' +
          " `None`. 'Info' here is the normal usage data.",
        type: 'DropDown',
        defaultValue: 'Info',
        values: ['Debug', 'Info', 'Init', 'Warning', 'Error', 'None'],
      },
      {
        name: '--user_id',
        description:
          "Set the local user's default UserID (for running in single-user mode, not useful in shared mode).",
        type: 'Input',
        defaultValue: 'local',
      },
      {
        name: '--lock_settings',
        description:
          'If enabled, blocks in-UI editing of server settings by admins. Settings cannot be modified ' +
          'in this mode without editing the settings file and restarting the server.',
        type: 'CheckBox',
      },
      {
        name: '--ngrok-path',
        description:
          'If specified, will be used as the path to an `ngrok` executable, and will automatically ' +
          'load and configure ngrok when launching, to share your UI instance on a publicly accessible URL.',
        type: 'File',
      },
      {
        name: '--cloudflared-path',
        description:
          'If specified, will be used as the path to an `cloudflared` executable, and will automatically' +
          ' load and configure TryCloudflare when launching, to share your UI instance on a publicly accessible URL.',
        type: 'File',
      },
      {
        name: '--proxy-region',
        description: 'If specified, sets the proxy (ngrok/cloudflared) region. If unspecified, defaults to closest.',
        type: 'Input',
      },
      {
        name: '--proxy-added-args',
        description:
          'If specified, adds additional args to the proxy launch. Use a `.` as the first symbol (parser hackaround).' +
          ' For example, `--proxy-added-args ".--my-arg --arg -argy arg"`',
        type: 'Input',
      },
      {
        name: '--ngrok-basic-auth',
        description: 'If specified, sets an ngrok basic-auth requirement to access.',
        type: 'Input',
      },
      {
        name: '--launch_mode',
        description: "Can be used to override the 'LaunchMode' server setting.",
        type: 'Input',
        defaultValue: 'none',
      },
      {
        name: '--require_control_within',
        description:
          'If specified, give a number of minutes within which a remote API server must send a ' +
          '`AdminTakeControl` API request, or presume the launch is bad. This is useful for auto-managed instances.',
        type: 'Input',
      },
      {
        name: '--no_persist',
        description:
          'If enabled, tells most systems in Swarm to avoid saving data ' +
          '(eg session handler will not save session data). ' +
          'Useful for instances with overlapping data storage especially.',
        type: 'CheckBox',
      },
      {
        name: '--help',
        description: 'Displays an in-CLI shortlist of CLI args and some usage hints.',
        type: 'CheckBox',
      },
    ],
  },
];

export default mcMonkeyArguments;

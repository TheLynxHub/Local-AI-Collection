/* eslint max-len: 0 */

import {ArgumentsData} from '../../../../../../src/common/types/plugins/modules';
import aiAssistant from './aiAssistant';
import binaryData from './binaryData';
import credentials from './credentials';
import database from './database';
import deployment from './deployment';
import endpoints from './endpoints';
import executions from './executions';
import externalHooksSecrets from './externalHooksSecrets';
import externalStorage from './externalStorage';
import insights from './insights';
import license from './license';
import logs from './logs';
import mcp from './mcp';
import nodes from './nodes';
import queueMode from './queueMode';
import runners from './runners';
import security from './security';
import sourceControl from './sourceControl';
import timezoneLocalization from './timezoneLocalization';
import userManagement from './userManagement';
import workflows from './workflows';

// TODO: Support command line conditional configuration
const n8nArguments: ArgumentsData = [
  aiAssistant,
  nodes,
  userManagement,
  workflows,
  runners,
  logs,
  license,
  queueMode,
  sourceControl,
  timezoneLocalization,
  security,
  externalHooksSecrets,
  deployment,
  database,
  executions,
  credentials,
  insights,
  binaryData,
  externalStorage,
  endpoints,
  mcp,
];

export default n8nArguments;

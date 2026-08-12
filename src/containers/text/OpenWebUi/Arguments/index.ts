/* eslint max-len: 0 */

import {ArgumentsData} from '../../../../../../src/common/types/plugins/modules';
import appBackend from './appBackend';
import audio from './audio';
import idap from './idap';
import imageGeneration from './imageGeneration';
import miscEnv from './miscEnv';
import oauth from './oauth';
import ragCEE from './ragCEE';
import retrievalAGR from './retrievalAGR';
import scim from './scim';
import securityVariables from './securityVariables';
import userPermissions from './userPermissions';
import vectorDatabase from './vectorDatabase';
import webSearch from './webSearch';

const openArguments: ArgumentsData = [
  appBackend,
  securityVariables,
  vectorDatabase,
  ragCEE,
  retrievalAGR,
  webSearch,
  audio,
  imageGeneration,
  oauth,
  idap,
  scim,
  userPermissions,
  miscEnv,
];

export default openArguments;

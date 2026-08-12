import {CardModules} from '../../src/common/types/plugins/modules';
import agentsPage from './containers/agent';
import audioPage from './containers/audio';
import imagePage from './containers/image';
import textPage from './containers/text';
import toolsPage from './containers/tools';
import {isPagesFixed} from './utils/rendererUtils';

const rendererModules: CardModules = [imagePage, textPage, audioPage, agentsPage];

if (isPagesFixed) rendererModules.push(toolsPage);

export default rendererModules;

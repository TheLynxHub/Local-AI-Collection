import {CardModules} from '../../src/common/types/plugins/modules';
import agentsPage from './containers/agent';
import audioPage from './containers/audio';
import imagePage from './containers/image';
import textPage from './containers/text';
import toolsPage from './containers/tools';

const rendererModules: CardModules = [imagePage, textPage, audioPage, toolsPage, agentsPage];

export default rendererModules;

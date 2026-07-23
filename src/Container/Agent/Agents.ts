import {PagesData} from '../../../../src/common/types/plugins/modules';
import {
  ANTIGRAVITY_CLI_ID,
  CLAUDE_CODE_ID,
  FLOWISEAI_ID,
  GeminiCli_ID,
  HERMES_AGENT_ID,
  LANGFLOW_ID,
  N8N_ID,
} from '../../Constants';
import antigravityCliArguments from './Antigravity CLI/Arguments';
import AntigravityCli_RM from './Antigravity CLI/RendererMethods';
import claudeCodeArguments from './Claude Code/Arguments';
import ClaudeCode_RM from './Claude Code/RendererMethods';
import flowiseArguments from './Flowise (FlowiseAI)/Arguments';
import Flow_RM from './Flowise (FlowiseAI)/RendererMethods';
import geminiCliArguments from './Gemini CLI/Arguments';
import GeminiCli_RM from './Gemini CLI/RendererMethods';
import hermesAgentArguments from './Hermes Agent (NousResearch)/Arguments';
import HermesAgent_RM from './Hermes Agent (NousResearch)/RendererMethods';
import langflowArguments from './Langflow (langflow-ai)/Arguments';
import Langflow_RM from './Langflow (langflow-ai)/RendererMethods';
import n8nArguments from './N8N/Arguments';
import N8N_RM from './N8N/RendererMethods';

const agentsPage: PagesData = {
  routePath: 'agents_page',
  cards: [
    {
      id: FLOWISEAI_ID,
      title: 'Flowise',
      description: 'Drag & drop UI to build your customized LLM flow',
      repoUrl: 'https://github.com/FlowiseAI/Flowise',
      type: 'text',
      supportCustomArguments: true,
      methods: Flow_RM,
      arguments: flowiseArguments,
      installationType: 'others',
    },
    {
      id: LANGFLOW_ID,
      title: 'Langflow',
      description: 'Visual framework for building and deploying AI-powered agents and workflows.',
      repoUrl: 'https://github.com/langflow-ai/langflow',
      type: 'text',
      supportCustomArguments: true,
      methods: Langflow_RM,
      arguments: langflowArguments,
      installationType: 'others',
    },
    {
      id: GeminiCli_ID,
      title: 'Gemini CLI',
      description: 'An open-source AI agent that brings the power of Gemini directly into your terminal.',
      repoUrl: 'https://github.com/google-gemini/gemini-cli',
      type: 'text',
      arguments: geminiCliArguments,
      methods: GeminiCli_RM,
      installationType: 'others',
    },
    {
      id: CLAUDE_CODE_ID,
      title: 'Claude Code',
      description: `Anthropic's agentic coding tool for your terminal, integrated as an AI agent.`,
      repoUrl: 'https://github.com/anthropics/claude-code',
      type: 'text',
      arguments: claudeCodeArguments,
      methods: ClaudeCode_RM,
      installationType: 'others',
    },
    {
      id: ANTIGRAVITY_CLI_ID,
      title: 'Antigravity CLI',
      description: 'Google terminal AI agent bringing multi-step reasoning, multi-file editing, and tool calling.',
      repoUrl: 'https://github.com/google-antigravity/antigravity-cli',
      type: 'text',
      arguments: antigravityCliArguments,
      methods: AntigravityCli_RM,
      installationType: 'others',
    },
    {
      id: HERMES_AGENT_ID,
      title: 'Hermes Agent',
      description: 'Self-improving AI agent built by Nous Research with a built-in learning loop.',
      repoUrl: 'https://github.com/nousresearch/hermes-agent',
      type: 'text',
      supportCustomArguments: true,
      methods: HermesAgent_RM,
      arguments: hermesAgentArguments,
      installationType: 'others',
    },
    {
      id: N8N_ID,
      title: 'N8N',
      description: 'Fair-code workflow automation platform with native AI capabilities and 400+ integrations.',
      repoUrl: 'https://github.com/n8n-io/n8n',
      type: 'text',
      supportCustomArguments: true,
      methods: N8N_RM,
      installationType: 'others',
      arguments: n8nArguments,
    },
  ],
};

export default agentsPage;

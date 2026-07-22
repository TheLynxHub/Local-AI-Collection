/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const webSearch: DataSection = {
  category: 'Web Search',
  sections: [
    {
      section: 'General',
      items: [
        {
          name: 'ENABLE_WEB_SEARCH',
          description: 'Enable web search toggle.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_SEARCH_QUERY_GENERATION',
          description: 'Enables or disables search query generation.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'WEB_SEARCH_DOMAIN_FILTER_LIST',
          description:
            'Comma-separated list of domains to filter web search results. Domains prefixed with `!` are blocked; domains without prefix create an allowlist (only those domains permitted).',
          type: 'Input',
        },
        {
          name: 'WEB_SEARCH_CONCURRENT_REQUESTS',
          description:
            'Limits the number of concurrent search requests to the search engine provider. Set to `0` for unlimited concurrency (default). Set to `1` for sequential execution to prevent rate limiting errors (e.g., Brave Free Tier).',
          type: 'Input',
          defaultValue: 0,
        },
        {
          name: 'WEB_SEARCH_TRUST_ENV',
          description: 'Enables proxy set by `http_proxy` and `https_proxy` during web search content fetching.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WEB_SEARCH_RESULT_COUNT',
          description: 'Maximum number of search results to crawl.',
          type: 'Input',
          defaultValue: 3,
        },
        {
          name: 'WEB_LOADER_CONCURRENT_REQUESTS',
          description:
            'Specifies the number of concurrent requests used by the web loader to fetch content from web pages returned by search results. This directly impacts how many pages can be crawled simultaneously.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'WEB_FETCH_MAX_CONTENT_LENGTH',
          description: 'Maximum content length in bytes permitted when fetching web pages.',
          type: 'Input',
          defaultValue: 10485760,
        },
        {
          name: 'USER_AGENT',
          description: 'Custom User-Agent HTTP header sent when fetching web page content.',
          type: 'Input',
        },
        {
          name: 'AIOHTTP_CLIENT_TIMEOUT_TOOL_SERVER',
          description: 'Timeout in seconds for HTTP requests to external tool servers.',
          type: 'Input',
          defaultValue: 300,
        },
        {
          name: 'AIOHTTP_CLIENT_SSL_CERT_FILE',
          description: 'Path to custom CA certificate file for SSL verification during web requests.',
          type: 'Input',
        },
        {
          name: 'AIOHTTP_CLIENT_ALLOW_REDIRECTS',
          description: 'Allows HTTP redirects when fetching web page content.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'AIOHTTP_POOL_CONNECTIONS',
          description: 'Total connection pool capacity for async HTTP requests.',
          type: 'Input',
          defaultValue: 100,
        },
        {
          name: 'AIOHTTP_POOL_CONNECTIONS_PER_HOST',
          description: 'Connection pool limit per host for async HTTP requests.',
          type: 'Input',
          defaultValue: 100,
        },
        {
          name: 'AIOHTTP_POOL_DNS_TTL',
          description: 'DNS cache TTL in seconds for connection pool.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'WEB_SEARCH_ENGINE',
          description: 'Specifies the search engine to use.',
          type: 'DropDown',
          values: [
            'searxng',
            'google_pse',
            'brave',
            'kagi',
            'mojeek',
            'bocha',
            'serpstack',
            'serper',
            'serply',
            'searchapi',
            'serpapi',
            'duckduckgo',
            'tavily',
            'jina',
            'bing',
            'exa',
            'perplexity',
            'perplexity_search',
            'ollama_cloud',
            'azure_ai_search',
            'yacy',
            'sougou',
          ],
        },
        {
          name: 'BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL',
          description: 'Bypasses the web search embedding and retrieval process.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'BYPASS_WEB_SEARCH_WEB_LOADER',
          description:
            'Bypasses the web loader when performing web search. When enabled, only snippets from the search engine are used, and the full page content is not fetched.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'SEARXNG_LANGUAGE',
          description:
            'This variable is used in the request to searxng as the "search language" (arguement "language").',
          type: 'Input',
          defaultValue: 'all',
        },
        {
          name: 'DDGS_BACKEND',
          description: 'Specifies the backend to be used by the DDGS engine.',
          type: 'DropDown',
          values: [
            'auto',
            'bing',
            'brave',
            'duckduckgo',
            'google',
            'grokipedia',
            'mojeek',
            'wikipedia',
            'yahoo',
            'yandex',
          ],
          defaultValue: 'auto',
        },
        {
          name: 'SEARXNG_QUERY_URL',
          description:
            'The [SearXNG search API](https://docs.searxng.org/dev/search_api.html) URL supporting JSON output. `<query>` is replaced with the search query. Example: `http://searxng.local/search?q=<query>`',
          type: 'Input',
        },
        {
          name: 'GOOGLE_PSE_API_KEY',
          description: 'Sets the API key for the Google Programmable Search Engine (PSE) service.',
          type: 'Input',
        },
        {
          name: 'GOOGLE_PSE_ENGINE_ID',
          description: 'The engine ID for the Google Programmable Search Engine (PSE) service.',
          type: 'Input',
        },
        {
          name: 'BRAVE_SEARCH_API_KEY',
          description: 'Sets the API key for the Brave Search API.',
          type: 'Input',
        },
        {
          name: 'BRAVE_SEARCH_CONTEXT_TOKENS',
          description: 'Maximum context tokens requested from Brave Search API.',
          type: 'Input',
          defaultValue: 500,
        },
        {
          name: 'KAGI_SEARCH_API_KEY',
          description: 'Sets the API key for Kagi Search API.',
          type: 'Input',
        },
        {
          name: 'MOJEEK_SEARCH_API_KEY',
          description: 'Sets the API key for Mojeek Search API.',
          type: 'Input',
        },
        {
          name: 'SERPSTACK_API_KEY',
          description: 'Sets the API key for Serpstack search API.',
          type: 'Input',
        },
        {
          name: 'SERPSTACK_HTTPS',
          description:
            'Configures the use of HTTPS for Serpstack requests. Free tier requests are restricted to HTTP only.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'SERPER_API_KEY',
          description: 'Sets the API key for Serper search API.',
          type: 'Input',
        },
        {
          name: 'SERPLY_API_KEY',
          description: 'Sets the API key for Serply search API.',
          type: 'Input',
        },
        {
          name: 'SEARCHAPI_API_KEY',
          description: 'Sets the API key for SearchAPI.',
          type: 'Input',
        },
        {
          name: 'SEARCHAPI_ENGINE',
          description: 'Sets the SearchAPI engine.',
          type: 'Input',
        },
        {
          name: 'TAVILY_API_KEY',
          description: 'Sets the API key for Tavily search API.',
          type: 'Input',
        },
        {
          name: 'JINA_API_KEY',
          description: 'Sets the API key for Jina.',
          type: 'Input',
        },
        {
          name: 'JINA_API_BASE_URL',
          description:
            'Sets the Base URL for Jina Search API. Useful for specifying custom or regional endpoints (e.g., `https://eu-s-beta.jina.ai/`).',
          type: 'Input',
          defaultValue: 'https://s.jina.ai/',
        },
        {
          name: 'BING_SEARCH_V7_ENDPOINT',
          description: 'Sets the endpoint for Bing Search API.',
          type: 'Input',
        },
        {
          name: 'BING_SEARCH_V7_SUBSCRIPTION_KEY',
          description: 'Sets the subscription key for Bing Search API.',
          type: 'Input',
          defaultValue: 'https://api.bing.microsoft.com/v7.0/search',
        },
        {
          name: 'BOCHA_SEARCH_API_KEY',
          description: 'Sets the API key for Bocha Search API.',
          type: 'Input',
        },
        {
          name: 'EXA_API_KEY',
          description: 'Sets the API key for Exa search API.',
          type: 'Input',
        },
        {
          name: 'SERPAPI_API_KEY',
          description: 'Sets the API key for SerpAPI.',
          type: 'Input',
        },
        {
          name: 'SERPAPI_ENGINE',
          description: 'Specifies the search engine to use for SerpAPI.',
          type: 'Input',
        },
        {
          name: 'SOUGOU_API_SID',
          description: 'Sets the Sogou API SID.',
          type: 'Input',
        },
        {
          name: 'SOUGOU_API_SK',
          description: 'Sets the Sogou API SK.',
          type: 'Input',
        },
        {
          name: 'OLLAMA_CLOUD_WEB_SEARCH_API_KEY',
          description: 'Sets the Ollama Cloud Web Search API Key.',
          type: 'Input',
        },
        {
          name: 'AZURE_AI_SEARCH_API_KEY',
          description:
            'API key (query key or admin key) for authenticating with Azure AI Search service. Required for using Azure AI Search as a web search provider.',
          type: 'Input',
        },
        {
          name: 'AZURE_AI_SEARCH_ENDPOINT',
          description:
            'Azure Search service endpoint URL. Specifies which Azure Search service instance to connect to.',
          type: 'Input',
        },
        {
          name: 'AZURE_AI_SEARCH_INDEX_NAME',
          description:
            'Name of the search index to query within your Azure Search service. Different indexes can contain different types of searchable content.',
          type: 'Input',
        },
        {
          name: 'YACY_QUERY_URL',
          description:
            "Sets the query URL for YaCy search engine integration. Should point to a YaCy instance's search API endpoint.",
          type: 'Input',
        },
        {
          name: 'YACY_USERNAME',
          description: 'Specifies the username for authenticated access to YaCy search engine.',
          type: 'Input',
        },
        {
          name: 'YACY_PASSWORD',
          description: 'Specifies the password for authenticated access to YaCy search engine.',
          type: 'Input',
        },
        {
          name: 'EXTERNAL_WEB_SEARCH_URL',
          description:
            'Specifies the URL of an external web search service API endpoint for custom search integrations.',
          type: 'Input',
        },
        {
          name: 'EXTERNAL_WEB_SEARCH_API_KEY',
          description: 'Sets the API key for authenticating with the external web search service.',
          type: 'Input',
        },
        {
          name: 'EXTERNAL_WEB_LOADER_URL',
          description:
            'Specifies the URL of an external web content loader service for fetching and processing web pages.',
          type: 'Input',
        },
        {
          name: 'EXTERNAL_WEB_LOADER_API_KEY',
          description: 'Sets the API key for authenticating with the external web loader service.',
          type: 'Input',
        },
        {
          name: 'PERPLEXITY_API_KEY',
          description: 'Sets the API key for Perplexity API.',
          type: 'Input',
        },
        {
          name: 'PERPLEXITY_SEARCH_API_URL',
          description:
            "Configures the API endpoint for Perplexity Search. Allows using custom or self-hosted Perplexity-compatible API endpoints (such as LiteLLM's `/search` endpoint) instead of the hardcoded default for the official Perplexity API.",
          type: 'Input',
          defaultValue: 'https://api.perplexity.ai/search',
        },
        {
          name: 'PERPLEXITY_MODEL',
          description:
            'Specifies the Perplexity AI model to use for search queries when using `Perplexity` as the web search engine.',
          type: 'Input',
          defaultValue: 'sonar',
        },
        {
          name: 'PERPLEXITY_SEARCH_CONTEXT_USAGE',
          description:
            'Controls the amount of search context used by Perplexity AI. Options typically include `low`, `medium`, `high`.',
          type: 'Input',
          defaultValue: 'medium',
        },
        {
          name: 'TAVILY_EXTRACT_DEPTH',
          description: 'Specifies the extract depth for Tavily search results.',
          type: 'Input',
          defaultValue: 'basic',
        },
      ],
    },
    {
      section: 'Web Loader Configuration',
      items: [
        {
          name: 'WEB_LOADER_ENGINE',
          description: 'Specifies the loader to use for retrieving and processing web content.',
          type: 'DropDown',
          values: ['safe_web', 'playwright', 'firecrawl', 'tavily', 'external'],
        },
        {
          name: 'PLAYWRIGHT_WS_URL',
          description:
            'Specifies the WebSocket URI of a remote Playwright browser instance. When set, Open WebUI will use this remote browser instead of installing browser dependencies locally. This is particularly useful in containerized environments where you want to keep the Open WebUI container lightweight and separate browser concerns. Example: `ws://playwright:3000`',
          type: 'Input',
        },
        {
          name: 'FIRECRAWL_API_BASE_URL',
          description: 'Sets the base URL for Firecrawl API.',
          type: 'Input',
          defaultValue: 'https://api.firecrawl.dev',
        },
        {
          name: 'FIRECRAWL_API_KEY',
          description: 'Sets the API key for Firecrawl API.',
          type: 'Input',
        },
        {
          name: 'FIRECRAWL_TIMEOUT',
          description:
            'Specifies the timeout in milliseconds for Firecrawl requests. If not set, the default Firecrawl timeout is used.',
          type: 'Input',
        },
        {
          name: 'PLAYWRIGHT_TIMEOUT',
          description: 'Specifies the timeout for Playwright requests.',
          type: 'Input',
        },
        {
          name: 'WEB_LOADER_TIMEOUT',
          description:
            'Specifies the request timeout in seconds for the SafeWebBaseLoader when scraping web pages. Without this setting, web scraping operations can hang indefinitely on slow or unresponsive pages. Recommended values are 10–30 seconds depending on your network conditions.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'YouTube Loader',
      items: [
        {
          name: 'YOUTUBE_LOADER_PROXY_URL',
          description: 'Sets the proxy URL for YouTube loader.',
          type: 'Input',
        },
        {
          name: 'YOUTUBE_LOADER_LANGUAGE',
          description:
            'Comma-separated list of language codes to try when fetching YouTube video transcriptions, in priority order.',
          type: 'Input',
          defaultValue: 'en',
        },
      ],
    },
  ],
};

export default webSearch;

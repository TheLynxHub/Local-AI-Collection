/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const retrievalAGR: DataSection = {
  category: 'Retrieval Augmented Generation (RAG)',
  sections: [
    {
      section: 'General',
      items: [
        {
          name: 'BYPASS_RETRIEVAL_ACCESS_CONTROL',
          description: 'Bypasses access controls for RAG collections.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_RETRIEVAL_UNSCOPED_COLLECTIONS',
          description: 'Enables querying of unscoped collections in retrieval operations.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_KB_EXEC',
          description: 'Allows Python code execution when querying knowledge base collections.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'RAG_EMBEDDING_ENGINE',
          description: 'Selects an embedding engine to use for RAG.',
          type: 'DropDown',
          values: ['', 'ollama', 'openai', 'azure_openai'],
        },
        {
          name: 'RAG_EMBEDDING_MODEL',
          description: 'Sets a model for embeddings. Locally, a Sentence-Transformer model is used.',
          type: 'Input',
          defaultValue: 'sentence-transformers/all-MiniLM-L6-v2',
        },
        {
          name: 'RAG_EMBEDDING_CONCURRENT_REQUESTS',
          description: 'Maximum concurrent embedding requests sent to the provider.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'RAG_EMBEDDING_TIMEOUT',
          description: 'Timeout in seconds for embedding API requests.',
          type: 'Input',
          defaultValue: 60,
        },
        {
          name: 'RAG_RERANKING_ENGINE',
          description: 'Specifies the reranking engine to use for document scoring.',
          type: 'DropDown',
          values: ['', 'cohere', 'jina', 'bge', 'voyage', 'tei'],
          defaultValue: '',
        },
        {
          name: 'RAG_RERANKING_BATCH_SIZE',
          description: 'Batch size for document reranking requests.',
          type: 'Input',
          defaultValue: 16,
        },
        {
          name: 'RAG_TOKENIZER_MODEL',
          description: 'Tokenizer model used for text chunking in RAG.',
          type: 'Input',
          defaultValue: 'gpt-4o',
        },
        {
          name: 'PDF_LOADER_MODE',
          description: 'Extraction mode for PDF document processing.',
          type: 'DropDown',
          values: ['single', 'page'],
          defaultValue: 'single',
        },
        {
          name: 'RAG_FILE_CONTENT_SEARCH_MAX_CHARS',
          description: 'Maximum characters extracted when performing text content search over files.',
          type: 'Input',
          defaultValue: 5000,
        },
        {
          name: 'FILE_IMAGE_COMPRESSION_WIDTH',
          description: 'Target image width when compressing images for RAG extraction.',
          type: 'Input',
          defaultValue: 1024,
        },
        {
          name: 'FILE_IMAGE_COMPRESSION_HEIGHT',
          description: 'Target image height when compressing images for RAG extraction.',
          type: 'Input',
          defaultValue: 1024,
        },
        {
          name: 'ENABLE_RAG_HYBRID_SEARCH',
          description:
            'Enables the use of ensemble search with `BM25` + `ChromaDB`, with reranking using `sentence_transformers` models.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_RAG_HYBRID_SEARCH_ENRICHED_TEXTS',
          description:
            'Enables enriched text processing for hybrid search. When enabled, additional text preprocessing and enrichment techniques are applied to improve search quality and relevance in hybrid search mode.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'RAG_TOP_K',
          description: 'Sets the default number of results to consider for the embedding when using RAG.',
          type: 'Input',
          defaultValue: 3,
        },
        {
          name: 'RAG_TOP_K_RERANKER',
          description: 'Sets the default number of results to consider for the reranker when using RAG.',
          type: 'Input',
          defaultValue: 3,
        },
        {
          name: 'RAG_RELEVANCE_THRESHOLD',
          description: 'Sets the relevance threshold to consider for documents when used with reranking.',
          type: 'Input',
          defaultValue: 0.0,
        },
        {
          name: 'RAG_HYBRID_BM25_WEIGHT',
          description:
            'Sets the weight given to the keyword search (BM25) during hybrid search. 1 means only keyword serach, 0 means only vector search.',
          type: 'Input',
          defaultValue: 0.5,
        },
        {
          name: 'RAG_TEMPLATE',
          description: 'Template to use when injecting RAG documents into chat completion',
          type: 'Input',
        },
        {
          name: 'RAG_TEXT_SPLITTER',
          description: 'Sets the text splitter for RAG models.',
          type: 'DropDown',
          values: ['character', 'token'],
          defaultValue: 'character',
        },
        {
          name: 'TIKTOKEN_CACHE_DIR',
          description: 'Sets the directory for TikToken cache.',
          type: 'Input',
          defaultValue: '{CACHE_DIR}/tiktoken',
        },
        {
          name: 'TIKTOKEN_ENCODING_NAME',
          description: 'Sets the encoding name for TikToken.',
          type: 'Input',
          defaultValue: 'cl100k_base',
        },
        {
          name: 'CHUNK_SIZE',
          description: 'Sets the document chunk size for embeddings.',
          type: 'Input',
          defaultValue: 1000,
        },
        {
          name: 'CHUNK_OVERLAP',
          description: 'Specifies how much overlap there should be between chunks.',
          type: 'Input',
          defaultValue: 100,
        },
        {
          name: 'CHUNK_MIN_SIZE_TARGET',
          description:
            'Chunks smaller than this threshold will be intelligently merged with neighboring chunks when possible. This helps prevent tiny, low-quality fragments that can hurt retrieval performance and waste embedding resources. This feature only works when `ENABLE_MARKDOWN_HEADER_TEXT_SPLITTER` is enabled. Set to `0` to disable merging.',
          type: 'Input',
          defaultValue: 0,
        },
        {
          name: 'ENABLE_MARKDOWN_HEADER_TEXT_SPLITTER',
          description:
            'Enables markdown header text splitting as a preprocessing step before character or token splitting. When enabled, documents are first split by markdown headers (h1-h6), then the resulting chunks are further processed by the configured text splitter (`RAG_TEXT_SPLITTER`). This helps preserve document structure and context across chunks.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'PDF_EXTRACT_IMAGES',
          description: 'Extracts images from PDFs using OCR when loading documents.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'RAG_FILE_MAX_SIZE',
          description: 'Sets the maximum size of a file in megabytes that can be uploaded for document ingestion.',
          type: 'Input',
        },
        {
          name: 'RAG_FILE_MAX_COUNT',
          description: 'Sets the maximum number of files that can be uploaded at once for document ingestion.',
          type: 'Input',
        },
        {
          name: 'RAG_ALLOWED_FILE_EXTENSIONS',
          description: 'Specifies which file extensions are permitted for upload.',
          type: 'Input',
        },
        {
          name: 'RAG_RERANKING_MODEL',
          description: 'Sets a model for reranking results. Locally, a Sentence-Transformer model is used.',
          type: 'Input',
        },
        {
          name: 'SENTENCE_TRANSFORMERS_CROSS_ENCODER_SIGMOID_ACTIVATION_FUNCTION',
          description:
            'When enabled (default), applies sigmoid normalization to local CrossEncoder reranking scores to ensure they fall within the 0-1 range. This allows the relevance threshold setting to work correctly with models like MS MARCO that output raw logits.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'RAG_EXTERNAL_RERANKER_TIMEOUT',
          description:
            'Sets the timeout in seconds for external reranker API requests during RAG document retrieval. Leave empty to use default timeout behavior.',
          type: 'Input',
        },
        {
          name: 'RAG_EXTERNAL_RERANKER_URL',
          description: 'Sets the **full URL** for the external reranking API.',
          type: 'Input',
        },
        {
          name: 'RAG_EXTERNAL_RERANKER_API_KEY',
          description: 'Sets the API key for the external reranking API.',
          type: 'Input',
        },
        {
          name: 'RAG_OPENAI_API_BASE_URL',
          description: 'Sets the OpenAI base API URL to use for RAG embeddings.',
          type: 'Input',
          defaultValue: '${OPENAI_API_BASE_URL}',
        },
        {
          name: 'RAG_OPENAI_API_KEY',
          description: 'Sets the OpenAI API key to use for RAG embeddings.',
          type: 'Input',
          defaultValue: '${OPENAI_API_KEY}',
        },
        {
          name: 'RAG_EMBEDDING_OPENAI_BATCH_SIZE',
          description: 'Sets the batch size for OpenAI embeddings.',
          type: 'Input',
          defaultValue: 1,
        },
        {
          name: 'RAG_EMBEDDING_BATCH_SIZE',
          description:
            'Controls how many text chunks are embedded in a single API request when using external embedding providers (Ollama, OpenAI, or Azure OpenAI). Higher values (20-100+; max 16000 (not recommended)) may process documents faster by sending less, but larger API requests. Some external APIs do not support batching or sending more than 1 chunk per request. In such case you must leave this at `1`. Default is 1 (safest option if the API does not support batching / more than 1 chunk per request). This setting only applies to external embedding engines, not the default SentenceTransformers engine.',
          type: 'Input',
          defaultValue: 1,
        },
        {
          name: 'ENABLE_ASYNC_EMBEDDING',
          description:
            'Runs embedding tasks asynchronously (parallelized) for maximum performance. Only works for Ollama, OpenAI and Azure OpenAI, does not affect sentence transformer setups.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'RAG_EMBEDDING_CONTENT_PREFIX',
          description: 'Specifies the prefix for the RAG embedding content.',
          type: 'Input',
        },
        {
          name: 'RAG_EMBEDDING_PREFIX_FIELD_NAME',
          description: 'Specifies the field name for the RAG embedding prefix.',
          type: 'Input',
        },
        {
          name: 'RAG_EMBEDDING_QUERY_PREFIX',
          description: 'Specifies the prefix for the RAG embedding query.',
          type: 'Input',
        },
        {
          name: 'RAG_OLLAMA_API_KEY',
          description: 'Sets the API key for Ollama API used in RAG models.',
          type: 'Input',
        },
        {
          name: 'RAG_AZURE_OPENAI_BASE_URL',
          description:
            'Sets the base URL for Azure OpenAI Services when using Azure OpenAI for RAG embeddings. Should be in the format `https://{your-resource-name}.openai.azure.com`.',
          type: 'Input',
        },
        {
          name: 'RAG_AZURE_OPENAI_API_KEY',
          description: 'Sets the API key for Azure OpenAI Services when using Azure OpenAI for RAG embeddings.',
          type: 'Input',
        },
        {
          name: 'RAG_AZURE_OPENAI_API_VERSION',
          description:
            'Sets the API version for Azure OpenAI Services when using Azure OpenAI for RAG embeddings. Common values include `2023-05-15`, `2023-12-01-preview`, or `2024-02-01`.',
          type: 'Input',
        },
        {
          name: 'RAG_OLLAMA_BASE_URL',
          description: 'Sets the base URL for Ollama API used in RAG models.',
          type: 'Input',
        },
        {
          name: 'ENABLE_RETRIEVAL_QUERY_GENERATION',
          description: 'Enables or disables retrieval query generation.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_QUERIES_CACHE',
          description:
            'Enables request-scoped caching of LLM-generated search queries. When enabled, queries generated for web search are **cached** and automatically **reused** for file/knowledge base retrieval within the same request. This **eliminates duplicate LLM calls** when both web search and RAG are active, **reducing token usage and latency** while maintaining search quality. It is highly recommended to enable this especially in larger setups.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'QUERY_GENERATION_PROMPT_TEMPLATE',
          description: 'Sets the prompt template for query generation.',
          type: 'Input',
        },
        {
          name: 'BYPASS_EMBEDDING_AND_RETRIEVAL',
          description: 'Bypasses the embedding and retrieval process.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'RAG_FULL_CONTEXT',
          description: 'Specifies whether to use the full context for RAG.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'RAG_SYSTEM_CONTEXT',
          description:
            'When enabled, injects RAG context into the **system message** instead of the user message. This is highly recommended for optimizing performance when using models that support **KV prefix caching** or **Prompt Caching**. This includes local engines (like Ollama, llama.cpp, or vLLM) and cloud providers / Model-as-a-Service providers (like OpenAI and Vertex AI). By placing the context in the system message, it remains at a stable position at the start of the conversation, allowing the cache to persist across multiple turns. When disabled (default), context is injected into the user message, which shifts position each turn and invalidates the cache.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_RAG_LOCAL_WEB_FETCH',
          description:
            'Controls whether RAG web fetch operations can access URLs that resolve to private/local network IP addresses.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WEB_FETCH_FILTER_LIST',
          description:
            'Configures additional URL filtering rules for web fetch operations to prevent Server-Side Request Forgery (SSRF) attacks. The system includes a default blocklist that protects against access to cloud metadata endpoints (AWS, Google Cloud, Azure, Alibaba Cloud). Entries without a ! prefix are treated as an allow list (only these domains are permitted), while entries with a ! prefix are added to the block list (these domains are always denied). The default blocklist includes !169.254.169.254, !fd00:ec2::254, !metadata.google.internal, !metadata.azure.com, and !100.100.100.200. Custom entries are merged with the default blocklist.',
          type: 'Input',
        },
        {
          name: 'DOCUMENT_INTELLIGENCE_ENDPOINT',
          description: 'Specifies the endpoint for document intelligence.',
          type: 'Input',
        },
        {
          name: 'DOCUMENT_INTELLIGENCE_KEY',
          description: 'Specifies the key for document intelligence.',
          type: 'Input',
        },
        {
          name: 'DOCUMENT_INTELLIGENCE_MODEL',
          description: 'Specifies the model for document intelligence.',
          type: 'Input',
        },
        {
          name: 'MISTRAL_OCR_USE_BASE64',
          description: 'Send local files as Base64 strings to Mistral OCR API.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'EXTERNAL_DOCUMENT_LOADER_HEADERS',
          description: 'Headers to send to external document loader service as a JSON object.',
          type: 'Input',
          defaultValue: '{}',
        },
        {
          name: 'MINERU_FILE_EXTENSIONS',
          description: 'Comma-separated file extensions handled by MinerU document parser.',
          type: 'Input',
          defaultValue: '.pdf,.doc,.docx,.ppt,.pptx,.epub',
        },
        {
          name: 'MINERU_MAX_MARKDOWN_BYTES',
          description: 'Maximum size in bytes of markdown content returned by MinerU.',
          type: 'Input',
          defaultValue: 10485760,
        },
        {
          name: 'MINERU_PARAMS',
          description: 'Optional JSON parameters forwarded to MinerU API.',
          type: 'Input',
          defaultValue: '{}',
        },
        {
          name: 'PADDLEOCR_VL_BASE_URL',
          description: 'Base URL for PaddleOCR-VL document parser service.',
          type: 'Input',
        },
        {
          name: 'PADDLEOCR_VL_TOKEN',
          description: 'API key or bearer token for PaddleOCR-VL service.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Google Drive',
      items: [
        {
          name: 'ENABLE_GOOGLE_DRIVE_INTEGRATION',
          description:
            'Enables or disables Google Drive integration. If set to true, and `GOOGLE_DRIVE_CLIENT_ID` & `GOOGLE_DRIVE_API_KEY` are both configured, Google Drive will appear as an upload option in the chat UI.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'GOOGLE_DRIVE_CLIENT_ID',
          description:
            'Sets the client ID for Google Drive (client must be configured with Drive API and Picker API enabled).',
          type: 'Input',
        },
        {
          name: 'GOOGLE_DRIVE_API_KEY',
          description: 'Sets the API key for Google Drive integration.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'OneDrive',
      items: [
        {
          name: 'ENABLE_ONEDRIVE_INTEGRATION',
          description: 'Enables or disables the Microsoft OneDrive integration feature globally.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ENABLE_ONEDRIVE_PERSONAL',
          description:
            'Controls whether the "Personal OneDrive" option appears in the attachment menu. Requires `ONEDRIVE_PERSONAL_CLIENT_ID` to be configured.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ENABLE_ONEDRIVE_BUSINESS',
          description:
            'Controls whether the "Work/School OneDrive" option appears in the attachment menu. Requires `ONEDRIVE_CLIENT_ID` to be configured.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'ONEDRIVE_CLIENT_ID',
          description:
            'Generic environment variable for the OneDrive Client ID. You should rather use the specific `ONEDRIVE_CLIENT_ID_PERSONAL` or `ONEDRIVE_CLIENT_ID_BUSINESS` variables. This exists as a legacy option for backwards compatibility.',
          type: 'Input',
        },
        {
          name: 'ONEDRIVE_CLIENT_ID_PERSONAL',
          description:
            'Specifies the Application (client) ID for the **Personal OneDrive** integration. This requires a separate Azure App Registration configured to support personal Microsoft accounts. **Do not put the business OneDrive client ID here!**',
          type: 'Input',
        },
        {
          name: 'ONEDRIVE_CLIENT_ID_BUSINESS',
          description:
            'Specifies the Application (client) ID for the **Work/School (Business) OneDrive** integration. This requires a separate Azure App Registration configured to support personal Microsoft accounts. **Do not put the personal OneDrive client ID here!**',
          type: 'Input',
        },
        {
          name: 'ONEDRIVE_SHAREPOINT_URL',
          description:
            'Specifies the root SharePoint site URL for the work/school integration, e.g., `https://companyname.sharepoint.com`.',
          type: 'Input',
        },
        {
          name: 'ONEDRIVE_SHAREPOINT_TENANT_ID',
          description:
            'Specifies the Directory (tenant) ID for the work/school integration. This is obtained from your business-focused Azure App Registration.',
          type: 'Input',
        },
      ],
    },
  ],
};

export default retrievalAGR;

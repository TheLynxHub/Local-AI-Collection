/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const ragCEE: DataItem = {
  category: 'RAG Content Extraction Engine',
  items: [
    {
      name: 'CONTENT_EXTRACTION_ENGINE',
      description: 'Sets the content extraction engine to use for document ingestion.',
      type: 'DropDown',
      values: ['', 'external', 'tika', 'docling', 'document_intelligence', 'mistral_ocr', 'mineru', 'paddleocr_vl'],
    },
    {
      name: 'ENABLE_PYODIDE_FILE_PERSISTENCE',
      description: 'Persists files created inside the Pyodide code execution sandbox.',
      type: 'CheckBox',
      defaultValue: true,
    },
    {
      name: 'TERMINAL_SERVER_CONNECTIONS',
      description: 'JSON object specifying Open Terminal server connections.',
      type: 'Input',
    },
    {
      name: 'TERMINAL_PROXY_HEADERS',
      description: 'Forwards authentication headers to Open Terminal instances.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'MISTRAL_OCR_API_KEY',
      description: 'Specifies the Mistral OCR API key to use.',
      type: 'Input',
    },
    {
      name: 'MISTRAL_OCR_API_BASE_URL',
      description:
        'Configures custom Mistral OCR API endpoints for flexible deployment options, allowing users to point to self-hosted or alternative Mistral OCR instances.',
      type: 'Input',
      defaultValue: 'https://api.mistral.ai/v1',
    },
    {
      name: 'EXTERNAL_DOCUMENT_LOADER_URL',
      description: 'Sets the URL for the external document loader service.',
      type: 'Input',
    },
    {
      name: 'EXTERNAL_DOCUMENT_LOADER_API_KEY',
      description: 'Sets the API key for authenticating with the external document loader service.',
      type: 'Input',
    },
    {
      name: 'TIKA_SERVER_URL',
      description: 'Sets the URL for the Apache Tika server.',
      type: 'Input',
      defaultValue: 'http://localhost:9998',
    },
    {
      name: 'DOCLING_SERVER_URL',
      description:
        'Specifies the URL for the Docling server. Requires Docling version 2.0.0 or later for full compatibility with the new parameter-based configuration system.',
      type: 'Input',
      defaultValue: 'http://docling:5001',
    },
    {
      name: 'DOCLING_API_KEY',
      description:
        'Sets the API key for authenticating with the Docling server. Required when the Docling server has authentication enabled.',
      type: 'Input',
    },
    {
      name: 'DOCLING_PARAMS',
      description:
        'Specifies all Docling processing parameters in JSON format. This is the primary configuration method for Docling processing options. All previously individual Docling settings are now configured through this single JSON object.',
      type: 'Input',
    },
    {
      name: 'MINERU_API_TIMEOUT',
      description: 'Sets the timeout in seconds for MinerU API requests during document processing.',
      type: 'Input',
      defaultValue: 300,
    },
  ],
};

export default ragCEE;

/* eslint max-len: 0 */

import {DataSection} from '../../../../../../src/common/types/plugins/modules';

const vectorDatabase: DataSection = {
  category: 'Vector Database',
  sections: [
    {
      section: 'General',
      items: [
        {
          name: 'VECTOR_DB',
          description:
            'Specifies which vector database system to use. This setting determines which vector storage system will be used for managing embeddings.',
          type: 'DropDown',
          values: [
            'chroma',
            'elasticsearch',
            'milvus',
            'opensearch',
            'pgvector',
            'qdrant',
            'pinecone',
            's3vector',
            'weaviate',
            'oracle23ai',
            'mariadb',
            'valkey',
          ],
          defaultValue: 'chroma',
        },
      ],
    },
    {
      section: 'ChromaDB',
      items: [
        {
          name: 'CHROMA_TENANT',
          description: 'Sets the tenant for ChromaDB to use for RAG embeddings.',
          type: 'Input',
        },
        {
          name: 'CHROMA_DATABASE',
          description: 'Sets the database in the ChromaDB tenant to use for RAG embeddings.',
          type: 'Input',
        },
        {
          name: 'CHROMA_HTTP_HOST',
          description: 'Specifies the hostname of a remote ChromaDB Server. Uses a local ChromaDB instance if not set.',
          type: 'Input',
        },
        {
          name: 'CHROMA_HTTP_PORT',
          description: 'Specifies the port of a remote ChromaDB Server.',
          type: 'Input',
          defaultValue: 8000,
        },
        {
          name: 'CHROMA_HTTP_HEADERS',
          description: 'A comma-separated list of HTTP headers to include with every ChromaDB request.',
          type: 'Input',
        },
        {
          name: 'CHROMA_HTTP_SSL',
          description: 'Controls whether or not SSL is used for ChromaDB Server connections.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'CHROMA_CLIENT_AUTH_PROVIDER',
          description: 'Specifies an authentication provider for remote ChromaDB Server.',
          type: 'Input',
        },
        {
          name: 'CHROMA_CLIENT_AUTH_CREDENTIALS',
          description: 'Specifies auth credentials for remote ChromaDB Server.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Elasticsearch',
      items: [
        {
          name: 'ELASTICSEARCH_API_KEY',
          description: 'Specifies the Elasticsearch API key.',
          type: 'Input',
        },
        {
          name: 'ELASTICSEARCH_CA_CERTS',
          description: 'Specifies the path to the CA certificates for Elasticsearch.',
          type: 'Input',
        },
        {
          name: 'ELASTICSEARCH_CLOUD_ID',
          description: 'Specifies the Elasticsearch cloud ID.',
          type: 'Input',
        },
        {
          name: 'ELASTICSEARCH_INDEX_PREFIX',
          description: 'Specifies the prefix for the Elasticsearch index.',
          type: 'Input',
          defaultValue: 'open_webui_collections',
        },
        {
          name: 'ELASTICSEARCH_PASSWORD',
          description: 'Specifies the password for Elasticsearch.',
          type: 'Input',
        },
        {
          name: 'ELASTICSEARCH_URL',
          description: 'Specifies the URL for the Elasticsearch instance.',
          type: 'Input',
          defaultValue: 'https://localhost:9200',
        },
        {
          name: 'ELASTICSEARCH_USERNAME',
          description: 'Specifies the username for Elasticsearch.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'Milvus',
      items: [
        {
          name: 'MILVUS_URI',
          description:
            'Specifies the URI for connecting to the Milvus vector database. This can point to a local or remote Milvus server based on the deployment configuration.',
          type: 'Input',
          defaultValue: '${DATA_DIR}/vector_db/milvus.db',
        },
        {
          name: 'MILVUS_DB',
          description: 'Specifies the database to connect to within a Milvus instance.',
          type: 'Input',
          defaultValue: 'default',
        },
        {
          name: 'MILVUS_TOKEN',
          description: 'Specifies an optional connection token for Milvus.',
          type: 'Input',
        },
        {
          name: 'MILVUS_INDEX_TYPE',
          description:
            'Specifies the index type to use when creating a new collection in Milvus. `AUTOINDEX` is generally recommended for Milvus standalone. `HNSW` may offer better performance but typically requires a clustered Milvus setup.',
          type: 'DropDown',
          values: ['AUTOINDEX', 'FLAT', 'IVF_FLAT', 'HNSW'],
          defaultValue: 'HNSW',
        },
        {
          name: 'MILVUS_METRIC_TYPE',
          description: 'Specifies the metric type for vector similarity search in Milvus.',
          type: 'DropDown',
          values: ['COSINE', 'IP', 'L2'],
          defaultValue: 'COSINE',
        },
        {
          name: 'MILVUS_HNSW_M',
          description:
            'Specifies the `M` parameter for the HNSW index type in Milvus. This influences the number of bi-directional links created for each new element during construction. Only applicable if `MILVUS_INDEX_TYPE` is `HNSW`.',
          type: 'Input',
          defaultValue: 16,
        },
        {
          name: 'MILVUS_HNSW_EFCONSTRUCTION',
          description:
            'Specifies the `efConstruction` parameter for the HNSW index type in Milvus. This influences the size of the dynamic list for the nearest neighbors during index construction. Only applicable if `MILVUS_INDEX_TYPE` is `HNSW`.',
          type: 'Input',
          defaultValue: 100,
        },
        {
          name: 'MILVUS_IVF_FLAT_NLIST',
          description:
            'Specifies the `nlist` parameter for the IVF_FLAT index type in Milvus. This is the number of cluster units. Only applicable if `MILVUS_INDEX_TYPE` is `IVF_FLAT`.',
          type: 'Input',
          defaultValue: 128,
        },
        {
          name: 'MILVUS_DISKANN_MAX_DEGREE',
          description:
            'Sets the max degree for Milvus if Milvus is in DISKANN indexing mode. Generally recommended to leave as is.',
          type: 'Input',
          defaultValue: 56,
        },
        {
          name: 'MILVUS_DISKANN_SEARCH_LIST_SIZE',
          description: 'Sets the Milvus DISKANN search list size. Generally recommended to leave as is.',
          type: 'Input',
          defaultValue: 100,
        },
        {
          name: 'ENABLE_MILVUS_MULTITENANCY_MODE',
          description:
            'Enables multitenancy pattern for Milvus collections management, which significantly reduces RAM usage and computational overhead by consolidating similar vector data structures. Controls whether Milvus uses multitenancy collection architecture. When enabled, all vector data is consolidated into 5 shared collections (memories, knowledge, files, web_search, hash_based) instead of creating individual collections per resource. Data isolation is achieved via a resource_id field rather than collection-level separation.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'MILVUS_COLLECTION_PREFIX',
          description:
            'Sets the prefix for Milvus collection names. In multitenancy mode, collections become `{prefix}_memories`, `{prefix}_knowledge`, etc. In legacy mode, collections are `{prefix}_{collection_name}`. Changing this value creates an entirely separate namespace—existing collections with the old prefix become invisible to Open WebUI but remain in Milvus consuming resources. Use this for true multi-instance isolation on a shared Milvus server, not for migration between modes. Milvus only accepts underscores, hyphens/dashes are not possible and will cause errors.',
          type: 'Input',
          defaultValue: 'open_webui',
        },
      ],
    },
    {
      section: 'OpenSearch',
      items: [
        {
          name: 'OPENSEARCH_CERT_VERIFY',
          description: 'Enables or disables OpenSearch certificate verification.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'OPENSEARCH_PASSWORD',
          description: 'Sets the password for OpenSearch.',
          type: 'Input',
        },
        {
          name: 'OPENSEARCH_SSL',
          description: 'Enables or disables SSL for OpenSearch.',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'OPENSEARCH_URI',
          description: 'Sets the URI for OpenSearch.',
          type: 'Input',
          defaultValue: 'https://localhost:9200',
        },
        {
          name: 'OPENSEARCH_USERNAME',
          description: 'Sets the username for OpenSearch.',
          type: 'Input',
        },
      ],
    },
    {
      section: 'PGVector',
      items: [
        {
          name: 'PGVECTOR_DB_URL',
          description: 'Sets the database URL for model storage.',
          type: 'Input',
        },
        {
          name: 'PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH',
          description: 'Specifies the maximum vector length for PGVector initialization.',
          type: 'Input',
          defaultValue: '1536',
        },
        {
          name: 'PGVECTOR_CREATE_EXTENSION',
          description: 'Creates the vector extension in the database',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'PGVECTOR_INDEX_METHOD',
          description:
            'Specifies the index method for pgvector. The choice affects query performance and index build time.',
          type: 'DropDown',
          values: ['ivfflat', 'hnsw'],
        },
        {
          name: 'PGVECTOR_HNSW_M',
          description:
            'HNSW index parameter that controls the maximum number of bi-directional connections per layer during index construction. Higher values improve recall but increase index size and build time. Only applicable when `PGVECTOR_INDEX_METHOD` is set to `hnsw`.',
          type: 'Input',
          defaultValue: 16,
        },
        {
          name: 'PGVECTOR_HNSW_EF_CONSTRUCTION',
          description:
            'HNSW index parameter that controls the size of the dynamic candidate list during index construction. Higher values improve index quality but increase build time. Only applicable when `PGVECTOR_INDEX_METHOD` is set to `hnsw`.',
          type: 'Input',
          defaultValue: 64,
        },
        {
          name: 'PGVECTOR_IVFFLAT_LISTS',
          description:
            'IVFFlat index parameter that specifies the number of inverted lists (clusters) to create. A good starting point is `rows / 1000` for up to 1M rows and `sqrt(rows)` for over 1M rows. Only applicable when `PGVECTOR_INDEX_METHOD` is set to `ivfflat`.',
          type: 'Input',
          defaultValue: 100,
        },
        {
          name: 'PGVECTOR_USE_HALFVEC',
          description:
            'Enables the use of `halfvec` data type instead of `vector` for storing embeddings. Required when `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH` exceeds 2000 dimensions, as the `vector` type has a 2000-dimension limit.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'PGVECTOR_PGCRYPTO',
          description:
            'Enables pgcrypto extension for encrypting sensitive data within PGVector. When enabled, `PGVECTOR_PGCRYPTO_KEY` must be set.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'PGVECTOR_PGCRYPTO_KEY',
          description:
            'Specifies the encryption key for pgcrypto when `PGVECTOR_PGCRYPTO` is enabled. Must be a secure, randomly generated key.',
          type: 'Input',
        },
        {
          name: 'PGVECTOR_POOL_SIZE',
          description:
            'Sets the number of connections to maintain in the PGVector database connection pool. If not set, uses SQLAlchemy defaults.',
          type: 'Input',
        },
        {
          name: 'PGVECTOR_POOL_MAX_OVERFLOW',
          description:
            'Specifies the maximum number of connections that can be created beyond `PGVECTOR_POOL_SIZE` when the pool is exhausted.',
          type: 'Input',
          defaultValue: 0,
        },
        {
          name: 'PGVECTOR_POOL_TIMEOUT',
          description: 'Sets the timeout in seconds for acquiring a connection from the PGVector pool.',
          type: 'Input',
          defaultValue: 30,
        },
        {
          name: 'PGVECTOR_POOL_RECYCLE',
          description:
            'Specifies the time in seconds after which connections are recycled in the PGVector pool to prevent stale connections.',
          type: 'Input',
          defaultValue: 3600,
        },
      ],
    },
    {
      section: 'Qdrant',
      items: [
        {
          name: 'QDRANT_API_KEY',
          description: 'Sets the API key for Qdrant.',
          type: 'Input',
        },
        {
          name: 'QDRANT_URI',
          description: 'Sets the URI for Qdrant.',
          type: 'Input',
        },
        {
          name: 'QDRANT_ON_DISK',
          description: 'Enable the usage of memmap(also known as on-disk) storage',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'QDRANT_PREFER_GRPC',
          description: 'Use gPRC interface whenever possible.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'QDRANT_GRPC_PORT',
          description: 'Sets the gRPC port number for Qdrant.',
          type: 'Input',
          defaultValue: 6334,
        },
        {
          name: 'QDRANT_TIMEOUT',
          description:
            'Sets the timeout in seconds for all requests made to the Qdrant server, helping to prevent long-running queries from stalling the application.',
          type: 'Input',
          defaultValue: 5,
        },
        {
          name: 'QDRANT_HNSW_M',
          description:
            'Controls the HNSW (Hierarchical Navigable Small World) index construction. In standard mode, this sets the `m` parameter. In multi-tenancy mode, this value is used for the `payload_m` parameter to build indexes on the payload, as the global `m` is disabled for performance, following Qdrant best practices.',
          type: 'Input',
          defaultValue: 16,
        },
        {
          name: 'ENABLE_QDRANT_MULTITENANCY_MODE',
          description:
            'Enables multitenancy pattern for Qdrant collections management, which significantly reduces RAM usage and computational overhead by consolidating similar vector data structures. Recommend turn on',
          type: 'CheckBox',
          defaultValue: true,
        },
        {
          name: 'QDRANT_COLLECTION_PREFIX',
          description:
            'Sets the prefix for Qdrant collection names. Useful for namespacing or isolating collections, especially in multitenancy mode. Changing this value will cause the application to use a different set of collections in Qdrant. Existing collections with a different prefix will not be affected.',
          type: 'Input',
          defaultValue: 'open-webui',
        },
      ],
    },
    {
      section: 'Pinecone',
      items: [
        {
          name: 'PINECONE_API_KEY',
          description: 'Sets the API key used to authenticate with the Pinecone service.',
          type: 'Input',
        },
        {
          name: 'PINECONE_ENVIRONMENT',
          description: 'Specifies the Pinecone environment to connect to (e.g., `us-west1-gcp`, `gcp-starter`, etc.).',
          type: 'Input',
        },
        {
          name: 'PINECONE_INDEX_NAME',
          description: 'Defines the name of the Pinecone index that will be used to store and query vector embeddings.',
          type: 'Input',
          defaultValue: 'open-webui-index',
        },
        {
          name: 'PINECONE_DIMENSION',
          description:
            'The dimensionality of the vector embeddings. Must match the dimension expected by the index (commonly 768, 1024, 1536, or 3072 based on model used).',
          type: 'Input',
          defaultValue: 1536,
        },
        {
          name: 'PINECONE_METRIC',
          description: 'Specifies the similarity metric to use for vector comparisons within the Pinecone index.',
          type: 'DropDown',
          values: ['cosine', 'dotproduct', 'euclidean'],
          defaultValue: 'cosine',
        },
        {
          name: 'PINECONE_CLOUD',
          description: 'Specifies the cloud provider where the Pinecone index is hosted.',
          type: 'DropDown',
          values: ['aws', 'gcp', 'azure'],
          defaultValue: 'aws',
        },
      ],
    },
    {
      section: 'Weaviate',
      items: [
        {
          name: 'WEAVIATE_HTTP_HOST',
          description: 'Specifies the hostname of the Weaviate server for HTTP connections.',
          type: 'Input',
        },
        {
          name: 'WEAVIATE_HTTP_PORT',
          description: 'Specifies the HTTP port for connecting to the Weaviate server.',
          type: 'Input',
          defaultValue: 8080,
        },
        {
          name: 'WEAVIATE_GRPC_PORT',
          description: 'Specifies the gRPC port for connecting to the Weaviate server.',
          type: 'Input',
          defaultValue: 50051,
        },
        {
          name: 'WEAVIATE_API_KEY',
          description: 'Sets the API key for authenticating with Weaviate server.',
          type: 'Input',
        },
        {
          name: 'WEAVIATE_GRPC_HOST',
          description: 'Specifies the gRPC host for connecting to the Weaviate server.',
          type: 'Input',
        },
        {
          name: 'WEAVIATE_HTTP_SECURE',
          description: 'Enables HTTPS for Weaviate HTTP connections.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WEAVIATE_GRPC_SECURE',
          description: 'Enables SSL/TLS for Weaviate gRPC connections.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'WEAVIATE_SKIP_INIT_CHECKS',
          description: 'Skips initial readiness and schema verification checks for Weaviate.',
          type: 'CheckBox',
          defaultValue: false,
        },
      ],
    },
    {
      section: 'MariaDB Vector',
      items: [
        {
          name: 'MARIADB_VECTOR_DB_URL',
          description: 'MariaDB connection string for vector storage.',
          type: 'Input',
        },
        {
          name: 'MARIADB_VECTOR_INITIALIZE_MAX_VECTOR_LENGTH',
          description: 'Maximum vector length for MariaDB Vector index initialization.',
          type: 'Input',
          defaultValue: 1536,
        },
        {
          name: 'MARIADB_VECTOR_DISTANCE_STRATEGY',
          description: 'Distance strategy metric for MariaDB Vector search.',
          type: 'DropDown',
          values: ['COSINE', 'EUCLIDEAN', 'DOT_PRODUCT'],
          defaultValue: 'COSINE',
        },
        {
          name: 'MARIADB_VECTOR_INDEX_M',
          description: 'M parameter for HNSW index construction in MariaDB Vector.',
          type: 'Input',
          defaultValue: 16,
        },
        {
          name: 'MARIADB_VECTOR_POOL_SIZE',
          description: 'Connection pool size for MariaDB Vector database connections.',
          type: 'Input',
          defaultValue: 5,
        },
        {
          name: 'MARIADB_VECTOR_POOL_MAX_OVERFLOW',
          description: 'Maximum pool overflow connections allowed for MariaDB Vector.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'MARIADB_VECTOR_POOL_TIMEOUT',
          description: 'Timeout in seconds for obtaining a connection from MariaDB Vector pool.',
          type: 'Input',
          defaultValue: 30,
        },
        {
          name: 'MARIADB_VECTOR_POOL_RECYCLE',
          description: 'Connection recycle time in seconds for MariaDB Vector pool.',
          type: 'Input',
          defaultValue: 3600,
        },
      ],
    },
    {
      section: 'Valkey Vector',
      items: [
        {
          name: 'VALKEY_URL',
          description: 'Valkey database connection URL for vector search.',
          type: 'Input',
        },
        {
          name: 'VALKEY_COLLECTION_PREFIX',
          description: 'Collection prefix for Valkey vector keys.',
          type: 'Input',
          defaultValue: 'open_webui:',
        },
        {
          name: 'VALKEY_INDEX_TYPE',
          description: 'Index structure type for Valkey vector storage.',
          type: 'DropDown',
          values: ['HNSW', 'FLAT'],
          defaultValue: 'HNSW',
        },
        {
          name: 'VALKEY_DISTANCE_METRIC',
          description: 'Distance metric for Valkey vector similarity.',
          type: 'DropDown',
          values: ['COSINE', 'IP', 'L2'],
          defaultValue: 'COSINE',
        },
        {
          name: 'VALKEY_HNSW_M',
          description: 'Number of max outgoing links per node in Valkey HNSW graph.',
          type: 'Input',
          defaultValue: 16,
        },
        {
          name: 'VALKEY_HNSW_EF_CONSTRUCTION',
          description: 'Size of dynamic candidate list during Valkey index construction.',
          type: 'Input',
          defaultValue: 200,
        },
        {
          name: 'VALKEY_HNSW_EF_RUNTIME',
          description: 'Size of dynamic candidate list during Valkey query execution.',
          type: 'Input',
          defaultValue: 10,
        },
      ],
    },
    {
      section: 'Oracle 23ai Vector Search (oracle23ai)',
      items: [
        {
          name: 'ORACLE_DB_USE_WALLET',
          description: 'Determines the connection method to the Oracle Database.',
          type: 'CheckBox',
          defaultValue: false,
        },
        {
          name: 'ORACLE_DB_USER',
          description: 'Specifies the username used to connect to the Oracle Database.',
          type: 'Input',
          defaultValue: 'DEMOUSER',
        },
        {
          name: 'ORACLE_DB_PASSWORD',
          description: 'Specifies the password for the `ORACLE_DB_USER`.',
          type: 'Input',
          defaultValue: 'Welcome123456',
        },
        {
          name: 'ORACLE_DB_DSN',
          description: 'Defines the Data Source Name for the Oracle Database connection.',
          type: 'Input',
          defaultValue: 'localhost:1521/FREEPDB1',
        },
        {
          name: 'ORACLE_WALLET_DIR',
          description:
            'Required when `ORACLE_DB_USE_WALLET` is `true`. Specifies the absolute path to the directory containing the Oracle Cloud Wallet files.',
          type: 'Input',
        },
        {
          name: 'ORACLE_WALLET_PASSWORD',
          description:
            'Required when `ORACLE_DB_USE_WALLET` is `true`. Specifies the password for the Oracle Cloud Wallet.',
          type: 'Input',
        },
        {
          name: 'ORACLE_VECTOR_LENGTH',
          description:
            'Sets the expected dimension or length of the vector embeddings stored in the Oracle Database. This must match the embedding model used.',
          type: 'Input',
          defaultValue: 768,
        },
        {
          name: 'ORACLE_DB_POOL_MIN',
          description: 'The minimum number of connections to maintain in the Oracle Database connection pool.',
          type: 'Input',
          defaultValue: 2,
        },
        {
          name: 'ORACLE_DB_POOL_MAX',
          description: 'The maximum number of connections allowed in the Oracle Database connection pool.',
          type: 'Input',
          defaultValue: 10,
        },
        {
          name: 'ORACLE_DB_POOL_INCREMENT',
          description: 'The number of connections to create when the pool needs to grow.',
          type: 'Input',
          defaultValue: 1,
        },
      ],
    },
    {
      section: 'S3 Vector Bucket',
      items: [
        {
          name: 'S3_VECTOR_BUCKET_NAME',
          description: 'Specifies the name of the S3 Vector Bucket to store vectors in.',
          type: 'Input',
        },
        {
          name: 'S3_VECTOR_REGION',
          description: 'Specifies the AWS region where the S3 Vector Bucket is hosted.',
          type: 'Input',
        },
      ],
    },
  ],
};

export default vectorDatabase;

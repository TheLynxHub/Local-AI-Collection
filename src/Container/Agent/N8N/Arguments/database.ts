/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const database: DataItem = {
  category: 'Database',
  items: [
    {
      name: 'DB_TYPE',
      type: 'DropDown',
      defaultValue: 'sqlite',
      values: ['sqlite', 'postgresdb'],
      description: 'The database to use.',
    },
    {name: 'DB_TABLE_PREFIX', type: 'Input', description: 'Prefix to use for table names.'},
    {
      name: 'DB_PING_INTERVAL_SECONDS',
      type: 'Input',
      defaultValue: 2,
      description: 'The interval, in seconds, between pings to the database to check if the connection is still alive.',
    },
    {
      name: 'DB_POSTGRESDB_DATABASE',
      type: 'Input',
      defaultValue: 'n8n',
      description: 'The name of the PostgreSQL database.',
    },
    {name: 'DB_POSTGRESDB_HOST', type: 'Input', defaultValue: 'localhost', description: 'The PostgreSQL host.'},
    {name: 'DB_POSTGRESDB_PORT', type: 'Input', defaultValue: 5432, description: 'The PostgreSQL port.'},
    {name: 'DB_POSTGRESDB_USER', type: 'Input', defaultValue: 'postgres', description: 'The PostgreSQL user.'},
    {name: 'DB_POSTGRESDB_PASSWORD', type: 'Input', description: 'The PostgreSQL password.'},
    {
      name: 'DB_POSTGRESDB_POOL_SIZE',
      type: 'Input',
      defaultValue: 2,
      description:
        'Control how many parallel open Postgres connections n8n should have. Increasing it may help with resource utilization, but too many connections may degrade performance.',
    },
    {
      name: 'DB_POSTGRESDB_CONNECTION_TIMEOUT',
      type: 'Input',
      defaultValue: 20000,
      description: 'Postgres connection timeout (ms).',
    },
    {
      name: 'DB_POSTGRESDB_IDLE_CONNECTION_TIMEOUT',
      type: 'Input',
      defaultValue: 30000,
      description: 'Amount of time before an idle connection is eligible for eviction for being idle.',
    },
    {name: 'DB_POSTGRESDB_SCHEMA', type: 'Input', defaultValue: 'public', description: 'The PostgreSQL schema.'},
    {
      name: 'DB_POSTGRESDB_SSL_ENABLED',
      type: 'CheckBox',
      description:
        'Whether to enable SSL. Automatically enabled if DB_POSTGRESDB_SSL_CA, DB_POSTGRESDB_SSL_CERT or DB_POSTGRESDB_SSL_KEY is defined.',
    },
    {name: 'DB_POSTGRESDB_SSL_CA', type: 'Input', description: 'The PostgreSQL SSL certificate authority.'},
    {name: 'DB_POSTGRESDB_SSL_CERT', type: 'Input', description: 'The PostgreSQL SSL certificate.'},
    {name: 'DB_POSTGRESDB_SSL_KEY', type: 'Input', description: 'The PostgreSQL SSL key.'},
    {
      name: 'DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED',
      type: 'CheckBox',
      description: 'If n8n should reject unauthorized SSL connections (true) or not (false).',
    },
    {
      name: 'DB_SQLITE_POOL_SIZE',
      type: 'Input',
      defaultValue: 0,
      description:
        'Controls whether to open the SQLite file in WAL mode or rollback journal mode. Uses rollback journal mode when set to zero. When greater than zero, uses WAL mode with the value determining the number of parallel SQL read connections to configure. WAL mode is much more performant and reliable than the rollback journal mode.',
    },
    {
      name: 'DB_SQLITE_VACUUM_ON_STARTUP',
      type: 'CheckBox',
      description:
        'Runs VACUUM operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and increases start-up time.',
    },
  ],
};

export default database;

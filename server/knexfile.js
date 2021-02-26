const dotenv = require('dotenv')
const path = require('path')
const pg = require('pg')

dotenv.config()

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  pool: {
    min: Number(process.env.DATABASE_POOL_MIN),
    max: Number(process.env.DATABASE_POOL_MAX),
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
}

// if you want to use other env name, you need to add to this :(

module.exports = {
  development: config,
  production: config,
}[process.env.NODE_ENV || 'development']

import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: process.env.DB_URI,
    pool: {
      min: 0,
      max: 7,
    },
  },

  staging: {
    client: "mysql2",
    connection: process.env.DB_URI,
    pool: {
      min: 0,
      max: 7,
    },
  },

  production: {
    client: "mysql2",
    connection: process.env.DB_URI,
    pool: {
      min: 0,
      max: 7,
    },
  },
};

export default config;

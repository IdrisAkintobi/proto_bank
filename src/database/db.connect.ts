import config from "./db.config";

import knex from "knex";
const db = knex(config[process.env.NODE_ENV as string]);

// export const migrate = async () => {
//   try {
//     await db.migrate.latest();
//     console.log("Migration completed");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const rollback = async () => {
//   try {
//     await db("knex_migrations_lock").where({ is_locked: 0 }).del();
//     await db.migrate.rollback();
//     console.log("Rollback completed");
//   } catch (error) {
//     console.log(error);
//   }
// };

export default db;

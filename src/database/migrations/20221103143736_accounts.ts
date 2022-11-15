import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("accounts", (table) => {
    table.string("accNumber", 10).primary();
    table.enum("type", ["checking", "savings"]).notNullable();
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.bigint("balance").notNullable().defaultTo(0);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("accounts");
}

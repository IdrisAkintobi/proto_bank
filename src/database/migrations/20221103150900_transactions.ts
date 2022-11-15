import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary();
    table.string("sender", 10).notNullable();
    table.string("receiver", 10).notNullable();
    table.enum("type", ["deposit", "withdrawal"]).notNullable();
    table.string("description").notNullable();
    table.decimal("amount").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}

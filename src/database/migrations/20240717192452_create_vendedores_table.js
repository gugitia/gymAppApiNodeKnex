/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Vendedores", function (table) {
    table.increments("vendedor_id", 36).notNullable().primary();
    table.string("nome", 50).notNullable();
    table.string("cell", 15).notNullable();
    table.string("email", 200).notNullable();
    table.string("senha", 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("Vendedores");
};

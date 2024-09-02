/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("TemplateProposta", function (table) {
    table.increments("servico_id").primary().notNullable();
    table
      .integer("concessionaria_id")
      .notNullable()
      .references("concessionaria_id")
      .inTable("Concessionarias");
    table.string("nome", 50).notNullable();
    table.integer("potenciatotal").notNullable();
    table.integer("potenciaprimaria").notNullable();
    table.integer("potenciasecundaria").notNullable();
    table.integer("valortotal").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("TemplateProposta");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("MaterialOrcamento", function (table) {
    table.string("material_orcamento_id", 36).notNullable().primary();
    table.string("orcamento_id", 36).notNullable();
    table.string("material_id", 36).notNullable();
    table.integer("quantidade").notNullable();
    table.float("valortotal").notNullable();
    table
      .foreign("orcamento_id")
      .references("orcamento_id")
      .inTable("Orcamentos");
    table.foreign("material_id").references("material_id").inTable("Materiais");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("MaterialOrcamento");
};

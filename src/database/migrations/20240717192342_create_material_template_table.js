/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("MaterialTemplate", function (table) {
    table.increments("material_template_id", 36).notNullable().primary();
    table.string("material_Id", 36).notNullable();
    table.integer("template_Id").notNullable();
    table.integer("concessionaria_id").notNullable();
    table.integer("quantidade").notNullable();
    table.float("valortotal").notNullable();
    table.foreign("material_Id").references("material_id").inTable("Materiais");
    table
      .foreign("template_Id")
      .references("servico_id")
      .inTable("TemplateProposta");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("MaterialTemplate");
};

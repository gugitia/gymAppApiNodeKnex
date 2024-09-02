/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Materiais", function (table) {
    table.increments("material_id", 36).primary().notNullable();
    table.integer("codigo").notNullable();
    table.string("un", 10).notNullable();
    table.string("descricao", 1000).notNullable();
    table.string("classfiscal", 20).notNullable();
    table.float("vi_sub_trib").notNullable();
    table.float("valor_unidade").notNullable();
    table.float("ipi").notNullable();
    table.float("suframa").notNullable();
    table.integer("icms").notNullable();
    table
      .integer("concessionaria_id")
      .notNullable()
      .references("concessionaria_id")
      .inTable("Concessionarias");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("Materiais");
};

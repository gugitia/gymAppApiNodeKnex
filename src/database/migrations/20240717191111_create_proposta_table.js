/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Propostas", function (table) {
    table.string("proposta_id", 36).primary().notNullable();
    table
      .string("orcamento_id", 36)
      .notNullable()
      .references("orcamento_id")
      .inTable("Orcamentos");
    table
      .foreign("servico_id")
      .references("servico_id")
      .inTable("TemplateProposta");
    table.string("nome", 50).notNullable();
    table.string("descricao", 1000).notNullable();
    table.binary("imgs");
    table.integer("potenciatotal").notNullable();
    table.integer("potenciaprimaria").notNullable();
    table.integer("potenciasecundaria").notNullable();
    table.binary("aprovacao").notNullable();
    table
      .integer("servico_id")
      .notNullable()
      .references("servico_id")
      .inTable("Servicos");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("Propostas");
};

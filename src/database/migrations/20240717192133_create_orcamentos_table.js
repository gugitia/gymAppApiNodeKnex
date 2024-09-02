/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Orcamentos", function (table) {
    table.increments("orcamento_id", 36).primary().notNullable();
    table
      .string("cliente_id", 36)
      .notNullable()
      .references("cliente_id")
      .inTable("Clientes");
    table
      .string("vendedor_id", 36)
      .notNullable()
      .references("vendedor_id")
      .inTable("Vendedores");
    table.string("concessionaria").notNullable();
    table.string("servico").notNullable();
    table.integer("potenciatotal").notNullable();
    table.integer("potenciaprimaria").notNullable();
    table.integer("potenciasecundaria").notNullable();
    table.string("obs", 500);
    table.float("valortotal").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("Orcamentos");
};

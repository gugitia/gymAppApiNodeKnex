/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Clientes", function (table) {
    table.increments("cliente_id").primary();
    table.string("cliente").notNullable();
    table.string("email").notNullable();
    table.string("senha").notNullable();
    table.string("contato").notNullable();
    table.string("cep").notNullable();
    table.string("endereco").notNullable();
    table.string("bairro").notNullable();
    table.string("cidade").notNullable();
    table.string("uf").notNullable();
    table.string("tel").nullable();
    table.string("cel").notNullable();
    table.string("ramal").nullable();
    table.string("cnpj").notNullable();
    table.string("inscricao_estadual").notNullable();
    table.string("fax").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("Clientes");
};

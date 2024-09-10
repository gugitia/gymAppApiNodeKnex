/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("ExersiceTrain", function (table) {
    table.increments("id").primary();
    table
      .integer("train_id")
      .unsigned()
      .references("train_id")
      .inTable("UserTrains");
    table
      .integer("exercise_id")
      .unsigned()
      .references("exercise_id")
      .inTable("Exercise");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("ExersiceTrain");
};

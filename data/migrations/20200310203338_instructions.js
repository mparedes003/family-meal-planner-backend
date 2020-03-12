exports.up = function(knex) {
  return knex.schema.createTable("instructions", tbl => {
    tbl.increments("id");

    tbl
      .integer("recipe_id")
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.integer("step_number");

    tbl.text("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("instructions");
};

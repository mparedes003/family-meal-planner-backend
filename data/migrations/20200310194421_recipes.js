exports.up = function(knex) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments("id");

    tbl.text("title").notNullable();

    tbl
      .integer("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.integer("prep_time");

    tbl.integer("cook_time");

    tbl.text("description");

    tbl.text("notes");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes");
};

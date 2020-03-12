exports.up = function(knex) {
  return knex.schema.createTable("recipe_ingredients", tbl => {
    tbl.increments("id");

    tbl
      .integer("recipe_id")
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl
      .integer("ingredient_id")
      .notNullable()
      .references("id")
      .inTable("ingredients")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl
      .integer("unit_id")
      .notNullable()
      .references("id")
      .inTable("units")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.float("quantity").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipe_ingredients");
};

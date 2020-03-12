exports.up = function(knex) {
  return knex.schema.createTable("units", tbl => {
    tbl.increments("id");

    tbl.text("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("units");
};

exports.up = function(knex) {
  return knex.schema.createTable('recipe_tags', tbl => {
    tbl.increments('id');

    tbl
      .integer('recipe_id')
      .references('id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();

    tbl
      .integer('tag_id')
      .references('id')
      .inTable('tags')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIFExists('recipe_tags');
};

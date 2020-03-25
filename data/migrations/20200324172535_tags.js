exports.up = function(knex) {
  return knex.schema.createTable('tags', tbl => {
    tbl.increments('id');

    tbl.text('name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tags');
};

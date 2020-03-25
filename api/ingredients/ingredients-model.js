const db = require('../../data/dbConfig.js');
module.exports = {
  findAllIngredients,
  findIngredientsBy,
  findIngredientsById,
  addIngredient
};

// Find all ingredients
function findAllIngredients() {
  return db('ingredients');
}

// Find ingredients by a given parameter
function findIngredientsBy(filter) {
  return db('ingredients').where(filter);
}

// Find ingredients by id
function findIngredientsById(id) {
  return db('ingredients')
    .where({ id })
    .first();
}

// Add an ingredient
function addIngredient(ingredient) {
  return db('ingredients')
    .insert(ingredient)
    .then(ids => {
      return findIngredientsById(ids[0]);
    });
}

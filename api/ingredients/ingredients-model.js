const db = require('../../data/dbConfig.js');

module.exports = {
  findAllIngredients,
  findIngredientsBy,
  findIngredientById,
  addIngredient,
  updateIngredient,
  deleteIngredient
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
function findIngredientById(id) {
  return db('ingredients')
    .where({ id })
    .first();
}

// Add an ingredient
function addIngredient(ingredient) {
  return db('ingredients')
    .insert(ingredient)
    .then(ids => {
      return findIngredientById(ids[0]);
    });
}
// Update an ingredient
function updateIngredient(id, changes) {
  return db('ingredients')
    .where({ id })
    .update(changes)
    .then(() => {
      return findIngredientById(id);
    });
}
// Delete an ingredient
function deleteIngredient(id) {
  return db('ingredients')
    .where({ id })
    .del();
}

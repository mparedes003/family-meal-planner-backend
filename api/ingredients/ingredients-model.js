const db = require('../../data/dbConfig.js');

module.exports = {
  findAllIngredients,
  findIngredientsBy,
  findIngredientById,
  multiIngrInsert,
  addIngredient,
  updateIngredient,
  deleteIngredient,
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
  return db('ingredients').where({ id }).first();
}

// Inserts multiple ingredients into a new array by mapping.
// Use to add a list of ingredients to a new recipe.
function multiIngrInsert(recipe_id, ingredient) {
  // console.log('irecID:', recipe_id);
  // console.log('ingrd:', ingredient);
  ingredient.map((ingredient) => {
    this.addIngredient(ingredient, recipe_id);
  });
  return;
}

// Add an ingredient
function addIngredient(ingredient, recipe_id) {
  return db
    .transaction(function (trx) {
      // Check if ingredient already exists
      return db('ingredients')
        .transacting(trx)
        .where('name', ingredient.name)
        .first()
        .pluck('id')
        .then(([id]) => {
          // If ingredient not found
          if (!id || id <= 0) {
            // ADD the ingredient
            return (
              db('ingredients')
                .transacting(trx)
                .insert({ name: ingredient.name })
                //.returning('id')
                .then(([id]) => {
                  return id;
                })
            );
          }
          return id;
        })
        .then((id) => {
          // Next insert the ingredient id into intermediary table
          // use to join a recipe and its ingredients
          return (
            db('recipe_ingredients')
              .transacting(trx)
              .insert({
                recipe_id: recipe_id,
                ingredient_id: id,
                quantity: ingredient.quantity,
              })
              //.returning('id')
              .then(([id]) => {
                return id;
              })
          );
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => {
      console.error('ERROR, Ingredients not inserted:', err);
    });
}

// function addIngredient(ingredient) {
//   return db('ingredients')
//     .insert(ingredient)
//     .then((ids) => {
//       return findIngredientById(ids[0]);
//     });
// }

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
  return db('ingredients').where({ id }).del();
}

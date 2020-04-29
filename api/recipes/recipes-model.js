const db = require('../../data/dbConfig.js');
const ingredientsModel = require('../ingredients/ingredients-model');

module.exports = {
  findAllRecipes,
  findRecipeBy,
  findRecipeById,
  addRecipe,
};

// find all recipes
function findAllRecipes() {
  return db('recipes');
}

// find recipes by a given paramenter
function findRecipeBy(filter) {
  return db('recipes').where(filter);
}

// find recipe by id
// function findRecipeById(recipeId)
function findRecipeById(id) {
  const recipe = db('recipes').where('id', id);
  // const { id } = recipeId;
  const recipe_ingredients = db('recipe_ingredients')
    .join('ingredients', 'ingredients.id', 'recipe_ingredients.ingredient_id')
    .select(
      'recipe_ingredients.id',
      'recipe_ingredients.quantity',
      'ingredients.name'
    )
    .where('recipe_id', id);

  return Promise.all([recipe, recipe_ingredients]);
}

// Add a recipe
async function addRecipe(recipe, userId) {
  const recipeInsert = {
    owner_id: userId,
    title: recipe.title,
    prep_time: recipe.prep_time,
    cook_time: recipe.cook_time,
    description: recipe.description,
    notes: recipe.notes,
  };

  return db
    .transaction((trx) => {
      return db('recipes')
        .transacting(trx)
        .insert(recipeInsert)
        .then(([id]) => {
          console.log('recipes.id', id);
          return id;
        })
        .then((result) => {
          console.log('result', result);
          // Add all ingredients
          const id = result;
          console.log('recipe_id', id);
          if (recipe.ingredients && recipe.ingredients !== null) {
            ingredientsModel.multiInsert(id, recipe.ingredients);
          }
          return id;
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then((result) => {
      // Transaction success.
      return result;
    })
    .catch(function (err) {
      console.error('Error in recipe insert: ', err);
    });
}

// async function addRecipe(recipe, userId) {
//   const recipeInsert = {
//     owner_id: userId,
//     title: recipe.title,
//     prep_time: recipe.prep_time,
//     cook_time: recipe.cook_time,
//     description: recipe.description,
//     notes: recipe.notes,
//   };

//   const newRecipe = await db('recipes').insert(recipeInsert);
//   console.log(newRecipe);

//   return findAllRecipes();
// }

const db = require('../../data/dbConfig.js');
const ingredientsModel = require('../ingredients/ingredients-model');
const instructionsModel = require('../instructions/instructions-model');

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
      'recipe_ingredients.measurement',
      'ingredients.name'
    )
    .where('recipe_id', id);

  // select recipe_ingredients.id, recipe_ingredients.quantity, units.name, ingredients.name
  // from ingredients
  // join recipe_ingredients on ingredients.id = recipe_ingredients.ingredient_id
  // join units on units.id = recipe_ingredients.unit_id

  // knex
  // .select('books.title', 'authors.name')
  // .from('books')
  // .join('books_authors', 'books.id', '=', 'books_authors.book_id')
  // .join('authors', 'authors.id', '=', 'books_authors.author_id')

  const instructions = db('instructions')
    .select('step_number', 'description')
    .where('recipe_id', id)
    .orderBy('step_number');

  return Promise.all([recipe, recipe_ingredients, instructions]);
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
            ingredientsModel.multiIngrInsert(id, recipe.ingredients);
          }
          return id;
        })
        .then((id) => {
          // console.log('RecID4Inst:', id);
          // Add all instructions
          if (recipe.instructions && recipe.instructions !== null) {
            // console.log('RecID4InstMAP:', id);
            instructionsModel.multiInstInsert(id, recipe.instructions);
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

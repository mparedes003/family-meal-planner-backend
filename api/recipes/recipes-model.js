const db = require('../../data/dbConfig.js');

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

// Find an recipe by id
function findRecipeById(id) {
  return db('recipes').where({ id }).first();
}

// Add an recipe
async function addRecipe(recipe, userId) {
  const recipeInsert = {
    owner_id: userId,
    title: recipe.title,
    prep_time: recipe.prep_time,
    cook_time: recipe.cook_time,
    description: recipe.description,
    notes: recipe.notes,
  };

  const newRecipe = await db('recipes').insert(recipeInsert);
  console.log(newRecipe);

  return findAllRecipes();
}

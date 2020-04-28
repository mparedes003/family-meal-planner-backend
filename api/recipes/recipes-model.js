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

// find recipe by id
function findRecipeById(recipeId) {
  const recipe = db('recipes').where(recipeId);
  const { id } = recipeId;
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

const db = require('../../data/dbConfig.js');

module.exports = {
  getAllRecIngrdients,
  addRecIngredient,
};

// GeT all recipe ingredients
function getAllRecIngrdients() {
  return db('recipe_ingredients');
}

// ADD a recipe ingredient
async function addRecIngredient(recipe_id, ingredient_id, unit_id, quantity) {
  const recIngrInsert = {
    recipe_id,
    ingredient_id,
    unit_id,
    quantity,
  };

  const newRecIngr = await db('recipe_ingredients').insert(recIngrInsert);
  console.log(newRecIngr);

  return getAllRecIngrdients();
}

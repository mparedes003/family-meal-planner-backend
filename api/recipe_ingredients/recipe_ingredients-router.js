const router = require('express').Router();
const db = require('./recipe_ingredients-model');

// GET all recipe ingredients
router.get('/', (req, res) => {
  db.getAllRecIngrdients()
    .then((recipe_ingredients) => {
      res.status(200).json(recipe_ingredients);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// ADD a recipe ingredient
router.post('/', (req, res) => {
  const { recipe_id, ingredient_id, unit_id, quantity } = req.body;

  db.addRecIngredient(recipe_id, ingredient_id, unit_id, quantity)
    .then((new_recipe_ingredient) => {
      res.status(200).json(new_recipe_ingredient);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Recipe Ingredient not added' });
    });
});

module.exports = router;

const router = require('express').Router();
const db = require('./recipes-model');

const restricted = require('../auth/restricted-middleware');

// GET all recipes
router.get('/', (req, res) => {
  db.findAllRecipes()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// ADD a recipe
router.post('/', restricted, (req, res) => {
  const recipe = req.body;
  const ownerId = req.user.id;

  db.addRecipe(recipe, ownerId)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Recipe not added.' });
    });
});

module.exports = router;

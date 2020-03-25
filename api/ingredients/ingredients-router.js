const router = require('express').Router();
const db = require('./ingredients-model');

// GET all ingredients
router.get('/', (req, res) => {
  db.findAllIngredients()
    .then(ingredients => {
      res.status(200).json(ingredients);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// ADD an ingredient
router.post(`/`, (req, res) => {
  const ingredient = req.body;

  db.addIngredient(ingredient)
    .then(ingredient => {
      res.status(200).json(ingredient);
    })
    .catch(err => {
      res.status(500).json({ message: 'Ingredient not added' });
    });
});

module.exports = router;

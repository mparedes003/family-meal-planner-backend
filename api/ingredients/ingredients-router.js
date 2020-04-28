const router = require('express').Router();
const db = require('./ingredients-model');

// GET all ingredients
router.get('/', (req, res) => {
  db.findAllIngredients()
    .then((ingredients) => {
      res.status(200).json(ingredients);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// ADD an ingredient
router.post('/', (req, res) => {
  const ingredient = req.body;

  db.addIngredient(ingredient)
    .then((ingredient) => {
      res.status(200).json(ingredient);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Ingredient not added' });
    });
});

// UPDATE ingredient by ingredient id
router.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.updateIngredient(id, changes)
    .then((ingredient) => {
      if (ingredient) {
        res.status(200).json(ingredient);
      } else {
        res.status(404).json({ message: 'Ingredient not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to update ingredient' });
    });
});

// DELETE ingredient by ingredient id
router.delete(`/:id`, (req, res) => {
  const { id } = req.params;

  db.deleteIngredient(id)
    .then((ingredient) => {
      if (ingredient) {
        res.status(200).json({ message: 'Ingredient deleted successfully.' });
      } else {
        res.status(404).json({
          message: 'Ingredient not found. Nothing to delete.',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to delete ingredient' });
    });
});

module.exports = router;

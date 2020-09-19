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

// GET recipe by id
router.get('/:id', async (req, res) => {
  const id = req.params;

  db.findRecipeById(id)
    .then((rec) => {
      let [recipe, ingredients, instructions] = rec;
      recipe = recipe[0];
      if (recipe) {
        res.status(200).json({
          ...recipe,
          ingredients: ingredients,
          instructions: instructions,
        });
      } else {
        res.status(404).json({ message: 'No recipe found with this ID.' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// ADD a recipe
router.post('/', restricted, (req, res) => {
  const recipe = req.body;
  const ownerId = req.user.id;

  db.addRecipe(recipe, ownerId)
    // .then((id) => {
    //   db.findRecipeById(id)
    // console
    //   .log('recId found:', id)
    .then((rec) => {
      console.log('rec:', rec);
      let [recipe, ingredients, instructions] = rec;
      //recipe = recipe[0];
      res.status(200).json({
        ...recipe,
        ingredients: ingredients,
        instructions: instructions,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: `Could not find recipe: ${err}` });
    });
});
//     .catch((err) => {
//       res.status(500).json({ error: `Could not post recipe: ${err}` });
//     });
// });

// DELETE a recipe
router.delete('/:id', async (req, res) => {
  const id = req.params;

  db.deleteRecipe(id)
    .then((count) => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No recipe found to delete' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

module.exports = router;

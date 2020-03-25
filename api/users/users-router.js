const router = require('express').Router();
const db = require('./users-model');

// GET all users
router.get('/', (req, res) => {
  db.findAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// UPDATE user by user id
router.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.updateUser(id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update user' });
    });
});

// DELETE user by user id
router.delete(`/:id`, (req, res) => {
  const { id } = req.params;

  db.deleteUser(id)
    .then(user => {
      if (user) {
        res.status(200).json({ message: 'User was successfully deleted.' });
      } else {
        res
          .status(404)
          .json({ message: 'User not found. There is nothing to delete.' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete user' });
    });
});

module.exports = router;

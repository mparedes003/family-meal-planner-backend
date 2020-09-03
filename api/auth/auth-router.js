const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../users/users-model');
const { generateToken } = require('./auth-middleware');

// Endpoints beginning with /auth

// Register/Add/Create a user
router.post('/register', (req, res) => {
  const user = req.body;
  // Use bcryptjs to hash the username and passsword
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db.addUser(user)
    .then((user) => {
      const token = generateToken(user);

      res.status(201).json({ username: user.username, token });
    })
    .catch((error) => {
      res.status(500).json({ message: 'User not created.' });
    });
});

// Login a user
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.findUserBy({ username }) // Find the user by the username
    .first()
    .then((user) => {
      // Verify that the credentials are correct
      if (user && bcrypt.compareSync(password, user.password)) {
        // Generate a token
        const token = generateToken(user);

        res.status(201).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;

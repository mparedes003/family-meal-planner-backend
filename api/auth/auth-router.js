const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../users/users-model');
const { generateToken } = require('./auth-middleware');

// Endpoints beginning with /api/auth

// Endpoint to Register/Add/Create a user
router.post('/register', (req, res) => {
  let user = req.body;
  // Use bcryptjs to hash the username and passsword
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db.add(user)
    .then(user => {
      const token = generateToken(user);

      res.status(201).json({ username: user.username, token });
    })
    .catch(error => {
      res.status(500).json({ message: 'User not created.' });
    });
});

// Endpoint to Log a user In
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username }) // Find the user by the username
    .first()
    .then(user => {
      // Verify that the credentials are correct
      if (user && bcrypt.compareSync(password, user.password)) {
        // Generate a token
        const token = generateToken(user);

        res.status(201).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.staus(500).json(error);
    });
});

module.exports = router;

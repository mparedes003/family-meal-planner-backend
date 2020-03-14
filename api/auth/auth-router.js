const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../users/users-model.js');

// endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let userCredentials = req.body;
  const hash = bcrypt.hashSync(userCredentials.password, 14);
  userCredentials.password = hash;

  db.add(userCredentials)
    .then(user => {
      const token = generateToken({ username: userCredentials.username });

      res.status(201).json({ username: userCredentials.username, token });
    })
    .catch(error => {
      res.status(500).json({ message: 'User not created.' });
    });
});

// Custom Function for Token Generation
function generateToken(user) {
  const jwtPayload = {
    subject: user.id, // standard claim sub
    username: user.username
  };

  const jwtOptions = {
    expiresIn: '1d'
  };

  return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
}

module.exports = router;

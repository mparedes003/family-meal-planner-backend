const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../users/users-model');
const { generateToken } = require('./auth-middleware');
// const secrets = require('../../config/secrets');

// endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
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

module.exports = router;

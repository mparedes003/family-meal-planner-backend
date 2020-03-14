const jwt = require('jsonwebtoken');

const secrets = require('../../config/secrets');

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

module.exports = {
  generateToken
};

const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  add
};

// Find all users
function find() {
  return db('users').select('id', 'username');
}

// Find user by a given parameter
function findBy(filter) {
  return db('users').where(filter);
}

// Find user by id
function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

// Add/Create a user
function add(user) {
  return db('users').insert(user);
}

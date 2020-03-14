const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db('users').select('id', 'username');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users').insert(user);
}

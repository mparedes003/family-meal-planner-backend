const db = require('../../data/dbConfig.js');

module.exports = {
  findAllUsers,
  findUserBy,
  findUserById,
  addUser,
  updateUser,
  deleteUser
};

// Find all users
function findAllUsers() {
  return db('users').select('id', 'username');
}

// Find user by a given parameter
function findUserBy(filter) {
  return db('users').where(filter);
}

// Find user by id
function findUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

// Add/Create a user
function addUser(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return findUserById(ids[0]);
    });
}

// Update a user
function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(() => {
      return findUserById(id);
    });
}
// Delete a user
function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}

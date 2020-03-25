const db = require('../../data/dbConfig.js');

module.exports = {
  findAllTags,
  findTagBy,
  findTagById,
  addTag,
  updateTag,
  deleteTag
};

// Find all tags
function findAllTags() {
  return db('tags');
}

// Find tags by a given parameter
function findTagBy(filter) {
  return db('tags').where(filter);
}

// Find tag by id
function findTagById(id) {
  return db('tags')
    .where({ id })
    .first();
}

// Add a tag
function addTag(tag) {
  return db('tags')
    .insert(tag)
    .then(() => {
      return findTagById(ids[0]);
    });
}

// Update a tag
function updateTag(id, changes) {
  return db('tags')
    .where({ id })
    .update(changes)
    .then(() => {
      return findTagById(id);
    });
}

// Delete a tag
function deleteTag(id) {
  return db('tags')
    .where({ id })
    .del();
}

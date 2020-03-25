const db = require('../../data/dbConfig.js');

module.exports = {
  findAllUnits,
  findUnitBy,
  findUnitById,
  addUnit,
  updateUnit,
  deleteUnit
};

// Find all units
function findAllUnits() {
  return db('units');
}

// Find units by a given parameter
function findUnitBy(filter) {
  return db('units').where(filter);
}

// Find units by id
function findUnitById(id) {
  return db('units')
    .where({ id })
    .first();
}

// Add a unit
function addUnit(unit) {
  return db('units')
    .insert(unit)
    .then(ids => {
      return findUnitById(ids[0]);
    });
}

// Update a unit
function updateUnit(id, changes) {
  return db('units')
    .where({ id })
    .update(changes)
    .then(() => {
      return findUnitById(id);
    });
}

// Delete a Unit
function deleteUnit(id) {
  return db('units')
    .where({ id })
    .del();
}

const db = require('../../data/dbConfig.js');

module.exports = {
  multiInstInsert,
  addInstruction,
};

// Inserts multiple instructions into a new array by mapping.
// Use to add a list of instructions to a new recipe.
function multiInstInsert(recipe_id, instruction) {
  console.log('instRecID:', recipe_id);
  console.log('inst:', instruction);
  instruction.map((instruction) => {
    this.addInstruction(instruction, recipe_id);
  });
  return;
}

function addInstruction(instruction, recipe_id) {
  // Add the instruction into the instructions table
  db('instructions')
    .insert({
      recipe_id: recipe_id,
      step_number: instruction.step_number,
      description: instruction.description,
    })
    .then(([id]) => {
      return id;
    });
}

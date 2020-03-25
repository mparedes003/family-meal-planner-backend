const router = require('express').Router();
const db = require('./units-model');

// GET all units
router.get('/', (req, res) => {
  db.findAllUnits()
    .then(units => {
      res.status(200).json(units);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// ADD a unit
router.post('/', (req, res) => {
  const unit = req.body;

  db.addUnit(unit)
    .then(unit => {
      res.status(200).json(unit);
    })
    .catch(err => {
      res.status(500).json({ message: 'Unit not added.' });
    });
});

// UPDATE a unit
router.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.updateUnit(id, changes)
    .then(unit => {
      if (unit) {
        res.status(200).json(unit);
      } else {
        res.status(404).json({ message: 'Unit not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update unit' });
    });
});

// DELETE a unit
router.delete(`/:id`, (req, res) => {
  const { id } = req.params;

  db.deleteUnit(id)
    .then(unit => {
      if (unit) {
        res.status(200).json({ message: 'Unit deleted successfully' });
      } else {
        res.status(404).json({
          message: 'Unit not found. Nothing to delete.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete unit' });
    });
});

module.exports = router;

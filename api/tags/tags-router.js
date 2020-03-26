const router = require('express').Router();
const db = require('./tags-model');

// Get all tags
router.get('/', (req, res) => {
  db.findAllTags()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// ADD a tag
router.post('/', (req, res) => {
  const tag = req.body;

  db.addTag(tag)
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(err => {
      res.status(500).json({ message: 'Tag not added.' });
    });
});

// UPDATE a tag
router.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.updateTag(id, changes)
    .then(tag => {
      if (tag) {
        res.status(200).json(tag);
      } else {
        res.status(404).json({ message: 'Tag not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update tag' });
    });
});

// DELETE a tag
router.delete(`/:id`, (req, res) => {
  const { id } = req.params;

  db.deleteTag(id)
    .then(tag => {
      if (tag) {
        res.status(200).json({ message: 'Tag deleted successfully' });
      } else {
        res.status(404).json({
          message: 'Tag not found. Nothing to delete.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete tag' });
    });
});

module.exports = router;

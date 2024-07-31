const router = require('express').Router();
const Photo = require('../../models/Photo');
const { body, validationResult } = require('express-validator');

// GET the current photo
router.get('/current', async (req, res) => {
  try {
    const photos = await Photo.findAll();
    if (photos.length === 0) {
      return res.status(404).json({ message: 'No photos found' });
    }
    res.json(photos);
  } catch (err) {
    console.error('Error retrieving photos:', err);
    res.status(500).json({ message: 'Error retrieving photos' });
  }
});

// GET a single photo
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.json(photo);
  } catch (err) {
    console.error('Error retrieving photo', err);
    res.status(500).json({ message: 'Error retrieving photo' });
  }
});

// CREATE a photo
router.post(
  '/', 
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('filename').notEmpty().withMessage('filename is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPhoto = await Photo.create(req.body);
      res.status(201).json(newPhoto);
    } catch (err) {
      console.error('Error creating photo:', err);
      res.status(500).json({ message: 'Error creating photo' });
    }
  }
);

// UPDATE a photo
router.put(
  '/:id',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('filename').notEmpty().withMessage('filename is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const [updated] = await Photo.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedPhoto = await Photo.findByPk(req.params.id);
        res.json(updatedPhoto);
      } else {
        res.status(404).json({ message: 'Photo not found' });
      }
    } catch (err) {
      console.error('Error updating photo:', err);
      res.status(500).json({ message: 'Error updating photo' });
    }
  }
);

// DELETE a photo
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Photo.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (err) {
    console.error('Error deleting photos', err);
    res.status(500).json({ message: 'Error deleting photo' });
  }
});

module.exports = router; 
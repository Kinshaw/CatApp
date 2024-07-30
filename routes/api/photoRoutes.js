const router = require('express').Router();
const Photo = require('../../models/Photo');

// GET all photos
router.get('/', async (req, res) => {
  try {
    const photoData = await Photo.findAll();
    if (photoData.length === 0) {
      return res.status(404).json({ message: 'No photos found' });
    }
    res.json(photoData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving photos', error: err });
  }
});

  // GET a single photo
router.get('/:id', async (req, res) => {
  try {
    const photoData = await Photo.findByPk(req.params.id);
    if (!photoData) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.json(photoData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving photo', error: err });
  }
});

// CREATE a photo
router.post('/', async (req, res) => {
  const { title, url } = req.body; // Ensure these fields match your model
  if (!title || !url) {
    return res.status(400).json({ message: 'Title and URL are required' });
  }

  try {
    const newPhoto = await Photo.create(req.body);
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ message: 'Error creating photo', error: err });
  }
});

// UPDATE a photo
router.put('/:id', async (req, res) => {
  const { title, url } = req.body; // Ensure these fields match your model
  if (!title || !url) {
    return res.status(400).json({ message: 'Title and URL are required' });
  }

  try {
    const [updated] = await Photo.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPhoto = await Photo.findByPk(req.params.id);
      res.json(updatedPhoto);
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating photo', error: err });
  }
});

// DELETE a photo
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Photo.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting photo', error: err });
  }
});

module.exports = router;
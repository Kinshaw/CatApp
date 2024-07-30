const router = require('express').Router();
const Album = require('../../models/Album');

// GET all albums
router.get('/', async (req, res) => {
    try { 
        const albumData = await Album.findAll();
        if (albumData.length === 0) {
            return res.status(404).json({ message: 'No albums found' });
        }
        res.json(albumData);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving albums', error: err });
    }
  });

  // GET a single album
router.get('/:id', async (req, res) => {
    try {
        const albumData = await Album.findByPk(req.params.id);
        if (!albumData) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.json(albumData);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving album', error: err });
    }
});
  
  // CREATE an album
  router.post('/', async (req, res) => {
    const { title, artist } = req.body;
    if (!title || !artist) {
        return res.status(400).json({ message: 'Title and Artist are required' });
    }

    try {
        const newAlbum = await Album.create(req.body);
        res.status(201).json(newAlbum);
    } catch (err) {
        res.status(500).json({ message: 'Error creating album', error: err });
    }
  });

  // UPDATE an album
  router.put('/:id', async (req, res) => {
    const { title, artist } = req.body; // Ensure these fields match your model
    if (!title || !artist) {
        return res.status(400).json({ message: 'Title and Artist are required' });
    }

    try {
        const [updated] = await Album.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedAlbum = await Album.findByPk(req.params.id);
            res.json(updatedAlbum);
        } else {
            res.status(404).json({ message: 'Album not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating album', error: err });
    }
  });

  // DELETE an album
  router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Album.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Album not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting album', error: err });
    }
  });

  module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');
const Photo = require('../models/Photo'); // Import the Photo model for fetching data

// GET upload photo page
router.get('/upload', authenticateJWT, (req, res) => {
  res.render('upload-photo', { user: req.user });
});

// GET all photos page
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const photos = await Photo.findAll({ where: { userId: req.user.id } });
    res.render('photos-list', { photos, user: req.user });
  } catch (err) {
    console.error('Error fetching photos:', err);
    res.status(500).json({ message: 'Error fetching photos' });
  }
});

module.exports = router;

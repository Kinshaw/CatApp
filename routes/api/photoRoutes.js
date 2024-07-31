const express = require('express');
const router = express.Router();
const Photo = require('../../models/Photo'); // Ensure this path is correct
const { body, validationResult } = require('express-validator');
const authenticateJWT = require('../../middleware/authenticateJWT'); // Ensure this path is correct
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to accept only specific image types
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// CREATE a photo
router.post(
  '/',
  authenticateJWT,
  upload.single('photo'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('caption').notEmpty().withMessage('Caption is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, caption } = req.body;
      const fileName = req.file ? req.file.filename : null;

      const newPhoto = await Photo.create({
        title,
        caption,
        filename: fileName, // Adjusted field name to match your model
        user_id: req.user.id // Adjusted field name to match your model
      });

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
  authenticateJWT,
  upload.single('photo'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('caption').notEmpty().withMessage('Caption is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, caption } = req.body;
      const fileName = req.file ? req.file.filename : null;

      const [updated] = await Photo.update(
        { title, caption, filename: fileName }, // Adjusted field name to match your model
        { where: { id: req.params.id, user_id: req.user.id } } // Adjusted field name to match your model
      );

      if (updated) {
        const updatedPhoto = await Photo.findByPk(req.params.id);
        res.json(updatedPhoto);
      } else {
        res.status(404).json({ message: 'Photo not found or user not authorized' });
      }
    } catch (err) {
      console.error('Error updating photo:', err);
      res.status(500).json({ message: 'Error updating photo' });
    }
  }
);

// DELETE a photo
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const deleted = await Photo.destroy({
      where: { id: req.params.id, user_id: req.user.id } // Adjusted field name to match your model
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Photo not found or user not authorized' });
    }
  } catch (err) {
    console.error('Error deleting photo:', err);
    res.status(500).json({ message: 'Error deleting photo' });
  }
});

module.exports = router;

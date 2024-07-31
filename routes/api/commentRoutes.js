const express = require('express');
const router = express.Router();
const PollComment = require('../../models/PollComment'); // Ensure this path is correct
const Photo = require('../../models/Photo'); // Ensure this path is correct
const { body, validationResult } = require('express-validator');
const authenticateJWT = require('../../middleware/authenticateJWT'); // Ensure this path is correct

// CREATE a comment (authentication required)
router.post(
  '/',
  authenticateJWT,
  [
    body('content')
      .notEmpty().withMessage('Content is required')
      .isLength({ max: 250 }).withMessage('Content cannot be more than 250 characters'),
    body('photo_id')
      .notEmpty().withMessage('Photo ID is required')
      .isInt().withMessage('Photo ID must be a number')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { content, photo_id } = req.body;
      const user_id = req.user.id; // Use user_id from JWT token

      // Check if the photo exists
      const photo = await Photo.findByPk(photo_id);
      if (!photo) {
        return res.status(404).json({ message: 'Photo not found' });
      }

      // Create new comment
      const newComment = await PollComment.create({ content, photo_id, user_id });
      res.status(201).json(newComment);
    } catch (err) {
      console.error('Error creating comment:', err);
      res.status(500).json({ message: 'Error creating comment' });
    }
  }
);

// UPDATE a comment (authentication required)
router.put(
  '/:id',
  authenticateJWT,
  [
    body('content')
      .notEmpty().withMessage('Content is required')
      .isLength({ max: 250 }).withMessage('Content cannot be more than 250 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { content } = req.body;
      const commentId = req.params.id;
      const user_id = req.user.id; // Use user_id from JWT token

      // Find the comment and ensure it's owned by the user
      const comment = await PollComment.findOne({ where: { id: commentId, user_id } });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found or user not authorized' });
      }

      // Update comment
      comment.content = content;
      await comment.save();
      res.json(comment);
    } catch (err) {
      console.error('Error updating comment:', err);
      res.status(500).json({ message: 'Error updating comment' });
    }
  }
);

// DELETE a comment (authentication required)
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const commentId = req.params.id;
    const user_id = req.user.id; // Use user_id from JWT token

    // Find the comment and ensure it's owned by the user
    const comment = await PollComment.findOne({ where: { id: commentId, user_id } });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or user not authorized' });
    }

    // Delete comment
    await comment.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

module.exports = router;

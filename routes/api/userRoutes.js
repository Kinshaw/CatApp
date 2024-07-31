const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Ensure this path is correct
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // Import bcryptjs

// Update path if necessary
const authenticateJWT = require('../../middleware/authenticateJWT'); // Adjust path to middleware

// CREATE a user (authentication not required, usually used during registration)
router.post(
  '/',
  [
    body('username')
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email address'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });

      // Exclude password from response
      const userResponse = { ...newUser.dataValues };
      delete userResponse.password;

      res.status(201).json(userResponse);
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ message: 'Error creating user' });
    }
  }
);

// UPDATE a user (authentication required)
router.put(
  '/:id',
  authenticateJWT,
  [
    body('username')
      .optional()
      .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
    body('email')
      .optional()
      .isEmail().withMessage('Invalid email address'),
    body('password')
      .optional()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.params.id;
      const { username, email, password } = req.body;

      // Find the user and ensure it's the authenticated user
      const user = await User.findByPk(userId);
      if (!user || user.id !== req.user.id) {
        return res.status(404).json({ message: 'User not found or user not authorized' });
      }

      // Update user details
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) {
        // Hash the new password before saving
        user.password = await bcrypt.hash(password, 10);
      }
      
      await user.save();
      
      // Exclude password from response
      const userResponse = { ...user.dataValues };
      delete userResponse.password;

      res.json(userResponse);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Error updating user' });
    }
  }
);

// DELETE a user (authentication required)
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user and ensure it's the authenticated user
    const user = await User.findByPk(userId);
    if (!user || user.id !== req.user.id) {
      return res.status(404).json({ message: 'User not found or user not authorized' });
    }

    // Delete user
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;

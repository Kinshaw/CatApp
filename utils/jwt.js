const jwt = require('jsonwebtoken');

// Use environment variables for the secret key
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your secret key

// Generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

// Verify a JWT token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};

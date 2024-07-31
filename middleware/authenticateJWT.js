// /middleware/authenticateJWT.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Ensure you have a JWT secret in your environment variables

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.userId = user.id; // Set user ID from token payload
    next();
  });
};

module.exports = authenticateJWT;

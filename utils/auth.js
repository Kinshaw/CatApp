const { verifyToken } = require('../utils/jwt');

// Middleware to check if the user is authenticated
const authenticateJWT = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (token == null) return res.sendStatus(401); // If no token is present

  try {
    // Verify token
    const user = verifyToken(token);
    req.user = user; // Attach user to request
    next(); // Pass control to the next handler
  } catch (err) {
    console.error('Token verification failed:', err);
    res.sendStatus(403); // Forbidden
  }
};

module.exports = authenticateJWT;

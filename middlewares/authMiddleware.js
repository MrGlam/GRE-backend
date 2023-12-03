const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your actual secret key

const authMiddleware = (requiredRole) => (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check if the user has the required role
    if (requiredRole && decoded.role !== requiredRole) {
      return res.status(403).json({ error: 'Access forbidden. Insufficient privileges.' });
    }

    // Attach the user data to the request for further use in route handlers
    req.userData = {
      userId: decoded.userId,
      role: decoded.role,
    };

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authMiddleware;

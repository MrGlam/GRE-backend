// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

function generateToken(userId, role) {
  return jwt.sign({ userId, role }, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded; // Attach the decoded user information to the request object
    next();
  });
};

module.exports = { authenticate, generateToken, verifyToken };

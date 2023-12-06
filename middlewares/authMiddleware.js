const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

function generateToken(userId, role) {
  return jwt.sign({ userId, role }, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}
// isAdmin.js

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header
  if (!token) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const decodedToken = verifyToken(token);
  if (decodedToken && decodedToken.role === 'admin') {
    return next();
  }

  return res.status(403).json({ error: 'Forbidden' });
};


module.exports = { isAdmin,generateToken, verifyToken };
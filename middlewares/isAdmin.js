// isAdmin.js
const { verifyToken } = require('./authMiddleware'); // Replace with the actual path to your authMiddleware file


const isAdmin = (req, res, next) => {
  const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
  console.log(token);
  if (!token) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const decodedToken = verifyToken(token);
  console.log(decodedToken);
  if (decodedToken && decodedToken.role === 'admin') {
    return next();
  }

  return res.status(403).json({ error: 'Forbidden' });
};

module.exports = {isAdmin};


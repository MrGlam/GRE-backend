const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Change this with a secure secret key

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
};

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the email or username is already taken
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

      if (existingUser) {
        return res.status(400).json({ error: 'Email or username already exists' });
      }

      const user = await User.create({ username, email, password });
      const token = generateToken(user);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const token = generateToken(user);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const userId = req.userData.userId;
      const { username, email, newPassword } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update profile fields
      user.username = username || user.username;
      user.email = email || user.email;

      // Update password if a new one is provided
      if (newPassword) {
        user.password = newPassword;
      }

      await user.save();
      res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  },

  deleteUserAccount: async (req, res) => {
    try {
      const userId = req.userData.userId;
      const user = await User.findByIdAndRemove(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user account' });
    }
  },

  // Other user-related methods
};

module.exports = userController;

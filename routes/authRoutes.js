// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if the email is already taken
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  // Hash the password and save to the database
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  const savedUser = await newUser.save();
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add login route and other authentication routes as needed...

module.exports = router;

// authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);  // Log the specific error
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;

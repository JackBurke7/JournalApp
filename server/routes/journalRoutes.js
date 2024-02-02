const express = require('express');
const mongoose = require('mongoose');
const Journal = require('../models/Journal');

const router = express.Router();

// Middleware to validate ObjectId
const isValidObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ObjectId' });
  }
  next();
};

// Create Journal Entry
router.post('/create', async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate that both title and content are provided
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Create a new journal entry
    const newJournal = await Journal.create({ title, content });

    res.status(201).json(newJournal);
  } catch (error) {
    console.error('Create journal entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read All Journal Entries
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find();
    res.json(journals);
  } catch (error) {
    console.error('Fetch journal entries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Journal Entry
router.put('/:id', isValidObjectId, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedJournal = await Journal.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    res.json(updatedJournal);
  } catch (error) {
    console.error('Update journal entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Journal Entry
router.delete('/:id', isValidObjectId, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJournal = await Journal.findByIdAndDelete(id);

    if (!deletedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    res.json({ message: 'Journal deleted successfully' });
  } catch (error) {
    console.error('Delete journal entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

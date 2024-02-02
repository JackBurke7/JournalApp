// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const Journal = require('./models/Journal');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Add this middleware to enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/journal', journalRoutes);

// Create a middleware to validate ObjectId
const isValidObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ObjectId' });
  }
  next();
};

app.get('/journal', async (req, res) => {
  try {
    const journals = await Journal.find();
    res.json(journals);
  } catch (error) {
    console.error('Error fetching journals:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST route for creating a new journal entry
app.post('/create', async (req, res) => {
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
      console.error('Error creating journal:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

// Update the journal entry based on ID
app.put('/journal/:id', isValidObjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

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
    console.error('Error updating journal:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Delete the journal entry based on ID
app.delete('/:id', isValidObjectId, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJournal = await Journal.findByIdAndDelete(id);

    if (!deletedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    res.json({ message: 'Journal deleted successfully' });
  } catch (error) {
    console.error('Error deleting journal:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// ... (other routes)

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

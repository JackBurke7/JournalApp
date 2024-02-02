const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Add this line
    date: { type: Date, default: Date.now },
    // You can add more fields based on your requirements
  });
  

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;

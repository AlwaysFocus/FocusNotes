const mongoose = require('mongoose');

// Define note databse schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    // Assign a createdAt and updatedAt fields with a type of Date
    timestamps: true
  }
);

// Create the note model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

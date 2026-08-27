// models/Board.js
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  name: { type: String, required: true }, // "To Do", "Doing", "Done"
  order: { type: Number, default: 0 }
});

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  columns: [columnSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Board', boardSchema);
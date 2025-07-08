const mongoose = require('mongoose');

const supportMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SupportMessage', supportMessageSchema);
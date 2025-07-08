const express = require('express');
const router = express.Router();
const SupportMessage = require('../models/SupportMessage');

// POST /api/support - Save a support message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const supportMessage = new SupportMessage({ name, email, message });
    await supportMessage.save();
    res.status(201).json({ message: 'Support message received!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save support message.' });
  }
});

module.exports = router; 
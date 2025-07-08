const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');

// GET /api/faq - Get all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs.' });
  }
});

// POST /api/faq - Create a new FAQ
router.post('/', async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required.' });
    }
    const faq = new FAQ({ question, answer });
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ.' });
  }
});

// PUT /api/faq/:id - Update an FAQ
router.put('/:id', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );
    if (!faq) return res.status(404).json({ error: 'FAQ not found.' });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ.' });
  }
});

// DELETE /api/faq/:id - Delete an FAQ
router.delete('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ error: 'FAQ not found.' });
    res.json({ message: 'FAQ deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ.' });
  }
});

module.exports = router; 
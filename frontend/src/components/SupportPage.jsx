import React, { useState, useEffect } from 'react';
import { supportService } from '../services/supportService';

const SupportPage = () => {
  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // FAQ state
  const [faqs, setFaqs] = useState([]);
  const [faqEditMode, setFaqEditMode] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });

  // Hidden admin toggle
  const [adminMode, setAdminMode] = useState(false);
  let faqTitleClickCount = 0;
  let faqTitleClickTimeout = null;

  useEffect(() => {
    fetchFaqs();
    // Cleanup click count on unmount
    return () => clearTimeout(faqTitleClickTimeout);
  }, []);

  const fetchFaqs = async () => {
    try {
      const data = await supportService.getFAQs();
      setFaqs(data);
    } catch (err) {
      setFaqs([]);
    }
  };

  // Hidden toggle: double-click FAQ title
  const handleFaqTitleClick = () => {
    faqTitleClickCount++;
    clearTimeout(faqTitleClickTimeout);
    faqTitleClickTimeout = setTimeout(() => {
      if (faqTitleClickCount >= 2) setAdminMode((a) => !a);
      faqTitleClickCount = 0;
    }, 300);
  };

  // Contact form handlers
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus('');
    try {
      await supportService.sendSupportMessage(form);
      setForm({ name: '', email: '', message: '' });
      setFormStatus('Message sent!');
    } catch {
      setFormStatus('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  // FAQ admin handlers
  const handleFaqFormChange = (e) => {
    setFaqForm({ ...faqForm, [e.target.name]: e.target.value });
  };
  const handleFaqFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        await supportService.updateFAQ(editingFaq._id, faqForm);
      } else {
        await supportService.addFAQ(faqForm);
      }
      setFaqForm({ question: '', answer: '' });
      setEditingFaq(null);
      fetchFaqs();
    } catch {}
  };
  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setFaqForm({ question: faq.question, answer: faq.answer });
  };
  const handleDeleteFaq = async (id) => {
    if (window.confirm('Delete this FAQ?')) {
      await supportService.deleteFAQ(id);
      fetchFaqs();
    }
  };
  const handleCancelEdit = () => {
    setEditingFaq(null);
    setFaqForm({ question: '', answer: '' });
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Support</h1>
      <div className="bg-white rounded shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleFormChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleFormChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleFormChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {formStatus && <div className="text-sm mt-2">{formStatus}</div>}
        </form>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2
          className="text-xl font-semibold mb-4 cursor-pointer select-none"
          onClick={handleFaqTitleClick}
          title="Double-click to toggle admin mode"
        >
          Frequently Asked Questions
          {adminMode && <span className="ml-2 text-xs text-red-500">(Admin Mode)</span>}
        </h2>
        <ul className="mb-4">
          {faqs.map((faq) => (
            <li key={faq._id} className="mb-3">
              <div className="font-medium">Q: {faq.question}</div>
              <div className="ml-2 text-gray-700">A: {faq.answer}</div>
              {adminMode && (
                <div className="mt-1 flex gap-2">
                  <button onClick={() => handleEditFaq(faq)} className="text-blue-600 text-xs">Edit</button>
                  <button onClick={() => handleDeleteFaq(faq._id)} className="text-red-600 text-xs">Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {adminMode && (
          <form onSubmit={handleFaqFormSubmit} className="space-y-2 border-t pt-4">
            <input
              type="text"
              name="question"
              placeholder="Question"
              value={faqForm.question}
              onChange={handleFaqFormChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <textarea
              name="answer"
              placeholder="Answer"
              value={faqForm.answer}
              onChange={handleFaqFormChange}
              className="w-full border rounded px-3 py-2"
              rows={2}
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
                {editingFaq ? 'Update FAQ' : 'Add FAQ'}
              </button>
              {editingFaq && (
                <button type="button" onClick={handleCancelEdit} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SupportPage; 
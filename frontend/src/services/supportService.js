const API_URL = import.meta.env.VITE_API_URL;

export const supportService = {
  sendSupportMessage: async (data) => {
    const res = await fetch(`${API_URL}/support`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to send support message');
    return res.json();
  },
  getFAQs: async () => {
    const res = await fetch(`${API_URL}/faq`);
    if (!res.ok) throw new Error('Failed to fetch FAQs');
    return res.json();
  },
  addFAQ: async (faq) => {
    const res = await fetch(`${API_URL}/faq`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faq),
    });
    if (!res.ok) throw new Error('Failed to add FAQ');
    return res.json();
  },
  updateFAQ: async (id, faq) => {
    const res = await fetch(`${API_URL}/faq/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faq),
    });
    if (!res.ok) throw new Error('Failed to update FAQ');
    return res.json();
  },
  deleteFAQ: async (id) => {
    const res = await fetch(`${API_URL}/faq/${id}`, {
      method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete FAQ');
    return res.json();
  },
}; 
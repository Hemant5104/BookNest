import { useState } from "react";

const faqs = [
  {
    question: "How can I reset my password?",
    answer:
      "Click 'Forgot password' from the login page or 'Change password' from your profile page. A reset link will be emailed to you.",
  },
  {
    question: "Can I create more than one account?",
    answer:
      "Yes, you can create multiple accounts with different email addresses.",
  },
  {
    question: "How can I subscribe to the monthly newsletter?",
    answer:
      "We don't have a newsletter subscription option yet.",
  },
  {
    question: "Do you store credit card information securely?",
    answer:
      ".",
  },
  {
    question: "What payment systems do you work with?",
    answer:
      "We support all major credit cards, PayPal, and UPI payments.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="min-h-screen bg-[#f5f5dc] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#001f3f] mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#001f3f] rounded-lg shadow">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-[#001f3f] focus:outline-none focus:bg-[#e6e6d6] transition-colors"
                onClick={() => toggle(idx)}
              >
                {faq.question}
                <span className="ml-4 text-2xl">{openIndex === idx ? "-" : "+"}</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-[#001f3f] text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
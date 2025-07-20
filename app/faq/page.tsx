'use client';
import { useState } from 'react';
import BuyDinarBento from '../../components/BuyDinarBento';

const faqData = {
  general: [
    {
      question: "Is Dinar Exchange a registered business?",
      answer: "Yes, Dinar Exchange is a registered business name of Oz Trading Group Pty Ltd, officially registered with ASIC and enrolled on AUSTRAC.✅ ABN: 82 158 981 787 ✅ ACN: 158 981 787 ✅ AUSTRAC Enrolment No.: 100311410 We have been supplying Iraqi Dinars (IQD) and Zimbabwe Dollars (ZIM) since 2012, offering secure transactions, competitive rates, and reliable service."
    },
    {
      question: "How long has Dinar Exchange been in business?",
      answer: "Dinar Exchange has been in business since 2012, providing reliable currency exchange services for over 12 years. We have built a strong reputation for trust, security, and competitive rates in the Australian and New Zealand markets."
    },
    {
      question: "Do you have a physical office where I can visit?",
      answer: "Yes, we have a physical office located at 106/797 Plenty Rd, South Morang, VIC 3752. You can visit us during business hours for in-person consultations and transactions."
    },
    {
      question: "Can I meet in person to buy or sell currency?",
      answer: "Yes, we offer in-person meetings by appointment. Please contact us at 1300 856 881 or 0417 460 236 to schedule a meeting at our office in South Morang, Victoria."
    }
  ],
  buying: [
    {
      question: "How do I place an order for Iraqi Dinars or Zimbabwe Dollars?",
      answer: "You can place an order directly on our website: https://dinarexchange.com.au/buy-dinar/ Or Call Us: 📞 1300 856 881 or 0417460236"
    },
    {
      question: "Do you guarantee the authenticity of the banknotes?",
      answer: "Yes, we guarantee the authenticity of all our banknotes. We source our currency directly from authorized dealers and banks, ensuring all notes are genuine and in excellent condition."
    },
    {
      question: "Where do you source your banknotes from?",
      answer: "We source our banknotes directly from authorized dealers and banks in Iraq and Zimbabwe, ensuring authenticity and quality. All our suppliers are verified and trusted partners."
    },
    {
      question: "What denominations of IQD and ZIM do you offer?",
      answer: "We offer various denominations of Iraqi Dinar (IQD) and Zimbabwe Dollar (ZIM) notes. Please contact us for specific denomination availability and pricing."
    },
    {
      question: "Do I need to provide identification to buy currency?",
      answer: "Yes, for compliance with AUSTRAC regulations, we require valid identification for all transactions. This helps ensure secure and legal currency exchange operations."
    },
    {
      question: "Is there a minimum or maximum amount I can purchase?",
      answer: "We have flexible minimum and maximum purchase limits. For orders of 1 Million Dinars and above, please call us on 1300 856 881 or 0417 460 236 before placing your order as there might be slight delays in shipping."
    }
  ],
  payments: [
    {
      question: "What payment methods do you accept?",
      answer: "We accept: Bank Transfer (Direct Deposit), PayID, and Cash Payments (By Appointment Only)."
    },
    {
      question: "Do you offer any discounts for bulk purchases?",
      answer: "Yes, we offer competitive rates for bulk purchases. Please contact us directly to discuss bulk pricing and available discounts."
    },
    {
      question: "Are there any hidden fees when purchasing currency?",
      answer: "No, we believe in transparent pricing. All fees are clearly displayed on our website and discussed before any transaction is completed."
    },
    {
      question: "How often do you update your exchange rates?",
      answer: "We update our exchange rates regularly to reflect current market conditions and ensure competitive pricing for our customers."
    }
  ],
  shipping: [
    {
      question: "How long does shipping take?",
      answer: "We ship currency within 5-7 business days after order confirmation and verification. If there are any delays, we inform our clients via phone, SMS, or email."
    },
    {
      question: "Do you offer express shipping?",
      answer: "Express shipping options may be available depending on your location and order size. Please contact us to discuss express shipping availability and costs."
    },
    {
      question: "Can I track my order after purchase?",
      answer: "Yes, all orders are shipped using registered post with tracking numbers. You will receive tracking information once your order is shipped."
    },
    {
      question: "What happens if my order is delayed or lost?",
      answer: "In the rare event of delays or issues with delivery, we work closely with our shipping partners to resolve the situation quickly. We maintain full insurance on all shipments."
    },
    {
      question: "Do you ship outside of Australia and New Zealand?",
      answer: "Currently, we primarily serve customers in Australia and New Zealand. Please contact us to discuss international shipping options if available."
    }
  ],
  selling: [
    {
      question: "Can I sell my Iraqi Dinars or Zimbabwe Dollars to you?",
      answer: "Yes! We buy back IQD notes. Contact us to discuss the rates and process."
    },
    {
      question: "What is the process for selling my banknotes?",
      answer: "To sell your banknotes, please contact us first to discuss current buyback rates and arrange for verification of your notes. We will guide you through the entire process."
    },
    {
      question: "Do you offer buyback options for customers?",
      answer: "Yes, we offer buyback services for Iraqi Dinars. Our buyback rates are competitive and we ensure a smooth, secure transaction process."
    },
    {
      question: "Where can I exchange my Dinars once the revaluation (RV) happens?",
      answer: "Once revaluation occurs, you can exchange your Dinars through authorized banks and currency exchange services. We will provide guidance and support during this process."
    }
  ],
  security: [
    {
      question: "How secure is my transaction with Dinar Exchange?",
      answer: "At Dinar Exchange, we prioritize the security of every transaction. We only accept payments via bank transfer to ensure a safe and verifiable process. Additionally, every order is shipped using registered post for reliable and trackable delivery. As a fully registered and enrolled business under ASIC and AUSTRAC, we adhere to strict compliance and security measures to protect our customers."
    },
    {
      question: "Do you have a refund or return policy?",
      answer: "We have a comprehensive refund and return policy. If you receive damaged or incorrect notes, we will replace them immediately. Please contact us within 24 hours of receiving your order if there are any issues."
    },
    {
      question: "What measures do you take to prevent fraud?",
      answer: "We implement multiple security measures including identity verification, secure payment processing, and registered shipping. Our compliance with AUSTRAC regulations ensures all transactions are monitored and secure."
    }
  ],
  revaluation: [
    {
      question: "What is currency revaluation (RV), and how does it work?",
      answer: "A currency revaluation (RV) is an adjustment to a country's official exchange rate. If Iraq or Zimbabwe revalue their currency, it may increase in value relative to other currencies."
    },
    {
      question: "How can I stay updated on the latest IQD or ZIM exchange rate news?",
      answer: "You can stay updated by visiting our website regularly, subscribing to our newsletter, or following our social media channels for the latest news and updates."
    },
    {
      question: "Will you notify customers about RV updates?",
      answer: "Yes, we will notify our customers about any significant RV updates through our website, email newsletters, and direct communication channels."
    }
  ]
};

export default function FAQ() {
  const [openSection, setOpenSection] = useState<string | null>('general');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleQuestion = (question: string) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(question)) {
      newOpenQuestions.delete(question);
    } else {
      newOpenQuestions.add(question);
    }
    setOpenQuestions(newOpenQuestions);
  };

  const sections = [
    { key: 'general', title: 'General Questions', icon: '🏢' },
    { key: 'buying', title: 'Buying Iraqi Dinars & Zimbabwe Dollars', icon: '💰' },
    { key: 'payments', title: 'Payments & Pricing', icon: '💳' },
    { key: 'shipping', title: 'Shipping & Delivery', icon: '📦' },
    { key: 'selling', title: 'Selling & Exchange', icon: '🔄' },
    { key: 'security', title: 'Security & Policies', icon: '🔒' },
    { key: 'revaluation', title: 'Revaluation & Market Updates', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        <div className="relative container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Frequently Asked Questions
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Everything you need to know about Iraqi Dinar & Zimbabwe Dollar purchases
          </p>
        </div>
      </section>

      {/* Buy Iraqi Dinars Section */}
      <BuyDinarBento />

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Frequently Asked Questions in regards to purchase of currency at Dinar Exchange:
          </p>

          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white font-semibold text-left flex items-center justify-between hover:from-primary-600 hover:to-orange-600 transition-all duration-200"
                >
                  <span className="flex items-center">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    {section.title}
                  </span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openSection === section.key ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openSection === section.key && (
                  <div className="p-6 space-y-4">
                    {faqData[section.key as keyof typeof faqData].map((item, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                        <button
                          onClick={() => toggleQuestion(item.question)}
                          className="w-full text-left font-semibold text-gray-900 hover:text-primary-500 transition-colors duration-200 flex items-center justify-between"
                        >
                          <span className="pr-4">{item.question}</span>
                          <svg
                            className={`w-5 h-5 transform transition-transform duration-200 ${
                              openQuestions.has(item.question) ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openQuestions.has(item.question) && (
                          <div className="mt-3 text-gray-700 leading-relaxed animate-fade-in">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        <div className="relative container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions? Reach out to us!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold mb-2">Office Address</h3>
              <p className="text-sm opacity-90">106/797 Plenty Rd, South Morang, VIC 3752</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-sm opacity-90">1300 856 881</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-2">🌐</div>
              <h3 className="font-semibold mb-2">Website</h3>
              <p className="text-sm opacity-90">www.DinarExchange.com.au</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-2">📩</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm opacity-90">support@DinarExchange.com.au</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

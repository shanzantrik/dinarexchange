'use client';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        <div className="relative container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Get in touch with our expert team
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "400ms" }}>
            Have a question or want to book an appointment? Call, email, or use the form below and our team will respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                    <p className="text-gray-600">106/797 Plenty Rd, South Morang, VIC 3752</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone Numbers</h3>
                    <p className="text-gray-600">1300 856 881</p>
                    <p className="text-gray-600">+61 417 460 236</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:dinars@dinarexchange.com.au" className="text-primary-500 hover:text-primary-600 transition-colors">
                      dinars@dinarexchange.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-orange-50 rounded-xl border border-primary-100">
                <h3 className="font-semibold text-gray-900 mb-3">Important Notice</h3>
                <p className="text-gray-700 mb-3">
                  For orders of 2 Million Iraqi Dinars and above, please call us first to confirm availability and discuss delivery options.
                </p>
                <p className="text-sm text-gray-600">
                  We offer in-person consultations by appointment at our South Morang office.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Question</option>
                    <option value="bulk">Bulk Order Inquiry</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="support">Customer Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                    rows={5}
                    placeholder="Please provide details about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-primary-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Visit Our Office</h2>
          <p className="text-lg text-gray-600 mb-8">
            Located in South Morang, Victoria, our office is easily accessible and offers secure, in-person transactions.
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-200">
              <div className="flex items-center justify-center h-64 bg-gradient-to-br from-primary-100 to-orange-100">
                <div className="text-center">
                  <div className="text-4xl mb-4">📍</div>
                  <p className="text-lg font-semibold text-gray-700">106/797 Plenty Rd</p>
                  <p className="text-gray-600">South Morang, VIC 3752</p>
                  <p className="text-sm text-gray-500 mt-2">Australia</p>
                </div>
              </div>
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

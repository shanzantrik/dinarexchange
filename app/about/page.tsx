'use client';

const pricingTiers = [
  { amount: "25,000", price: "$186", popular: false },
  { amount: "50,000", price: "$281", popular: false },
  { amount: "75,000", price: "$325", popular: false },
  { amount: "100,000", price: "$381", popular: false },
  { amount: "200,000", price: "$656", popular: false },
  { amount: "500,000", price: "$1,875", popular: false },
  { amount: "1,000,000", price: "$2,800", popular: true },
];

const services = [
  {
    icon: "💎",
    title: "Authentic Currency",
    description: "Verified Iraqi Dinars (IQD) & Zimbabwe Dollars (ZIM) from reputable suppliers"
  },
  {
    icon: "🔒",
    title: "Secure Transactions",
    description: "AUSTRAC enrolled with ASIC compliance for safe, legal transactions"
  },
  {
    icon: "⚡",
    title: "Fast Shipping",
    description: "Insured express delivery across Australia & New Zealand"
  },
  {
    icon: "🎯",
    title: "Competitive Rates",
    description: "Transparent pricing with no hidden fees"
  },
  {
    icon: "👥",
    title: "Expert Support",
    description: "Outstanding customer service and professional advice"
  },
  {
    icon: "🏆",
    title: "Trusted Since 2012",
    description: "Over a decade of experience serving collectors and investors"
  }
];

const compliance = [
  { label: "ABN", value: "82 158 981 787" },
  { label: "ACN", value: "158 981 787" },
  { label: "AUSTRAC Enrolment", value: "100311410" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        <div className="relative container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Number One Source
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Buying and Selling Iraqi Dinars in Australia and New Zealand
          </p>
          <div className="flex justify-center">
            <a
              href="/buy-dinar"
              className="bg-white text-primary-500 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Buy Iraqi Dinars
            </a>
          </div>
        </div>
      </section>

      {/* Limited Stock Section - Similar to Buy Iraqi Dinars */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-orange-500">Limited Stock Alert</h2>
            <p className="text-xl text-gray-600">For Orders of 2 Million and Above</p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-primary-50 rounded-3xl p-8 border border-orange-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Important Notice</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Limited stock available for orders of 2 million Iraqi Dinars and above</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Please contact us before placing large orders to confirm availability</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Slight delays may occur in shipping for large quantity orders</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-orange-200">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-orange-600 mb-2">Contact Us First</p>
                    <p className="text-gray-700 mb-4">Call or Text before placing any order of 2 Million and Above</p>
                    <a
                      href="tel:0417460236"
                      className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      0417 460 236
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Quick Order Guide</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-gray-700">Contact us for large orders (2M+)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-gray-700">Confirm stock availability</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-gray-700">Place your order securely</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-gray-700">Track your delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {pricingTiers.map((tier, idx) => (
              <div
                key={tier.amount}
                className={`relative p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-orange-500 to-primary-500 text-white scale-105'
                    : 'bg-white border-2 border-gray-100 hover:border-orange-300'
                } animate-fade-in`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {tier.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <div className={`text-lg font-bold mb-1 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                    {tier.amount} IQD
                  </div>
                  <div className={`text-xl font-semibold mb-3 ${tier.popular ? 'text-white' : 'text-orange-500'}`}>
                    {tier.price}
                  </div>
                  <button
                    className={`w-full py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-white text-orange-500 hover:bg-gray-100'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">About Us</h2>
            <h3 className="text-2xl font-semibold mb-6 text-primary-500">Who We Are</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Welcome to Dinar Exchange, Australia's trusted provider of Iraqi Dinars (IQD) and Zimbabwe Dollars (ZIM).
              We are a registered and compliant business that has been serving customers across Australia and New Zealand since 2012.
            </p>
          </div>

          {/* Compliance Bento Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our Registration, Enrolment & Compliance</h3>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-6 text-center">
                Dinar Exchange is a registered business name under Oz Trading Group Pty Ltd, fully compliant with ASIC and enrolled with AUSTRAC regulations:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {compliance.map((item, idx) => (
                  <div
                    key={item.label}
                    className="bg-gradient-to-br from-primary-50 to-orange-50 rounded-xl p-6 text-center border border-primary-100 animate-fade-in"
                    style={{ animationDelay: `${idx * 200}ms` }}
                  >
                    <div className="text-2xl font-bold text-primary-500 mb-2">{item.label}</div>
                    <div className="text-lg text-gray-700 font-mono">{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6">
                We prioritize security, compliance, and transparency, ensuring that all transactions are safe, legal, and hassle-free.
              </p>
            </div>
          </div>

          {/* Services Bento Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">What We Offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div
                  key={service.title}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Why Choose Us?</h3>
            <div className="bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    <span className="text-lg">Over a decade of experience – Trusted since 2012</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    <span className="text-lg">Authenticity guaranteed – Verified and sourced from reputable suppliers</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    <span className="text-lg">Secure transactions – Enrolled with AUSTRAC regulations</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    <span className="text-lg">Customer-first approach – Fast, friendly, and reliable service</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    <span className="text-lg">Competitive pricing – Transparent rates with no hidden fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our Mission</h3>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-6">🌍</div>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                To provide Australians and New Zealanders with a secure and reliable platform to buy Iraqi Dinars and Zimbabwe Dollars
                at the best rates, while ensuring compliance, authenticity, and customer satisfaction.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Meet Us in Person</h3>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-6 text-center">
                We have a physical office where customers can book appointments for in-person transactions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <div className="font-semibold">Office Address:</div>
                      <div className="text-gray-600">106/797 Plenty Rd, South Morang, VIC 3752</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <div className="font-semibold">Phone:</div>
                      <div className="text-gray-600">1300 856 881 / +61417460236</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🌐</span>
                    <div>
                      <div className="font-semibold">Website:</div>
                      <div className="text-gray-600">www.DinarExchange.com.au</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📩</span>
                    <div>
                      <div className="font-semibold">Email:</div>
                      <div className="text-gray-600">dinars@DinarExchange.com.au</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Stay Connected</h3>
            <div className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 text-center">
                Follow us for updates, market trends, and the latest news:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔹</div>
                  <div className="font-semibold">Website</div>
                  <div className="text-gray-600">www.DinarExchange.com.au</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔹</div>
                  <div className="font-semibold">Twitter (X)</div>
                  <div className="text-gray-600">@dinarexchange</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔹</div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-gray-600">1300 856 881 / +61 417 460 236</div>
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

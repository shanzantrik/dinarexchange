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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Number One Source
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Buying and Selling Iraqi Dinars in Australia and New Zealand
          </p>
          <div className="flex justify-center">
            <a
              href="/buy-dinar"
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Buy Iraqi Dinars
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {pricingTiers.map((tier, idx) => (
              <div
                key={tier.amount}
                className={`relative p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white scale-105'
                    : 'bg-white border-2 border-gray-100 hover:border-emerald-300'
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
                  <div className={`text-xl font-semibold mb-3 ${tier.popular ? 'text-white' : 'text-emerald-600'}`}>
                    {tier.price}
                  </div>
                  <button
                    className={`w-full py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                      tier.popular
                        ? 'bg-white text-emerald-600 hover:bg-gray-100'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Limited Stock Notice */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-lg font-semibold text-yellow-800 mb-2">
              ⚠️ Limited Stock for 2 Mil Plus Orders
            </p>
            <p className="text-yellow-700">
              Please Call or Text <strong>0417 460 236</strong> before placing any order of 2 Million and Above.
              There might be slight delays in shipping.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">About Us</h2>
            <h3 className="text-2xl font-semibold mb-6 text-blue-600">Who We Are</h3>
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
                    className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 text-center border border-blue-100 animate-fade-in"
                    style={{ animationDelay: `${idx * 200}ms` }}
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-2">{item.label}</div>
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
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8">
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
    </div>
  );
}

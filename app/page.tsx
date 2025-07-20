'use client';
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedText from "../components/AnimatedText";
import TrustpilotWidget from "../components/TrustpilotWidget";
import VapiAgentButton from "../components/VapiAgentButton";

// Pricing data
const pricingTiers = [
  { amount: "25,000", price: "$186", popular: false },
  { amount: "50,000", price: "$281", popular: false },
  { amount: "75,000", price: "$325", popular: false },
  { amount: "100,000", price: "$381", popular: true },
  { amount: "200,000", price: "$656", popular: false },
  { amount: "500,000", price: "$1,875", popular: false },
  { amount: "1,000,000", price: "$2,800", popular: false },
];

// Services data
const services = [
  {
    icon: "💱",
    title: "Effortless Conversions",
    description: "Convert AUD to Iraqi dinars with precision and efficiency",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center"
  },
  {
    icon: "📊",
    title: "Market Insights",
    description: "Stay informed with regularly updated dinar value information",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
  },
  {
    icon: "📈",
    title: "Revaluation Updates",
    description: "Latest developments and expert analysis on Iraqi Dinar revaluation",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center"
  },
  {
    icon: "🎓",
    title: "Educational Resources",
    description: "Comprehensive guides and investment knowledge",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center"
  }
];

// Features data
const features = [
  {
    icon: "⚡",
    title: "Instant Ordering",
    description: "Quick and easy online ordering process"
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    description: "100% secure online payment methods including Poli"
  },
  {
    icon: "🚚",
    title: "Guaranteed Delivery",
    description: "100% guaranteed timely delivery with tracking"
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "Round-the-clock customer service"
  },
  {
    icon: "⭐",
    title: "Proven Reputation",
    description: "Trusted by thousands of customers"
  },
  {
    icon: "🇦🇺",
    title: "Local Company",
    description: "Australian-based company serving AU & NZ"
  }
];

// Testimonials data
const testimonials = [
  {
    name: "Lesley Brown",
    text: "I have been using Dinar Exchange for over 4yrs, never had a problem, very professional. Very trustworthy.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Karen Spencer",
    text: "I have bought 3 lots of currency from Dinar Exchange and have always found them helpful, polite, and professional, and they immediately send me confirmations and when mailed, an AusPost tracking number. I can totally recommend them.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Shelley Maxted",
    text: "Great service, Great prices and speedy delivery. I had a few issues as i use a building society but the lovely customer service lady on Dinar exchange was more than happy to help me out. It is so nice to talk to a real human nowadays and not just a voice recording.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Ben L",
    text: "Repeat customer, all authentic & delivered safely, takes some time to deliver but worth the wait, sit back and be patient. bought in bulk and even received a surprise gift, totally took me off guard lol",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 opacity-10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-header">
                Welcome to Dinar Exchange Australia
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your Premier Hub for Iraqi Dinar Transactions
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              At Dinar Exchange Australia, we stand as your reliable and trusted partner in navigating the intricate world of the Iraqi Dinar. Whether you are an experienced investor in collectible currency items or a hobby currency collector seeking to comprehend Iraqi currency dynamics, our platform is tailored to your diverse needs.
            </p>

            {/* Trustpilot Widget */}
            <div className="mb-8">
              <TrustpilotWidget className="inline-block" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/buy-dinar"
                className="btn-gradient font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Iraqi Dinar
              </motion.a>
              <motion.a
                href="/buy-zim"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Zimbabwe Dollar
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6 gradient-header">Trusted Currency Exchange</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Experience the difference with our professional currency exchange services.
                We provide authentic Iraqi Dinar and Zimbabwe Dollar notes with guaranteed
                delivery and exceptional customer service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">100% Authentic Currency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">ASIC & AUSTRAC Registered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Secure Payment Methods</span>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center"
                alt="Currency Exchange"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 section-bg">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-header">Buy Iraqi Dinars</h2>
            <p className="text-xl text-gray-600">Choose your investment amount</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {pricingTiers.map((tier, idx) => (
              <motion.div
                key={tier.amount}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-primary-500 to-orange-500 text-white scale-105'
                    : 'bg-white border-2 border-gray-100 hover:border-primary-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                    {tier.amount} IQD
                  </div>
                  <div className={`text-xl font-semibold mb-4 ${tier.popular ? 'text-white' : 'text-primary-600'}`}>
                    {tier.price}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                      tier.popular
                        ? 'bg-white text-primary-600 hover:bg-gray-100'
                        : 'btn-gradient'
                    }`}
                  >
                    Order Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
              <p className="text-lg font-semibold text-orange-800 mb-2">
                ⚠️ Limited Stock for 2 Mil Plus Orders
              </p>
              <p className="text-orange-700">
                Please Call or Text <strong>0417 460 236</strong> before placing any order of 2 Million and Above.
                There might be slight delays in shipping.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-header">Our Comprehensive Range of Services</h2>
            <p className="text-xl text-gray-600">Everything you need for successful Iraqi Dinar transactions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 text-4xl">{service.icon}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 gradient-header">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 px-6 section-bg">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-header">Why Choose Dinar Exchange Australia?</h2>
            <p className="text-xl text-gray-600">Melbourne-based local company assisting customers all over Australia and New Zealand</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card hover:-translate-y-2"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2 gradient-header">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        <div className="relative container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Why Invest in Iraqi Dinar?</h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              The Iraqi Dinar is the hottest investment opportunity of this decade. Earlier, the Iraqi Dinar was worth US $3.20 billion,
              and the oil reserves in Iraq are worth over $11.6 trillion. The current value indicates a sharp rise in the value of Iraqi Dinar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <p className="text-lg mb-6">
              Oil prices significantly affect the currency's value, and there is always instability in oil prices.
              Earlier, due to some limitations, Iraq was unable to produce the set amount of barrels each day,
              but now Iraq has the potential to produce a large amount of oil each day.
            </p>
            <p className="text-xl font-semibold">
              Remember, if you invest in Dinar, you invest in your future.
              If you buy Iraqi Dinar now, you will reap lifelong benefits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-header">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of satisfied customers across Australia</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold gradient-header">{testimonial.name}</h3>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        <div className="relative container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Start Your Iraqi Dinar Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Embark on your journey with the Iraqi Dinar at Dinar Exchange Australia.
              Whether you want to exchange currency or stay updated on the latest revaluation news,
              our platform provides the necessary tools and resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.a>
              <motion.a
                href="/resources"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-primary-600 transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Resources
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Vapi Agent Button */}
      <VapiAgentButton />
    </div>
  );
}

'use client';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedText from "../components/AnimatedText";
import TrustpilotWidget from "../components/TrustpilotWidget";
import VapiAgentButton from "../components/VapiAgentButton";
import TrustBadges from '@/components/TrustBadges';
import BuyDinarBento from '@/components/BuyDinarBento';
import Testimonials from '@/components/Testimonials';
import FloatingReviews from '@/components/FloatingReviews';

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
    image: "/money-exchange.webp"
  },
  {
    icon: "📊",
    title: "Market Insights",
    description: "Stay informed with regularly updated dinar value information",
    image: "/reports.webp"
  },
  {
    icon: "📈",
    title: "Revaluation Updates",
    description: "Latest developments and expert analysis on Iraqi Dinar revaluation",
    image: "/man-expressanalytics.webp"
  },
  {
    icon: "🎓",
    title: "Educational Resources",
    description: "Comprehensive guides and investment knowledge",
    image: "/work-culture.webp"
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



export default function Home() {
  const [activeTab, setActiveTab] = useState('buy');
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  // Auto-play slider for features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 opacity-10"></div>
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
              <span className="text-primary-500">Welcome to </span>
              <span className="text-orange-500">Dinar Exchange New Zealand</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your Trusted Gateway to Iraqi Dinar & ZWD Banknotes
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Many collectors across New Zealand hold IQD and ZWD notes in anticipation of a possible revaluation. At Dinar Exchange, we provide secure access to genuine currency notes — delivered fast and backed by trust.
            </p>

            {/* Trust Features */}
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">100% Verified & Authentic Notes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Over 10 Years of Trusted Operations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Secured, Tracked Delivery via NZ Post</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Trusted by Thousands — ASIC & AUSTRAC Registered</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <TrustBadges />

            {/* Trustpilot Widget */}
            <div className="mb-8">
              <TrustpilotWidget className="inline-block" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/buy-dinar"
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Iraqi Dinar
              </motion.a>
              <motion.a
                href="/buy-zim"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Zimbabwe Dollar
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Buy Iraqi Dinars Bento Grid Section */}
      <BuyDinarBento />

      {/* Hero Image Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6 text-orange-500">Trusted Currency Exchange</h2>
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
                src="/trusted-exchange.webp"
                alt="Trusted Currency Exchange"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
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
            <h2 className="text-4xl font-bold mb-4 text-orange-500">Our Comprehensive Range of Services</h2>
            <p className="text-xl text-gray-600">Everything you need for successful Iraqi Dinar transactions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-2 left-2 text-2xl">{service.icon}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-primary-500">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid - Auto-play Slider */}
      <section className="py-20 px-6 section-bg">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-orange-500">Why Choose Dinar Exchange Australia?</h2>
            <p className="text-xl text-gray-600">Melbourne-based local company assisting customers all over Australia and New Zealand</p>
          </motion.div>

          {/* Auto-play Slider */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentFeatureIndex * 100}%)` }}>
                {features.map((feature, idx) => (
                  <div key={feature.title} className="w-full flex-shrink-0">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="card hover:-translate-y-2 text-center p-8 max-w-md mx-auto"
                    >
                      <div className="text-4xl mb-6">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-4 text-primary-500">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentFeatureIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === currentFeatureIndex ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white relative overflow-hidden">
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
            <h2 className="text-4xl font-bold mb-6">Why Invest in Iraqi Dinar?</h2>
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
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 relative overflow-hidden">
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
                className="bg-white text-primary-500 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.a>
              <motion.a
                href="/resources"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-primary-500 transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Resources
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Disclaimer</h3>
              <p className="text-gray-600 leading-relaxed">
                All currencies are sold as collectible items only. We do not provide financial advice or predict future currency values.
              </p>
            </div>
          </div>
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

      {/* Floating Reviews */}
      <FloatingReviews />
    </div>
  );
}

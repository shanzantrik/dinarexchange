'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const dinarOptions = [
  { amount: "25,000", price: "$186", popular: false },
  { amount: "50,000", price: "$281", popular: false },
  { amount: "75,000", price: "$325", popular: true },
  { amount: "100,000", price: "$381", popular: false },
  { amount: "200,000", price: "$656", popular: false },
  { amount: "500,000", price: "$1,875", popular: false },
  { amount: "1,000,000", price: "$2,800", popular: false },
];

export default function BuyDinarBento() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Buy Iraqi Dinars Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-orange-500 mb-2">Buy Iraqi Dinars</h2>
                <p className="text-gray-600">Choose your investment amount with competitive rates</p>
              </div>

              {/* Currency Options Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {dinarOptions.map((option, idx) => (
                  <motion.div
                    key={option.amount}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                      option.popular
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-lg text-gray-900">
                          {option.amount} IQD
                        </div>
                        <div className={`text-xl font-bold ${
                          option.popular ? 'text-orange-600' : 'text-blue-600'
                        }`}>
                          {option.price}
                        </div>
                      </div>
                      <Link href="/buy-dinar">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                            option.popular
                              ? 'bg-orange-500 hover:bg-orange-600 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          Order Now
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Side Information Panels */}
          <div className="space-y-6">
            {/* Buying Dinar Now Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl text-white font-bold">BUYING DINAR NOW</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                We guarantee the best rate for buying Iraqi Dinar with competitive pricing and secure transactions.
              </p>
            </motion.div>

            {/* Our Guarantee Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">100%</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">

                  </div>
                </div>
                <h3 className="text-xl text-white font-bold">OUR GUARANTEE</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                Certificate of authenticity that guarantees the dinars are not counterfeit with 100% money back guarantee.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-blue-900 rounded-2xl shadow-xl p-6 text-white"
        >
          <div className="text-center">
            <p className="text-lg mb-2">
              Please Call Us on <span className="font-bold">1300 856 881</span> or <span className="font-bold">0417 460 236</span>
            </p>
            <p className="text-white/90">
              before placing any order of 2 Million and Above. There might be slight delays in shipping.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

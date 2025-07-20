'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const reviews = [
  {
    name: "Lesley Brown",
    text: "I have been using Dinar Exchange for over 4yrs, never had a problem, very professional. Very trustworthy.",
    rating: 5
  },
  {
    name: "Karen Spencer",
    text: "I have bought 3 lots of currency from Dinar Exchange and have always found them helpful, polite, and professional.",
    rating: 5
  },
  {
    name: "Shelley Maxted",
    text: "Great service, Great prices and speedy delivery. The customer service lady was more than happy to help me out.",
    rating: 5
  },
  {
    name: "Ben L",
    text: "Repeat customer, all authentic & delivered safely, takes some time to deliver but worth the wait.",
    rating: 5
  },
  {
    name: "David M",
    text: "Excellent service and very professional. The delivery was prompt and the currency was in perfect condition.",
    rating: 5
  },
  {
    name: "Sarah W",
    text: "Been a customer for years. Always reliable, always authentic currency. The team is incredibly helpful.",
    rating: 5
  }
];

export default function FloatingReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Show component after a delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      {/* Pulse Animation Background */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-primary-400/20 rounded-2xl blur-sm"
      />

      {/* Main Review Card */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-gray-200/50 max-w-xs">
        {/* Pulse Dot */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(reviews[currentIndex].rating)].map((_, i) => (
              <svg key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-xs text-gray-500 font-medium">Live Review</div>
        </div>

        {/* Review Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <p className="text-sm text-gray-700 leading-relaxed overflow-hidden" style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>
              "{reviews[currentIndex].text}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-gray-900">
            {reviews[currentIndex].name}
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Verified</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-3 flex space-x-1">
          {reviews.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-orange-500' : 'bg-gray-200'
              }`}
              style={{ width: idx === currentIndex ? '20px' : '8px' }}
            />
          ))}
        </div>
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-700 transition-colors"
      >
        ×
      </motion.button>
    </motion.div>
  );
}

'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: "Lesley Brown",
    text: "I have been using Dinar Exchange for over 4yrs, never had a problem, very professional. Very trustworthy.",
    rating: 5,
    date: "2024"
  },
  {
    name: "Karen Spencer",
    text: "I have bought 3 lots of currency from Dinar Exchange and have always found them helpful, polite, and professional, and they immediately send me confirmations and when mailed, an AusPost tracking number. I can totally recommend them.",
    rating: 5,
    date: "2024"
  },
  {
    name: "Shelley Maxted",
    text: "Great service, Great prices and speedy delivery. I had a few issues as i use a building society but the lovely customer service lady on Dinar exchange was more than happy to help me out. It is so nice to talk to a real human nowadays and not just a voice recording.",
    rating: 5,
    date: "2024"
  },
  {
    name: "Ben L",
    text: "Repeat customer, all authentic & delivered safely, takes some time to deliver but worth the wait, sit back and be patient. bought in bulk and even received a surprise gift, totally took me off guard lol",
    rating: 5,
    date: "2024"
  },
  {
    name: "David M",
    text: "Excellent service and very professional. The delivery was prompt and the currency was in perfect condition. Highly recommend!",
    rating: 5,
    date: "2024"
  },
  {
    name: "Sarah W",
    text: "Been a customer for years. Always reliable, always authentic currency. The team is incredibly helpful and responsive.",
    rating: 5,
    date: "2024"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Rating Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center bg-white rounded-2xl px-8 py-6 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-2">
                Overall rating <span className="text-orange-500">4.8</span>
                <span className="text-yellow-500 ml-2">
                  <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
              <div className="text-lg text-gray-600 font-medium">
                Based On Real "Verified Client Reviews"
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={testimonial.name} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Rating Stars */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg text-gray-700 mb-8 leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">Verified Customer</div>
                      </div>
                      <div className="text-sm text-gray-400">{testimonial.date}</div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-orange-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary-50 to-orange-50 rounded-2xl px-6 py-4 border border-primary-100">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">All reviews are verified</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Trusted by thousands</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

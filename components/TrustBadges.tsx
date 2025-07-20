'use client';
import { motion } from 'framer-motion';

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-8">
      {/* 10+ Years Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-32 h-32 bg-primary-500 rounded-full border-4 border-white shadow-lg flex flex-col items-center justify-center text-white">
          <div className="text-xs font-semibold tracking-wide">
            <div className="transform -rotate-12">OVER 10 YEARS</div>
          </div>
          <div className="text-3xl font-bold my-1">10+</div>
          <div className="text-xs font-semibold tracking-wide">
            <div className="transform rotate-12">IN BUSINESS</div>
          </div>
        </div>
      </motion.div>

      {/* NZ Post Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-primary-500 rounded-lg border-2 border-white shadow-lg p-4 text-white">
          <div className="text-xs font-semibold text-center mb-2">DELIVERED VIA</div>
          <div className="bg-white rounded px-3 py-2 flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <span className="text-primary-500 font-bold text-sm">NZ Post</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

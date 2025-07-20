'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo() {
  return (
    <motion.div
      className="relative flex items-center space-x-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src="/logo_new.png"
        alt="Dinar Exchange Logo"
        width={180}
        height={40}
        className="h-10 w-auto"
        priority
      />
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold text-orange-500">New Zealand</span>
        <span className="text-2xl">🇳🇿</span>
      </div>
    </motion.div>
  );
}

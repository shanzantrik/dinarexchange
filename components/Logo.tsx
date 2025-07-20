'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo() {
  return (
    <motion.div
      className="relative flex items-center"
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
    </motion.div>
  );
}

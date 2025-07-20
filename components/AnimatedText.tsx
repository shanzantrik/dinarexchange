'use client';
import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className }: Props) {
  return (
    <motion.h1
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {text}
    </motion.h1>
  );
}

'use client';
import { motion } from 'framer-motion';

const gridData = [
  {
    title: "Fast Shipping",
    desc: "Express delivery Australia & NZ-wide.",
  },
  {
    title: "100% Authentic Notes",
    desc: "Sourced from verified suppliers only.",
  },
  {
    title: "Live Exchange Rates",
    desc: "Best rates, transparently updated daily.",
  },
  {
    title: "Trusted for 10+ Years",
    desc: "Over a decade of excellence since 2012."
  }
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
      {gridData.map((tile, idx) => (
        <motion.div
          key={tile.title}
          className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15, type: "spring" }}
        >
          <h3 className="font-semibold text-lg mb-2">{tile.title}</h3>
          <p className="text-gray-500">{tile.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

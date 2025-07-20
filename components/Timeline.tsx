'use client';
import { motion } from 'framer-motion';

const timelineData = [
  {
    year: "2012",
    title: "Company Founded",
    description: "Started as a small family business in Melbourne"
  },
  {
    year: "2015",
    title: "First 1000 Customers",
    description: "Reached our first major milestone"
  },
  {
    year: "2018",
    title: "ASIC Licensed",
    description: "Became fully licensed and regulated"
  },
  {
    year: "2022",
    title: "50,000+ Customers",
    description: "Served over 50,000 satisfied customers"
  }
];

export default function Timeline() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-yellow-500"></div>
          {timelineData.map((item, idx) => (
            <motion.div
              key={item.year}
              className={`flex items-center mb-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="w-1/2 px-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-yellow-600">{item.year}</h3>
                  <h4 className="text-lg font-semibold mt-2">{item.title}</h4>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full border-4 border-white shadow-lg"></div>
              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

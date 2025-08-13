
import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';

export const TestimonialsSection: React.FC = () => {
  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        🗣️ Ce que disent nos utilisateurs
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <TestimonialsCarousel />
      </div>
    </motion.section>
  );
};

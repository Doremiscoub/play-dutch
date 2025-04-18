
import React from 'react';
import { motion } from 'framer-motion';

interface SetupCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export default function SetupCard({ title, children, delay = 0 }: SetupCardProps) {
  const transitionProps = {
    type: "spring",
    stiffness: 260,
    damping: 20
  };
  
  return (
    <motion.div 
      className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden p-6"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...transitionProps, delay }}
      whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
    >
      <h2 className="text-xl font-semibold mb-4 text-dutch-blue">{title}</h2>
      {children}
    </motion.div>
  );
}

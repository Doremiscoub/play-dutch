
import React from 'react';
import { Diamond, Heart, Club, Spade } from 'lucide-react';
import { motion } from 'framer-motion';

const suits = [
  { icon: Diamond, color: "text-dutch-blue" },
  { icon: Heart, color: "text-dutch-orange" },
  { icon: Club, color: "text-dutch-purple" },
  { icon: Spade, color: "text-dutch-purple" }
];

export const SparkleIcon = () => {
  // Sélection aléatoire d'une suite de cartes
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const Icon = randomSuit.icon;

  return (
    <motion.div
      className={`absolute -top-2 -right-6 ${randomSuit.color}`}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [-20, 0, -20],
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Icon size={24} className="drop-shadow-md" fill="currentColor" />
    </motion.div>
  );
};

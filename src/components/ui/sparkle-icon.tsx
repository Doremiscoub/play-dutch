
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
  // Sélection aléatoire de deux suites de cartes différentes
  const randomSuits = suits
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <div className="relative inline-flex ml-2">
      {randomSuits.map((suit, index) => {
        const Icon = suit.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${index === 0 ? '-top-5 -right-4' : '-top-6 right-0'} ${suit.color}`}
            initial={{ scale: 0, rotate: index === 0 ? -20 : 20 }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: index === 0 ? [-20, 0, -20] : [20, 0, 20],
            }}
            transition={{ 
              duration: 2,
              delay: index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon size={24} className="drop-shadow-md" fill="currentColor" />
          </motion.div>
        );
      })}
    </div>
  );
};

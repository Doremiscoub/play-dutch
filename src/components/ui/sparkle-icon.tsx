
import React, { useEffect, useState } from 'react';
import { Diamond, Heart, Club, Spade } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const suits = [
  { icon: Diamond, color: "text-dutch-blue/80" },
  { icon: Heart, color: "text-dutch-orange/80" },
  { icon: Club, color: "text-dutch-purple/80" },
  { icon: Spade, color: "text-dutch-purple/80" }
];

export const SparkleIcon = () => {
  const [currentSuits, setCurrentSuits] = useState(() => 
    suits.sort(() => 0.5 - Math.random()).slice(0, 2)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuits(suits.sort(() => 0.5 - Math.random()).slice(0, 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-flex">
      <AnimatePresence mode="wait">
        {currentSuits.map((suit, index) => {
          const Icon = suit.icon;
          return (
            <motion.div
              key={`${index}-${suit.icon.name}`}
              className={`absolute ${index === 0 ? '-top-4 -right-4' : '-top-6 right-0'} ${suit.color}`}
              initial={{ scale: 0.6, rotate: index === 0 ? -15 : 15, opacity: 0 }}
              animate={{ 
                scale: [0.6, 1, 0.9],
                rotate: index === 0 ? [-15, 5, -10] : [15, -5, 10],
                opacity: [0, 1, 0.9]
              }}
              exit={{ 
                scale: 0.6,
                opacity: 0,
                transition: { duration: 0.4 }
              }}
              transition={{ 
                duration: 1.2,
                ease: "easeInOut"
              }}
            >
              <Icon size={20} className="drop-shadow-lg" fill="currentColor" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};


import React, { useEffect, useState } from 'react';
import { Diamond, Heart, Club, Spade } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const suits = [
  { icon: Diamond, color: "text-dutch-blue/70" },
  { icon: Heart, color: "text-dutch-orange/70" },
  { icon: Club, color: "text-dutch-purple/70" },
  { icon: Spade, color: "text-dutch-purple/70" }
];

export const SparkleIcon = () => {
  const [currentSuits, setCurrentSuits] = useState(() => 
    suits.sort(() => 0.5 - Math.random()).slice(0, 2)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuits(suits.sort(() => 0.5 - Math.random()).slice(0, 2));
    }, 4000); // Increased interval for smoother feeling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-flex ml-2">
      <AnimatePresence mode="wait">
        {currentSuits.map((suit, index) => {
          const Icon = suit.icon;
          return (
            <motion.div
              key={`${index}-${suit.icon.name}`}
              className={`absolute ${index === 0 ? '-top-5 -right-4' : '-top-6 right-0'} ${suit.color}`}
              initial={{ scale: 0.8, rotate: index === 0 ? -20 : 20, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1],
                rotate: index === 0 ? [-20, 0, -20] : [20, 0, 20],
                opacity: 1
              }}
              exit={{ 
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.4 }
              }}
              transition={{ 
                duration: 3,
                delay: index * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon size={24} className="drop-shadow-md" fill="currentColor" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

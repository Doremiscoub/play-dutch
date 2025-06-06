
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface FloatingWinnerBadgeProps {
  isWinner: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
}

const FloatingWinnerBadge: React.FC<FloatingWinnerBadgeProps> = ({ isWinner, cardRef }) => {
  if (!isWinner) return null;

  return (
    <AnimatePresence>
      {isWinner && (
        <motion.div
          className="absolute -top-2 -right-2 z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -4, 0] // Simplifié à 3 keyframes
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-full p-2 shadow-lg border-2 border-white">
            <Trophy className="h-4 w-4" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWinnerBadge;

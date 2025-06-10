
import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '@/hooks/useAchievements';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-yellow-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      className={`fixed top-20 right-4 z-50 bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white p-4 rounded-xl shadow-2xl max-w-sm`}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">Achievement Débloqué !</h3>
          <p className="font-semibold">{achievement.name}</p>
          <p className="text-sm opacity-90">{achievement.description}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-xl leading-none"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
};

export default AchievementToast;

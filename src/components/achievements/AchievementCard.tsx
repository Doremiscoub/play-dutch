
import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '@/types/achievements';
import { GameBadge } from '@/components/ui/game-badge';
import { Progress } from '@/components/ui/progress';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Trophy, Star, Crown, Target, Zap, TrendingUp 
} from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  crown: Crown,
  target: Target,
  zap: Zap,
  'trending-up': TrendingUp,
};

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index }) => {
  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;
  
  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 via-yellow-500 to-yellow-600';
      case 'epic': return 'from-purple-400 via-purple-500 to-purple-600';
      case 'rare': return 'from-blue-400 via-blue-500 to-blue-600';
      default: return 'from-gray-400 via-gray-500 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-300';
      case 'epic': return 'border-purple-300';
      case 'rare': return 'border-blue-300';
      default: return 'border-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={`
        relative bg-white/80 backdrop-blur-sm rounded-2xl border-2 ${getRarityBorder(achievement.rarity)}
        shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden
        ${achievement.unlocked ? '' : 'opacity-60'}
      `}
    >
      {/* Rarity background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGradient(achievement.rarity)} opacity-5`} />
      
      {/* Shimmer effect for unlocked achievements */}
      {achievement.unlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
      )}
      
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            bg-gradient-to-br ${getRarityGradient(achievement.rarity)}
            shadow-md
          `}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-800 truncate">{achievement.name}</h3>
              <GameBadge
                type={achievement.rarity as any}
                size="xs"
                effect={achievement.unlocked ? 'glow' : 'none'}
              />
            </div>
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {achievement.description}
            </p>
            
            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progression</span>
                <span>{Math.round(achievement.progress)}%</span>
              </div>
              <Progress 
                value={achievement.progress} 
                className="h-2"
              />
            </div>
            
            {/* Reward info */}
            {achievement.reward && (
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Star className="h-3 w-3" />
                <span>{achievement.reward.xp} XP</span>
                {achievement.reward.title && (
                  <span className="text-dutch-purple font-medium">
                    • Titre: {achievement.reward.title}
                  </span>
                )}
              </div>
            )}
            
            {/* Unlock date */}
            {achievement.unlocked && achievement.unlockedAt && (
              <div className="text-xs text-green-600 mt-1">
                Débloqué {formatDistanceToNow(achievement.unlockedAt, { 
                  addSuffix: true, 
                  locale: fr 
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

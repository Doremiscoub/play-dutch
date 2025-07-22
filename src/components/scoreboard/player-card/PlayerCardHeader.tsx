
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';

interface PlayerCardHeaderProps {
  player: Player;
  rank: number;
  isWinner: boolean;
  colors: {
    gradient: string;
    border: string;
    glow: string;
    text: string;
  };
  scoreLimit: number;
}

const PlayerCardHeader: React.FC<PlayerCardHeaderProps> = ({
  player,
  rank,
  isWinner,
  colors,
  scoreLimit
}) => {
  const getRankEmoji = () => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🎯';
    }
  };

  const getRankBadgeColors = () => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-amber-500 text-white';
      case 2: return 'from-gray-300 to-gray-400 text-gray-800';
      case 3: return 'from-amber-600 to-amber-700 text-white';
      default: return 'from-blue-500 to-purple-500 text-white';
    }
  };

  const dutchCount = player.rounds.filter(round => round.isDutch).length;
  const averageScore = player.rounds.length > 0 
    ? (player.totalScore / player.rounds.length).toFixed(1)
    : '0';

  return (
    <div className="flex items-center gap-4">
      {/* Badge de rang animé */}
      <motion.div
        className={cn(
          "relative flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-lg shadow-lg border-2 border-white/30",
          `bg-gradient-to-br ${getRankBadgeColors()}`
        )}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: rank * 0.05, type: "spring", stiffness: 200 }}
        whileHover={{ 
          scale: 1.1, 
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.5 }
        }}
      >
        <span className="text-base font-black">{rank}</span>
        {/* Emoji flottant */}
        <motion.div
          className="absolute -top-1 -right-1 text-lg"
          animate={{ 
            y: [0, -2, 0],
            rotate: isWinner ? [0, 10, -10, 0] : 0
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {getRankEmoji()}
        </motion.div>
      </motion.div>

      {/* Avatar avec emoji du joueur */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div 
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border-2 border-white/50 shadow-lg flex items-center justify-center text-2xl relative overflow-hidden"
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">{player.emoji || '🎮'}</span>
        </motion.div>
        
        {/* Indicateur Dutch si présent */}
        {dutchCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border border-white/50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
          >
            🏆{dutchCount}
          </motion.div>
        )}
      </motion.div>

      {/* Informations du joueur */}
      <div className="flex-1 min-w-0">
        <motion.h3 
          className={cn(
            "text-xl font-black truncate mb-1 flex items-center gap-2",
            colors.text
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: rank * 0.05 + 0.1 }}
        >
          {isWinner && (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="text-xl"
            >
              👑
            </motion.span>
          )}
          {player.name}
          {isWinner && (
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl"
            >
              ⭐
            </motion.span>
          )}
        </motion.h3>
        
        {/* Métriques rapides avec emojis */}
        <div className="flex items-center gap-3 text-sm">
          <motion.span 
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: rank * 0.05 + 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            🎯 {player.rounds.length}
          </motion.span>
          
          <motion.span 
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: rank * 0.05 + 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            📊 {averageScore}
          </motion.span>
        </div>
      </div>

      {/* Score principal stylé */}
      <motion.div 
        className="text-right"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: rank * 0.05 + 0.2, type: "spring" }}
      >
        <motion.div 
          className={cn(
            "text-4xl font-black mb-1",
            isWinner 
              ? "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent" 
              : colors.text
          )}
          animate={isWinner ? { scale: [1, 1.05, 1] } : {}}
          transition={{
            duration: 3,
            repeat: isWinner ? Infinity : 0,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
        >
          {player.totalScore}
        </motion.div>
        
        {/* Barre de progression colorée */}
        <div className="w-16 bg-white/30 rounded-full h-1.5 mb-1 overflow-hidden">
          <motion.div 
            className={cn(
              "h-full rounded-full",
              isWinner 
                ? "bg-gradient-to-r from-yellow-400 to-amber-500" 
                : `bg-gradient-to-r ${colors.gradient.replace('/30', '').replace('/25', '').replace('/20', '')}`
            )}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((player.totalScore / scoreLimit) * 100, 100)}%` }}
            transition={{ delay: rank * 0.05 + 0.4, duration: 0.8 }}
          />
        </div>
        
        <div className="text-xs text-gray-500 font-medium">
          /{scoreLimit} pts
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerCardHeader;

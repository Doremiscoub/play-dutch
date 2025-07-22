
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import PlayerCardHeader from './PlayerCardHeader';
import PlayerCardStats from './PlayerCardStats';
import PlayerCardRecentRounds from './PlayerCardRecentRounds';

interface ModernPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isSelected: boolean;
  scoreLimit?: number;
}

const ModernPlayerCard: React.FC<ModernPlayerCardProps> = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isSelected,
  scoreLimit = 100
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isWinner = rank === 1;
  const isLastPlace = rank === totalPlayers;
  
  // Système de couleurs par rang - plus vibrant et playful
  const getRankColors = () => {
    switch (rank) {
      case 1:
        return {
          gradient: "from-purple-500/30 via-pink-500/25 to-purple-600/20",
          border: "border-purple-400/60",
          glow: "shadow-purple-500/20",
          text: "text-purple-700"
        };
      case 2:
        return {
          gradient: "from-orange-500/30 via-red-500/25 to-orange-600/20",
          border: "border-orange-400/60",
          glow: "shadow-orange-500/20",
          text: "text-orange-700"
        };
      case 3:
        return {
          gradient: "from-cyan-500/30 via-blue-500/25 to-cyan-600/20",
          border: "border-cyan-400/60",
          glow: "shadow-cyan-500/20",
          text: "text-cyan-700"
        };
      case 4:
        return {
          gradient: "from-green-500/30 via-emerald-500/25 to-green-600/20",
          border: "border-green-400/60",
          glow: "shadow-green-500/20",
          text: "text-green-700"
        };
      case 5:
        return {
          gradient: "from-yellow-500/30 via-amber-500/25 to-yellow-600/20",
          border: "border-yellow-400/60",
          glow: "shadow-yellow-500/20",
          text: "text-yellow-700"
        };
      default:
        return {
          gradient: "from-pink-500/30 via-purple-500/25 to-pink-600/20",
          border: "border-pink-400/60",
          glow: "shadow-pink-500/20",
          text: "text-pink-700"
        };
    }
  };

  const colors = getRankColors();
  
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 cursor-pointer overflow-hidden group",
        `bg-gradient-to-br ${colors.gradient}`,
        colors.border,
        isSelected || isExpanded 
          ? `ring-4 ring-purple-400/50 scale-[1.02] z-10 ${colors.glow} shadow-2xl` 
          : `hover:scale-[1.01] hover:shadow-xl hover:-translate-y-1 ${colors.glow}`
      )}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: rank * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Effet de brillance subtil */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8 }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 p-6">
        {/* Header avec avatar, nom, score */}
        <PlayerCardHeader
          player={player}
          rank={rank}
          isWinner={isWinner}
          colors={colors}
          scoreLimit={scoreLimit}
        />

        {/* Stats compactes toujours visibles */}
        <div className="mt-4">
          <PlayerCardStats 
            player={player} 
            rank={rank} 
            compact={!isExpanded}
            colors={colors}
          />
        </div>

        {/* Indicateur d'expansion */}
        <motion.div
          className="flex justify-center mt-3"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
              `bg-white/20 ${colors.border} ${colors.text}`
            )}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? '🔼 Moins' : '🔽 Plus'}
          </motion.div>
        </motion.div>

        {/* Contenu étendu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 pt-4 border-t border-white/20"
            >
              <PlayerCardRecentRounds 
                player={player} 
                rank={rank}
                colors={colors}
              />
              
              {/* Badge spécial pour le gagnant */}
              {isWinner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-3 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 border border-yellow-400/40 rounded-xl text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-yellow-700 font-bold">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="text-lg"
                    >
                      👑
                    </motion.span>
                    Champion de la partie !
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-lg"
                    >
                      🎉
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default React.memo(ModernPlayerCard);

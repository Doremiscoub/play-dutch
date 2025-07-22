import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star, TrendingUp, Trophy } from 'lucide-react';
import { Player } from '@/types';
import PlayerRankBadge from '../../game/PlayerRankBadge';
import PlayerCardStats from './PlayerCardStats';
import PlayerCardTrends from './PlayerCardTrends';
import PlayerCardRecentRounds from './PlayerCardRecentRounds';
import PlayerCardScore from './PlayerCardScore';
import { cn } from '@/lib/utils';

interface PlayerCardContentProps {
  player: Player;
  rank: number;
  isExpanded: boolean;
  cardData: {
    isWinner: boolean;
    isLastPlace: boolean;
    recentRounds: any[];
    hasPositiveTrend: boolean;
    hasNegativeTrend: boolean;
    dutchCount: number;
    currentStreak: number;
  };
}

const PlayerCardContent: React.FC<PlayerCardContentProps> = ({
  player,
  rank,
  isExpanded,
  cardData
}) => {
  return (
    <div className="space-y-4">
      {/* En-tête principal avec informations compactes */}
      <div className="flex items-center gap-4">
        {/* Badge de rang avec animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: rank * 0.1, type: "spring", stiffness: 200 }}
        >
          <PlayerRankBadge 
            position={rank} 
            size="lg" 
            showAnimation={true}
          />
        </motion.div>
        
        {/* Informations du joueur */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <motion.div 
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border-2 border-white/50 shadow-lg flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ type: "spring", stiffness: 300, duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-3xl relative z-10">{player.emoji || '🎮'}</span>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3 
              className={cn(
                "text-xl font-black truncate flex items-center gap-2 mb-1",
                rank === 1 ? "text-purple-700" :
                rank === 2 ? "text-orange-700" :
                rank === 3 ? "text-cyan-700" :
                "text-gray-800"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rank * 0.1 + 0.2 }}
            >
              {cardData.isWinner && '👑 '}{player.name}
              {cardData.isWinner && (
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  ⭐
                </motion.span>
              )}
            </motion.h3>
            
            {/* Tendances rapides avec émojis */}
            <div className="flex items-center gap-3 text-sm">
              <motion.span 
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100/80 text-purple-700"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: rank * 0.1 + 0.3 }}
              >
                🎯 {player.rounds.length} manches
              </motion.span>
              {cardData.dutchCount > 0 && (
                <motion.span 
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100/80 text-orange-700"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: rank * 0.1 + 0.4 }}
                  whileHover={{ scale: 1.1 }}
                >
                  🏆 {cardData.dutchCount} Dutch
                </motion.span>
              )}
              {cardData.hasPositiveTrend && (
                <motion.span 
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100/80 text-green-700"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: rank * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  🔥 En forme
                </motion.span>
              )}
            </div>
          </div>
        </div>

        {/* Score principal avec mise en valeur colorée */}
        <motion.div 
          className="text-right"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: rank * 0.1 + 0.3, type: "spring" }}
        >
          <div className={cn(
            "text-4xl font-black mb-1",
            rank === 1 ? "text-purple-600" :
            rank === 2 ? "text-orange-600" :
            rank === 3 ? "text-cyan-600" :
            "text-gray-700"
          )}>
            {player.totalScore}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            📊 Moy: {(player.totalScore / Math.max(1, player.rounds.length)).toFixed(1)}
          </div>
        </motion.div>

        {/* Indicateur d'expansion avec emoji */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
        >
          <span className={cn(
            "text-2xl transition-all duration-300",
            isExpanded ? "rotate-180" : ""
          )}>
            {isExpanded ? '🔼' : '🔽'}
          </span>
        </motion.div>
      </div>

      {/* Contenu étendu avec AnimatePresence corrigée */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded-content"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-200/50 pt-4"
          >
            <div className="space-y-4">
              {/* Statistiques détaillées */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <PlayerCardStats player={player} rank={rank} />
              </motion.div>
              
              {/* Manches récentes */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PlayerCardRecentRounds player={player} rank={rank} />
              </motion.div>

              {/* Informations supplémentaires pour le gagnant */}
              {cardData.isWinner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-3"
                >
                  <div className="flex items-center gap-2 text-amber-700">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">🎉 Champion de cette partie !</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayerCardContent;

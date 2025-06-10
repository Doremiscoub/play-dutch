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
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <motion.span 
            className="text-2xl"
            whileHover={{ scale: 1.2, rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {player.emoji || '😊'}
          </motion.span>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 truncate flex items-center gap-2">
              {player.name}
              {cardData.isWinner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                </motion.div>
              )}
            </h3>
            
            {/* Tendances rapides */}
            <div className="flex items-center gap-2 mt-1">
              <PlayerCardTrends
                player={player}
                hasPositiveTrend={cardData.hasPositiveTrend}
                hasNegativeTrend={cardData.hasNegativeTrend}
                dutchCount={cardData.dutchCount}
                currentStreak={cardData.currentStreak}
              />
            </div>
          </div>
        </div>

        {/* Score principal avec mise en valeur */}
        <PlayerCardScore
          score={player.totalScore}
          rank={rank}
          roundCount={player.rounds.length}
          isWinner={cardData.isWinner}
        />

        {/* Indicateur d'expansion */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown 
            className={cn(
              "h-6 w-6 text-gray-400 transition-all duration-300 cursor-pointer hover:text-dutch-blue",
              isExpanded ? "rotate-180 text-dutch-blue" : ""
            )}
          />
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

import React, { useMemo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { Crown, Star, ChevronDown } from 'lucide-react';
import PlayerRankBadge from '../game/PlayerRankBadge';
import PlayerCardStats from './player-card/PlayerCardStats';
import PlayerCardTrends from './player-card/PlayerCardTrends';
import PlayerCardRecentRounds from './player-card/PlayerCardRecentRounds';
import PlayerCardScore from './player-card/PlayerCardScore';
import { cn } from '@/lib/utils';

interface FunPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isSelected: boolean;
}

const FunPlayerCard: React.FC<FunPlayerCardProps> = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isSelected
}) => {
  console.log('FunPlayerCard: Rendering card for', player.name);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Memoïser les calculs coûteux
  const cardData = useMemo(() => {
    const isWinner = rank === 1;
    const isLastPlace = rank === totalPlayers;
    const recentRounds = player.rounds.slice(-5);
    
    // Calculs de tendance
    const hasPositiveTrend = recentRounds.length >= 2 && 
      recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;
    const hasNegativeTrend = recentRounds.length >= 2 && 
      recentRounds[recentRounds.length - 1].score > recentRounds[recentRounds.length - 2].score;

    const dutchCount = player.rounds.filter(round => round.isDutch).length;
    
    // Calcul de la série actuelle
    const currentStreak = (() => {
      if (player.rounds.length === 0) return 0;
      let streak = 1;
      const lastScore = player.rounds[player.rounds.length - 1].score;
      
      for (let i = player.rounds.length - 2; i >= 0; i--) {
        if (player.rounds[i].score <= lastScore + 5 && player.rounds[i].score >= lastScore - 5) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    })();

    return {
      isWinner,
      isLastPlace,
      recentRounds,
      hasPositiveTrend,
      hasNegativeTrend,
      dutchCount,
      currentStreak
    };
  }, [player.rounds, rank, totalPlayers]);

  const getCardStyle = useCallback(() => {
    if (cardData.isWinner) {
      return "bg-gradient-to-br from-amber-100/90 via-yellow-50/90 to-amber-100/90 border-amber-300/60 shadow-amber-200/30 ring-2 ring-amber-300/30";
    }
    if (cardData.isLastPlace && totalPlayers > 2) {
      return "bg-gradient-to-br from-red-50/90 via-pink-50/90 to-red-50/90 border-red-200/60 shadow-red-100/30";
    }
    return "bg-gradient-to-br from-white/90 via-gray-50/70 to-white/90 border-white/60";
  }, [cardData.isWinner, cardData.isLastPlace, totalPlayers]);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    onSelect(player);
  }, [isExpanded, onSelect, player]);

  return (
    <motion.div
      className={cn(
        "relative rounded-3xl backdrop-blur-xl border shadow-xl transition-all duration-300 cursor-pointer overflow-hidden",
        getCardStyle(),
        isSelected || isExpanded ? "ring-4 ring-dutch-blue/40 shadow-2xl scale-[1.02]" : "hover:scale-[1.01] hover:shadow-2xl"
      )}
      onClick={handleCardClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.1 }}
    >
      {/* Effet de brillance pour le gagnant */}
      {cardData.isWinner && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "linear"
          }}
        />
      )}

      {/* Couronne pour le gagnant */}
      {cardData.isWinner && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, scale: 0, rotate: -180, y: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-amber-200/50">
              <Crown className="h-8 w-8 text-amber-500 drop-shadow-sm" />
            </div>
            <motion.div
              className="absolute -inset-2 z-50"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Star className="h-12 w-12 text-amber-400 opacity-30" />
            </motion.div>
          </div>
        </motion.div>
      )}

      <div className="relative z-10 p-4">
        {/* Vue compacte par défaut */}
        <div className="flex items-center gap-4">
          <PlayerRankBadge 
            position={rank} 
            size="lg" 
            showAnimation={true}
          />
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl">{player.emoji || '😊'}</span>
            <h3 className="text-xl font-bold text-gray-800 truncate">
              {player.name}
            </h3>
          </div>

          <PlayerCardScore
            score={player.totalScore}
            rank={rank}
            roundCount={player.rounds.length}
            isWinner={cardData.isWinner}
          />

          <ChevronDown 
            className={cn(
              "h-6 w-6 text-gray-400 transition-transform duration-300 ml-2",
              isExpanded ? "rotate-180" : ""
            )}
          />
        </div>

        {/* Contenu étendu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <div className="space-y-4">
                {/* Tendances et statistiques */}
                <PlayerCardTrends
                  player={player}
                  hasPositiveTrend={cardData.hasPositiveTrend}
                  hasNegativeTrend={cardData.hasNegativeTrend}
                  dutchCount={cardData.dutchCount}
                  currentStreak={cardData.currentStreak}
                />
                
                <PlayerCardStats player={player} rank={rank} />
                
                <PlayerCardRecentRounds player={player} rank={rank} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default React.memo(FunPlayerCard, (prevProps, nextProps) => {
  // Comparaison personnalisée pour éviter les re-renders inutiles
  return (
    prevProps.player.id === nextProps.player.id &&
    prevProps.player.totalScore === nextProps.player.totalScore &&
    prevProps.player.rounds.length === nextProps.player.rounds.length &&
    prevProps.rank === nextProps.rank &&
    prevProps.totalPlayers === nextProps.totalPlayers &&
    prevProps.isSelected === nextProps.isSelected
  );
});

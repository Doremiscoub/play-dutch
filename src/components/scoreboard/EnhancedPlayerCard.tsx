
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import { ChevronDown, TrendingUp, TrendingDown, Award, Target } from 'lucide-react';
import FloatingWinnerBadge from './FloatingWinnerBadge';
import PlayerCardScore from './player-card/PlayerCardScore';

interface EnhancedPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isSelected: boolean;
  scoreLimit: number;
}

const EnhancedPlayerCard: React.FC<EnhancedPlayerCardProps> = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isSelected,
  scoreLimit
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isWinner = rank === 1;
  const isLastPlace = rank === totalPlayers;
  const isNearThreshold = player.totalScore >= scoreLimit * 0.8;
  
  // Calculs des statistiques
  const average = player.rounds.length > 0 
    ? Math.round((player.totalScore / player.rounds.length) * 10) / 10 
    : 0;
  
  const dutchCount = player.rounds.filter(round => round.isDutch).length;
  const bestRound = player.rounds.length > 0 
    ? Math.min(...player.rounds.map(r => r.score)) 
    : 0;
  const worstRound = player.rounds.length > 0 
    ? Math.max(...player.rounds.map(r => r.score)) 
    : 0;

  // Tendance récente
  const recentRounds = player.rounds.slice(-3);
  const hasPositiveTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;

  const getCardStyle = () => {
    if (isWinner) {
      return "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-yellow-300/60 shadow-yellow-200/30";
    }
    if (isLastPlace) {
      return "bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 border-red-200/60 shadow-red-100/30";
    }
    if (rank <= 3) {
      return "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-200/60 shadow-green-100/30";
    }
    return "bg-white/80 border-white/60 shadow-gray-100/30";
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl backdrop-blur-xl border-2 shadow-lg transition-all duration-500 cursor-pointer overflow-hidden group",
        getCardStyle(),
        isSelected || isExpanded ? "ring-2 ring-dutch-blue/40 shadow-xl scale-[1.02] border-dutch-blue/30" : "hover:scale-[1.01] hover:shadow-xl hover:-translate-y-1"
      )}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: rank * 0.05
      }}
      whileHover={{ y: -2 }}
    >
      {/* Effets de fond subtils */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div 
          className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-dutch-purple/10 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Badge de rang */}
      <motion.div
        className="absolute -top-3 -left-3 bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange text-white text-lg font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-white/90"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: rank * 0.05 + 0.3, 
          type: "spring", 
          stiffness: 200
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {rank}
      </motion.div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          {/* Informations joueur */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{player.emoji || '😊'}</span>
              <h3 className={cn(
                "text-xl font-bold",
                isWinner && "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent",
                isLastPlace && "text-red-700",
                !isWinner && !isLastPlace && "text-gray-800"
              )}>
                {player.name}
              </h3>
              
              {hasPositiveTrend && (
                <motion.div
                  className="flex items-center text-green-600"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingDown className="h-4 w-4" />
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>Moy: {average}</span>
              </div>
              <span>Meilleur: {bestRound}</span>
              {dutchCount > 0 && (
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-orange-600" />
                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {dutchCount} Dutch
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Score et expansion */}
          <div className="flex items-center gap-3">
            <PlayerCardScore
              score={player.totalScore}
              rank={rank}
              roundCount={player.rounds.length}
              isWinner={isWinner}
            />
            
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-gray-400 transition-transform duration-300",
                isExpanded ? "rotate-180" : ""
              )}
            />
          </div>
        </div>

        {/* Barre de progression */}
        {player.rounds.length > 0 && (
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (player.totalScore / scoreLimit) * 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Contenu étendu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 pt-4 border-t border-gray-200/50"
            >
              {/* Statistiques détaillées */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-dutch-blue">{bestRound}</div>
                  <div className="text-xs text-gray-600">Meilleur</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-red-500">{worstRound}</div>
                  <div className="text-xs text-gray-600">Pire</div>
                </div>
              </div>

              {/* Dernières manches */}
              {player.rounds.length > 0 && (
                <div>
                  <div className="text-xs text-gray-500 mb-2">Dernières manches :</div>
                  <div className="flex gap-2 flex-wrap">
                    {player.rounds.slice(-8).map((round, index) => (
                      <motion.div
                        key={index}
                        className={cn(
                          "px-2 py-1 rounded text-xs font-medium min-w-[32px] text-center",
                          round.score <= 10 && "bg-green-100 text-green-700",
                          round.score > 10 && round.score <= 20 && "bg-yellow-100 text-yellow-700",
                          round.score > 20 && "bg-red-100 text-red-700",
                          round.isDutch && "ring-2 ring-orange-400"
                        )}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {round.score}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Badge gagnant flottant */}
      <FloatingWinnerBadge isWinner={isWinner} cardRef={React.createRef()} />
    </motion.div>
  );
};

export default React.memo(EnhancedPlayerCard);

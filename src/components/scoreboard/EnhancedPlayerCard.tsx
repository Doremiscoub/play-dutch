
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
      return "bg-gradient-to-br from-dutch-orange/10 via-yellow-50/80 to-amber-50/60 border-dutch-orange/30 shadow-lg backdrop-blur-xl";
    }
    if (isLastPlace) {
      return "bg-gradient-to-br from-red-50/80 via-pink-50/60 to-rose-50/40 border-red-300/40 shadow-lg backdrop-blur-xl";
    }
    if (rank <= 3) {
      return "bg-gradient-to-br from-dutch-green/10 via-emerald-50/80 to-teal-50/60 border-dutch-green/30 shadow-lg backdrop-blur-xl";
    }
    return "bg-white/80 border-white/60 shadow-lg backdrop-blur-xl";
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden group",
        getCardStyle(),
        isSelected || isExpanded ? "ring-2 ring-dutch-blue/50 shadow-2xl scale-[1.02] border-dutch-blue/40" : "hover:scale-[1.01] hover:shadow-xl hover:-translate-y-1"
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
      {/* Effets de fond glassmorphisme */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div 
          className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-dutch-blue/15 via-dutch-purple/10 to-dutch-orange/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-dutch-purple/10 via-dutch-orange/10 to-dutch-blue/15 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Badge de rang amélioré */}
      <motion.div
        className="absolute -top-4 -left-4 bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange text-white text-xl font-black rounded-full w-14 h-14 flex items-center justify-center shadow-2xl border-3 border-white/90 backdrop-blur-sm"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: rank * 0.05 + 0.3, 
          type: "spring", 
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ scale: 1.15, rotate: 5 }}
      >
        {rank}
      </motion.div>

      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between">
          {/* Informations joueur avec design amélioré */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm">
                <span className="text-3xl">{player.emoji || '😊'}</span>
              </div>
              <div className="flex-1">
                <h3 className={cn(
                  "text-2xl font-black tracking-tight",
                  isWinner && "bg-gradient-to-r from-dutch-orange via-yellow-600 to-amber-600 bg-clip-text text-transparent",
                  isLastPlace && "text-red-600",
                  !isWinner && !isLastPlace && "text-gray-800"
                )}>
                  {player.name}
                </h3>
                
                {hasPositiveTrend && (
                  <motion.div
                    className="flex items-center gap-1 text-dutch-green mt-1"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm font-medium">En progression</span>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/40">
                <Target className="h-4 w-4 text-dutch-blue" />
                <span className="font-semibold text-gray-700">Moy: {average}</span>
              </div>
              <div className="bg-white/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/40">
                <span className="font-semibold text-dutch-green">Meilleur: {bestRound}</span>
              </div>
              {dutchCount > 0 && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-dutch-orange/20 to-dutch-orange/10 backdrop-blur-sm px-3 py-2 rounded-xl border border-dutch-orange/30">
                  <Award className="h-4 w-4 text-dutch-orange" />
                  <span className="font-bold text-dutch-orange">
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
            
            <motion.div
              className="p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              <ChevronDown 
                className={cn(
                  "h-6 w-6 text-dutch-blue transition-transform duration-300",
                  isExpanded ? "rotate-180" : ""
                )}
              />
            </motion.div>
          </div>
        </div>

        {/* Barre de progression améliorée */}
        {player.rounds.length > 0 && (
          <div className="mt-6 relative">
            <div className="text-xs text-gray-600 mb-2 font-medium">
              Progression vers la limite ({scoreLimit} pts)
            </div>
            <div className="h-3 bg-gray-200/80 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (player.totalScore / scoreLimit) * 100)}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 text-right">
              {Math.round((player.totalScore / scoreLimit) * 100)}%
            </div>
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
              className="overflow-hidden mt-6 pt-6 border-t border-white/30"
            >
              {/* Statistiques détaillées avec design amélioré */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-dutch-green/20 to-dutch-green/10 backdrop-blur-sm rounded-xl p-4 text-center border border-dutch-green/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-black text-dutch-green">{bestRound}</div>
                  <div className="text-sm font-medium text-gray-600">Meilleur score</div>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-red-100/80 to-red-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-red-200/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-black text-red-600">{worstRound}</div>
                  <div className="text-sm font-medium text-gray-600">Pire score</div>
                </motion.div>
              </div>

              {/* Dernières manches */}
              {player.rounds.length > 0 && (
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Historique des manches :</div>
                  <div className="flex gap-2 flex-wrap">
                    {player.rounds.slice(-8).map((round, index) => (
                      <motion.div
                        key={index}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm font-bold min-w-[40px] text-center backdrop-blur-sm border shadow-sm",
                          round.score <= 10 && "bg-dutch-green/20 text-dutch-green border-dutch-green/30",
                          round.score > 10 && round.score <= 20 && "bg-yellow-100/80 text-yellow-700 border-yellow-300/50",
                          round.score > 20 && "bg-red-100/80 text-red-700 border-red-300/50",
                          round.isDutch && "ring-2 ring-dutch-orange shadow-dutch-orange/30"
                        )}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {round.score}
                        {round.isDutch && <div className="text-xs text-dutch-orange font-black">★</div>}
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


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
      return "card-kids-orange shadow-glow-orange";
    }
    if (isLastPlace) {
      return "card-kids-pink shadow-glow-pink";
    }
    if (rank <= 3) {
      return "card-kids-lime shadow-glow-lime";
    }
    return "card-kids-blue shadow-glow-blue";
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-3xl cursor-pointer group",
        "bg-gradient-to-br from-white/95 via-white/90 to-white/85",
        "backdrop-blur-xl border border-white/40 shadow-2xl",
        "transition-all duration-300 ease-out",
        isSelected || isExpanded 
          ? "scale-[1.02] shadow-trinity border-trinity-blue-400/50 ring-2 ring-trinity-blue-500/30" 
          : "hover:scale-[1.01] hover:shadow-trinity-lg hover:border-white/60"
      )}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: rank * 0.05,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ y: -3 }}
    >
      {/* Fond glassmorphique animé */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div 
          className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-trinity-blue-200/20 via-trinity-purple-200/15 to-trinity-orange-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Badge de rang repositionné - déborde de la carte */}
      <motion.div
        className={cn(
          "absolute -top-6 -right-6 z-20",
          "w-16 h-16 rounded-full flex items-center justify-center",
          "text-white text-xl font-black shadow-2xl border-4 border-white/30",
          "bg-gradient-to-br",
          rank === 1 && "from-yellow-400 via-orange-500 to-red-500 shadow-orange-500/50",
          rank === 2 && "from-gray-300 via-gray-400 to-gray-500 shadow-gray-500/50", 
          rank === 3 && "from-amber-600 via-orange-700 to-yellow-800 shadow-amber-600/50",
          rank > 3 && "from-trinity-blue-500 via-trinity-purple-500 to-trinity-blue-600 shadow-trinity-blue-500/50"
        )}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: rank * 0.05 + 0.3, 
          type: "spring", 
          stiffness: 300,
          damping: 20
        }}
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        {rank === 1 ? '🏆' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
      </motion.div>

      {/* Trophée débordant pour le gagnant */}
      {isWinner && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ y: -50, opacity: 0, scale: 0 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.8, 
            type: "spring", 
            stiffness: 200 
          }}
        >
          <div className="relative">
            <div className="text-6xl drop-shadow-2xl">👑</div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-orange-500/50 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Contenu principal avec nouveau layout */}
      <div className="relative z-10 p-6 pt-8">
        {/* Header avec avatar et nom */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg flex items-center justify-center">
                <span className="text-3xl">{player.emoji || '😊'}</span>
              </div>
              {/* Glow effect pour l'avatar du gagnant */}
              {isWinner && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-2xl blur-lg -z-10" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "text-2xl font-black tracking-tight mb-1 truncate",
                isWinner && "bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent",
                isLastPlace && "text-red-600",
                !isWinner && !isLastPlace && "text-gray-800"
              )}>
                {player.name}
              </h3>
              
              {hasPositiveTrend && (
                <motion.div
                  className="flex items-center gap-1 text-green-600"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm font-semibold">En progression</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Score principal repositionné */}
          <div className="text-right">
            <PlayerCardScore
              score={player.totalScore}
              rank={rank}
              roundCount={player.rounds.length}
              isWinner={isWinner}
            />
          </div>
        </div>

        {/* Statistiques en ligne améliorées */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-gradient-to-r from-trinity-blue-50/80 to-trinity-blue-100/60 backdrop-blur-sm px-3 py-2 rounded-xl border border-trinity-blue-200/50">
            <Target className="h-4 w-4 text-trinity-blue-600" />
            <span className="font-bold text-trinity-blue-700 text-sm">Moy: {average}</span>
          </div>
          
          <div className="bg-gradient-to-r from-green-50/80 to-green-100/60 backdrop-blur-sm px-3 py-2 rounded-xl border border-green-200/50">
            <span className="font-bold text-green-700 text-sm">Meilleur: {bestRound}</span>
          </div>
          
          {dutchCount > 0 && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100/80 to-orange-200/60 backdrop-blur-sm px-3 py-2 rounded-xl border border-orange-300/50">
              <Award className="h-4 w-4 text-orange-600" />
              <span className="font-bold text-orange-700 text-sm">
                {dutchCount} Dutch
              </span>
            </div>
          )}
        </div>

        {/* Barre de progression redessinée */}
        {player.rounds.length > 0 && (
          <div className="relative mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-600">
                Progression
              </span>
              <span className="text-xs font-bold text-gray-700">
                {Math.round((player.totalScore / scoreLimit) * 100)}%
              </span>
            </div>
            
            <div className="h-2 bg-gray-200/60 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
              <motion.div 
                className={cn(
                  "h-full rounded-full shadow-sm",
                  "bg-gradient-to-r",
                  player.totalScore / scoreLimit < 0.5 && "from-green-400 to-green-500",
                  player.totalScore / scoreLimit >= 0.5 && player.totalScore / scoreLimit < 0.8 && "from-yellow-400 to-orange-500",
                  player.totalScore / scoreLimit >= 0.8 && "from-red-400 to-red-600"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (player.totalScore / scoreLimit) * 100)}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Bouton d'expansion redessiné */}
        <div className="flex justify-center">
          <motion.button
            className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/60 shadow-sm hover:bg-white/70 hover:shadow-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-semibold text-gray-700">
              {isExpanded ? 'Réduire' : 'Détails'}
            </span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-gray-600 transition-transform duration-200",
                isExpanded ? "rotate-180" : ""
              )}
            />
          </motion.button>
        </div>

        {/* Contenu étendu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-6 pt-6 border-t border-white/40"
            >
              {/* Statistiques détaillées */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-green-100/80 to-green-200/60 backdrop-blur-sm rounded-xl p-4 text-center border border-green-300/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-black text-green-700">{bestRound}</div>
                  <div className="text-sm font-semibold text-green-600">Meilleur score</div>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-red-100/80 to-red-200/60 backdrop-blur-sm rounded-xl p-4 text-center border border-red-300/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-black text-red-700">{worstRound}</div>
                  <div className="text-sm font-semibold text-red-600">Pire score</div>
                </motion.div>
              </div>

              {/* Historique des manches */}
              {player.rounds.length > 0 && (
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="text-sm font-bold text-gray-700 mb-3">Historique des manches :</div>
                  <div className="flex gap-2 flex-wrap">
                    {player.rounds.slice(-8).map((round, index) => (
                      <motion.div
                        key={index}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm font-bold min-w-[40px] text-center backdrop-blur-sm border shadow-sm",
                          round.score <= 10 && "bg-green-100/80 text-green-700 border-green-300/50",
                          round.score > 10 && round.score <= 20 && "bg-yellow-100/80 text-yellow-700 border-yellow-300/50",
                          round.score > 20 && "bg-red-100/80 text-red-700 border-red-300/50",
                          round.isDutch && "ring-2 ring-orange-400 shadow-orange-400/30"
                        )}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {round.score}
                        {round.isDutch && <div className="text-xs text-orange-600 font-black">★</div>}
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

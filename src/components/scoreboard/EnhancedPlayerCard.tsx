
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
          "absolute -top-4 -right-4 z-20",
          "w-20 h-20 rounded-full flex flex-col items-center justify-center",
          "text-white font-black shadow-2xl border-4 border-white/30",
          "bg-gradient-to-br backdrop-blur-sm",
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
        <div className="text-2xl mb-1">
          {rank === 1 ? '🏆' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🎯'}
        </div>
        <div className="text-xs font-bold leading-none">
          {rank === 1 ? '1ER' : rank === 2 ? '2ÈME' : rank === 3 ? '3ÈME' : `${rank}ÈME`}
        </div>
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
      <div className="relative z-10 p-6 pt-10">
        {/* Header avec avatar et nom - Layout amélioré */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            {/* Avatar avec effet glassmorphique et animation */}
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-18 h-18 bg-gradient-to-br from-white/90 via-trinity-blue-50/80 to-trinity-purple-50/80 backdrop-blur-xl rounded-3xl border-2 border-white/50 shadow-xl flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl z-10 relative">{player.emoji || '😊'}</span>
                
                {/* Effet shimmer sur l'avatar */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: rank * 0.2
                  }}
                />
              </div>
              
              {/* Glow effect pour le gagnant */}
              {isWinner && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-orange-500/40 to-red-500/40 rounded-3xl blur-xl -z-10"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                />
              )}
            </motion.div>
            
            {/* Nom et statut avec animations */}
            <div className="flex-1 min-w-0">
              <motion.h3 
                className={cn(
                  "text-2xl font-black tracking-tight mb-1 truncate",
                  isWinner && "bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent",
                  isLastPlace && "text-red-600",
                  !isWinner && !isLastPlace && "bg-gradient-to-r from-trinity-blue-700 to-trinity-purple-700 bg-clip-text text-transparent"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rank * 0.1 }}
              >
                {player.name}
              </motion.h3>
              
              {/* Badge de statut amélioré */}
              {hasPositiveTrend && (
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100/80 to-emerald-100/80 backdrop-blur-sm px-3 py-1 rounded-full border border-green-300/50 shadow-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: rank * 0.1 + 0.3, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-bold text-green-700">En progression ✨</span>
                </motion.div>
              )}
              
              {/* Badge pour dernière place */}
              {isLastPlace && (
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100/80 to-pink-100/80 backdrop-blur-sm px-3 py-1 rounded-full border border-red-300/50 shadow-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: rank * 0.1 + 0.3, type: "spring" }}
                >
                  <span className="text-xs font-bold text-red-700">Rattrape-toi ! 🔥</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Score principal avec design fun */}
          <motion.div 
            className="text-right"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: rank * 0.1 + 0.2, type: "spring" }}
          >
            <PlayerCardScore
              score={player.totalScore}
              rank={rank}
              roundCount={player.rounds.length}
              isWinner={isWinner}
            />
          </motion.div>
        </div>

        {/* Statistiques fun avec icônes et couleurs */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: rank * 0.1 + 0.4 }}
        >
          <motion.div 
            className="flex items-center gap-2 bg-gradient-to-r from-trinity-blue-100/80 via-trinity-blue-50/80 to-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-trinity-blue-200/60 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Target className="h-4 w-4 text-trinity-blue-600" />
            <span className="font-black text-trinity-blue-700 text-sm">Moy: {average} 🎯</span>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-green-100/80 via-emerald-50/80 to-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-green-200/60 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="font-black text-green-700 text-sm">Top: {bestRound} 🏆</span>
          </motion.div>
          
          {dutchCount > 0 && (
            <motion.div 
              className="flex items-center gap-2 bg-gradient-to-r from-orange-100/80 via-yellow-50/80 to-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-orange-200/60 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              animate={{
                boxShadow: [
                  "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "0 4px 20px rgba(251, 146, 60, 0.3)",
                  "0 4px 6px rgba(0, 0, 0, 0.1)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Award className="h-4 w-4 text-orange-600" />
              <span className="font-black text-orange-700 text-sm">
                {dutchCount} Dutch ⭐
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Barre de progression fun et interactive */}
        {player.rounds.length > 0 && (
          <motion.div 
            className="relative mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: rank * 0.1 + 0.6 }}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-gray-700">
                  Progression vers la limite
                </span>
                <span className="text-xs bg-gray-100/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-200/60 font-bold text-gray-600">
                  {scoreLimit} pts
                </span>
              </div>
              <motion.span 
                className="text-sm font-black text-gray-800 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/60 shadow-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.round((player.totalScore / scoreLimit) * 100)}% 📊
              </motion.span>
            </div>
            
            <div className="relative h-3 bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-gray-300/40">
              <motion.div 
                className={cn(
                  "h-full rounded-full shadow-lg relative overflow-hidden",
                  "bg-gradient-to-r",
                  player.totalScore / scoreLimit < 0.3 && "from-green-400 via-emerald-500 to-green-600",
                  player.totalScore / scoreLimit >= 0.3 && player.totalScore / scoreLimit < 0.7 && "from-yellow-400 via-orange-400 to-orange-500",
                  player.totalScore / scoreLimit >= 0.7 && "from-orange-500 via-red-500 to-red-600"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (player.totalScore / scoreLimit) * 100)}%` }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
              >
                {/* Effet brillant sur la barre */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            </div>
            
            {/* Emoji de statut basé sur la progression */}
            <div className="absolute -right-2 -top-1">
              <motion.span 
                className="text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {player.totalScore / scoreLimit < 0.3 ? '😎' : 
                 player.totalScore / scoreLimit < 0.7 ? '😅' : '😰'}
              </motion.span>
            </div>
          </motion.div>
        )}

        {/* Bouton d'expansion fun et interactif */}
        <div className="flex justify-center">
          <motion.button
            className="group flex items-center gap-3 bg-gradient-to-r from-white/80 via-trinity-blue-50/60 to-trinity-purple-50/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rank * 0.1 + 0.8 }}
          >
            {/* Effet de brillance au hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut"
              }}
            />
            
            <span className="text-sm font-black text-gray-700 relative z-10">
              {isExpanded ? '🔽 Réduire' : '🔍 Voir détails'}
            </span>
            
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-gray-600 relative z-10" />
            </motion.div>
          </motion.button>
        </div>

        {/* Contenu étendu avec animations */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden mt-8 pt-6 border-t border-gradient-to-r from-transparent via-white/50 to-transparent"
            >
              {/* Statistiques détaillées avec style fun */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-green-100/90 via-emerald-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-green-200/60 shadow-lg relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="text-3xl font-black text-green-700 mb-1">{bestRound}</div>
                  <div className="text-sm font-bold text-green-600">🏆 Meilleur score</div>
                  
                  {/* Particules de célébration */}
                  <motion.div
                    className="absolute top-2 right-2 text-xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity 
                    }}
                  >
                    ⭐
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-red-100/90 via-pink-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-red-200/60 shadow-lg relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="text-3xl font-black text-red-700 mb-1">{worstRound}</div>
                  <div className="text-sm font-bold text-red-600">💥 Pire score</div>
                  
                  <motion.div
                    className="absolute top-2 right-2 text-xl"
                    animate={{ 
                      scale: [1, 0.8, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  >
                    😅
                  </motion.div>
                </motion.div>
              </div>

              {/* Historique des manches avec style gaming */}
              {player.rounds.length > 0 && (
                <motion.div 
                  className="bg-gradient-to-br from-white/70 via-trinity-blue-50/50 to-trinity-purple-50/50 backdrop-blur-xl rounded-2xl p-5 border border-white/60 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">📈</span>
                    <span className="text-sm font-black text-gray-700">Historique des manches</span>
                    <div className="h-px bg-gradient-to-r from-trinity-blue-300 to-trinity-purple-300 flex-1 mx-2" />
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {player.rounds.slice(-8).map((round, index) => (
                      <motion.div
                        key={index}
                        className={cn(
                          "relative px-4 py-3 rounded-xl text-sm font-black min-w-[50px] text-center backdrop-blur-sm border shadow-lg cursor-pointer group",
                          round.score <= 10 && "bg-gradient-to-br from-green-100/90 to-emerald-100/80 text-green-700 border-green-300/60",
                          round.score > 10 && round.score <= 20 && "bg-gradient-to-br from-yellow-100/90 to-orange-100/80 text-orange-700 border-orange-300/60",
                          round.score > 20 && "bg-gradient-to-br from-red-100/90 to-pink-100/80 text-red-700 border-red-300/60",
                          round.isDutch && "ring-2 ring-yellow-400 shadow-yellow-400/50"
                        )}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: index * 0.05, 
                          type: "spring", 
                          stiffness: 300 
                        }}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -5,
                          rotateZ: Math.random() * 10 - 5 
                        }}
                      >
                        <div className="relative z-10">
                          {round.score}
                          {round.isDutch && (
                            <motion.div 
                              className="text-xs text-yellow-600 font-black"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 360]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity 
                              }}
                            >
                              ⭐
                            </motion.div>
                          )}
                        </div>
                        
                        {/* Tooltip fun au hover */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Manche {index + Math.max(0, player.rounds.length - 8) + 1}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
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


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import { Trophy, TrendingUp, Star, Zap } from 'lucide-react';

interface FunPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isSelected: boolean;
  scoreLimit?: number;
}

const FunPlayerCard: React.FC<FunPlayerCardProps> = ({
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
  const avgScore = player.rounds.length > 0 
    ? Math.round(player.totalScore / player.rounds.length * 10) / 10
    : 0;
  const bestRound = player.rounds.length > 0 
    ? Math.min(...player.rounds.map(r => r.score))
    : 0;
  const dutchCount = player.rounds.filter(r => r.isDutch).length;
  const recentRounds = player.rounds.slice(-3);
  const hasPositiveTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;

  // Système de couleurs unifié par rang
  const getRankTheme = () => {
    const themes = {
      1: {
        gradient: "from-purple-500/20 via-pink-500/15 to-purple-600/10",
        border: "border-purple-400/50",
        glow: "shadow-lg shadow-purple-500/20",
        text: "text-purple-700",
        accent: "bg-purple-500",
        lightBg: "bg-purple-50/80"
      },
      2: {
        gradient: "from-orange-500/20 via-red-500/15 to-orange-600/10",
        border: "border-orange-400/50",
        glow: "shadow-lg shadow-orange-500/20",
        text: "text-orange-700",
        accent: "bg-orange-500",
        lightBg: "bg-orange-50/80"
      },
      3: {
        gradient: "from-cyan-500/20 via-blue-500/15 to-cyan-600/10",
        border: "border-cyan-400/50",
        glow: "shadow-lg shadow-cyan-500/20",
        text: "text-cyan-700",
        accent: "bg-cyan-500",
        lightBg: "bg-cyan-50/80"
      },
      4: {
        gradient: "from-green-500/20 via-emerald-500/15 to-green-600/10",
        border: "border-green-400/50",
        glow: "shadow-lg shadow-green-500/20",
        text: "text-green-700",
        accent: "bg-green-500",
        lightBg: "bg-green-50/80"
      },
      5: {
        gradient: "from-yellow-500/20 via-amber-500/15 to-yellow-600/10",
        border: "border-yellow-400/50",
        glow: "shadow-lg shadow-yellow-500/20",
        text: "text-yellow-700",
        accent: "bg-yellow-500",
        lightBg: "bg-yellow-50/80"
      }
    };
    return themes[rank as keyof typeof themes] || {
      gradient: "from-pink-500/20 via-purple-500/15 to-pink-600/10",
      border: "border-pink-400/50",
      glow: "shadow-lg shadow-pink-500/20",
      text: "text-pink-700",
      accent: "bg-pink-500",
      lightBg: "bg-pink-50/80"
    };
  };

  const theme = getRankTheme();

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-3xl backdrop-blur-xl border-2 transition-all duration-500 cursor-pointer overflow-hidden group",
        `bg-gradient-to-br ${theme.gradient}`,
        theme.border,
        isSelected || isExpanded 
          ? `ring-4 ring-purple-400/40 scale-[1.02] z-10 ${theme.glow} shadow-2xl` 
          : `hover:scale-[1.01] hover:-translate-y-2 ${theme.glow} hover:shadow-xl`
      )}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: rank * 0.08,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        rotateX: 5,
        rotateY: isWinner ? 2 : 0
      }}
      whileTap={{ scale: 0.98, y: -2 }}
      layout
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Pattern d'arrière-plan subtil */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id={`dots-${rank}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="currentColor" className={theme.text} opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#dots-${rank})`} />
        </svg>
      </div>

      {/* Effet de brillance en mouvement */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: '-150%' }}
        whileHover={{ x: '150%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Particules flottantes pour le gagnant */}
      {isWinner && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
              style={{
                left: `${20 + i * 12}%`,
                top: `${15 + (i % 2) * 70}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.6, 0.3, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Badge gagnant avec animation premium */}
      {isWinner && (
        <motion.div
          className="absolute -top-3 -right-3 z-30"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border-2 border-white/60 flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-base"
              >
                👑
              </motion.span>
              <span className="font-black tracking-wide">WINNER</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-base"
              >
                ⭐
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Contenu principal avec padding optimisé */}
      <div className="relative z-10 p-6">
        {/* Header amélioré avec plus de style */}
        <div className="flex items-center gap-4 mb-5">
          {/* Groupe Avatar & Rang avec effets 3D */}
          <div className="flex items-center gap-3">
            <motion.div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl border-2 border-white/30 relative overflow-hidden",
                theme.accent
              )}
              whileHover={{ 
                scale: 1.15, 
                rotate: 8,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">#{rank}</span>
              
              {/* Ring effect pour les top 3 */}
              {rank <= 3 && (
                <motion.div
                  className="absolute inset-0 border-2 border-white rounded-2xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: rank * 0.3
                  }}
                />
              )}
            </motion.div>
            
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border-3 border-white/60 shadow-xl flex items-center justify-center relative overflow-hidden group/avatar"
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -8, 8, 0],
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Effet holographique sur l'avatar */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent opacity-0 group-hover/avatar:opacity-100"
                initial={{ rotate: -45, scale: 0 }}
                whileHover={{ rotate: 45, scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.span 
                className="text-3xl relative z-10"
                animate={isWinner ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{
                  duration: 3,
                  repeat: isWinner ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {player.emoji || '🎮'}
              </motion.span>
              
              {/* Glow effect pour le gagnant */}
              {isWinner && (
                <motion.div
                  className="absolute inset-0 bg-yellow-400/30 rounded-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>

          {/* Section nom et infos avec style amélioré */}
          <div className="flex-1 min-w-0">
            <motion.h3 
              className={cn(
                "text-xl font-black truncate mb-2 relative",
                theme.text
              )}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rank * 0.1 }}
            >
              {isWinner && (
                <motion.span
                  className="inline-block mr-2"
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  👑
                </motion.span>
              )}
              {player.name}
              {isWinner && (
                <motion.span
                  className="text-2xl ml-2 inline-block"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ⭐
                </motion.span>
              )}
            </motion.h3>
            
            {/* Badges informatifs améliorés */}
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <motion.span 
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full font-medium border backdrop-blur-sm",
                  theme.lightBg, theme.border, theme.text
                )}
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: rank * 0.1 + 0.2 }}
                whileHover={{ scale: 1.05, y: -1 }}
              >
                🎯 {player.rounds.length} manches
              </motion.span>
              
              {dutchCount > 0 && (
                <motion.span 
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100/90 text-orange-700 border border-orange-300/60 font-medium backdrop-blur-sm"
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: rank * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <motion.span
                    animate={{ 
                      rotate: [0, 20, -20, 0],
                      scale: [1, 1.2, 1] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🏆
                  </motion.span>
                  {dutchCount} Dutch
                </motion.span>
              )}
              
              {hasPositiveTrend && (
                <motion.span 
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100/90 text-green-700 border border-green-300/60 font-medium backdrop-blur-sm"
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: rank * 0.1 + 0.4 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <motion.span
                    animate={{ y: [-2, 0, -2] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🔥
                  </motion.span>
                  En forme
                </motion.span>
              )}
            </div>
          </div>

          {/* Score principal avec style premium */}
          <motion.div 
            className="text-right relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: rank * 0.1 + 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Fond du score avec gradient */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-2xl blur-xl opacity-30",
                theme.accent
              )}
              animate={isWinner ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              } : {}}
              transition={{ duration: 2, repeat: isWinner ? Infinity : 0 }}
            />
            
            <div className="relative z-10 p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 shadow-lg">
              <motion.div 
                className={cn(
                  "text-4xl font-black mb-1 relative",
                  theme.text
                )}
                animate={isWinner ? {
                  scale: [1, 1.05, 1],
                  opacity: [1, 0.9, 1]
                } : {}}
                transition={{ duration: 2, repeat: isWinner ? Infinity : 0 }}
              >
                {player.totalScore}
                
                {/* Étoiles flottantes pour le meilleur score */}
                {bestRound === 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 text-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ⭐
                  </motion.span>
                )}
              </motion.div>
              
              <div className="text-xs text-gray-600 font-medium flex items-center justify-center gap-1">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  📊
                </motion.span>
                Moy: {avgScore}
              </div>
              
              {/* Barre de progression vers la limite */}
              <div className="mt-2 w-full bg-gray-200/50 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", theme.accent)}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (player.totalScore / scoreLimit) * 100)}%` }}
                  transition={{ duration: 1, delay: rank * 0.1 + 0.5 }}
                />
              </div>
              
              <div className="text-xs text-gray-500 mt-1 text-center">
                {player.totalScore >= scoreLimit ? (
                  <motion.span
                    className="text-red-600 font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🚨 Limite atteinte!
                  </motion.span>
                ) : (
                  `${scoreLimit - player.totalScore} pts restants`
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats rapides améliorées */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            {bestRound === 0 && (
              <motion.span 
                className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-bold flex items-center gap-1 border border-purple-200/60 backdrop-blur-sm"
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯
                </motion.span>
                Perfect Round!
              </motion.span>
            )}
            
            {hasPositiveTrend && (
              <motion.span 
                className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200/60 backdrop-blur-sm"
                initial={{ scale: 0, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <motion.span
                  animate={{ y: [-1, -3, -1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🔥
                </motion.span>
                En forme
              </motion.span>
            )}
            
            {isLastPlace && !hasPositiveTrend && (
              <motion.span 
                className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-xs font-bold flex items-center gap-1 border border-orange-200/60 backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <motion.span
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💪
                </motion.span>
                Courage!
              </motion.span>
            )}
          </div>

          {/* Indicateur d'expansion premium */}
          <motion.div
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold border-2 backdrop-blur-md cursor-pointer transition-all duration-300 relative overflow-hidden",
              `${theme.lightBg} ${theme.border} ${theme.text}`,
              isExpanded ? "shadow-lg scale-105" : "hover:shadow-md hover:scale-105"
            )}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative z-10 flex items-center gap-2">
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isExpanded ? '🔼' : '🔽'}
              </motion.span>
              {isExpanded ? 'Masquer' : 'Détails'}
            </div>
          </motion.div>
        </div>

        {/* Contenu étendu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/20 pt-3"
            >
              {/* Dernières manches */}
              <div className="mb-4">
                <h4 className={cn("text-sm font-bold mb-2", theme.text)}>
                  📈 Dernières manches
                </h4>
                <div className="flex gap-2">
                  {recentRounds.map((round, index) => {
                    const getScoreColor = (score: number) => {
                      if (score === 0) return 'bg-purple-100 text-purple-700 border-purple-200';
                      if (score <= 5) return 'bg-green-100 text-green-700 border-green-200';
                      if (score <= 15) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
                      return 'bg-red-100 text-red-700 border-red-200';
                    };

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "px-2 py-1 rounded-lg border text-xs font-bold",
                          getScoreColor(round.score)
                        )}
                      >
                        {round.score}
                        {round.isDutch && ' 🏆'}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Stats détaillées */}
              <div className="grid grid-cols-2 gap-3">
                <div className={cn("p-3 rounded-xl border", theme.lightBg, theme.border)}>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-3 w-3" />
                    <span className="text-xs text-gray-600">Meilleur</span>
                  </div>
                  <div className={cn("font-bold", theme.text)}>{bestRound}</div>
                </div>
                <div className={cn("p-3 rounded-xl border", theme.lightBg, theme.border)}>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs text-gray-600">Tendance</span>
                  </div>
                  <div className={cn("font-bold", theme.text)}>
                    {hasPositiveTrend ? '📈 ↗️' : '📊 →'}
                  </div>
                </div>
              </div>

              {/* Badge champion */}
              {isWinner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-xl text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-yellow-700 font-bold text-sm">
                    <Trophy className="h-4 w-4" />
                    🎉 Champion de la partie !
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐
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

export default React.memo(FunPlayerCard);

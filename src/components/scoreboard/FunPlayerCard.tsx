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
  const avgScore = player.rounds.length > 0 ? Math.round(player.totalScore / player.rounds.length * 10) / 10 : 0;
  const bestRound = player.rounds.length > 0 ? Math.min(...player.rounds.map(r => r.score)) : 0;
  const dutchCount = player.rounds.filter(r => r.isDutch).length;
  const recentRounds = player.rounds.slice(-3);
  const hasPositiveTrend = recentRounds.length >= 2 && recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;

  // Système de couleurs unifié par rang
  const getRankTheme = () => {
    const themes = {
      1: {
        gradient: "from-amber-500/25 via-yellow-400/20 to-orange-500/15",
        border: "border-amber-400/60",
        glow: "shadow-lg shadow-amber-500/30",
        text: "text-amber-700",
        accent: "bg-amber-500",
        lightBg: "bg-amber-50/80",
        rankGlow: "from-amber-400/50 to-yellow-400/50"
      },
      2: {
        gradient: "from-blue-500/25 via-cyan-400/20 to-indigo-500/15",
        border: "border-blue-400/60",
        glow: "shadow-lg shadow-blue-500/30",
        text: "text-blue-700",
        accent: "bg-blue-500",
        lightBg: "bg-blue-50/80",
        rankGlow: "from-blue-400/50 to-cyan-400/50"
      },
      3: {
        gradient: "from-emerald-500/25 via-green-400/20 to-teal-500/15",
        border: "border-emerald-400/60",
        glow: "shadow-lg shadow-emerald-500/30",
        text: "text-emerald-700",
        accent: "bg-emerald-500",
        lightBg: "bg-emerald-50/80",
        rankGlow: "from-emerald-400/50 to-green-400/50"
      },
      4: {
        gradient: "from-purple-500/25 via-violet-400/20 to-indigo-500/15",
        border: "border-purple-400/60",
        glow: "shadow-lg shadow-purple-500/30",
        text: "text-purple-700",
        accent: "bg-purple-500",
        lightBg: "bg-purple-50/80",
        rankGlow: "from-purple-400/50 to-violet-400/50"
      },
      5: {
        gradient: "from-rose-500/25 via-pink-400/20 to-red-500/15",
        border: "border-rose-400/60",
        glow: "shadow-lg shadow-rose-500/30",
        text: "text-rose-700",
        accent: "bg-rose-500",
        lightBg: "bg-rose-50/80",
        rankGlow: "from-rose-400/50 to-pink-400/50"
      }
    };
    return themes[rank as keyof typeof themes] || {
      gradient: "from-slate-500/25 via-gray-400/20 to-zinc-500/15",
      border: "border-slate-400/60",
      glow: "shadow-lg shadow-slate-500/30",
      text: "text-slate-700",
      accent: "bg-slate-500",
      lightBg: "bg-slate-50/80",
      rankGlow: "from-slate-400/50 to-gray-400/50"
    };
  };
  const theme = getRankTheme();
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  };
  return <motion.div className={cn("relative rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 cursor-pointer overflow-visible group", `bg-gradient-to-br ${theme.gradient}`, theme.border, isSelected || isExpanded ? `ring-4 ring-purple-400/40 scale-[1.02] z-10 ${theme.glow}` : `hover:scale-[1.01] hover:-translate-y-1 ${theme.glow}`)} onClick={handleCardClick} initial={{
    opacity: 0,
    y: 20,
    scale: 0.95
  }} animate={{
    opacity: 1,
    y: 0,
    scale: 1
  }} transition={{
    duration: 0.2,
    delay: rank * 0.03,
    type: "spring",
    stiffness: 400
  }} whileHover={{
    y: -3
  }} whileTap={{
    scale: 0.98
  }} layout>
      {/* Effet de brillance subtle */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12" initial={{
      x: '-100%'
    }} whileHover={{
      x: '200%'
    }} transition={{
      duration: 0.6
    }} />

      {/* Badge gagnant flottant */}
      {isWinner && <motion.div className="absolute -top-2 -right-2 z-[100]" initial={{
      scale: 0,
      rotate: -45
    }} animate={{
      scale: 1,
      rotate: 0
    }} transition={{
      delay: 0.3,
      type: "spring"
    }}>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <motion.span animate={{
          rotate: 360
        }} transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}>
              👑
            </motion.span>
            WINNER
          </div>
        </motion.div>}

      {/* Contenu principal */}
      <div className="relative z-10 p-3">
        {/* Header compact */}
        <div className="flex items-center gap-6 mb-2 px-2">
          {/* Avatar & Rang */}
          <div className="flex items-center gap-3">
            <motion.div 
              className={cn(
                "relative w-16 h-16 rounded-3xl backdrop-blur-md border-3 border-white/50",
                "flex items-center justify-center text-white font-black text-2xl z-20",
                `bg-gradient-to-br ${theme.gradient}`,
                theme.glow
              )}
              whileHover={{
                scale: 1.15,
                rotateY: 20,
                boxShadow: `0 20px 40px ${theme.accent}50`
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15
              }}
            >
              {/* Themed background overlay */}
              <div className={cn("absolute inset-0 rounded-3xl", `bg-gradient-to-tr ${theme.gradient}`)} />
              
              {/* Pulsing outer glow with theme colors */}
              <motion.div 
                className={cn("absolute inset-0 rounded-3xl blur-sm", `bg-gradient-to-r ${theme.rankGlow}`)}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Animated color orbs for extra playfulness */}
              <motion.div 
                className="absolute top-1 right-1 w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Winner crown overlay */}
              {isWinner && (
                <motion.div 
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full 
                             bg-gradient-to-r from-amber-400 to-yellow-500
                             border-3 border-white shadow-xl
                             flex items-center justify-center text-sm"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  👑
                </motion.div>
              )}
              
              <span className="relative z-10 drop-shadow-lg">{rank}</span>
            </motion.div>
            
            <motion.div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-white/60 shadow-lg flex items-center justify-center relative overflow-hidden" whileHover={{
            scale: 1.05,
            rotate: 3
          }}>
              <span className="text-2xl">{player.emoji || '🎮'}</span>
            </motion.div>
          </div>

          {/* Nom et score */}
          <div className="flex-1 min-w-0">
            <motion.h3 className={cn("text-2xl font-black truncate bg-gradient-to-r from-current via-current to-current bg-clip-text", "drop-shadow-lg tracking-wide", theme.text)} initial={{
            opacity: 0,
            x: -10,
            scale: 0.9
          }} animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }} whileHover={{
            scale: 1.05,
            x: 3
          }} transition={{
            type: "spring",
            stiffness: 400,
            damping: 15
          }}>
              <motion.span animate={isWinner ? {
              scale: 1.1
            } : {}} transition={{
              duration: 2,
              repeat: isWinner ? Infinity : 0,
              repeatType: "reverse"
            }}>
                {isWinner && '👑 '}{player.name}
              </motion.span>
            </motion.h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>🎯 {player.rounds.length} manches</span>
              {dutchCount > 0 && <span className="text-orange-600">🏆 {dutchCount}</span>}
            </div>
            
            {/* Bouton d'expansion minimaliste */}
            <motion.button className={cn(
              "group/btn mt-1 px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer",
              "border border-white/30 backdrop-blur-sm",
              "hover:border-white/50 hover:bg-white/10 active:scale-95",
              "transition-all duration-200 flex items-center gap-1.5",
              theme.lightBg,
              theme.text
            )} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
              <motion.div
                animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="w-3 h-3 flex items-center justify-center"
              >
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="opacity-70 group-hover/btn:opacity-90"
                >
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </motion.div>
              <span className="opacity-80 group-hover/btn:opacity-100">
                {isExpanded ? 'Réduire' : 'Détails'}
              </span>
            </motion.button>
          </div>

            {/* Score principal amélioré - Layout 2 colonnes */}
            <motion.div className="text-right relative" initial={{
          scale: 0,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 300
        }} whileHover={{
          scale: 1.05
        }}>
              {/* Container glassmorphism */}
              <motion.div className={cn("relative px-4 py-3 rounded-xl backdrop-blur-md border overflow-hidden", theme.lightBg, theme.border, "shadow-glass-md")} whileHover={{
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            y: -2
          }}>
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Layout 2 colonnes */}
                <div className="flex gap-3 items-center">
                  {/* Colonne 1: Moyenne + Points restants */}
                  <div className="flex flex-col gap-2 text-xs">
                    {/* Moyenne avec icône */}
                    <div className="flex items-center gap-1">
                      <span className="opacity-60">📊</span>
                      <span className="font-medium opacity-80">
                        {avgScore} moy
                      </span>
                    </div>
                    
                    {/* Points restants */}
                    {scoreLimit && (
                      <div className="text-center">
                        <div className="w-12 bg-white/20 rounded-full h-1 mb-1">
                          <motion.div className={cn("h-1 rounded-full", theme.accent)} initial={{
                        width: 0
                      }} animate={{
                        width: `${Math.min(player.totalScore / scoreLimit * 100, 100)}%`
                      }} transition={{
                        delay: 0.5,
                        duration: 0.8
                      }} />
                        </div>
                        <div className="opacity-60">
                          {Math.max(0, scoreLimit - player.totalScore)} restant
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Colonne 2: Score principal (toute la hauteur) */}
                  <div className="flex items-center justify-center h-full">
                    <motion.div className={cn("text-3xl font-black leading-none", theme.text)} whileHover={{
                  scale: 1.1
                }} transition={{
                  type: "spring",
                  stiffness: 400
                }}>
                      {player.totalScore}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
        </div>

        {/* Contenu étendu */}
        <AnimatePresence>
          {isExpanded && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: "auto"
        }} exit={{
          opacity: 0,
          height: 0
        }} transition={{
          duration: 0.2
        }} className="overflow-hidden border-t border-white/20 pt-3">
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
                return <motion.div key={index} initial={{
                  opacity: 0,
                  scale: 0.8
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: index * 0.1
                }} className={cn("px-2 py-1 rounded-lg border text-xs font-bold", getScoreColor(round.score))}>
                        {round.score}
                        {round.isDutch && ' 🏆'}
                      </motion.div>;
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
              {isWinner && <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} className="mt-3 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 text-yellow-700 font-bold text-sm">
                    <Trophy className="h-4 w-4" />
                    🎉 Champion de la partie !
                    <motion.span animate={{
                rotate: 360
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                      ⭐
                    </motion.span>
                  </div>
                </motion.div>}
            </motion.div>}
        </AnimatePresence>
      </div>
    </motion.div>;
};
export default React.memo(FunPlayerCard);
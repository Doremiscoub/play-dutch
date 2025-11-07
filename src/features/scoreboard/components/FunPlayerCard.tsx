import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import { Trophy, TrendingUp, Star, Zap } from 'lucide-react';
import useIsMobile from '@/hooks/use-mobile';
import MobileFunPlayerCard from './MobileFunPlayerCard';
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
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Utiliser la version mobile optimisée sur mobile
  if (isMobile) {
    return (
      <MobileFunPlayerCard
        player={player}
        rank={rank}
        totalPlayers={totalPlayers}
        onSelect={onSelect}
        isSelected={isSelected}
        scoreLimit={scoreLimit}
      />
    );
  }
  
  // Desktop uniquement à partir d'ici
  const isWinner = rank === 1;
  const isLastPlace = rank === totalPlayers;
  const avgScore = player.rounds.length > 0 ? Math.round(player.totalScore / player.rounds.length * 10) / 10 : 0;
  const bestRound = player.rounds.length > 0 ? Math.min(...player.rounds.map(r => r.score)) : 0;
  const dutchCount = player.rounds.filter(r => r.isDutch).length;
  const recentRounds = player.rounds.slice(-3);
  const hasPositiveTrend = recentRounds.length >= 2 && recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;

  // Système de couleurs simplifié par rang
  const getRankTheme = () => {
    const themes = {
      1: {
        gradient: "from-amber-100 to-yellow-100",
        border: "border-amber-300",
        text: "text-amber-700"
      },
      2: {
        gradient: "from-blue-100 to-cyan-100",
        border: "border-blue-300",
        text: "text-blue-700"
      },
      3: {
        gradient: "from-green-100 to-emerald-100",
        border: "border-green-300",
        text: "text-emerald-700"
      },
      4: {
        gradient: "from-purple-100 to-violet-100",
        border: "border-purple-300",
        text: "text-purple-700"
      },
      5: {
        gradient: "from-rose-100 to-pink-100",
        border: "border-rose-300",
        text: "text-rose-700"
      }
    };
    return themes[rank as keyof typeof themes] || {
      gradient: "from-slate-100 to-gray-100",
      border: "border-slate-300",
      text: "text-slate-700"
    };
  };
  const theme = getRankTheme();
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  };
  return <motion.div className={cn(
    "relative rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden",
    `bg-gradient-to-br ${theme.gradient}`,
    theme.border,
    "shadow-lg",
    isSelected || isExpanded ? "ring-2 ring-purple-400/60 scale-[1.01] z-10" : "hover:scale-[1.005] hover:-translate-y-1"
  )} onClick={handleCardClick} initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.2,
    delay: rank * 0.02
  }} whileHover={{
    y: -2
  }} whileTap={{
    scale: 0.99
  }} layout>

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
            <span className="inline-block animate-spin" style={{ animationDuration: '3s' }}>
              👑
            </span>
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
                "relative w-12 h-12 rounded-2xl border-2 border-white/60",
                "flex items-center justify-center font-black text-xl",
                `bg-gradient-to-br ${theme.gradient}`,
                theme.text
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.15 }}
            >
              {isWinner && (
                <motion.div 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full 
                             bg-gradient-to-r from-amber-400 to-yellow-500
                             border-2 border-white shadow-lg
                             flex items-center justify-center text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  👑
                </motion.div>
              )}
              
              <span className="relative z-10">{rank}</span>
            </motion.div>
            
            <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-white/60 shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-150 hover:scale-105">
              <span className="text-2xl">{player.emoji || '🎮'}</span>
            </div>
          </div>

          {/* Nom et score */}
          <div className="flex-1 min-w-0">
            <motion.h3 className={cn("text-2xl font-black leading-tight break-words hyphens-auto bg-gradient-to-r from-current via-current to-current bg-clip-text", "drop-shadow-lg tracking-wide", theme.text)} initial={{
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
              <span className={isWinner ? "inline-block animate-pulse" : ""}>
                {isWinner && '👑 '}{player.name}
              </span>
            </motion.h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>🎯 {player.rounds.length} manches</span>
              {dutchCount > 0 && <span className="text-orange-600">🏆 {dutchCount}</span>}
            </div>
            
            {/* Bouton d'expansion minimaliste */}
            <motion.button className={cn(
              "group/btn mt-1 px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer",
              "border border-white/30 backdrop-blur-sm bg-white/50",
              "hover:border-white/50 hover:bg-white/60 active:scale-95",
              "transition-all duration-200 flex items-center gap-1.5",
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
              {/* Score principal simplifié */}
              <div className="text-right">
                <div className={cn("text-3xl font-black", theme.text)}>
                  {player.totalScore}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  📊 {avgScore} moy
                </div>
              </div>
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

              {/* Stats détaillées simplifiées */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-white/50">
                  <div className="text-xs text-gray-600">Meilleur</div>
                  <div className={cn("font-bold text-sm", theme.text)}>{bestRound}</div>
                </div>
                <div className="p-2 rounded-lg bg-white/50">
                  <div className="text-xs text-gray-600">Tendance</div>
                  <div className="text-sm">{hasPositiveTrend ? '📈' : '📊'}</div>
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
                    <span className="inline-block animate-spin" style={{ animationDuration: '2s' }}>
                      ⭐
                    </span>
                  </div>
                </motion.div>}
            </motion.div>}
        </AnimatePresence>
      </div>
    </motion.div>;
};
export default React.memo(FunPlayerCard);
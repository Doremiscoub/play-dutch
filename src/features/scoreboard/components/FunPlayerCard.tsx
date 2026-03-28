import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';
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
  const _isLastPlace = rank === totalPlayers;
  const avgScore = player.rounds.length > 0 ? Math.round(player.totalScore / player.rounds.length * 10) / 10 : 0;
  const bestRound = player.rounds.length > 0 ? Math.min(...player.rounds.map(r => r.score)) : 0;
  const dutchCount = player.rounds.filter(r => r.isDutch).length;
  const recentRounds = player.rounds.slice(-3);
  const hasPositiveTrend = recentRounds.length >= 2 && recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;

  // Système de couleurs simplifié par rang
  const getRankTheme = () => {
    const themes = {
      1: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700"
      },
      2: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700"
      },
      3: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-emerald-700"
      },
      4: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-700"
      },
      5: {
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-700"
      }
    };
    return themes[rank as keyof typeof themes] || {
      bg: "bg-slate-50",
      border: "border-slate-200",
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
    theme.bg,
    theme.border,
    "shadow-sm",
    isSelected || isExpanded ? "ring-2 ring-purple-300 scale-[1.01] z-10" : "hover:shadow-md hover:-translate-y-0.5"
  )} onClick={handleCardClick} initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.2,
    delay: rank * 0.02
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
          <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
            <span>
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
            <div
              className={cn(
                "relative w-12 h-12 rounded-2xl border-2 border-border",
                "flex items-center justify-center font-black text-xl",
                theme.bg,
                theme.text
              )}
            >
              {isWinner && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full
                             bg-amber-500
                             border-2 border-white shadow-sm
                             flex items-center justify-center text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  👑
                </motion.div>
              )}

              <span className="relative z-10">{rank}</span>
            </div>

            <div className="w-14 h-14 rounded-xl bg-white border-2 border-border shadow-sm flex items-center justify-center relative overflow-hidden">
              <span className="text-2xl">{player.emoji || '🎮'}</span>
            </div>
          </div>

          {/* Nom et score */}
          <div className="flex-1 min-w-0">
            <h3 className={cn("text-2xl font-black leading-tight break-words hyphens-auto tracking-wide", theme.text)}>
              <span className={isWinner ? "inline-block animate-pulse" : ""}>
                {isWinner && '👑 '}{player.name}
              </span>
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>🎯 {player.rounds.length} manches</span>
              {dutchCount > 0 && <span className="text-orange-600">🏆 {dutchCount}</span>}
            </div>

            {/* Bouton d'expansion minimaliste */}
            <button className={cn(
              "group/btn mt-1 px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer",
              "border border-border bg-white",
              "hover:bg-gray-50 active:scale-95",
              "transition-all duration-200 flex items-center gap-1.5",
              theme.text
            )}>
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
            </button>
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
        }}>
              {/* Score principal simplifié */}
              <div className="text-right">
                <div className={cn("text-3xl font-black", theme.text)}>
                  {player.totalScore}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
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
        }} className="overflow-hidden border-t border-border pt-3">
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
                <div className="p-2 rounded-lg bg-white">
                  <div className="text-xs text-muted-foreground">Meilleur</div>
                  <div className={cn("font-bold text-sm", theme.text)}>{bestRound}</div>
                </div>
                <div className="p-2 rounded-lg bg-white">
                  <div className="text-xs text-muted-foreground">Tendance</div>
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
          }} className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 text-amber-700 font-bold text-sm">
                    <Trophy className="h-4 w-4" />
                    🎉 Champion de la partie !
                    <span>
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

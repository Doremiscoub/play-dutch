import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import PlayerRankBadge from './player-card/PlayerRankBadge';
import PlayerAvatar from './player-card/PlayerAvatar';
import PlayerInfo from './player-card/PlayerInfo';
import PlayerScore from './player-card/PlayerScore';
import PlayerExpandButton from './player-card/PlayerExpandButton';
import PlayerDetails from './player-card/PlayerDetails';

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
  
  // Calculations
  const isWinner = rank === 1;
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

  // Theme system based on rank
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
        "relative rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 cursor-pointer overflow-visible group",
        `bg-gradient-to-br ${theme.gradient}`,
        theme.border,
        isSelected || isExpanded 
          ? `ring-4 ring-purple-400/40 scale-[1.02] z-10 ${theme.glow}` 
          : `hover:scale-[1.01] hover:-translate-y-1 ${theme.glow}`
      )}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: rank * 0.03,
        type: "spring",
        stiffness: 400
      }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Subtle shine effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Winner floating badge */}
      {isWinner && (
        <motion.div 
          className="absolute -top-2 -right-2 z-[100]"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              👑
            </motion.span>
            WINNER
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 p-3">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          {/* Rank & Avatar */}
          <div className="flex items-center gap-3">
            <PlayerRankBadge rank={rank} isWinner={isWinner} />
            <PlayerAvatar emoji={player.emoji} name={player.name} />
          </div>

          {/* Player info */}
          <PlayerInfo
            name={player.name}
            isWinner={isWinner}
            roundsCount={player.rounds.length}
            dutchCount={dutchCount}
            theme={theme}
          />

          {/* Score */}
          <PlayerScore
            totalScore={player.totalScore}
            avgScore={avgScore}
            scoreLimit={scoreLimit}
            theme={theme}
          />
        </div>

        {/* Expand button */}
        <PlayerExpandButton
          isExpanded={isExpanded}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          theme={theme}
        />

        {/* Expanded content */}
        <PlayerDetails
          player={player}
          isExpanded={isExpanded}
          isWinner={isWinner}
          bestRound={bestRound}
          hasPositiveTrend={hasPositiveTrend}
          recentRounds={recentRounds}
          theme={theme}
        />
      </div>
    </motion.div>
  );
};

export default React.memo(FunPlayerCard);
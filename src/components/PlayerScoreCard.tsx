
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import PlayerBadges from './PlayerBadges';
import { useTheme } from '@/hooks/use-theme';

interface PlayerScoreCardProps {
  player: Player;
  position: number;
  isWinner?: boolean;
  showRounds?: boolean;
  lastRoundScore?: number;
  onRoundClick?: (roundIndex: number) => void;
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({ 
  player, 
  position, 
  isWinner = false,
  showRounds = true,
  lastRoundScore,
  onRoundClick
}) => {
  const { currentTheme } = useTheme();
  
  // Calculate progress percentage (max score is 100)
  const progressPercentage = Math.min(player.totalScore, 100);
  
  // Determine color based on position
  const positionColors = [
    'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white', // 1st place
    'bg-gradient-to-r from-dutch-purple to-dutch-pink text-white', // 2nd place
    'bg-gradient-to-r from-dutch-orange to-dutch-pink text-white', // 3rd place
  ];
  
  const positionColor = position <= 3 
    ? positionColors[position - 1] 
    : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700';
  
  const cardClasses = isWinner
    ? 'border-2 border-dutch-yellow bg-gradient-to-r from-dutch-purple/10 to-dutch-blue/10 backdrop-blur-sm'
    : 'bg-white/60 backdrop-blur-sm border border-white/20';

  // Determine if this is the last round score
  const isLastRoundHighScore = lastRoundScore !== undefined && 
    player.rounds.length > 0 && 
    player.rounds[player.rounds.length - 1].score === lastRoundScore && 
    lastRoundScore === Math.min(...player.rounds.map(r => r.score).filter(s => s > 0));

  // Get player statistics to display
  const stats = player.stats;
  const hasImprovement = stats?.improvementRate !== undefined && stats.improvementRate < 0;
  
  return (
    <motion.div 
      className={cn(
        "rounded-3xl p-5 shadow-sm transition-all hover:shadow-md",
        cardClasses,
        `data-theme-${currentTheme}`
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: position * 0.05 }}
      layout
      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${positionColor} shadow-md`}>
          {isWinner ? <Trophy className="h-4 w-4" aria-hidden="true" /> : position}
        </div>
        
        <div className="flex-grow overflow-hidden">
          <div className="flex items-center">
            <h3 className="font-semibold truncate">{player.name}</h3>
            {player.rounds.some(round => round.isDutch) && (
              <div className="ml-2 flex-shrink-0">
                <motion.div 
                  className="px-2 py-0.5 bg-dutch-orange/20 text-dutch-orange text-xs font-medium rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  Dutch
                </motion.div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="relative w-full">
              <Progress 
                value={progressPercentage} 
                className="h-2.5 bg-gray-100/50"
              />
              <motion.div 
                className="absolute bottom-0 h-2.5 rounded-full bg-gradient-to-r from-dutch-blue/20 to-dutch-purple/20 blur-sm w-full"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold">{player.totalScore}</span>
              {lastRoundScore !== undefined && (
                <span className="ml-2 text-xs text-gray-500 flex items-center">
                  +{lastRoundScore}
                  {player.rounds.length > 1 && player.rounds[player.rounds.length - 1].score < player.rounds[player.rounds.length - 2].score && (
                    <TrendingDown className="h-3 w-3 ml-0.5 text-green-500" aria-hidden="true" />
                  )}
                  {player.rounds.length > 1 && player.rounds[player.rounds.length - 1].score > player.rounds[player.rounds.length - 2].score && (
                    <TrendingUp className="h-3 w-3 ml-0.5 text-red-500" aria-hidden="true" />
                  )}
                </span>
              )}
            </div>
          </div>
          
          {/* Player badges below score */}
          <PlayerBadges player={player} className="mt-1.5" />
          
          {/* Player stats (only show if available) */}
          {stats && (
            <div className="mt-1 text-xs text-gray-600 flex flex-wrap gap-x-3">
              {stats.averageScore > 0 && (
                <motion.span 
                  title="Score moyen"
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center"
                >
                  <Star className="w-3 h-3 mr-0.5 text-dutch-blue/70" /> {stats.averageScore.toFixed(1)}
                </motion.span>
              )}
              {stats.bestRound && (
                <span title="Meilleur score">Min: {stats.bestRound}</span>
              )}
              {hasImprovement && (
                <span className="text-green-600" title="Amélioration">↑ {Math.abs(stats.improvementRate).toFixed(1)}</span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showRounds && player.rounds.length > 0 && (
        <div className="mt-3 flex gap-2 overflow-x-auto py-1 scrollbar-none">
          {player.rounds.map((round, index) => {
            // Check if this is the best score for this player
            const isPlayerBestScore = stats?.bestRound === round.score || 
              (round.score > 0 && round.score === Math.min(...player.rounds.map(r => r.score).filter(s => s > 0)));
            
            return (
              <motion.div 
                key={index} 
                className={cn(
                  `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-transform shadow-sm`,
                  isLastRoundHighScore && index === player.rounds.length - 1 ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 ring-1 ring-green-400' :
                    round.isDutch ? 'bg-gradient-to-br from-dutch-orange to-dutch-pink text-white' : 
                    isPlayerBestScore ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 ring-1 ring-blue-300' : 'bg-gray-100'
                )}
                onClick={() => onRoundClick?.(index)}
                aria-label={`Manche ${index + 1}: ${round.score} points${round.isDutch ? ' (Dutch)' : ''}`}
                whileHover={{ scale: 1.15, rotate: [-1, 1, -1, 0] }}
                transition={{ scale: { duration: 0.2 }, rotate: { duration: 0.3 } }}
              >
                {round.score}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default PlayerScoreCard;

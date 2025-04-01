
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
  
  const progressPercentage = Math.min(player.totalScore, 100);
  
  const getPositionStyles = () => {
    switch(position) {
      case 1:
        return {
          card: 'border-2 border-dutch-yellow shadow-md shadow-dutch-yellow/10 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10',
          badge: 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white',
          progress: 'from-dutch-blue to-dutch-purple'
        };
      case 2:
        return {
          card: 'border border-dutch-purple/30 shadow-sm bg-dutch-purple/5',
          badge: 'bg-gradient-to-r from-dutch-purple to-dutch-pink text-white',
          progress: 'from-dutch-purple to-dutch-pink'
        };
      case 3:
        return {
          card: 'border border-dutch-orange/30 shadow-sm bg-dutch-orange/5',
          badge: 'bg-gradient-to-r from-dutch-orange to-dutch-pink text-white',
          progress: 'from-dutch-orange to-dutch-pink'
        };
      default:
        return {
          card: 'bg-white/60 backdrop-blur-sm border border-white/20',
          badge: 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700',
          progress: 'from-gray-300 to-gray-400'
        };
    }
  };
  
  const styles = getPositionStyles();

  const isLastRoundHighScore = lastRoundScore !== undefined && 
    player.rounds.length > 0 && 
    player.rounds[player.rounds.length - 1].score === lastRoundScore && 
    lastRoundScore === Math.min(...player.rounds.map(r => r.score).filter(s => s > 0));

  const stats = player.stats;
  const hasImprovement = stats?.improvementRate !== undefined && stats.improvementRate < 0;
  
  return (
    <motion.div 
      className={cn(
        "rounded-2xl p-5 transition-all backdrop-blur-sm",
        styles.card,
        `data-theme-${currentTheme}`
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: position * 0.05 }}
      layout
      whileHover={{ y: -3, boxShadow: "0 12px 25px -5px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${styles.badge} shadow-md`}>
          {isWinner || position === 1 ? <Trophy className="h-4 w-4" aria-hidden="true" /> : position}
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
                indicatorClassName={`bg-gradient-to-r ${styles.progress}`}
              />
              <motion.div 
                className={`absolute bottom-0 h-2.5 rounded-full bg-gradient-to-r ${styles.progress} blur-sm w-full opacity-30`}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
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
          
          <PlayerBadges player={player} className="mt-1.5" />
          
          {stats && (
            <div className="mt-1 text-xs text-gray-600 flex flex-wrap gap-x-3 gap-y-1">
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
                <span title="Meilleur score" className="text-green-600">Min: {stats.bestRound}</span>
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

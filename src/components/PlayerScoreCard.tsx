
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PlayerScoreCardProps {
  player: Player;
  position: number;
  isWinner?: boolean;
  showRounds?: boolean;
  lastRoundScore?: number;
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({ 
  player, 
  position, 
  isWinner = false,
  showRounds = true,
  lastRoundScore
}) => {
  // Calculate progress percentage (max score is 100)
  const progressPercentage = Math.min(player.totalScore, 100);
  
  // Determine color based on position
  const positionColors = [
    'bg-dutch-blue text-white', // 1st place
    'bg-dutch-purple text-white', // 2nd place
    'bg-dutch-orange text-white', // 3rd place
  ];
  
  const positionColor = position <= 3 
    ? positionColors[position - 1] 
    : 'bg-gray-200 text-gray-700';
  
  const cardClasses = isWinner
    ? 'dutch-card border-2 border-dutch-yellow bg-gradient-to-r from-dutch-purple/10 to-dutch-blue/10'
    : 'dutch-card';

  // Determine if this is the last round score
  const isLastRoundHighScore = lastRoundScore !== undefined && 
    player.rounds.length > 0 && 
    player.rounds[player.rounds.length - 1].score === lastRoundScore && 
    lastRoundScore === Math.min(...player.rounds.map(r => r.score).filter(s => s > 0));

  return (
    <motion.div 
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: position * 0.05 }}
      layout
    >
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${positionColor}`}>
          {isWinner ? <Trophy className="h-4 w-4" /> : position}
        </div>
        
        <div className="flex-grow overflow-hidden">
          <div className="flex items-center">
            <h3 className="font-semibold truncate">{player.name}</h3>
            {player.rounds.some(round => round.isDutch) && (
              <div className="ml-2 flex-shrink-0">
                <div className="px-2 py-0.5 bg-dutch-orange/20 text-dutch-orange text-xs font-medium rounded-full">
                  Dutch
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center">
              <span className="text-lg font-bold">{player.totalScore}</span>
              {lastRoundScore !== undefined && (
                <span className="ml-2 text-xs text-gray-500 flex items-center">
                  +{lastRoundScore}
                  {player.rounds.length > 1 && player.rounds[player.rounds.length - 1].score < player.rounds[player.rounds.length - 2].score && (
                    <TrendingDown className="h-3 w-3 ml-0.5 text-green-500" />
                  )}
                  {player.rounds.length > 1 && player.rounds[player.rounds.length - 1].score > player.rounds[player.rounds.length - 2].score && (
                    <TrendingUp className="h-3 w-3 ml-0.5 text-red-500" />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showRounds && player.rounds.length > 0 && (
        <div className="mt-2 flex gap-2 overflow-x-auto py-1 scrollbar-none">
          {player.rounds.map((round, index) => (
            <div 
              key={index} 
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${isLastRoundHighScore && index === player.rounds.length - 1 ? 'bg-green-100 text-green-800 ring-1 ring-green-400' :
                  round.isDutch ? 'bg-dutch-orange text-white' : 'bg-gray-100'}`}
            >
              {round.score}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PlayerScoreCard;

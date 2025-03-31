
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PlayerScoreCardProps {
  player: Player;
  position: number;
  isWinner?: boolean;
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({ player, position, isWinner = false }) => {
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
          <h3 className="font-semibold truncate">{player.name}</h3>
          
          <div className="flex items-center gap-2 mt-1">
            <Progress value={progressPercentage} className="h-2" />
            <span className="text-lg font-bold">{player.totalScore}</span>
          </div>
        </div>
      </div>
      
      {player.rounds.length > 0 && (
        <div className="mt-2 flex gap-2 overflow-x-auto py-1 scrollbar-none">
          {player.rounds.map((round, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium"
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

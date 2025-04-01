
import React from 'react';
import { Player } from '@/types';
import { Trophy, ArrowUp, ArrowDown, Minus, Medal, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PlayerScoreCardProps {
  player: Player;
  position: number;
  isWinner?: boolean;
  lastRoundScore?: number;
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({
  player,
  position,
  isWinner = false,
  lastRoundScore
}) => {
  // Déterminer la couleur de la bordure en fonction de la position
  const getBorderColor = () => {
    if (position === 1) return 'border-yellow-400';
    if (position === 2) return 'border-gray-300';
    if (position === 3) return 'border-amber-700';
    return 'border-white/30';
  };
  
  // Déterminer la couleur de fond de la position
  const getPositionColor = () => {
    if (position === 1) return 'bg-yellow-400 text-yellow-900';
    if (position === 2) return 'bg-gray-300 text-gray-700';
    if (position === 3) return 'bg-amber-700 text-amber-50';
    return 'bg-gray-200 text-gray-700';
  };
  
  // Déterminer l'icône et la couleur du dernier score
  const getScoreIndicator = () => {
    if (lastRoundScore === undefined) return null;
    
    if (lastRoundScore === 0) {
      return {
        icon: <Minus className="h-3 w-3" />,
        color: 'text-gray-500 bg-gray-200'
      };
    }
    
    if (lastRoundScore <= 5) {
      return {
        icon: <ArrowDown className="h-3 w-3" />,
        color: 'text-green-700 bg-green-100'
      };
    }
    
    return {
      icon: <ArrowUp className="h-3 w-3" />,
      color: 'text-red-700 bg-red-100'
    };
  };
  
  const indicator = getScoreIndicator();
  
  // Vérifier si le joueur a dutché récemment
  const hasRecentDutch = player.rounds && player.rounds.length > 0 && 
    player.rounds.slice(-3).some(round => round.isDutch);

  return (
    <div className={cn(
      "relative bg-white/70 backdrop-blur-sm rounded-xl p-4 border shadow-sm transition-all",
      getBorderColor()
    )}>
      <div className="flex items-center gap-3">
        {/* Position */}
        <div className={cn(
          "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm",
          getPositionColor()
        )}>
          {position}
        </div>
        
        {/* Info joueur */}
        <div className="flex-grow">
          <div className="font-medium text-gray-900 flex items-center gap-1.5">
            {player.name}
            {isWinner && <Trophy className="h-4 w-4 text-yellow-500" />}
            {hasRecentDutch && <Zap className="h-4 w-4 text-dutch-purple" />}
            {player.stats?.winStreak >= 2 && (
              <div className="flex items-center gap-0.5 text-xs font-normal px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                <Medal className="h-3 w-3" />
                <span>{player.stats.winStreak}</span>
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-500 flex items-center gap-1.5">
            <span>Total: {player.totalScore} pts</span>
            {player.stats && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100">
                Moy: {player.stats.averageScore.toFixed(1)}
              </span>
            )}
            {indicator && lastRoundScore !== undefined && (
              <div className={cn("text-xs rounded-full px-1.5 py-0.5 flex items-center gap-0.5", indicator.color)}>
                {indicator.icon}
                <span>{lastRoundScore}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Score total */}
        <div className="flex-shrink-0 text-lg font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
          {player.totalScore}
        </div>
      </div>
    </div>
  );
};

export default PlayerScoreCard;

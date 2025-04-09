
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { ArrowUp, ArrowDown, Medal, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PlayerScoreCardProps {
  player: Player;
  position: number;
  isWinner?: boolean;
  lastRoundScore?: number;
  warningThreshold?: number;
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({ 
  player, 
  position, 
  isWinner = false,
  lastRoundScore,
  warningThreshold
}) => {
  const isCloseToLimit = warningThreshold && player.totalScore >= warningThreshold;
  
  // Déterminer si le score de la dernière manche est positif, négatif ou nul
  const getScoreDirection = () => {
    if (lastRoundScore === undefined) return null;
    if (lastRoundScore > 0) return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (lastRoundScore < 0) return <TrendingDown className="h-4 w-4 text-green-500" />;
    return null;
  };

  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-xl border ${isWinner ? 'border-dutch-orange/40' : 'border-white/50'} shadow-sm p-4 flex items-center gap-3 transition-all ${isCloseToLimit ? 'bg-red-50' : ''}`}>
      {/* Position */}
      <div className={`w-8 h-8 flex-shrink-0 rounded-full ${getBgColor(position)} flex items-center justify-center text-white font-semibold text-sm`}>
        {position}
      </div>
      
      {/* Nom et informations */}
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800 flex items-center">
            {player.name}
            {isWinner && (
              <span className="ml-1">
                <Medal className="h-4 w-4 text-dutch-orange inline-block" />
              </span>
            )}
          </h3>
          <div className="flex items-center gap-1">
            {getScoreDirection()}
            <span className={`font-semibold ${isCloseToLimit ? 'text-red-600' : 'text-gray-700'}`}>{player.totalScore}</span>
            {isCloseToLimit && (
              <Badge variant="destructive" className="ml-1 text-xs">
                Proche limite
              </Badge>
            )}
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="mt-1 flex items-center text-xs gap-2 text-gray-500">
          <span>{player.rounds ? player.rounds.length : 0} manches</span>
          <span>•</span>
          <span>
            {player.rounds && player.rounds.some(round => round.isDutch) ? 
              `${player.rounds.filter(round => round.isDutch).length} Dutch` : 
              'Pas de Dutch'}
          </span>
          {lastRoundScore !== undefined && (
            <>
              <span>•</span>
              <span className={`${lastRoundScore > 0 ? 'text-red-500' : lastRoundScore < 0 ? 'text-green-500' : ''}`}>
                Dernier: {lastRoundScore > 0 ? `+${lastRoundScore}` : lastRoundScore}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Fonction pour obtenir la couleur d'arrière-plan en fonction de la position
const getBgColor = (position: number): string => {
  switch(position) {
    case 1: return 'bg-dutch-orange';
    case 2: return 'bg-dutch-purple';
    case 3: return 'bg-dutch-blue';
    default: return 'bg-gray-500';
  }
};

export default PlayerScoreCard;

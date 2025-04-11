
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { ChevronUp, ChevronDown, Sparkles, ThumbsUp } from 'lucide-react';
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
  // Déterminer si le joueur est proche du seuil d'avertissement
  const isNearThreshold = warningThreshold && player.totalScore >= warningThreshold;
  
  // Déterminer si le dernier score était bon ou mauvais
  const isLastScoreGood = lastRoundScore !== undefined && lastRoundScore <= 5;
  const isLastScoreBad = lastRoundScore !== undefined && lastRoundScore >= 10;
  
  // Style pour le graphe de progression des manches
  const roundCount = player.rounds.length;
  
  return (
    <div className={`
      p-4 rounded-2xl border transition-all shadow-md
      ${isWinner ? 'bg-dutch-purple/20 border-dutch-purple/50' : 'bg-white border-white/80'}
      ${isNearThreshold ? 'bg-dutch-orange/20 border-dutch-orange/40' : ''}
    `}>
      <div className="flex items-center gap-3">
        {/* Position */}
        <div className={`
          h-8 w-8 rounded-full flex items-center justify-center text-white font-bold
          ${position === 1 ? 'bg-dutch-purple' : position === 2 ? 'bg-blue-500' : position === 3 ? 'bg-dutch-orange' : 'bg-gray-400'}
        `}>
          {position}
        </div>
        
        {/* Informations du joueur */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{player.name}</h3>
          
          {/* Statistiques simples */}
          <div className="flex text-xs text-gray-600 mt-1 gap-2">
            <span>{player.rounds.length || 0} manches</span>
            {player.stats?.dutchCount ? (
              <span className="flex items-center">
                <Sparkles className="h-3 w-3 mr-0.5 text-dutch-purple" />
                {player.stats.dutchCount} Dutch
              </span>
            ) : null}
          </div>
        </div>
        
        {/* Score */}
        <div className="text-right">
          <div className="flex items-center gap-1">
            <span className={`text-xl font-bold ${isNearThreshold ? 'text-dutch-orange' : 'text-gray-800'}`}>
              {player.totalScore}
            </span>
            
            {/* Indicateur de changement de score */}
            {lastRoundScore !== undefined && (
              <div className="flex flex-col items-center">
                {isLastScoreGood ? (
                  <Badge variant="outline" className="text-xs px-1 py-0 bg-green-100 text-green-600 border-green-200">
                    <ChevronDown className="h-3 w-3 mr-0.5" />
                    {lastRoundScore}
                  </Badge>
                ) : isLastScoreBad ? (
                  <Badge variant="outline" className="text-xs px-1 py-0 bg-red-100 text-red-600 border-red-200">
                    <ChevronUp className="h-3 w-3 mr-0.5" />
                    {lastRoundScore}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs px-1 py-0 bg-gray-100 text-gray-600 border-gray-200">
                    {lastRoundScore}
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {/* Affichage des statistiques supplémentaires */}
          {player.stats?.streakInfo?.current > 1 && (
            <div className="text-xs flex items-center justify-end mt-1">
              <ThumbsUp className="h-3 w-3 mr-1 text-dutch-blue" />
              <span className="text-dutch-blue font-medium">
                {player.stats.streakInfo.current} en série
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Graphique simplifié de progression des scores */}
      {roundCount > 0 && (
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-dutch-blue to-dutch-purple"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (player.totalScore / (warningThreshold || 100)) * 100)}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerScoreCard;

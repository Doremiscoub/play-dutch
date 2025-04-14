
/**
 * Carte de score du joueur avec historique des manches
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { ChevronUp, ChevronDown, Sparkles, ThumbsUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getScoreColorClass } from '@/utils/gameUtils';

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
  
  // Nombre de manches
  const roundCount = player.rounds.length;

  // Commentaire dynamique sur la performance du joueur
  const getDynamicComment = () => {
    if (!player.rounds || player.rounds.length < 2) return null;
    
    // Afficher les séries de victoires
    if (player.stats?.streakInfo?.current > 1) {
      return (
        <div className="text-xs flex items-center text-dutch-blue font-medium">
          <ThumbsUp className="h-3 w-3 mr-1 text-dutch-blue" />
          <span>{player.stats.streakInfo.current} en série</span>
        </div>
      );
    }
    
    // Autres commentaires potentiels basés sur l'évolution des scores
    const lastThreeRounds = player.rounds.slice(-3);
    if (lastThreeRounds.length >= 3) {
      const avg1 = lastThreeRounds[0].score;
      const avg2 = lastThreeRounds[1].score;
      const avg3 = lastThreeRounds[2].score;
      
      if (avg3 < avg2 && avg2 < avg1) {
        return (
          <div className="text-xs flex items-center text-green-600 font-medium">
            <ChevronUp className="h-3 w-3 mr-1 text-green-600" />
            <span>En grande forme</span>
          </div>
        );
      } else if (avg3 > avg2 && avg2 > avg1) {
        return (
          <div className="text-xs flex items-center text-red-600 font-medium">
            <ChevronDown className="h-3 w-3 mr-1 text-red-600" />
            <span>En difficulté</span>
          </div>
        );
      }
    }
    
    // Dutch réussis
    if (player.stats?.dutchCount) {
      return (
        <div className="text-xs flex items-center text-dutch-purple font-medium">
          <Sparkles className="h-3 w-3 mr-1 text-dutch-purple" />
          <span>{player.stats.dutchCount} Dutch</span>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`
      relative p-4 rounded-2xl border backdrop-blur-sm transition-all
      ${isWinner 
        ? 'bg-dutch-purple/30 border-dutch-purple shadow-[0_8px_30px_rgb(139,92,246,0.2)]' 
        : 'bg-white/95 border-white shadow-[0_4px_30px_rgba(0,0,0,0.08)]'}
      ${isNearThreshold ? 'bg-dutch-orange/30 border-dutch-orange/60 shadow-[0_8px_30px_rgb(249,115,22,0.2)]' : ''}
    `}>
      <div className="flex items-center gap-3">
        {/* Position */}
        <div className={`
          h-8 w-8 rounded-full flex items-center justify-center text-white font-bold shadow-md
          ${position === 1 ? 'bg-dutch-purple' : position === 2 ? 'bg-blue-500' : position === 3 ? 'bg-dutch-orange' : 'bg-gray-400'}
        `}>
          {position}
        </div>
        
        {/* Informations du joueur */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{player.name}</h3>
          
          {/* Commentaire dynamique sur la performance */}
          {getDynamicComment()}
        </div>
        
        {/* Score */}
        <div className="text-right">
          <div className="flex items-center gap-1">
            <span className={`text-xl font-bold ${isNearThreshold ? 'text-dutch-orange' : 'text-gray-800'}`}>
              {player.totalScore}
            </span>
          </div>
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
      
      {/* Scores par manche avec défilement horizontal */}
      {roundCount > 0 && (
        <div className="mt-3">
          <ScrollArea className="w-full" orientation="horizontal">
            <div className="flex gap-1.5 py-2 pr-4 justify-end">
              {/* Afficher les scores des manches de l'ancienne à la plus récente (droite) */}
              {[...player.rounds].map((round, idx) => {
                const roundNumber = idx + 1;
                return (
                  <div 
                    key={`round-${roundNumber}`} 
                    className={`${getScoreColorClass(round.score)} min-w-[30px] h-6 rounded-md flex items-center justify-center text-xs font-medium ${round.isDutch ? 'ring-2 ring-dutch-purple ring-offset-1' : ''}`}
                    title={`Manche ${roundNumber}${round.isDutch ? ' (Dutch)' : ''}: ${round.score} points`}
                  >
                    {round.score}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default PlayerScoreCard;

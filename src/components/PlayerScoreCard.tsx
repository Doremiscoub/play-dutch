
/**
 * Carte de score du joueur avec historique des manches
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { ChevronUp, ChevronDown, Sparkles, ThumbsUp, ChevronRight, Cpu, Zap, Flame, Trophy, Target } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getScoreColorClass } from '@/utils/gameUtils';
import { cn } from '@/lib/utils';

interface PlayerScoreCardProps {
  player: Player;
  position: number;
  isWinner?: boolean;
  lastRoundScore?: number;
  warningThreshold?: number;
  isExpanded?: boolean;
  expandedContent?: React.ReactNode;
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({
  player,
  position,
  isWinner = false,
  lastRoundScore,
  warningThreshold,
  isExpanded = false,
  expandedContent
}) => {
  // Déterminer si le joueur est proche du seuil d'avertissement
  const isNearThreshold = warningThreshold && player.totalScore >= warningThreshold;
  
  // Nombre de manches
  const roundCount = player.rounds.length;

  // Déterminer un profil de jeu dynamique
  const getPlayerProfile = () => {
    const stats = player.stats;
    if (!stats) return null;
    
    // Évaluer le style de jeu
    const consistencyScore = stats.consistencyScore || 0;
    const dutchCount = stats.dutchCount || 0;
    const improvementRate = stats.improvementRate || 0;
    const averageScore = stats.averageScore || 0;
    
    let profile = '';
    let icon = null;
    let colorClass = '';
    
    if (consistencyScore < 5 && averageScore < 15) {
      profile = 'Tacticien précis';
      icon = <Target className="h-4 w-4 mr-1 text-dutch-blue" />;
      colorClass = 'text-dutch-blue';
    } else if (dutchCount > 2 || (dutchCount > 0 && roundCount < 5)) {
      profile = 'Maître Dutch';
      icon = <Sparkles className="h-4 w-4 mr-1 text-purple-500" />;
      colorClass = 'text-purple-500';
    } else if (improvementRate < -2) {
      profile = 'En grande progression';
      icon = <Flame className="h-4 w-4 mr-1 text-orange-500" />;
      colorClass = 'text-orange-500';
    } else if (consistencyScore > 15) {
      profile = 'Joueur imprévisible';
      icon = <Zap className="h-4 w-4 mr-1 text-amber-500" />;
      colorClass = 'text-amber-500';
    } else if (position <= 2) {
      profile = 'Compétiteur redoutable';
      icon = <Trophy className="h-4 w-4 mr-1 text-green-500" />;
      colorClass = 'text-green-500';
    } else {
      profile = 'Joueur stratégique';
      icon = <Cpu className="h-4 w-4 mr-1 text-gray-500" />;
      colorClass = 'text-gray-500';
    }
    
    return { profile, icon, colorClass };
  };

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

  // Style dynamique pour le badge de position
  const getPositionBadgeStyle = () => {
    if (position === 1) return "bg-dutch-purple text-white";
    if (position === 2) return "bg-blue-500 text-white";
    if (position === 3) return "bg-dutch-orange text-white";
    return "bg-gray-400 text-white";
  };

  const profileInfo = getPlayerProfile();

  return (
    <div className={`
      relative p-4 rounded-2xl border backdrop-blur-sm transition-all
      ${isWinner 
        ? 'bg-dutch-purple/30 border-dutch-purple shadow-[0_8px_30px_rgb(139,92,246,0.2)]' 
        : 'bg-white/95 border-white shadow-[0_4px_30px_rgba(0,0,0,0.08)]'}
      ${isNearThreshold ? 'bg-dutch-orange/30 border-dutch-orange/60 shadow-[0_8px_30px_rgb(249,115,22,0.2)]' : ''}
      ${isExpanded ? 'ring-2 ring-dutch-blue/30 shadow-lg' : ''}
    `}>
      <div className="flex items-center gap-3">
        {/* Position */}
        <div className={`
          h-9 w-9 rounded-full flex items-center justify-center font-bold shadow-md
          ${getPositionBadgeStyle()}
        `}>
          {position}
        </div>
        
        {/* Informations du joueur */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{player.name}</h3>
          
          {/* Commentaire dynamique sur la performance */}
          {getDynamicComment()}
        </div>
        
        {/* Score et indicateur d'expansion */}
        <div className="text-right flex items-center">
          <div className={`
            px-3 py-1 rounded-xl 
            ${isNearThreshold 
              ? 'bg-dutch-orange/20 text-dutch-orange' 
              : 'bg-gray-100'}
            ${isWinner ? 'bg-dutch-purple/20 text-dutch-purple' : ''}
          `}>
            <span className="text-xl font-bold">
              {player.totalScore}
            </span>
          </div>
          
          <ChevronRight className={`ml-2 h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}/>
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
      
      {/* Contenu étendu - Statistiques détaillées */}
      <AnimatePresence>
        {isExpanded && expandedContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Profil de joueur */}
            {profileInfo && (
              <div className="mt-4 mb-2">
                <div className={cn("px-3 py-1.5 rounded-lg inline-flex items-center bg-gray-50", profileInfo.colorClass)}>
                  {profileInfo.icon}
                  <span className="font-medium">{profileInfo.profile}</span>
                </div>
              </div>
            )}
            
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayerScoreCard;

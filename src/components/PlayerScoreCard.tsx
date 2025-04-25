
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

  const profileInfo = getPlayerProfile();

  return (
    <motion.div
      className={cn(
        "group relative p-6 rounded-3xl transition-all duration-500",
        "backdrop-blur-xl border shadow-lg",
        isWinner ? 
          "bg-gradient-to-br from-dutch-purple/20 via-dutch-blue/10 to-dutch-orange/5 border-dutch-purple/30" : 
          "bg-gradient-to-br from-white/80 via-white/60 to-white/40 border-white/50",
        isNearThreshold ? 
          "bg-gradient-to-br from-dutch-orange/20 via-dutch-orange/10 to-white/60 border-dutch-orange/30" : "",
        isExpanded ? 
          "ring-2 ring-dutch-blue/20 shadow-xl scale-[1.02]" : 
          "hover:scale-[1.01] hover:shadow-xl"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-dutch-purple/10 to-transparent rounded-full blur-2xl transform rotate-45 group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-dutch-blue/10 to-transparent rounded-full blur-2xl transform -rotate-45 group-hover:scale-150 transition-transform duration-700" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          {/* Position Badge */}
          <motion.div
            className={cn(
              "h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg",
              position === 1 ? "bg-dutch-purple text-white" :
              position === 2 ? "bg-dutch-blue text-white" :
              position === 3 ? "bg-dutch-orange text-white" :
              "bg-gray-400/80 text-white"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {position}
          </motion.div>
          
          {/* Informations du joueur */}
          <div className="flex-1">
            <motion.h3 
              className="text-xl font-bold bg-gradient-to-r from-dutch-purple to-dutch-blue bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {player.name}
            </motion.h3>
            
            {/* Commentaire dynamique */}
            {getDynamicComment()}
          </div>
          
          {/* Score total */}
          <div className="text-right flex items-center gap-2">
            <motion.div 
              className={cn(
                "px-4 py-2 rounded-xl font-bold text-2xl",
                isNearThreshold ? "bg-dutch-orange/20 text-dutch-orange" :
                isWinner ? "bg-dutch-purple/20 text-dutch-purple" :
                "bg-gray-100"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {player.totalScore}
            </motion.div>
            
            <ChevronRight 
              className={cn(
                "h-6 w-6 text-gray-400 transition-transform duration-300",
                isExpanded ? "rotate-90" : ""
              )}
            />
          </div>
        </div>

        {/* Barre de progression */}
        {roundCount > 0 && (
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (player.totalScore / (warningThreshold || 100)) * 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Scores par manche */}
        {roundCount > 0 && (
          <ScrollArea className="w-full mt-4" orientation="horizontal">
            <div className="flex gap-2 py-2">
              {player.rounds.map((round, idx) => (
                <motion.div
                  key={`round-${idx}`}
                  className={cn(
                    "min-w-[40px] h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                    getScoreColorClass(round.score),
                    round.isDutch && "ring-2 ring-dutch-purple ring-offset-2"
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {round.score}
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Contenu étendu */}
        <AnimatePresence>
          {isExpanded && expandedContent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Profil du joueur */}
              {profileInfo && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={cn(
                    "px-4 py-2 rounded-xl inline-flex items-center bg-gray-50/80",
                    profileInfo.colorClass
                  )}>
                    {profileInfo.icon}
                    <span className="font-medium">{profileInfo.profile}</span>
                  </div>
                </motion.div>
              )}
              
              {expandedContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PlayerScoreCard;


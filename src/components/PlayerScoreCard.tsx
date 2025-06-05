
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getScoreColorClass } from '@/utils/gameUtils';
import { PlayerComment } from './game/PlayerComment';
import { PlayerProfile } from './game/PlayerProfile';
import { getScoreCardContainerClass, getPositionBadgeClass } from './game/scoreCardStyles';
import { cn } from '@/lib/utils';

interface PlayerScoreCardProps {
  player: Player;
  position: number;
  isWinner?: boolean;
  lastRoundScore?: number;
  warningThreshold?: number;
  expandedContent?: React.ReactNode;
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({
  player,
  position,
  isWinner = false,
  lastRoundScore,
  warningThreshold,
  expandedContent
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isNearThreshold = warningThreshold && player.totalScore >= warningThreshold;
  const roundCount = player.rounds.length;
  const profileInfo = PlayerProfile({ player, position });

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-3xl backdrop-blur-xl border shadow-lg transition-all duration-300 cursor-pointer overflow-hidden",
        "bg-white/80 border-white/50 hover:bg-white/90 hover:shadow-xl",
        isExpanded ? "ring-2 ring-dutch-blue/20 shadow-xl" : "hover:scale-[1.01]"
      )}
      onClick={toggleExpansion}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-dutch-purple/10 to-transparent rounded-full blur-2xl transform rotate-45 group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-dutch-blue/10 to-transparent rounded-full blur-2xl transform -rotate-45 group-hover:scale-150 transition-transform duration-700" />
      </div>

      <div className="relative z-10 p-4">
        <div className="flex items-center gap-4">
          {/* Position Badge */}
          <motion.div
            className={getPositionBadgeClass(position)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {position}
          </motion.div>
          
          {/* Player emoji and name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl">{player.emoji || '😊'}</span>
            <motion.h3 
              className="text-xl font-bold bg-gradient-to-r from-dutch-purple to-dutch-blue bg-clip-text text-transparent truncate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {player.name}
            </motion.h3>
          </div>
          
          {/* Score total */}
          <div className="flex items-center gap-2">
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
            
            <ChevronDown 
              className={cn(
                "h-6 w-6 text-gray-400 transition-transform duration-300",
                isExpanded ? "rotate-180" : ""
              )}
            />
          </div>
        </div>

        {/* Contenu étendu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              {/* Commentaire du joueur */}
              <PlayerComment 
                player={player}
                lastRoundScore={lastRoundScore}
                roundCount={roundCount}
              />

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

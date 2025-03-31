import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PodiumViewProps {
  players: Player[];
  onClose: () => void;
}

const PodiumView: React.FC<PodiumViewProps> = ({ players, onClose }) => {
  // Sort players by score (ascending is better in Dutch)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Get top 3 players (or less if fewer players)
  const topPlayers = sortedPlayers.slice(0, Math.min(3, sortedPlayers.length));
  
  // Get remaining players
  const otherPlayers = sortedPlayers.slice(Math.min(3, sortedPlayers.length));
  
  // Calculate player statistics for display
  const getPlayerStat = (player: Player) => {
    const stats = player.stats || {
      bestRound: null,
      dutchCount: 0,
      averageScore: 0,
      worstRound: null
    };
    
    // Calculate the most common statistic
    const bestStat = stats.bestRound !== null
      ? `Meilleur manche: ${stats.bestRound}`
      : stats.dutchCount > 0
        ? `Dutch: ${stats.dutchCount} fois`
        : `Moyenne: ${Math.round(stats.averageScore * 10) / 10}`;
    
    return bestStat;
  };
  
  // Determine podium heights
  const getPodiumHeight = (position: number) => {
    if (position === 0) return 'h-36';
    if (position === 1) return 'h-28';
    return 'h-20';
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-xl rounded-3xl bg-white/60 backdrop-blur-md border border-white/20 p-8 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dutch-blue mb-2">Résultats de la partie</h2>
          <p className="text-gray-600">
            {topPlayers[0]?.name} remporte la partie avec {topPlayers[0]?.totalScore} points !
          </p>
        </div>
        
        {/* Podium section */}
        <div className="flex items-end justify-center gap-4 mb-8 h-40">
          {topPlayers.map((player, index) => {
            // Determine which position (0 = winner, so needs to be in center)
            let podiumPosition = index;
            if (topPlayers.length === 3) {
              // For 3 players: Shift positions to make winner in center
              if (index === 0) podiumPosition = 1; // Winner in center
              else if (index === 1) podiumPosition = 0; // 2nd place on left
              else podiumPosition = 2; // 3rd place on right
            } else if (topPlayers.length === 2) {
              // For 2 players: Have winner on left and 2nd on right
              podiumPosition = index;
            }
            
            // Position-specific styling
            const positionClasses = [
              "order-1", // 2nd place (left)
              "order-2", // 1st place (middle)
              "order-3", // 3rd place (right)
            ];
            
            // Position-specific icons
            const positionIcons = [
              <Medal key="silver" className="h-7 w-7 text-gray-400" aria-hidden="true" />,
              <Trophy key="gold" className="h-8 w-8 text-dutch-yellow" aria-hidden="true" />,
              <Award key="bronze" className="h-7 w-7 text-dutch-orange" aria-hidden="true" />
            ];
            
            // Color classes for each position
            const colorClasses = [
              "from-gray-100 to-gray-300 border-gray-400", // 2nd
              "from-yellow-50 to-yellow-100 border-dutch-yellow", // 1st
              "from-orange-50 to-orange-100 border-dutch-orange", // 3rd
            ];
            
            return (
              <motion.div
                key={player.id}
                className={cn(
                  "flex flex-col items-center",
                  positionClasses[podiumPosition]
                )}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
              >
                <div className="flex flex-col items-center gap-2 mb-2">
                  {positionIcons[podiumPosition]}
                  <span className="font-bold text-sm">
                    {index === 0 ? "1er" : index === 1 ? "2ème" : "3ème"}
                  </span>
                </div>
                
                <motion.div 
                  className={cn(
                    "relative w-24 flex flex-col items-center justify-start rounded-t-lg bg-gradient-to-b border-b-4",
                    getPodiumHeight(podiumPosition),
                    colorClasses[podiumPosition]
                  )}
                  initial={{ height: 0 }}
                  animate={{ height: getPodiumHeight(podiumPosition) }}
                  transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
                >
                  <div className="absolute -top-14 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/70 flex items-center justify-center mb-1 border border-white/30 shadow-md">
                      <span className="text-lg font-bold">{player.totalScore}</span>
                    </div>
                    <span className="text-sm font-semibold max-w-20 truncate">{player.name}</span>
                    <span className="text-xs text-gray-500">{getPlayerStat(player)}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Other players */}
        {otherPlayers.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Autres joueurs</h3>
            <div className="grid grid-cols-2 gap-2">
              {otherPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="p-3 rounded-xl bg-white/50 border border-white/30 flex justify-between items-center"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                      {index + 4}
                    </div>
                    <span className="font-medium text-sm">{player.name}</span>
                  </div>
                  <span className="font-bold">{player.totalScore}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-3 mt-10">
          <motion.button
            className="flex-1 rounded-full px-4 py-3 bg-dutch-purple/10 hover:bg-dutch-purple/20 text-dutch-purple border border-dutch-purple/20"
            onClick={onClose}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Retour au jeu
          </motion.button>
          <motion.button
            className="flex-1 rounded-full px-4 py-3 bg-dutch-blue text-white hover:bg-dutch-blue/90 shadow-md"
            onClick={onClose}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Nouvelle partie
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PodiumView;

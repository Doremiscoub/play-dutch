
import React from 'react';
import { Trophy, Star, Target, Zap, Award, Medal, Crown, Shield, Rocket, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Player } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

const badges = [
  {
    id: 'winner',
    name: 'Vainqueur',
    description: 'A remporté une partie récemment',
    icon: Trophy,
    color: 'text-dutch-yellow bg-dutch-yellow/20 border-dutch-yellow/30',
    condition: (player: Player) => player.stats?.winStreak && player.stats.winStreak > 0
  },
  {
    id: 'consistent',
    name: 'Régularité',
    description: 'Maintient des scores stables',
    icon: Target,
    color: 'text-dutch-green bg-dutch-green/20 border-dutch-green/30',
    condition: (player: Player) => player.stats?.consistencyScore !== undefined && player.stats.consistencyScore < 3
  },
  {
    id: 'improved',
    name: 'Amélioration',
    description: 'S\'améliore constamment',
    icon: Rocket,
    color: 'text-dutch-orange bg-dutch-orange/20 border-dutch-orange/30',
    condition: (player: Player) => player.stats?.improvementRate !== undefined && player.stats.improvementRate < 0
  },
  {
    id: 'streaker',
    name: 'Série',
    description: 'En série de victoires',
    icon: Medal,
    color: 'text-dutch-blue bg-dutch-blue/20 border-dutch-blue/30',
    condition: (player: Player) => player.stats?.winStreak && player.stats.winStreak >= 3
  },
  {
    id: 'lucky',
    name: 'Chanceux',
    description: 'A eu une manche exceptionnelle',
    icon: Sparkles,
    color: 'text-dutch-purple bg-dutch-purple/20 border-dutch-purple/30',
    condition: (player: Player) => player.stats?.bestRound !== null && player.stats?.bestRound !== undefined && player.stats.bestRound <= 2
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Excellent score moyen sur au moins 5 parties',
    icon: Crown,
    color: 'text-dutch-pink bg-dutch-pink/20 border-dutch-pink/30',
    condition: (player: Player) => player.stats?.averageScore !== undefined && player.stats.averageScore < 5 && player.rounds.length >= 5
  },
  {
    id: 'defender',
    name: 'Défenseur',
    description: 'Évite les scores élevés',
    icon: Shield,
    color: 'text-dutch-blue bg-dutch-blue/20 border-dutch-blue/30',
    condition: (player: Player) => player.stats?.worstRound !== undefined && player.stats.worstRound < 10 && player.rounds.length >= 3
  }
];

interface PlayerBadgesProps {
  player: Player;
  className?: string;
  limit?: number;
  showTooltip?: boolean;
}

const PlayerBadges: React.FC<PlayerBadgesProps> = ({ 
  player, 
  className, 
  limit = 999, 
  showTooltip = true 
}) => {
  const earnedBadges = badges.filter(badge => badge.condition(player));

  if (earnedBadges.length === 0) {
    return null;
  }

  // Limit the number of badges to display
  const displayBadges = earnedBadges.slice(0, limit);
  const hiddenCount = earnedBadges.length - limit;

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {displayBadges.map((badge, index) => (
        <TooltipProvider key={badge.id} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div 
                className={cn(
                  "rounded-full border px-2 py-0.5 text-xs font-medium flex items-center gap-1",
                  badge.color
                )}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.2, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 500
                }}
                whileHover={{ scale: 1.05 }}
              >
                <badge.icon className="h-3 w-3" />
                <span className="hidden sm:inline">{badge.name}</span>
              </motion.div>
            </TooltipTrigger>
            {showTooltip && (
              <TooltipContent side="bottom" className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg px-3 py-1.5">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 font-semibold text-sm text-gray-700">
                    <badge.icon className="h-3.5 w-3.5" />
                    <span>{badge.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{badge.description}</p>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
      
      {hiddenCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div 
                className="rounded-full border px-2 py-0.5 text-xs font-medium flex items-center gap-1 bg-gray-100 text-gray-700"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.2, 
                  delay: displayBadges.length * 0.05,
                  type: "spring",
                  stiffness: 500
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span>+{hiddenCount}</span>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg">
              <div className="flex flex-col gap-1.5">
                {earnedBadges.slice(limit).map(badge => (
                  <div key={badge.id} className="flex items-center gap-1.5">
                    <badge.icon className={`h-3.5 w-3.5 ${badge.color.split(' ')[0]}`} />
                    <span className="text-sm">{badge.name}</span>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default PlayerBadges;

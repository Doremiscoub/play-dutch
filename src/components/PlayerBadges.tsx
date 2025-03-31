
import React from 'react';
import { Trophy, Star, Target, Zap, Award, Heart, Crown, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Player } from '@/types';

const badges = [
  {
    id: 'winner',
    name: 'Vainqueur',
    icon: Trophy,
    color: 'text-dutch-yellow bg-dutch-yellow/20 border-dutch-yellow/30',
    condition: (player: Player) => player.stats?.winStreak && player.stats.winStreak > 0
  },
  {
    id: 'consistent',
    name: 'Régularité',
    icon: Target,
    color: 'text-dutch-green bg-dutch-green/20 border-dutch-green/30',
    condition: (player: Player) => player.stats?.consistencyScore !== undefined && player.stats.consistencyScore < 3
  },
  {
    id: 'improved',
    name: 'Amélioration',
    icon: Zap,
    color: 'text-dutch-orange bg-dutch-orange/20 border-dutch-orange/30',
    condition: (player: Player) => player.stats?.improvementRate !== undefined && player.stats.improvementRate < 0
  },
  {
    id: 'streaker',
    name: 'Série',
    icon: Medal,
    color: 'text-dutch-blue bg-dutch-blue/20 border-dutch-blue/30',
    condition: (player: Player) => player.stats?.winStreak && player.stats.winStreak >= 3
  },
  {
    id: 'lucky',
    name: 'Chanceux',
    icon: Star,
    color: 'text-dutch-purple bg-dutch-purple/20 border-dutch-purple/30',
    condition: (player: Player) => player.stats?.bestRound !== null && player.stats?.bestRound !== undefined && player.stats.bestRound <= 2
  },
  {
    id: 'champion',
    name: 'Champion',
    icon: Crown,
    color: 'text-dutch-pink bg-dutch-pink/20 border-dutch-pink/30',
    condition: (player: Player) => player.stats?.averageScore !== undefined && player.stats.averageScore < 5 && player.rounds.length >= 5
  }
];

interface PlayerBadgesProps {
  player: Player;
  className?: string;
}

const PlayerBadges: React.FC<PlayerBadgesProps> = ({ player, className }) => {
  const earnedBadges = badges.filter(badge => badge.condition(player));

  if (earnedBadges.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {earnedBadges.map(badge => (
        <div 
          key={badge.id}
          className={cn(
            "rounded-full border px-2 py-0.5 text-xs font-medium flex items-center gap-1",
            badge.color
          )}
          title={badge.name}
        >
          <badge.icon className="h-3 w-3" />
          <span className="hidden sm:inline">{badge.name}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayerBadges;

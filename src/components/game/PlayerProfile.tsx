
import React from 'react';
import { Target, Sparkles, Flame, Zap, Trophy, Cpu } from 'lucide-react';
import { Player } from '@/types';

interface PlayerProfileProps {
  player: Player;
  position: number;
}

interface ProfileData {
  profile: string;
  icon: JSX.Element;
  colorClass: string;
}

export const PlayerProfile = ({ player, position }: PlayerProfileProps): ProfileData => {
  const stats = player.stats;
  if (!stats) return {
    profile: 'Joueur',
    icon: <Cpu className="h-4 w-4 mr-1 text-gray-500" />,
    colorClass: 'text-gray-500'
  };
  
  const consistencyScore = stats.consistencyScore || 0;
  const dutchCount = stats.dutchCount || 0;
  const improvementRate = stats.improvementRate || 0;
  const averageScore = stats.averageScore || 0;
  const roundCount = player.rounds.length;
  
  if (consistencyScore < 5 && averageScore < 15) {
    return {
      profile: 'Tacticien précis',
      icon: <Target className="h-4 w-4 mr-1 text-dutch-blue" />,
      colorClass: 'text-dutch-blue'
    };
  }
  
  if (dutchCount > 2 || (dutchCount > 0 && roundCount < 5)) {
    return {
      profile: 'Maître Dutch',
      icon: <Sparkles className="h-4 w-4 mr-1 text-purple-500" />,
      colorClass: 'text-purple-500'
    };
  }
  
  if (improvementRate < -2) {
    return {
      profile: 'En grande progression',
      icon: <Flame className="h-4 w-4 mr-1 text-orange-500" />,
      colorClass: 'text-orange-500'
    };
  }
  
  if (consistencyScore > 15) {
    return {
      profile: 'Joueur imprévisible',
      icon: <Zap className="h-4 w-4 mr-1 text-amber-500" />,
      colorClass: 'text-amber-500'
    };
  }
  
  if (position <= 2) {
    return {
      profile: 'Compétiteur redoutable',
      icon: <Trophy className="h-4 w-4 mr-1 text-green-500" />,
      colorClass: 'text-green-500'
    };
  }
  
  return {
    profile: 'Joueur stratégique',
    icon: <Cpu className="h-4 w-4 mr-1 text-gray-500" />,
    colorClass: 'text-gray-500'
  };
};

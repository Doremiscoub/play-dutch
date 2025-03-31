import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Player } from '@/types';
import { Flame, Award, Zap, TrendingUp, TrendingDown, Shield, Target } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface PlayerBadgesProps {
  player: Player;
  compact?: boolean;
}

const PlayerBadges: React.FC<PlayerBadgesProps> = ({ player, compact = false }) => {
  const bestRoundBadge = player.stats?.bestRound !== null ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="mr-1">
            <Flame className="h-3.5 w-3.5 mr-1" />
            {compact ? 'Meilleur' : 'Meilleur score'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Meilleur score: {player.stats?.bestRound} pts</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;

  const dutchCountBadge = player.stats?.dutchCount > 0 ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="mr-1">
            <Zap className="h-3.5 w-3.5 mr-1" />
            {compact ? 'Dutch' : 'Plus Dutch'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Nombre de fois Dutch: {player.stats?.dutchCount}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;

  const winStreakBadge = player.stats?.winStreak > 0 ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="mr-1">
            <Award className="h-3.5 w-3.5 mr-1" />
            {compact ? 'Série' : 'Série victoire'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Série de victoires: {player.stats?.winStreak}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;

  const improvementRateBadge = player.stats?.improvementRate > 0 ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="mr-1">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            {compact ? 'Progrès' : 'Progression'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Taux d'amélioration: {player.stats?.improvementRate}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;

  const declineRateBadge = player.stats?.improvementRate < 0 ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="mr-1">
            <TrendingDown className="h-3.5 w-3.5 mr-1" />
            {compact ? 'Déclin' : 'Déclin'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Taux de déclin: {player.stats?.improvementRate}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;

  const consistencyBadge = player.stats?.consistencyScore > 0 ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="mr-1">
            <Shield className="h-3.5 w-3.5 mr-1" />
            {compact ? 'Consistant' : 'Consistance'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Score de consistance: {player.stats?.consistencyScore}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;

  const averageScoreBadge = player.stats?.averageScore > 0 ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="mr-1">
            <Target className="h-3.5 w-3.5 mr-1" />
            {compact ? 'Moyenne' : 'Score moyen'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Score moyen: {player.stats?.averageScore}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;
  
  return (
    <div className="flex flex-wrap items-center">
      {averageScoreBadge}
      {bestRoundBadge}
      {dutchCountBadge}
      {winStreakBadge}
      {improvementRateBadge}
      {declineRateBadge}
      {consistencyBadge}
    </div>
  );
};

export default PlayerBadges;

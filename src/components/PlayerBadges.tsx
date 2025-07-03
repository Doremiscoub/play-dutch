
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Player } from '@/types';
import { Flame, Award, Zap, TrendingUp, TrendingDown, Shield, Target } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface PlayerBadgesProps {
  player: Player;
  compact?: boolean;
  className?: string;
}

const PlayerBadges: React.FC<PlayerBadgesProps> = ({ player, compact = false, className }) => {
  const bestRoundBadge = player.stats?.bestRound !== null ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className="mr-1 badge-warning">
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
          <Badge variant="secondary" className="mr-1 badge-primary">
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
          <Badge variant="secondary" className="mr-1 badge-success">
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
          <Badge variant="secondary" className="mr-1 badge-success">
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
          <Badge variant="secondary" className="mr-1 badge-error">
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
          <Badge variant="secondary" className="mr-1 badge-primary">
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
          <Badge variant="secondary" className="mr-1 badge-default">
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
    <div className={cn("flex flex-wrap items-center", className)}>
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

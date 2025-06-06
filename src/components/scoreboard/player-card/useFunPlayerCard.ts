
import { useState, useCallback } from 'react';
import { Player } from '@/types';

interface UseFunPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export const useFunPlayerCard = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isExpanded,
  setIsExpanded
}: UseFunPlayerCardProps) => {
  const isWinner = rank === 1;
  const isLastPlace = rank === totalPlayers;
  
  // Calculs des données de la carte
  const recentRounds = player.rounds.slice(-3);
  const hasPositiveTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;
  const hasNegativeTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score > recentRounds[recentRounds.length - 2].score;
  
  const dutchCount = player.rounds.filter(round => round.isDutch).length;
  
  // Calcul du streak actuel
  const currentStreak = (() => {
    let streak = 0;
    for (let i = player.rounds.length - 1; i >= 0; i--) {
      if (player.rounds[i].score <= 15) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  const cardData = {
    isWinner,
    isLastPlace,
    recentRounds,
    hasPositiveTrend,
    hasNegativeTrend,
    dutchCount,
    currentStreak
  };

  const getCardStyle = useCallback(() => {
    if (isWinner) {
      return "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300/60 shadow-yellow-200/50";
    }
    if (isLastPlace) {
      return "bg-gradient-to-br from-red-50 to-pink-50 border-red-200/60 shadow-red-100/50";
    }
    if (rank <= 3) {
      return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/60 shadow-green-100/50";
    }
    return "";
  }, [isWinner, isLastPlace, rank]);

  const handleCardClick = useCallback(() => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  }, [isExpanded, setIsExpanded, onSelect, player]);

  return {
    cardData,
    getCardStyle,
    handleCardClick
  };
};

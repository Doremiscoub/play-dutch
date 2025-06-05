
import { useMemo, useCallback } from 'react';
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
  // Memoïser les calculs coûteux
  const cardData = useMemo(() => {
    const isWinner = rank === 1;
    const isLastPlace = rank === totalPlayers;
    const recentRounds = player.rounds.slice(-5);
    
    // Calculs de tendance
    const hasPositiveTrend = recentRounds.length >= 2 && 
      recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;
    const hasNegativeTrend = recentRounds.length >= 2 && 
      recentRounds[recentRounds.length - 1].score > recentRounds[recentRounds.length - 2].score;

    const dutchCount = player.rounds.filter(round => round.isDutch).length;
    
    // Calcul de la série actuelle
    const currentStreak = (() => {
      if (player.rounds.length === 0) return 0;
      let streak = 1;
      const lastScore = player.rounds[player.rounds.length - 1].score;
      
      for (let i = player.rounds.length - 2; i >= 0; i--) {
        if (player.rounds[i].score <= lastScore + 5 && player.rounds[i].score >= lastScore - 5) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    })();

    return {
      isWinner,
      isLastPlace,
      recentRounds,
      hasPositiveTrend,
      hasNegativeTrend,
      dutchCount,
      currentStreak
    };
  }, [player.rounds, rank, totalPlayers]);

  const getCardStyle = useCallback(() => {
    if (cardData.isWinner) {
      return "bg-gradient-to-br from-amber-100/90 via-yellow-50/90 to-amber-100/90 border-amber-300/60 shadow-amber-200/30 ring-2 ring-amber-300/30";
    }
    if (cardData.isLastPlace && totalPlayers > 2) {
      return "bg-gradient-to-br from-red-50/90 via-pink-50/90 to-red-50/90 border-red-200/60 shadow-red-100/30";
    }
    return "bg-gradient-to-br from-white/90 via-gray-50/70 to-white/90 border-white/60";
  }, [cardData.isWinner, cardData.isLastPlace, totalPlayers]);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    onSelect(player);
  }, [isExpanded, onSelect, player, setIsExpanded]);

  return {
    cardData,
    getCardStyle,
    handleCardClick
  };
};

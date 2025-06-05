
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import { useFunPlayerCard } from './player-card/useFunPlayerCard';
import PlayerCardContent from './player-card/PlayerCardContent';
import PlayerCardShineEffect from './player-card/PlayerCardShineEffect';
import FloatingWinnerBadge from './FloatingWinnerBadge';

interface FunPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isSelected: boolean;
}

const FunPlayerCard: React.FC<FunPlayerCardProps> = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isSelected
}) => {
  console.log('FunPlayerCard: Rendering card for', player.name);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { cardData, getCardStyle, handleCardClick } = useFunPlayerCard({
    player,
    rank,
    totalPlayers,
    onSelect,
    isExpanded,
    setIsExpanded
  });

  return (
    <>
      <motion.div
        ref={cardRef}
        className={cn(
          "relative rounded-3xl backdrop-blur-xl border shadow-xl transition-all duration-300 cursor-pointer overflow-hidden",
          getCardStyle(),
          isSelected || isExpanded ? "ring-4 ring-dutch-blue/40 shadow-2xl scale-[1.02]" : "hover:scale-[1.01] hover:shadow-2xl"
        )}
        onClick={handleCardClick}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: rank * 0.1 }}
      >
        {/* Effet de brillance pour le gagnant */}
        <PlayerCardShineEffect isWinner={cardData.isWinner} />

        {/* Contenu de la carte */}
        <PlayerCardContent
          player={player}
          rank={rank}
          isExpanded={isExpanded}
          cardData={cardData}
        />
      </motion.div>

      {/* Pastille flottante indépendante */}
      <FloatingWinnerBadge isWinner={cardData.isWinner} cardRef={cardRef} />
    </>
  );
};

export default React.memo(FunPlayerCard, (prevProps, nextProps) => {
  // Comparaison personnalisée pour éviter les re-renders inutiles
  return (
    prevProps.player.id === nextProps.player.id &&
    prevProps.player.totalScore === nextProps.player.totalScore &&
    prevProps.player.rounds.length === nextProps.player.rounds.length &&
    prevProps.rank === nextProps.rank &&
    prevProps.totalPlayers === nextProps.totalPlayers &&
    prevProps.isSelected === nextProps.isSelected
  );
});

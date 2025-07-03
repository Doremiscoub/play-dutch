
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import { useFunPlayerCard } from './player-card/useFunPlayerCard';
import PlayerCardContent from './player-card/PlayerCardContent';
import PlayerCardShineEffect from './player-card/PlayerCardShineEffect';
import FloatingWinnerBadge from './FloatingWinnerBadge';
import FunPlayerCardRankBadge from './player-card/FunPlayerCardRankBadge';
import FunPlayerCardParticles from './player-card/FunPlayerCardParticles';
import FunPlayerCardHolographicEffect from './player-card/FunPlayerCardHolographicEffect';
import FunPlayerCardAmbientGlow from './player-card/FunPlayerCardAmbientGlow';

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
  console.log('FunPlayerCard: Rendering enhanced card for', player.name);
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
          "relative rounded-3xl backdrop-blur-2xl border-2 shadow-glass-lg transition-all duration-700 cursor-pointer overflow-hidden group perspective-1000",
          "bg-white/85 border-white/60 hover:bg-white/95 hover:shadow-glass-xl hover:backdrop-blur-4xl",
          getCardStyle(),
          isSelected || isExpanded ? "ring-4 ring-dutch-blue/50 shadow-dutch-lg scale-[1.02] border-dutch-blue/40 z-10" : "hover:scale-[1.015] hover:shadow-dutch hover:-translate-y-2"
        )}
        onClick={handleCardClick}
        whileHover={{ 
          y: -4, 
          scale: 1.01
        }}
        whileTap={{ scale: 0.99 }}
        layout
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.3, 
          delay: rank * 0.05,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >

        {/* Enhanced Floating Background Particles */}
        <FunPlayerCardParticles />

        {/* Enhanced Shine Effect for Winners */}
        <PlayerCardShineEffect isWinner={cardData.isWinner} />

        {/* Advanced Holographic Effect for Special Cards */}
        <FunPlayerCardHolographicEffect 
          isWinner={cardData.isWinner} 
          isLastPlace={cardData.isLastPlace} 
        />

        {/* Main Card Content with Enhanced Padding */}
        <div className="relative z-20 p-8">
          <PlayerCardContent
            player={player}
            rank={rank}
            isExpanded={isExpanded}
            cardData={cardData}
          />
        </div>

        {/* Ambient Glow Effect on Hover */}
        <FunPlayerCardAmbientGlow />
      </motion.div>

      {/* Enhanced Floating Winner Badge */}
      {cardData.isWinner && (
        <div className="absolute -top-2 -right-2 z-50">
          <FloatingWinnerBadge isWinner={cardData.isWinner} cardRef={cardRef} />
        </div>
      )}
    </>
  );
};

export default React.memo(FunPlayerCard, (prevProps, nextProps) => {
  return (
    prevProps.player.id === nextProps.player.id &&
    prevProps.player.totalScore === nextProps.player.totalScore &&
    prevProps.player.rounds.length === nextProps.player.rounds.length &&
    prevProps.rank === nextProps.rank &&
    prevProps.totalPlayers === nextProps.totalPlayers &&
    prevProps.isSelected === nextProps.isSelected
  );
});

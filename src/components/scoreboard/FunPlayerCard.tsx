
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
          "relative rounded-3xl backdrop-blur-2xl border-2 shadow-glass-lg transition-all duration-700 cursor-pointer overflow-visible group perspective-1000",
          rank === 1 ? "bg-gradient-to-br from-purple-400/30 via-pink-400/25 to-orange-400/20 border-purple-300/60" :
          rank === 2 ? "bg-gradient-to-br from-orange-400/30 via-red-400/25 to-pink-400/20 border-orange-300/60" :
          rank === 3 ? "bg-gradient-to-br from-cyan-400/30 via-blue-400/25 to-purple-400/20 border-cyan-300/60" :
          rank === 4 ? "bg-gradient-to-br from-green-400/30 via-emerald-400/25 to-cyan-400/20 border-green-300/60" :
          rank === 5 ? "bg-gradient-to-br from-yellow-400/30 via-orange-400/25 to-red-400/20 border-yellow-300/60" :
          "bg-gradient-to-br from-pink-400/30 via-purple-400/25 to-blue-400/20 border-pink-300/60",
          isSelected || isExpanded ? "ring-4 ring-purple-400/50 shadow-purple-lg scale-[1.02] border-purple-400/60 z-10" : 
          "hover:scale-[1.02] hover:shadow-xl hover:-translate-y-3"
        )}
        onClick={handleCardClick}
        whileHover={{ 
          y: -6, 
          scale: 1.02,
          rotate: rank % 2 === 0 ? 1 : -1
        }}
        whileTap={{ scale: 0.98 }}
        layout
        initial={{ opacity: 0, y: 30, scale: 0.9, rotateY: 45 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: rank * 0.1,
          type: "spring",
          stiffness: 250,
          damping: 18
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Enhanced Floating Winner Badge - positioned inside the card */}
        <FloatingWinnerBadge isWinner={cardData.isWinner} cardRef={cardRef} />

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

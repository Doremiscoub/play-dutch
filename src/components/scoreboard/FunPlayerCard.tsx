
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
          "relative rounded-3xl backdrop-blur-xl border-2 shadow-xl transition-all duration-500 cursor-pointer overflow-hidden group",
          "bg-white/80 border-white/60 hover:bg-white/90 hover:shadow-2xl",
          getCardStyle(),
          isSelected || isExpanded ? "ring-4 ring-dutch-blue/40 shadow-2xl scale-[1.02] border-dutch-blue/30" : "hover:scale-[1.008] hover:shadow-xl hover:-translate-y-1"
        )}
        onClick={handleCardClick}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        layout
        initial={{ opacity: 0, y: 20, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: rank * 0.08,
          type: "spring",
          stiffness: 120
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Badge de rang - Position absolue à gauche avec glassmorphisme */}
        <motion.div
          className="absolute -top-4 -left-4 z-50 bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange text-white text-lg font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-xl border-3 border-white/80 backdrop-blur-sm"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: rank * 0.1 + 0.3, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {rank}
        </motion.div>

        {/* Cercles décoratifs en arrière-plan avec animations */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <motion.div 
            className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-dutch-purple/15 via-dutch-blue/10 to-transparent rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-br from-dutch-orange/15 via-dutch-purple/10 to-transparent rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [360, 180, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Effet de brillance pour le gagnant */}
        <PlayerCardShineEffect isWinner={cardData.isWinner} />

        {/* Effet holographique pour les cartes spéciales */}
        {(cardData.isWinner || cardData.isLastPlace) && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
          </div>
        )}

        {/* Contenu de la carte avec padding optimisé */}
        <div className="relative z-20 p-6">
          <PlayerCardContent
            player={player}
            rank={rank}
            isExpanded={isExpanded}
            cardData={cardData}
          />
        </div>
      </motion.div>

      {/* Pastille flottante indépendante pour le gagnant */}
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

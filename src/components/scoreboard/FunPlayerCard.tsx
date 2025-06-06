
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
          y: -8, 
          scale: 1.02,
          rotateX: 2,
          rotateY: 1,
          z: 50
        }}
        whileTap={{ scale: 0.99, rotateX: 0 }}
        layout
        initial={{ opacity: 0, y: 30, rotateX: -15, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: rank * 0.1,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Enhanced Rank Badge - Floating 3D */}
        <motion.div
          className="absolute -top-6 -left-6 z-60 bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange text-white text-xl font-black rounded-full w-16 h-16 flex items-center justify-center shadow-glass-lg border-4 border-white/90 backdrop-blur-sm"
          initial={{ scale: 0, rotate: -270, z: -100 }}
          animate={{ scale: 1, rotate: 0, z: 0 }}
          transition={{ 
            delay: rank * 0.1 + 0.4, 
            type: "spring", 
            stiffness: 200,
            damping: 12
          }}
          whileHover={{ 
            scale: 1.2, 
            rotate: 15,
            z: 30,
            boxShadow: "0 15px 35px rgba(10, 132, 255, 0.4)"
          }}
        >
          <motion.span
            animate={cardData.isWinner ? {
              scale: [1, 1.1]
            } : {}}
            transition={{
              duration: 2,
              repeat: cardData.isWinner ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {rank}
          </motion.span>
        </motion.div>

        {/* Enhanced Floating Background Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {/* Primary Floating Orb */}
          <motion.div 
            className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-dutch-purple/20 via-dutch-blue/15 to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2],
              rotate: [0, 180],
              opacity: [0.3, 0.6],
              x: [0, 10],
              y: [0, -5]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          />
          
          {/* Secondary Floating Orb */}
          <motion.div 
            className="absolute -left-16 -bottom-16 w-64 h-64 bg-gradient-to-br from-dutch-orange/20 via-dutch-purple/15 to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3],
              rotate: [0, 180],
              opacity: [0.2, 0.5],
              x: [0, -8],
              y: [0, 8]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 3
            }}
          />
          
          {/* Tertiary Accent Orb */}
          <motion.div 
            className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-dutch-blue/25 via-dutch-orange/15 to-transparent rounded-full blur-2xl"
            animate={{ 
              scale: [0.8, 1.1],
              opacity: [0.1, 0.4],
              rotate: [0, 180]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>

        {/* Enhanced Shine Effect for Winners */}
        <PlayerCardShineEffect isWinner={cardData.isWinner} />

        {/* Advanced Holographic Effect for Special Cards */}
        {(cardData.isWinner || cardData.isLastPlace) && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
              animate={{ y: ['-100%', '100%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            />
          </div>
        )}

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
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-dutch-blue/10 via-transparent to-dutch-purple/10 rounded-3xl" />
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Winner Badge */}
      <FloatingWinnerBadge isWinner={cardData.isWinner} cardRef={cardRef} />
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

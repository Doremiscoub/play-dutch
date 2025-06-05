
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy } from 'lucide-react';
import { GameCard } from '@/components/ui/game-card';
import { GameText, GameBadge } from '@/components/ui/game-text';
import { UnifiedButton } from '@/components/ui/unified-button';
import { GameFeature } from '@/types/game-features';

interface FeatureCardProps {
  feature: GameFeature;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const IconComponent = feature.icon;
  
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: feature.delay,
        type: "spring",
        stiffness: 120
      }}
      whileHover={{ 
        y: -8, 
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      className="perspective-1000"
    >
      <GameCard
        variant="glass"
        interactive
        padding="lg"
        className={`
          flex flex-col h-full relative overflow-hidden
          ${feature.bgColor} ${feature.borderColor}
          hover:shadow-2xl hover:shadow-${feature.color}/20
          transform-gpu
        `}
      >
        {/* Badge en haut à droite */}
        <div className="absolute top-4 right-4">
          <GameBadge 
            color={feature.color}
            className="px-2 py-1 bg-white/80 rounded-full"
          >
            {feature.badge}
          </GameBadge>
        </div>
        
        <div className="flex flex-col items-center text-center h-full relative z-10">
          {/* Icône avec effet électrique */}
          <motion.div 
            className={`
              h-16 w-16 rounded-full ${feature.bgColor} 
              flex items-center justify-center mb-6
              border-2 ${feature.borderColor}
              shadow-lg
            `}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
          >
            <IconComponent 
              className={`h-8 w-8 text-${feature.color}`} 
            />
            {feature.color === 'electric' && (
              <Zap className="absolute h-4 w-4 text-yellow-300 animate-pulse" />
            )}
          </motion.div>
          
          <GameText
            as="h2"
            variant="power"
            color={feature.color}
            transform="uppercase"
            spacing="wider"
            className="mb-3"
          >
            {feature.title}
          </GameText>
          
          <GameText
            variant="body"
            color="muted"
            align="center"
            className="mb-6 flex-grow"
          >
            {feature.description}
          </GameText>
          
          <UnifiedButton 
            onClick={feature.action}
            variant={feature.buttonVariant}
            size="lg"
            className="w-full mt-auto font-bold tracking-wide transform hover:scale-105 transition-all"
          >
            {feature.buttonText}
            {feature.title === "Jouer" && <Trophy className="ml-2 h-4 w-4" />}
          </UnifiedButton>
        </div>
        
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
      </GameCard>
    </motion.div>
  );
};


import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy } from 'lucide-react';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { GameText, GameBadge } from '@/components/ui/game-text';
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
      <EnhancedCard
        variant="holographic"
        interactive
        padding="lg"
        rarity="rare"
        glow="medium"
        withHolographicEffect
        withSparkles={feature.color === 'electric'}
        depth
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
              shadow-lg relative overflow-hidden
            `}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
          >
            <IconComponent 
              className={`h-8 w-8 text-${feature.color} relative z-10`} 
            />
            {feature.color === 'electric' && (
              <>
                <Zap className="absolute h-4 w-4 text-yellow-300 animate-pulse top-1 right-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-yellow-400/30 animate-pulse rounded-full"></div>
              </>
            )}
            {/* Shimmer effect for icon container */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 hover:opacity-100 transition-opacity"></div>
          </motion.div>
          
          <GameText
            as="h2"
            variant="power"
            color={feature.color}
            transform="uppercase"
            spacing="wider"
            className="mb-3 drop-shadow-sm"
          >
            {feature.title}
          </GameText>
          
          <GameText
            variant="body"
            color="muted"
            align="center"
            className="mb-6 flex-grow leading-relaxed"
          >
            {feature.description}
          </GameText>
          
          <EnhancedButton 
            onClick={feature.action}
            variant={feature.buttonVariant === 'primary' ? 'power' : 
                    feature.buttonVariant === 'secondary' ? 'electric' : 'holographic'}
            size="lg"
            effect="glow"
            rarity={feature.title === "Jouer" ? "legendary" : "rare"}
            withSparkles={feature.title === "Jouer"}
            withIcon={feature.title === "Jouer"}
            icon={feature.title === "Jouer" ? <Trophy className="w-4 h-4" /> : undefined}
            className="w-full mt-auto font-bold tracking-wide"
          >
            {feature.buttonText}
          </EnhancedButton>
        </div>
      </EnhancedCard>
    </motion.div>
  );
};

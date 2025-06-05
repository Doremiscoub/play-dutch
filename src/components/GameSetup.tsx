
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { GameText, GameBadge } from '@/components/ui/game-text';
import GameSetupGlassmorphic from './GameSetupGlassmorphic';
import { motion } from 'framer-motion';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
    navigate('/game');
  };

  return (
    <div className="min-h-screen relative">
      {/* Header with enhanced Back button */}
      <div className="absolute top-4 left-4 z-50">
        <EnhancedButton
          onClick={() => navigate('/')}
          variant="glass"
          size="icon"
          effect="glow"
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft className="h-5 w-5" />
        </EnhancedButton>
      </div>

      {/* Main content */}
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <GameText
            as="h1"
            variant="display"
            color="gradient"
            transform="uppercase"
            spacing="tighter"
            align="center"
            className="mb-4"
          >
            Créer une partie
          </GameText>
          
          {/* Enhanced feature badges */}
          <div className="flex justify-center gap-3 flex-wrap mb-8">
            <GameBadge 
              variant="status" 
              type="winner"
              text="100% Gratuit"
              size="auto"
              icon="✅"
            />
            <GameBadge 
              variant="status" 
              type="electric"
              text="Fonctionne hors-ligne"
              size="auto"
              icon="📱"
            />
            <GameBadge 
              variant="status" 
              type="legendary"
              text="IA Commentateur"
              size="auto"
              icon="🤖"
              withSparkles
            />
          </div>
        </motion.div>

        <EnhancedCard
          variant="holographic"
          padding="none"
          rarity="epic"
          glow="medium"
          withHolographicEffect
          className="max-w-4xl mx-auto"
        >
          <GameSetupGlassmorphic onStartGame={handleStartGame} />
        </EnhancedCard>
      </div>
    </div>
  );
};

export default GameSetup;

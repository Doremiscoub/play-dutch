
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { GameText } from '@/components/ui/game-text';
import { GameBadge } from '@/components/ui/game-badge';
import { PageTitle } from '@/components/ui/page-title';
import GameSetupGlassmorphic from './GameSetupGlassmorphic';
import { motion } from 'framer-motion';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
    localStorage.setItem('dutch_game_mode', 'quick');
    navigate('/game');
  };

  const handleStartTournament = (tournamentName: string, playerNames: string[], rounds: number) => {
    localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
    localStorage.setItem('dutch_game_mode', 'tournament');
    localStorage.setItem('dutch_tournament_config', JSON.stringify({
      name: tournamentName,
      playerNames,
      rounds
    }));
    navigate('/game');
  };

  return (
    <div className="min-h-screen relative">
      {/* Header with Back button */}
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
      <div className="container max-w-6xl mx-auto px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageTitle variant="h1" withSparkles={true} withIcon={true}>
            Créer une partie
          </PageTitle>
          
          {/* Feature badges */}
          <div className="flex justify-center gap-3 flex-wrap mb-8">
            <GameBadge 
              variant="achievement"
              className="bg-green-100 text-green-800 border-green-200"
            >
              ✅ 100% Gratuit
            </GameBadge>
            <GameBadge 
              variant="status"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              📱 Fonctionne hors-ligne
            </GameBadge>
            <GameBadge 
              variant="special"
              className="bg-purple-100 text-purple-800 border-purple-200"
            >
              🤖 IA Commentateur
            </GameBadge>
            <GameBadge 
              variant="special"
              className="bg-orange-100 text-orange-800 border-orange-200"
            >
              🏆 Mode Tournoi
            </GameBadge>
          </div>

          <EnhancedCard
            variant="holographic"
            padding="none"
            rarity="epic"
            glow="medium"
            withHolographicEffect
            className="max-w-4xl mx-auto"
          >
            <GameSetupGlassmorphic 
              onStartGame={handleStartGame} 
              onStartTournament={handleStartTournament}
            />
          </EnhancedCard>
        </motion.div>
      </div>
    </div>
  );
};

export default GameSetup;

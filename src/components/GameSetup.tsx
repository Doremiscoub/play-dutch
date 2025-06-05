
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import { UnifiedButton } from '@/components/ui/unified-button';
import { GameBadge } from '@/components/ui/game-badge';
import GameSetupGlassmorphic from './GameSetupGlassmorphic';

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
    <UnifiedPageLayout
      title="Créer une partie"
      titleVariant="h1"
      withSparkles={true}
      onBack={() => navigate('/')}
      backgroundVariant="default"
      containerClassName="pt-4"
    >
      {/* Header avec bouton retour positionné */}
      <div className="absolute top-6 left-6 z-50">
        <UnifiedButton
          onClick={() => navigate('/')}
          variant="glass"
          size="icon"
          animated
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft className="h-5 w-5" />
        </UnifiedButton>
      </div>

      {/* Badges de fonctionnalités */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-3 flex-wrap mb-8"
      >
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
      </motion.div>

      {/* Contenu principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        <GameSetupGlassmorphic 
          onStartGame={handleStartGame} 
          onStartTournament={handleStartTournament}
        />
      </motion.div>
    </UnifiedPageLayout>
  );
};

export default GameSetup;

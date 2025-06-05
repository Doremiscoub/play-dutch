
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
      containerClassName="pt-4 max-w-4xl"
    >
      {/* Bouton retour positionné */}
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

      {/* Badges de fonctionnalités améliorés */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-2 flex-wrap mb-8 px-4"
      >
        <GameBadge 
          variant="achievement"
          className="bg-green-50 text-green-700 border-green-200 shadow-sm hover:shadow-md transition-shadow"
        >
          ✅ 100% Gratuit
        </GameBadge>
        <GameBadge 
          variant="status"
          className="bg-blue-50 text-blue-700 border-blue-200 shadow-sm hover:shadow-md transition-shadow"
        >
          📱 Fonctionne hors-ligne
        </GameBadge>
        <GameBadge 
          variant="special"
          className="bg-purple-50 text-purple-700 border-purple-200 shadow-sm hover:shadow-md transition-shadow"
        >
          🤖 IA Commentateur
        </GameBadge>
        <GameBadge 
          variant="special"
          className="bg-orange-50 text-orange-700 border-orange-200 shadow-sm hover:shadow-md transition-shadow"
        >
          🏆 Mode Tournoi
        </GameBadge>
      </motion.div>

      {/* Contenu principal centré */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center px-4"
      >
        <div className="w-full max-w-2xl">
          <GameSetupGlassmorphic 
            onStartGame={handleStartGame} 
            onStartTournament={handleStartTournament}
          />
        </div>
      </motion.div>
    </UnifiedPageLayout>
  );
};

export default GameSetup;

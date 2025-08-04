
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSecureGameState } from '@/hooks/game/useSecureGameState';
import ScoreBoard from '@/components/ScoreBoard';
import NewRoundModal from '@/components/NewRoundModal';
import PageShell from '@/components/layout/PageShell';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import IntelligentProfessorCartouche from '@/components/ai-commentator/IntelligentProfessorCartouche';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import { toast } from 'sonner';

const SimpleGamePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    players,
    roundHistory,
    scoreLimit,
    gameStartTime,
    isGameOver,
    hasGame,
    createGame,
    addRound,
    undoLastRound,
    resetGame,
    loadFromStorage,
    performManualIntegrityCheck
  } = useSecureGameState();
  const [isScoreFormOpen, setIsScoreFormOpen] = useState(false);
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState(false);
  const [scores, setScores] = useState<{ [playerId: string]: number }>({});
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>();
  // gameStartTime now comes from useSecureGameState

  useEffect(() => {
    console.log('🎮 SimpleGamePage MOUNTED');
    console.log('🎮 Current game state - hasGame:', hasGame, 'players:', players.length);
    
    // Tentative de chargement uniquement si aucune partie n'est active
    if (!hasGame) {
      console.log('🔍 No active game, trying to load from storage...');
      const loaded = loadFromStorage();
      if (!loaded) {
        console.log('⚠️ No saved game found, but NOT redirecting automatically');
        // Pas de redirection automatique - l'utilisateur peut décider
      }
    }
    
    return () => {
      console.log('🎮 SimpleGamePage UNMOUNTED');
    };
  }, []); // Pas de dépendances pour éviter les boucles infinies

  // Effect séparé pour l'initialisation des scores
  useEffect(() => {
    if (players.length > 0) {
      const initialScores: { [playerId: string]: number } = {};
      players.forEach(player => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
      console.log('🎯 Scores initialized for', players.length, 'players');
    }
  }, [players.length]);

  // Guard: si pas de partie, afficher un message sans redirection automatique
  if (!hasGame) {
    console.log('🚫 No game available, showing setup prompt');
    return (
      <PageShell variant="game">
        <MobileOptimizer pageType="game" className="min-h-screen">
          <UnifiedHeader 
            title="Aucune partie en cours" 
            showBackButton={true}
          />
          <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Aucune partie en cours</h2>
          <p className="mb-6">Vous devez d'abord créer une partie pour jouer.</p>
          <button 
            onClick={() => navigate('/setup')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Créer une partie
          </button>
          </div>
        </MobileOptimizer>
      </PageShell>
    );
  }

  const handleAddRound = () => {
    // Convertir l'objet scores en array dans l'ordre des joueurs
    const scoresArray = players.map(player => scores[player.id] || 0);
    addRound(scoresArray, dutchPlayerId);
    setIsScoreFormOpen(false);
    
    // Réinitialiser les scores
    const initialScores: { [playerId: string]: number } = {};
    players.forEach(player => {
      initialScores[player.id] = 0;
    });
    setScores(initialScores);
    setDutchPlayerId(undefined);
  };

  const handleEndGame = () => {
    setShowGameEndConfirmation(true);
  };

  const handleConfirmEndGame = () => {
    resetGame();
    navigate('/setup');
    setShowGameEndConfirmation(false);
  };

  const handleCancelEndGame = () => {
    setShowGameEndConfirmation(false);
  };

  const openScoreForm = () => {
    setIsScoreFormOpen(true);
  };

  console.log('🎮 SimpleGamePage rendering with', players.length, 'players');

  return (
    <PageShell variant="game">
      <MobileOptimizer pageType="game" className="min-h-screen">
        <UnifiedHeader 
          title={roundHistory.length === 0 ? "Nouvelle partie" : `Manche ${roundHistory.length}`}
          showBackButton={true}
          onBack={() => navigate('/setup')}
          variant="game"
          roundCount={roundHistory.length}
          scoreLimit={scoreLimit}
          gameStartTime={gameStartTime || new Date()}
          showRulesButton={true}
        />
        
        <div className="container mx-auto px-4 py-6">
        {/* Commentaires du Professeur Cartouche */}
        <div className="mb-6">
          <IntelligentProfessorCartouche 
            players={players}
            roundCount={roundHistory.length}
            scoreLimit={scoreLimit}
            isGameActive={!isGameOver}
            className="mx-auto max-w-2xl"
          />
        </div>
        
        <ScoreBoard
          players={players}
          onAddRound={() => {}} // Non utilisé car on utilise openScoreForm
          onUndoLastRound={undoLastRound}
          onEndGame={handleEndGame}
          roundHistory={roundHistory}
          showGameEndConfirmation={showGameEndConfirmation}
          onConfirmEndGame={handleConfirmEndGame}
          onCancelEndGame={handleCancelEndGame}
          scoreLimit={scoreLimit}
          openScoreForm={openScoreForm}
        />
        </div>

        {/* Modal pour ajouter une nouvelle manche */}
        <NewRoundModal
        open={isScoreFormOpen}
        onClose={() => setIsScoreFormOpen(false)}
        players={players}
        scores={scores}
        setScores={setScores}
        dutchPlayerId={dutchPlayerId}
        setDutchPlayerId={setDutchPlayerId}
        onAddRound={handleAddRound}
        />
      </MobileOptimizer>
    </PageShell>
  );
};

export default SimpleGamePage;

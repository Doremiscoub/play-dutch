import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';
import ScoreBoard from '@/components/ScoreBoard';
import NewRoundModal from '@/components/NewRoundModal';
import PageShell from '@/components/layout/PageShell';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import ProfessorAvatar from '@/components/game/ProfessorAvatar';
import AICommentator from '@/components/AICommentator';
import { toast } from 'sonner';

const SimpleGamePage: React.FC = () => {
  const navigate = useNavigate();
  const { players, roundHistory, addRound, undoLastRound, resetGame, loadFromStorage, hasGame, isGameOver } = useSimpleGameState();
  const [isScoreFormOpen, setIsScoreFormOpen] = useState(false);
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>();
  const [gameStartTime] = useState<Date>(new Date()); // Temps de début de la partie

  // Chargement initial UNIQUEMENT au montage du composant
  useEffect(() => {
    const loaded = loadFromStorage();
    if (!loaded) {
      navigate('/setup');
      return;
    }
    // Initialize scores array only after successful load
    setScores(players.map(() => 0));
  }, []); // VIDE - pas de dépendances pour éviter la boucle infinie !

  // Separate effect for scores initialization when players change
  useEffect(() => {
    if (players.length > 0) {
      setScores(players.map(() => 0));
    }
  }, [players.length]);

  const handleAddRound = () => {
    addRound(scores, dutchPlayerId);
    setIsScoreFormOpen(false);
    setScores(players.map(() => 0));
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

  if (!hasGame) {
    return (
      <PageShell variant="game">
        <UnifiedHeader 
          title="Aucune partie" 
          showBackButton={true}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold">Aucune partie en cours</h2>
            <button 
              onClick={() => navigate('/setup')}
              className="px-6 py-3 bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Créer une partie
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell variant="game">
      <UnifiedHeader 
        title={`Manche ${roundHistory.length + 1}`}
        showBackButton={true}
        onBack={() => navigate('/setup')}
        variant="game"
        roundCount={roundHistory.length + 1}
        scoreLimit={100}
        gameStartTime={gameStartTime}
        showRulesButton={true}
      />
      
      <div className="container mx-auto px-4 py-6">
        {/* Commentaires du Professeur Cartouche */}
        <div className="mb-6">
          <AICommentator 
            players={players}
            roundHistory={roundHistory}
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
          scoreLimit={100}
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
    </PageShell>
  );
};

export default SimpleGamePage;
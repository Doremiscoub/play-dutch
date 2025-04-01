
import React, { useState, useRef } from 'react';
import { Player } from '@/types';
import { AnimatePresence } from 'framer-motion';
import NewRoundModal from '@/components/NewRoundModal';
import GameActionButtons from '@/components/GameActionButtons';

import ScoreHeader from './ScoreHeader';
import PodiumView from './PodiumView';
import TableView from './TableView';
import StatsDrawer from './StatsDrawer';
import EndGameDialog from './EndGameDialog';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onEndGame: () => void;
  onUndoLastRound: () => void;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  showGameEndConfirmation: boolean;
  onConfirmEndGame: () => void;
  onCancelEndGame: () => void;
  isMultiplayer?: boolean;
}

/**
 * Composant principal du tableau de score
 * Gère l'affichage des scores, statistiques et actions de jeu
 */
const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  onAddRound,
  onEndGame,
  onUndoLastRound,
  roundHistory,
  showGameEndConfirmation,
  onConfirmEndGame,
  onCancelEndGame,
  isMultiplayer = false
}) => {
  // États locaux
  const [showStats, setShowStats] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [scores, setScores] = useState<number[]>(Array(players.length).fill(0));
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'podium' | 'table'>('podium');
  const modalRef = useRef<HTMLDialogElement>(null);
  
  // Handlers pour les actions
  const handleAddRound = () => {
    onAddRound(scores, dutchPlayerId);
    setShowModal(false);
    setScores(Array(players.length).fill(0));
    setDutchPlayerId(undefined);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className="min-h-screen pb-20">
      {/* En-tête */}
      <ScoreHeader 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        setShowStats={setShowStats} 
      />
      
      <div className="container px-4 py-4">
        {viewMode === 'podium' ? (
          <PodiumView players={players} />
        ) : (
          <TableView players={players} roundHistory={roundHistory} />
        )}
      </div>
      
      {/* Boutons d'action fixes */}
      <GameActionButtons
        onUndoLastRound={onUndoLastRound}
        onEndGame={onEndGame}
        onAddRound={handleOpenModal}
      />
      
      {/* Modal nouvelle manche */}
      <AnimatePresence>
        {showModal && (
          <NewRoundModal
            players={players}
            onClose={handleCloseModal}
            onAddRound={handleAddRound}
            setScores={setScores}
            setDutchPlayerId={setDutchPlayerId}
            scores={scores}
            dutchPlayerId={dutchPlayerId}
            modalRef={modalRef}
          />
        )}
      </AnimatePresence>
      
      {/* Dialog de confirmation de fin de partie */}
      <EndGameDialog
        open={showGameEndConfirmation}
        onConfirm={onConfirmEndGame}
        onCancel={onCancelEndGame}
      />
      
      {/* Sidebar des statistiques */}
      <StatsDrawer 
        players={players} 
        open={showStats} 
        onClose={() => setShowStats(false)} 
      />
    </div>
  );
};

export default ScoreBoard;

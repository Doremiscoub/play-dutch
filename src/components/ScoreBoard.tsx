
/**
 * Tableau des scores principal - Composant refactorisé
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';
import PageLayout from './layouts/PageLayout';
import CustomScoreBoardButtons from './CustomScoreBoardButtons';
import ScoreTableView from './ScoreTableView';
import AICommentator from './AICommentator';

// Import des composants modulaires
import ScoreBoardHeader from './scoreboard/ScoreBoardHeader';
import ScoreBoardTabs from './ScoreBoardTabs';
import PlayerListView from './scoreboard/PlayerListView';
import DesktopSidePanel from './scoreboard/DesktopSidePanel';
import UndoConfirmationDialog from './scoreboard/UndoConfirmationDialog';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  isMultiplayer?: boolean;
  showGameEndConfirmation?: boolean;
  onConfirmEndGame?: () => void;
  onCancelEndGame?: () => void;
  scoreLimit?: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  onAddRound,
  onUndoLastRound,
  onEndGame,
  roundHistory = [],
  isMultiplayer = false,
  showGameEndConfirmation = false,
  onConfirmEndGame,
  onCancelEndGame,
  scoreLimit = 100
}) => {
  // État local pour la gestion de l'interface
  const [view, setView] = useState<'list' | 'table'>('list');
  const [showAICommentator, setShowAICommentator] = useState<boolean>(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showUndoConfirmation, setShowUndoConfirmation] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  // Tri des joueurs par score (du meilleur au moins bon)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Sélection automatique du premier joueur pour les stats détaillées
  useEffect(() => {
    if (sortedPlayers.length > 0 && !selectedPlayer) {
      setSelectedPlayer(sortedPlayers[0]);
    }
  }, [sortedPlayers, selectedPlayer]);
  
  // Gestion de l'annulation d'une manche
  const handleRequestUndo = () => {
    // Vérification s'il y a des manches à annuler
    if (players.length === 0 || players[0].rounds.length === 0) {
      toast.error('Pas de manche à annuler !');
      return;
    }
    setShowUndoConfirmation(true);
  };
  
  const handleConfirmUndo = () => {
    onUndoLastRound();
    setShowUndoConfirmation(false);
  };
  
  const handleCancelUndo = () => {
    setShowUndoConfirmation(false);
  };
  
  // Sélection d'un joueur pour voir ses stats détaillées
  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <PageLayout backgroundVariant="subtle" className="pb-12 sm:pb-20">
      <div className="w-full max-w-6xl mx-auto px-1 sm:px-2">
        {/* En-tête avec boutons de navigation et titre */}
        <ScoreBoardHeader 
          roundCount={players.length > 0 ? players[0]?.rounds.length || 0 : 0}
          scoreLimit={scoreLimit}
        />
        
        {/* Commentateur IA - sur mobile et desktop */}
        {showAICommentator && (
          <div className="mb-4">
            <AICommentator 
              players={players}
              roundHistory={roundHistory}
            />
          </div>
        )}
        
        {/* Onglets pour changer de vue */}
        <ScoreBoardTabs 
          currentView={view}
          onViewChange={(newView) => setView(newView)}
        />
        
        {/* Contenu principal */}
        <div className={`mt-4 ${isDesktop ? 'md:flex md:gap-4' : ''}`}>
          {/* Colonne de gauche (classement ou tableau) */}
          <div className={`${isDesktop && view === 'list' ? 'md:w-4/5' : 'w-full'} z-20 relative`}>
            <AnimatePresence mode="wait">
              {view === 'list' && (
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {/* Vue liste des joueurs */}
                  <PlayerListView 
                    players={players}
                    isDesktop={isDesktop}
                    scoreLimit={scoreLimit}
                    onPlayerSelect={handlePlayerSelect}
                  />
                </motion.div>
              )}
              
              {view === 'table' && (
                <motion.div
                  key="table-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white"
                >
                  <ScoreTableView 
                    players={players}
                    roundHistory={roundHistory || []}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Colonne de droite (desktop uniquement - stats joueur) */}
          {isDesktop && view === 'list' && (
            <DesktopSidePanel 
              showAICommentator={false} // Commentateur IA affiché en haut pour tous les écrans
              players={players}
              roundHistory={roundHistory}
              selectedPlayer={selectedPlayer}
            />
          )}
        </div>
        
        {/* Boutons d'action */}
        <div className="mt-4">
          <CustomScoreBoardButtons
            players={players}
            onAddRound={onAddRound}
            onRequestUndoLastRound={handleRequestUndo}
            onEndGame={onEndGame}
          />
        </div>
      </div>
      
      {/* Dialogues de confirmation */}
      {showGameEndConfirmation && onConfirmEndGame && onCancelEndGame && (
        <EndGameConfirmationDialog 
          isOpen={showGameEndConfirmation}
          onConfirm={onConfirmEndGame}
          onCancel={onCancelEndGame}
        />
      )}
      
      <UndoConfirmationDialog 
        isOpen={showUndoConfirmation}
        onConfirm={handleConfirmUndo}
        onCancel={handleCancelUndo}
      />
    </PageLayout>
  );
};

export default ScoreBoard;

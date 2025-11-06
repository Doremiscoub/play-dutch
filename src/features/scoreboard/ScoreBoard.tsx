import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { useSound } from '@/hooks/use-sound';
import { toast } from 'sonner';
import { logger } from '@/utils/logger';
import EndGameConfirmationDialog from './components/EndGameConfirmationDialog';
import FloatingActionButtons from './components/FloatingActionButtons';
import ScoreBoardTabs from './components/ScoreBoardTabs';
import FunPlayerCard from './components/FunPlayerCard';
import ScoreTableView from './components/ScoreTableView';
import StatisticsView from './components/StatisticsView';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  showGameEndConfirmation?: boolean;
  onConfirmEndGame?: () => void;
  onCancelEndGame?: () => void;
  scoreLimit?: number;
  openScoreForm?: () => void;
  hideFloatingActionsWhenModalOpen?: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  onUndoLastRound,
  onEndGame,
  roundHistory = [],
  showGameEndConfirmation = false,
  onConfirmEndGame,
  onCancelEndGame,
  scoreLimit = 100,
  openScoreForm,
  hideFloatingActionsWhenModalOpen = false
}) => {
  const { playSound } = useSound();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'table' | 'stats'>('list');

  logger.debug('ScoreBoard: Component rendered', { 
    playersCount: players?.length, 
    roundHistoryLength: roundHistory?.length,
    scoreLimit,
    showGameEndConfirmation
  });

  // Vérification de sécurité des props
  if (!players || players.length === 0) {
    logger.warn('ScoreBoard: No players provided');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center lg-card lg-tint-accent-60 rounded-xl p-8 lg-elevation-03 animate-lg-reveal">
          <p className="text-white text-lg font-bold">Aucun joueur trouvé</p>
          <p className="text-white/80 text-sm mt-2">Créez une nouvelle partie pour commencer</p>
        </div>
      </div>
    );
  }

  // Tri des joueurs par score
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => a.totalScore - b.totalScore);
  }, [players]);

  const roundCount = useMemo(() => {
    return players[0]?.rounds?.length || 0;
  }, [players]);

  // Handlers
  const handleAddRound = useCallback(() => {
    try {
      if (openScoreForm) {
        openScoreForm();
        playSound('buttonClick');
      } else {
        logger.error('ScoreBoard: openScoreForm not provided');
        toast.error("Impossible d'ouvrir le formulaire de scores");
      }
    } catch (error) {
      logger.error('ScoreBoard: Error in handleAddRound:', error);
      toast.error("Erreur lors de l'ouverture du formulaire");
    }
  }, [openScoreForm, playSound]);

  const handleUndo = useCallback(() => {
    try {
      if (roundHistory.length === 0) {
        toast.error("Aucune manche à annuler");
        return;
      }
      onUndoLastRound();
      playSound('undo');
      toast.success("Dernière manche annulée");
    } catch (error) {
      logger.error('ScoreBoard: Error in handleUndo:', error);
      toast.error("Erreur lors de l'annulation");
    }
  }, [roundHistory.length, onUndoLastRound, playSound]);

  const handleEndGame = useCallback(() => {
    try {
      onEndGame();
      playSound('gameEnd');
    } catch (error) {
      logger.error('ScoreBoard: Error in handleEndGame:', error);
      toast.error("Erreur lors de la fin de partie");
    }
  }, [onEndGame, playSound]);

  const handleViewChange = useCallback((view: 'list' | 'table' | 'stats') => {
    setCurrentView(view);
    playSound('buttonClick');
  }, [playSound]);

  const handlePlayerSelect = useCallback((player: Player) => {
    setSelectedPlayer(prevSelected => 
      prevSelected?.id === player.id ? null : player
    );
    playSound('cardFlip');
  }, [playSound]);

  const playersToDisplay = sortedPlayers.length > 0 ? sortedPlayers : players;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-6">
        {/* Toggle des vues */}
        <ScoreBoardTabs
          currentView={currentView}
          onViewChange={handleViewChange}
        />

        {/* Contenu principal */}
        <AnimatePresence mode="wait">
          {currentView === 'list' && (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {playersToDisplay.map((player, index) => (
                <FunPlayerCard
                  key={player.id}
                  player={player}
                  rank={index + 1}
                  totalPlayers={players.length}
                  onSelect={handlePlayerSelect}
                  isSelected={selectedPlayer?.id === player.id}
                  scoreLimit={scoreLimit}
                />
              ))}
            </motion.div>
          )}

          {currentView === 'table' && (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ScoreTableView 
                players={players} 
                roundHistory={roundHistory}
              />
            </motion.div>
          )}

          {currentView === 'stats' && (
            <StatisticsView
              players={players}
              roundCount={roundCount}
              scoreLimit={scoreLimit}
              roundHistory={roundHistory}
            />
          )}
        </AnimatePresence>
      </div>

      {/* End Game Confirmation */}
      <EndGameConfirmationDialog
        isOpen={showGameEndConfirmation}
        onConfirm={onConfirmEndGame}
        onCancel={onCancelEndGame}
      />

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        onAddRound={handleAddRound}
        onUndoLastRound={handleUndo}
        onEndGame={handleEndGame}
        canUndo={roundHistory.length > 0}
        hideWhenModalOpen={hideFloatingActionsWhenModalOpen}
      />
    </div>
  );
};

export default ScoreBoard;

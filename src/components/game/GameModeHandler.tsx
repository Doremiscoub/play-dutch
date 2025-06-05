
import React from 'react';
import { Player } from '@/types';
import { useTournamentState } from '@/hooks/useTournamentState';

interface GameModeHandlerProps {
  gameMode: 'quick' | 'tournament';
  players: Player[] | null;
  onGameEnd: () => void;
  onRestart: () => void;
  children: React.ReactNode;
}

const GameModeHandler: React.FC<GameModeHandlerProps> = ({
  gameMode,
  players,
  onGameEnd,
  onRestart,
  children
}) => {
  const {
    currentTournament,
    completeMatch,
    getCurrentMatch,
    getTournamentProgress,
    finalizeTournament,
    startNextMatch
  } = useTournamentState();

  const handleTournamentGameEnd = () => {
    if (gameMode === 'tournament' && currentTournament && players) {
      const currentMatch = getCurrentMatch();
      if (currentMatch) {
        completeMatch(currentMatch.id, players);
      }
      
      const progress = getTournamentProgress();
      if (progress.current >= progress.total) {
        finalizeTournament();
      } else {
        startNextMatch();
        onRestart();
      }
    } else {
      onGameEnd();
    }
  };

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onEndGame: handleTournamentGameEnd,
        onConfirmEndGame: handleTournamentGameEnd
      })}
    </>
  );
};

export default GameModeHandler;

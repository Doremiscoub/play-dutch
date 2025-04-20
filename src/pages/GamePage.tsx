import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Player } from '@/types';
import { generateId } from '@/utils';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/context/AuthContext';
import ScoreBoard from '@/components/ScoreBoard';
import NewRoundScoreForm from '@/components/NewRoundScoreForm';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import NewRoundModal from '@/components/NewRoundModal';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    players, 
    setPlayers, 
    isMultiplayer, 
    setIsMultiplayer,
    scoreLimit,
    setScoreLimit,
    resetGame,
    roundHistory,
    addRoundToHistory,
    undoLastRound
  } = useGame();
  
  const [newRoundScores, setNewRoundScores] = useState<number[]>(players.map(() => 0));
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>(undefined);
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  
  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    const newPlayers = players.map((player, index) => {
      const newScore = scores[index] || 0;
      return {
        ...player,
        totalScore: player.totalScore + newScore,
        rounds: [...player.rounds, { score: newScore, isDutch: player.id === dutchPlayerId }],
      };
    });
    
    setPlayers(newPlayers);
    addRoundToHistory({ scores, dutchPlayerId });
  };
  
  const handleUndoLastRound = () => {
    if (players.length === 0 || players[0].rounds.length === 0) {
      toast.error('Pas de manche à annuler !');
      return;
    }
    
    const newPlayers = players.map(player => {
      const lastRound = player.rounds[player.rounds.length - 1];
      const newTotalScore = player.totalScore - lastRound.score;
      
      return {
        ...player,
        totalScore: newTotalScore,
        rounds: player.rounds.slice(0, -1),
      };
    });
    
    setPlayers(newPlayers);
    undoLastRound();
  };
  
  return (
    <>
      <ScoreBoard
        players={players}
        onAddRound={() => setShowNewRoundModal(true)}
        onUndoLastRound={handleUndoLastRound}
        onEndGame={() => {}}
        roundHistory={roundHistory}
        isMultiplayer={isMultiplayer}
        scoreLimit={scoreLimit}
        openScoreForm={() => setShowNewRoundModal(true)}
      />
      
      <NewRoundModal 
        players={players}
        scores={newRoundScores}
        dutchPlayerId={dutchPlayerId}
        onClose={() => setShowNewRoundModal(false)}
        onAddRound={handleAddRound}
        setScores={setNewRoundScores}
        setDutchPlayerId={setDutchPlayerId}
        open={showNewRoundModal}
      />
    </>
  );
};

export default GamePage;

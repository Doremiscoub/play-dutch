
/**
 * Formulaire pour ajouter une nouvelle manche
 */
import React, { useState } from 'react';
import { Player } from '@/types';
import NewRoundModal from './NewRoundModal';

interface NewRoundScoreFormProps {
  players: Player[];
  open: boolean;
  onClose: () => void;
  onSubmit: (scores: number[], dutchPlayerId?: string) => void;
}

const NewRoundScoreForm: React.FC<NewRoundScoreFormProps> = ({
  players,
  open,
  onClose,
  onSubmit
}) => {
  const [scores, setScores] = useState<{ [playerId: string]: number }>({});
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>(undefined);
  
  // Reset form when players change or when modal opens
  React.useEffect(() => {
    if (open) {
      const initialScores: { [playerId: string]: number } = {};
      players.forEach(player => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
      setDutchPlayerId(undefined);
    }
  }, [players, open]);
  
  const handleAddRound = () => {
    // Convert scores object to array in player order
    const scoresArray = players.map(player => scores[player.id] || 0);
    onSubmit(scoresArray, dutchPlayerId);
    onClose();
  };
  
  return (
    <NewRoundModal
      players={players}
      scores={scores}
      dutchPlayerId={dutchPlayerId}
      onClose={onClose}
      onAddRound={handleAddRound}
      setScores={setScores}
      setDutchPlayerId={setDutchPlayerId}
      open={open}
    />
  );
};

export default NewRoundScoreForm;

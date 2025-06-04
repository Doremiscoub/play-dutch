
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
  const [scores, setScores] = useState<number[]>(players.map(() => 0));
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>(undefined);
  
  // Reset form when players change or when modal opens
  React.useEffect(() => {
    if (open) {
      setScores(players.map(() => 0));
      setDutchPlayerId(undefined);
    }
  }, [players, open]);
  
  const handleAddRound = () => {
    // Submit scores and close modal in same tick
    onSubmit(scores, dutchPlayerId);
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

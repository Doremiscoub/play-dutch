
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
  const modalRef = React.useRef<HTMLDialogElement>(null);
  
  // Reset form when players change or when modal opens
  React.useEffect(() => {
    if (open) {
      setScores(players.map(() => 0));
      setDutchPlayerId(undefined);
    }
  }, [players, open]);
  
  const handleAddRound = () => {
    // Appel direct sans aucun traitement intermédiaire
    onSubmit(scores, dutchPlayerId);
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
      modalRef={modalRef}
      open={open}
    />
  );
};

export default NewRoundScoreForm;

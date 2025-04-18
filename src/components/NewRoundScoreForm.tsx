
import React from 'react';
import { Player } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PlayerScoreInput from './forms/PlayerScoreInput';
import ScoreFormFooter from './forms/ScoreFormFooter';
import { useScoreForm } from './forms/useScoreForm';

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
  const {
    scores,
    dutchPlayer,
    isSubmitting,
    submitHandled,
    firstInputRef,
    handleScoreChange,
    adjustScore,
    handleDutchToggle,
    handleSubmitForm
  } = useScoreForm(players, open, onClose, onSubmit);
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && !isSubmitting && !submitHandled) onClose();
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            Ajouter une manche
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {players.map((player, index) => (
            <PlayerScoreInput
              key={player.id}
              player={player}
              index={index}
              score={scores[player.id] || 0}
              isDutch={dutchPlayer === player.id}
              onScoreChange={handleScoreChange}
              onAdjustScore={adjustScore}
              onDutchToggle={handleDutchToggle}
              inputRef={firstInputRef}
              onEnterKey={handleSubmitForm}
              isSubmitting={isSubmitting}
              submitHandled={submitHandled}
            />
          ))}
        </div>
        
        <ScoreFormFooter
          onCancel={onClose}
          onSubmit={handleSubmitForm}
          isSubmitting={isSubmitting}
          submitHandled={submitHandled}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewRoundScoreForm;

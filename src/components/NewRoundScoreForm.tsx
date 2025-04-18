
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
  
  // Fonction pour gérer la fermeture manuelle du modal
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && !isSubmitting) {
      onClose();
    }
  };
  
  // Si le formulaire a déjà été soumis ou est en cours de soumission,
  // on peut forcer la fermeture du dialog
  if (submitHandled || isSubmitting) {
    return null;
  }
  
  return (
    <Dialog 
      open={open} 
      onOpenChange={handleOpenChange}
    >
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
              inputRef={index === 0 ? firstInputRef : undefined}
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

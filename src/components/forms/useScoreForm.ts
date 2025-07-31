
import { useState, useEffect, useRef } from 'react';
import { Player } from '@/types';
import { validateScores } from './EnhancedScoreFormValidator';
import { toast } from 'sonner';

export const useScoreForm = (
  players: Player[],
  open: boolean,
  onClose: () => void,
  onSubmit: (scores: number[], dutchPlayerId?: string) => void
) => {
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [dutchPlayer, setDutchPlayer] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const submitHandled = useRef<boolean>(false);
  
  // Réinitialiser les scores à l'ouverture du dialog
  useEffect(() => {
    if (open) {
      const initialScores: { [key: string]: number } = {};
      players.forEach(player => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
      setDutchPlayer(undefined);
      setIsSubmitting(false);
      submitHandled.current = false;
      
      // Focus sur le premier input après l'ouverture
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 100);
    }
  }, [open, players]);
  
  const handleScoreChange = (playerId: string, value: string) => {
    // Permettre les entrées vides ou numériques (positives et négatives)
    if (value === '' || value === '-' || /^-?\d+$/.test(value)) {
      const score = value === '' || value === '-' ? 0 : parseInt(value);
      setScores(prev => ({
        ...prev,
        [playerId]: score
      }));
    }
  };
  
  const adjustScore = (playerId: string, increment: number) => {
    setScores(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + increment
    }));
  };
  
  const handleDutchToggle = (playerId: string, checked: boolean) => {
    setDutchPlayer(checked ? playerId : undefined);
  };
  
  const handleSubmitForm = () => {
    // Protection contre la double soumission
    if (isSubmitting || submitHandled.current) {
      return;
    }
    
    const validationResult = validateScores(scores, players.map(p => p.id));
    if (!validationResult) {
      return;
    }
    
    setIsSubmitting(true);
    submitHandled.current = true;
    
    try {
      // Utiliser les scores et dutchPlayer validés
      onClose();
      
      // APRÈS la fermeture, soumettre les scores validés
      setTimeout(() => {
        onSubmit(validationResult.scores, validationResult.dutchPlayerId);
      }, 10);
    } catch (error) {
      console.error("Erreur lors de la soumission des scores:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement des scores");
      setIsSubmitting(false);
      submitHandled.current = false;
    }
  };
  
  return {
    scores,
    dutchPlayer,
    isSubmitting,
    submitHandled: submitHandled.current,
    firstInputRef,
    handleScoreChange,
    adjustScore,
    handleDutchToggle,
    handleSubmitForm
  };
};

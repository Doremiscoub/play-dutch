
import { useState, useEffect, useRef } from 'react';
import { Player } from '@/types';
import { validateScores } from './ScoreFormValidator';
import { toast } from 'sonner';
import { resetValidationErrorFlag } from './ScoreFormValidator';

export const useScoreForm = (
  players: Player[],
  open: boolean,
  onClose: () => void,
  onSubmit: (scores: number[], dutchPlayerId?: string) => void
) => {
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [dutchPlayer, setDutchPlayer] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const submitHandled = useRef<boolean>(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  
  // Réinitialiser les scores à l'ouverture du dialog
  useEffect(() => {
    if (open) {
      // Réinitialiser l'état du formulaire à chaque ouverture
      const initialScores: { [key: string]: number } = {};
      players.forEach(player => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
      setDutchPlayer(undefined);
      setIsSubmitting(false);
      submitHandled.current = false;
      resetValidationErrorFlag();
      
      // Focus sur le premier input après l'ouverture
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 100);
    }
  }, [open, players]);
  
  const handleScoreChange = (playerId: string, value: string) => {
    // Protection contre les soumissions
    if (isSubmitting || submitHandled.current) {
      return;
    }
    
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
    // Protection contre les soumissions
    if (isSubmitting || submitHandled.current) {
      return;
    }
    
    setScores(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + increment
    }));
  };
  
  const handleDutchToggle = (playerId: string, checked: boolean) => {
    // Protection contre les soumissions
    if (isSubmitting || submitHandled.current) {
      return;
    }
    
    setDutchPlayer(checked ? playerId : undefined);
  };
  
  const handleSubmitForm = () => {
    // Protection renforcée contre la double soumission
    if (isSubmitting || submitHandled.current) {
      console.info("Soumission déjà en cours ou traitée, ignorer");
      return;
    }
    
    // Validation des scores
    if (!validateScores(scores, players.map(p => p.id))) {
      console.info("Validation des scores échouée");
      return;
    }
    
    console.info("Soumission du formulaire...");
    setIsSubmitting(true);
    submitHandled.current = true;
    
    try {
      // Convertir l'objet scores en array de scores dans le même ordre que les joueurs
      const scoresArray = players.map(player => scores[player.id] || 0);
      
      // Fermer immédiatement le dialogue pour éviter les doubles clics
      onClose();
      
      // Soumettre les scores immédiatement sans délai
      console.info("Envoi des scores:", scoresArray, "Dutch:", dutchPlayer);
      onSubmit(scoresArray, dutchPlayer);
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
    submitHandled,
    firstInputRef,
    handleScoreChange,
    adjustScore,
    handleDutchToggle,
    handleSubmitForm
  };
};

/**
 * Hook pour gérer l'affichage du tutorial interactif
 * Détermine si le tutorial doit être montré à l'utilisateur
 */
import { useState, useEffect } from 'react';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Le tutorial ne se déclenche plus automatiquement
    setIsLoading(false);
  }, []);

  const closeTutorial = () => {
    setShowTutorial(false);
  };

  const startTutorial = () => {
    setShowTutorial(true);
  };

  const resetTutorial = () => {
    localStorage.removeItem('dutch_tutorial_completed');
    localStorage.removeItem('dutch_tutorial_skipped');
    setShowTutorial(true);
  };

  const isTutorialCompleted = () => {
    return localStorage.getItem('dutch_tutorial_completed') === 'true';
  };

  return {
    showTutorial,
    closeTutorial,
    startTutorial,
    resetTutorial,
    isTutorialCompleted,
    isLoading
  };
};
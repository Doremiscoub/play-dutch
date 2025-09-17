/**
 * Hook pour gérer l'affichage du tutorial interactif
 * Détermine si le tutorial doit être montré à l'utilisateur
 */
import { useState, useEffect } from 'react';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTutorialStatus = () => {
      const completed = localStorage.getItem('dutch_tutorial_completed') === 'true';
      const skipped = localStorage.getItem('dutch_tutorial_skipped') === 'true';
      const visitCount = parseInt(localStorage.getItem('dutch_visit_count') || '0');
      
      // Incrémenter le compteur de visites
      localStorage.setItem('dutch_visit_count', (visitCount + 1).toString());
      
      // Afficher le tutorial si :
      // - Pas encore terminé ET pas ignoré
      // - OU si c'est la première visite
      const shouldShow = (!completed && !skipped) || visitCount === 0;
      
      setShowTutorial(shouldShow);
      setIsLoading(false);
    };

    // Délai court pour éviter le flash
    const timer = setTimeout(checkTutorialStatus, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const closeTutorial = () => {
    setShowTutorial(false);
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
    resetTutorial,
    isTutorialCompleted,
    isLoading
  };
};
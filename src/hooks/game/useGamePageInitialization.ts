
import { useEffect, useState, useRef } from 'react';
import { verifyPlayerSetup } from '@/utils/playerInitializer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useGamePageInitialization = () => {
  const [isReady, setIsReady] = useState(false);
  const initializationAttempted = useRef(false);
  const initializationInProgress = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.info("GamePage: Montage du composant");
    
    // Marquer la page comme visitée
    localStorage.setItem('dutch_game_page_visited', 'true');
    
    // Définir un délai pour considérer la page comme prête
    const initTimer = setTimeout(() => {
      setIsReady(true);
    }, 600);
    
    // Nettoyage lors du démontage
    return () => {
      console.info("GamePage: Démontage du composant");
      clearTimeout(initTimer);
      setIsReady(false);
    };
  }, []);

  return {
    isReady,
    initializationAttempted,
    initializationInProgress,
    verifyPlayerSetup,
    navigate,
    toast
  };
};

/**
 * Hook principal pour le commentateur sportif Professor Cartouche
 * Gère l'affichage des commentaires et la rotation automatique
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Player } from '@/types';
import { useCommentaryEngine } from './commentary-engine';

interface CommentatorState {
  currentComment: string;
  isVisible: boolean;
  commentType: 'post_round' | 'between_rounds';
  priority: 'high' | 'medium' | 'low';
}

interface UseSportsCommentatorProps {
  players: Player[];
  roundCount: number;
  isGameActive: boolean;
  rotationInterval?: number; // en secondes, défaut 15s
}

export const useSportsCommentator = ({
  players,
  roundCount,
  isGameActive,
  rotationInterval = 15
}: UseSportsCommentatorProps) => {
  const [commentatorState, setCommentatorState] = useState<CommentatorState>({
    currentComment: '',
    isVisible: false,
    commentType: 'between_rounds',
    priority: 'low'
  });

  const [lastRoundProcessed, setLastRoundProcessed] = useState(0);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRotatingRef = useRef(false);

  const { generatePostRoundComment, generateBetweenRoundsComment, resetEngine } = useCommentaryEngine();

  // Fonction pour afficher un commentaire
  const showComment = useCallback((comment: string, type: 'post_round' | 'between_rounds', priority: 'high' | 'medium' | 'low') => {
    console.log(`[Cartouche] Affichage commentaire: "${comment}" (type: ${type}, priority: ${priority})`);
    
    setCommentatorState({
      currentComment: comment,
      isVisible: true,
      commentType: type,
      priority
    });

    // Masquer le commentaire après 4 secondes pour les commentaires post-manche
    // ou 6 secondes pour les commentaires entre manches
    const hideDelay = type === 'post_round' ? 4000 : 6000;
    
    setTimeout(() => {
      setCommentatorState(prev => ({
        ...prev,
        isVisible: false
      }));
    }, hideDelay);
  }, []);

  // Commentaire automatique après chaque manche
  useEffect(() => {
    if (roundCount > lastRoundProcessed && players.length > 0) {
      console.log(`[Cartouche] Nouvelle manche détectée: ${roundCount} (précédente: ${lastRoundProcessed})`);
      
      // Arrêter la rotation entre manches
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current);
        rotationTimerRef.current = null;
      }
      isRotatingRef.current = false;

      // Générer commentaire post-manche
      const commentary = generatePostRoundComment(players, roundCount);
      showComment(commentary.text, 'post_round', commentary.priority);
      
      setLastRoundProcessed(roundCount);

      // Démarrer la rotation entre manches après 5 secondes
      setTimeout(() => {
        if (isGameActive) {
          startBetweenRoundsRotation();
        }
      }, 5000);
    }
  }, [roundCount, players, lastRoundProcessed, isGameActive, showComment, generatePostRoundComment]);

  // Fonction pour démarrer la rotation entre manches
  const startBetweenRoundsRotation = useCallback(() => {
    if (isRotatingRef.current || !isGameActive) return;
    
    console.log(`[Cartouche] Démarrage rotation entre manches (interval: ${rotationInterval}s)`);
    isRotatingRef.current = true;

    const rotate = () => {
      if (!isGameActive || !isRotatingRef.current) return;
      
      const commentary = generateBetweenRoundsComment(players, roundCount);
      showComment(commentary.text, 'between_rounds', commentary.priority);
    };

    // Premier commentaire immédiat
    rotate();

    // Puis rotation régulière
    rotationTimerRef.current = setInterval(rotate, rotationInterval * 1000);
  }, [isGameActive, rotationInterval, players, roundCount, showComment, generateBetweenRoundsComment]);

  // Arrêter la rotation quand le jeu se termine
  useEffect(() => {
    if (!isGameActive) {
      console.log('[Cartouche] Jeu terminé, arrêt de la rotation');
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current);
        rotationTimerRef.current = null;
      }
      isRotatingRef.current = false;
    }
  }, [isGameActive]);

  // Reset quand une nouvelle partie commence
  useEffect(() => {
    if (players.length > 0 && roundCount === 0) {
      console.log('[Cartouche] Nouvelle partie, reset du moteur');
      resetEngine();
      setLastRoundProcessed(0);
      setCommentatorState({
        currentComment: '',
        isVisible: false,
        commentType: 'between_rounds',
        priority: 'low'
      });
    }
  }, [players.length, roundCount, resetEngine]);

  // Nettoyage à la destruction du composant
  useEffect(() => {
    return () => {
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current);
      }
    };
  }, []);

  // Fonction manuelle pour forcer un commentaire (pour les tests)
  const forceComment = useCallback((type: 'post_round' | 'between_rounds' = 'between_rounds') => {
    let commentary;
    if (type === 'post_round') {
      commentary = generatePostRoundComment(players, roundCount);
    } else {
      commentary = generateBetweenRoundsComment(players, roundCount);
    }
    showComment(commentary.text, type, commentary.priority);
  }, [players, roundCount, generatePostRoundComment, generateBetweenRoundsComment, showComment]);

  return {
    currentComment: commentatorState.currentComment,
    isVisible: commentatorState.isVisible,
    commentType: commentatorState.commentType,
    priority: commentatorState.priority,
    forceComment, // pour les tests et debug
    isRotating: isRotatingRef.current
  };
};
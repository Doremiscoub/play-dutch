import { useState, useEffect, useCallback } from 'react';
import { Player } from '@/types';
import { AIComment, AIPersonality } from '@/features/ai-commentator/types';
import { optimizedAICommentaryEngine } from '@/features/ai-commentator/engine/optimizedEngine';

interface UseEnhancedAICommentatorProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  autoGenerate?: boolean;
  refreshInterval?: number;
}

interface UseEnhancedAICommentatorReturn {
  currentComment: AIComment | null;
  isGenerating: boolean;
  personality: AIPersonality;
  setPersonality: (personality: AIPersonality) => void;
  generateComment: (event?: string) => Promise<void>;
  clearHistory: () => void;
  getPlayerMemory: (playerName: string) => any;
  commentHistory: AIComment[];
  isMemoryActive: boolean;
}

export function useEnhancedAICommentator({
  players,
  roundCount,
  scoreLimit,
  autoGenerate = true,
  refreshInterval = 10000
}: UseEnhancedAICommentatorProps): UseEnhancedAICommentatorReturn {
  const [currentComment, setCurrentComment] = useState<AIComment | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [personality, setPersonalityState] = useState<AIPersonality>('humorous');
  const [commentHistory, setCommentHistory] = useState<AIComment[]>([]);
  const [lastGenerationTime, setLastGenerationTime] = useState(0);

  // Génération intelligente de commentaire avec debouncing
  const generateComment = useCallback(async (event?: string) => {
    if (players.length === 0 || isGenerating) return;

    setIsGenerating(true);
    
    try {
      // Simulation d'un petit délai pour l'effet "thinking" (réduit)
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
      
      // Utiliser l'engine optimisé avec debouncing
      const comment = optimizedAICommentaryEngine.generateIntelligentCommentDebounced(
        players,
        roundCount,
        scoreLimit,
        event
      );

      if (comment) {
        setCurrentComment(comment);
        setCommentHistory(prev => [...prev.slice(-9), comment]); // Garder 10 derniers
        setLastGenerationTime(Date.now());
      }
      
    } catch (error) {
      console.error('Erreur lors de la génération du commentaire:', error);
      
      // Fallback avec un commentaire générique
      const fallbackComment: AIComment = {
        id: Date.now().toString(),
        comment: "Hmm... laissez-moi réfléchir à la situation ! 🤔",
        type: 'general',
        timestamp: Date.now(),
        personality: personality,
        context: {
          type: 'general',
          intensity: 'low',
          focus: null
        }
      };
      
      setCurrentComment(fallbackComment);
    } finally {
      setIsGenerating(false);
    }
  }, [players, roundCount, scoreLimit, personality, isGenerating]);

  // Mettre à jour la personnalité
  const setPersonality = useCallback((newPersonality: AIPersonality) => {
    setPersonalityState(newPersonality);
    optimizedAICommentaryEngine.setPersonality(newPersonality);
    
    // Regénérer un commentaire avec la nouvelle personnalité
    generateComment('personality_change');
  }, [generateComment]);

  // Obtenir la mémoire d'un joueur
  const getPlayerMemory = useCallback((playerName: string) => {
    return optimizedAICommentaryEngine.getPlayerStats(playerName);
  }, []);

  // Nettoyer l'historique
  const clearHistory = useCallback(() => {
    setCommentHistory([]);
    optimizedAICommentaryEngine.clearMemory();
  }, []);

  // Génération automatique lors des changements
  useEffect(() => {
    if (autoGenerate && players.length > 0) {
      generateComment();
    }
  }, [players.length, roundCount]); // Seulement sur les changements significatifs

  // Génération périodique (optionnelle)
  useEffect(() => {
    if (!autoGenerate || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      if (players.length > 0 && !isGenerating) {
        // Générer un nouveau commentaire seulement si assez de temps s'est écoulé
        const timeSinceLastComment = Date.now() - lastGenerationTime;
        if (timeSinceLastComment > refreshInterval * 0.8) {
          generateComment('periodic_refresh');
        }
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoGenerate, refreshInterval, players.length, isGenerating, lastGenerationTime, generateComment]);

  // Détecter si la mémoire est active
  const isMemoryActive = players.some(player => 
    optimizedAICommentaryEngine.getPlayerStats(player.name) !== null
  );

  return {
    currentComment,
    isGenerating,
    personality,
    setPersonality,
    generateComment,
    clearHistory,
    getPlayerMemory,
    commentHistory,
    isMemoryActive
  };
}
/**
 * Hook sécurisé pour la gestion d'état du jeu
 * Remplace useSimpleGameState avec une architecture plus robuste
 */
import { useState, useCallback, useEffect } from 'react';
import { Player, RoundHistoryEntry } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { 
  addRoundToPlayers, 
  removeLastRoundFromPlayers, 
  validateAndFixPlayers,
  auditScoreIntegrity 
} from '@/utils/scoreEngine';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';

const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
const emojis = ['🎲', '🃏', '🎯', '⭐', '🔥', '💎', '🎪', '🚀', '🎨', '🎭'];

const GAME_KEY = 'dutch_secure_game';

interface SecureGameState {
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  gameStartTime: Date | null;
  isGameOver: boolean;
  lastIntegrityCheck: Date | null;
}

/**
 * Gestionnaire d'état sécurisé avec validation d'intégrité
 */
class SecureGameStateManager {
  private static instance: SecureGameStateManager;
  private state: SecureGameState = {
    players: [],
    roundHistory: [],
    scoreLimit: 100,
    gameStartTime: null,
    isGameOver: false,
    lastIntegrityCheck: null
  };
  private listeners = new Set<() => void>();
  private integrityCheckInterval: NodeJS.Timeout | null = null;

  static getInstance(): SecureGameStateManager {
    if (!SecureGameStateManager.instance) {
      SecureGameStateManager.instance = new SecureGameStateManager();
    }
    return SecureGameStateManager.instance;
  }

  constructor() {
    // Vérification d'intégrité automatique toutes les 30 secondes pendant une partie active
    this.startIntegrityChecking();
  }

  private startIntegrityChecking(): void {
    if (this.integrityCheckInterval) {
      clearInterval(this.integrityCheckInterval);
    }

    this.integrityCheckInterval = setInterval(() => {
      if (this.state.players.length > 0 && !this.state.isGameOver) {
        this.performIntegrityCheck();
      }
    }, 30000); // 30 secondes
  }

  private performIntegrityCheck(): void {
    console.log('🔍 Performing scheduled integrity check...');
    
    const audit = auditScoreIntegrity(this.state.players);
    
    if (!audit.isValid) {
      console.warn('⚠️ Integrity check failed:', audit.errors);
      
      if (audit.corrections.length > 0) {
        const { fixedPlayers } = validateAndFixPlayers(this.state.players);
        this.setState({ 
          players: fixedPlayers,
          lastIntegrityCheck: new Date()
        });
        
        toast.warning(`Correction automatique des scores (${audit.corrections.length} corrections)`);
      }
    } else {
      console.log('✅ Integrity check passed');
      this.setState({ lastIntegrityCheck: new Date() });
    }
  }

  getState(): SecureGameState {
    return { ...this.state };
  }

  setState(newState: Partial<SecureGameState>): void {
    this.state = { ...this.state, ...newState };
    console.log('🎯 Secure state updated:', {
      playersCount: this.state.players.length,
      roundsCount: this.state.roundHistory.length,
      isGameOver: this.state.isGameOver
    });
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  saveToStorage(): boolean {
    try {
      // Vérification d'intégrité avant sauvegarde
      const audit = auditScoreIntegrity(this.state.players);
      if (!audit.isValid) {
        console.warn('⚠️ Saving state with integrity issues:', audit.errors);
      }

      const dataToSave = {
        ...this.state,
        gameStartTime: this.state.gameStartTime?.toISOString(),
        lastIntegrityCheck: this.state.lastIntegrityCheck?.toISOString()
      };

      localStorage.setItem(GAME_KEY, JSON.stringify(dataToSave));
      console.log('💾 Secure game saved to localStorage');
      return true;
    } catch (error) {
      console.error('❌ Secure save failed:', error);
      return false;
    }
  }

  loadFromStorage(): boolean {
    try {
      const saved = localStorage.getItem(GAME_KEY);
      if (!saved) {
        console.log('📂 No secure saved game found');
        return false;
      }
      
      const parsed = JSON.parse(saved);
      if (!parsed.players || parsed.players.length === 0) {
        console.log('📂 Invalid secure saved game, removing');
        localStorage.removeItem(GAME_KEY);
        return false;
      }
      
      // Reconstruction sécurisée de l'état
      const restoredState: SecureGameState = {
        ...parsed,
        gameStartTime: parsed.gameStartTime ? new Date(parsed.gameStartTime) : null,
        lastIntegrityCheck: parsed.lastIntegrityCheck ? new Date(parsed.lastIntegrityCheck) : null
      };

      // Vérification et correction immédiate après chargement
      const { fixedPlayers, hasErrors } = validateAndFixPlayers(restoredState.players);
      if (hasErrors) {
        console.warn('⚠️ Fixed integrity issues during load');
        toast.warning('Correction automatique des scores détectée lors du chargement');
        restoredState.players = fixedPlayers;
      }

      this.state = restoredState;
      
      console.log('📂 Secure game loaded from localStorage:', {
        playersCount: this.state.players.length,
        roundsCount: this.state.roundHistory.length
      });
      
      this.listeners.forEach(listener => listener());
      return true;
    } catch (error) {
      console.error('❌ Secure load failed:', error);
      localStorage.removeItem(GAME_KEY);
      return false;
    }
  }

  reset(): void {
    this.state = {
      players: [],
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: null,
      isGameOver: false,
      lastIntegrityCheck: null
    };
    localStorage.removeItem(GAME_KEY);
    console.log('🔄 Secure game state reset');
    this.listeners.forEach(listener => listener());
  }

  cleanup(): void {
    if (this.integrityCheckInterval) {
      clearInterval(this.integrityCheckInterval);
      this.integrityCheckInterval = null;
    }
  }
}

export const useSecureGameState = () => {
  const manager = SecureGameStateManager.getInstance();
  const [gameState, setGameState] = useState<SecureGameState>(manager.getState());
  
  useEffect(() => {
    console.log('🔗 useSecureGameState hook mounted');
    const unsubscribe = manager.subscribe(() => {
      setGameState(manager.getState());
    });
    
    return () => {
      console.log('🔗 useSecureGameState hook unmounted');
      unsubscribe();
    };
  }, [manager]);

  const createGame = useCallback((playerNames: string[]) => {
    console.log('🎮 Creating secure game with players:', playerNames);
    
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs');
      return false;
    }

    const players: Player[] = playerNames.map((name, index) => ({
      id: uuidv4(),
      name: name.trim(),
      emoji: emojis[index % emojis.length],
      totalScore: 0,
      rounds: [],
      avatarColor: avatarColors[index % avatarColors.length]
    }));

    const newState: SecureGameState = {
      players,
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: new Date(),
      isGameOver: false,
      lastIntegrityCheck: new Date()
    };

    manager.setState(newState);
    
    if (manager.saveToStorage()) {
      toast.success(`Partie sécurisée créée avec ${players.length} joueurs!`);
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, [manager]);

  const addRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    console.log('➕ Adding round securely:', { scores, dutchPlayerId });
    
    const currentState = manager.getState();
    
    // Utilisation du moteur de scores sécurisé
    const result = addRoundToPlayers(currentState.players, scores, dutchPlayerId);
    
    if (!result.success) {
      toast.error(result.error || 'Erreur lors de l\'ajout de la manche');
      return false;
    }

    // Mise à jour des statistiques
    const playersWithStats = updateAllPlayersStats(result.updatedPlayers);
    
    // Création de l'entrée d'historique
    const newRound: RoundHistoryEntry = { scores, dutchPlayerId };
    
    // Détermination du game over
    const isGameOver = playersWithStats.some(p => p.totalScore >= currentState.scoreLimit);

    const newState = {
      ...currentState,
      players: playersWithStats,
      roundHistory: [...currentState.roundHistory, newRound],
      isGameOver,
      lastIntegrityCheck: new Date()
    };

    manager.setState(newState);
    
    if (manager.saveToStorage()) {
      const dutchPlayer = playersWithStats.find(p => p.id === dutchPlayerId);
      toast.success(`Manche ajoutée${dutchPlayer ? ` - ${dutchPlayer.name} a fait Dutch !` : ''}`);
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, [manager]);

  const undoLastRound = useCallback(() => {
    console.log('↩️ Undoing last round securely');
    
    const currentState = manager.getState();
    
    if (currentState.roundHistory.length === 0) {
      toast.warning('Aucune manche à annuler');
      return false;
    }

    // Utilisation du moteur de scores sécurisé
    const result = removeLastRoundFromPlayers(currentState.players);
    
    if (!result.success) {
      toast.error(result.error || 'Erreur lors de l\'annulation');
      return false;
    }

    // Mise à jour des statistiques
    const playersWithStats = updateAllPlayersStats(result.updatedPlayers);

    const newState = {
      ...currentState,
      players: playersWithStats,
      roundHistory: currentState.roundHistory.slice(0, -1),
      isGameOver: false, // Reset game over state
      lastIntegrityCheck: new Date()
    };

    manager.setState(newState);
    
    if (manager.saveToStorage()) {
      toast.success('Dernière manche annulée');
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, [manager]);

  const resetGame = useCallback(() => {
    manager.reset();
    toast.success('Partie réinitialisée');
  }, [manager]);

  const loadFromStorage = useCallback(() => {
    return manager.loadFromStorage();
  }, [manager]);

  const performManualIntegrityCheck = useCallback(() => {
    const audit = auditScoreIntegrity(gameState.players);
    
    if (audit.isValid) {
      toast.success('Intégrité des scores validée ✅');
    } else {
      toast.warning(`Problèmes d'intégrité détectés: ${audit.errors.length} erreurs`);
      console.warn('Integrity issues:', audit);
      
      if (audit.corrections.length > 0) {
        const { fixedPlayers } = validateAndFixPlayers(gameState.players);
        manager.setState({ 
          players: updateAllPlayersStats(fixedPlayers),
          lastIntegrityCheck: new Date()
        });
        manager.saveToStorage();
        toast.info('Scores corrigés automatiquement');
      }
    }
    
    return audit;
  }, [gameState.players, manager]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      manager.cleanup();
    };
  }, [manager]);

  return {
    ...gameState,
    createGame,
    addRound,
    undoLastRound,
    resetGame,
    loadFromStorage,
    performManualIntegrityCheck,
    hasGame: gameState.players.length > 0
  };
};
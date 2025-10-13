import { Player } from '@/types';
import { AICommentType, AIPersonality, AICommentContext, AIComment } from '@/types/ai-commentator';
import { aiCommentaryEngine } from './aiCommentaryEngine';

/**
 * Version optimisée de l'AI Commentary Engine avec debouncing et throttling
 */
class OptimizedAICommentaryEngine {
  private lastGenerationTime = 0;
  private lastSaveTime = 0;
  private pendingSave: NodeJS.Timeout | null = null;
  
  private readonly MIN_GENERATION_INTERVAL = 2000; // 2s minimum entre générations
  private readonly SAVE_THROTTLE = 5000; // Sauvegarder max toutes les 5s

  /**
   * Génère un commentaire avec debouncing
   */
  public generateIntelligentCommentDebounced(
    players: Player[], 
    roundCount: number, 
    scoreLimit: number,
    recentEvent?: string
  ): AIComment | null {
    const now = Date.now();
    
    // Éviter les générations trop fréquentes
    if (now - this.lastGenerationTime < this.MIN_GENERATION_INTERVAL) {
      return null;
    }
    
    this.lastGenerationTime = now;
    
    const comment = aiCommentaryEngine.generateIntelligentComment(
      players,
      roundCount,
      scoreLimit,
      recentEvent
    );
    
    // Throttle les sauvegardes
    this.throttledSave();
    
    return comment;
  }

  /**
   * Sauvegarde throttlée pour éviter les écritures trop fréquentes
   */
  private throttledSave(): void {
    if (this.pendingSave) {
      clearTimeout(this.pendingSave);
    }
    
    const now = Date.now();
    const timeSinceLastSave = now - this.lastSaveTime;
    
    if (timeSinceLastSave >= this.SAVE_THROTTLE) {
      // Sauvegarder immédiatement
      this.performSave();
    } else {
      // Planifier une sauvegarde
      const delay = this.SAVE_THROTTLE - timeSinceLastSave;
      this.pendingSave = setTimeout(() => {
        this.performSave();
      }, delay);
    }
  }

  private performSave(): void {
    this.lastSaveTime = Date.now();
    // La sauvegarde est déjà faite dans aiCommentaryEngine
  }

  /**
   * Wrapper pour les autres méthodes de l'engine
   */
  public setPersonality(personality: AIPersonality): void {
    aiCommentaryEngine.setPersonality(personality);
  }

  public getPlayerStats(playerName: string): any {
    return aiCommentaryEngine.getPlayerStats(playerName);
  }

  public clearMemory(): void {
    aiCommentaryEngine.clearMemory();
  }
}

export const optimizedAICommentaryEngine = new OptimizedAICommentaryEngine();

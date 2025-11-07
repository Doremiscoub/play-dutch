/**
 * Wrapper optimisé avec debouncing et throttling
 */

import { Player } from '@/types';
import { AIPersonality, AIComment } from '../types';
import { aiCommentaryEngine } from './commentaryEngine';

class OptimizedAICommentaryEngine {
  private lastGenerationTime = 0;
  private lastSaveTime = 0;
  private pendingSave: NodeJS.Timeout | null = null;
  
  private readonly MIN_GENERATION_INTERVAL = 2000;
  private readonly SAVE_THROTTLE = 5000;

  public generateIntelligentCommentDebounced(
    players: Player[], 
    roundCount: number, 
    scoreLimit: number,
    recentEvent?: string
  ): AIComment | null {
    const now = Date.now();
    
    if (now - this.lastGenerationTime < this.MIN_GENERATION_INTERVAL) {
      return null;
    }
    
    this.lastGenerationTime = now;
    const comment = aiCommentaryEngine.generateIntelligentComment(players, roundCount, scoreLimit, recentEvent);
    this.throttledSave();
    
    return comment;
  }

  private throttledSave(): void {
    if (this.pendingSave) {
      clearTimeout(this.pendingSave);
    }
    
    const now = Date.now();
    const timeSinceLastSave = now - this.lastSaveTime;
    
    if (timeSinceLastSave >= this.SAVE_THROTTLE) {
      this.performSave();
    } else {
      const delay = this.SAVE_THROTTLE - timeSinceLastSave;
      this.pendingSave = setTimeout(() => {
        this.performSave();
      }, delay);
    }
  }

  private performSave(): void {
    this.lastSaveTime = Date.now();
  }

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

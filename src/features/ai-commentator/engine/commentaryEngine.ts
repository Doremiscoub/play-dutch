/**
 * AI Commentary Engine - Version simplifiée et optimisée
 * Objectif: ~200 lignes avec extraction des templates
 */

import { Player } from '@/types';
import { AICommentType, AIPersonality, AICommentContext, AIComment } from '../types';
import { COMMENT_TEMPLATES, ADVICE_TEMPLATES, RUNNING_GAGS } from './commentTemplates';

interface GameMemory {
  playerProfiles: Record<string, PlayerProfile>;
  notableEvents: NotableEvent[];
}

interface PlayerProfile {
  name: string;
  playStyle: 'aggressive' | 'conservative' | 'unpredictable' | 'consistent';
  bestScore: number;
  worstScore: number;
  averageScore: number;
  dutchCount: number;
  comebackCount: number;
  chokeCount: number;
  personalityTraits: string[];
  runningGags: string[];
}

interface NotableEvent {
  type: 'dramatic_comeback' | 'spectacular_fail' | 'perfect_round' | 'dutch_streak' | 'rivalry';
  players: string[];
  description: string;
  timestamp: number;
  round: number;
}

class AICommentaryEngine {
  private memory: GameMemory;
  private currentPersonality: AIPersonality = 'humorous';
  private commentHistory: string[] = [];
  private readonly MAX_MEMORY_SIZE = 50;

  constructor() {
    this.memory = this.loadMemory();
  }

  private loadMemory(): GameMemory {
    const stored = localStorage.getItem('professor_cartouche_memory');
    return stored ? JSON.parse(stored) : { playerProfiles: {}, notableEvents: [] };
  }

  private saveMemory(): void {
    if (this.memory.notableEvents.length > this.MAX_MEMORY_SIZE) {
      this.memory.notableEvents = this.memory.notableEvents.slice(-this.MAX_MEMORY_SIZE);
    }
    localStorage.setItem('professor_cartouche_memory', JSON.stringify(this.memory));
  }

  public generateIntelligentComment(players: Player[], roundCount: number, scoreLimit: number, recentEvent?: string): AIComment {
    const context = this.analyzeGameContext(players, roundCount, scoreLimit);
    const comment = this.selectCommentStrategy(context, players, recentEvent);
    
    this.updatePlayerProfiles(players);
    this.commentHistory.push(comment.comment);
    
    return comment;
  }

  private analyzeGameContext(players: Player[], roundCount: number, scoreLimit: number): AICommentContext {
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const lastPlace = sortedPlayers[sortedPlayers.length - 1];
    const gap = lastPlace.totalScore - leader.totalScore;
    
    const progressRatio = leader.totalScore / scoreLimit;
    let gamePhase: 'early' | 'mid' | 'end' = progressRatio > 0.7 ? 'end' : progressRatio > 0.3 ? 'mid' : 'early';
    let intensity: 'low' | 'medium' | 'high' = gamePhase === 'end' && gap < 50 ? 'high' : gap > 100 || roundCount > 5 ? 'medium' : 'low';
    
    let type: AICommentType = 'general';
    if (roundCount === 0) type = 'game_start';
    else if (gamePhase === 'end') type = 'endgame_pressure';
    else if (gap > 150) type = 'gap_analysis';
    else if (this.detectTension(players)) type = 'tension_build';

    return {
      type,
      intensity,
      focus: this.selectFocusPlayer(players, type),
      gamePhase,
      leadingPlayer: leader.name,
      strugglingPlayer: lastPlace.name,
      gap,
      averageScore: players.reduce((sum, p) => sum + p.totalScore, 0) / players.length,
      hasRecentDutch: players.some(p => p.rounds.some(r => r.isDutch)),
      roundCount
    };
  }

  private selectCommentStrategy(context: AICommentContext, players: Player[], recentEvent?: string): AIComment {
    const templates = COMMENT_TEMPLATES[context.type] || COMMENT_TEMPLATES.general;
    const selectedTemplate = this.selectBestTemplate(templates, context);
    const comment = this.personalizeComment(selectedTemplate, context, players, recentEvent);
    
    return {
      id: Date.now().toString(),
      comment,
      type: context.type,
      timestamp: Date.now(),
      personality: this.currentPersonality,
      context,
      advice: this.generateStrategicAdvice(context)
    };
  }

  private selectBestTemplate(templates: string[], context: AICommentContext): string {
    const availableTemplates = templates.filter(
      template => !this.commentHistory.slice(-3).some(recent => this.calculateSimilarity(template, recent) > 0.7)
    );
    
    if (availableTemplates.length === 0) return templates[0];
    
    const weightedSelection = context.intensity === 'high' ? availableTemplates.slice(0, 2) : availableTemplates;
    return weightedSelection[Math.floor(Math.random() * weightedSelection.length)];
  }

  private personalizeComment(template: string, context: AICommentContext, players: Player[], recentEvent?: string): string {
    let comment = template
      .replace('{playerCount}', players.length.toString())
      .replace('{leadingPlayer}', context.leadingPlayer || 'le leader')
      .replace('{strugglingPlayer}', context.strugglingPlayer || 'le dernier')
      .replace('{focusPlayer}', context.focus || 'l\'un de vous')
      .replace('{gap}', context.gap?.toString() || '?')
      .replace('{scoreLimit}', '500');
    
    if (context.focus && this.memory.playerProfiles[context.focus]) {
      const profile = this.memory.playerProfiles[context.focus];
      if (profile.runningGags.length > 0 && Math.random() < 0.5) {
        comment += ` ${profile.runningGags[Math.floor(Math.random() * profile.runningGags.length)]}`;
      }
    }

    if (recentEvent) {
      const reactions = {
        'new_round': " Nouvelle manche, nouvelles possibilités !",
        'player_dutch': " Ouch, ça fait mal !",
        'close_scores': " L'écart se resserre !",
        'comeback': " Incroyable remontée !",
        'lead_change': " Changement de leader !"
      };
      comment += reactions[recentEvent as keyof typeof reactions] || '';
    }

    return comment;
  }

  private generateStrategicAdvice(context: AICommentContext): string {
    if (context.focus && context.intensity === 'high') {
      return `${context.focus}, ${ADVICE_TEMPLATES[Math.floor(Math.random() * ADVICE_TEMPLATES.length)]}`;
    }
    return ADVICE_TEMPLATES[Math.floor(Math.random() * ADVICE_TEMPLATES.length)];
  }

  private updatePlayerProfiles(players: Player[]): void {
    players.forEach(player => {
      if (!this.memory.playerProfiles[player.name]) {
        this.memory.playerProfiles[player.name] = {
          name: player.name,
          playStyle: 'consistent',
          bestScore: player.totalScore,
          worstScore: player.totalScore,
          averageScore: player.totalScore,
          dutchCount: player.rounds.filter(r => r.isDutch).length,
          comebackCount: 0,
          chokeCount: 0,
          personalityTraits: [],
          runningGags: []
        };
      }

      const profile = this.memory.playerProfiles[player.name];
      profile.bestScore = Math.min(profile.bestScore, player.totalScore);
      profile.worstScore = Math.max(profile.worstScore, player.totalScore);
      profile.averageScore = (profile.averageScore + player.totalScore) / 2;
      
      const hasRecentDutch = player.rounds.some(r => r.isDutch);
      if (hasRecentDutch) {
        profile.dutchCount++;
        if (profile.dutchCount > 3 && !profile.runningGags.includes(RUNNING_GAGS.dutch_master_3)) {
          profile.runningGags.push(RUNNING_GAGS.dutch_master_3);
        }
        if (profile.dutchCount > 5 && !profile.runningGags.includes(RUNNING_GAGS.dutch_master_5)) {
          profile.runningGags.push(RUNNING_GAGS.dutch_master_5);
        }
        if (profile.dutchCount > 8 && !profile.runningGags.includes(RUNNING_GAGS.dutch_master_8)) {
          profile.runningGags.push(RUNNING_GAGS.dutch_master_8);
        }
      }
      
      if (profile.averageScore < 5 && !profile.runningGags.includes(RUNNING_GAGS.precision_ace)) {
        profile.runningGags.push(RUNNING_GAGS.precision_ace);
      }
      
      if (profile.comebackCount > 2 && !profile.runningGags.includes(RUNNING_GAGS.comeback_kid)) {
        profile.runningGags.push(RUNNING_GAGS.comeback_kid);
      }
    });

    this.saveMemory();
  }

  private detectTension(players: Player[]): boolean {
    const scores = players.map(p => p.totalScore);
    const range = Math.max(...scores) - Math.min(...scores);
    return range < 100 && players.length > 2;
  }

  private selectFocusPlayer(players: Player[], type: AICommentType): string | null {
    switch (type) {
      case 'poor_performance':
        return players.sort((a, b) => b.totalScore - a.totalScore)[0]?.name || null;
      case 'dutch_celebration':
        return players.find(p => p.rounds.some(r => r.isDutch))?.name || null;
      case 'endgame_pressure':
        return players.sort((a, b) => a.totalScore - b.totalScore)[0]?.name || null;
      default:
        return players[Math.floor(Math.random() * players.length)]?.name || null;
    }
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  public setPersonality(personality: AIPersonality): void {
    this.currentPersonality = personality;
  }

  public getPlayerStats(playerName: string): PlayerProfile | null {
    return this.memory.playerProfiles[playerName] || null;
  }

  public clearMemory(): void {
    this.memory = { playerProfiles: {}, notableEvents: [] };
    this.saveMemory();
  }
}

export const aiCommentaryEngine = new AICommentaryEngine();

/**
 * AI Commentary Engine - Professeur Cartouche
 * Event-aware, personality-driven, player-name-injected commentary
 */

import { Player } from '@/types';
import { AICommentType, AIPersonality, AICommentContext, AIComment } from '../types';
import { COMMENT_TEMPLATES, ADVICE_TEMPLATES, RUNNING_GAGS } from './commentTemplates';

interface GameMemory {
  playerProfiles: Record<string, PlayerProfile>;
  notableEvents: NotableEvent[];
  /** Leader name from the previous comment generation */
  previousLeader?: string;
  /** Player rank snapshot from previous round: name -> rank */
  previousRanks?: Record<string, number>;
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
  private readonly MAX_COMMENT_HISTORY = 20;

  constructor() {
    this.memory = this.loadMemory();
  }

  private loadMemory(): GameMemory {
    const defaultMemory: GameMemory = { playerProfiles: {}, notableEvents: [] };
    const stored = localStorage.getItem('professor_cartouche_memory');
    if (!stored) return defaultMemory;

    try {
      const parsed = JSON.parse(stored);
      if (
        parsed &&
        typeof parsed === 'object' &&
        typeof parsed.playerProfiles === 'object' &&
        Array.isArray(parsed.notableEvents)
      ) {
        return parsed as GameMemory;
      }
      return defaultMemory;
    } catch {
      return defaultMemory;
    }
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

    // Snapshot current leader & ranks for next round's comparison
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    this.memory.previousLeader = sortedPlayers[0]?.name;
    this.memory.previousRanks = {};
    sortedPlayers.forEach((p, i) => {
      this.memory.previousRanks![p.name] = i + 1;
    });

    this.commentHistory.push(comment.comment);
    if (this.commentHistory.length > this.MAX_COMMENT_HISTORY) {
      this.commentHistory = this.commentHistory.slice(-this.MAX_COMMENT_HISTORY);
    }

    return comment;
  }

  // --------------- Game Event Detection ---------------

  private analyzeGameContext(players: Player[], roundCount: number, scoreLimit: number): AICommentContext {
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const secondPlace = sortedPlayers[1];
    const lastPlace = sortedPlayers[sortedPlayers.length - 1];
    const gap = lastPlace.totalScore - leader.totalScore;
    const topGap = secondPlace ? secondPlace.totalScore - leader.totalScore : 0;

    const progressRatio = lastPlace.totalScore / scoreLimit;
    const gamePhase: 'early' | 'mid' | 'end' = progressRatio > 0.7 ? 'end' : progressRatio > 0.3 ? 'mid' : 'early';
    const intensity: 'low' | 'medium' | 'high' = gamePhase === 'end' && gap < 50 ? 'high' : gap > 100 || roundCount > 5 ? 'medium' : 'low';

    // --- Detect specific events (priority order) ---
    const event = this.detectGameEvent(players, roundCount, scoreLimit, sortedPlayers, leader, lastPlace, gap, topGap, gamePhase);

    const baseContext: AICommentContext = {
      type: event.type,
      intensity: event.type === 'general' ? intensity : (event.intensity || intensity),
      focus: event.focus || this.selectFocusPlayer(players, event.type),
      gamePhase,
      leadingPlayer: leader.name,
      strugglingPlayer: lastPlace.name,
      gap,
      averageScore: players.reduce((sum, p) => sum + p.totalScore, 0) / players.length,
      hasRecentDutch: players.some(p => p.rounds.length > 0 && p.rounds[p.rounds.length - 1]?.isDutch),
      roundCount,
      scoreLimit,
      topGap,
      previousLeader: this.memory.previousLeader,
      lastRoundScore: event.lastRoundScore,
      distanceToLimit: event.distanceToLimit,
      positionsGained: event.positionsGained,
    };

    return baseContext;
  }

  private detectGameEvent(
    players: Player[],
    roundCount: number,
    scoreLimit: number,
    sortedPlayers: Player[],
    leader: Player,
    lastPlace: Player,
    gap: number,
    topGap: number,
    gamePhase: 'early' | 'mid' | 'end'
  ): { type: AICommentType; focus?: string | null; intensity?: 'low' | 'medium' | 'high'; lastRoundScore?: number; distanceToLimit?: number; positionsGained?: number } {

    // Game start
    if (roundCount === 0) return { type: 'game_start' };

    // Find who played last round
    const playersWithLastRound = players.filter(p => p.rounds.length > 0);
    if (playersWithLastRound.length === 0) return { type: 'general' };

    // Get last round data
    const lastRoundData = players
      .filter(p => p.rounds.length > 0)
      .map(p => ({
        player: p,
        lastRound: p.rounds[p.rounds.length - 1],
        lastScore: p.rounds[p.rounds.length - 1].score,
      }));

    // --- Dutch win: called Dutch + low score (best in round) ---
    const dutchPlayer = lastRoundData.find(d => d.lastRound.isDutch);
    if (dutchPlayer) {
      const otherScores = lastRoundData.filter(d => d.player.id !== dutchPlayer.player.id).map(d => d.lastScore);
      const dutchWon = otherScores.length === 0 || dutchPlayer.lastScore <= Math.min(...otherScores);
      if (dutchWon) {
        return { type: 'dutch_win', focus: dutchPlayer.player.name, intensity: 'high', lastRoundScore: dutchPlayer.lastScore };
      } else {
        return { type: 'dutch_fail', focus: dutchPlayer.player.name, intensity: 'high', lastRoundScore: dutchPlayer.lastScore };
      }
    }

    // --- Lead change ---
    const previousLeader = this.memory.previousLeader;
    if (previousLeader && leader.name !== previousLeader) {
      return { type: 'lead_change', focus: leader.name, intensity: 'high' };
    }

    // --- Low round score (0-3) ---
    const starPerformer = lastRoundData.reduce((best, d) => d.lastScore < best.lastScore ? d : best, lastRoundData[0]);
    if (starPerformer.lastScore <= 3) {
      return { type: 'low_round_score', focus: starPerformer.player.name, intensity: 'medium', lastRoundScore: starPerformer.lastScore };
    }

    // --- High round score (20+) ---
    const worstPerformer = lastRoundData.reduce((worst, d) => d.lastScore > worst.lastScore ? d : worst, lastRoundData[0]);
    if (worstPerformer.lastScore >= 20) {
      return { type: 'high_round_score', focus: worstPerformer.player.name, intensity: 'medium', lastRoundScore: worstPerformer.lastScore };
    }

    // --- Danger zone: someone close to the limit ---
    const dangerPlayer = sortedPlayers.find(p => {
      const dist = scoreLimit - p.totalScore;
      return dist > 0 && dist <= scoreLimit * 0.15;
    });
    if (dangerPlayer) {
      const dist = scoreLimit - dangerPlayer.totalScore;
      return { type: 'danger_zone', focus: dangerPlayer.player ? dangerPlayer.name : dangerPlayer.name, intensity: 'high', distanceToLimit: dist };
    }

    // --- Comeback: player gained 2+ positions ---
    if (this.memory.previousRanks) {
      const currentRanks: Record<string, number> = {};
      sortedPlayers.forEach((p, i) => { currentRanks[p.name] = i + 1; });

      let bestComeback: { name: string; gained: number } | null = null;
      for (const p of players) {
        const prev = this.memory.previousRanks[p.name];
        const curr = currentRanks[p.name];
        if (prev && curr && prev - curr >= 2) {
          if (!bestComeback || (prev - curr) > bestComeback.gained) {
            bestComeback = { name: p.name, gained: prev - curr };
          }
        }
      }
      if (bestComeback) {
        return { type: 'comeback', focus: bestComeback.name, intensity: 'high', positionsGained: bestComeback.gained };
      }
    }

    // --- Close scores between top 2 ---
    if (topGap <= 10 && topGap > 0 && roundCount >= 3) {
      return { type: 'close_scores', focus: sortedPlayers[1]?.name || null, intensity: 'high' };
    }

    // --- Fallback to phase-based detection ---
    if (gamePhase === 'end') return { type: 'endgame_pressure', intensity: 'high' };
    if (gap > 150) return { type: 'gap_analysis', intensity: 'medium' };
    if (this.detectTension(players)) return { type: 'tension_build', intensity: 'medium' };

    return { type: 'general' };
  }

  // --------------- Comment Selection ---------------

  private selectCommentStrategy(context: AICommentContext, players: Player[], recentEvent?: string): AIComment {
    const templates = COMMENT_TEMPLATES[context.type as keyof typeof COMMENT_TEMPLATES] || COMMENT_TEMPLATES.general;
    const selectedTemplate = this.selectBestTemplate(templates);
    const comment = this.personalizeComment(selectedTemplate, context, players);

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

  private selectBestTemplate(templates: string[]): string {
    const availableTemplates = templates.filter(
      template => !this.commentHistory.slice(-3).some(recent => this.calculateSimilarity(template, recent) > 0.7)
    );

    if (availableTemplates.length === 0) return templates[Math.floor(Math.random() * templates.length)];
    return availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  }

  private personalizeComment(template: string, context: AICommentContext, players: Player[]): string {
    return template
      .replace(/\{playerCount\}/g, players.length.toString())
      .replace(/\{leadingPlayer\}/g, context.leadingPlayer || 'le leader')
      .replace(/\{strugglingPlayer\}/g, context.strugglingPlayer || 'le dernier')
      .replace(/\{focusPlayer\}/g, context.focus || "l'un de vous")
      .replace(/\{gap\}/g, context.gap?.toString() || '?')
      .replace(/\{scoreLimit\}/g, (context.scoreLimit || 100).toString())
      .replace(/\{previousLeader\}/g, context.previousLeader || 'l\'ancien leader')
      .replace(/\{lastRoundScore\}/g, context.lastRoundScore?.toString() || '?')
      .replace(/\{topGap\}/g, context.topGap?.toString() || '?')
      .replace(/\{distanceToLimit\}/g, context.distanceToLimit?.toString() || '?')
      .replace(/\{positionsGained\}/g, context.positionsGained?.toString() || '?');
  }

  private generateStrategicAdvice(context: AICommentContext): string {
    if (context.focus && context.intensity === 'high') {
      return `${context.focus}, ${ADVICE_TEMPLATES[Math.floor(Math.random() * ADVICE_TEMPLATES.length)]}`;
    }
    return ADVICE_TEMPLATES[Math.floor(Math.random() * ADVICE_TEMPLATES.length)];
  }

  // --------------- Player Profiles ---------------

  private updatePlayerProfiles(players: Player[]): void {
    players.forEach(player => {
      if (!this.memory.playerProfiles[player.name]) {
        this.memory.playerProfiles[player.name] = {
          name: player.name,
          playStyle: 'consistent',
          bestScore: Infinity,
          worstScore: -Infinity,
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

      const dutchCount = player.rounds.filter(r => r.isDutch).length;
      profile.dutchCount = dutchCount;
      if (dutchCount > 3 && !profile.runningGags.includes(RUNNING_GAGS.dutch_master_3)) {
        profile.runningGags.push(RUNNING_GAGS.dutch_master_3);
      }
      if (dutchCount > 5 && !profile.runningGags.includes(RUNNING_GAGS.dutch_master_5)) {
        profile.runningGags.push(RUNNING_GAGS.dutch_master_5);
      }
      if (dutchCount > 8 && !profile.runningGags.includes(RUNNING_GAGS.dutch_master_8)) {
        profile.runningGags.push(RUNNING_GAGS.dutch_master_8);
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

  // --------------- Utilities ---------------

  private detectTension(players: Player[]): boolean {
    const scores = players.map(p => p.totalScore);
    const range = Math.max(...scores) - Math.min(...scores);
    return range < 100 && players.length > 2;
  }

  private selectFocusPlayer(players: Player[], type: AICommentType): string | null {
    switch (type) {
      case 'poor_performance':
        return [...players].sort((a, b) => b.totalScore - a.totalScore)[0]?.name || null;
      case 'dutch_celebration':
      case 'dutch_win':
      case 'dutch_fail':
        return players.find(p => p.rounds.length > 0 && p.rounds[p.rounds.length - 1]?.isDutch)?.name || null;
      case 'endgame_pressure':
        return [...players].sort((a, b) => a.totalScore - b.totalScore)[0]?.name || null;
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

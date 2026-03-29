/**
 * Types centralisés pour l'AI Commentator
 */

export type AICommentType =
  | 'game_start'
  | 'dutch_celebration'
  | 'gap_analysis'
  | 'tension_build'
  | 'poor_performance'
  | 'endgame_pressure'
  | 'early_game'
  | 'general'
  | 'strategic_advice'
  | 'player_focus'
  | 'lead_change'
  | 'low_round_score'
  | 'high_round_score'
  | 'dutch_win'
  | 'dutch_fail'
  | 'close_scores'
  | 'danger_zone'
  | 'comeback';

export type AIPersonality = 'humorous' | 'analytical' | 'encouraging' | 'sarcastic';

export interface AICommentContext {
  type: AICommentType;
  intensity: 'low' | 'medium' | 'high';
  focus: string | null;
  gamePhase?: 'early' | 'mid' | 'end';
  leadingPlayer?: string;
  strugglingPlayer?: string;
  gap?: number;
  averageScore?: number;
  hasRecentDutch?: boolean;
  roundCount?: number;
  /** Score of the focus player in the latest round */
  lastRoundScore?: number;
  /** Name of the player who was leading before the latest round */
  previousLeader?: string;
  /** Score limit of the current game */
  scoreLimit?: number;
  /** How close the focus player is to the score limit */
  distanceToLimit?: number;
  /** Score difference between 1st and 2nd place */
  topGap?: number;
  /** Number of positions gained by the focus player */
  positionsGained?: number;
}

export interface AIComment {
  id: string;
  comment: string;
  type: AICommentType;
  timestamp: number;
  advice?: string;
  personality: AIPersonality;
  context: AICommentContext;
}

export interface AICommentatorState {
  currentComment: AIComment | null;
  commentHistory: AIComment[];
  personality: AIPersonality;
  isActive: boolean;
}

export type ProfessorMood = 'happy' | 'excited' | 'thinking' | 'surprised' | 'neutral';

export interface ProfessorAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  animate?: boolean;
  mood?: ProfessorMood;
  showParticles?: boolean;
}

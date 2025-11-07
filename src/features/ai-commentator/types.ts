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
  | 'player_focus';

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

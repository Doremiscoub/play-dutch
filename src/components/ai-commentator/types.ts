
export interface AICommentatorEnhancedProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
}

export type CommentType = 'info' | 'joke' | 'encouragement' | 'observation';

export interface CommentStyle {
  gradient: string;
  border: string;
  icon: React.ReactNode;
  mood: 'happy' | 'excited' | 'thinking' | 'surprised' | 'neutral';
}

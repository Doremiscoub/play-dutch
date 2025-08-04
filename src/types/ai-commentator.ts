
// Types pour le nouveau système de commentaires sportifs
export type CommentType = 'post_round' | 'between_rounds' | 'rule_reminder' | 'fun_fact' | 'general';

export type CommentPriority = 'low' | 'medium' | 'high';

export interface SportsCommentatorState {
  currentComment: string;
  isVisible: boolean;
  commentType: CommentType;
  priority: CommentPriority;
}

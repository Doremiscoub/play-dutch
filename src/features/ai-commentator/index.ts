/**
 * Point d'entrée principal pour le module AI Commentator
 */

export { default as AICommentator } from './components/AICommentator';
export { default as ProfessorAvatar } from './components/professor/ProfessorAvatar';
export { useAICommentator } from './hooks/useAICommentator';
export { aiCommentaryEngine } from './engine/commentaryEngine';
export { optimizedAICommentaryEngine } from './engine/optimizedEngine';
export * from './types';

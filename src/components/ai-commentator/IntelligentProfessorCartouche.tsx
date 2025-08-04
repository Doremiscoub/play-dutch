import React from 'react';
import { Player } from '@/types';
import EnhancedAICommentatorV2 from './EnhancedAICommentatorV2';

interface IntelligentProfessorCartoucheProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  recentEvent?: string;
  className?: string;
}

export default function IntelligentProfessorCartouche(props: IntelligentProfessorCartoucheProps) {
  return <EnhancedAICommentatorV2 {...props} />;
}
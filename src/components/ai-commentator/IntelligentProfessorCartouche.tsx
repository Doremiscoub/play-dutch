import React from 'react';
import { Player } from '@/types';
import SportsCommentatorV3 from './SportsCommentatorV3';

interface IntelligentProfessorCartoucheProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  recentEvent?: string;
  className?: string;
  isGameActive?: boolean;
}

export default function IntelligentProfessorCartouche(props: IntelligentProfessorCartoucheProps) {
  return <SportsCommentatorV3 {...props} isGameActive={props.isGameActive ?? true} />;
}
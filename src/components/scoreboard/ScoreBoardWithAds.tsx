
import React from 'react';
import { ScoreBoardProps } from '@/types';
import ScoreBoard from '../ScoreBoard';

interface ScoreBoardWithAdsProps extends ScoreBoardProps {
  // Props spécifiques pour les publicités si nécessaire
}

const ScoreBoardWithAds: React.FC<ScoreBoardWithAdsProps> = (props) => {
  console.log('ScoreBoardWithAds: Rendering with props', { 
    playersCount: props.players?.length, 
    roundHistoryLength: props.roundHistory?.length 
  });

  return (
    <div className="relative">
      {/* Tableau de scores principal */}
      <ScoreBoard {...props} />
      
      {/* Zone pour les publicités - pour l'instant vide */}
      <div className="hidden md:block">
        {/* Espace réservé pour les publicités futures */}
      </div>
    </div>
  );
};

export default ScoreBoardWithAds;

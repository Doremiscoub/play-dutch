
import React from 'react';
import { ScoreBoardProps } from '@/types';
import ScoreBoard from '../ScoreBoard';

interface ScoreBoardWithAdsProps extends ScoreBoardProps {
  // Props spécifiques pour les publicités si nécessaire
}

const ScoreBoardWithAds: React.FC<ScoreBoardWithAdsProps> = (props) => {
  console.log('ScoreBoardWithAds: Rendering with props', { 
    playersCount: props.players?.length, 
    roundHistoryLength: props.roundHistory?.length,
    scoreLimit: props.scoreLimit,
    showGameEndConfirmation: props.showGameEndConfirmation
  });

  // Vérification de sécurité des props avant transmission
  if (!props.players || props.players.length === 0) {
    console.warn('ScoreBoardWithAds: No players provided, rendering empty state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dutch-blue/5 to-dutch-purple/5">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Aucune partie en cours</h2>
          <p className="text-gray-500">Créez une nouvelle partie pour commencer</p>
        </div>
      </div>
    );
  }

  // Le ScoreBoard gère maintenant AdSenseLayout en interne
  return (
    <ScoreBoard 
      {...props}
      players={props.players}
      roundHistory={props.roundHistory || []}
      scoreLimit={props.scoreLimit || 100}
      onAddRound={props.onAddRound}
      onUndoLastRound={props.onUndoLastRound}
      onEndGame={props.onEndGame}
      showGameEndConfirmation={props.showGameEndConfirmation}
      onConfirmEndGame={props.onConfirmEndGame}
      onCancelEndGame={props.onCancelEndGame}
      openScoreForm={props.openScoreForm}
    />
  );
};

export default ScoreBoardWithAds;

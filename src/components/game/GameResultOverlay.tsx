
/**
 * Overlay de fin de partie avec résultats et options pour continuer
 */
import React from 'react';
import { Player } from '@/types';
import confetti from 'canvas-confetti';
import GamePodium from './GamePodium';
import OtherPlayersRanking from './OtherPlayersRanking';
import GameOverHeader from './GameOverHeader';
import GameOverActionButtons from './GameOverActionButtons';

interface GameResultOverlayProps {
  players: Player[];
  onContinue: (newScoreLimit: number) => void;
  onRestart: () => void;
  scoreLimit: number;
}

const GameResultOverlay: React.FC<GameResultOverlayProps> = ({
  players,
  onContinue,
  onRestart,
  scoreLimit
}) => {
  // Trier les joueurs du meilleur (plus petit score) au pire
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Sélectionner le gagnant (premier joueur après tri)
  const winner = sortedPlayers.length > 0 ? sortedPlayers[0] : null;
  
  // Lancer les confettis lors du montage du composant
  React.useEffect(() => {
    if (winner) {
      const duration = 3000;
      const end = Date.now() + duration;
      
      const colors = ['#0A84FF', '#8B5CF6', '#FF9F0A'];
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        });
        
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [winner]);
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
        {winner && <GameOverHeader winner={winner} />}
        <GamePodium players={players} />
        <OtherPlayersRanking players={players} />
        <GameOverActionButtons 
          onRestart={onRestart}
          onContinueGame={onContinue}
        />
      </div>
    </div>
  );
};

export default GameResultOverlay;

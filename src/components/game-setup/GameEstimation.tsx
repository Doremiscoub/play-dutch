
import React from 'react';
import { Clock } from 'lucide-react';

interface GameEstimationProps {
  playersCount: number;
}

const GameEstimation: React.FC<GameEstimationProps> = ({ playersCount }) => {
  const estimatedDuration = Math.round(playersCount * 8 + 15); // minutes

  return (
    <div className="bg-trinity-blue-50 rounded-xl p-4 border border-glass-border-light">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-dutch-blue" />
          <span className="text-gray-700">Durée estimée</span>
        </div>
        <span className="font-medium text-dutch-blue">{estimatedDuration} minutes</span>
      </div>
    </div>
  );
};

export default GameEstimation;

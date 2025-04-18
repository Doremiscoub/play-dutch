
import React from 'react';
import AnimatedBackground from '../AnimatedBackground';

interface GameLoaderProps {
  message?: string;
}

const GameLoader: React.FC<GameLoaderProps> = ({ message = "Chargement..." }) => {
  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>
      <div className="flex justify-center items-center min-h-screen flex-col p-6">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dutch-blue border-t-transparent mb-4"></div>
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default GameLoader;

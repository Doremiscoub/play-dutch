
import React from 'react';
import AnimatedBackground from '../AnimatedBackground';

const GameLoader: React.FC = () => (
  <div className="min-h-screen w-full relative">
    <div className="fixed inset-0 -z-10">
      <AnimatedBackground variant="default" />
    </div>
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-dutch-blue border-t-transparent"></div>
    </div>
  </div>
);

export default GameLoader;

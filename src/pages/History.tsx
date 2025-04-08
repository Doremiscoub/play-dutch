
import React from 'react';
import { GameHistory } from '@/components/GameHistory';
import AnimatedBackground from '@/components/AnimatedBackground';

const History: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <AnimatedBackground variant="subtle" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
          Historique des parties
        </h1>
        
        <div className="vision-card p-4">
          <GameHistory />
        </div>
      </div>
    </div>
  );
};

export default History;

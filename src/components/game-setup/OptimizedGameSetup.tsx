
import React from 'react';
import { motion } from 'framer-motion';
import OptimizedPlayerSetup from './OptimizedPlayerSetup';
import SimpleParticleBackground from './SimpleParticleBackground';

interface OptimizedGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const OptimizedGameSetup: React.FC<OptimizedGameSetupProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Fond avec particules légères */}
      <SimpleParticleBackground particleCount={6} />
      
      {/* Grille subtile en arrière-plan */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Contenu principal */}
      <div className="relative z-10 py-12">
        <OptimizedPlayerSetup onStartGame={onStartGame} />
      </div>
    </div>
  );
};

export default OptimizedGameSetup;


import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GameText } from '@/components/ui/game-text';

export const FooterSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="text-center space-y-4"
    >
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button 
          onClick={() => navigate('/about')}
          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-semantic-on-surface-muted hover:text-semantic-primary hover:bg-white/20 transition-all font-medium tracking-wide"
        >
          À propos
        </button>
        <button 
          onClick={() => navigate('/privacy')}
          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-semantic-on-surface-muted hover:text-semantic-primary hover:bg-white/20 transition-all font-medium tracking-wide"
        >
          Confidentialité
        </button>
        <button 
          onClick={() => navigate('/terms')}
          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-semantic-on-surface-muted hover:text-semantic-primary hover:bg-white/20 transition-all font-medium tracking-wide"
        >
          Conditions
        </button>
      </div>
      
      <GameText 
        variant="caption" 
        color="light"
        align="center"
        className="font-medium"
      >
        © {new Date().getFullYear()} Dutch Card Game - Prêt pour l'aventure !
      </GameText>
    </motion.div>
  );
};

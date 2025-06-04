
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SEOFooterProps {
  className?: string;
}

const SEOFooter: React.FC<SEOFooterProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`text-center text-gray-500 text-sm space-y-3 ${className}`}
    >
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button 
          onClick={() => navigate('/about')}
          className="hover:text-dutch-blue transition-colors"
        >
          À propos
        </button>
        <span>•</span>
        <button 
          onClick={() => navigate('/rules')}
          className="hover:text-dutch-purple transition-colors"
        >
          Règles
        </button>
        <span>•</span>
        <button 
          onClick={() => navigate('/privacy')}
          className="hover:text-dutch-blue transition-colors"
        >
          Confidentialité
        </button>
        <span>•</span>
        <button 
          onClick={() => navigate('/terms')}
          className="hover:text-dutch-blue transition-colors"
        >
          Conditions
        </button>
      </div>
      <p>© {new Date().getFullYear()} Dutch Card Game - Application gratuite pour jeu de cartes</p>
      <p className="text-xs">
        Suivez vos scores de Dutch, jeu de cartes convivial pour soirées entre amis
      </p>
    </motion.footer>
  );
};

export default SEOFooter;

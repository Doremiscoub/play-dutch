
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SEOFooterProps {
  className?: string;
}

const SEOFooter: React.FC<SEOFooterProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const footerLinks = [
    { label: 'À propos', path: '/about' },
    { label: 'Règles', path: '/rules' },
    { label: 'Stratégies', path: '/strategy' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Confidentialité', path: '/privacy' },
    { label: 'Conditions', path: '/terms' }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`text-center text-gray-500 text-sm space-y-4 ${className}`}
    >
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {footerLinks.map((link, index) => (
          <React.Fragment key={link.path}>
            <button 
              onClick={() => navigate(link.path)}
              className="hover:text-dutch-blue transition-colors"
            >
              {link.label}
            </button>
            {index < footerLinks.length - 1 && <span>•</span>}
          </React.Fragment>
        ))}
      </div>
      
      <div className="space-y-2">
        <p>© {new Date().getFullYear()} Dutch Card Game - Application gratuite pour jeu de cartes</p>
        <p className="text-xs max-w-2xl mx-auto">
          <strong>Dutch Card Game</strong> est l'application de référence pour suivre vos scores de Dutch, 
          le célèbre jeu de cartes convivial parfait pour vos soirées entre amis. 
          Interface moderne, fonctionnement hors-ligne, IA commentateur incluse.
        </p>
        <p className="text-xs text-gray-400">
          Jeu de cartes • Score automatique • Multijoueur • Gratuit • PWA
        </p>
      </div>
    </motion.footer>
  );
};

export default SEOFooter;

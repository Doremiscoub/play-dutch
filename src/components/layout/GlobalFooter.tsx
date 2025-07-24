import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface GlobalFooterProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className={`py-3 px-4 text-center ${className}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-neutral-500"
        >
          Créé par{' '}
          <motion.a
            href="https://www.seagullstudios.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-trinity-blue-600 hover:text-trinity-blue-700 font-semibold inline-flex items-center gap-1 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Seagull Studios
            <ExternalLink className="h-3 w-3" />
          </motion.a>
          {' '}© {currentYear}
        </motion.div>
      </footer>
    );
  }

  return (
    <footer className={`relative bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-lg border-t border-white/40 py-6 px-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Informations principales */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-neutral-800 mb-1">
              🎯 Dutch Blitz Digital Companion
            </h4>
            <p className="text-xs text-neutral-600">
              Votre compagnon numérique pour les parties de cartes Dutch
            </p>
          </div>

          {/* Attribution Seagull Studios */}
          <motion.div 
            className="flex items-center gap-2 text-center sm:text-right"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-xs text-neutral-600">
              <p className="mb-1">Développé avec ❤️ par</p>
              <motion.a
                href="https://www.seagullstudios.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-trinity-blue-100/80 to-trinity-purple-100/80 hover:from-trinity-blue-200/80 hover:to-trinity-purple-200/80 rounded-lg border border-trinity-blue-200/60 text-trinity-blue-700 font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">🕊️</span>
                <span>Seagull Studios</span>
                <ExternalLink className="h-4 w-4" />
              </motion.a>
              <p className="text-xs text-neutral-500 mt-1">
                © {currentYear} - Tous droits réservés
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ligne de séparation décorative */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-trinity-blue-200 to-transparent mt-4"
        />
      </motion.div>
    </footer>
  );
};

export default GlobalFooter;
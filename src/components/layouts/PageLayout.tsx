
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import GradientAnimationStyles from '../game/GradientAnimationStyles';
import { useMediaQuery } from '@/hooks/use-media-query';

// Types de variantes pour les fonds
type BackgroundVariant = 'default' | 'blue' | 'purple';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  backgroundVariant?: BackgroundVariant;
  showGrid?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = "",
  backgroundVariant = 'default',
  showGrid = true
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  // Générer des points aléatoires en arrière-plan
  useEffect(() => {
    const generateDots = () => {
      const dotsContainer = document.querySelector('.background-dots');
      if (!dotsContainer) return;
      
      // Nettoyer les points existants
      dotsContainer.innerHTML = '';
      
      // Couleurs des points
      const colors = ['#A78BFA', '#FDBA74', '#6EE7B7', '#60A5FA'];
      
      // Générer des nouveaux points
      const numberOfDots = isMobile ? 12 : 20;
      
      for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('background-dot');
        
        // Taille aléatoire
        const size = Math.random() * 6 + 2; // Entre 2px et 8px
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        
        // Position aléatoire
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        
        // Couleur aléatoire
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.backgroundColor = randomColor;
        
        // Délai d'animation
        dot.style.animationDelay = `${Math.random() * 5}s`;
        dot.style.animationDuration = `${Math.random() * 5 + 8}s`; // Entre 8s et 13s
        
        // Ajouter au conteneur
        dotsContainer.appendChild(dot);
      }
    };
    
    generateDots();
    
    // Régénérer les points lors du redimensionnement
    window.addEventListener('resize', generateDots);
    return () => {
      window.removeEventListener('resize', generateDots);
    };
  }, [isMobile]);
  
  return (
    <motion.div 
      className={`min-h-screen relative overflow-hidden pb-16 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <GradientAnimationStyles />
      
      {/* Grille en arrière-plan */}
      {showGrid && (
        <div 
          className="absolute inset-0 z-[-5]" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #DADADA1A 1px, transparent 1px), linear-gradient(to bottom, #DADADA1A 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      )}
      
      {/* Points colorés en arrière-plan */}
      <div className="background-dots" />
      
      {/* Contenu principal */}
      <main className="relative z-10 pt-4 pb-20">
        {children}
      </main>
      
      {/* Vagues animées en bas de page */}
      <div className="wave-bottom-1" />
      <div className="wave-bottom-2" />
      <div className="wave-bottom-3" />
    </motion.div>
  );
};

export default PageLayout;

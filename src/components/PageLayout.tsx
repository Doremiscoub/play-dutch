
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import { animationVariants } from '@/utils/animationUtils';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundVariant?: 'default' | 'subtle' | 'minimal';
  withAnimation?: boolean;
  className?: string;
}

/**
 * Composant de mise en page cohérente pour toutes les pages
 * Inclut le fond animé, le quadrillage, et les animations de transition
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  backgroundVariant = 'default',
  withAnimation = true,
  className = ''
}) => {
  const content = (
    <div className={`relative min-h-screen w-full ${className}`}>
      {/* Fond animé */}
      <AnimatedBackground variant={backgroundVariant} />
      
      {/* Contenu de la page */}
      <div className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        {/* Titre et sous-titre optionnels */}
        {title && (
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-1">
              {title}
              <span className="ml-2 text-sm">✨</span>
            </h1>
            {subtitle && (
              <p className="text-gray-600 text-sm">{subtitle}</p>
            )}
          </div>
        )}
        
        {/* Contenu principal */}
        <div className="container mx-auto max-w-4xl">
          {children}
        </div>
      </div>
    </div>
  );
  
  return withAnimation ? (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants.pageTransition}
    >
      {content}
    </motion.div>
  ) : content;
};

export default PageLayout;

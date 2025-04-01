
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import { animationVariants } from '@/utils/animationUtils';
import ThemeSelector from './ThemeSelector';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import themeConfig from '@/config/theme';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundVariant?: 'default' | 'subtle' | 'minimal';
  withAnimation?: boolean;
  className?: string;
  showThemeSelector?: boolean;
  showBackButton?: boolean;
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
  className = '',
  showThemeSelector = false,
  showBackButton = false
}) => {
  const navigate = useNavigate();
  
  const content = (
    <div className={`relative min-h-screen w-full ${className}`}>
      {/* Fond animé */}
      <AnimatedBackground variant={backgroundVariant} />
      
      {/* Bouton retour */}
      {showBackButton && (
        <div className="absolute top-6 left-6 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 text-dutch-blue" />
          </Button>
        </div>
      )}
      
      {/* Sélecteur de thème */}
      {showThemeSelector && (
        <div className="absolute top-6 right-6 z-20">
          <ThemeSelector />
        </div>
      )}
      
      {/* Contenu de la page */}
      <div className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        {/* Titre et sous-titre optionnels */}
        {title && (
          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-1`}>
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
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={animationVariants.pageTransition}
    >
      {content}
    </motion.div>
  ) : content;
};

export default PageLayout;

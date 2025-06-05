
import React from 'react';
import { motion } from 'framer-motion';
import { animationVariants } from '@/utils/animationUtils';
import { PageTitle } from './ui/page-title';
import ThemeSelector from './ThemeSelector';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  withAnimation?: boolean;
  className?: string;
  showThemeSelector?: boolean;
  showBackButton?: boolean;
  backgroundVariant?: 'default' | 'subtle' | 'minimal';
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  withAnimation = true,
  className = '',
  showThemeSelector = false,
  showBackButton,
  backgroundVariant = 'default'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isRulesPage = location.pathname === '/rules';
  const isHistoryPage = location.pathname === '/history';
  const shouldShowBackButton = showBackButton !== undefined ? showBackButton : (isRulesPage || isHistoryPage);
  
  const content = (
    <div className={`relative min-h-screen w-full flex flex-col ${className}`}>
      {/* Bouton retour */}
      {shouldShowBackButton && (
        <div className="absolute top-6 left-6 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
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
      <div className="relative z-10 py-4 sm:py-6 px-2 sm:px-4 lg:px-6 flex-grow w-full">
        {/* Titre et sous-titre optionnels */}
        {title && (
          <PageTitle variant="h1" withSparkles={true}>
            {title}
          </PageTitle>
        )}
        {subtitle && (
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
          </div>
        )}
        
        {/* Contenu principal */}
        <div className="flex-grow w-full relative z-10 mx-auto">
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
      className="min-h-screen flex flex-col w-full"
    >
      {content}
    </motion.div>
  ) : content;
};

export default PageLayout;

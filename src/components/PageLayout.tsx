
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import AnimatedBackground from './AnimatedBackground';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  backgroundVariant?: 'default' | 'subtle' | 'home' | 'none';
  showBackButton?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  className,
  backgroundVariant = 'default',
  showBackButton = false
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={cn("min-h-screen w-full relative", className)}>
      {/* Background elements */}
      {backgroundVariant !== 'none' && (
        <div className="fixed inset-0 -z-10">
          <AnimatedBackground variant={backgroundVariant} />
        </div>
      )}
      
      <div className="px-4 py-6 sm:px-6 max-w-7xl mx-auto relative z-10">
        {/* Header avec bouton retour et titre */}
        {(showBackButton || title) && (
          <div className="mb-6">
            {showBackButton && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBack}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </Button>
              </motion.div>
            )}
            
            {title && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h1 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-gray-600 mt-1">{subtitle}</p>
                )}
              </motion.div>
            )}
          </div>
        )}
        
        {/* Contenu principal */}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

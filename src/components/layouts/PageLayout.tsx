
/**
 * Layout de page standardisé avec fond animé
 */
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../AnimatedBackground';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  backgroundVariant?: 'default' | 'subtle' | 'minimal';
  withAnimation?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '', 
  backgroundVariant = 'default',
  withAnimation = true
}) => {
  return (
    <div className={`min-h-screen w-full pt-6 relative ${className}`}>
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <AnimatedBackground variant={backgroundVariant} />
      </div>
      
      {/* Contenu de la page avec animation conditionnelle */}
      {withAnimation ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  );
};

export default PageLayout;


import React from 'react';
import { motion } from 'framer-motion';
import GradientAnimationStyles from '../game/GradientAnimationStyles';
import BackgroundGrid from './BackgroundGrid';
import BackgroundDots from '../background/BackgroundDots';
import WavesBackground from '../background/WavesBackground';

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
  return (
    <motion.div 
      className={`min-h-screen relative overflow-hidden pb-16 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <GradientAnimationStyles />
      <BackgroundGrid show={showGrid} />
      <BackgroundDots />
      
      {/* Main content */}
      <main className="relative z-10 pt-4 pb-20">
        {children}
      </main>
      
      <WavesBackground />
    </motion.div>
  );
};

export default PageLayout;

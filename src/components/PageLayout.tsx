
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import AnimatedBackground from './AnimatedBackground';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showHomeButton?: boolean;
  showThemeSelector?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  showHomeButton = true,
  showThemeSelector = false
}) => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-start p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements */}
      <AnimatedBackground />
      
      {/* Header with navigation */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 z-10">
        {showHomeButton ? (
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/30 shadow-sm">
              <Home className="h-5 w-5 text-dutch-blue" />
            </Button>
          </Link>
        ) : (
          <div></div> // Empty div for spacing
        )}
        
        {showThemeSelector && <ThemeSelector />}
      </div>
      
      {/* Page title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-10 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 mt-2 max-w-md mx-auto">{subtitle}</p>
        )}
      </motion.div>
      
      {/* Content */}
      <div className="w-full max-w-4xl flex-grow z-10">
        {children}
      </div>
      
      {/* Footer */}
      <motion.div 
        className="mt-10 text-center text-gray-500 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p>© {new Date().getFullYear()} Dutch Card Game</p>
      </motion.div>
    </motion.div>
  );
};

export default PageLayout;

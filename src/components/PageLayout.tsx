
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

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
      className="min-h-screen flex flex-col items-center justify-start p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background blur elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-200/60 z-0" />
      
      {/* Background animated elements similar to home page */}
      <motion.div
        className="absolute top-20 left-[15%] w-56 h-56 rounded-full bg-dutch-blue/10 blur-3xl z-0"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-24 right-[10%] w-64 h-64 rounded-full bg-dutch-orange/10 blur-3xl z-0"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute -top-10 right-[20%] w-48 h-48 rounded-full bg-dutch-purple/10 blur-3xl z-0"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Header with navigation */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 z-10">
        {showHomeButton ? (
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-sm border border-white/30 shadow-sm">
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

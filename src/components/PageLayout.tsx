
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ChevronLeft } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import AnimatedBackground from './AnimatedBackground';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  backTo?: string;
  backText?: string;
  showThemeSelector?: boolean;
  variant?: 'default' | 'centered' | 'full';
  backgroundVariant?: 'default' | 'subtle' | 'game' | 'none';
  titleGradient?: 'blue' | 'purple' | 'orange' | 'multi';
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  showHomeButton = true,
  showBackButton = false,
  backTo = "/",
  backText,
  showThemeSelector = false,
  variant = 'default',
  backgroundVariant = 'default',
  titleGradient = 'multi'
}) => {
  // Determine title gradient class based on prop
  const getTitleGradientClass = () => {
    switch (titleGradient) {
      case 'blue':
        return 'from-dutch-blue to-dutch-blue/80';
      case 'purple':
        return 'from-dutch-purple to-dutch-purple/80';
      case 'orange':
        return 'from-dutch-orange to-dutch-orange/80';
      case 'multi':
      default:
        return 'from-dutch-blue via-dutch-purple to-dutch-pink';
    }
  };

  // Get content width based on variant
  const getContentWidthClass = () => {
    switch (variant) {
      case 'centered':
        return 'max-w-3xl mx-auto text-center';
      case 'full':
        return 'w-full';
      case 'default':
      default:
        return 'max-w-4xl';
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-start p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements */}
      {backgroundVariant !== 'none' && (
        <AnimatedBackground 
          variant={
            backgroundVariant === 'subtle' 
              ? 'subtle' 
              : backgroundVariant === 'game' 
                ? 'default' // Change this to match the allowed types in AnimatedBackground
                : 'default'
          } 
        />
      )}
      
      {/* Header with navigation */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 z-10">
        <div className="flex items-center space-x-2">
          {showHomeButton && (
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/30 shadow-sm">
                <Home className="h-5 w-5 text-dutch-blue" />
              </Button>
            </Link>
          )}
          
          {showBackButton && (
            <Link to={backTo}>
              <Button variant="ghost" size="pill-sm" className="rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/30 shadow-sm">
                <ChevronLeft className="h-4 w-4 mr-1 text-dutch-blue" />
                <span className="text-dutch-blue">{backText || 'Retour'}</span>
              </Button>
            </Link>
          )}
        </div>
        
        {showThemeSelector && <ThemeSelector />}
      </div>
      
      {/* Page title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`text-center mb-10 z-10 ${variant === 'centered' ? 'w-full max-w-3xl' : 'w-full'}`}
      >
        <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${getTitleGradientClass()} bg-clip-text text-transparent`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 mt-2 max-w-md mx-auto backdrop-blur-sm bg-white/5 rounded-full px-4 py-1">
            {subtitle}
          </p>
        )}
      </motion.div>
      
      {/* Content */}
      <div className={`w-full ${getContentWidthClass()} flex-grow z-10`}>
        {children}
      </div>
      
      {/* Footer */}
      <motion.div 
        className="mt-10 text-center text-gray-500 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="backdrop-blur-sm bg-white/10 px-4 py-1 rounded-full inline-block">
          © {new Date().getFullYear()} Dutch Card Game
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PageLayout;

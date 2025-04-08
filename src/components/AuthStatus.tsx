
import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { User, LogIn, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const AuthStatus: React.FC = () => {
  const location = useLocation();
  const [offlineMode, setOfflineMode] = useState(false);
  
  // Vérifier si le mode hors ligne est activé
  useEffect(() => {
    setOfflineMode(localStorage.getItem('clerk_auth_failed') === 'true');
  }, []);
  
  // Check if we're on the sign-in or sign-up page, or their sub-routes
  const isAuthPage = location.pathname.startsWith('/sign-in') || 
                     location.pathname.startsWith('/sign-up');
  
  // If we're on an auth page, don't show the auth buttons
  if (isAuthPage) {
    return null;
  }
  
  // Determine which page we're on to adjust positioning
  const isRulesPage = location.pathname === '/rules';
  const isHomePage = location.pathname === '/' || location.pathname === '/index';
  const isHistoryPage = location.pathname === '/history';
  const isGamePage = location.pathname === '/game';
  
  // Don't show auth buttons on home page since it already has auth buttons
  if (isHomePage) {
    // En mode hors ligne, ne pas afficher le bouton utilisateur
    if (offlineMode) {
      return null;
    }
    
    return (
      <motion.div 
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SignedIn>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue/20 via-dutch-purple/20 to-dutch-pink/20 rounded-full blur-md animate-pulse-slow"></div>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-10 h-10 rounded-full border-2 border-white/50 shadow-md transition-all hover:scale-105 hover:border-white/70 active:scale-95',
                }
              }}
            />
          </motion.div>
        </SignedIn>
      </motion.div>
    );
  }
  
  // Special style for game page
  if (isGamePage) {
    return (
      <motion.div 
        className="fixed top-4 left-4 z-40"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="game-icon" 
              variant="game-control" 
              elevated
              animated
              className="flex items-center justify-center"
            >
              <Home className="w-5 h-5" />
            </Button>
          </motion.div>
        </Link>
        {!offlineMode && (
          <SignedIn>
            <motion.div
              className="fixed top-4 right-4 z-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue/20 via-dutch-purple/20 to-dutch-pink/20 rounded-full blur-md animate-pulse-slow"></div>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-10 h-10 rounded-full border-2 border-white/50 shadow-md transition-all hover:scale-105 hover:border-white/70 active:scale-95',
                  }
                }}
              />
            </motion.div>
          </SignedIn>
        )}
      </motion.div>
    );
  }
  
  // Calculate the optimal position based on the page
  const topPosition = isRulesPage ? 'top-20' : isHistoryPage ? 'top-20' : 'top-4';
  
  // En mode hors ligne, ne pas afficher les boutons d'authentification
  if (offlineMode) {
    return null;
  }
  
  return (
    <motion.div 
      className={`fixed ${topPosition} right-4 z-40`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SignedIn>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue/20 via-dutch-purple/20 to-dutch-pink/20 rounded-full blur-md animate-pulse-slow"></div>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-10 h-10 rounded-full border-2 border-white/50 shadow-md transition-all hover:scale-105 hover:border-white/70 active:scale-95',
              }
            }}
          />
        </motion.div>
      </SignedIn>
      <SignedOut>
        <div className="flex gap-2">
          <Link to="/sign-in">
            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                size="pill-sm" 
                variant="pill-glass" 
                elevated
                animated
                className="transition-all shadow-sm hover:shadow-md active:shadow-sm"
              >
                <LogIn className="w-4 h-4 mr-1" /> Connexion
              </Button>
            </motion.div>
          </Link>
          <Link to="/sign-up">
            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                size="pill-sm" 
                variant="pill-blue" 
                elevated
                animated
                className="transition-all shadow-sm hover:shadow-md active:shadow-sm"
              >
                <User className="w-4 h-4 mr-1" /> Inscription
              </Button>
            </motion.div>
          </Link>
        </div>
      </SignedOut>
    </motion.div>
  );
};

export default AuthStatus;

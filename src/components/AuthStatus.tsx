
import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export const AuthStatus: React.FC = () => {
  const location = useLocation();
  
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
          >
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
  
  // Hide UserButton during gameplay to prevent overlaps with UI elements
  if (isGamePage && location.pathname === '/game') {
    return null;
  }
  
  // Calculate the optimal position based on the page
  const topPosition = isRulesPage ? 'top-20' : isHistoryPage ? 'top-20' : 'top-4';
  
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
        >
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
                size="sm" 
                variant="secondary" 
                glassmorphism 
                elevated
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
                size="sm" 
                variant="ios-blue" 
                glassmorphism 
                elevated
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

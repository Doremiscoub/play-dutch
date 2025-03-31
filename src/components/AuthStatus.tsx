
import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';

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
      <div className="fixed top-4 right-4 z-50">
        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-10 h-10 rounded-full border-2 border-white/50 shadow-md transition-all hover:scale-105 hover:border-white/70 active:scale-95',
              }
            }}
          />
        </SignedIn>
      </div>
    );
  }
  
  // Hide UserButton during gameplay to prevent overlaps with UI elements
  if (isGamePage && location.pathname === '/game') {
    return null;
  }
  
  // Calculate the optimal position based on the page
  const topPosition = isRulesPage ? 'top-20' : isHistoryPage ? 'top-20' : 'top-4';
  
  return (
    <div className={`fixed ${topPosition} right-4 z-40`}>
      <SignedIn>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: 'w-10 h-10 rounded-full border-2 border-white/50 shadow-md transition-all hover:scale-105 hover:border-white/70 active:scale-95',
            }
          }}
        />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-2">
          <Link to="/sign-in">
            <Button 
              size="sm" 
              variant="secondary" 
              glassmorphism 
              elevated
              className="transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md active:shadow-sm"
            >
              <LogIn className="w-4 h-4 mr-1" /> Connexion
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button 
              size="sm" 
              variant="ios-blue" 
              glassmorphism 
              elevated
              className="transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md active:shadow-sm"
            >
              <User className="w-4 h-4 mr-1" /> Inscription
            </Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default AuthStatus;

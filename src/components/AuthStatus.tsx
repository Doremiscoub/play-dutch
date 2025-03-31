
import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';

export const AuthStatus: React.FC = () => {
  const location = useLocation();
  
  // Détermine sur quelle page nous sommes pour ajuster le positionnement
  const isRulesPage = location.pathname === '/rules';
  const isHomePage = location.pathname === '/' || location.pathname === '/index';
  
  // Calculer la position optimale en fonction de la page
  const topPosition = isRulesPage ? 'top-20' : isHomePage ? 'top-16' : 'top-4';
  
  return (
    <div className={`fixed ${topPosition} right-4 z-50`}>
      <SignedIn>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: 'w-10 h-10 rounded-full border-2 border-white/50 shadow-md',
            }
          }}
        />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-2">
          <Link to="/sign-in">
            <Button size="sm" variant="outline" className="bg-white/80 backdrop-blur-sm">
              <LogIn className="w-4 h-4 mr-1" /> Connexion
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button size="sm" variant="default" className="bg-primary/90 backdrop-blur-sm">
              <User className="w-4 h-4 mr-1" /> Inscription
            </Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default AuthStatus;


import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [authTimeout, setAuthTimeout] = useState(false);
  
  // Vérifier immédiatement si une erreur d'authentification a déjà été rencontrée
  useEffect(() => {
    if (localStorage.getItem('clerk_auth_failed') === 'true') {
      setAuthTimeout(true);
    } else {
      // Si pas déjà en mode hors ligne, définir un court délai pour vérifier si Clerk est disponible
      const timer = setTimeout(() => {
        // Vérification sécurisée de l'existence de Clerk dans window
        const clerkAvailable = typeof window !== 'undefined' && 'Clerk' in window;
        if (!clerkAvailable) {
          console.warn("Clerk n'a pas pu être initialisé dans ProtectedRoute");
          localStorage.setItem('clerk_auth_failed', 'true');
          setAuthTimeout(true);
        }
      }, 500); // 500ms de délai
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Si l'authentification prend trop de temps ou a échoué, on laisse passer l'utilisateur immédiatement
  if (authTimeout) {
    return <>{children}</>;
  }
  
  // Si nous ne sommes pas en offline mode, essayer d'utiliser les composants Clerk normalement
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        {children}
      </SignedOut>
      {/* Afficher un loader pendant que nous vérifions l'état de l'authentification */}
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-dutch-blue animate-spin" />
        <span className="ml-2 text-lg text-gray-600">Chargement...</span>
      </div>
    </>
  );
};

export default ProtectedRoute;


import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loaded } = useClerk();
  const [authTimeout, setAuthTimeout] = useState(false);
  
  // Vérifier immédiatement si une erreur d'authentification a déjà été rencontrée
  useEffect(() => {
    if (localStorage.getItem('clerk_auth_failed') === 'true') {
      setAuthTimeout(true);
    }
  }, []);
  
  // Ajouter un timeout très court pour l'authentification (500ms maximum)
  useEffect(() => {
    // Si déjà chargé ou si erreur connue, ne pas attendre
    if (loaded || authTimeout) return;
    
    const timer = setTimeout(() => {
      if (!loaded) {
        setAuthTimeout(true);
        console.warn("Authentication timed out in ProtectedRoute - continuing without auth");
        localStorage.setItem('clerk_auth_failed', 'true');
      }
    }, 500); // Réduit à 500ms pour réagir encore plus vite
    
    return () => clearTimeout(timer);
  }, [loaded, authTimeout]);
  
  // Si l'authentification prend trop de temps ou a échoué, on laisse passer l'utilisateur immédiatement
  if (authTimeout) {
    return <>{children}</>;
  }
  
  // Si Clerk est chargé correctement, utiliser le comportement normal
  if (loaded) {
    return (
      <>
        <SignedIn>
          {children}
        </SignedIn>
        <SignedOut>
          {children}
        </SignedOut>
      </>
    );
  }
  
  // Loader court pendant le chargement initial (sera remplacé par authTimeout après 500ms)
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-dutch-blue animate-spin" />
      <span className="ml-2 text-lg text-gray-600">Chargement...</span>
    </div>
  );
};

export default ProtectedRoute;

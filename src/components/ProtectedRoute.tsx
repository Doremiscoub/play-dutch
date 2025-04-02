
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
  
  // Ajouter un timeout pour l'authentification
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) {
        setAuthTimeout(true);
        console.warn("Authentication loading timed out in ProtectedRoute");
        toast.error("L'authentification n'a pas pu se charger. Accès limité.");
      }
    }, 3000); // 3 secondes maximum
    
    return () => clearTimeout(timer);
  }, [loaded]);
  
  // Si l'authentification prend trop de temps, on laisse passer l'utilisateur
  if ((!loaded && !authTimeout)) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-dutch-blue animate-spin" />
        <span className="ml-2 text-lg text-gray-600">Chargement...</span>
      </div>
    );
  }
  
  // Si l'authentification a échoué après le timeout, on affiche le contenu quand même
  if (authTimeout) {
    return <>{children}</>;
  }
  
  // Comportement normal avec authentification
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
};

export default ProtectedRoute;

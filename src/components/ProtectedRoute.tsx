
import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

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
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }
  
  // Si nous ne sommes pas en offline mode, essayer d'utiliser les composants Clerk normalement
  return (
    <>
      <SignedIn>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </SignedIn>
      <SignedOut>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </SignedOut>
      {/* Afficher un loader VisionOS-style pendant que nous vérifions l'état de l'authentification */}
      <div className="h-screen w-full flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="h-10 w-10 rounded-full border-3 border-dutch-blue/20 border-t-dutch-blue border-r-dutch-blue/60 animate-spin mb-4" />
          <span className="text-lg font-medium text-gray-600">Chargement...</span>
        </motion.div>
      </div>
    </>
  );
};

export default ProtectedRoute;

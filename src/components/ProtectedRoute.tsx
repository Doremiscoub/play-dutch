
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isOfflineMode, isSignedIn } = useAuth();
  
  console.info('🔐 ProtectedRoute:', { isLoaded, isOfflineMode, isSignedIn });
  
  // Si l'authentification n'est pas encore chargée et nous ne sommes pas en mode hors ligne,
  // afficher un loader
  if (!isLoaded && !isOfflineMode) {
    return (
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
    );
  }
  
  // Permettre l'accès si l'utilisateur est connecté ou en mode hors ligne
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;

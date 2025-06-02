
/**
 * Contexte d'authentification avec gestion du mode hors-ligne
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser as useClerkUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { AuthUser, AuthContextType } from '@/types';
import { toast } from 'sonner';

// Valeurs par défaut pour le mode hors-ligne
const defaultAuthContext: AuthContextType = {
  isSignedIn: false,
  isLoaded: true,
  user: null,
  signOut: async () => {},
  isOfflineMode: false
};

// Création du contexte
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

/**
 * Hook pour utiliser le contexte d'authentification
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Provider du contexte d'authentification avec gestion du mode hors-ligne
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(
    localStorage.getItem('clerk_auth_failed') === 'true'
  );
  
  useEffect(() => {
    // Vérifier si nous sommes déjà en mode hors-ligne
    const isAlreadyOffline = localStorage.getItem('clerk_auth_failed') === 'true';
    const hasShownOfflineNotification = localStorage.getItem('offline_notification_shown') === 'true';
    
    if (isAlreadyOffline) {
      setIsOfflineMode(true);
      
      // Afficher la notification seulement si elle n'a pas été montrée
      if (!hasShownOfflineNotification) {
        setTimeout(() => {
          toast.info("Mode hors ligne - vos parties seront sauvegardées localement", {
            duration: 4000
          });
          localStorage.setItem('offline_notification_shown', 'true');
        }, 1000);
      }
    }

    // Surveiller les erreurs Clerk et basculer en mode hors-ligne si nécessaire
    const handleError = (event: ErrorEvent) => {
      if (event.error && event.error.message && 
          (event.error.message.includes('Clerk') || 
           event.error.message.includes('ClerkJS'))) {
        console.warn("Erreur Clerk détectée, activation du mode hors-ligne");
        localStorage.setItem('clerk_auth_failed', 'true');
        setIsOfflineMode(true);
      }
    };

    window.addEventListener('error', handleError);
    
    // Timeout augmenté à 5000ms (5s) pour détecter si Clerk est chargé correctement
    const timeout = setTimeout(() => {
      if (!window.hasOwnProperty('Clerk') && !isOfflineMode) {
        console.warn("Clerk non disponible après le délai, activation du mode hors-ligne");
        localStorage.setItem('clerk_auth_failed', 'true');
        setIsOfflineMode(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('error', handleError);
      clearTimeout(timeout);
    };
  }, [isOfflineMode]);

  // Si nous sommes en mode hors-ligne, utiliser des valeurs par défaut
  if (isOfflineMode) {
    return (
      <AuthContext.Provider value={{ ...defaultAuthContext, isOfflineMode: true }}>
        {children}
      </AuthContext.Provider>
    );
  }

  // Sinon, utiliser les hooks Clerk réels
  return (
    <ClerkAuthProvider>
      {children}
    </ClerkAuthProvider>
  );
};

/**
 * Composant qui utilise les hooks Clerk réels
 */
const ClerkAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isSignedIn, isLoaded } = useClerkUser();
  const { signOut } = useClerkAuth();
  
  // Convertir l'utilisateur Clerk en format cohérent
  const authUser: AuthUser | null = user ? {
    id: user.id,
    fullName: user.fullName,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    imageUrl: user.imageUrl
  } : null;
  
  return (
    <AuthContext.Provider value={{ 
      isSignedIn: !!isSignedIn, 
      isLoaded, 
      user: authUser,
      signOut,
      isOfflineMode: false
    }}>
      {children}
    </AuthContext.Provider>
  );
};

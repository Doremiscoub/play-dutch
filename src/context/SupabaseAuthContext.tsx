
/**
 * Nouveau contexte d'authentification utilisant Supabase Auth
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SupabaseAuthUser {
  id: string;
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface SupabaseAuthContextType {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: SupabaseAuthUser | null;
  session: Session | null;
  signOut: () => Promise<void>;
  isOfflineMode: boolean;
}

// Valeurs par défaut pour le mode hors-ligne
const defaultAuthContext: SupabaseAuthContextType = {
  isSignedIn: false,
  isLoaded: true,
  user: null,
  session: null,
  signOut: async () => {},
  isOfflineMode: true
};

const SupabaseAuthContext = createContext<SupabaseAuthContextType>(defaultAuthContext);

export const useSupabaseAuth = () => useContext(SupabaseAuthContext);

export const SupabaseAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseAuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(
    localStorage.getItem('auth_offline_mode') === 'true'
  );

  // Fonction pour convertir les données Supabase en format unifié
  const createAuthUser = async (authUser: User): Promise<SupabaseAuthUser | null> => {
    try {
      // Récupérer les données de profil depuis la table profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      return {
        id: authUser.id,
        email: authUser.email,
        fullName: profile?.full_name || authUser.user_metadata?.full_name || '',
        firstName: profile?.first_name || authUser.user_metadata?.first_name || '',
        lastName: profile?.last_name || authUser.user_metadata?.last_name || '',
        avatarUrl: profile?.avatar_url || authUser.user_metadata?.avatar_url || ''
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      return {
        id: authUser.id,
        email: authUser.email,
        fullName: authUser.user_metadata?.full_name || '',
        firstName: authUser.user_metadata?.first_name || '',
        lastName: authUser.user_metadata?.last_name || '',
        avatarUrl: authUser.user_metadata?.avatar_url || ''
      };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      toast.success('Déconnexion réussie');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  useEffect(() => {
    // Si mode hors ligne, ne pas initialiser Supabase Auth
    if (isOfflineMode) {
      setIsLoaded(true);
      return;
    }

    let mounted = true;

    // Configuration de l'écoute des changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        if (!mounted) return;

        setSession(session);
        
        if (session?.user) {
          const authUser = await createAuthUser(session.user);
          setUser(authUser);
        } else {
          setUser(null);
        }
        
        if (!isLoaded) {
          setIsLoaded(true);
        }
      }
    );

    // Récupération de la session existante
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!mounted) return;
        
        setSession(session);
        
        if (session?.user) {
          const authUser = await createAuthUser(session.user);
          setUser(authUser);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la session:', error);
        // En cas d'erreur, basculer en mode hors ligne
        setIsOfflineMode(true);
        localStorage.setItem('auth_offline_mode', 'true');
        toast.info('Mode hors ligne activé');
      } finally {
        if (mounted) {
          setIsLoaded(true);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [isOfflineMode, isLoaded]);

  const contextValue: SupabaseAuthContextType = {
    isSignedIn: !!session?.user,
    isLoaded,
    user,
    session,
    signOut,
    isOfflineMode
  };

  return (
    <SupabaseAuthContext.Provider value={contextValue}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

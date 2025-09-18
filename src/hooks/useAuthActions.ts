/**
 * Hook pour les actions d'authentification avec Supabase
 */
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AuthResult {
  success: boolean;
  error?: string;
}

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let errorMessage = 'Erreur de connexion';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email ou mot de passe incorrect';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Veuillez confirmer votre email avant de vous connecter';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Trop de tentatives, veuillez réessayer plus tard';
        }
        
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      toast.success('Connexion réussie !');
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Erreur de connexion');
      return { success: false, error: 'Erreur de connexion' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    metadata?: { firstName?: string; lastName?: string }
  ): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: metadata?.firstName || '',
            last_name: metadata?.lastName || '',
            full_name: metadata ? `${metadata.firstName} ${metadata.lastName}`.trim() : ''
          }
        }
      });

      if (error) {
        let errorMessage = 'Erreur lors de l\'inscription';
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'Cet email est déjà utilisé';
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Format d\'email invalide';
        }
        
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      if (data.user && !data.session) {
        toast.success('Inscription réussie ! Vérifiez votre email pour confirmer votre compte.');
      } else {
        toast.success('Inscription réussie !');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Erreur lors de l\'inscription');
      return { success: false, error: 'Erreur lors de l\'inscription' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error('Erreur lors de la déconnexion');
        return { success: false, error: 'Erreur lors de la déconnexion' };
      }

      toast.success('Déconnexion réussie');
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Erreur lors de la déconnexion');
      return { success: false, error: 'Erreur lors de la déconnexion' };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        toast.error('Erreur lors de l\'envoi de l\'email de réinitialisation');
        return { success: false, error: 'Erreur lors de l\'envoi de l\'email' };
      }

      toast.success('Email de réinitialisation envoyé !');
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Erreur lors de la réinitialisation');
      return { success: false, error: 'Erreur lors de la réinitialisation' };
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    loading
  };
};
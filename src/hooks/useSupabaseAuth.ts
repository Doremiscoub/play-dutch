
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, metadata?: { firstName?: string; lastName?: string }) => {
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
            full_name: `${metadata?.firstName || ''} ${metadata?.lastName || ''}`.trim()
          }
        }
      });

      if (error) throw error;

      if (data.user && !data.session) {
        toast.info('Vérifiez votre email pour confirmer votre inscription');
      } else {
        toast.success('Inscription réussie !');
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      toast.error(error.message || 'Erreur lors de l\'inscription');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Connexion réussie !');
      return { success: true, data };
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      toast.error(error.message || 'Erreur lors de la connexion');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success('Email de réinitialisation envoyé !');
      return { success: true };
    } catch (error: any) {
      console.error('Erreur lors de la réinitialisation:', error);
      toast.error(error.message || 'Erreur lors de la réinitialisation');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    signIn,
    resetPassword,
    loading
  };
};

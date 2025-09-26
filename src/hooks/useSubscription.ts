import { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionState {
  isPremium: boolean;
  isLoading: boolean;
  subscriptionTier: string | null;
  subscriptionEnd: string | null;
}

export const useSubscription = () => {
  const { user } = useSupabaseAuth();
  const [subscription, setSubscription] = useState<SubscriptionState>({
    isPremium: false,
    isLoading: true,
    subscriptionTier: null,
    subscriptionEnd: null,
  });

  const checkSubscription = async () => {
    if (!user) {
      // Pour les utilisateurs non-connectés : pas premium, pas de loading
      // Cela permet aux ads de s'afficher correctement
      setSubscription({
        isPremium: false,
        isLoading: false,
        subscriptionTier: 'free',
        subscriptionEnd: null,
      });
      return;
    }

    try {
      setSubscription(prev => ({ ...prev, isLoading: true }));
      
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Subscription check error:', error);
        setSubscription({
          isPremium: false,
          isLoading: false,
          subscriptionTier: null,
          subscriptionEnd: null,
        });
        return;
      }

      setSubscription({
        isPremium: data?.subscribed || false,
        isLoading: false,
        subscriptionTier: data?.subscription_tier || null,
        subscriptionEnd: data?.subscription_end || null,
      });
    } catch (error) {
      console.error('Subscription check failed:', error);
      setSubscription({
        isPremium: false,
        isLoading: false,
        subscriptionTier: null,
        subscriptionEnd: null,
      });
    }
  };

  const createCheckoutSession = async () => {
    if (!user) {
      throw new Error('Must be logged in to subscribe');
    }

    const { data, error } = await supabase.functions.invoke('create-checkout');
    
    if (error) {
      throw new Error(error.message);
    }

    if (data?.url) {
      window.open(data.url, '_blank');
    }
  };

  const openCustomerPortal = async () => {
    if (!user) {
      throw new Error('Must be logged in to manage subscription');
    }

    const { data, error } = await supabase.functions.invoke('customer-portal');
    
    if (error) {
      throw new Error(error.message);
    }

    if (data?.url) {
      window.open(data.url, '_blank');
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return {
    ...subscription,
    checkSubscription,
    createCheckoutSession,
    openCustomerPortal,
  };
};
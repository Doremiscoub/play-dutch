
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Configuration pour les tests d'intégration
const SUPABASE_URL = "https://ngtvzjgvvabortrdugty.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ndHZ6amd2dmFib3J0cmR1Z3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NjI1OTEsImV4cCI6MjA1OTAzODU5MX0.snq4WticAa0PxfaTNHP8JXrB7IF2mQislH0Xlon3JHs";

export const testSupabaseClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper pour créer un utilisateur de test
export const createTestUser = async (email: string, password: string) => {
  const { data, error } = await testSupabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: 'Test',
        last_name: 'User'
      }
    }
  });
  
  if (error) throw error;
  return data;
};

// Helper pour se connecter
export const signInTestUser = async (email: string, password: string) => {
  const { data, error } = await testSupabaseClient.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

// Helper pour se déconnecter
export const signOutTestUser = async () => {
  await testSupabaseClient.auth.signOut();
};

// Helper pour nettoyer les données de test
export const cleanupTestData = async (gameIds: string[]) => {
  // Supprimer les players d'abord (FK constraint)
  for (const gameId of gameIds) {
    await testSupabaseClient.from('players').delete().eq('game_id', gameId);
  }
  
  // Puis supprimer les games
  for (const gameId of gameIds) {
    await testSupabaseClient.from('games').delete().eq('id', gameId);
  }
};

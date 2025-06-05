
import { describe, it, expect, beforeEach } from 'vitest';
import { testSupabaseClient, signOutTestUser } from './test-supabase-client';

describe('RLS - Unauthenticated Users', () => {
  beforeEach(async () => {
    // S'assurer qu'aucun utilisateur n'est connecté
    await signOutTestUser();
  });

  it('should not be able to read games table', async () => {
    const { data, error } = await testSupabaseClient
      .from('games')
      .select('*');

    // L'utilisateur non authentifié ne devrait recevoir aucune donnée
    expect(data).toEqual([]);
    expect(error).toBeNull(); // Supabase retourne un tableau vide plutôt qu'une erreur pour RLS
  });

  it('should not be able to read players table', async () => {
    const { data, error } = await testSupabaseClient
      .from('players')
      .select('*');

    // L'utilisateur non authentifié ne devrait recevoir aucune donnée
    expect(data).toEqual([]);
    expect(error).toBeNull(); // Supabase retourne un tableau vide plutôt qu'une erreur pour RLS
  });

  it('should not be able to insert into games table', async () => {
    const { data, error } = await testSupabaseClient
      .from('games')
      .insert({
        name: 'Test Game',
        user_id: '00000000-0000-0000-0000-000000000000' // UUID fictif
      });

    // L'insertion devrait échouer
    expect(data).toBeNull();
    expect(error).not.toBeNull();
    expect(error?.code).toBe('42501'); // Code d'erreur PostgreSQL pour insufficient privilege
  });

  it('should not be able to insert into players table', async () => {
    const { data, error } = await testSupabaseClient
      .from('players')
      .insert({
        game_id: '00000000-0000-0000-0000-000000000000',
        user_id: '00000000-0000-0000-0000-000000000000',
        name: 'Test Player'
      });

    // L'insertion devrait échouer
    expect(data).toBeNull();
    expect(error).not.toBeNull();
    expect(error?.code).toBe('42501'); // Code d'erreur PostgreSQL pour insufficient privilege
  });
});

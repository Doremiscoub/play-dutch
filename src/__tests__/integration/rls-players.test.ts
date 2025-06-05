
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { 
  testSupabaseClient, 
  signInTestUser, 
  signOutTestUser, 
  cleanupTestData 
} from './test-supabase-client';

describe('RLS - Players Table Security', () => {
  const userAEmail = `playerUserA-${Date.now()}@example.com`;
  const userBEmail = `playerUserB-${Date.now()}@example.com`;
  const testPassword = 'testpassword123';
  let userAId: string;
  let userBId: string;
  let createdGameIds: string[] = [];

  beforeEach(async () => {
    // Créer et configurer les utilisateurs
    try {
      await testSupabaseClient.auth.signUp({
        email: userAEmail,
        password: testPassword
      });
    } catch {
      // L'utilisateur existe déjà
    }

    try {
      await testSupabaseClient.auth.signUp({
        email: userBEmail,
        password: testPassword
      });
    } catch {
      // L'utilisateur existe déjà
    }

    // Obtenir les IDs des utilisateurs
    const { user: userA } = await signInTestUser(userAEmail, testPassword);
    userAId = userA!.id;
    
    await signOutTestUser();
    
    const { user: userB } = await signInTestUser(userBEmail, testPassword);
    userBId = userB!.id;
  });

  afterEach(async () => {
    if (createdGameIds.length > 0) {
      await signOutTestUser();
      await signInTestUser(userAEmail, testPassword);
      await cleanupTestData(createdGameIds);
      createdGameIds = [];
    }
    await signOutTestUser();
  });

  it('should not be able to read players from another user game', async () => {
    // UserA crée un game et un player
    await signOutTestUser();
    await signInTestUser(userAEmail, testPassword);

    const gameId = uuidv4();
    const playerId = uuidv4();

    await testSupabaseClient.from('games').insert({
      id: gameId,
      name: 'UserA Game',
      user_id: userAId
    });

    await testSupabaseClient.from('players').insert({
      id: playerId,
      game_id: gameId,
      user_id: userAId,
      name: 'UserA Player'
    });

    createdGameIds.push(gameId);

    // UserB tente de lire le player
    await signOutTestUser();
    await signInTestUser(userBEmail, testPassword);

    const { data, error } = await testSupabaseClient
      .from('players')
      .select('*')
      .eq('id', playerId);

    expect(error).toBeNull();
    expect(data).toEqual([]); // RLS empêche l'accès
  });

  it('should not be able to insert players in another user game', async () => {
    // UserA crée un game
    await signOutTestUser();
    await signInTestUser(userAEmail, testPassword);

    const gameId = uuidv4();
    await testSupabaseClient.from('games').insert({
      id: gameId,
      name: 'UserA Game',
      user_id: userAId
    });

    createdGameIds.push(gameId);

    // UserB tente de créer un player dans le game de UserA
    await signOutTestUser();
    await signInTestUser(userBEmail, testPassword);

    const { data, error } = await testSupabaseClient
      .from('players')
      .insert({
        game_id: gameId,
        user_id: userBId,
        name: 'UserB Player in UserA Game'
      });

    expect(data).toBeNull();
    expect(error).not.toBeNull();
    expect(error?.code).toBe('42501'); // Insufficient privilege
  });

  it('should not be able to insert players with wrong user_id', async () => {
    // UserB tente de créer un player avec l'ID de UserA
    const fakeGameId = uuidv4();
    
    const { data, error } = await testSupabaseClient
      .from('players')
      .insert({
        game_id: fakeGameId,
        user_id: userAId, // Tentative d'usurpation d'identité
        name: 'Fake Player'
      });

    expect(data).toBeNull();
    expect(error).not.toBeNull();
    expect(error?.code).toBe('42501'); // Insufficient privilege
  });

  it('should be able to manage players in own games', async () => {
    // UserA crée un game et un player
    await signOutTestUser();
    await signInTestUser(userAEmail, testPassword);

    const gameId = uuidv4();
    const playerId = uuidv4();

    // Créer le game
    await testSupabaseClient.from('games').insert({
      id: gameId,
      name: 'UserA Game',
      user_id: userAId
    });

    createdGameIds.push(gameId);

    // Créer le player
    const { data: insertData, error: insertError } = await testSupabaseClient
      .from('players')
      .insert({
        id: playerId,
        game_id: gameId,
        user_id: userAId,
        name: 'UserA Player'
      })
      .select()
      .single();

    expect(insertError).toBeNull();
    expect(insertData).not.toBeNull();
    expect(insertData?.name).toBe('UserA Player');

    // Lire le player
    const { data: selectData, error: selectError } = await testSupabaseClient
      .from('players')
      .select('*')
      .eq('id', playerId);

    expect(selectError).toBeNull();
    expect(selectData?.length).toBe(1);

    // Mettre à jour le player
    const { data: updateData, error: updateError } = await testSupabaseClient
      .from('players')
      .update({ name: 'Updated Player' })
      .eq('id', playerId)
      .select()
      .single();

    expect(updateError).toBeNull();
    expect(updateData?.name).toBe('Updated Player');

    // Supprimer le player
    const { error: deleteError } = await testSupabaseClient
      .from('players')
      .delete()
      .eq('id', playerId);

    expect(deleteError).toBeNull();
  });
});

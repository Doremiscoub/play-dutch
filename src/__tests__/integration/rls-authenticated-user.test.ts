
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { 
  testSupabaseClient, 
  signInTestUser, 
  signOutTestUser, 
  cleanupTestData 
} from './test-supabase-client';

describe('RLS - Authenticated User (Own Data)', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'testpassword123';
  let testUserId: string;
  let createdGameIds: string[] = [];

  beforeEach(async () => {
    // Créer et connecter un utilisateur de test
    try {
      const { user } = await signInTestUser(testEmail, testPassword);
      testUserId = user!.id;
    } catch {
      // Si l'utilisateur n'existe pas, le créer
      const { data } = await testSupabaseClient.auth.signUp({
        email: testEmail,
        password: testPassword
      });
      testUserId = data.user!.id;
      
      // Se connecter après la création
      await signInTestUser(testEmail, testPassword);
    }
  });

  afterEach(async () => {
    // Nettoyer les données de test
    if (createdGameIds.length > 0) {
      await cleanupTestData(createdGameIds);
      createdGameIds = [];
    }
    await signOutTestUser();
  });

  it('should be able to insert and read own games', async () => {
    const gameId = uuidv4();
    const gameName = 'Test Game';

    // Insérer un game
    const { data: insertData, error: insertError } = await testSupabaseClient
      .from('games')
      .insert({
        id: gameId,
        name: gameName,
        user_id: testUserId
      })
      .select()
      .single();

    expect(insertError).toBeNull();
    expect(insertData).not.toBeNull();
    expect(insertData?.name).toBe(gameName);
    expect(insertData?.user_id).toBe(testUserId);

    createdGameIds.push(gameId);

    // Lire ses propres games
    const { data: selectData, error: selectError } = await testSupabaseClient
      .from('games')
      .select('*')
      .eq('user_id', testUserId);

    expect(selectError).toBeNull();
    expect(selectData).not.toBeNull();
    expect(selectData?.length).toBeGreaterThan(0);
    expect(selectData?.find(game => game.id === gameId)).toBeDefined();
  });

  it('should be able to insert and read own players', async () => {
    // D'abord créer un game
    const gameId = uuidv4();
    const { error: gameError } = await testSupabaseClient
      .from('games')
      .insert({
        id: gameId,
        name: 'Test Game for Players',
        user_id: testUserId
      });

    expect(gameError).toBeNull();
    createdGameIds.push(gameId);

    // Puis créer un player
    const playerId = uuidv4();
    const playerName = 'Test Player';

    const { data: insertData, error: insertError } = await testSupabaseClient
      .from('players')
      .insert({
        id: playerId,
        game_id: gameId,
        user_id: testUserId,
        name: playerName
      })
      .select()
      .single();

    expect(insertError).toBeNull();
    expect(insertData).not.toBeNull();
    expect(insertData?.name).toBe(playerName);
    expect(insertData?.user_id).toBe(testUserId);

    // Lire ses propres players
    const { data: selectData, error: selectError } = await testSupabaseClient
      .from('players')
      .select('*')
      .eq('user_id', testUserId);

    expect(selectError).toBeNull();
    expect(selectData).not.toBeNull();
    expect(selectData?.length).toBeGreaterThan(0);
    expect(selectData?.find(player => player.id === playerId)).toBeDefined();
  });

  it('should be able to update own games', async () => {
    const gameId = uuidv4();
    const originalName = 'Original Game';
    const updatedName = 'Updated Game';

    // Créer un game
    await testSupabaseClient
      .from('games')
      .insert({
        id: gameId,
        name: originalName,
        user_id: testUserId
      });

    createdGameIds.push(gameId);

    // Mettre à jour le game
    const { data: updateData, error: updateError } = await testSupabaseClient
      .from('games')
      .update({ name: updatedName })
      .eq('id', gameId)
      .eq('user_id', testUserId)
      .select()
      .single();

    expect(updateError).toBeNull();
    expect(updateData).not.toBeNull();
    expect(updateData?.name).toBe(updatedName);
  });

  it('should be able to delete own games', async () => {
    const gameId = uuidv4();

    // Créer un game
    await testSupabaseClient
      .from('games')
      .insert({
        id: gameId,
        name: 'Game to Delete',
        user_id: testUserId
      });

    // Supprimer le game
    const { error: deleteError } = await testSupabaseClient
      .from('games')
      .delete()
      .eq('id', gameId)
      .eq('user_id', testUserId);

    expect(deleteError).toBeNull();

    // Vérifier que le game a été supprimé
    const { data: selectData } = await testSupabaseClient
      .from('games')
      .select('*')
      .eq('id', gameId);

    expect(selectData).toEqual([]);
  });
});

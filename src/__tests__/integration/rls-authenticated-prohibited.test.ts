
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { 
  testSupabaseClient, 
  signInTestUser, 
  signOutTestUser, 
  cleanupTestData 
} from './test-supabase-client';

describe('RLS - Authenticated User (Prohibited Access)', () => {
  const userAEmail = `userA-${Date.now()}@example.com`;
  const userBEmail = `userB-${Date.now()}@example.com`;
  const testPassword = 'testpassword123';
  let userAId: string;
  let userBId: string;
  let createdGameIds: string[] = [];

  beforeEach(async () => {
    // Créer les utilisateurs s'ils n'existent pas
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

    // Se connecter en tant qu'utilisateur A
    const { user: userA } = await signInTestUser(userAEmail, testPassword);
    userAId = userA!.id;
    
    await signOutTestUser();
    
    // Se connecter en tant qu'utilisateur B
    const { user: userB } = await signInTestUser(userBEmail, testPassword);
    userBId = userB!.id;
  });

  afterEach(async () => {
    if (createdGameIds.length > 0) {
      // Se connecter en tant qu'utilisateur A pour nettoyer ses données
      await signOutTestUser();
      await signInTestUser(userAEmail, testPassword);
      await cleanupTestData(createdGameIds);
      createdGameIds = [];
    }
    await signOutTestUser();
  });

  it('should not be able to read games from another user', async () => {
    // Se connecter en tant qu'utilisateur A et créer un game
    await signOutTestUser();
    await signInTestUser(userAEmail, testPassword);

    const gameId = uuidv4();
    await testSupabaseClient
      .from('games')
      .insert({
        id: gameId,
        name: 'UserA Game',
        user_id: userAId
      });

    createdGameIds.push(gameId);

    // Se connecter en tant qu'utilisateur B
    await signOutTestUser();
    await signInTestUser(userBEmail, testPassword);

    // Tenter de lire le game de l'utilisateur A
    const { data, error } = await testSupabaseClient
      .from('games')
      .select('*')
      .eq('id', gameId);

    expect(error).toBeNull();
    expect(data).toEqual([]); // RLS empêche l'accès, retourne un tableau vide
  });

  it('should not be able to insert games with another user_id', async () => {
    // Utilisateur B tente de créer un game pour l'utilisateur A
    const gameId = uuidv4();
    
    const { data, error } = await testSupabaseClient
      .from('games')
      .insert({
        id: gameId,
        name: 'Fake Game',
        user_id: userAId // Tentative d'insérer avec l'ID de l'utilisateur A
      });

    expect(data).toBeNull();
    expect(error).not.toBeNull();
    expect(error?.code).toBe('42501'); // Insufficient privilege
  });

  it('should not be able to update games from another user', async () => {
    // Se connecter en tant qu'utilisateur A et créer un game
    await signOutTestUser();
    await signInTestUser(userAEmail, testPassword);

    const gameId = uuidv4();
    await testSupabaseClient
      .from('games')
      .insert({
        id: gameId,
        name: 'UserA Game',
        user_id: userAId
      });

    createdGameIds.push(gameId);

    // Se connecter en tant qu'utilisateur B
    await signOutTestUser();
    await signInTestUser(userBEmail, testPassword);

    // Tenter de mettre à jour le game de l'utilisateur A
    const { data, error } = await testSupabaseClient
      .from('games')
      .update({ name: 'Updated by UserB' })
      .eq('id', gameId);

    expect(data).toEqual([]); // Aucune ligne mise à jour
    expect(error).toBeNull(); // RLS ne retourne pas d'erreur mais aucune ligne affectée
  });

  it('should not be able to delete games from another user', async () => {
    // Se connecter en tant qu'utilisateur A et créer un game
    await signOutTestUser();
    await signInTestUser(userAEmail, testPassword);

    const gameId = uuidv4();
    await testSupabaseClient
      .from('games')
      .insert({
        id: gameId,
        name: 'UserA Game',
        user_id: userAId
      });

    createdGameIds.push(gameId);

    // Se connecter en tant qu'utilisateur B
    await signOutTestUser();
    await signInTestUser(userBEmail, testPassword);

    // Tenter de supprimer le game de l'utilisateur A
    const { data, error } = await testSupabaseClient
      .from('games')
      .delete()
      .eq('id', gameId);

    expect(data).toEqual([]); // Aucune ligne supprimée
    expect(error).toBeNull(); // RLS ne retourne pas d'erreur mais aucune ligne affectée

    // Vérifier que le game existe toujours (en se reconnectant comme utilisateur A)
    await signOutTestUser();
    await signInTestUser(userAEmail, testPassword);

    const { data: checkData } = await testSupabaseClient
      .from('games')
      .select('*')
      .eq('id', gameId);

    expect(checkData?.length).toBe(1); // Le game existe toujours
  });
});

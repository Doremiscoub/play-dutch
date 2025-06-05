
# Tests d'Intégration RLS Supabase

Ce document décrit comment exécuter et maintenir les tests d'intégration pour les politiques Row Level Security (RLS) de Supabase dans l'application Dutch.

## Vue d'ensemble

Les tests RLS vérifient que :
- Les utilisateurs non authentifiés ne peuvent pas accéder aux données
- Les utilisateurs authentifiés ne peuvent accéder qu'à leurs propres données
- Les tentatives d'accès non autorisé sont correctement bloquées

## Structure des Tests

### Fichiers de Test

- `src/__tests__/integration/test-supabase-client.ts` - Utilitaires et configuration client
- `src/__tests__/integration/rls-unauthenticated.test.ts` - Tests utilisateurs non authentifiés
- `src/__tests__/integration/rls-authenticated-user.test.ts` - Tests utilisateurs authentifiés (accès autorisé)
- `src/__tests__/integration/rls-authenticated-prohibited.test.ts` - Tests accès interdits entre utilisateurs
- `src/__tests__/integration/rls-players.test.ts` - Tests spécifiques à la table players

### Tables Testées

#### Games Table
- **id** : UUID, clé primaire
- **user_id** : UUID, référence auth.users
- **name** : Nom de la partie
- **status** : Statut de la partie
- **score_limit** : Limite de score
- **players_count** : Nombre de joueurs

#### Players Table
- **id** : UUID, clé primaire
- **game_id** : UUID, référence games
- **user_id** : UUID, référence auth.users
- **name** : Nom du joueur
- **total_score** : Score total
- **avatar_color** : Couleur de l'avatar
- **emoji** : Emoji du joueur

## Lancement des Tests

### Localement

```bash
# Tous les tests
pnpm test

# Tests d'intégration uniquement
pnpm test integration

# Test spécifique
pnpm test rls-unauthenticated

# Avec couverture
pnpm test --coverage
```

### CI/CD

Les tests s'exécutent automatiquement dans GitHub Actions :

1. Application des migrations Supabase
2. Exécution des tests unitaires
3. Exécution des tests d'intégration RLS
4. Génération du rapport de couverture
5. Build de l'application

## Politiques RLS Actuelles

### Games Table Policies

1. **"Users can view their own games"** - SELECT
   - `USING (auth.uid() = user_id)`

2. **"Users can create their own games"** - INSERT
   - `WITH CHECK (auth.uid() = user_id)`

3. **"Users can update their own games"** - UPDATE
   - `USING (auth.uid() = user_id)`

4. **"Users can delete their own games"** - DELETE
   - `USING (auth.uid() = user_id)`

### Players Table Policies

1. **"Users can view players in their own games"** - SELECT
   - `USING (auth.uid() = user_id)`

2. **"Users can create players in their own games"** - INSERT
   - `WITH CHECK (auth.uid() = user_id)`

3. **"Users can update players in their own games"** - UPDATE
   - `USING (auth.uid() = user_id)`

4. **"Users can delete players in their own games"** - DELETE
   - `USING (auth.uid() = user_id)`

## Ajout de Nouvelles Politiques

### 1. Créer la Migration SQL

```sql
-- Exemple : Politique pour partage de parties
CREATE POLICY "Users can view shared games" 
  ON public.games 
  FOR SELECT 
  USING (shared = true OR auth.uid() = user_id);
```

### 2. Ajouter les Tests

```typescript
it('should be able to view shared games', async () => {
  // Test logic here
});
```

### 3. Mettre à jour la Documentation

Ajouter la nouvelle politique dans ce fichier et décrire son comportement.

## Debugging des Tests RLS

### Problèmes Courants

1. **Tests qui échouent après ajout d'utilisateurs**
   - Vérifier que les emails de test sont uniques (utilisez timestamp)
   - Nettoyer les données après chaque test

2. **Erreurs de permissions**
   - Vérifier que les politiques RLS sont activées sur les tables
   - Confirmer que `auth.uid()` retourne l'ID correct

3. **Tests qui passent mais ne devraient pas**
   - Vérifier que l'utilisateur est bien authentifié
   - Confirmer que les données de test existent

### Commandes de Debug

```bash
# Voir les logs détaillés des tests
pnpm test --reporter=verbose

# Exécuter un seul test en mode debug
pnpm test rls-unauthenticated --reporter=verbose

# Vérifier la connexion Supabase
node -e "console.log(require('./src/__tests__/integration/test-supabase-client').testSupabaseClient)"
```

## Maintenance

### Nettoyage des Données de Test

Les tests nettoient automatiquement leurs données via `cleanupTestData()`. Si des données persistent :

```sql
-- Nettoyer manuellement (à utiliser avec précaution)
DELETE FROM public.players WHERE name LIKE 'Test%';
DELETE FROM public.games WHERE name LIKE 'Test%';
```

### Mise à jour des Tests

Quand vous modifiez les politiques RLS :

1. Mettez à jour les tests correspondants
2. Ajoutez de nouveaux tests si nécessaire
3. Vérifiez que tous les tests passent
4. Mettez à jour cette documentation

## Sécurité

⚠️ **Important** : Ces tests utilisent la vraie base de données Supabase. Assurez-vous que :

- Les utilisateurs de test sont créés avec des emails uniques
- Les données de test sont nettoyées après chaque test
- Les mots de passe de test ne sont pas exposés dans les logs
- Les tests ne modifient pas les données de production

## Métriques de Couverture

Objectif : **≥ 95%** de couverture pour :
- Toutes les politiques RLS
- Tous les scénarios d'authentification
- Toutes les opérations CRUD

Vérifier avec :
```bash
pnpm test --coverage --reporter=lcov
```

# Commentary Engine - Professor Cartouche Sports

## Description
Moteur de commentaires sportifs pour Professor Cartouche. Style speaker radio + gros titres sportifs.

## Usage

```typescript
import { useSportsCommentator } from '@/hooks/useSportsCommentator';

const { currentComment, isVisible, commentType } = useSportsCommentator({
  players,           // Array<Player>
  roundCount,        // number
  isGameActive,      // boolean
  rotationInterval   // number (secondes, défaut: 15)
});
```

## Fonctionnalités

### Quand Professor Cartouche parle
- **Après chaque manche**: Commentaire automatique sur l'évolution des scores
- **Entre les manches**: Rotation automatique toutes les X secondes (configurable)

### Types de commentaires
- `post_round`: Analyse des scores et remontées/chutes
- `between_rounds`: Punchlines, rappels de règles, taquineries

### Contraintes respectées
- ≤ 120 caractères par message
- < 500ms génération
- Utilisation des prénoms des joueurs
- Émojis sportifs (🏆🔥⚡🤯👑🎯)

## Configuration

```typescript
// Interval de rotation entre manches (défaut: 15s)
rotationInterval: 15

// Pour arrêter la rotation
isGameActive: false
```

## Tests
```bash
npm test commentary-engine.test.ts  # Tests unitaires
npm test e2e-sports-commentator     # Test E2E complet
```
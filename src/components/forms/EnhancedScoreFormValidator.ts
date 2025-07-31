/**
 * Validateur de formulaire de score renforcé
 * Remplace ScoreFormValidator avec une validation plus stricte
 */
import { toast } from 'sonner';

// Flag pour éviter les notifications en double
let validationErrorShown = false;
const VALIDATION_COOLDOWN = 3000;

/**
 * Remet à zéro le flag de validation
 */
export const resetValidationErrorFlag = (): void => {
  validationErrorShown = false;
};

/**
 * Interface pour les scores validés
 */
export interface ValidatedScores {
  scores: number[];
  dutchPlayerId?: string;
  dutchPlayerIndex: number;
}

/**
 * Valide les scores avec vérifications renforcées
 */
export const validateScores = (
  scores: { [key: string]: number | string }, 
  playerIds: string[]
): ValidatedScores | null => {
  try {
    // Protection contre les validations répétées
    if (validationErrorShown) {
      console.info('🛡️ Validation cooldown active, skipping');
      return null;
    }

    // Validation des paramètres d'entrée
    if (!scores || typeof scores !== 'object') {
      showValidationError('Données de score invalides');
      return null;
    }

    if (!Array.isArray(playerIds) || playerIds.length === 0) {
      showValidationError('Liste des joueurs invalide');
      return null;
    }

    // Vérification que tous les joueurs ont un score
    const missingPlayers = playerIds.filter(id => !(id in scores));
    if (missingPlayers.length > 0) {
      showValidationError('Tous les joueurs doivent avoir un score');
      return null;
    }

    // Conversion et validation des scores
    const numericScores: number[] = [];
    const conversionErrors: string[] = [];

    for (const id of playerIds) {
      const rawScore = scores[id];
      let numericScore: number;

      if (typeof rawScore === 'number') {
        numericScore = rawScore;
      } else if (typeof rawScore === 'string') {
        numericScore = parseFloat(rawScore.trim());
      } else {
        conversionErrors.push(`Score invalide pour le joueur ${id}`);
        continue;
      }

      // Validation de la valeur numérique
      if (isNaN(numericScore) || !isFinite(numericScore)) {
        conversionErrors.push(`Score non numérique pour le joueur ${id}: ${rawScore}`);
        continue;
      }

      // Validation des bornes (scores raisonnables)
      if (numericScore < 0 || numericScore > 500) {
        conversionErrors.push(`Score hors limites pour le joueur ${id}: ${numericScore}`);
        continue;
      }

      numericScores.push(numericScore);
    }

    // Gestion des erreurs de conversion
    if (conversionErrors.length > 0) {
      showValidationError(`Scores invalides: ${conversionErrors.join(', ')}`);
      return null;
    }

    // Vérification que nous avons le bon nombre de scores
    if (numericScores.length !== playerIds.length) {
      showValidationError('Nombre de scores incorrect');
      return null;
    }

    // Validation logique: au moins un score non nul pour éviter les rounds vides
    if (numericScores.every(score => score === 0)) {
      showValidationError('Au moins un joueur doit avoir des points');
      return null;
    }

    // Détermination du joueur Dutch (plus petit score)
    const minScore = Math.min(...numericScores);
    const dutchPlayerIndex = numericScores.indexOf(minScore);
    const dutchPlayerId = playerIds[dutchPlayerIndex];

    // Validation Dutch: le joueur avec le plus petit score doit avoir au moins un point
    if (minScore === 0 && numericScores.some(score => score > 0)) {
      // C'est valide: le joueur Dutch a 0 points et d'autres ont des points
    } else if (minScore > 0) {
      // C'est valide: tous les joueurs ont des points, celui avec le moins est Dutch
    } else {
      // Cas invalide: tous à 0 points (déjà vérifié plus haut)
      showValidationError('Round invalide: tous les scores sont à zéro');
      return null;
    }

    console.log('✅ Scores validation successful:', {
      scores: numericScores,
      dutchPlayerId,
      dutchPlayerIndex
    });

    return {
      scores: numericScores,
      dutchPlayerId,
      dutchPlayerIndex
    };

  } catch (error) {
    console.error('❌ Score validation error:', error);
    showValidationError('Erreur lors de la validation des scores');
    return null;
  }
};

/**
 * Affiche une erreur de validation avec protection contre le spam
 */
const showValidationError = (message: string): void => {
  if (!validationErrorShown) {
    toast.error(message);
    validationErrorShown = true;
    setTimeout(() => {
      validationErrorShown = false;
    }, VALIDATION_COOLDOWN);
  }
};

/**
 * Valide la cohérence d'un round complet
 */
export const validateRoundData = (
  scores: number[],
  dutchPlayerId: string,
  playerIds: string[]
): boolean => {
  try {
    // Validation des paramètres
    if (!Array.isArray(scores) || !Array.isArray(playerIds)) {
      console.error('❌ Invalid round data: arrays expected');
      return false;
    }

    if (scores.length !== playerIds.length) {
      console.error('❌ Invalid round data: length mismatch');
      return false;
    }

    if (dutchPlayerId && !playerIds.includes(dutchPlayerId)) {
      console.error('❌ Invalid round data: Dutch player ID not in player list');
      return false;
    }

    // Validation des scores
    const hasValidScores = scores.every(score => 
      typeof score === 'number' && 
      isFinite(score) && 
      score >= 0 && 
      score <= 500
    );

    if (!hasValidScores) {
      console.error('❌ Invalid round data: invalid scores');
      return false;
    }

    // Validation logique du Dutch
    if (dutchPlayerId) {
      const dutchPlayerIndex = playerIds.indexOf(dutchPlayerId);
      const dutchScore = scores[dutchPlayerIndex];
      const minScore = Math.min(...scores);

      if (dutchScore !== minScore) {
        console.error('❌ Invalid round data: Dutch player does not have minimum score');
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('❌ Round data validation error:', error);
    return false;
  }
};

import { Player } from '@/types';

/**
 * Constantes pour les types de commentaires possibles
 */
export type CommentType = 'info' | 'joke' | 'sarcasm' | 'encouragement';

interface AIComment {
  comment: string;
  type: CommentType;
}

/**
 * Sélectionne un élément aléatoire dans un tableau
 */
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Sélectionne un type de commentaire aléatoire
 */
const getRandomType = (): CommentType => {
  const types: CommentType[] = ['info', 'joke', 'sarcasm', 'encouragement'];
  const weights = [0.2, 0.3, 0.4, 0.1]; // Pondération pour favoriser certains types
  
  const rand = Math.random();
  let sum = 0;
  
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (rand <= sum) return types[i];
  }
  
  return 'sarcasm'; // Type par défaut
};

/**
 * Récupère un nom de joueur aléatoire
 */
const getRandomPlayerName = (players: Player[]): string => {
  if (!players || players.length === 0) return "Quelqu'un";
  return getRandomItem(players).name;
};

/**
 * Génère un commentaire IA en fonction de l'état actuel de la partie
 * 
 * @param players Les joueurs actuels de la partie
 * @param roundHistory L'historique des manches
 * @param commentatorName Le nom du commentateur IA
 * @returns Un commentaire généré et son type
 */
export function getAIComment(
  players: Player[], 
  roundHistory: { scores: number[], dutchPlayerId?: string }[] = [],
  commentatorName: string = 'Professeur Cartouche'
): AIComment {
  // Si pas de joueurs, renvoyer un message d'attente
  if (players.length === 0) {
    return {
      comment: `En attente des joueurs... ${commentatorName} s'impatiente !`,
      type: 'info'
    };
  }

  // Si la partie vient de commencer
  if (roundHistory.length === 0) {
    const randomStartComment = [
      `Allez les joueurs, montrez-moi ce que vous avez dans le ventre !`,
      `Ah, une nouvelle partie ! Voyons qui va se planter en premier...`,
      `Les cartes sont distribuées, que le meilleur gagne et que les autres perdent avec panache !`,
      `Bienvenue dans cette partie qui s'annonce... intéressante. C'est un euphémisme.`,
      `${getRandomPlayerName(players)}, j'ai parié sur toi. Ne me déçois pas !`,
      `Que la chance soit avec vous. Vous en aurez besoin, croyez-moi.`,
      `J'adore l'odeur des cartes neuves le matin... Ça sent la défaite !`,
      `Que la bataille commence ! Et surtout n'oubliez pas : ce n'est qu'un jeu. Sauf pour les mauvais perdants.`
    ];
    
    return {
      comment: getRandomItem(randomStartComment),
      type: getRandomType()
    };
  }

  // Analyser la dernière manche
  const lastRound = roundHistory[roundHistory.length - 1];
  const dutchPlayer = players.find(p => p.id === lastRound.dutchPlayerId);

  // Commentaires sur le Dutch
  if (dutchPlayer) {
    const dutchComments = [
      `${dutchPlayer.name} a crié Dutch ! Le courage ou l'inconscience ? Un peu des deux je dirais.`,
      `${dutchPlayer.name} joue avec le feu en annonçant Dutch. Téméraire ou kamikaze ?`,
      `Oh oh ! ${dutchPlayer.name} pense pouvoir s'en sortir avec un Dutch... On verra ça !`,
      `${dutchPlayer.name} tente le tout pour le tout avec un Dutch. J'adore ce moment où tout peut basculer !`,
      `Dutch ! ${dutchPlayer.name} nous fait le grand numéro. Suspense insoutenable !`,
      `Quelle audace de ${dutchPlayer.name} ! Un Dutch à ce stade, c'est soit du génie, soit... enfin, vous me comprenez.`,
      `${dutchPlayer.name} crie Dutch avec la confiance d'un joueur qui connaît ses cartes... ou pas !`,
      `Tiens tiens, ${dutchPlayer.name} se lance dans un Dutch. Préparez les mouchoirs, ça pourrait finir en larmes !`
    ];
    
    return {
      comment: getRandomItem(dutchComments),
      type: 'sarcasm'
    };
  }

  // Leader actuel (score le plus bas)
  const currentLeader = [...players].sort((a, b) => a.totalScore - b.totalScore)[0];
  
  // Joueur en difficulté (score le plus élevé)
  const strugglingPlayer = [...players].sort((a, b) => b.totalScore - a.totalScore)[0];
  
  // Joueur qui vient de prendre beaucoup de points
  const worstScoreLastRound = Math.max(...lastRound.scores);
  const worstPlayerLastRound = players[lastRound.scores.indexOf(worstScoreLastRound)];
  
  // Joueur qui a fait un bon score au dernier tour
  const bestScoreLastRound = Math.min(...lastRound.scores);
  const bestPlayerLastRound = players[lastRound.scores.indexOf(bestScoreLastRound)];

  // Diverses situations avec commentaires associés
  
  // 1. Commentaire sur le leader
  if (Math.random() < 0.2) {
    const leaderComments = [
      `${currentLeader.name} mène la danse ! Est-ce qu'on assiste à une démonstration ou juste un coup de chance ?`,
      `${currentLeader.name} en tête avec ${currentLeader.totalScore} points. Mais la route est encore longue...`,
      `Le champion du moment : ${currentLeader.name}. Profitez-en, ça ne durera peut-être pas !`,
      `${currentLeader.name} domine la partie. Je me demande combien de temps cette chance va durer.`,
      `${currentLeader.name} nous montre comment on joue... ou du moins, comment on a de la chance.`
    ];
    
    return {
      comment: getRandomItem(leaderComments),
      type: 'info'
    };
  }
  
  // 2. Commentaire sur le joueur en difficulté
  if (Math.random() < 0.2) {
    const strugglingComments = [
      `${strugglingPlayer.name} accumule les points comme d'autres collectionnent les timbres. Impressionnant !`,
      `${strugglingPlayer.name} avec ${strugglingPlayer.totalScore} points... Vous jouez bien au Dutch, pas au Mille Bornes ?`,
      `${strugglingPlayer.name} semble avoir une stratégie unique : prendre tous les points possibles !`,
      `Je commence à croire que ${strugglingPlayer.name} confond "le moins" et "le plus" de points...`,
      `${strugglingPlayer.name}, rappel amical : l'objectif est d'avoir le MOINS de points possible.`
    ];
    
    return {
      comment: getRandomItem(strugglingComments),
      type: 'sarcasm'
    };
  }
  
  // 3. Commentaire sur le pire score du dernier tour
  if (worstScoreLastRound > 10 && Math.random() < 0.25) {
    const worstRoundComments = [
      `Aïe, ${worstScoreLastRound} points pour ${worstPlayerLastRound.name} ! C'est ce qu'on appelle "une mauvaise pioche".`,
      `${worstPlayerLastRound.name} repart avec ${worstScoreLastRound} points. Pas de chance ou manque de stratégie ?`,
      `${worstScoreLastRound} points pour ${worstPlayerLastRound.name} ! On dirait que les cartes ne sont pas vos amies.`,
      `Ouch ! ${worstPlayerLastRound.name} prend ${worstScoreLastRound} points d'un coup. Ça fait mal au classement ça !`,
      `${worstPlayerLastRound.name}, ${worstScoreLastRound} points ? Sérieusement ? Vous collectionnez les mauvaises cartes ?`
    ];
    
    return {
      comment: getRandomItem(worstRoundComments),
      type: 'joke'
    };
  }
  
  // 4. Commentaire sur le meilleur score du dernier tour
  if (bestScoreLastRound <= 3 && Math.random() < 0.25) {
    const bestRoundComments = [
      `${bestPlayerLastRound.name} s'en sort avec seulement ${bestScoreLastRound} points ! Chapeau !`,
      `Belle manche pour ${bestPlayerLastRound.name} avec juste ${bestScoreLastRound} points. La chance ou le talent ?`,
      `${bestScoreLastRound} points pour ${bestPlayerLastRound.name}. C'est ce qu'on appelle tirer son épingle du jeu !`,
      `${bestPlayerLastRound.name} limite les dégâts avec ${bestScoreLastRound} points. Bien joué, mais restez humble !`,
      `Seulement ${bestScoreLastRound} points pour ${bestPlayerLastRound.name} ? Vous avez payé les cartes ou quoi ?`
    ];
    
    return {
      comment: getRandomItem(bestRoundComments),
      type: 'encouragement'
    };
  }
  
  // 5. Commentaire sur la progression de la partie
  if (roundHistory.length > 3 && Math.random() < 0.2) {
    const gameProgressComments = [
      `Déjà ${roundHistory.length} manches ! Le temps passe vite quand on s'amuse... ou qu'on perd, pour certains.`,
      `Manche ${roundHistory.length} et les scores s'envolent ! Qui atteindra 100 points en premier ?`,
      `Le jeu s'intensifie après ${roundHistory.length} manches ! Les visages se crispent, les mains tremblent...`,
      `${roundHistory.length} manches et toujours pas de vainqueur clair. C'est ça que j'appelle du suspense !`,
      `Manche ${roundHistory.length} : ${getRandomPlayerName(players)} commence à transpirer, je le vois d'ici !`
    ];
    
    return {
      comment: getRandomItem(gameProgressComments),
      type: 'info'
    };
  }
  
  // 6. Commentaires généraux aléatoires (fallback)
  const generalComments = [
    `Je sens que cette partie va être mémorable... pour certains plus que d'autres !`,
    `Rappelez-vous : ce n'est pas la victoire qui compte, c'est de voir les autres perdre.`,
    `Un conseil : méfiez-vous des joueurs qui sourient trop. Ils connaissent probablement leurs cartes.`,
    `Je vois des stratégies intéressantes... et d'autres complètement absurdes.`,
    `N'oubliez pas : bluffer c'est bien, savoir ce qu'on fait c'est mieux !`,
    `Certains jouent aux cartes, d'autres jouent avec leur destin.`,
    `Le Dutch est comme la vie : plein de surprises, souvent décevantes.`,
    `Qui va crier Dutch en premier ? Les paris sont ouverts !`,
    `J'adore voir vos visages quand vous découvrez une carte que vous ne vouliez pas...`,
    `La tension monte ! Je sens que ${getRandomPlayerName(players)} mijote quelque chose.`,
    `Allez, qui va nous faire le grand numéro du "j'ai un super jeu" alors qu'il a trois rois ?`,
    `Faites attention à ${getRandomPlayerName(players)}, ce petit sourire en coin n'annonce rien de bon.`,
    `Le Dutch révèle votre vraie personnalité... et franchement, c'est inquiétant pour certains.`
  ];
  
  return {
    comment: getRandomItem(generalComments),
    type: getRandomType()
  };
}

export default {
  getAIComment,
  getRandomType
};

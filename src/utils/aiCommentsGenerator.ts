
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
      `${getRandomPlayerName(players)}, j'ai parié sur toi. Ne me déçois pas !`
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
      `${dutchPlayer.name} tente le tout pour le tout avec un Dutch. J'adore quand ils font ça !`,
      `Mes chers amis, ${dutchPlayer.name} vient de faire un Dutch. Applaudissez ce courage !`
    ];
    return {
      comment: getRandomItem(dutchComments),
      type: 'sarcasm'
    };
  }

  // Commentaires sur les scores
  const worstScoreIndex = lastRound.scores.indexOf(Math.max(...lastRound.scores));
  const worstScorePlayer = players[worstScoreIndex];
  const bestScoreIndex = lastRound.scores.indexOf(Math.min(...lastRound.scores.filter(s => s > 0)));
  const bestScorePlayer = bestScoreIndex >= 0 ? players[bestScoreIndex] : null;
  
  if (lastRound.scores.some(score => score > 20)) {
    const highScoreComments = [
      `${worstScorePlayer.name} accumule les points comme si c'était une bonne chose. Quelqu'un devrait lui expliquer le but du jeu...`,
      `Aïe aïe aïe ! ${worstScorePlayer.name} vient de prendre une claque monumentale !`,
      `${worstScorePlayer.name}, tu collectionnes les points ou les catastrophes ? Impressionnant dans les deux cas !`,
      `Mes amis, admirez la performance de ${worstScorePlayer.name}. Une leçon... de ce qu'il ne faut pas faire !`,
      `${worstScorePlayer.name}, tu fais exprès de perdre ou c'est un talent naturel ?`
    ];
    return {
      comment: getRandomItem(highScoreComments),
      type: 'joke'
    };
  }
  
  if (bestScorePlayer && bestScorePlayer.rounds.length > 1) {
    const goodPlayComments = [
      `${bestScorePlayer.name} joue finement. Je suis presque impressionné !`,
      `${bestScorePlayer.name} semble avoir compris les règles, à la différence de certains...`,
      `Joli coup ${bestScorePlayer.name} ! Continue comme ça et les autres joueurs vont finir par pleurer.`,
      `${bestScorePlayer.name} montre aux autres comment on joue. Prenez des notes, les amis !`,
      `Voilà ce que j'appelle savoir jouer : ${bestScorePlayer.name} nous fait une démonstration.`
    ];
    return {
      comment: getRandomItem(goodPlayComments),
      type: 'encouragement'
    };
  }

  // Commentaires sur l'évolution de la partie
  if (roundHistory.length > 3) {
    const leader = [...players].sort((a, b) => a.totalScore - b.totalScore)[0];
    const loser = [...players].sort((a, b) => b.totalScore - a.totalScore)[0];
    
    if (leader.totalScore < loser.totalScore - 20) {
      const leaderComments = [
        `${leader.name} mène la danse ! Les autres devraient peut-être envisager une reconversion...`,
        `${leader.name} est en tête, mais attention à ne pas s'endormir sur ses lauriers !`,
        `${leader.name} domine cette partie ! J'espère que les autres n'ont pas parié gros sur leur victoire...`,
        `À ce rythme, ${leader.name} va gagner avant même que les autres comprennent ce qui leur arrive !`,
        `Mesdames et messieurs, admirez la maestria de ${leader.name} ! Un vrai pro... ou juste beaucoup de chance ?`
      ];
      return {
        comment: getRandomItem(leaderComments),
        type: 'info'
      };
    }
  }

  // Commentaires génériques
  const genericComments = [
    `La partie s'échauffe ! Qui va craquer en premier ?`,
    `Je vois des sueurs froides sur certains visages. La pression monte !`,
    `${getRandomPlayerName(players)}, ton jeu est aussi transparent qu'un livre ouvert. Travaille ton poker face !`,
    `Ah, le Dutch... ce jeu où l'amitié va être mise à rude épreuve !`,
    `${getRandomPlayerName(players)} et ${getRandomPlayerName(players, 1)}, vous formeriez une bonne équipe... dommage que ce soit chacun pour soi !`,
    `Cette manche était... comment dire... particulière ? Continuez, ça m'amuse !`,
    `Je n'ai jamais vu une stratégie aussi... originale ? Continuez, je prends des notes.`,
    `Si c'était un concours de maladresse, vous seriez tous médaillés d'or !`,
    `Mes chers amis, le spectacle que vous m'offrez est... indescriptible. Et pas dans le bon sens.`,
    `À ce stade, je me demande si vous jouez au Dutch ou à qui perdra le plus vite !`
  ];
  
  return {
    comment: getRandomItem(genericComments),
    type: getRandomType()
  };
}

/**
 * Récupère un joueur aléatoire depuis la liste
 */
function getRandomPlayerName(players: Player[], excludeIndex: number = -1): string {
  if (players.length === 0) return "Joueur mystère";
  
  let availablePlayers = players;
  if (excludeIndex >= 0) {
    availablePlayers = players.filter((_, index) => index !== excludeIndex);
  }
  
  const randomIndex = Math.floor(Math.random() * availablePlayers.length);
  return availablePlayers[randomIndex]?.name || "Joueur mystère";
}

/**
 * Sélectionne un élément aléatoire dans un tableau
 */
function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * Génère un type de commentaire aléatoire
 */
function getRandomType(): CommentType {
  const types: CommentType[] = ['info', 'joke', 'sarcasm', 'encouragement'];
  return getRandomItem(types);
}


import { Player } from '@/types';

// Types de commentaires possibles
type CommentType = 'info' | 'joke' | 'sarcasm' | 'encouragement';

/**
 * Génère un commentaire aléatoire en fonction de l'état du jeu
 */
export const getRandomComment = (
  players: Player[],
  roundHistory: { scores: number[], dutchPlayerId?: string }[]
): { comment: string; type: CommentType } => {
  // Si pas de joueurs, retour générique
  if (!players.length) {
    return {
      comment: "Alors, on commence la partie ou quoi ?",
      type: 'encouragement'
    };
  }

  // Si pas encore de manches jouées
  if (!roundHistory.length || !players[0].rounds.length) {
    return getRandomFromArray(newGameComments);
  }

  // Sélectionner un type de commentaire aléatoire
  const commentOptions: { [key in CommentType]: () => string } = {
    info: () => getInfoComment(players, roundHistory),
    joke: () => getJokeComment(players),
    sarcasm: () => getSarcasmComment(players, roundHistory),
    encouragement: () => getEncouragementComment(players)
  };

  const types: CommentType[] = ['info', 'joke', 'sarcasm', 'encouragement'];
  const selectedType = getRandomFromArray(types);
  
  return {
    comment: commentOptions[selectedType](),
    type: selectedType
  };
};

// Fonction utilitaire pour obtenir un élément aléatoire d'un tableau
const getRandomFromArray = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Fonction utilitaire pour remplacer le nom du joueur dans un message
const insertPlayerName = (message: string, players: Player[]): string => {
  if (message.includes('{player}') && players.length > 0) {
    const randomPlayer = getRandomFromArray(players);
    return message.replace('{player}', randomPlayer.name);
  }
  return message;
};

// Commentaires pour une nouvelle partie
const newGameComments = [
  { comment: "C'est parti ! Qui sera le plus malin ce soir ?", type: 'encouragement' },
  { comment: "Dutch time ! Préparez vos bluffs et vos stratégies !", type: 'encouragement' },
  { comment: "Nouvelle partie, nouvelles chances de ridiculiser tes potes !", type: 'joke' },
  { comment: "Les cartes sont distribuées. Que le moins nul gagne !", type: 'sarcasm' }
] as const;

// Commentaires d'information sur l'état du jeu
const getInfoComment = (players: Player[], roundHistory: { scores: number[], dutchPlayerId?: string }[]): string => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const lastPlace = sortedPlayers[sortedPlayers.length - 1];
  
  const possibleComments = [
    `${leader.name} est en tête avec ${leader.totalScore} points. Pas mal, mais est-ce que ça va durer ?`,
    `${lastPlace.name} est dernier avec ${lastPlace.totalScore} points. Allez, remonte la pente !`,
    `Déjà ${roundHistory.length} manches jouées. On est bien lancés !`,
    `La moyenne des scores est de ${Math.round(players.reduce((acc, player) => acc + player.totalScore, 0) / players.length)} points.`,
    `${players.filter(p => p.rounds.some(r => r.isDutch)).length} joueurs ont déjà fait un Dutch, pas mal !`
  ];
  
  return getRandomFromArray(possibleComments);
};

// Commentaires humoristiques
const getJokeComment = (players: Player[]): string => {
  const jokes = [
    "Si tu mélanges aussi mal les cartes que tu joues, on n'est pas sortis de l'auberge !",
    "C'est comme au poker : il faut savoir bluffer... mais toi {player}, on voit tout sur ton visage !",
    "Jouer comme ça, c'est comme manger une pizza à l'ananas : techniquement possible, mais pourquoi ?",
    "Tu tiens tes cartes comme mon grand-père tient son smartphone : avec confusion et panique.",
    "Si les cartes étaient des excuses, {player} serait champion du monde !",
    "Avec cette stratégie, tu pourrais même perdre à un jeu de hasard contre un poisson rouge.",
    "Quel suspense insoutenable ! J'ai vu des escargots plus rapides pour jouer leur tour."
  ];
  
  return insertPlayerName(getRandomFromArray(jokes), players);
};

// Commentaires sarcastiques
const getSarcasmComment = (players: Player[], roundHistory: { scores: number[], dutchPlayerId?: string }[]): string => {
  // Trouver le joueur qui a le plus de points (donc le moins bon)
  const worstPlayer = [...players].sort((a, b) => b.totalScore - a.totalScore)[0];
  
  // Trouver le joueur qui a pris le plus de points lors du dernier tour
  let lastRoundLoser = null;
  if (roundHistory.length > 0) {
    const lastRound = roundHistory[roundHistory.length - 1];
    const maxScoreIndex = lastRound.scores.indexOf(Math.max(...lastRound.scores));
    lastRoundLoser = players[maxScoreIndex];
  }
  
  const sarcasticComments = [
    `Wow ${worstPlayer.name}, ${worstPlayer.totalScore} points ! Tu collectionnes les points comme d'autres collectionnent les succès.`,
    `${lastRoundLoser ? lastRoundLoser.name : 'Quelqu\'un'} a dû confondre Dutch avec "prendre tous les points possibles". Stratégie audacieuse !`,
    "Si le but était de perdre, certains d'entre vous seraient des génies absolus !",
    "Je n'ai jamais vu quelqu'un autant aimer ramasser des cartes que {player}. C'est presque touchant.",
    "Tu as une technique fascinante {player} : accumuler des points comme si c'était des Pokémons.",
    "À ce stade, je ne sais pas si c'est de la malchance ou un talent particulier pour perdre.",
    "Je commence à croire que certains d'entre vous confondent ce jeu avec un concours du plus grand score !"
  ];
  
  return insertPlayerName(getRandomFromArray(sarcasticComments), players);
};

// Commentaires d'encouragement
const getEncouragementComment = (players: Player[]): string => {
  const encouragements = [
    "Allez {player}, la chance va tourner ! Ou pas, mais c'est le jeu !",
    "N'oubliez pas d'annoncer 'Dutch' quand vous n'avez qu'une carte. Je dis ça, je dis rien...",
    "Même si tu perds, rappelle-toi que ce n'est qu'un jeu. Un jeu où tout le monde va se moquer de toi, certes.",
    "Les meilleurs joueurs savent quand faire semblant d'être nuls. C'est ta stratégie, {player} ?",
    "Le vrai gagnant, c'est celui qui s'amuse le plus. Mais bon, gagner c'est quand même plus amusant.",
    "Un Roi en main, c'est bien. Un As, c'est mieux. Une stratégie, c'est optionnel visiblement pour certains.",
    "Rappelle-toi : ce n'est pas celui qui a le plus de cartes qui gagne. Je précise, on ne sait jamais."
  ];
  
  return insertPlayerName(getRandomFromArray(encouragements), players);
};

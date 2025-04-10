
import { Player } from '@/types';

// Type pour les commentaires
export type CommentType = 'info' | 'joke' | 'sarcasm' | 'encouragement';

interface Comment {
  comment: string;
  type: CommentType;
}

// Fonction principale pour obtenir un commentaire aléatoire
export const getRandomComment = (
  players: Player[], 
  roundHistory: { scores: number[], dutchPlayerId?: string }[]
): Comment => {
  // Si pas de joueurs ou pas de rounds, retourner un commentaire de nouvelle partie
  if (players.length === 0 || (players[0].rounds && players[0].rounds.length === 0)) {
    return getRandomElementFromArray(newGameComments);
  }

  // Analyser l'état du jeu pour des commentaires contextuels
  const lastRoundIndex = roundHistory.length - 1;
  
  if (lastRoundIndex >= 0) {
    // Obtenir le joueur qui a fait le meilleur score au dernier tour
    const lastRound = roundHistory[lastRoundIndex];
    const minScoreLastRound = Math.min(...lastRound.scores);
    const playerWithMinScoreIndex = lastRound.scores.indexOf(minScoreLastRound);
    const playerWithMinScore = players[playerWithMinScoreIndex];
    
    // Obtenir le joueur qui a fait le pire score au dernier tour
    const maxScoreLastRound = Math.max(...lastRound.scores);
    const playerWithMaxScoreIndex = lastRound.scores.indexOf(maxScoreLastRound);
    const playerWithMaxScore = players[playerWithMaxScoreIndex];
    
    // 35% de chance de faire un commentaire sur un joueur spécifique
    if (Math.random() < 0.35) {
      if (minScoreLastRound === 0) {
        return {
          comment: `${playerWithMinScore.name} a fait un Dutch ! ${getRandomElementFromArray([
            "C'est beau comme Mbappé qui marque à la 90ème !",
            "J'ai presque versé une larme d'émotion. Presque.",
            "Est-ce que t'as triché ou t'as vraiment eu un coup de chance ?",
            "Incroyable ! Je crois que même ton adversaire est impressionné, mais il fait genre que non.",
          ])}`,
          type: 'joke'
        };
      } else if (minScoreLastRound <= 3) {
        return {
          comment: `${getRandomElementFromArray([
            `${playerWithMinScore.name}, très solide ce tour ! Si seulement tu jouais comme ça depuis le début...`,
            `Pas mal ${playerWithMinScore.name} ! C'était de la chance ou tu commences enfin à comprendre le jeu ?`,
            `${playerWithMinScore.name} se réveille ! Il était temps après tous ces points accumulés !`,
            `Joli coup ${playerWithMinScore.name} ! Garde ce rythme et tu auras peut-être une chance de ne pas finir dernier.`
          ])}`,
          type: 'sarcasm'
        };
      } else if (maxScoreLastRound >= 10) {
        return {
          comment: `${getRandomElementFromArray([
            `Aïe aïe aïe ${playerWithMaxScore.name}... T'as pris cher ! Tu joues pour perdre ou c'est naturel ?`,
            `${playerWithMaxScore.name} collectionne les points comme certains collectionnent les timbres. Dommage que le but soit d'en avoir le moins possible...`,
            `Hey ${playerWithMaxScore.name}, tu sais que le but n'est PAS d'avoir le plus de points, hein ?`,
            `${playerWithMaxScore.name}, on dirait que les cartes ne t'aiment pas. Ou alors c'est juste ton jeu qui est catastrophique.`
          ])}`,
          type: 'sarcasm'
        };
      }
    }
  }

  // 30% de chance d'avoir un commentaire sur le classement général
  if (Math.random() < 0.3) {
    // Trier les joueurs par score
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const loser = sortedPlayers[sortedPlayers.length - 1];
    
    // Écart important entre le premier et le dernier ?
    const gap = loser.totalScore - leader.totalScore;
    
    if (gap > 30) {
      return {
        comment: `${getRandomElementFromArray([
          `${loser.name} est à ${gap} points derrière ${leader.name}. À ce stade, c'est plus un jeu, c'est une leçon d'humilité !`,
          `${leader.name} mène avec ${gap} points d'avance sur ${loser.name}. C'est comme un match PSG-Dunkerque, y'a plus de suspense !`,
          `${gap} points d'écart entre ${leader.name} et ${loser.name} ! C'est ce qu'on appelle la différence entre talent et... euh... participation.`
        ])}`,
        type: 'sarcasm'
      };
    } else if (gap < 5 && players[0].rounds.length > 2) {
      return {
        comment: `${getRandomElementFromArray([
          `${leader.name} et ${loser.name} sont au coude à coude ! Ça va se jouer à qui a le plus de chance... euh je veux dire de talent !`,
          `Seulement ${gap} points d'écart entre tous les joueurs ! Soit vous êtes tous très bons, soit vous êtes tous... enfin bref, c'est serré !`,
          `Match ultra serré ! ${gap} points d'écart à peine. Je sens qu'on va avoir droit à des coups bas dans les prochaines manches !`
        ])}`,
        type: 'encouragement'
      };
    }
  }

  // 25% de chance d'avoir un commentaire aléatoire drôle
  if (Math.random() < 0.25) {
    return getRandomElementFromArray(randomJokeComments);
  }

  // Par défaut, donner un commentaire informatif sur l'état du jeu
  return {
    comment: getInfoComment(players, roundHistory),
    type: 'info'
  };
};

// Commentaires pour une nouvelle partie
const newGameComments: Comment[] = [
  { comment: "C'est parti ! Qui sera le plus malin ce soir ?", type: 'encouragement' },
  { comment: "Dutch time ! Préparez vos bluffs et vos stratégies !", type: 'encouragement' },
  { comment: "Nouvelle partie, nouvelles chances de ridiculiser tes potes !", type: 'joke' },
  { comment: "Les cartes sont distribuées. Que le moins nul gagne !", type: 'sarcasm' }
];

// Commentaires d'information sur l'état du jeu
const getInfoComment = (players: Player[], roundHistory: { scores: number[], dutchPlayerId?: string }[]): string => {
  if (players.length === 0) return "Ajoutez des joueurs pour commencer !";

  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const runnerUp = sortedPlayers.length > 1 ? sortedPlayers[1] : null;

  if (!leader.rounds || leader.rounds.length === 0) {
    return "Première manche ! Que le meilleur gagne, ou le plus fourbe...";
  }

  const currentRound = players[0].rounds.length;
  
  if (runnerUp) {
    const diff = runnerUp.totalScore - leader.totalScore;
    if (diff === 0) {
      return `Égalité parfaite après ${currentRound} manches ! C'est tendu comme la corde d'un string !`;
    } else {
      return `${leader.name} mène avec ${diff} points d'avance après ${currentRound} manches. Rattrapez-le avant qu'il ne prenne la grosse tête !`;
    }
  }

  return `${leader.name} est en tête après ${currentRound} manches. Ça doit être sa soirée... ou les autres sont juste mauvais !`;
};

// Commentaires aléatoires drôles
const randomJokeComments: Comment[] = [
  { 
    comment: "Tu sais que tu as le droit de regarder tes cartes hein ? Je dis ça parce que vu ton jeu, on pourrait en douter...", 
    type: 'joke' 
  },
  { 
    comment: "C'est comme au poker, sauf que tu ne peux pas bluffer. Enfin si, mais c'est toi qui va en subir les conséquences !", 
    type: 'sarcasm' 
  },
  { 
    comment: "Le Dutch c'est pas sorcier, faut juste de la chance, de la stratégie, et des amis qui jouent encore plus mal que toi.", 
    type: 'joke' 
  },
  { 
    comment: "Si tu regardes en l'air pendant que tu joues, c'est que soit ta stratégie est dans les nuages, soit tu cherches désespérément l'inspiration divine.", 
    type: 'joke' 
  },
  { 
    comment: "Conseil pro : si tu bois assez, tu te ficheras complètement de ton score. C'est ma technique préférée !", 
    type: 'joke' 
  },
  { 
    comment: "Si quelqu'un vous dit qu'il a une stratégie infaillible au Dutch, c'est soit un génie, soit un menteur, soit les deux.", 
    type: 'sarcasm' 
  },
  { 
    comment: "Les cartes ne sont pas contre toi, elles sont juste en faveur de quelqu'un d'autre !", 
    type: 'sarcasm' 
  },
  { 
    comment: "N'oubliez pas : la règle la plus importante du Dutch, c'est de ne pas renverser les chips et la bière sur les cartes !", 
    type: 'joke' 
  }
];

// Fonction utilitaire pour obtenir un élément aléatoire d'un tableau
const getRandomElementFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

import { Player } from '@/types';

// Type pour les commentaires
export type CommentType = 'info' | 'joke' | 'sarcasm' | 'encouragement' | 'headline';

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
  
  // 20% de chance d'avoir un titre façon presse sportive
  if (Math.random() < 0.2 && lastRoundIndex > 0) {
    return getHeadlineComment(players, roundHistory);
  }
  
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
    
    // 50% de chance de faire un commentaire sur un joueur spécifique
    if (Math.random() < 0.5) {
      if (minScoreLastRound === 0) {
        return {
          comment: `${getRandomElementFromArray([
            `${playerWithMinScore.name} Dutch comme un ninja ! 🔥 Des années de pratique ou juste un coup de bol ?`,
            `DUTCH PARFAIT pour ${playerWithMinScore.name} ! Les autres en PLS.`,
            `${playerWithMinScore.name} met la clim à tout le monde avec ce Dutch. Froid, très froid.`,
            `Quand ${playerWithMinScore.name} Dutch, le reste de la table transpire.`,
            `${playerWithMinScore.name} : profession tireur d'élite. 0 points, 100% efficacité.`
          ])}`,
          type: 'joke'
        };
      } else if (minScoreLastRound <= 3) {
        return {
          comment: `${getRandomElementFromArray([
            `${playerWithMinScore.name} régale avec ce petit ${minScoreLastRound}. C'est propre, c'est net !`,
            `${minScoreLastRound} points pour ${playerWithMinScore.name}. Joli coup, ou belle planche de bol ?`,
            `${playerWithMinScore.name} a posé un ${minScoreLastRound} tranquille. Les autres peuvent fermer la boîte à sel.`,
            `${playerWithMinScore.name} joue comme un pro sur ce tour. La différence entre talent et chance ? On s'en fiche !`
          ])}`,
          type: 'encouragement'
        };
      } else if (maxScoreLastRound >= 10) {
        return {
          comment: `${getRandomElementFromArray([
            `Aïe aïe aïe ${playerWithMaxScore.name}... ${maxScoreLastRound} points ! On peut appeler ça un moment Titanic.`,
            `${playerWithMaxScore.name} encaisse ${maxScoreLastRound} points. Y'a des soirs comme ça où il fallait rester au lit.`,
            `${maxScoreLastRound} points d'un coup pour ${playerWithMaxScore.name}. Les cartes n'aiment pas tout le monde ce soir !`,
            `Avec ${maxScoreLastRound} points, ${playerWithMaxScore.name} se rapproche dangereusement du titre de victime de la soirée.`
          ])}`,
          type: 'sarcasm'
        };
      }
    }

    // 30% de chance d'analyser une tendance sur plusieurs tours
    if (Math.random() < 0.3 && lastRoundIndex >= 2) {
      return getTrendComment(players, roundHistory);
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
          `${leader.name} domine la compétition avec ${gap} points d'avance. Le reste ? Des figurants.`,
          `${gap} points séparent ${leader.name} et ${loser.name}. À ce niveau-là, on parle plus de gouffre que d'écart.`,
          `${leader.name} écrase la partie. ${gap} points d'écart, c'est presque gênant pour les autres.`,
          `${gap} points d'écart entre le top et la cave. ${loser.name} en mode touriste dans cette partie.`
        ])}`,
        type: 'sarcasm'
      };
    } else if (gap < 5 && players[0].rounds.length > 2) {
      return {
        comment: `${getRandomElementFromArray([
          `${gap} points d'écart seulement ! La tension est palpable, comme dans un penalty à la 90ème.`,
          `Match ultra serré ! ${gap} points entre les extrêmes. Ici, chaque carte compte double.`,
          `Rien n'est joué avec ${gap} points d'écart. On est sur du combat de rue jusqu'à la dernière carte !`,
          `${leader.name} et ${loser.name} se tiennent en ${gap} points. C'est le moment où les vrais se révèlent.`
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

// Fonction pour générer un titre façon presse sportive
const getHeadlineComment = (players: Player[], roundHistory: { scores: number[], dutchPlayerId?: string }[]): Comment => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const loser = sortedPlayers[sortedPlayers.length - 1];
  
  // Trouver un joueur qui progresse bien sur les derniers tours
  let risingPlayerName = "";
  let biggestImprovement = 0;
  
  if (players.length > 0 && players[0].rounds.length >= 3) {
    for (const player of players) {
      const recentRounds = player.rounds.slice(-3);
      if (recentRounds[2].score < recentRounds[0].score && 
          recentRounds[2].score < recentRounds[1].score) {
        const improvement = recentRounds[0].score - recentRounds[2].score;
        if (improvement > biggestImprovement) {
          biggestImprovement = improvement;
          risingPlayerName = player.name;
        }
      }
    }
  }
  
  // Trouver un joueur qui a fait beaucoup de dodges
  let dutchMaster = "";
  let maxDodges = 0;
  
  for (const player of players) {
    const dodgeCount = player.rounds.filter(r => r.isDutch).length;
    if (dodgeCount > maxDodges) {
      maxDodges = dodgeCount;
      dutchMaster = player.name;
    }
  }
  
  const headlines: Comment[] = [
    { comment: `${leader.name.toUpperCase()} RÈGNE EN MAÎTRE, LES AUTRES RAMASSENT LES MIETTES`, type: 'headline' },
    { comment: `CARNAGE DE POINTS : LA PARTIE DÉRAPE COMPLÈTEMENT`, type: 'headline' },
    { comment: `${loser.name.toUpperCase()} : LA DESCENTE AUX ENFERS CONTINUE`, type: 'headline' },
    { comment: `ALERTE : HOLD-UP EN COURS À LA TABLE DE DUTCH`, type: 'headline' },
    { comment: `${dutchMaster ? dutchMaster.toUpperCase() + " : " : ""}LE ROI DU DUTCH FRAPPE ENCORE`, type: 'headline' },
    { comment: `TENSION MAXIMALE : TOUT SE JOUERA À LA DERNIÈRE CARTE`, type: 'headline' },
    { comment: `${risingPlayerName ? risingPlayerName.toUpperCase() + " : " : ""}LA REMONTADA EST EN MARCHE 🔥`, type: 'headline' },
    { comment: `LA CHUTE LIBRE CONTINUE : QUI ARRÊTERA L'HÉMORRAGIE ?`, type: 'headline' },
    { comment: `SCÉNARIO CATASTROPHE POUR ${loser.name.toUpperCase()}`, type: 'headline' },
    { comment: `ON N'A JAMAIS VU ÇA : LA PARTIE QUI DÉFIE TOUTES LES STATISTIQUES`, type: 'headline' },
  ];
  
  return getRandomElementFromArray(headlines);
};

// Fonction pour générer un commentaire sur les tendances
const getTrendComment = (players: Player[], roundHistory: { scores: number[], dutchPlayerId?: string }[]): Comment => {
  // Identifier les joueurs avec une bonne/mauvaise série
  let streakPlayer = null;
  let streakType = '';
  let streakLength = 0;
  
  for (const player of players) {
    if (player.rounds.length < 3) continue;
    
    // Regarder les 3 derniers tours
    const lastThreeRounds = player.rounds.slice(-3);
    
    // Bonne série = scores bas consécutifs
    if (lastThreeRounds.every(r => r.score <= 5)) {
      if (3 > streakLength) {
        streakPlayer = player;
        streakType = 'good';
        streakLength = 3;
      }
    }
    // Mauvaise série = scores élevés consécutifs
    else if (lastThreeRounds.every(r => r.score >= 8)) {
      if (3 > streakLength) {
        streakPlayer = player;
        streakType = 'bad';
        streakLength = 3;
      }
    }
  }
  
  if (streakPlayer) {
    if (streakType === 'good') {
      return {
        comment: `${getRandomElementFromArray([
          `${streakPlayer.name} est en feu depuis 3 tours. On parle d'une masterclass en direct.`,
          `Zone de confort activée pour ${streakPlayer.name}. 3 tours au top, les autres peuvent s'incliner.`,
          `${streakPlayer.name} a trouvé son rythme. Quand ça veut pas sourire aux autres, ça sourit à quelqu'un !`,
          `${streakPlayer.name} enchaîne les bons coups. Est-ce qu'on peut parler de skill sur un jeu de cartes ? Apparemment oui.`
        ])}`,
        type: 'encouragement'
      };
    } else {
      return {
        comment: `${getRandomElementFromArray([
          `3 tours de galère pour ${streakPlayer.name}. À ce stade, c'est plus de la malchance, c'est un style de vie.`,
          `${streakPlayer.name} continue sa collection de mauvais scores. Le karma a manifestement un compte à régler.`,
          `La spirale infernale continue pour ${streakPlayer.name}. Les cartes ne mentent pas : c'est pas son soir.`,
          `${streakPlayer.name} n'arrive pas à sortir la tête de l'eau. 3 tours catastrophiques, on attend le miracle.`
        ])}`,
        type: 'sarcasm'
      };
    }
  }
  
  // Par défaut, commentaire sur la dynamique globale
  const currentRound = players[0].rounds.length;
  
  return {
    comment: `${getRandomElementFromArray([
      `Tour ${currentRound} : la table est en feu, les scores s'envolent et les amitiés vacillent.`,
      `Après ${currentRound} manches, on commence à voir qui bluff et qui joue vraiment.`,
      `Le Dutch ne pardonne pas : ${currentRound} tours et déjà des écarts qui font mal aux stats.`,
      `${currentRound} manches et toujours autant de drama à chaque carte tirée. Le Dutch dans toute sa splendeur !`
    ])}`,
    type: 'info'
  };
};

// Commentaires pour une nouvelle partie
const newGameComments: Comment[] = [
  { comment: "C'est parti ! Que le meilleur tacticien gagne et que les autres prennent cher !", type: 'encouragement' },
  { comment: "Dutch time ! La table est prête pour du sang, de la sueur et des larmes... de rire !", type: 'encouragement' },
  { comment: "Nouvelle partie, nouvelles chances de ridiculiser tes potes. La soirée commence fort !", type: 'joke' },
  { comment: "Les cartes sont distribuées. Et rappelez-vous : ce n'est qu'un jeu... pour les perdants !", type: 'sarcasm' },
  { comment: "Messieurs-dames, attachez vos ceintures. Le vol Dutch Airlines est prêt au décollage !", type: 'joke' }
];

// Commentaires d'information sur l'état du jeu
const getInfoComment = (players: Player[], roundHistory: { scores: number[], dutchPlayerId?: string }[]): string => {
  if (players.length === 0) return "Ajoutez des joueurs pour démarrer cette masterclass de Dutch !";

  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const runnerUp = sortedPlayers.length > 1 ? sortedPlayers[1] : null;

  if (!leader.rounds || leader.rounds.length === 0) {
    return "Première manche ! Montrez-nous ce que vous avez dans le ventre. Ou dans les cartes, plutôt.";
  }

  const currentRound = players[0].rounds.length;
  
  if (runnerUp) {
    const diff = runnerUp.totalScore - leader.totalScore;
    if (diff === 0) {
      return `Égalité parfaite après ${currentRound} manches ! C'est plus serré qu'un penalty en finale de Coupe du Monde.`;
    } else if (diff <= 3) {
      return `${leader.name} devance ${runnerUp.name} de seulement ${diff} points. C'est ce qu'on appelle manger dans la même assiette !`;
    } else {
      return `${diff} points séparent ${leader.name} de la concurrence après ${currentRound} manches. La domination est en marche.`;
    }
  }

  return `${leader.name} mène la danse après ${currentRound} manches. Soit c'est un crack, soit les autres sont en mode dimanche.`;
};

// Commentaires aléatoires drôles
const randomJokeComments: Comment[] = [
  { 
    comment: "Si les cartes parlaient, elles te diraient probablement de trouver un autre hobby...", 
    type: 'joke' 
  },
  { 
    comment: "Le Dutch est comme la vie : 10% de skill, 90% de hasard et 100% de raisons de râler sur ses potes.", 
    type: 'sarcasm' 
  },
  { 
    comment: "Les meilleurs joueurs de Dutch ne gagnent pas, ils font juste perdre les autres plus vite.", 
    type: 'joke' 
  },
  { 
    comment: "Cette intensité sur chaque carte... On se croirait au Poker Stars Championship, mais avec moins d'argent et plus de vannes.", 
    type: 'joke' 
  },
  { 
    comment: "Si tu plisses les yeux en regardant tes cartes, ça ne changera pas les chiffres dessus. Crois-moi, j'ai testé.", 
    type: 'joke' 
  },
  { 
    comment: "Savais-tu que le Dutch a été inventé par un type qui voulait juste créer du drama entre amis ? Mission accomplie.", 
    type: 'sarcasm' 
  },
  { 
    comment: "Les vrais savent : c'est pas la carte qui compte, c'est comment tu fais croire aux autres que c'est une bonne carte.", 
    type: 'joke' 
  },
  { 
    comment: "La tension est palpable. On pourrait la couper au couteau. Ou avec une carte de Dutch, au choix.", 
    type: 'sarcasm' 
  },
  { 
    comment: "Ce moment de silence quand quelqu'un tire une carte... C'est beau comme un but à la 90ème.", 
    type: 'joke' 
  },
  { 
    comment: "Rappel du jour : gagner au Dutch ne vous donne aucun droit de supériorité. Sauf si vous battez le champion en titre, là c'est permis.", 
    type: 'joke' 
  }
];

// Fonction utilitaire pour obtenir un élément aléatoire d'un tableau
const getRandomElementFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

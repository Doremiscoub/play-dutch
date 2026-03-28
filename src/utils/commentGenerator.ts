
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
  
  // 25% de chance d'avoir un titre façon presse sportive
  if (Math.random() < 0.25 && lastRoundIndex > 0) {
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
    
    // 60% de chance de faire un commentaire sur un joueur spécifique
    if (Math.random() < 0.6) {
      if (minScoreLastRound === 0) {
        return {
          comment: `${getRandomElementFromArray([
            `${playerWithMinScore.name} nous sort un Dutch de maître ! 🎯 L'art de la précision à l'état pur !`,
            `DUTCH MAGISTRAL ! ${playerWithMinScore.name} vient de donner une leçon de stratégie à toute la table !`,
            `${playerWithMinScore.name} transforme l'eau en vin... ou plutôt les cartes en 0 point ! Pure magie ! ✨`,
            `Quand ${playerWithMinScore.name} joue, les statistiques tremblent ! Dutch parfait, respect absolu !`,
            `${playerWithMinScore.name} : "Comment faire un Dutch ?" - Regardez et apprenez, mesdames et messieurs !`,
            `Le Dutch de ${playerWithMinScore.name} restera dans les annales ! C'est du grand art, mes amis !`,
            `${playerWithMinScore.name} vient de rappeler à tout le monde pourquoi ce jeu s'appelle Dutch ! Bravo !`,
            `Silence dans la salle... ${playerWithMinScore.name} vient de réaliser l'impossible ! Dutch légendaire !`
          ])}`,
          type: 'encouragement'
        };
      } else if (minScoreLastRound <= 3) {
        return {
          comment: `${getRandomElementFromArray([
            `${playerWithMinScore.name} dépose tranquillement ses ${minScoreLastRound} points. L'élégance dans la simplicité !`,
            `${minScoreLastRound} points pour ${playerWithMinScore.name} ! Entre talent et stratégie, le débat reste ouvert...`,
            `${playerWithMinScore.name} maîtrise son art : ${minScoreLastRound} points avec une facilité déconcertante !`,
            `Regardez ${playerWithMinScore.name} jouer... ${minScoreLastRound} points comme si c'était évident ! Du grand spectacle !`,
            `${playerWithMinScore.name} et ses ${minScoreLastRound} points : quand la technique rencontre l'intuition !`,
            `${minScoreLastRound} points signés ${playerWithMinScore.name} ! C'est ce qu'on appelle avoir la main heureuse !`,
            `${playerWithMinScore.name} continue sa démonstration : ${minScoreLastRound} points d'une précision chirurgicale !`
          ])}`,
          type: 'encouragement'
        };
      } else if (maxScoreLastRound >= 12) {
        return {
          comment: `${getRandomElementFromArray([
            `${playerWithMaxScore.name} encaisse ${maxScoreLastRound} points... Il y a des soirs où les étoiles ne sont pas alignées !`,
            `${maxScoreLastRound} points d'un coup pour ${playerWithMaxScore.name} ! C'est ce qu'on appelle un moment de solitude cosmique !`,
            `${playerWithMaxScore.name} et ses ${maxScoreLastRound} points... Parfois, les cartes ont leur propre agenda !`,
            `${maxScoreLastRound} points ! ${playerWithMaxScore.name} vient de découvrir que la chance est une dame capricieuse !`,
            `${playerWithMaxScore.name} collectionne ${maxScoreLastRound} points... C'est le moment de changer de stratégie, mon ami !`,
            `${maxScoreLastRound} points pour ${playerWithMaxScore.name} ! Les mathématiques peuvent être cruelles parfois !`,
            `${playerWithMaxScore.name} et ce ${maxScoreLastRound}... On dirait que les cartes ont décidé de faire une blague !`
          ])}`,
          type: 'sarcasm'
        };
      } else if (maxScoreLastRound >= 8) {
        return {
          comment: `${getRandomElementFromArray([
            `${playerWithMaxScore.name} récolte ${maxScoreLastRound} points... C'est le prix à payer pour jouer avec passion !`,
            `${maxScoreLastRound} points pour ${playerWithMaxScore.name} ! Rien n'est jamais acquis dans ce noble jeu !`,
            `${playerWithMaxScore.name} découvre les joies du ${maxScoreLastRound}... L'apprentissage continue !`,
            `${maxScoreLastRound} points ! ${playerWithMaxScore.name} nous rappelle que le Dutch est imprévisible !`
          ])}`,
          type: 'info'
        };
      }
    }

    // 35% de chance d'analyser une tendance sur plusieurs tours
    if (Math.random() < 0.35 && lastRoundIndex >= 2) {
      return getTrendComment(players, roundHistory);
    }
  }

  // 30% de chance d'avoir un commentaire sur le classement général
  if (Math.random() < 0.3) {
    return getLeaderboardComment(players);
  }

  // 20% de chance d'avoir un commentaire philosophique sur le jeu
  if (Math.random() < 0.2) {
    return getRandomElementFromArray(philosophicalComments);
  }

  // Par défaut, donner un commentaire informatif sur l'état du jeu
  return {
    comment: getInfoComment(players, roundHistory),
    type: 'info'
  };
};

// Fonction pour générer un commentaire sur le classement
const getLeaderboardComment = (players: Player[]): Comment => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const loser = sortedPlayers[sortedPlayers.length - 1];
  
  const gap = loser.totalScore - leader.totalScore;
  
  if (gap > 40) {
    return {
      comment: `${getRandomElementFromArray([
        `${leader.name} règne en maître avec ${gap} points d'avance ! Les autres jouent-ils vraiment le même jeu ?`,
        `${gap} points d'écart ! ${leader.name} a transformé cette partie en exhibition personnelle !`,
        `${leader.name} domine avec ${gap} points d'avance... C'est presque gênant pour la concurrence !`,
        `${gap} points ! ${leader.name} joue aux échecs pendant que les autres jouent aux dames !`,
        `Avec ${gap} points d'avance, ${leader.name} pourrait presque jouer les yeux fermés !`
      ])}`,
      type: 'headline'
    };
  } else if (gap > 20) {
    return {
      comment: `${getRandomElementFromArray([
        `${leader.name} creuse l'écart : ${gap} points d'avance ! La machine est lancée !`,
        `${gap} points séparent ${leader.name} du peloton ! Qui va réagir ?`,
        `${leader.name} prend ses distances : ${gap} points d'avance ! C'est le moment de contre-attaquer !`,
        `${gap} points d'écart ! ${leader.name} impose son rythme à cette partie !`
      ])}`,
      type: 'info'
    };
  } else if (gap < 8 && players[0].rounds.length > 3) {
    return {
      comment: `${getRandomElementFromArray([
        `${gap} points d'écart seulement ! Cette partie est plus serrée qu'un penalty en finale !`,
        `Combat de titans ! ${gap} points entre les extrêmes, chaque carte compte !`,
        `${gap} points d'écart... C'est là que les champions se révèlent !`,
        `Suspense total ! ${gap} points séparent ${leader.name} et ${loser.name} !`,
        `${gap} points d'écart ! On est sur du spectacle de haute voltige !`
      ])}`,
      type: 'encouragement'
    };
  }

  return {
    comment: `${leader.name} mène avec ${leader.totalScore} points ! La bataille continue !`,
    type: 'info'
  };
};

// Fonction pour générer un titre façon presse sportive
const getHeadlineComment = (players: Player[], _roundHistory: { scores: number[], dutchPlayerId?: string }[]): Comment => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const loser = sortedPlayers[sortedPlayers.length - 1];
  
  // Analyser les performances récentes
  let risingPlayer = "";
  let fallingPlayer = "";
  
  if (players.length > 0 && players[0].rounds.length >= 3) {
    let bestImprovement = -Infinity;
    let worstDegradation = Infinity;
    
    for (const player of players) {
      const recentRounds = player.rounds.slice(-3);
      const avgRecent = recentRounds.reduce((sum, r) => sum + r.score, 0) / 3;
      const olderRounds = player.rounds.slice(-6, -3);
      
      if (olderRounds.length > 0) {
        const avgOlder = olderRounds.reduce((sum, r) => sum + r.score, 0) / olderRounds.length;
        const improvement = avgOlder - avgRecent;
        
        if (improvement > bestImprovement) {
          bestImprovement = improvement;
          risingPlayer = player.name;
        }
        if (improvement < worstDegradation) {
          worstDegradation = improvement;
          fallingPlayer = player.name;
        }
      }
    }
  }
  
  const headlines: Comment[] = [
    { comment: `🏆 ${leader.name.toUpperCase()} ÉCRASE LA CONCURRENCE ! DOMINATION TOTALE !`, type: 'headline' },
    { comment: `⚡ PARTIE EXPLOSIVE ! LES SCORES S'ENVOLENT À CHAQUE TOUR !`, type: 'headline' },
    { comment: `📉 ${loser.name.toUpperCase()} EN CHUTE LIBRE ! REMONTADA POSSIBLE ?`, type: 'headline' },
    { comment: `🎯 TENSIONS MAXIMALES ! LA PARTIE QUI REND FOU !`, type: 'headline' },
    { comment: `🔥 DUTCH MANIA ! QUAND LA STRATÉGIE DEVIENT ART !`, type: 'headline' },
    { comment: `⚔️ GUERRE DÉCLARÉE ! QUI SURVIVRA À CE MASSACRE ?`, type: 'headline' },
    { comment: `🌟 PERFORMANCES LÉGENDAIRES ! ON N'A JAMAIS VU ÇA !`, type: 'headline' },
    { comment: `🎪 SPECTACLE GRANDIOSE ! CHAQUE CARTE EST UN ÉVÉNEMENT !`, type: 'headline' },
    { comment: `💥 REBONDISSEMENTS EN SÉRIE ! PERSONNE N'Y COMPREND PLUS RIEN !`, type: 'headline' },
    { comment: `🎲 LE HASARD FAIT DES SIENNES ! CHAOS ABSOLU SUR LA TABLE !`, type: 'headline' }
  ];
  
  if (risingPlayer) {
    headlines.push({ comment: `🚀 ${risingPlayer.toUpperCase()} EN PLEINE ASCENSION ! LA REMONTADA EST EN MARCHE !`, type: 'headline' });
  }
  if (fallingPlayer) {
    headlines.push({ comment: `⛔ ${fallingPlayer.toUpperCase()} DANS LA TOURMENTE ! CHUTE SPECTACULAIRE !`, type: 'headline' });
  }
  
  return getRandomElementFromArray(headlines);
};

// Fonction pour générer un commentaire sur les tendances
const getTrendComment = (players: Player[], _roundHistory: { scores: number[], dutchPlayerId?: string }[]): Comment => {
  // Analyser les tendances plus finement
  for (const player of players) {
    if (player.rounds.length < 3) continue;
    
    const lastFourRounds = player.rounds.slice(-4);
    const lastThreeRounds = player.rounds.slice(-3);
    
    // Série de Dutch
    const dutchCount = lastThreeRounds.filter(r => r.isDutch).length;
    if (dutchCount >= 2) {
      return {
        comment: `${getRandomElementFromArray([
          `${player.name} enchaîne les Dutch ! ${dutchCount} sur les 3 derniers tours ! C'est de la pure maîtrise !`,
          `${dutchCount} Dutch en 3 tours pour ${player.name} ! Quelqu'un a trouvé la formule magique !`,
          `${player.name} fait du Dutch son art de vivre ! ${dutchCount} réussites récentes ! Chapeau l'artiste !`,
          `${dutchCount} Dutch consécutifs pour ${player.name} ! C'est plus qu'un joueur, c'est un phénomène !`
        ])}`,
        type: 'encouragement'
      };
    }
    
    // Série de bons scores
    if (lastThreeRounds.every(r => r.score <= 4)) {
      return {
        comment: `${getRandomElementFromArray([
          `${player.name} est dans sa zone ! 3 tours consécutifs sous les 4 points ! C'est de la régularité de champion !`,
          `${player.name} nous régale ! 3 tours d'affilée en beauté ! Quand le talent rencontre la constance !`,
          `${player.name} enchaîne les perles ! 3 tours magnifiques ! C'est ce qu'on appelle être dans le flow !`,
          `${player.name} donne une masterclass ! 3 tours parfaits ! Les autres prennent des notes j'espère !`
        ])}`,
        type: 'encouragement'
      };
    }
    
    // Série de mauvais scores
    if (lastThreeRounds.every(r => r.score >= 9)) {
      return {
        comment: `${getRandomElementFromArray([
          `${player.name} traverse une zone de turbulences ! 3 tours difficiles... Courage, ça va passer !`,
          `${player.name} connaît un passage à vide ! 3 tours compliqués, mais les grands joueurs reviennent toujours !`,
          `${player.name} dans l'œil du cyclone ! 3 tours mouvementés... C'est le moment de la remontada !`,
          `${player.name} vit des moments compliqués ! 3 tours épiques... Mais n'oublions pas : après la pluie, le beau temps !`
        ])}`,
        type: 'sarcasm'
      };
    }
    
    // Amélioration spectaculaire
    if (lastFourRounds.length === 4) {
      const firstTwo = lastFourRounds.slice(0, 2);
      const lastTwo = lastFourRounds.slice(-2);
      const avgFirst = firstTwo.reduce((sum, r) => sum + r.score, 0) / 2;
      const avgLast = lastTwo.reduce((sum, r) => sum + r.score, 0) / 2;
      
      if (avgFirst - avgLast > 6) {
        return {
          comment: `${getRandomElementFromArray([
            `${player.name} revient de loin ! Quelle remontée spectaculaire ! C'est ça, l'esprit du Dutch !`,
            `${player.name} nous sort une remontada digne des plus grands ! Admirable retour !`,
            `${player.name} prouve que rien n'est jamais joué ! Quelle leçon de persévérance !`,
            `${player.name} fait mentir les statistiques ! Remontée phénoménale ! Respect !`
          ])}`,
          type: 'encouragement'
        };
      }
    }
  }
  
  // Commentaire général sur la dynamique
  const currentRound = players[0].rounds.length;
  
  return {
    comment: `${getRandomElementFromArray([
      `Tour ${currentRound} : les personnalités se révèlent ! Qui assumera son style de jeu ?`,
      `${currentRound} manches et toujours autant de surprises ! Le Dutch ne pardonne rien !`,
      `Après ${currentRound} tours, les vraies valeurs émergent ! Qui tiendra la distance ?`,
      `${currentRound} manches : le spectacle continue ! Chaque carte écrit l'histoire !`,
      `Tour ${currentRound} : la psychologie prend le dessus ! Qui gardera ses nerfs ?`
    ])}`,
    type: 'info'
  };
};

// Commentaires philosophiques sur le jeu
const philosophicalComments: Comment[] = [
  { 
    comment: "Le Dutch, c'est comme la vie : 10% de chance, 90% de mental, et 100% de raisons de philosopher avec ses amis !", 
    type: 'joke' 
  },
  { 
    comment: "Dans le Dutch, ce n'est pas la carte qui fait le joueur, mais l'audace de celui qui la joue !", 
    type: 'encouragement' 
  },
  { 
    comment: "Le vrai Dutch ne se joue pas avec les cartes, mais avec les nerfs ! Et là, mes amis, c'est du grand art !", 
    type: 'sarcasm' 
  },
  { 
    comment: "Chaque manche de Dutch est une leçon de vie : parfois on gagne, parfois on apprend, mais on s'amuse toujours !", 
    type: 'encouragement' 
  },
  { 
    comment: "Le Dutch révèle la vraie nature des gens : certains bluffent, d'autres calculent, mais tous vibrent !", 
    type: 'info' 
  },
  { 
    comment: "Dans cette noble discipline qu'est le Dutch, la tension est notre oxygène et l'amitié notre récompense !", 
    type: 'joke' 
  },
  { 
    comment: "Le Dutch : où chaque décision compte, chaque carte surprend, et chaque ami devient un adversaire... temporairement !", 
    type: 'sarcasm' 
  },
  { 
    comment: "Mes chers joueurs, rappelez-vous : dans le Dutch, la seule certitude c'est l'incertitude ! Et c'est magnifique !", 
    type: 'encouragement' 
  }
];

// Commentaires pour une nouvelle partie
const newGameComments: Comment[] = [
  { comment: "Mesdames et messieurs, installez-vous confortablement ! Le spectacle va commencer et je promets du grand art !", type: 'encouragement' },
  { comment: "Nouvelle partie, nouveaux défis ! Qui saura allier stratégie et intuition ? Les paris sont ouverts !", type: 'encouragement' },
  { comment: "Ah, l'odeur des cartes fraîches et des amitiés sur le point d'être testées ! Bienvenue dans l'arène du Dutch !", type: 'joke' },
  { comment: "Chers joueurs, préparez-vous à découvrir vos véritables talents... ou leurs mystérieuses absences !", type: 'sarcasm' },
  { comment: "Les cartes sont distribuées, les esprits s'échauffent ! Que la meilleure stratégie triomphe !", type: 'encouragement' },
  { comment: "Bienvenue dans cette nouvelle aventure ludique ! Ici, chaque carte raconte une histoire !", type: 'info' },
  { comment: "Nouvelle partie, nouvelles opportunités de briller ! Ou de sombrer dans la médiocrité, mais restons positifs !", type: 'joke' }
];

// Commentaires d'information sur l'état du jeu
const getInfoComment = (players: Player[], _roundHistory: { scores: number[], dutchPlayerId?: string }[]): string => {
  if (players.length === 0) return "Préparez-vous pour une aventure mémorable ! Le Dutch n'attend que vous !";

  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const runnerUp = sortedPlayers.length > 1 ? sortedPlayers[1] : null;

  if (!leader.rounds || leader.rounds.length === 0) {
    return "Première manche ! Montrez-nous de quoi vous êtes capables ! Le talent se révèle dans l'action !";
  }

  const currentRound = players[0].rounds.length;
  
  if (runnerUp) {
    const diff = runnerUp.totalScore - leader.totalScore;
    if (diff === 0) {
      return `Égalité parfaite après ${currentRound} manches ! Voilà ce qu'on appelle un match équilibré ! Qui va faire la différence ?`;
    } else if (diff <= 5) {
      return `${leader.name} devance ${runnerUp.name} de ${diff} points seulement ! C'est du suspense de haute qualité !`;
    } else if (diff <= 12) {
      return `${diff} points d'écart après ${currentRound} manches ! ${leader.name} prend ses marques, mais rien n'est joué !`;
    } else {
      return `${diff} points séparent ${leader.name} de la concurrence ! Domination en cours, mais le Dutch réserve toujours des surprises !`;
    }
  }

  return `${leader.name} mène la danse après ${currentRound} manches ! Beau démarrage, mais la route est encore longue !`;
};

// Commentaires aléatoires drôles enrichis
const _randomJokeComments: Comment[] = [
  { 
    comment: "Si les cartes parlaient, elles vous diraient probablement de réviser vos stratégies... Mais bon, qui écoute les cartes ?", 
    type: 'joke' 
  },
  { 
    comment: "Le Dutch, c'est comme la météo : imprévisible, parfois orageux, mais toujours fascinant à observer !", 
    type: 'sarcasm' 
  },
  { 
    comment: "Les vrais champions du Dutch ne gagnent pas, ils font perdre les autres avec style et élégance !", 
    type: 'joke' 
  },
  { 
    comment: "Cette intensité sur chaque carte... Si l'émotion était un sport olympique, vous seriez tous médaillés !", 
    type: 'encouragement' 
  },
  { 
    comment: "Regarder vos visages quand vous tirez une carte... C'est tout un poème ! De l'extase à la tragédie en 0,5 seconde !", 
    type: 'joke' 
  },
  { 
    comment: "Le Dutch : inventé par quelqu'un qui voulait tester la solidité des amitiés. Mission accomplie, dirais-je !", 
    type: 'sarcasm' 
  },
  { 
    comment: "Mes chers joueurs, vous transformez chaque manche en épopée ! C'est beau comme un lever de soleil !", 
    type: 'encouragement' 
  },
  { 
    comment: "Cette tension palpable... On pourrait la couper au couteau ! Ou avec une carte de Dutch, c'est plus dans le thème !", 
    type: 'joke' 
  }
];

// Fonction utilitaire pour obtenir un élément aléatoire d'un tableau
const getRandomElementFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

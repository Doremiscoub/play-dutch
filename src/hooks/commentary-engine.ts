/**
 * Moteur de commentaires sportifs pour Professor Cartouche
 * Style: Speaker radio + gros titres sportifs
 * Contraintes: ≤ 120 caractères, < 500ms génération
 */

import { Player } from '@/types';

interface CommentaryContext {
  players: Player[];
  roundCount: number;
  gamePhase: 'early' | 'mid' | 'endgame';
  rankChanges: RankChange[];
  trends: PlayerTrend[];
  timeSinceLastRound?: number;
}

interface RankChange {
  playerName: string;
  previousRank: number;
  currentRank: number;
  change: 'up' | 'down' | 'same';
}

interface PlayerTrend {
  playerName: string;
  lastRoundScore: number;
  scoreDelta: number;
  isOnFire: boolean;
  isStruggling: boolean;
}

interface CommentaryOutput {
  text: string;
  type: 'post_round' | 'between_rounds';
  priority: 'high' | 'medium' | 'low';
}

class CommentaryEngine {
  private lastRoundData: { [playerName: string]: number } = {};
  private previousRanks: { [playerName: string]: number } = {};

  /**
   * Génère un commentaire après une manche
   */
  generatePostRoundComment(context: CommentaryContext): CommentaryOutput {
    const startTime = performance.now();
    
    const { players, roundCount } = context;
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    
    // Calcul des changements de rang
    const rankChanges = this.calculateRankChanges(sortedPlayers);
    
    // Détection d'événements marquants
    const bigMover = rankChanges.find(r => Math.abs(r.currentRank - r.previousRank) >= 2);
    const leader = sortedPlayers[0];
    const trailing = sortedPlayers[sortedPlayers.length - 1];
    const gap = trailing.totalScore - leader.totalScore;

    let comment = '';
    let priority: 'high' | 'medium' | 'low' = 'medium';

    // Gros mouvement de classement
    if (bigMover) {
      if (bigMover.change === 'up') {
        comment = this.getRandomFromArray([
          `🔥 ${bigMover.playerName} remonte comme une fusée ! Quel comeback !`,
          `⚡ ${bigMover.playerName} fait du spectacle ! +${bigMover.previousRank - bigMover.currentRank} places !`,
          `🚀 ${bigMover.playerName} en mode turbo ! Le classement tremble !`
        ]);
      } else {
        comment = this.getRandomFromArray([
          `🥶 ${bigMover.playerName} chute libre ! Qui l'aurait cru ?`,
          `💔 ${bigMover.playerName} perd le contrôle ! Drama total !`,
          `😱 ${bigMover.playerName} s'effondre ! Plot twist !`
        ]);
      }
      priority = 'high';
    }
    // Écart important
    else if (gap > 25) {
      comment = this.getRandomFromArray([
        `👑 ${leader.name} creuse l'écart ! ${gap} points d'avance !`,
        `🏆 ${leader.name} fait le show ! Les autres à la traîne !`,
        `⚡ ${leader.name} survole la partie ! Quelle démonstration !`
      ]);
      priority = 'high';
    }
    // Course serrée
    else if (gap < 8) {
      comment = this.getRandomFromArray([
        `🔥 C'est serré ! ${gap} pts séparent ${leader.name} et ${trailing.name} !`,
        `⚡ Suspense total ! Qui va craquer ?`,
        `🎯 Match de folie ! ${leader.name} tient bon !`
      ]);
      priority = 'high';
    }
    // Commentaire générique
    else {
      comment = this.getRandomFromArray([
        `🎲 Manche ${roundCount} ! ${leader.name} mène la danse !`,
        `⚡ ${leader.name} garde le contrôle ! Qui va réagir ?`,
        `🏁 Après ${roundCount} manches, ${leader.name} en tête !`
      ]);
    }

    // Mise à jour des données pour le prochain tour
    this.updateGameState(sortedPlayers);

    const generationTime = performance.now() - startTime;
    console.log(`Commentary generated in ${generationTime.toFixed(2)}ms`);

    return {
      text: comment.substring(0, 120), // Contrainte 120 caractères
      type: 'post_round',
      priority
    };
  }

  /**
   * Génère des punchlines entre les manches
   */
  generateBetweenRoundsComment(context: CommentaryContext): CommentaryOutput {
    const startTime = performance.now();
    
    const commentTypes = ['rule_reminder', 'fun_fact', 'player_tease', 'motivation'];
    const type = this.getRandomFromArray(commentTypes);
    const { players } = context;
    const randomPlayer = this.getRandomFromArray(players);

    let comment = '';

    switch (type) {
      case 'rule_reminder':
        comment = this.getRandomFromArray([
          '📚 Rappel : Roi noir = +15 ! Évitez-le comme la peste !',
          '🃏 Joker = -3 pts ! Votre meilleur ami dans ce chaos !',
          '👑 As = -1 pt ! Petit mais costaud !',
          '🔄 Valet = échange ! Redistribuez les cartes !'
        ]);
        break;
      
      case 'fun_fact':
        comment = this.getRandomFromArray([
          '☀️ Météo du vestiaire : tension à 100% !',
          '📊 Fun fact : 73% des remontadas arrivent maintenant !',
          '🎬 Plot twist incoming ? Le suspense monte !',
          '⏰ Temps d\'arrêt ! Qui va exploser le compteur ?'
        ]);
        break;
      
      case 'player_tease':
        comment = this.getRandomFromArray([
          `🎯 ${randomPlayer.name}, on attend du spectacle !`,
          `⚡ ${randomPlayer.name}, c'est votre moment de briller !`,
          `🔥 ${randomPlayer.name}, montrez-nous vos talents !`,
          `💪 ${randomPlayer.name}, l'heure de la revanche ?`
        ]);
        break;
      
      case 'motivation':
        comment = this.getRandomFromArray([
          '🚀 Prochaine manche = nouvelle chance ! Go go go !',
          '⚡ L\'écart se creuse ? Pas de panique, comeback time !',
          '🎲 Les dés sont lancés ! Qui va surprendre ?',
          '🏁 Final approach ! Donnez tout ce que vous avez !'
        ]);
        break;
    }

    const generationTime = performance.now() - startTime;
    console.log(`Between-rounds commentary generated in ${generationTime.toFixed(2)}ms`);

    return {
      text: comment.substring(0, 120),
      type: 'between_rounds',
      priority: 'low'
    };
  }

  private calculateRankChanges(sortedPlayers: Player[]): RankChange[] {
    return sortedPlayers.map((player, index) => {
      const currentRank = index + 1;
      const previousRank = this.previousRanks[player.name] || currentRank;
      
      let change: 'up' | 'down' | 'same' = 'same';
      if (currentRank < previousRank) change = 'up';
      else if (currentRank > previousRank) change = 'down';

      return {
        playerName: player.name,
        previousRank,
        currentRank,
        change
      };
    });
  }

  private updateGameState(sortedPlayers: Player[]) {
    // Mise à jour des rangs
    sortedPlayers.forEach((player, index) => {
      this.previousRanks[player.name] = index + 1;
    });

    // Mise à jour des scores de la dernière manche
    sortedPlayers.forEach(player => {
      this.lastRoundData[player.name] = player.totalScore;
    });
  }

  private getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Reset pour une nouvelle partie
   */
  resetGameState() {
    this.lastRoundData = {};
    this.previousRanks = {};
  }
}

// Instance singleton
export const commentaryEngine = new CommentaryEngine();

/**
 * Hook React pour utiliser le moteur de commentaires
 */
export const useCommentaryEngine = () => {
  const generatePostRoundComment = (players: Player[], roundCount: number) => {
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const gameProgress = leader ? leader.totalScore / 100 : 0; // Assuming 100 as score limit
    
    let gamePhase: 'early' | 'mid' | 'endgame' = 'early';
    if (gameProgress > 0.7) gamePhase = 'endgame';
    else if (gameProgress > 0.3) gamePhase = 'mid';

    const context: CommentaryContext = {
      players,
      roundCount,
      gamePhase,
      rankChanges: [],
      trends: []
    };

    return commentaryEngine.generatePostRoundComment(context);
  };

  const generateBetweenRoundsComment = (players: Player[], roundCount: number) => {
    const context: CommentaryContext = {
      players,
      roundCount,
      gamePhase: 'mid',
      rankChanges: [],
      trends: []
    };

    return commentaryEngine.generateBetweenRoundsComment(context);
  };

  const resetEngine = () => {
    commentaryEngine.resetGameState();
  };

  return {
    generatePostRoundComment,
    generateBetweenRoundsComment,
    resetEngine
  };
};
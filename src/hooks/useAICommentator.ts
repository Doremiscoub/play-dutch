
import { useState, useEffect, useCallback } from 'react';
import { Player } from '@/types';
import { AICommentContext, AICommentType, AIPersonality } from '@/types/ai-commentator';

export const useAICommentator = () => {
  const [personality, setPersonality] = useState<AIPersonality>('humorous');
  const [commentHistory, setCommentHistory] = useState<string[]>([]);

  // Analyser le contexte du jeu pour générer des commentaires intelligents
  const analyzeGameContext = useCallback((
    players: Player[], 
    roundCount: number, 
    scoreLimit: number
  ): AICommentContext => {
    if (!players || players.length === 0) {
      return { type: 'game_start', intensity: 'low', focus: null };
    }

    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const lastPlace = sortedPlayers[sortedPlayers.length - 1];
    const gap = lastPlace.totalScore - leader.totalScore;
    
    // Détection de la phase de jeu
    const gameProgress = leader.totalScore / scoreLimit;
    const isEarlyGame = gameProgress < 0.3;
    const isMidGame = gameProgress >= 0.3 && gameProgress < 0.7;
    const isEndGame = gameProgress >= 0.7;

    // Analyse des performances récentes
    const lastRoundScores = players.map(p => p.rounds[p.rounds.length - 1]?.score || 0);
    const hasRecentDutch = players.some(p => p.rounds[p.rounds.length - 1]?.isDutch);
    const averageLastRound = lastRoundScores.reduce((a, b) => a + b, 0) / lastRoundScores.length;

    // Détection d'événements spéciaux
    let contextType: AICommentType = 'general';
    let intensity: 'low' | 'medium' | 'high' = 'medium';
    let focus: string | null = null;

    if (hasRecentDutch) {
      contextType = 'dutch_celebration';
      intensity = 'high';
      focus = players.find(p => p.rounds[p.rounds.length - 1]?.isDutch)?.name || null;
    } else if (gap > 30 && isMidGame) {
      contextType = 'gap_analysis';
      intensity = 'high';
      focus = leader.name;
    } else if (gap < 5 && isEndGame) {
      contextType = 'tension_build';
      intensity = 'high';
    } else if (averageLastRound > 8) {
      contextType = 'poor_performance';
      intensity = 'medium';
    } else if (isEndGame) {
      contextType = 'endgame_pressure';
      intensity = 'high';
    } else if (isEarlyGame) {
      contextType = 'early_game';
      intensity = 'low';
    }

    return {
      type: contextType,
      intensity,
      focus,
      gamePhase: isEarlyGame ? 'early' : isMidGame ? 'mid' : 'end',
      leadingPlayer: leader.name,
      strugglingPlayer: lastPlace.name,
      gap,
      averageScore: averageLastRound,
      hasRecentDutch,
      roundCount
    };
  }, []);

  // Générer des conseils stratégiques personnalisés
  const generateStrategicAdvice = useCallback((player: Player, context: AICommentContext): string => {
    const playerStats = player.stats;
    if (!playerStats) return '';

    const adviceTemplates = {
      high_variance: [
        `${player.name}, votre jeu manque de consistance. Essayez de jouer plus prudemment.`,
        `La régularité sera votre meilleure alliée, ${player.name}. Évitez les gros risques.`,
        `${player.name}, misez sur la sécurité plutôt que sur les coups d'éclat.`
      ],
      low_performance: [
        `${player.name}, il est temps de changer de stratégie. Osez prendre plus de risques !`,
        `Votre jeu est trop défensif, ${player.name}. Un peu d'audace ne ferait pas de mal.`,
        `${player.name}, sortez de votre zone de confort pour remonter au classement.`
      ],
      good_streak: [
        `Excellent momentum, ${player.name} ! Maintenez cette dynamique.`,
        `${player.name} est en feu ! Continuez sur cette lancée.`,
        `Voilà l'état d'esprit qu'il faut, ${player.name} ! Persévérez.`
      ],
      endgame_leader: [
        `${player.name}, vous tenez le bon bout ! Restez concentré jusqu'au bout.`,
        `Plus que quelques points et c'est gagné, ${player.name} ! Gardez votre sang-froid.`,
        `${player.name}, la victoire est à portée de main. Ne relâchez pas la pression.`
      ],
      comeback_potential: [
        `${player.name}, tout n'est pas perdu ! Un bon Dutch peut tout changer.`,
        `L'écart se resserre, ${player.name}. C'est le moment de frapper fort !`,
        `${player.name}, votre expérience peut faire la différence. Montrez-leur !`
      ]
    };

    // Logique de sélection des conseils
    if (context.type === 'endgame_pressure' && context.leadingPlayer === player.name) {
      return getRandomFromArray(adviceTemplates.endgame_leader);
    } else if (playerStats.consistencyScore > 8) {
      return getRandomFromArray(adviceTemplates.high_variance);
    } else if (playerStats.averageScore > 12) {
      return getRandomFromArray(adviceTemplates.low_performance);
    } else if (playerStats.improvementRate < -2) {
      return getRandomFromArray(adviceTemplates.good_streak);
    } else if (context.gap && context.gap > 15 && context.strugglingPlayer === player.name) {
      return getRandomFromArray(adviceTemplates.comeback_potential);
    }

    return '';
  }, []);

  // Générer des commentaires intelligents basés sur le contexte
  const generateIntelligentComment = useCallback((
    players: Player[], 
    roundCount: number, 
    scoreLimit: number
  ): { comment: string; type: AICommentType; advice?: string } => {
    const context = analyzeGameContext(players, roundCount, scoreLimit);
    
    const commentTemplates = {
      dutch_celebration: [
        `DUTCH ! ${context.focus} vient de nous sortir un coup de maître ! 🎯`,
        `Magnifique ${context.focus} ! Voilà comment on fait un Dutch de pro ! ⭐`,
        `${context.focus} nous régale avec ce Dutch parfait ! La classe ! 🔥`
      ],
      gap_analysis: [
        `${context.leadingPlayer} prend le large avec ${context.gap} points d'avance ! Domination totale ! 👑`,
        `Écart de ${context.gap} points ! ${context.leadingPlayer} est en train d'écraser la concurrence ! 📈`,
        `${context.gap} points d'écart... ${context.leadingPlayer} joue dans une autre dimension ! 🚀`
      ],
      tension_build: [
        `Seulement ${context.gap} points d'écart ! La tension est à son maximum ! ⚡`,
        `C'est plus serré qu'un penalty en finale ! ${context.gap} points séparent les extrêmes ! 🔥`,
        `${context.gap} points d'écart... Tout peut basculer d'une seconde à l'autre ! 💥`
      ],
      poor_performance: [
        `Aïe aïe aïe... Moyenne de ${context.averageScore?.toFixed(1)} au dernier tour ! Ça pique ! 😬`,
        `Les cartes ne sont pas tendres ce soir ! ${context.averageScore?.toFixed(1)} de moyenne... Courage ! 💪`,
        `${context.averageScore?.toFixed(1)} points en moyenne... Il va falloir se ressaisir ! 🎯`
      ],
      endgame_pressure: [
        `La pression monte ! ${context.leadingPlayer} approche dangereusement des ${scoreLimit} points ! 🎯`,
        `Plus que ${(scoreLimit - (players.find(p => p.name === context.leadingPlayer)?.totalScore || 0))} points et c'est fini ! Qui va craquer ? 🔥`,
        `Final rush ! ${context.leadingPlayer} sent la victoire... mais rien n'est joué ! ⚡`
      ],
      early_game: [
        `Échauffement terminé ! ${roundCount} manche${roundCount > 1 ? 's' : ''} et les positions se dessinent ! 🎮`,
        `Les premières cartes sont posées ! ${context.leadingPlayer} prend les devants ! 🚀`,
        `Début de partie prometteur ! Qui va tenir la distance ? 🏁`
      ],
      general: [
        `Manche ${roundCount} ! L'intensité monte d'un cran ! 🎯`,
        `${context.leadingPlayer} mène la danse ! Mais la roue tourne toujours... 🎪`,
        `Le spectacle continue ! Encore du drama à chaque carte ! 🎭`
      ]
    };

    const templates = commentTemplates[context.type] || commentTemplates.general;
    const comment: string = getRandomFromArray(templates);
    
    // Éviter les répétitions
    const availableComments = templates.filter(t => !commentHistory.includes(t));
    const finalComment: string = availableComments.length > 0 ? 
      getRandomFromArray(availableComments) : comment;

    // Générer un conseil stratégique si approprié
    let advice = '';
    if (context.intensity === 'high' && Math.random() < 0.3) {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      advice = generateStrategicAdvice(randomPlayer, context);
    }

    // Mettre à jour l'historique
    setCommentHistory(prev => [...prev.slice(-4), finalComment]);

    return {
      comment: finalComment,
      type: context.type,
      advice: advice || undefined
    };
  }, [analyzeGameContext, generateStrategicAdvice, commentHistory]);

  return {
    generateIntelligentComment,
    personality,
    setPersonality,
    analyzeGameContext
  };
};

// Fonction utilitaire avec typage explicite
const getRandomFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

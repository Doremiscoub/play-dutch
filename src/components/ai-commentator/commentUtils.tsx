
import { Player } from '@/types';
import { CommentType, CommentStyle } from './types';
import { Brain, Lightbulb, Trophy, Smile, Zap, Star } from 'lucide-react';

export const getPlayerDisplayName = (player: Player): string => {
  if (!player?.name) return 'Joueur mystère';
  
  const name = player.name.trim();
  if (!name) return 'Joueur anonyme';
  
  const hasValidEmoji = player.emoji && 
                       typeof player.emoji === 'string' && 
                       player.emoji.trim() && 
                       player.emoji.trim() !== '';
  
  const emoji = hasValidEmoji ? ` ${player.emoji.trim()}` : '';
  
  return `${name}${emoji}`;
};

export const getCommentStyle = (commentType: CommentType): CommentStyle => {
  switch (commentType) {
    case 'encouragement':
      return {
        gradient: 'from-emerald-500/20 via-green-500/10 to-emerald-600/20',
        border: 'border-emerald-200/40',
        icon: <Trophy className="w-5 h-5 text-emerald-600" />,
        mood: 'happy'
      };
    case 'joke':
      return {
        gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-600/20',
        border: 'border-amber-200/40',
        icon: <Smile className="w-5 h-5 text-amber-600" />,
        mood: 'excited'
      };
    case 'sarcasm':
      return {
        gradient: 'from-purple-500/20 via-violet-500/10 to-purple-600/20',
        border: 'border-purple-200/40',
        icon: <Zap className="w-5 h-5 text-purple-600" />,
        mood: 'thinking'
      };
    case 'headline':
      return {
        gradient: 'from-rose-500/20 via-pink-500/10 to-rose-600/20',
        border: 'border-rose-200/40',
        icon: <Star className="w-5 h-5 text-rose-600" />,
        mood: 'excited'
      };
    case 'info':
    default:
      return {
        gradient: 'from-blue-500/20 via-cyan-500/10 to-indigo-600/20',
        border: 'border-blue-200/40',
        icon: <Brain className="w-5 h-5 text-blue-600" />,
        mood: 'neutral'
      };
  }
};

export const generateComment = (players: Player[], roundCount: number, scoreLimit: number) => {
  // Validation robuste avec commentaires par défaut
  if (!players || players.length === 0 || !Array.isArray(players)) {
    return { 
      comment: 'Bienvenue dans cette nouvelle aventure ! Préparez-vous à découvrir qui sont les vrais stratèges !', 
      type: 'encouragement' as CommentType 
    };
  }

  const validPlayers = players.filter(p => p && p.name && typeof p.name === 'string' && p.name.trim() && typeof p.totalScore === 'number');
  if (validPlayers.length === 0) {
    return { 
      comment: 'Les préparatifs touchent à leur fin ! Bientôt, nous saurons qui maîtrise l\'art du Dutch !', 
      type: 'encouragement' as CommentType 
    };
  }

  const playersWithScores = validPlayers.filter(p => typeof p.totalScore === 'number' && !isNaN(p.totalScore));
  if (playersWithScores.length === 0) {
    return { 
      comment: 'Patience, mes amis ! Les premiers scores arrivent et avec eux, les premières révélations !', 
      type: 'info' as CommentType 
    };
  }

  const sortedPlayers = [...playersWithScores].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const lastPlace = sortedPlayers[sortedPlayers.length - 1];
  
  if (!leader || !leader.name || typeof leader.totalScore !== 'number' || isNaN(leader.totalScore)) {
    return { 
      comment: 'L\'aventure se dessine ! Chaque joueur va bientôt révéler son véritable potentiel !', 
      type: 'encouragement' as CommentType 
    };
  }
  
  if (!lastPlace || !lastPlace.name || typeof lastPlace.totalScore !== 'number' || isNaN(lastPlace.totalScore)) {
    return { 
      comment: 'Préparatifs terminés ! Place au spectacle, mes chers amis !', 
      type: 'info' as CommentType 
    };
  }
  
  const dutchCount = playersWithScores.reduce((total, player) => 
    total + (player.rounds?.filter(r => r?.isDutch).length || 0), 0
  );
  
  const gap = lastPlace.totalScore - leader.totalScore;
  const gameProgress = leader.totalScore / scoreLimit;
  
  // Commentaires contextuels améliorés
  const comments = {
    gameStart: [
      "Messieurs-dames, bienvenue dans l'arène du Dutch ! Préparez-vous à découvrir qui sont les vrais tacticiens ! 🎯",
      "Nouvelle partie, nouvelles opportunités de briller ! Qui saura allier stratégie et intuition ce soir ? 🎲",
      "Chers joueurs, que cette partie révèle vos talents cachés ! L'aventure commence maintenant ! ⚡",
      "Installez-vous confortablement, le spectacle va commencer ! Et je promets du grand art ! 🎭"
    ],
    
    earlyGame: [
      `${getPlayerDisplayName(leader)} prend les devants ! Excellent départ, mais la route est encore longue ! 🚀`,
      `Première manche et déjà du spectacle ! ${getPlayerDisplayName(leader)} montre la voie ! 🌟`,
      `${dutchCount} Dutch déjà comptabilisés ! Quelqu'un a visiblement fait ses devoirs ! 📚`,
      `Seulement ${roundCount} manche${roundCount > 1 ? 's' : ''} et l'intensité monte ! Continuez, c'est fascinant ! 🔥`
    ],
    
    midGame: [
      `${getPlayerDisplayName(leader)} domine avec ${leader.totalScore} points ! La machine est en marche ! 🏆`,
      `${gap} points d'écart après ${roundCount} manches ! ${getPlayerDisplayName(leader)} impose son style ! 📈`,
      `${getPlayerDisplayName(lastPlace)}, il est temps de changer de braquet ! Les grands joueurs révèlent leur vraie nature ! 💪`,
      `${roundCount} manches et toujours autant de surprises ! Le Dutch ne pardonne rien ! ⚡`
    ],
    
    endGame: [
      `${getPlayerDisplayName(leader)} frôle la victoire avec ${leader.totalScore} points ! Qui va craquer sous la pression ? 🎯`,
      `Tension maximale ! Plus que ${scoreLimit - leader.totalScore} points pour ${getPlayerDisplayName(leader)} ! 🔥`,
      `Le suspense est à son comble ! ${getPlayerDisplayName(leader)} va-t-il tenir jusqu'au bout ? 🎬`,
      `Phase finale ! ${getPlayerDisplayName(leader)} sent la victoire, mais rien n'est jamais acquis ! ⚔️`
    ],
    
    tightRace: [
      `${gap} points d'écart seulement ! Cette partie est plus serrée qu'un match de tennis ! 🎾`,
      `Combat de titans ! ${gap} points séparent les extrêmes ! Chaque carte compte maintenant ! ⚡`,
      `${gap} points d'écart... Voilà ce qu'on appelle du suspense de haute qualité ! 🎭`,
      `${getPlayerDisplayName(leader)} et ${getPlayerDisplayName(lastPlace)} se tiennent en ${gap} points ! Du grand sport ! 🏅`
    ],
    
    dominationMode: [
      `${gap} points d'avance ! ${getPlayerDisplayName(leader)} joue dans une autre dimension ! 🚀`,
      `Domination totale ! ${gap} points d'écart, ${getPlayerDisplayName(leader)} écrase la concurrence ! 👑`,
      `${gap} points d'avance... ${getPlayerDisplayName(leader)} transforme cette partie en exhibition ! 🎪`,
      `${getPlayerDisplayName(leader)} règne en maître ! ${gap} points, c'est presque gênant pour les autres ! 😅`
    ],
    
    dutchCelebration: [
      `UN DUTCH ! Magnifique coup de maître ! Voilà ce qu'on appelle de l'art ! 🎯`,
      `DUTCH PARFAIT ! Quand le talent rencontre l'opportunité ! Bravo ! ⭐`,
      `Dutch légendaire ! Ce coup restera dans les annales ! 🏆`,
      `Dutch magistral ! L'élégance dans la simplicité ! 🌟`
    ]
  };

  let commentSet: string[];
  let type: CommentType = 'info';

  // Logique de sélection améliorée
  if (roundCount === 0) {
    commentSet = comments.gameStart;
    type = 'encouragement';
  } else if (roundCount <= 3) {
    commentSet = comments.earlyGame;
    type = 'encouragement';
  } else if (gameProgress >= 0.8) {
    commentSet = comments.endGame;
    type = 'headline';
  } else if (gap <= 8) {
    commentSet = comments.tightRace;
    type = 'encouragement';
  } else if (gap >= 25) {
    commentSet = comments.dominationMode;
    type = 'headline';
  } else {
    commentSet = comments.midGame;
    type = 'info';
  }

  // Vérifier s'il y a eu un Dutch récent
  const recentDutch = playersWithScores.some(player => 
    player.rounds?.length > 0 && player.rounds[player.rounds.length - 1]?.isDutch
  );
  
  if (recentDutch && roundCount > 0) {
    commentSet = comments.dutchCelebration;
    type = 'encouragement';
  }

  const randomComment = commentSet[Math.floor(Math.random() * commentSet.length)];
  return { comment: randomComment, type };
};

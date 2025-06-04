
import { Player } from '@/types';
import { CommentType, CommentStyle } from './types';
import { Brain, Lightbulb, Trophy, Smile } from 'lucide-react';

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
    case 'observation':
      return {
        gradient: 'from-blue-500/20 via-cyan-500/10 to-indigo-600/20',
        border: 'border-blue-200/40',
        icon: <Brain className="w-5 h-5 text-blue-600" />,
        mood: 'thinking'
      };
    default:
      return {
        gradient: 'from-purple-500/20 via-indigo-500/10 to-purple-600/20',
        border: 'border-purple-200/40',
        icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
        mood: 'neutral'
      };
  }
};

export const generateComment = (players: Player[], roundCount: number, scoreLimit: number) => {
  if (!players || players.length === 0) return { comment: '', type: 'info' as CommentType };

  const validPlayers = players.filter(p => p && p.name && typeof p.totalScore === 'number');
  if (validPlayers.length === 0) return { comment: '', type: 'info' as CommentType };

  const sortedPlayers = [...validPlayers].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const lastPlace = sortedPlayers[sortedPlayers.length - 1];
  const dutchCount = validPlayers.reduce((total, player) => 
    total + (player.rounds?.filter(r => r?.isDutch).length || 0), 0
  );
  
  const comments = {
    start: [
      "Bienvenue dans cette nouvelle partie ! Que le meilleur gagne... ou plutôt, que le moins mauvais survive ! 🎲",
      "Ah, des nouveaux adversaires ! J'ai hâte de voir qui sera le premier à craquer sous la pression... 😈",
      "Une nouvelle bataille commence ! Préparez-vous à découvrir vos véritables talents... ou leur absence ! 🎭"
    ],
    
    early: [
      `${getPlayerDisplayName(leader)} prend les devants ! Mais attention, c'est souvent les premiers qui chutent le plus dur ! 📉`,
      `Seulement ${roundCount} manche${roundCount > 1 ? 's' : ''} et déjà des surprises ! Continuez comme ça, c'est divertissant ! 🍿`,
      `${dutchCount} Dutch déjà ? Quelqu'un a visiblement besoin de réviser les règles ! 📚`
    ],
    
    midGame: [
      `${getPlayerDisplayName(leader)} domine avec ${leader.totalScore} points ! Mais la roue tourne toujours... ⚡`,
      `${getPlayerDisplayName(lastPlace)}, il serait peut-être temps de changer de stratégie ? Juste une suggestion... 🤔`,
      `${roundCount} manches déjà ! Le temps passe vite quand on s'amuse... enfin, pour certains ! ⏰`
    ],
    
    endGame: [
      `${getPlayerDisplayName(leader)} frôle la victoire avec ${leader.totalScore} points ! Qui va craquer en premier ? 🎯`,
      `La tension monte ! Plus que ${scoreLimit - leader.totalScore} points et c'est fini pour ${getPlayerDisplayName(leader)} ! 🔥`,
      `Le suspense est à son comble ! ${getPlayerDisplayName(leader)} va-t-il tenir le coup ? 🎬`
    ],
    
    dutch: [
      `Un Dutch ! Quelqu'un vient de sauver sa peau... temporairement ! 🦸‍♂️`,
      `Magnifique Dutch ! Voilà ce qu'on appelle un comeback héroïque ! ⭐`,
      `Dutch parfait ! Si seulement vous pouviez jouer comme ça tout le temps... 🎯`
    ]
  };

  let commentSet: string[];
  let type: CommentType = 'info';

  if (roundCount === 0) {
    commentSet = comments.start;
    type = 'encouragement';
  } else if (roundCount <= 3) {
    commentSet = comments.early;
    type = 'observation';
  } else if (leader.totalScore < scoreLimit * 0.7) {
    commentSet = comments.midGame;
    type = 'joke';
  } else {
    commentSet = comments.endGame;
    type = 'info';
  }

  const recentDutch = validPlayers.some(player => 
    player.rounds?.length > 0 && player.rounds[player.rounds.length - 1]?.isDutch
  );
  
  if (recentDutch && roundCount > 0) {
    commentSet = comments.dutch;
    type = 'encouragement';
  }

  const randomComment = commentSet[Math.floor(Math.random() * commentSet.length)];
  return { comment: randomComment, type };
};

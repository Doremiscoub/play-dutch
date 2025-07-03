import { Player } from '@/types';

interface CommentStyle {
  gradient: string;
  border: string;
  mood: 'happy' | 'excited' | 'thinking' | 'surprised' | 'neutral';
  icon: string;
}

export const generateComment = (players: Player[], roundCount: number, scoreLimit: number) => {
  // Vérifications de sécurité absolues
  if (!players || players.length === 0 || !Array.isArray(players)) {
    return { comment: 'Bienvenue dans votre partie ! Que la meilleure stratégie gagne !', type: 'info' as const };
  }

  // Filtrer les joueurs valides
  const validPlayers = players.filter(p => p && p.name && typeof p.totalScore === 'number');
  if (validPlayers.length === 0) {
    return { comment: 'La partie se prépare ! En route pour l\'aventure !', type: 'info' as const };
  }

  const sortedPlayers = [...validPlayers].sort((a, b) => a.totalScore - b.totalScore);
  const leader = sortedPlayers[0];
  const lastPlace = sortedPlayers[sortedPlayers.length - 1];
  
  // Vérifications supplémentaires
  if (!leader || !leader.name || typeof leader.totalScore !== 'number') {
    return { comment: 'La partie commence ! Bonne chance à tous !', type: 'info' as const };
  }

  if (!lastPlace || !lastPlace.name || typeof lastPlace.totalScore !== 'number') {
    return { comment: 'C\'est parti ! Montrez-nous votre meilleur jeu !', type: 'info' as const };
  }
  
  if (roundCount === 0) {
    return {
      comment: `Parfait ! ${validPlayers.length} joueurs prêts pour l'aventure. Objectif : ${scoreLimit} points. Que le meilleur gagne !`,
      type: 'info' as const
    };
  }
  
  if (roundCount === 1) {
    return {
      comment: `Première manche terminée ! ${leader.name} prend les devants avec ${leader.totalScore} points. Excellent départ !`,
      type: 'encouragement' as const
    };
  }
  
  if (leader.totalScore >= scoreLimit * 0.8) {
    return {
      comment: `Attention ! ${leader.name} approche de la victoire avec ${leader.totalScore} points. Il ne faut plus faire d'erreur !`,
      type: 'observation' as const
    };
  }
  
  if (roundCount % 3 === 0 && roundCount > 0) {
    return {
      comment: `Après ${roundCount} manches, ${leader.name} mène toujours avec ${leader.totalScore} points. La tension monte !`,
      type: 'info' as const
    };
  }
  
  const jokes = [
    `${lastPlace.name}, courage ! Même les plus grands champions ont eu des débuts difficiles !`,
    `${leader.name} semble avoir trouvé la formule magique ! Bravo pour cette régularité !`,
    `Manche ${roundCount} : l'intensité augmente ! Qui saura garder son sang-froid ?`,
    `Belle partie ! ${validPlayers.length} joueurs donnent tout pour la victoire !`,
    `La stratégie paye ! Continuez comme ça, c'est passionnant à suivre !`
  ];
  
  return {
    comment: jokes[Math.floor(Math.random() * jokes.length)],
    type: 'joke' as const
  };
};

export const getCommentStyle = (type: 'info' | 'joke' | 'encouragement' | 'observation'): CommentStyle => {
  const styles = {
    info: {
      gradient: 'from-blue-100 to-indigo-100',
      border: 'border-blue-200',
      mood: 'neutral' as const,
      icon: 'ℹ️'
    },
    joke: {
      gradient: 'from-amber-100 to-orange-100',
      border: 'border-amber-200',
      mood: 'happy' as const,
      icon: '😄'
    },
    encouragement: {
      gradient: 'from-green-100 to-emerald-100',
      border: 'border-green-200',
      mood: 'excited' as const,
      icon: '💪'
    },
    observation: {
      gradient: 'from-purple-100 to-violet-100',
      border: 'border-purple-200',
      mood: 'thinking' as const,
      icon: '🤔'
    }
  };
  
  return styles[type];
};
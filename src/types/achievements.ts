
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'score' | 'dutch' | 'streak' | 'games' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: {
    target: number;
    operator: 'gte' | 'lte' | 'eq';
    stat: string;
  };
  reward?: {
    xp: number;
    title?: string;
  };
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
}

export interface PlayerAchievements {
  playerId: string;
  achievements: Achievement[];
  totalXP: number;
  level: number;
  title?: string;
}

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  {
    id: 'first_dutch',
    name: 'Baptême du Feu',
    description: 'Votre premier Dutch !',
    icon: 'zap',
    type: 'dutch',
    rarity: 'common',
    condition: { target: 1, operator: 'gte', stat: 'dutchCount' },
    reward: { xp: 50, title: 'Novice' }
  },
  {
    id: 'dutch_master',
    name: 'Maître du Dutch',
    description: 'Réalisez 10 Dutch',
    icon: 'crown',
    type: 'dutch',
    rarity: 'rare',
    condition: { target: 10, operator: 'gte', stat: 'dutchCount' },
    reward: { xp: 200, title: 'Maître Dutch' }
  },
  {
    id: 'perfect_game',
    name: 'Partie Parfaite',
    description: 'Terminez une partie avec moins de 10 points',
    icon: 'target',
    type: 'score',
    rarity: 'epic',
    condition: { target: 10, operator: 'lte', stat: 'totalScore' },
    reward: { xp: 500, title: 'Perfectionniste' }
  },
  {
    id: 'comeback_king',
    name: 'Roi du Comeback',
    description: 'Gagnez après avoir été dernier',
    icon: 'trending-up',
    type: 'special',
    rarity: 'legendary',
    condition: { target: 1, operator: 'gte', stat: 'comebacks' },
    reward: { xp: 1000, title: 'Roi du Comeback' }
  },
  {
    id: 'veteran',
    name: 'Vétéran',
    description: 'Jouez 50 parties',
    icon: 'trophy',
    type: 'games',
    rarity: 'rare',
    condition: { target: 50, operator: 'gte', stat: 'gamesPlayed' },
    reward: { xp: 300, title: 'Vétéran' }
  },
  {
    id: 'consistency',
    name: 'Régularité',
    description: 'Score moyen < 15 sur 10 parties',
    icon: 'target',
    type: 'score',
    rarity: 'epic',
    condition: { target: 15, operator: 'lte', stat: 'averageScore' },
    reward: { xp: 400, title: 'Régulier' }
  }
];

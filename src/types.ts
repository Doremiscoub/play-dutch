
export interface Player {
  id: string;
  name: string;
  totalScore: number;
  avatarColor: string;  // Ajout de cette propriété
  rounds: { score: number; isDutch: boolean }[];
  stats?: PlayerStatistics;
}

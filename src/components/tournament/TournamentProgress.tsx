
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Target, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tournament } from '@/hooks/useTournamentState';

interface TournamentProgressProps {
  tournament: Tournament;
  currentProgress: { current: number; total: number; percentage: number };
}

const TournamentProgress: React.FC<TournamentProgressProps> = ({
  tournament,
  currentProgress
}) => {
  const getLeader = () => {
    const sorted = [...tournament.overallStandings].sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return a.totalScore - b.totalScore;
    });
    return sorted[0];
  };

  const leader = getLeader();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-gradient-to-r from-dutch-orange/10 to-dutch-pink/10 border-dutch-orange/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-dutch-orange">
            <Trophy className="h-5 w-5" />
            {tournament.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression du tournoi</span>
              <span>{currentProgress.current}/{currentProgress.total} manches</span>
            </div>
            <Progress value={currentProgress.percentage} className="h-2" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-dutch-blue" />
                <span className="text-sm font-medium">{tournament.playerNames.length}</span>
              </div>
              <p className="text-xs text-gray-600">Joueurs</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Target className="h-4 w-4 text-dutch-purple" />
                <span className="text-sm font-medium">{tournament.totalRounds}</span>
              </div>
              <p className="text-xs text-gray-600">Manches</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4 text-dutch-pink" />
                <span className="text-sm font-medium">{tournament.matches.length}</span>
              </div>
              <p className="text-xs text-gray-600">Jouées</p>
            </div>
          </div>

          {/* Current Leader */}
          {leader && (
            <div className="bg-white/50 rounded-xl p-3 border border-white/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Leader actuel</p>
                  <p className="font-bold text-dutch-orange">{leader.playerName}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-dutch-orange/10 text-dutch-orange border-dutch-orange/30">
                    {leader.wins} victoire{leader.wins > 1 ? 's' : ''}
                  </Badge>
                  <p className="text-xs text-gray-600 mt-1">{leader.totalScore} pts</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TournamentProgress;

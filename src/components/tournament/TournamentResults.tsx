
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Users, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tournament } from '@/hooks/useTournamentState';
import { toast } from 'sonner';

interface TournamentResultsProps {
  tournament: Tournament;
  onNewTournament: () => void;
  onBackToHome: () => void;
}

const TournamentResults: React.FC<TournamentResultsProps> = ({
  tournament,
  onNewTournament,
  onBackToHome
}) => {
  const sortedStandings = [...tournament.overallStandings].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return a.totalScore - b.totalScore;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2: return 'bg-gray-100 text-gray-800 border-gray-200';
      case 3: return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const exportResults = () => {
    const results = {
      tournamentName: tournament.name,
      date: tournament.createdAt,
      finalStandings: sortedStandings,
      totalMatches: tournament.matches.length
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tournoi-${tournament.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    link.click();
    
    toast.success('Résultats exportés !');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="bg-gradient-to-r from-dutch-orange to-dutch-pink text-white">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Trophy className="h-12 w-12 mx-auto mb-2" />
          </motion.div>
          <CardTitle className="text-2xl">🎉 Tournoi Terminé !</CardTitle>
          <p className="text-white/90">{tournament.name}</p>
        </CardHeader>
      </Card>

      {/* Podium */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Classement Final</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sortedStandings.map((standing, index) => (
            <motion.div
              key={standing.playerName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center justify-between p-4 rounded-xl border
                ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' :
                  index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200' :
                  index === 2 ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200' :
                  'bg-white border-gray-200'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(index + 1)}
                  <Badge className={getRankBadge(index + 1)}>
                    #{index + 1}
                  </Badge>
                </div>
                <div>
                  <p className="font-bold text-gray-800">{standing.playerName}</p>
                  <p className="text-sm text-gray-600">
                    {standing.wins} victoire{standing.wins > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gray-800">{standing.totalScore} pts</p>
                <p className="text-sm text-gray-600">Total cumulé</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          onClick={exportResults}
          variant="outline"
          className="bg-white/70 backdrop-blur-sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        
        <Button
          onClick={onNewTournament}
          className="bg-gradient-to-r from-dutch-orange to-dutch-pink text-white"
        >
          <Trophy className="h-4 w-4 mr-2" />
          Nouveau tournoi
        </Button>
        
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="bg-white/70 backdrop-blur-sm"
        >
          Retour accueil
        </Button>
      </div>
    </motion.div>
  );
};

export default TournamentResults;

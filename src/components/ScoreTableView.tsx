
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Trophy, Star, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreTableViewProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

type SortField = 'name' | 'total' | 'avg' | 'best' | 'dutch';
type SortDirection = 'asc' | 'desc' | null;

const ScoreTableView: React.FC<ScoreTableViewProps> = ({ players, roundHistory }) => {
  const [sortField, setSortField] = useState<SortField>('total');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prevDirection => {
        if (prevDirection === 'asc') return 'desc';
        if (prevDirection === 'desc') return null;
        return 'asc';
      });
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedPlayers = useMemo(() => {
    if (!sortDirection) return [...players];
    
    return [...players].sort((a, b) => {
      let valueA: any;
      let valueB: any;
      
      switch (sortField) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'total':
          valueA = a.totalScore;
          valueB = b.totalScore;
          break;
        case 'avg':
          valueA = a.stats?.averageScore || 0;
          valueB = b.stats?.averageScore || 0;
          break;
        case 'best':
          valueA = a.stats?.bestRound || 999;
          valueB = b.stats?.bestRound || 999;
          break;
        case 'dutch':
          valueA = a.stats?.dutchCount || 0;
          valueB = b.stats?.dutchCount || 0;
          break;
        default:
          return 0;
      }
      
      const comparison = typeof valueA === 'string'
        ? valueA.localeCompare(valueB)
        : valueA - valueB;
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [players, sortField, sortDirection]);
  
  // Trouver le nombre maximum de manches pour aligner le tableau
  const maxRounds = players.reduce((max, player) => Math.max(max, player.rounds.length), 0);
  const rounds = Array.from({ length: maxRounds }, (_, i) => i + 1);
  
  // Fonction pour obtenir la classe de style pour une cellule de score
  const getScoreCellClass = (player: Player, roundIndex: number) => {
    const round = player.rounds[roundIndex];
    if (!round) return "bg-gray-50 text-gray-400";
    
    if (round.isDutch) return "bg-dutch-orange/10 text-dutch-orange font-medium";
    
    const score = round.score;
    if (score === 0) return "bg-green-50 text-green-600 font-medium";
    
    const isLowestScore = players.every(p => 
      !p.rounds[roundIndex] || p.rounds[roundIndex].score >= score
    );
    
    if (isLowestScore) return "bg-dutch-blue/10 text-dutch-blue font-medium";
    
    return "bg-gray-50 text-gray-600";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card className="bg-white/80 backdrop-blur-md border border-white/50 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead 
                  className="w-[120px]"
                  sortDirection={sortField === 'name' ? sortDirection : null}
                  onSort={() => handleSort('name')}
                >
                  Joueur
                </TableHead>
                
                {rounds.map(round => (
                  <TableHead key={round} className="text-center w-[60px]">
                    M{round}
                  </TableHead>
                ))}
                
                <TableHead 
                  className="text-center w-[80px]"
                  sortDirection={sortField === 'total' ? sortDirection : null}
                  onSort={() => handleSort('total')}
                >
                  Total
                </TableHead>
                
                <TableHead 
                  className="text-center w-[70px]"
                  sortDirection={sortField === 'avg' ? sortDirection : null}
                  onSort={() => handleSort('avg')}
                >
                  Moy.
                </TableHead>
                
                <TableHead 
                  className="text-center w-[70px]"
                  sortDirection={sortField === 'best' ? sortDirection : null}
                  onSort={() => handleSort('best')}
                >
                  Min
                </TableHead>
                
                <TableHead 
                  className="text-center w-[70px]"
                  sortDirection={sortField === 'dutch' ? sortDirection : null}
                  onSort={() => handleSort('dutch')}
                >
                  Dutch
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPlayers.map((player, index) => (
                <TableRow key={player.id} className={index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      )}
                      {player.name}
                    </div>
                  </TableCell>
                  
                  {rounds.map((round, i) => (
                    <TableCell key={i} className={cn("text-center", getScoreCellClass(player, i))}>
                      {player.rounds[i]?.score ?? '-'}
                    </TableCell>
                  ))}
                  
                  <TableCell className="text-center font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                    {player.totalScore}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {player.stats?.averageScore.toFixed(1) || '-'}
                  </TableCell>
                  
                  <TableCell className="text-center text-green-600">
                    {player.stats?.bestRound !== null ? player.stats.bestRound : '-'}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-medium",
                        player.stats?.dutchCount ? "bg-dutch-orange/10 text-dutch-orange" : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {player.stats?.dutchCount || 0}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedPlayers.map(player => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/30 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-800">{player.name}</h3>
              <div className="flex items-center text-sm">
                <span className="font-bold text-dutch-purple">{player.totalScore}</span>
                <span className="text-xs text-gray-500 ml-1">pts</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center bg-gray-50 rounded-lg p-2">
                <Star className="h-3 w-3 text-dutch-blue mr-1" />
                <span className="text-gray-600 mr-1">Moy:</span>
                <span className="font-medium">{player.stats?.averageScore.toFixed(1) || '-'}</span>
              </div>
              
              <div className="flex items-center bg-gray-50 rounded-lg p-2">
                <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-gray-600 mr-1">Min:</span>
                <span className="font-medium">{player.stats?.bestRound !== null ? player.stats.bestRound : '-'}</span>
              </div>
              
              <div className="flex items-center bg-gray-50 rounded-lg p-2">
                <Trophy className="h-3 w-3 text-dutch-orange mr-1" />
                <span className="text-gray-600 mr-1">Dutch:</span>
                <span className="font-medium">{player.stats?.dutchCount || 0}</span>
              </div>
            </div>
            
            {player.stats?.improvementRate !== undefined && (
              <div className="mt-2 text-xs flex items-center bg-gray-50 rounded-lg p-2">
                {player.stats.improvementRate < 0 ? (
                  <>
                    <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-gray-600 mr-1">Progression:</span>
                    <span className="font-medium text-green-600">{Math.abs(player.stats.improvementRate).toFixed(1)} pts/manche</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-gray-600 mr-1">Tendance:</span>
                    <span className="font-medium text-red-500">+{player.stats.improvementRate.toFixed(1)} pts/manche</span>
                  </>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScoreTableView;

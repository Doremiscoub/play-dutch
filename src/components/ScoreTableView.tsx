
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Player } from '@/types';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Crown, TrendingDown, TrendingUp } from 'lucide-react';

interface ScoreTableViewProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const ScoreTableView: React.FC<ScoreTableViewProps> = ({ players, roundHistory }) => {
  const [sortColumn, setSortColumn] = useState<'name' | 'score' | 'avgScore' | 'bestRound' | 'worstRound' | 'dutch'>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');
  
  const handleSort = (column: 'name' | 'score' | 'avgScore' | 'bestRound' | 'worstRound' | 'dutch') => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
      if (sortDirection === null) {
        setSortColumn('score');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const sortedPlayers = [...players].sort((a, b) => {
    if (sortDirection === null) return 0;
    
    let compareA, compareB;
    
    switch (sortColumn) {
      case 'name':
        compareA = a.name;
        compareB = b.name;
        break;
      case 'score':
        compareA = a.totalScore;
        compareB = b.totalScore;
        break;
      case 'avgScore':
        compareA = a.rounds.length ? a.rounds.reduce((sum, r) => sum + r.score, 0) / a.rounds.length : 0;
        compareB = b.rounds.length ? b.rounds.reduce((sum, r) => sum + r.score, 0) / b.rounds.length : 0;
        break;
      case 'bestRound':
        compareA = a.rounds.length ? Math.min(...a.rounds.map(r => r.score)) : Infinity;
        compareB = b.rounds.length ? Math.min(...b.rounds.map(r => r.score)) : Infinity;
        break;
      case 'worstRound':
        compareA = a.rounds.length ? Math.max(...a.rounds.map(r => r.score)) : 0;
        compareB = b.rounds.length ? Math.max(...b.rounds.map(r => r.score)) : 0;
        break;
      case 'dutch':
        compareA = a.rounds.filter(r => r.isDutch).length;
        compareB = b.rounds.filter(r => r.isDutch).length;
        break;
      default:
        return 0;
    }
    
    if (compareA === compareB) return 0;
    
    const comparison = compareA > compareB ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  const getPosition = (player: Player) => {
    const sorted = [...players].sort((a, b) => a.totalScore - b.totalScore);
    return sorted.findIndex(p => p.id === player.id) + 1;
  };
  
  const roundCount = players.length > 0 ? players[0].rounds.length : 0;
  
  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl shadow-md p-1 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">Pos</TableHead>
              <TableHead 
                className="cursor-pointer" 
                onClick={() => handleSort('name')}
                sortDirection={sortColumn === 'name' ? sortDirection : null}
                onSort={() => handleSort('name')}
              >
                Joueur
              </TableHead>
              <TableHead 
                className="cursor-pointer text-right" 
                onClick={() => handleSort('score')}
                sortDirection={sortColumn === 'score' ? sortDirection : null}
                onSort={() => handleSort('score')}
              >
                Score
              </TableHead>
              <TableHead 
                className="cursor-pointer text-right" 
                onClick={() => handleSort('avgScore')}
                sortDirection={sortColumn === 'avgScore' ? sortDirection : null}
                onSort={() => handleSort('avgScore')}
              >
                Moy.
              </TableHead>
              <TableHead 
                className="cursor-pointer text-right" 
                onClick={() => handleSort('bestRound')}
                sortDirection={sortColumn === 'bestRound' ? sortDirection : null}
                onSort={() => handleSort('bestRound')}
              >
                Min
              </TableHead>
              <TableHead 
                className="cursor-pointer text-right" 
                onClick={() => handleSort('worstRound')}
                sortDirection={sortColumn === 'worstRound' ? sortDirection : null}
                onSort={() => handleSort('worstRound')}
              >
                Max
              </TableHead>
              <TableHead 
                className="cursor-pointer text-right" 
                onClick={() => handleSort('dutch')}
                sortDirection={sortColumn === 'dutch' ? sortDirection : null}
                onSort={() => handleSort('dutch')}
              >
                Dutch
              </TableHead>
              {Array.from({ length: Math.min(roundCount, 5) }).map((_, i) => (
                <TableHead key={i} className="text-center">
                  M{roundCount - Math.min(roundCount, 5) + i + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player) => {
              const position = getPosition(player);
              const avgScore = player.rounds.length
                ? (player.rounds.reduce((sum, r) => sum + r.score, 0) / player.rounds.length).toFixed(1)
                : '-';
              const bestRound = player.rounds.length 
                ? Math.min(...player.rounds.map(r => r.score)) 
                : '-';
              const worstRound = player.rounds.length 
                ? Math.max(...player.rounds.map(r => r.score)) 
                : '-';
              const dutchCount = player.rounds.filter(r => r.isDutch).length;
              
              // Get last 5 rounds (or fewer if not available)
              const lastRounds = player.rounds.slice(-Math.min(5, roundCount));
              
              return (
                <TableRow key={player.id}>
                  <TableCell className="font-medium bg-dutch-blue/10 text-dutch-blue text-center">
                    {position === 1 ? <Crown className="h-4 w-4 text-dutch-yellow mx-auto" /> : position}
                  </TableCell>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell className="font-bold text-right">{player.totalScore}</TableCell>
                  <TableCell className="text-right">{avgScore}</TableCell>
                  <TableCell className="text-right text-green-600">{bestRound}</TableCell>
                  <TableCell className="text-right text-red-600">{worstRound}</TableCell>
                  <TableCell className="text-right text-dutch-orange">{dutchCount}</TableCell>
                  
                  {Array.from({ length: Math.min(roundCount, 5) }).map((_, i) => {
                    const roundIndex = roundCount - Math.min(roundCount, 5) + i;
                    const round = lastRounds[i];
                    
                    if (!round) return <TableCell key={i} />;
                    
                    return (
                      <TableCell 
                        key={i} 
                        className={`text-center ${round.isDutch ? 'bg-dutch-orange/20 text-dutch-orange font-medium' : ''}`}
                      >
                        {round.score}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ScoreTableView;

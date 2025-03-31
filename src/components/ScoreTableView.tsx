
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Player } from '@/types';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Crown, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface ScoreTableViewProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const ScoreTableView: React.FC<ScoreTableViewProps> = ({ players, roundHistory }) => {
  const [sortColumn, setSortColumn] = useState<'name' | 'score' | 'avgScore' | 'bestRound' | 'worstRound' | 'dutch'>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (column: 'name' | 'score' | 'avgScore' | 'bestRound' | 'worstRound' | 'dutch') => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const sortedPlayers = [...players].sort((a, b) => {
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
    <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-md p-4 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10">
            <TableRow>
              <TableHead className="w-12 text-center font-semibold">Pos</TableHead>
              <TableHead 
                className="font-semibold" 
                onSort={() => handleSort('name')}
                sortDirection={sortColumn === 'name' ? sortDirection : null}
              >
                Joueur
              </TableHead>
              <TableHead 
                className="font-semibold text-right" 
                onSort={() => handleSort('score')}
                sortDirection={sortColumn === 'score' ? sortDirection : null}
              >
                Score
              </TableHead>
              <TableHead 
                className="font-semibold text-right" 
                onSort={() => handleSort('avgScore')}
                sortDirection={sortColumn === 'avgScore' ? sortDirection : null}
              >
                Moy.
              </TableHead>
              <TableHead 
                className="font-semibold text-right" 
                onSort={() => handleSort('bestRound')}
                sortDirection={sortColumn === 'bestRound' ? sortDirection : null}
              >
                Min
              </TableHead>
              <TableHead 
                className="font-semibold text-right" 
                onSort={() => handleSort('worstRound')}
                sortDirection={sortColumn === 'worstRound' ? sortDirection : null}
              >
                Max
              </TableHead>
              <TableHead 
                className="font-semibold text-right" 
                onSort={() => handleSort('dutch')}
                sortDirection={sortColumn === 'dutch' ? sortDirection : null}
              >
                Dutch
              </TableHead>
              {Array.from({ length: Math.min(roundCount, 5) }).map((_, i) => (
                <TableHead key={i} className="text-center font-semibold bg-dutch-blue/5">
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
                <TableRow 
                  key={player.id}
                  className={position === 1 ? "bg-dutch-blue/5 hover:bg-dutch-blue/10" : 
                             position === 2 ? "bg-dutch-purple/5 hover:bg-dutch-purple/10" : 
                             position === 3 ? "bg-dutch-orange/5 hover:bg-dutch-orange/10" : 
                             "hover:bg-gray-50"}
                >
                  <TableCell className="font-medium text-center">
                    {position === 1 ? (
                      <div className="flex justify-center">
                        <motion.div 
                          initial={{ rotate: 0 }}
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                        >
                          <Crown className="h-5 w-5 text-dutch-yellow" />
                        </motion.div>
                      </div>
                    ) : (
                      <Badge variant="outline" className={
                        position === 2 ? "bg-dutch-purple/10 text-dutch-purple border-none" : 
                        position === 3 ? "bg-dutch-orange/10 text-dutch-orange border-none" : 
                        "bg-gray-100 text-gray-600 border-none"
                      }>
                        {position}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell className="font-bold text-right">{player.totalScore}</TableCell>
                  <TableCell className="text-right text-gray-600">{avgScore}</TableCell>
                  <TableCell className="text-right text-green-600">{bestRound}</TableCell>
                  <TableCell className="text-right text-red-600">{worstRound}</TableCell>
                  <TableCell className="text-right">
                    {dutchCount > 0 ? (
                      <Badge className="bg-dutch-orange/20 text-dutch-orange border-none">
                        {dutchCount}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </TableCell>
                  
                  {Array.from({ length: Math.min(roundCount, 5) }).map((_, i) => {
                    const roundIndex = roundCount - Math.min(roundCount, 5) + i;
                    const round = lastRounds[i];
                    
                    if (!round) return <TableCell key={i} />;
                    
                    // Check if this is the best score for this player
                    const isPlayerBestScore = round.score > 0 && 
                      round.score === Math.min(...player.rounds.map(r => r.score).filter(s => s > 0));
                    
                    // Check if this round is "Dutch"
                    const isDutch = round.isDutch;
                    
                    return (
                      <TableCell 
                        key={i} 
                        className={`text-center rounded-lg ${
                          isDutch ? 'bg-dutch-orange/20 text-dutch-orange font-medium' : 
                          isPlayerBestScore ? 'bg-green-100 text-green-800 font-medium' : 
                          ''
                        }`}
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
      
      <div className="text-xs text-gray-500 mt-4 text-center">
        Cliquez sur les entêtes pour trier le tableau • Seules les 5 dernières manches sont affichées
      </div>
    </div>
  );
};

export default ScoreTableView;

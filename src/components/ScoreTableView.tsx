
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Player } from '@/types';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ArrowUpDown, ArrowUp, ArrowDown, Medal, Star, TrendingUp, TrendingDown, HeartPulse } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

interface ScoreTableViewProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const ScoreTableView: React.FC<ScoreTableViewProps> = ({ players, roundHistory }) => {
  const [sortColumn, setSortColumn] = useState<'name' | 'score' | 'avgScore' | 'bestRound' | 'worstRound' | 'dutch'>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { currentTheme } = useTheme();
  
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
    <div className={cn(
      "bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-md p-4 overflow-hidden transition-all duration-300",
      `data-theme-${currentTheme}`
    )}>
      <div className="overflow-x-auto">
        <TooltipProvider>
          <Table>
            <TableHeader className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10">
              <TableRow>
                <TableHead className="w-12 text-center font-semibold">
                  <span className="sr-only">Position</span>
                  <Medal className="h-4 w-4 mx-auto text-dutch-blue" />
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer" 
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    <span>Joueur</span>
                    {sortColumn === 'name' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5 text-dutch-blue" /> : <ArrowDown className="h-3.5 w-3.5 text-dutch-blue" />
                    ) : <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold text-right cursor-pointer" 
                  onClick={() => handleSort('score')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Score</span>
                    {sortColumn === 'score' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5 text-dutch-blue" /> : <ArrowDown className="h-3.5 w-3.5 text-dutch-blue" />
                    ) : <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold text-right cursor-pointer" 
                  onClick={() => handleSort('avgScore')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-dutch-blue" />
                          <span>Moy.</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Score moyen par manche</p>
                      </TooltipContent>
                    </Tooltip>
                    {sortColumn === 'avgScore' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5 text-dutch-blue" /> : <ArrowDown className="h-3.5 w-3.5 text-dutch-blue" />
                    ) : <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold text-right cursor-pointer" 
                  onClick={() => handleSort('bestRound')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <TrendingDown className="h-3.5 w-3.5 text-green-500" />
                          <span>Min</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Score minimum (meilleur)</p>
                      </TooltipContent>
                    </Tooltip>
                    {sortColumn === 'bestRound' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5 text-dutch-blue" /> : <ArrowDown className="h-3.5 w-3.5 text-dutch-blue" />
                    ) : <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold text-right cursor-pointer" 
                  onClick={() => handleSort('worstRound')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5 text-red-500" />
                          <span>Max</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Score maximum (pire)</p>
                      </TooltipContent>
                    </Tooltip>
                    {sortColumn === 'worstRound' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5 text-dutch-blue" /> : <ArrowDown className="h-3.5 w-3.5 text-dutch-blue" />
                    ) : <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold text-right cursor-pointer" 
                  onClick={() => handleSort('dutch')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <HeartPulse className="h-3.5 w-3.5 text-dutch-orange" />
                          <span>Dutch</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Nombre de Dutch</p>
                      </TooltipContent>
                    </Tooltip>
                    {sortColumn === 'dutch' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5 text-dutch-blue" /> : <ArrowDown className="h-3.5 w-3.5 text-dutch-blue" />
                    ) : <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />}
                  </div>
                </TableHead>
                {Array.from({ length: Math.min(roundCount, 5) }).map((_, i) => (
                  <TableHead key={i} className="text-center font-semibold bg-dutch-blue/5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>M{roundCount - Math.min(roundCount, 5) + i + 1}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Manche {roundCount - Math.min(roundCount, 5) + i + 1}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
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
                    <motion.tr 
                      key={player.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "border-b transition-colors",
                        position === 1 ? "bg-dutch-blue/5 hover:bg-dutch-blue/10" : 
                                  position === 2 ? "bg-dutch-purple/5 hover:bg-dutch-purple/10" : 
                                  position === 3 ? "bg-dutch-orange/5 hover:bg-dutch-orange/10" : 
                                  "hover:bg-gray-50"
                      )}
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
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Badge variant="outline" className={cn(
                              "border-none",
                              position === 2 ? "bg-dutch-purple/10 text-dutch-purple" : 
                                        position === 3 ? "bg-dutch-orange/10 text-dutch-orange" : 
                                        "bg-gray-100 text-gray-600"
                            )}>
                              {position}
                            </Badge>
                          </motion.div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-1">
                          <span>{player.name}</span>
                          {player.rounds.some(r => r.isDutch) && (
                            <Badge variant="outline" className="bg-dutch-orange/10 text-dutch-orange border-none text-xs ml-1">D</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-right">{player.totalScore}</TableCell>
                      <TableCell className="text-right text-gray-600">{avgScore}</TableCell>
                      <TableCell className="text-right text-green-600 font-medium">{bestRound}</TableCell>
                      <TableCell className="text-right text-red-600 font-medium">{worstRound}</TableCell>
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
                            className={cn(
                              "text-center rounded-lg transition-all duration-200",
                              isDutch ? 'bg-dutch-orange/20 text-dutch-orange font-medium' : 
                              isPlayerBestScore ? 'bg-green-100 text-green-800 font-medium' : ''
                            )}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="min-w-6 inline-flex justify-center"
                            >
                              {round.score}
                            </motion.div>
                          </TableCell>
                        );
                      })}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
      
      <div className="text-xs text-gray-500 mt-4 text-center">
        <p>Cliquez sur les entêtes pour trier le tableau • Seules les 5 dernières manches sont affichées</p>
        <p className="mt-1 italic">Survolez les icônes pour plus d'informations</p>
      </div>
    </div>
  );
};

export default ScoreTableView;

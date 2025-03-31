
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Trophy, Heart, Medal, Award } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

interface ScoreTableViewProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

// Type for sorting state
type SortField = 'name' | 'totalScore' | number; // number is for round index
type SortDirection = 'asc' | 'desc';

const ScoreTableView: React.FC<ScoreTableViewProps> = ({ players, roundHistory }) => {
  const [sortField, setSortField] = useState<SortField>('totalScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort players based on current sort settings
  const sortedPlayers = [...players].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    if (sortField === 'name') {
      return multiplier * a.name.localeCompare(b.name);
    } else if (sortField === 'totalScore') {
      return multiplier * (a.totalScore - b.totalScore);
    } else if (typeof sortField === 'number') {
      // Sort by specific round score
      const roundIndex = sortField;
      const scoreA = a.rounds[roundIndex]?.score || 0;
      const scoreB = b.rounds[roundIndex]?.score || 0;
      return multiplier * (scoreA - scoreB);
    }
    return 0;
  });

  const maxRounds = Math.max(...players.map(p => p.rounds.length));
  
  // Generate table columns
  const columns = [
    { field: 'name', label: 'Joueur' },
    ...Array.from({ length: maxRounds }, (_, i) => ({ 
      field: i, 
      label: `Manche ${i + 1}` 
    })),
    { field: 'totalScore', label: 'Total' },
  ];

  return (
    <motion.div
      className="w-full rounded-xl bg-white/80 backdrop-blur-md border border-white/40 shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.field.toString()} 
                  className={cn(
                    "font-semibold whitespace-nowrap",
                    column.field === 'name' ? 'sticky left-0 bg-white/90 z-10' : '',
                    column.field === 'totalScore' ? 'font-bold bg-dutch-blue/5' : ''
                  )}
                  sortDirection={sortField === column.field ? sortDirection : null}
                  onSort={() => handleSort(column.field as SortField)}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player, playerIndex) => (
              <TableRow key={player.id}>
                <TableCell className="sticky left-0 bg-white/90 font-medium z-10 flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                    style={{ backgroundColor: playerIndex === 0 
                      ? themeColors.primary 
                      : playerIndex === 1 
                        ? themeColors.secondary 
                        : themeColors.accent 
                    }}
                  >
                    {playerIndex + 1}
                  </div>
                  {player.name}
                </TableCell>
                {Array.from({ length: maxRounds }, (_, roundIndex) => {
                  const round = player.rounds[roundIndex];
                  const isDutch = round?.isDutch;
                  const score = round?.score;
                  
                  // Find if this was the best score in this round
                  const bestScoreInRound = Math.min(...players
                    .filter(p => p.rounds.length > roundIndex)
                    .map(p => p.rounds[roundIndex].score));
                  
                  // Find if this was the worst score in this round
                  const worstScoreInRound = Math.max(...players
                    .filter(p => p.rounds.length > roundIndex)
                    .map(p => p.rounds[roundIndex].score));
                  
                  return (
                    <TableCell 
                      key={roundIndex}
                      className={cn(
                        "text-center",
                        isDutch ? "font-bold text-dutch-orange" : "",
                        score === bestScoreInRound ? "text-dutch-blue font-semibold" : "",
                        score === worstScoreInRound ? "text-dutch-red" : ""
                      )}
                    >
                      {score !== undefined ? (
                        <div className="flex items-center justify-center gap-1">
                          {score}
                          {isDutch && <span className="text-xs bg-dutch-orange/20 text-dutch-orange px-1 rounded-full">D</span>}
                          {score === bestScoreInRound && !isDutch && <Medal className="h-3 w-3 text-dutch-blue" />}
                        </div>
                      ) : "-"}
                    </TableCell>
                  );
                })}
                <TableCell className="font-bold text-center bg-dutch-blue/5">
                  {player.totalScore}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Legend */}
      <div className="p-3 bg-white/60 border-t border-white/40 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <Trophy className="h-3 w-3 text-dutch-blue" /> 
          <span>Leader du classement</span>
        </div>
        <div className="flex items-center gap-1">
          <Medal className="h-3 w-3 text-dutch-blue" /> 
          <span>Meilleur score de la manche</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs bg-dutch-orange/20 text-dutch-orange px-1 rounded-full">D</span>
          <span>Manche Dutch</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreTableView;

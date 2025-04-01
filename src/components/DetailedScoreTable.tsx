
import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { ArrowUpDown, Trophy, TrendingDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DetailedScoreTableProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const DetailedScoreTable: React.FC<DetailedScoreTableProps> = ({ players, roundHistory }) => {
  if (!players.length) return null;

  const getBestPlayerInRound = (roundIndex: number): string | null => {
    const roundScores = roundHistory[roundIndex].scores;
    const minScore = Math.min(...roundScores);
    const minIndex = roundScores.indexOf(minScore);
    return players[minIndex]?.id || null;
  };

  const getWorstPlayerInRound = (roundIndex: number): string | null => {
    const roundScores = roundHistory[roundIndex].scores;
    const maxScore = Math.max(...roundScores);
    const maxIndex = roundScores.indexOf(maxScore);
    return players[maxIndex]?.id || null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full overflow-x-auto"
    >
      <Table className="w-full bg-white/70 backdrop-blur-md rounded-xl overflow-hidden border border-white/30 shadow-sm">
        <TableHeader className="bg-dutch-blue/5">
          <TableRow>
            <TableHead className="whitespace-nowrap font-semibold text-dutch-blue">Joueur</TableHead>
            {roundHistory.map((_, index) => (
              <TableHead key={index} className="text-center whitespace-nowrap font-medium text-dutch-blue/80">
                Manche {index + 1}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id} className="hover:bg-dutch-blue/5">
              <TableCell className="font-medium whitespace-nowrap">{player.name}</TableCell>
              {roundHistory.map((round, roundIndex) => {
                const playerIndex = players.findIndex(p => p.id === player.id);
                const score = round.scores[playerIndex];
                const isDutch = round.dutchPlayerId === player.id;
                const isBestInRound = getBestPlayerInRound(roundIndex) === player.id;
                const isWorstInRound = getWorstPlayerInRound(roundIndex) === player.id;
                
                return (
                  <TableCell 
                    key={roundIndex} 
                    className={`text-center ${isDutch ? 'relative' : ''}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {isDutch && (
                        <span className="absolute -top-1 -left-1 text-xs text-dutch-purple">
                          D
                        </span>
                      )}
                      <span className={`
                        font-medium 
                        ${isBestInRound ? 'text-green-600' : ''} 
                        ${isWorstInRound ? 'text-red-500' : ''}
                        ${isDutch ? 'text-dutch-purple' : ''}
                      `}>
                        {score}
                      </span>
                      {isBestInRound && (
                        <Trophy className="ml-1 h-3 w-3 text-green-600" />
                      )}
                      {isWorstInRound && (
                        <TrendingDown className="ml-1 h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default DetailedScoreTable;


import React from 'react';
import { Player } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { scoring, composedClasses } from '@/config/uiConfig';

interface ScoreHistoryTableProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const ScoreHistoryTable: React.FC<ScoreHistoryTableProps> = ({ players, roundHistory }) => {
  // Fonction pour déterminer le joueur gagnant de la manche
  const getRoundWinner = (roundIndex: number): string | null => {
    if (!players || !roundHistory || roundIndex >= roundHistory.length) return null;
    
    const roundScores = roundHistory[roundIndex].scores;
    let minScore = Infinity;
    let winnerId: string | null = null;
    
    players.forEach((player, playerIndex) => {
      if (roundScores[playerIndex] < minScore && roundScores[playerIndex] > 0) {
        minScore = roundScores[playerIndex];
        winnerId = player.id;
      }
    });
    
    return winnerId;
  };

  return (
    <div className={composedClasses.table}>
      <Table>
        <TableHeader className={composedClasses.tableHeader}>
          <TableRow>
            <TableHead className="w-[80px] font-medium">Manche</TableHead>
            {players.map(player => (
              <TableHead key={player.id} className="font-medium text-center">
                {player.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {roundHistory.length > 0 ? (
            roundHistory.map((round, index) => {
              const roundWinner = getRoundWinner(index);
              
              return (
                <TableRow key={index} className={composedClasses.tableRow}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  {players.map((player, playerIndex) => {
                    const isDutch = player.id === round.dutchPlayerId;
                    const isWinner = player.id === roundWinner;
                    
                    return (
                      <TableCell 
                        key={player.id} 
                        className={`text-center ${scoring.getScoreColor(round.scores[playerIndex], isDutch)} ${isWinner ? 'font-bold ring-1 ring-dutch-green/30 ring-inset' : ''}`}
                      >
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-center"
                        >
                          {round.scores[playerIndex]}
                          {isDutch && (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-1 text-xs opacity-80"
                            >
                              D
                            </motion.span>
                          )}
                          {isWinner && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-1 text-xs text-dutch-green opacity-80"
                            >
                              ★
                            </motion.span>
                          )}
                        </motion.div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={players.length + 1} className="text-center py-6 text-gray-500 italic">
                Aucune manche jouée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScoreHistoryTable;

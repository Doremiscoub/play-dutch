
import React from 'react';
import { Player } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { motion } from 'framer-motion';

interface ScoreHistoryTableProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const ScoreHistoryTable: React.FC<ScoreHistoryTableProps> = ({ players, roundHistory }) => {
  // Fonction pour déterminer la couleur de fond en fonction du score
  const getScoreColor = (score: number, isDutch: boolean) => {
    if (score === 0) return 'bg-transparent';
    if (isDutch) return 'bg-dutch-orange/20 text-dutch-orange font-medium';
    
    // Échelle de couleurs selon le score
    if (score <= 5) return 'bg-green-50 text-green-700';
    if (score <= 10) return 'bg-emerald-100/70 text-emerald-700';
    if (score <= 15) return 'bg-yellow-100/70 text-amber-700';
    if (score <= 20) return 'bg-orange-100/70 text-orange-700';
    if (score <= 30) return 'bg-orange-200/70 text-orange-800';
    if (score <= 40) return 'bg-red-200/70 text-red-700';
    return 'bg-red-300/70 text-red-800 font-medium';
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/30 bg-white/60 backdrop-blur-sm shadow-sm">
      <Table>
        <TableHeader className="bg-white/30">
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
            roundHistory.map((round, index) => (
              <TableRow key={index} className="hover:bg-white/40 transition-colors">
                <TableCell className="font-medium">{index + 1}</TableCell>
                {players.map((player, playerIndex) => {
                  const isDutch = player.id === round.dutchPlayerId;
                  return (
                    <TableCell 
                      key={player.id} 
                      className={`text-center ${getScoreColor(round.scores[playerIndex], isDutch)}`}
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
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
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

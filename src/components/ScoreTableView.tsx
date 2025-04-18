
import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DetailedScoreTable from './DetailedScoreTable';

interface ScoreTableViewProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const ScoreTableView: React.FC<ScoreTableViewProps> = ({ players, roundHistory }) => {
  if (!players.length) return (
    <div className="text-center p-8">
      <p className="text-gray-500">Aucun joueur pour le moment</p>
    </div>
  );

  return (
    <div className="space-y-6 w-full">
      {/* Tableau des scores par manche */}
      <div>
        <h3 className="text-2xl font-medium mb-3 text-gray-700">Scores par manche</h3>
        <DetailedScoreTable players={players} roundHistory={roundHistory} />
      </div>
      
      {/* Tableau des statistiques globales */}
      <div>
        <h3 className="text-2xl font-medium mb-3 text-gray-700">Statistiques globales</h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-full overflow-x-auto"
        >
          <Table className="w-full bg-white/95 rounded-xl overflow-hidden border shadow-lg">
            <TableHeader className="bg-dutch-blue/10">
              <TableRow>
                <TableHead className="whitespace-nowrap font-semibold text-dutch-blue">Joueur</TableHead>
                <TableHead className="text-center whitespace-nowrap font-medium text-dutch-blue/80">Total</TableHead>
                <TableHead className="text-center whitespace-nowrap font-medium text-dutch-blue/80">Moyenne</TableHead>
                <TableHead className="text-center whitespace-nowrap font-medium text-dutch-blue/80">Minimum</TableHead>
                <TableHead className="text-center whitespace-nowrap font-medium text-dutch-blue/80">Dutch</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => {
                const rounds = player.rounds || [];
                const total = player.totalScore;
                const average = rounds.length > 0 ? total / rounds.length : 0;
                const minScore = rounds.length > 0 ? Math.min(...rounds.map(r => r.score)) : 0;
                const dutchCount = rounds.filter(r => r.isDutch).length;
                
                return (
                  <TableRow key={player.id} className="hover:bg-dutch-blue/5">
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell className="text-center font-bold">{total}</TableCell>
                    <TableCell className="text-center">{average.toFixed(1)}</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">{minScore}</TableCell>
                    <TableCell className="text-center text-dutch-purple font-medium">{dutchCount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
};

export default ScoreTableView;

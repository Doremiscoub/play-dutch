
import React from 'react';
import { Player } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, Target, Fire, Gauge, Flame, TrendingDown } from 'lucide-react';

interface PlayerStatsTableProps {
  players: Player[];
}

const PlayerStatsTable: React.FC<PlayerStatsTableProps> = ({ players }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/30 bg-white/60 backdrop-blur-sm shadow-sm mt-4">
      <Table>
        <TableHeader className="bg-white/30">
          <TableRow>
            <TableHead className="font-medium">Joueur</TableHead>
            <TableHead className="text-center whitespace-nowrap">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="h-4 w-4 text-dutch-yellow" />
                <span>Total</span>
              </div>
            </TableHead>
            <TableHead className="text-center whitespace-nowrap">
              <div className="flex items-center justify-center gap-1">
                <Gauge className="h-4 w-4 text-dutch-blue" />
                <span>Moyenne</span>
              </div>
            </TableHead>
            <TableHead className="text-center whitespace-nowrap">
              <div className="flex items-center justify-center gap-1">
                <TrendingDown className="h-4 w-4 text-dutch-green" />
                <span>Min</span>
              </div>
            </TableHead>
            <TableHead className="text-center whitespace-nowrap">
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-dutch-red" />
                <span>Max</span>
              </div>
            </TableHead>
            <TableHead className="text-center whitespace-nowrap">
              <div className="flex items-center justify-center gap-1">
                <Fire className="h-4 w-4 text-dutch-orange" />
                <span>Dutch</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map(player => (
            <TableRow key={player.id} className="hover:bg-white/40 transition-colors">
              <TableCell className="font-medium">{player.name}</TableCell>
              <TableCell className="text-center">{player.totalScore}</TableCell>
              <TableCell className="text-center">{player.stats?.averageScore || 0}</TableCell>
              <TableCell className="text-center">{player.stats?.bestRound || '-'}</TableCell>
              <TableCell className="text-center">{player.stats?.worstRound || '-'}</TableCell>
              <TableCell className="text-center">{player.stats?.dutchCount || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayerStatsTable;

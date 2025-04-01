
import React, { useState } from 'react';
import { Player } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, Target, Flame, Gauge, TrendingDown, Zap, Award, Medal, Star, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { composedClasses, scoring } from '@/config/uiConfig';

interface PlayerStatsTableProps {
  players: Player[];
}

const PlayerStatsTable: React.FC<PlayerStatsTableProps> = ({ players }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // Fonction pour trier les joueurs selon la colonne cliquée
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Changement de direction ou réinitialisation
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      // Nouvelle colonne de tri
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Fonction pour appliquer le tri
  const sortedPlayers = React.useMemo(() => {
    if (!sortColumn || !sortDirection) {
      return [...players];
    }

    return [...players].sort((a, b) => {
      let aValue: any = null;
      let bValue: any = null;

      // Déterminer les valeurs à comparer selon la colonne
      switch (sortColumn) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'total':
          aValue = a.totalScore;
          bValue = b.totalScore;
          break;
        case 'average':
          aValue = a.stats?.averageScore || 0;
          bValue = b.stats?.averageScore || 0;
          break;
        case 'best':
          aValue = a.stats?.bestRound || Number.MAX_SAFE_INTEGER;
          bValue = b.stats?.bestRound || Number.MAX_SAFE_INTEGER;
          // Inverser la comparaison car un score plus bas est meilleur
          const temp = aValue;
          aValue = bValue;
          bValue = temp;
          break;
        case 'worst':
          aValue = a.stats?.worstRound || 0;
          bValue = b.stats?.worstRound || 0;
          break;
        case 'dutch':
          aValue = a.stats?.dutchCount || 0;
          bValue = b.stats?.dutchCount || 0;
          break;
        case 'consistency':
          aValue = a.stats?.consistencyScore || 0;
          bValue = b.stats?.consistencyScore || 0;
          break;
        case 'improvement':
          aValue = a.stats?.improvementRate || 0;
          bValue = b.stats?.improvementRate || 0;
          break;
        case 'streak':
          aValue = a.stats?.winStreak || 0;
          bValue = b.stats?.winStreak || 0;
          break;
        default:
          aValue = a.totalScore;
          bValue = b.totalScore;
      }

      // Comparaison selon la direction de tri
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [players, sortColumn, sortDirection]);

  return (
    <div className={composedClasses.table}>
      <Table>
        <TableHeader className={composedClasses.tableHeader}>
          <TableRow>
            <TableHead 
              className="font-medium cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('name')}
              sortDirection={sortColumn === 'name' ? sortDirection : null}
              onSort={() => handleSort('name')}
            >
              Joueur
            </TableHead>
            <TableHead 
              className="text-center whitespace-nowrap cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('total')}
              sortDirection={sortColumn === 'total' ? sortDirection : null}
              onSort={() => handleSort('total')}
            >
              <div className="flex items-center justify-center gap-1">
                <Trophy className="h-4 w-4 text-dutch-yellow" />
                <span>Total</span>
              </div>
            </TableHead>
            <TableHead 
              className="text-center whitespace-nowrap cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('average')}
              sortDirection={sortColumn === 'average' ? sortDirection : null}
              onSort={() => handleSort('average')}
            >
              <div className="flex items-center justify-center gap-1">
                <Gauge className="h-4 w-4 text-dutch-blue" />
                <span>Moyenne</span>
              </div>
            </TableHead>
            <TableHead 
              className="text-center whitespace-nowrap cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('best')}
              sortDirection={sortColumn === 'best' ? sortDirection : null}
              onSort={() => handleSort('best')}
            >
              <div className="flex items-center justify-center gap-1">
                <TrendingDown className="h-4 w-4 text-dutch-green" />
                <span>Min</span>
              </div>
            </TableHead>
            <TableHead 
              className="text-center whitespace-nowrap cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('worst')}
              sortDirection={sortColumn === 'worst' ? sortDirection : null}
              onSort={() => handleSort('worst')}
            >
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-dutch-red" />
                <span>Max</span>
              </div>
            </TableHead>
            <TableHead 
              className="text-center whitespace-nowrap cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('dutch')}
              sortDirection={sortColumn === 'dutch' ? sortDirection : null}
              onSort={() => handleSort('dutch')}
            >
              <div className="flex items-center justify-center gap-1">
                <Target className="h-4 w-4 text-dutch-orange" />
                <span>Dutch</span>
              </div>
            </TableHead>
            <TableHead 
              className="text-center whitespace-nowrap cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('consistency')}
              sortDirection={sortColumn === 'consistency' ? sortDirection : null}
              onSort={() => handleSort('consistency')}
            >
              <div className="flex items-center justify-center gap-1">
                <Zap className="h-4 w-4 text-dutch-purple" />
                <span>Régularité</span>
              </div>
            </TableHead>
            <TableHead 
              className="text-center whitespace-nowrap cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('improvement')}
              sortDirection={sortColumn === 'improvement' ? sortDirection : null}
              onSort={() => handleSort('improvement')}
            >
              <div className="flex items-center justify-center gap-1">
                <Award className="h-4 w-4 text-dutch-blue" />
                <span>Progression</span>
              </div>
            </TableHead>
            <TableHead 
              className="text-center whitespace-nowrap cursor-pointer hover:bg-white/40 transition-colors"
              onClick={() => handleSort('streak')}
              sortDirection={sortColumn === 'streak' ? sortDirection : null}
              onSort={() => handleSort('streak')}
            >
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 text-dutch-yellow" />
                <span>Série</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow key={player.id} className={composedClasses.tableRow}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-bold text-xs border border-white/70">
                    {player.name.charAt(0)}
                  </div>
                  <span>{player.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">{player.totalScore}</TableCell>
              <TableCell className="text-center">{player.stats?.averageScore || 0}</TableCell>
              <TableCell className="text-center">
                {player.stats?.bestRound !== null ? (
                  <motion.div 
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>{player.stats.bestRound}</span>
                    {player.stats.bestRound < 5 && player.stats.bestRound > 0 && (
                      <Medal className="h-3.5 w-3.5 ml-1 text-dutch-green" />
                    )}
                  </motion.div>
                ) : '-'}
              </TableCell>
              <TableCell className="text-center">
                {player.stats?.worstRound !== null ? player.stats.worstRound : '-'}
              </TableCell>
              <TableCell className="text-center">
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{player.stats?.dutchCount || 0}</span>
                  {(player.stats?.dutchCount || 0) > 2 && (
                    <HeartHandshake className="h-3.5 w-3.5 ml-1 text-dutch-orange" />
                  )}
                </motion.div>
              </TableCell>
              <TableCell className="text-center">
                <span className={scoring.getSkillColor(player.stats?.consistencyScore || 0, 'consistency')}>
                  {scoring.getSkillLevel(player.stats?.consistencyScore || 0, 'consistency')}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className={scoring.getSkillColor(player.stats?.improvementRate || 0, 'improvement')}>
                  {scoring.getSkillLevel(player.stats?.improvementRate || 0, 'improvement')}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{player.stats?.winStreak || 0}</span>
                  {(player.stats?.winStreak || 0) > 2 && (
                    <Star className="h-3.5 w-3.5 ml-1 text-dutch-yellow fill-dutch-yellow" />
                  )}
                </motion.div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayerStatsTable;

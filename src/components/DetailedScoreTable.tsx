
import React from 'react';
import { Player } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DESIGN_TOKENS } from '@/design';

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

  // Fonction pour déterminer la classe de style selon le score - centralisée
  const getScoreClass = (score: number): React.CSSProperties => {
    if (score <= 0) return { color: DESIGN_TOKENS.primitive.dutch.green[600], fontWeight: '600' };
    if (score <= 15) return { color: DESIGN_TOKENS.primitive.neutral[700] };
    if (score <= 25) return { color: DESIGN_TOKENS.primitive.kids.pink[500] };
    return { color: DESIGN_TOKENS.primitive.kids.pink[700], fontWeight: '600' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full overflow-x-auto"
    >
      <div className="relative w-full overflow-x-auto">
        <div className="sticky left-0 z-10 float-left bg-white/95">
          {/* Table pour la colonne fixe du joueur */}
          <Table className="w-auto bg-white/95 rounded-l-xl overflow-hidden border shadow-lg">
            <TableHeader style={{ backgroundColor: `${DESIGN_TOKENS.primitive.dutch.blue[500]}10` }}>
              <TableRow>
                <TableHead className="whitespace-nowrap font-semibold" style={{ color: DESIGN_TOKENS.primitive.dutch.blue[500] }}>Joueur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow 
                  key={`${player.id}-fixed`} 
                  className="hover:bg-opacity-5 transition-colors"
                >
                  <TableCell className="font-medium whitespace-nowrap">{player.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="overflow-x-auto ml-[80px]"> {/* Réduit l'espacement entre les colonnes */}
          {/* Table pour les scores défilants */}
          <Table className="w-auto bg-white/95 rounded-r-xl overflow-hidden border shadow-lg">
            <TableHeader style={{ backgroundColor: `${DESIGN_TOKENS.primitive.dutch.blue[500]}10` }}>
              <TableRow>
                {roundHistory.map((_, index) => (
                  <TableHead 
                    key={index} 
                    className="text-center whitespace-nowrap font-medium"
                    style={{ color: `${DESIGN_TOKENS.primitive.dutch.blue[500]}CC` }}
                  >
                    Manche {index + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow 
                  key={`${player.id}-scrollable`} 
                  className="hover:bg-opacity-5 transition-colors"
                >
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
                            <span 
                              className="absolute -top-1 -left-1 text-xs"
                              style={{ color: DESIGN_TOKENS.primitive.dutch.purple[500] }}
                            >
                              D
                            </span>
                          )}
                          <span 
                            className="font-medium"
                            style={{...getScoreClass(score), ...(isDutch ? { color: DESIGN_TOKENS.primitive.dutch.purple[500] } : {})}}
                          >
                            {score}
                          </span>
                          {isBestInRound && (
                            <Trophy className="ml-1 h-3 w-3" style={{ color: DESIGN_TOKENS.primitive.dutch.green[600] }} />
                          )}
                          {isWorstInRound && (
                            <TrendingDown className="ml-1 h-3 w-3" style={{ color: DESIGN_TOKENS.primitive.kids.pink[500] }} />
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailedScoreTable;


import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Trophy, TrendingDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DetailedScoreTableProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const DetailedScoreTable: React.FC<DetailedScoreTableProps> = ({ players, roundHistory }) => {
  const [isRendered, setIsRendered] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Marquer comme rendu après le premier montage
    setIsRendered(true);
    
    // Vérifier s'il y a des données à afficher
    const hasData = players?.length && roundHistory?.length;
    console.info("DetailedScoreTable: Montage avec données", { hasData });
    
    return () => {
      console.info("DetailedScoreTable: Démontage");
    };
  }, [players?.length, roundHistory?.length]);

  // Protection contre les données manquantes
  if (!players?.length || !roundHistory?.length) return (
    <div className="text-center p-4 text-gray-500">
      Aucune donnée disponible pour le tableau détaillé
    </div>
  );

  const getBestPlayerInRound = (roundIndex: number): string | null => {
    try {
      if (!roundHistory[roundIndex]?.scores) return null;
      
      const roundScores = roundHistory[roundIndex].scores;
      const minScore = Math.min(...roundScores);
      const minIndex = roundScores.indexOf(minScore);
      return players[minIndex]?.id || null;
    } catch (error) {
      console.error("Erreur dans getBestPlayerInRound:", error);
      return null;
    }
  };

  const getWorstPlayerInRound = (roundIndex: number): string | null => {
    try {
      if (!roundHistory[roundIndex]?.scores) return null;
      
      const roundScores = roundHistory[roundIndex].scores;
      const maxScore = Math.max(...roundScores);
      const maxIndex = roundScores.indexOf(maxScore);
      return players[maxIndex]?.id || null;
    } catch (error) {
      console.error("Erreur dans getWorstPlayerInRound:", error);
      return null;
    }
  };

  // Fonction pour déterminer la classe de style selon le score
  const getScoreClass = (score: number): string => {
    if (score <= 0) return 'text-green-600 font-semibold';
    if (score <= 15) return 'text-gray-700';
    if (score <= 25) return 'text-red-500';
    return 'text-red-800 font-semibold';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full overflow-x-auto"
      ref={tableRef}
    >
      <div className="relative w-full overflow-x-auto">
        <div className="sticky left-0 z-10 float-left bg-white/95">
          {/* Table pour la colonne fixe du joueur */}
          <Table className="w-auto bg-white/95 rounded-l-xl overflow-hidden border shadow-lg">
            <TableHeader className="bg-dutch-blue/10">
              <TableRow>
                <TableHead className="whitespace-nowrap font-semibold text-dutch-blue">Joueur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={`${player.id}-fixed`} className="hover:bg-dutch-blue/5">
                  <TableCell className="font-medium whitespace-nowrap">{player.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="overflow-x-auto ml-[80px]"> {/* Réduit l'espacement entre les colonnes */}
          {/* Table pour les scores défilants */}
          <Table className="w-auto bg-white/95 rounded-r-xl overflow-hidden border shadow-lg">
            <TableHeader className="bg-dutch-blue/10">
              <TableRow>
                {roundHistory.map((_, index) => (
                  <TableHead key={`round-header-${index}`} className="text-center whitespace-nowrap font-medium text-dutch-blue/80">
                    Manche {index + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={`${player.id}-scrollable`} className="hover:bg-dutch-blue/5">
                  {roundHistory.map((round, roundIndex) => {
                    try {
                      const playerIndex = players.findIndex(p => p.id === player.id);
                      // Vérifier que le score existe
                      const score = round?.scores && playerIndex >= 0 && playerIndex < round.scores.length 
                        ? round.scores[playerIndex] 
                        : 0;
                      const isDutch = round.dutchPlayerId === player.id;
                      const isBestInRound = getBestPlayerInRound(roundIndex) === player.id;
                      const isWorstInRound = getWorstPlayerInRound(roundIndex) === player.id;
                      
                      return (
                        <TableCell 
                          key={`${player.id}-round-${roundIndex}`} 
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
                              ${getScoreClass(score)}
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
                    } catch (error) {
                      console.error("Erreur dans le rendu d'une cellule:", error);
                      return (
                        <TableCell key={`${player.id}-round-${roundIndex}`} className="text-center">
                          -
                        </TableCell>
                      );
                    }
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

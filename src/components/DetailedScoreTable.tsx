
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
  const [isReady, setIsReady] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Utiliser un double timer pour garantir un montage propre
    const readyTimer = setTimeout(() => {
      setIsReady(true);
      
      // Marquer comme rendu après un délai supplémentaire
      const renderTimer = setTimeout(() => {
        setIsRendered(true);
      }, 50);
      
      return () => clearTimeout(renderTimer);
    }, 100);
    
    // Vérifier s'il y a des données à afficher
    const hasData = Array.isArray(players) && Array.isArray(roundHistory) && 
                   players.length > 0 && roundHistory.length > 0;
    
    console.info("DetailedScoreTable: Montage avec données", { hasData });
    
    return () => {
      console.info("DetailedScoreTable: Démontage");
      clearTimeout(readyTimer);
      setIsReady(false);
      setIsRendered(false);
    };
  }, []);

  // Protection contre les données manquantes ou invalides
  const validPlayers = Array.isArray(players) ? players.filter(p => p && typeof p === 'object') : [];
  const validRoundHistory = Array.isArray(roundHistory) ? roundHistory.filter(r => r && typeof r === 'object') : [];
  
  // Attendre que le composant soit prêt pour éviter les problèmes de rendering
  if (!isReady || validPlayers.length === 0 || validRoundHistory.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        {validPlayers.length === 0 || validRoundHistory.length === 0 
          ? "Aucune donnée disponible pour le tableau détaillé" 
          : "Chargement du tableau..."}
      </div>
    );
  }

  const getBestPlayerInRound = (roundIndex: number): string | null => {
    try {
      if (!validRoundHistory[roundIndex]?.scores) return null;
      
      const roundScores = validRoundHistory[roundIndex].scores;
      if (!Array.isArray(roundScores) || roundScores.length === 0) return null;
      
      const minScore = Math.min(...roundScores.filter(score => typeof score === 'number'));
      const minIndex = roundScores.indexOf(minScore);
      return (minIndex >= 0 && validPlayers[minIndex]) ? validPlayers[minIndex].id : null;
    } catch (error) {
      console.error("Erreur dans getBestPlayerInRound:", error);
      return null;
    }
  };

  const getWorstPlayerInRound = (roundIndex: number): string | null => {
    try {
      if (!validRoundHistory[roundIndex]?.scores) return null;
      
      const roundScores = validRoundHistory[roundIndex].scores;
      if (!Array.isArray(roundScores) || roundScores.length === 0) return null;
      
      const maxScore = Math.max(...roundScores.filter(score => typeof score === 'number'));
      const maxIndex = roundScores.indexOf(maxScore);
      return (maxIndex >= 0 && validPlayers[maxIndex]) ? validPlayers[maxIndex].id : null;
    } catch (error) {
      console.error("Erreur dans getWorstPlayerInRound:", error);
      return null;
    }
  };

  // Fonction pour déterminer la classe de style selon le score
  const getScoreClass = (score: number): string => {
    if (isNaN(score)) return 'text-gray-400';
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
              {validPlayers.map((player) => (
                <TableRow key={`${player.id || 'unknown'}-fixed`} className="hover:bg-dutch-blue/5">
                  <TableCell className="font-medium whitespace-nowrap">{player.name || 'Joueur'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="overflow-x-auto ml-[80px]">
          {/* Table pour les scores défilants */}
          <Table className="w-auto bg-white/95 rounded-r-xl overflow-hidden border shadow-lg">
            <TableHeader className="bg-dutch-blue/10">
              <TableRow>
                {validRoundHistory.map((_, index) => (
                  <TableHead key={`round-header-${index}`} className="text-center whitespace-nowrap font-medium text-dutch-blue/80">
                    Manche {index + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {validPlayers.map((player) => (
                <TableRow key={`${player.id || 'unknown'}-scrollable`} className="hover:bg-dutch-blue/5">
                  {validRoundHistory.map((round, roundIndex) => {
                    try {
                      // Vérifications de sécurité renforcées pour les données
                      if (!player || !player.id || !round || !Array.isArray(round.scores)) {
                        return (
                          <TableCell key={`${player.id || 'unknown'}-round-${roundIndex}`} className="text-center">
                            -
                          </TableCell>
                        );
                      }
                      
                      const playerIndex = validPlayers.findIndex(p => p.id === player.id);
                      // Vérifier que le score existe et est valide
                      const score = playerIndex >= 0 && playerIndex < round.scores.length && typeof round.scores[playerIndex] === 'number'
                        ? round.scores[playerIndex] 
                        : 0;
                      
                      const isDutch = round.dutchPlayerId === player.id;
                      const isBestInRound = getBestPlayerInRound(roundIndex) === player.id;
                      const isWorstInRound = getWorstPlayerInRound(roundIndex) === player.id;
                      
                      return (
                        <TableCell 
                          key={`${player.id || 'unknown'}-round-${roundIndex}`} 
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
                              {typeof score === 'number' ? score : '-'}
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
                        <TableCell key={`error-${player.id || 'unknown'}-round-${roundIndex}`} className="text-center">
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


/**
 * Panneau de statistiques globales du jeu
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { TrendingDown, Award, Target, BarChart, Medal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface GameStatsPanelProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const GameStatsPanel: React.FC<GameStatsPanelProps> = ({ players, roundHistory }) => {
  // Calculer les statistiques globales de la partie
  const totalRounds = roundHistory.length;
  
  // Initialiser ces valeurs seulement si nous avons des rounds
  let averageRoundScore = 0;
  let highestRoundScore = 0;
  let lowestRoundScore = 0;
  let totalDutchCount = 0;
  let bestPlayerName = '';
  let bestPlayerScore = Infinity;
  
  if (totalRounds > 0) {
    // Calculer le score moyen par manche (tous joueurs confondus)
    const allScores = roundHistory.flatMap(round => round.scores);
    averageRoundScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
    
    // Trouver le score le plus élevé et le plus bas
    highestRoundScore = Math.max(...allScores);
    lowestRoundScore = Math.min(...allScores);
    
    // Calculer le nombre total de Dutch
    totalDutchCount = roundHistory.filter(round => round.dutchPlayerId).length;
    
    // Trouver le meilleur joueur (score le plus bas)
    const bestPlayer = [...players].sort((a, b) => a.totalScore - b.totalScore)[0];
    if (bestPlayer) {
      bestPlayerName = bestPlayer.name;
      bestPlayerScore = bestPlayer.totalScore;
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm overflow-hidden rounded-2xl">
        <CardContent className="pt-5">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-3">
            Statistiques de la partie
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart className="h-4 w-4 text-dutch-blue mr-2" />
                <span className="text-sm text-gray-700">Total manches</span>
              </div>
              <span className="text-sm font-semibold">{totalRounds}</span>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="h-4 w-4 text-dutch-orange mr-2" />
                <span className="text-sm text-gray-700">Score moyen</span>
              </div>
              <span className="text-sm font-semibold">{averageRoundScore.toFixed(1)}</span>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingDown className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-700">Meilleur score</span>
              </div>
              <span className="text-sm font-semibold text-green-500">{lowestRoundScore}</span>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-dutch-purple mr-2" />
                <span className="text-sm text-gray-700">Total Dutch</span>
              </div>
              <span className="text-sm font-semibold text-dutch-purple">{totalDutchCount}</span>
            </div>
            
            {bestPlayerName && (
              <>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Medal className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm text-gray-700">Meilleur joueur</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-500">
                    {bestPlayerName} ({bestPlayerScore}pts)
                  </span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameStatsPanel;

/**
 * Panneau de statistiques globales du jeu
 */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { TrendingDown, Award, Target, BarChart, Medal, Flag, Zap, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface GameStatsPanelProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const GameStatsPanel: React.FC<GameStatsPanelProps> = ({ players, roundHistory }) => {
  // État local pour suivre les changements dans les rounds
  const [roundCount, setRoundCount] = useState(roundHistory.length);
  
  // Mettre à jour immédiatement quand roundHistory change
  useEffect(() => {
    setRoundCount(roundHistory.length);
    // Console log pour débogage
    console.log(`GameStatsPanel: Rounds mis à jour: ${roundHistory.length}`);
  }, [roundHistory]);
  
  // Calculer les statistiques globales de la partie
  const totalRounds = roundHistory.length;
  
  // Initialiser ces valeurs seulement si nous avons des rounds
  let averageRoundScore = 0;
  let highestRoundScore = 0;
  let lowestRoundScore = 0;
  let totalDutchCount = 0;
  let bestPlayerName = '';
  let bestPlayerScore = Infinity;
  let worstPlayerName = '';
  let worstPlayerScore = 0;
  
  if (totalRounds > 0 && players.length > 0) {
    // Calculer le score moyen par manche (tous joueurs confondus)
    const allScores = roundHistory.flatMap(round => round.scores);
    averageRoundScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
    
    // Trouver le score le plus élevé et le plus bas
    highestRoundScore = Math.max(...allScores);
    lowestRoundScore = Math.min(...allScores);
    
    // Calculer le nombre total de Dutch
    totalDutchCount = roundHistory.filter(round => round.dutchPlayerId).length;
    
    // Trouver le meilleur joueur (score le plus bas)
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    if (sortedPlayers.length > 0) {
      bestPlayerName = sortedPlayers[0].name;
      bestPlayerScore = sortedPlayers[0].totalScore;
      
      // Pire joueur (score le plus élevé) - dernier dans le tableau trié
      worstPlayerName = sortedPlayers[sortedPlayers.length - 1].name;
      worstPlayerScore = sortedPlayers[sortedPlayers.length - 1].totalScore;
    }
  }
  
  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Classe de mise en forme pour les items de stats
  const statItemClass = "flex items-center justify-between py-3";
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-md overflow-hidden rounded-3xl">
        <CardContent className="pt-6 px-5">
          <motion.h3 
            className="text-xl font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-4 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BarChart className="mr-2 h-5 w-5 text-dutch-blue" />
            Statistiques de la partie
          </motion.h3>
          
          <motion.div 
            className="space-y-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className={statItemClass} variants={itemVariants}>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-dutch-blue mr-3" />
                <span className="text-gray-700 text-md">Joueurs</span>
              </div>
              <div className="bg-dutch-blue/10 px-3 py-1 rounded-full">
                <span className="text-lg font-bold text-dutch-blue">{players.length}</span>
              </div>
            </motion.div>
            
            <Separator className="my-3" />
            
            <motion.div className={statItemClass} variants={itemVariants}>
              <div className="flex items-center">
                <Flag className="h-6 w-6 text-dutch-purple mr-3" />
                <span className="text-gray-700 text-md">Manches jouées</span>
              </div>
              <div className="bg-dutch-purple/10 px-3 py-1 rounded-full">
                <span className="text-lg font-bold text-dutch-purple">{totalRounds}</span>
              </div>
            </motion.div>
            
            <Separator className="my-3" />
            
            <motion.div className={statItemClass} variants={itemVariants}>
              <div className="flex items-center">
                <Target className="h-6 w-6 text-dutch-orange mr-3" />
                <span className="text-gray-700 text-md">Score moyen</span>
              </div>
              <div className="bg-dutch-orange/10 px-3 py-1 rounded-full">
                <span className="text-lg font-bold text-dutch-orange">{averageRoundScore.toFixed(1)}</span>
              </div>
            </motion.div>
            
            <Separator className="my-3" />
            
            <motion.div className={statItemClass} variants={itemVariants}>
              <div className="flex items-center">
                <TrendingDown className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-gray-700 text-md">Meilleur score</span>
              </div>
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-lg font-bold text-green-500">{lowestRoundScore}</span>
              </div>
            </motion.div>
            
            <Separator className="my-3" />
            
            <motion.div className={statItemClass} variants={itemVariants}>
              <div className="flex items-center">
                <Award className="h-6 w-6 text-dutch-purple mr-3" />
                <span className="text-gray-700 text-md">Total Dutch</span>
              </div>
              <div className="bg-dutch-purple/10 px-3 py-1 rounded-full">
                <span className="text-lg font-bold text-dutch-purple">{totalDutchCount}</span>
              </div>
            </motion.div>
            
            {bestPlayerName && (
              <>
                <Separator className="my-3" />
                
                <motion.div className={statItemClass} variants={itemVariants}>
                  <div className="flex items-center">
                    <Medal className="h-6 w-6 text-amber-500 mr-3" />
                    <span className="text-gray-700 text-md">Meilleur joueur</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-amber-500">
                      {bestPlayerName}
                    </span>
                    <div className="text-sm bg-amber-100 px-2 py-0.5 rounded-full font-semibold text-amber-500 mt-1">
                      {bestPlayerScore} pts
                    </div>
                  </div>
                </motion.div>
              </>
            )}
            
            {worstPlayerName && players.length > 1 && (
              <>
                <Separator className="my-3" />
                
                <motion.div className={statItemClass} variants={itemVariants}>
                  <div className="flex items-center">
                    <Zap className="h-6 w-6 text-red-500 mr-3" />
                    <span className="text-gray-700 text-md">Joueur en difficulté</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-red-500">
                      {worstPlayerName}
                    </span>
                    <div className="text-sm bg-red-100 px-2 py-0.5 rounded-full font-semibold text-red-500 mt-1">
                      {worstPlayerScore} pts
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameStatsPanel;

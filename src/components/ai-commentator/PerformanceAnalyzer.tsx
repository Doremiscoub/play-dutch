
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { TrendingUp, TrendingDown, Target, Zap, Trophy, AlertTriangle } from 'lucide-react';
import { GameBadge } from '../ui/game-badge';

interface PerformanceAnalyzerProps {
  player: Player;
  roundCount: number;
  position: number;
  totalPlayers: number;
}

export const PerformanceAnalyzer: React.FC<PerformanceAnalyzerProps> = ({
  player,
  roundCount,
  position,
  totalPlayers
}) => {
  if (!player.stats || roundCount < 3) return null;

  const stats = player.stats;
  const analysis = analyzePerformance(player, position, totalPlayers);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/40"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {analysis.icon}
          <span className="text-sm font-semibold text-gray-800">{analysis.title}</span>
        </div>
        <GameBadge
          type={analysis.performance === 'excellent' ? 'epic' : 
                analysis.performance === 'good' ? 'rare' : 'common'}
          size="xs"
          text={analysis.performance}
        />
      </div>
      
      <p className="text-xs text-gray-600 mb-2">{analysis.description}</p>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="font-semibold text-gray-800">{stats.consistencyScore.toFixed(1)}</div>
          <div className="text-gray-500">Régularité</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-800">{stats.averageScore.toFixed(1)}</div>
          <div className="text-gray-500">Moyenne</div>
        </div>
        <div className="text-center">
          <div className={`font-semibold ${stats.improvementRate < 0 ? 'text-green-600' : 'text-orange-600'}`}>
            {stats.improvementRate > 0 ? '+' : ''}{stats.improvementRate.toFixed(1)}
          </div>
          <div className="text-gray-500">Tendance</div>
        </div>
      </div>

      {analysis.advice && (
        <div className="mt-2 p-2 bg-dutch-blue/10 rounded-lg border border-dutch-blue/20">
          <p className="text-xs text-dutch-blue font-medium">{analysis.advice}</p>
        </div>
      )}
    </motion.div>
  );
};

// Fonction d'analyse des performances
const analyzePerformance = (player: Player, position: number, totalPlayers: number) => {
  const stats = player.stats!;
  const isLeading = position === 1;
  const isLosing = position === totalPlayers;
  
  // Performance globale
  let performance: 'excellent' | 'good' | 'average' | 'poor' = 'average';
  
  if (stats.averageScore < 8 && stats.consistencyScore < 6) {
    performance = 'excellent';
  } else if (stats.averageScore < 12 && stats.consistencyScore < 8) {
    performance = 'good';
  } else if (stats.averageScore > 15 || stats.consistencyScore > 12) {
    performance = 'poor';
  }

  // Analyse des tendances
  const isTrendingUp = stats.improvementRate < -1;
  const isTrendingDown = stats.improvementRate > 1;
  
  // Génération du feedback
  let title = '';
  let description = '';
  let icon = <Target className="h-4 w-4 text-gray-600" />;
  let advice = '';

  if (performance === 'excellent') {
    title = 'Performance Exceptionnelle';
    description = 'Jeu régulier et efficace. Continuez sur cette lancée !';
    icon = <Trophy className="h-4 w-4 text-yellow-600" />;
    advice = isLeading ? 'Maintenez la pression !' : 'Vous êtes sur la bonne voie pour remonter !';
  } else if (isTrendingUp) {
    title = 'En Progression';
    description = 'Amélioration notable ! Votre stratégie porte ses fruits.';
    icon = <TrendingUp className="h-4 w-4 text-green-600" />;
    advice = 'Gardez cette dynamique positive !';
  } else if (isTrendingDown) {
    title = 'Attention !';
    description = 'Baisse de performance récente. Il faut réagir.';
    icon = <TrendingDown className="h-4 w-4 text-red-600" />;
    advice = 'Changez de stratégie ou prenez moins de risques.';
  } else if (stats.consistencyScore > 10) {
    title = 'Jeu Imprévisible';
    description = 'Beaucoup de variation dans vos scores.';
    icon = <Zap className="h-4 w-4 text-amber-600" />;
    advice = 'Misez sur la régularité pour de meilleurs résultats.';
  } else if (isLosing) {
    title = 'Remontada Possible';
    description = 'Position difficile mais rien n\'est joué !';
    icon = <AlertTriangle className="h-4 w-4 text-orange-600" />;
    advice = 'Un Dutch bien placé peut tout changer !';
  } else {
    title = 'Performance Stable';
    description = 'Jeu correct sans surprise notable.';
    icon = <Target className="h-4 w-4 text-blue-600" />;
    advice = 'Cherchez des opportunités pour prendre l\'avantage !';
  }

  return {
    performance,
    title,
    description,
    icon,
    advice
  };
};

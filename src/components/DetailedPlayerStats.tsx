
import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Trophy, TrendingDown, TrendingUp, Star, Flag, Award, BarChart3, ArrowRight, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { usePlayerStats } from '@/hooks/use-player-stats';
import { cn } from '@/lib/utils';

interface DetailedPlayerStatsProps {
  player: Player;
  isExpanded: boolean;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
  allPlayers?: Player[];
}

const DetailedPlayerStats: React.FC<DetailedPlayerStatsProps> = ({ 
  player, 
  isExpanded, 
  onToggle,
  isFirst,
  isLast,
  allPlayers = []
}) => {
  const stats = usePlayerStats(player, allPlayers.length ? allPlayers : [player]);
  
  const renderStatsBadge = (label: string, value: string | number | null, icon: React.ReactNode, color: string = "bg-gray-100 text-gray-700") => {
    if (value === null) return null;
    
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${color}`}>
        {icon}
        <div className="flex flex-col">
          <span className="text-xs font-medium">{label}</span>
          <span className="font-bold text-sm">{value}</span>
        </div>
      </div>
    );
  };
  
  const getPositionStyle = () => {
    if (isFirst) {
      return "border-l-dutch-yellow";
    } else if (isLast) {
      return "border-l-dutch-orange";
    }
    return "border-l-gray-300";
  };
  
  return (
    <motion.div 
      className={`rounded-xl bg-white/80 backdrop-blur-sm shadow-sm border ${isFirst ? 'border-dutch-yellow/30' : isLast ? 'border-dutch-orange/30' : 'border-gray-200/60'} overflow-hidden border-l-4 ${getPositionStyle()}`}
      layout
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${isFirst ? 'bg-dutch-yellow' : isLast ? 'bg-dutch-orange' : 'bg-gray-400'}`}>
            {isFirst ? <Trophy className="h-4 w-4" /> : player.name.charAt(0).toUpperCase()}
          </div>
          
          <div>
            <h3 className="font-semibold">{player.name}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="font-medium">{player.totalScore} pts</span>
              
              {stats.improvementRate !== 0 && (
                <span className={`flex items-center ${stats.improvementRate < 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {stats.improvementRate < 0 ? (
                    <>
                      <TrendingDown className="h-3 w-3 mr-0.5" /> 
                      {Math.abs(stats.improvementRate)}
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-3 w-3 mr-0.5" /> 
                      {stats.improvementRate}
                    </>
                  )}
                </span>
              )}
              
              {stats.dutchCount > 0 && (
                <span className="flex items-center text-dutch-orange">
                  <Flag className="h-3 w-3 mr-0.5" /> 
                  {stats.dutchCount}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 rounded-full"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </Button>
      </div>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 pb-4"
        >
          <div className="space-y-4">
            {/* Statistiques principales */}
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {renderStatsBadge(
                "Meilleur", 
                stats.bestRound, 
                <Star className="h-4 w-4 text-dutch-blue" />,
                "bg-dutch-blue/10 text-dutch-blue"
              )}
              
              {renderStatsBadge(
                "Pire", 
                stats.worstRound, 
                <Flag className="h-4 w-4 text-dutch-red" />,
                "bg-dutch-red/10 text-dutch-red"
              )}
              
              {renderStatsBadge(
                "Moyenne", 
                stats.averageScore, 
                <BarChart3 className="h-4 w-4 text-dutch-purple" />,
                "bg-dutch-purple/10 text-dutch-purple"
              )}
              
              {renderStatsBadge(
                "Manches", 
                stats.totalRounds, 
                <Clock className="h-4 w-4 text-dutch-green" />,
                "bg-dutch-green/10 text-dutch-green"
              )}
            </div>
            
            {/* Statistiques de performance */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Performance</h4>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">Victoires</span>
                    <span>{stats.roundsWon}/{stats.totalRounds} ({stats.roundsWonPercentage}%)</span>
                  </div>
                  <Progress value={stats.roundsWonPercentage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">Dutch réussis</span>
                    <span>{stats.dutchCount > 0 ? `${stats.dutchSuccessRate}%` : 'N/A'}</span>
                  </div>
                  <Progress value={stats.dutchSuccessRate} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">Consistance</span>
                    <span>{100 - Math.min(100, stats.consistencyScore * 5)}%</span>
                  </div>
                  <Progress value={100 - Math.min(100, stats.consistencyScore * 5)} className="h-2" />
                </div>
              </div>
            </div>
            
            {/* Badges */}
            {stats.playStyle && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Style de jeu</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className={cn(
                    "py-1",
                    stats.playStyle === 'Stratège' ? "bg-dutch-blue text-white" :
                    stats.playStyle === 'Équilibré' ? "bg-dutch-green text-white" :
                    stats.playStyle === 'Agressif' ? "bg-dutch-red text-white" :
                    stats.playStyle === 'Défensif' ? "bg-dutch-purple text-white" :
                    "bg-dutch-orange text-white"
                  )}>
                    <Target className="h-3 w-3 mr-1" />
                    {stats.playStyle}
                  </Badge>
                  
                  {stats.winStreak >= 2 && (
                    <Badge variant="outline" className="border-dutch-blue/30 bg-dutch-blue/5 text-dutch-blue">
                      <Trophy className="h-3 w-3 mr-1" />
                      {stats.winStreak} victoires d'affilée
                    </Badge>
                  )}
                  
                  {stats.dutchCount > 1 && (
                    <Badge variant="outline" className="border-dutch-orange/30 bg-dutch-orange/5 text-dutch-orange">
                      <Flag className="h-3 w-3 mr-1" />
                      {stats.dutchCount} Dutch
                    </Badge>
                  )}
                  
                  {stats.improvementRate < -5 && (
                    <Badge variant="outline" className="border-dutch-green/30 bg-dutch-green/5 text-dutch-green">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      En progression
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Historique des manches */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Historique</h4>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {player.rounds.map((round, index) => {
                  const isWinningRound = allPlayers.every(p => 
                    p.id === player.id || 
                    (p.rounds[index] && round.score <= p.rounds[index].score)
                  );
                  
                  return (
                    <div 
                      key={index}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium 
                        ${round.isDutch 
                          ? 'bg-dutch-orange text-white shadow-md' 
                          : isWinningRound 
                            ? 'bg-dutch-green/20 text-dutch-green border border-dutch-green/30' 
                            : 'bg-gray-100 text-gray-700'}`}
                      title={`Manche ${index + 1}: ${round.score} points${round.isDutch ? ' (Dutch)' : ''}${isWinningRound ? ' (Gagné)' : ''}`}
                    >
                      {round.score}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DetailedPlayerStats;

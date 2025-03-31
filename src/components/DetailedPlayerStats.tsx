
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, Target, Zap, Gauge, Star, TrendingDown, ChevronDown, ChevronUp, Flame, Fire } from 'lucide-react';
import ProfCartouche from './ProfCartouche';

interface DetailedPlayerStatsProps {
  player: Player;
  isExpanded: boolean;
  onToggle: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const DetailedPlayerStats: React.FC<DetailedPlayerStatsProps> = ({ 
  player, 
  isExpanded, 
  onToggle,
  isFirst = false,
  isLast = false
}) => {
  if (!player.stats) return null;
  
  const getSkillLevel = (value: number, type: 'consistency' | 'improvement'): string => {
    if (type === 'consistency') {
      if (value <= 3) return "Chirurgical";
      if (value <= 6) return "Stable";
      if (value <= 10) return "Variable";
      return "Chaotique";
    } else {
      if (value < -5) return "En chute libre";
      if (value < 0) return "Décline";
      if (value === 0) return "Stable";
      if (value < 5) return "Progresse";
      return "En feu";
    }
  };
  
  const getSkillColor = (value: number, type: 'consistency' | 'improvement'): string => {
    if (type === 'consistency') {
      if (value <= 3) return "text-green-600";
      if (value <= 6) return "text-blue-600";
      if (value <= 10) return "text-orange-500";
      return "text-red-500";
    } else {
      if (value < -5) return "text-red-600";
      if (value < 0) return "text-orange-500";
      if (value === 0) return "text-gray-600";
      if (value < 5) return "text-blue-500";
      return "text-green-600";
    }
  };
  
  return (
    <motion.div 
      layout
      className="w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isFirst ? 0.1 : 0, duration: 0.3 }}
    >
      <motion.div 
        className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-sm overflow-hidden"
        whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="px-4 py-3 flex items-center justify-between cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-bold text-lg border-2 border-white/50">
              {player.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{player.name}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Trophy className="h-3.5 w-3.5 mr-1 text-dutch-yellow" />
                <span>{player.totalScore} pts</span>
                {player.stats.dutchCount > 0 && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 bg-dutch-orange/20 text-dutch-orange rounded-full">
                    {player.stats.dutchCount}× Dutch
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </motion.div>
          </div>
        </div>
        
        <AnimatedContent isExpanded={isExpanded}>
          <div className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <StatItem 
                  icon={<Gauge className="h-4 w-4 text-dutch-blue" />}
                  label="Moyenne par manche"
                  value={`${player.stats.averageScore} pts`}
                />
                
                <StatItem 
                  icon={<TrendingDown className="h-4 w-4 text-dutch-green" />}
                  label="Meilleur score"
                  value={`${player.stats.bestRound || '-'} pts`}
                />
                
                <StatItem 
                  icon={<Flame className="h-4 w-4 text-dutch-red" />}
                  label="Pire score"
                  value={`${player.stats.worstRound || '-'} pts`}
                />
              </div>
              
              <div className="space-y-3">
                <StatItem 
                  icon={<Zap className="h-4 w-4 text-dutch-orange" />}
                  label="Consistency"
                  value={getSkillLevel(player.stats.consistencyScore, 'consistency')}
                  valueColor={getSkillColor(player.stats.consistencyScore, 'consistency')}
                  tooltip={`Score: ${player.stats.consistencyScore}`}
                />
                
                <StatItem 
                  icon={<Target className="h-4 w-4 text-dutch-purple" />}
                  label="Progression"
                  value={getSkillLevel(player.stats.improvementRate, 'improvement')}
                  valueColor={getSkillColor(player.stats.improvementRate, 'improvement')}
                  tooltip={`Taux: ${player.stats.improvementRate > 0 ? '+' : ''}${player.stats.improvementRate}`}
                />
                
                <StatItem 
                  icon={<Star className="h-4 w-4 text-dutch-yellow" />}
                  label="Win streak"
                  value={`${player.stats.winStreak} ${player.stats.winStreak > 1 ? 'manches' : 'manche'}`}
                />
              </div>
            </div>
            
            {isLast && (
              <div className="mt-4">
                <ProfCartouche players={[player]} roundNumber={player.rounds.length} view="table" />
              </div>
            )}
          </div>
        </AnimatedContent>
      </motion.div>
    </motion.div>
  );
};

interface AnimatedContentProps {
  isExpanded: boolean;
  children: React.ReactNode;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({ isExpanded, children }) => {
  return (
    <motion.div
      className="overflow-hidden"
      initial={false}
      animate={{ 
        height: isExpanded ? 'auto' : 0,
        opacity: isExpanded ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
  tooltip?: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, valueColor = 'text-gray-800', tooltip }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className={`font-medium ${valueColor} flex items-center`} title={tooltip}>
        {value}
      </div>
    </div>
  );
};

export default DetailedPlayerStats;

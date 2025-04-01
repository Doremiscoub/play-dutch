
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { 
  Trophy, Target, Zap, Gauge, Star, TrendingDown, ChevronDown, 
  ChevronUp, Flame, Award, Heart, HeartHandshake, Crown, Target as TargetIcon,
  CircleOff, Medal, Smile, Frown, Lightbulb
} from 'lucide-react';
import ProfCartouche from './ProfCartouche';
import { composedClasses, scoring } from '@/config/uiConfig';

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
  
  const getHighlight = (): { icon: React.ReactNode; text: string; color: string } | null => {
    if (player.stats.winStreak >= 3) {
      return {
        icon: <Crown className="h-4 w-4" />,
        text: `Série de ${player.stats.winStreak} victoires !`,
        color: "text-dutch-yellow"
      };
    }
    
    if (player.stats.dutchCount >= 3) {
      return {
        icon: <HeartHandshake className="h-4 w-4" />,
        text: "Expert Dutch !",
        color: "text-dutch-orange"
      };
    }
    
    if (player.stats.bestRound !== null && player.stats.bestRound <= 3 && player.stats.bestRound > 0) {
      return {
        icon: <Medal className="h-4 w-4" />,
        text: "Performance exceptionnelle !",
        color: "text-dutch-green"
      };
    }
    
    if (player.stats.consistencyScore <= 3) {
      return {
        icon: <Zap className="h-4 w-4" />,
        text: "Joueur très régulier !",
        color: "text-dutch-blue"
      };
    }
    
    if (player.stats.improvementRate >= 5) {
      return {
        icon: <Lightbulb className="h-4 w-4" />,
        text: "En grande progression !",
        color: "text-dutch-purple"
      };
    }
    
    return null;
  };
  
  const highlight = getHighlight();
  
  return (
    <motion.div 
      layout
      className="w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isFirst ? 0.1 : 0, duration: 0.3 }}
    >
      <motion.div 
        className={composedClasses.card}
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
                
                {highlight && (
                  <div className={`ml-2 flex items-center gap-1 ${highlight.color} text-xs`}>
                    {highlight.icon}
                    <span>{highlight.text}</span>
                  </div>
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
                
                <StatItem 
                  icon={<Target className="h-4 w-4 text-dutch-orange" />}
                  label="Nombre de Dutch"
                  value={`${player.stats.dutchCount}`}
                />
              </div>
              
              <div className="space-y-3">
                <StatItem 
                  icon={<Zap className="h-4 w-4 text-dutch-orange" />}
                  label="Régularité"
                  value={scoring.getSkillLevel(player.stats.consistencyScore, 'consistency')}
                  valueColor={scoring.getSkillColor(player.stats.consistencyScore, 'consistency')}
                  tooltip={`Score: ${player.stats.consistencyScore}`}
                />
                
                <StatItem 
                  icon={<Award className="h-4 w-4 text-dutch-purple" />}
                  label="Progression"
                  value={scoring.getSkillLevel(player.stats.improvementRate, 'improvement')}
                  valueColor={scoring.getSkillColor(player.stats.improvementRate, 'improvement')}
                  tooltip={`Taux: ${player.stats.improvementRate > 0 ? '+' : ''}${player.stats.improvementRate}`}
                />
                
                <StatItem 
                  icon={<Star className="h-4 w-4 text-dutch-yellow" />}
                  label="Série de victoires"
                  value={`${player.stats.winStreak} ${player.stats.winStreak > 1 ? 'manches' : 'manche'}`}
                />
                
                <StatItem 
                  icon={<Heart className="h-4 w-4 text-dutch-red" />}
                  label="Manches jouées"
                  value={`${player.rounds.length}`}
                />
              </div>
            </div>
            
            {isLast && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <HeartHandshake className="h-4 w-4 text-dutch-purple" />
                  <span>Performances</span>
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <PerformanceIndicator 
                    title="Taux Dutch réussis"
                    value={player.stats.dutchCount > 0 ? 
                      `${Math.round((player.rounds.filter(r => r.isDutch && r.score === 0).length / player.stats.dutchCount) * 100)}%` 
                      : "N/A"}
                    icon={player.stats.dutchCount > 0 && 
                          (player.rounds.filter(r => r.isDutch && r.score === 0).length / player.stats.dutchCount) > 0.5 ? 
                          <Smile className="h-4 w-4 text-dutch-green" /> : 
                          <Frown className="h-4 w-4 text-dutch-orange" />}
                  />
                  
                  <PerformanceIndicator 
                    title="Manches gagnées"
                    value={player.rounds.length > 0 ? 
                      `${Math.round((player.rounds.filter((_, i) => 
                        player.rounds[i].score === Math.min(...players.map(p => p.rounds[i]?.score || Infinity))
                      ).length / player.rounds.length) * 100)}%` 
                      : "N/A"}
                    icon={<Crown className="h-4 w-4 text-dutch-yellow" />}
                  />
                  
                  <PerformanceIndicator 
                    title="Manches à 0 pt"
                    value={player.rounds.length > 0 ? 
                      `${Math.round((player.rounds.filter(r => r.score === 0).length / player.rounds.length) * 100)}%` 
                      : "N/A"}
                    icon={<CircleOff className="h-4 w-4 text-dutch-green" />}
                  />
                  
                  <PerformanceIndicator 
                    title="Amélioration"
                    value={player.stats.improvementRate > 0 ? 
                      `+${player.stats.improvementRate} pts` : 
                      `${player.stats.improvementRate} pts`}
                    icon={player.stats.improvementRate > 0 ? 
                          <TargetIcon className="h-4 w-4 text-dutch-green" /> : 
                          <TargetIcon className="h-4 w-4 text-dutch-red" />}
                  />
                </div>
              </div>
            )}
            
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

interface PerformanceIndicatorProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white/50 rounded-lg p-2 flex flex-col items-center">
      <div className="text-xs font-medium text-gray-500 mb-1">{title}</div>
      <div className="flex items-center gap-1">
        {icon}
        <span className="font-semibold text-gray-800">{value}</span>
      </div>
    </div>
  );
};

export default DetailedPlayerStats;

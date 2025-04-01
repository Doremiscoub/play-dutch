
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  getGameSession, 
  getGamePlayers, 
  getGamePlayerStats 
} from '@/utils/gameInvitation';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Award, Zap, AlertTriangle, Activity, Crown, Medal, Star, Heart } from 'lucide-react';
import PlayerBadges from './PlayerBadges';

interface MultiplayerStatsProps {
  gameId: string;
}

const MultiplayerStats: React.FC<MultiplayerStatsProps> = ({ gameId }) => {
  const [playerStats, setPlayerStats] = useState<any[]>([]);
  const [statType, setStatType] = useState<string>('overview');
  
  const fetchStats = useCallback(() => {
    if (!gameId) return;
    
    const players = getGamePlayers(gameId);
    const stats = getGamePlayerStats(gameId);
    
    // Combine player info with stats
    const combinedStats = players.map(player => {
      const playerStat = stats.find((s: any) => s.id === player.id) || {};
      return {
        ...player,
        ...playerStat
      };
    });
    
    setPlayerStats(combinedStats);
  }, [gameId]);
  
  useEffect(() => {
    if (!gameId) return;
    
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    
    return () => clearInterval(interval);
  }, [gameId, fetchStats]);
  
  const renderStatValue = (player: any, type: string) => {
    if (!player.stats) return 'N/A';
    
    switch (type) {
      case 'overview':
        return player.stats.averageScore || 'N/A';
      case 'dutch':
        return player.stats.dutchCount || '0';
      case 'best':
        return player.stats.bestRound || 'N/A';
      case 'worst':
        return player.stats.worstRound || 'N/A';
      case 'streak':
        return player.stats.winStreak || '0';
      default:
        return 'N/A';
    }
  };
  
  const getStatLabel = (type: string) => {
    switch (type) {
      case 'overview': return 'Moy.';
      case 'dutch': return 'Dutch';
      case 'best': return 'Meilleur';
      case 'worst': return 'Pire';
      case 'streak': return 'Série';
      default: return '';
    }
  };
  
  const getStatIcon = (type: string) => {
    switch (type) {
      case 'overview': 
        return <Activity className="h-4 w-4 text-dutch-blue" />;
      case 'dutch': 
        return <Zap className="h-4 w-4 text-dutch-orange" />;
      case 'best': 
        return <Award className="h-4 w-4 text-dutch-green" />;
      case 'worst': 
        return <AlertTriangle className="h-4 w-4 text-dutch-red" />;
      case 'streak': 
        return <TrendingUp className="h-4 w-4 text-dutch-purple" />;
      default: 
        return null;
    }
  };
  
  const getBgColorClass = (type: string) => {
    switch (type) {
      case 'overview': return 'bg-dutch-blue/10 text-dutch-blue';
      case 'dutch': return 'bg-dutch-orange/10 text-dutch-orange';
      case 'best': return 'bg-dutch-green/10 text-dutch-green';
      case 'worst': return 'bg-dutch-red/10 text-dutch-red';
      case 'streak': return 'bg-dutch-purple/10 text-dutch-purple';
      default: return 'bg-dutch-blue/10 text-dutch-blue';
    }
  };
  
  return (
    <Card className="border border-white/50 bg-white/80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10">
        <CardTitle className="text-lg font-semibold text-dutch-purple flex items-center">
          <Crown className="h-5 w-5 mr-2 text-dutch-purple" />
          Statistiques Multijoueur
        </CardTitle>
        <ToggleGroup 
          type="single" 
          value={statType} 
          onValueChange={(value) => value && setStatType(value)}
          className="justify-center mt-3 w-full flex flex-wrap gap-1 pb-1"
          size="sm"
        >
          <ToggleGroupItem value="overview" className="flex-1 rounded-lg text-xs px-2 py-1.5 flex items-center justify-center">
            <Activity className="h-3 w-3 mr-1 sm:mr-1.5" />
            <span className="hidden xs:inline">Aperçu</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="dutch" className="flex-1 rounded-lg text-xs px-2 py-1.5 flex items-center justify-center">
            <Zap className="h-3 w-3 mr-1 sm:mr-1.5" />
            <span className="hidden xs:inline">Dutch</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="best" className="flex-1 rounded-lg text-xs px-2 py-1.5 flex items-center justify-center">
            <Award className="h-3 w-3 mr-1 sm:mr-1.5" />
            <span className="hidden xs:inline">Meilleur</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="worst" className="flex-1 rounded-lg text-xs px-2 py-1.5 flex items-center justify-center">
            <AlertTriangle className="h-3 w-3 mr-1 sm:mr-1.5" />
            <span className="hidden xs:inline">Pire</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="streak" className="flex-1 rounded-lg text-xs px-2 py-1.5 flex items-center justify-center">
            <TrendingUp className="h-3 w-3 mr-1 sm:mr-1.5" />
            <span className="hidden xs:inline">Série</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="p-4">
        <AnimatePresence>
          <div className="space-y-2">
            {playerStats.map((player, index) => (
              <motion.div 
                key={player.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between bg-white/70 rounded-xl p-3 border border-white/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                layout
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3 ring-2 ring-white shadow-sm">
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 text-dutch-blue font-bold">
                      {player.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800 flex items-center">
                      {player.name}
                      {!player.online && (
                        <Badge className="ml-2 bg-gray-100 text-gray-500 border-none text-xs py-0">Hors ligne</Badge>
                      )}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs text-gray-500">
                        {player.totalScore || 0} points
                      </p>
                      <PlayerBadges player={player} className="scale-90" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Badge className={`border-none text-xs py-1 px-2 flex items-center gap-1 ${getBgColorClass(statType)}`}>
                    {getStatIcon(statType)}
                    {getStatLabel(statType)}
                  </Badge>
                  <p className="text-lg font-bold text-dutch-purple mt-1 flex items-center justify-center">
                    {renderStatValue(player, statType)}
                    {statType === 'streak' && parseInt(renderStatValue(player, statType)) > 2 && (
                      <Star className="h-3 w-3 ml-1 text-dutch-yellow fill-dutch-yellow" />
                    )}
                    {statType === 'best' && parseInt(renderStatValue(player, statType)) < 5 && parseInt(renderStatValue(player, statType)) > 0 && (
                      <Medal className="h-3 w-3 ml-1 text-dutch-green" />
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {playerStats.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-gray-500 flex flex-col items-center"
              >
                <Activity className="h-10 w-10 mb-2 text-gray-300" />
                <p>Aucune statistique disponible</p>
                <p className="text-xs text-gray-400 mt-1">Les statistiques apparaîtront après quelques manches</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default MultiplayerStats;

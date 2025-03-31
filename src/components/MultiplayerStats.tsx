
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  getGameSession, 
  getGamePlayers, 
  getGamePlayerStats 
} from '@/utils/gameInvitation';
import { motion } from 'framer-motion';

interface MultiplayerStatsProps {
  gameId: string;
}

const MultiplayerStats: React.FC<MultiplayerStatsProps> = ({ gameId }) => {
  const [playerStats, setPlayerStats] = useState<any[]>([]);
  const [statType, setStatType] = useState<string>('overview');
  
  useEffect(() => {
    if (!gameId) return;
    
    const fetchStats = () => {
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
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    
    return () => clearInterval(interval);
  }, [gameId]);
  
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
  
  return (
    <Card className="border border-white/50 bg-white/80 backdrop-blur-md rounded-3xl shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-dutch-purple">
          Statistiques Multijoueur
        </CardTitle>
        <ToggleGroup 
          type="single" 
          value={statType} 
          onValueChange={(value) => value && setStatType(value)}
          className="justify-center mt-2"
        >
          <ToggleGroupItem value="overview">Aperçu</ToggleGroupItem>
          <ToggleGroupItem value="dutch">Dutch</ToggleGroupItem>
          <ToggleGroupItem value="best">Meilleur</ToggleGroupItem>
          <ToggleGroupItem value="worst">Pire</ToggleGroupItem>
          <ToggleGroupItem value="streak">Série</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {playerStats.map((player, index) => (
            <motion.div 
              key={player.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center justify-between bg-white/70 rounded-xl p-3 border border-white/50 shadow-sm"
            >
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback className="bg-dutch-blue/10 text-dutch-blue">
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
                  <p className="text-xs text-gray-500">
                    {player.totalScore || 0} points
                  </p>
                </div>
              </div>
              <div className="text-center">
                <Badge className="bg-dutch-purple/10 text-dutch-purple border-none text-xs py-1 px-2">
                  {getStatLabel(statType)}
                </Badge>
                <p className="text-lg font-bold text-dutch-purple mt-1">
                  {renderStatValue(player, statType)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiplayerStats;

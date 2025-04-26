import React, { useState, useEffect } from 'react';
import { Game } from '@/types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import GameHistory from '@/components/GameHistory';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModernTitle } from '@/components/ui/modern-title';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [stats, setStats] = useState<{
    totalGames: number;
    totalRounds: number;
    totalPlayers: number;
    mostFrequentWinner: { name: string; wins: number } | null;
  }>({
    totalGames: 0,
    totalRounds: 0,
    totalPlayers: 0,
    mostFrequentWinner: null,
  });

  useEffect(() => {
    const savedGames = localStorage.getItem('dutch_games');
    const parsedGames: Game[] = savedGames ? JSON.parse(savedGames) : [];
    
    setGames(parsedGames);
    
    if (parsedGames.length > 0) {
      const totalRounds = parsedGames.reduce((sum, game) => sum + game.rounds, 0);
      
      const playerSet = new Set<string>();
      parsedGames.forEach(game => {
        game.players.forEach(player => {
          playerSet.add(player.name);
        });
      });
      
      const winnerCount: Record<string, number> = {};
      parsedGames.forEach(game => {
        winnerCount[game.winner] = (winnerCount[game.winner] || 0) + 1;
      });
      
      const mostFrequentWinner = Object.entries(winnerCount).sort((a, b) => b[1] - a[1])[0];
      
      setStats({
        totalGames: parsedGames.length,
        totalRounds,
        totalPlayers: playerSet.size,
        mostFrequentWinner: mostFrequentWinner 
          ? { name: mostFrequentWinner[0], wins: mostFrequentWinner[1] }
          : null,
      });
    }
  }, []);

  const tabOptions = [
    { value: "all", label: "Toutes les parties" },
    { value: "mine", label: "Mes parties" }
  ];

  return (
    <PageLayout>
      <div className="w-full max-w-6xl mx-auto px-4">
        <PageHeader 
          title={<ModernTitle withSparkles>Historique des parties</ModernTitle>}
          onBack={() => navigate('/')}
        />

        <div className="mb-6">
          <UnifiedTabs
            value={activeTab}
            onValueChange={setActiveTab}
            options={tabOptions}
            variant="default"
          />

          <div className="mt-6 space-y-4">
            {games.length === 0 ? (
              <Card className="vision-card">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">Aucune partie enregistrée pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-sm p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-dutch-blue" />
                        <span className="text-sm text-gray-600">
                          {format(new Date(game.date), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-gray-800 mb-1">
                        <Trophy className="h-4 w-4 inline-block mr-1 text-dutch-purple" />
                        {game.winner} a gagné !
                      </h3>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{game.players.length} joueurs</span>
                        <span>•</span>
                        <span>{game.rounds} manches</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:w-auto">
                      {game.players.map((player, i) => (
                        <div 
                          key={i} 
                          className={`px-3 py-1.5 rounded-full text-sm ${
                            player.name === game.winner 
                              ? 'bg-dutch-purple/10 text-dutch-purple' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="font-medium">{player.name}</span>
                          <span className="ml-1">
                            {player.score}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HistoryPage;

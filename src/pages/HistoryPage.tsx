import React, { useState, useEffect } from 'react';
import { Game } from '@/types';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Trophy, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import GameHistory from '@/components/GameHistory';
import AnimatedBackground from '@/components/AnimatedBackground';
import PageLayout from '@/components/PageLayout';

const HistoryPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
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

  return (
    <PageLayout
      title="Historique des parties"
      subtitle="Consultez toutes vos parties terminées"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-1 pt-4">
              <CardTitle className="text-lg font-semibold text-dutch-blue flex items-center gap-2">
                <Trophy className="h-5 w-5 text-dutch-orange" />
                {stats.totalGames} parties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {stats.mostFrequentWinner 
                  ? `Champion: ${stats.mostFrequentWinner.name} (${stats.mostFrequentWinner.wins} victoires)`
                  : "Aucun champion pour le moment"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-1 pt-4">
              <CardTitle className="text-lg font-semibold text-dutch-blue flex items-center gap-2">
                <Clock className="h-5 w-5 text-dutch-purple" />
                {stats.totalRounds} manches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Moyenne: {stats.totalGames > 0 
                  ? Math.round(stats.totalRounds / stats.totalGames) 
                  : 0} manches par partie
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-1 pt-4">
              <CardTitle className="text-lg font-semibold text-dutch-blue flex items-center gap-2">
                <Users className="h-5 w-5 text-dutch-blue" />
                {stats.totalPlayers} joueurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {stats.totalGames > 0 
                  ? `Moyenne: ${(games.reduce((sum, game) => sum + game.players.length, 0) / games.length).toFixed(1)} joueurs par partie`
                  : "Aucune partie enregistrée"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto flex justify-center mb-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-full p-1 shadow-sm">
            <TabsTrigger value="all" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Toutes les parties</TabsTrigger>
            <TabsTrigger value="multiplayer" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Multijoueur</TabsTrigger>
            <TabsTrigger value="local" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Local</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <GameHistory games={games} />
          </TabsContent>
          
          <TabsContent value="multiplayer">
            <GameHistory games={games.filter(game => game.isMultiplayer)} />
          </TabsContent>
          
          <TabsContent value="local">
            <GameHistory games={games.filter(game => !game.isMultiplayer)} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </PageLayout>
  );
};

export default HistoryPage;

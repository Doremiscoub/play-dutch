
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added these imports

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
    { value: "local", label: "Parties locales" },
    { value: "online", label: "Parties en ligne", disabled: true }
  ];

  return (
    <PageLayout>
      <div className="w-full max-w-6xl mx-auto px-1 sm:px-2">
        <PageHeader
          title="Historique des parties"
          onBack={() => navigate('/')}
          showSettings={true}
          onSettings={() => navigate('/settings')}
        />
        
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
          className="mb-6"
        >
          <UnifiedTabs
            value={activeTab}
            onValueChange={setActiveTab}
            options={tabOptions}
            variant="default"
          />
          
          <div className="mt-6">
            {activeTab === "all" && <GameHistory games={games} />}
            {activeTab === "local" && <GameHistory games={games.filter(game => !game.isMultiplayer)} />}
            {activeTab === "online" && <GameHistory games={games.filter(game => game.isMultiplayer)} />}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default HistoryPage;

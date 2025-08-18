
import React, { useState, useEffect } from 'react';
import { Game } from '@/types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
import { Trophy, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import PageShell from '@/components/layout/PageShell';
import EnhancedContentLayout from '@/components/layout/EnhancedContentLayout';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const savedGames = localStorage.getItem('dutch_games');
    const parsedGames: Game[] = savedGames ? JSON.parse(savedGames) : [];
    setGames(parsedGames);
  }, []);

  const tabOptions = [
    { value: "all", label: "Toutes les parties" },
    { value: "mine", label: "Mes parties" }
  ];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <PageShell variant="default">
      <UnifiedHeader {...useUnifiedHeader()} />

      <div className="p-4 pt-8 pb-20">
        <EnhancedContentLayout adPlacement="history" stickyAds>
          <div className="space-y-6">
            <UnifiedTabs
              value={activeTab}
              onValueChange={setActiveTab}
              options={tabOptions}
              variant="default"
            />

            <div className="space-y-4">
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
                    className="bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-sm p-4 vision-card"
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
                ))
              )}
            </div>
          </div>
        </EnhancedContentLayout>
      </div>
    </PageShell>
  );
};

export default HistoryPage;


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
import { DESIGN_TOKENS } from '@/design';

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

      <div className="w-full max-w-6xl mx-auto px-4 pt-4">
        <div className="mb-6">
          <UnifiedTabs
            value={activeTab}
            onValueChange={setActiveTab}
            options={tabOptions}
            variant="default"
          />

          <div className="mt-6 space-y-4">
            {games.length === 0 ? (
              <Card variant="glassColored">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">Aucune partie enregistrée pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.8), ${DESIGN_TOKENS.primitive.glass.light})`,
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255,255,255,0.5)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" style={{ color: DESIGN_TOKENS.primitive.dutch.blue[500] }} />
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(game.date), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                        </span>
                      </div>
                      
                      <h3 className="font-medium mb-1" style={{ color: DESIGN_TOKENS.primitive.neutral[700] }}>
                        <Trophy className="h-4 w-4 inline-block mr-1" style={{ color: DESIGN_TOKENS.primitive.dutch.purple[500] }} />
                        {game.winner} a gagné !
                      </h3>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                          className="px-3 py-1.5 rounded-full text-sm font-medium"
                          style={
                            player.name === game.winner 
                              ? { 
                                  backgroundColor: `${DESIGN_TOKENS.primitive.dutch.purple[500]}10`, 
                                  color: DESIGN_TOKENS.primitive.dutch.purple[500] 
                                }
                              : { 
                                  backgroundColor: DESIGN_TOKENS.primitive.neutral[100], 
                                  color: DESIGN_TOKENS.primitive.neutral[700] 
                                }
                          }
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
      </div>
    </PageShell>
  );
};

export default HistoryPage;

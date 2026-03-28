
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import EnhancedGameHistory from '@/components/history/EnhancedGameHistory';
import { EnrichedStatsV2 } from '@/components/statistics/EnrichedStatsV2';
import { AchievementSystem } from '@/components/achievements/AchievementSystem';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const History: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();

  const headerConfig = useUnifiedHeader({
    title: 'Historique & Stats',
    showBackButton: true,
    onBack: () => navigate('/'),
    showSettings: true,
    showRulesButton: false
  });

  // Load real game history from localStorage (same key used by EnhancedGameHistory)
  const [gameHistory] = useLocalStorage<any[]>('dutch_game_history', []);

  const handleReplayGame = (_gameId: string) => {
    navigate('/setup');
  };

  const handleShareGame = (_gameId: string) => {
    toast.info('Partage des parties bientôt disponible !');
  };

  return (
    <PageShell variant="default">
      <MobileOptimizer pageType="history" className="min-h-screen">
        <UnifiedHeader {...headerConfig} />

        <div className="container mx-auto px-4 py-6 space-y-6">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="statistics">Statistiques</TabsTrigger>
              <TabsTrigger value="achievements">Succès</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-4">
              <EnhancedGameHistory
                onReplayGame={handleReplayGame}
                onShareGame={handleShareGame}
              />
            </TabsContent>

            <TabsContent value="statistics" className="space-y-4">
              <EnrichedStatsV2
                gameHistory={gameHistory}
                className="mb-6"
              />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <AchievementSystem
                gameHistory={gameHistory}
                playerId={user?.id || 'current-user'}
              />
            </TabsContent>
          </Tabs>
        </div>
      </MobileOptimizer>
    </PageShell>
  );
};

export default History;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import EnhancedGameHistory from '@/components/history/EnhancedGameHistory';
import { AchievementSystem } from '@/components/achievements/AchievementSystem';
import { Player, RoundHistoryEntry } from '@/types';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
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

  // Données simulées pour les achievements (normalement viendraient de l'historique)
  const simulatedPlayers: Player[] = [
    {
      id: 'current-user',
      name: user?.email?.split('@')[0] || 'Joueur',
      emoji: '🎯',
      totalScore: 45,
      rounds: [],
      avatarColor: '#8B5CF6'
    }
  ];

  const simulatedRoundHistory: RoundHistoryEntry[] = [
    { scores: [15, 20, 10], dutchPlayerId: 'player-1' },
    { scores: [0, 25, 15], dutchPlayerId: 'current-user' },
    { scores: [10, 30, 20], dutchPlayerId: undefined }
  ];

  const handleReplayGame = (gameId: string) => {
    toast.info('Fonctionnalité bientôt disponible !');
  };

  const handleShareGame = (gameId: string) => {
    toast.info('Partage des parties bientôt disponible !');
  };

  return (
    <PageShell variant="default">
      <MobileOptimizer pageType="history" className="min-h-screen">
        <UnifiedHeader {...headerConfig} />
        
        <div className="container mx-auto px-4 py-6 space-y-6">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="space-y-4">
              <EnhancedGameHistory 
                onReplayGame={handleReplayGame}
                onShareGame={handleShareGame}
              />
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-4">
              <AchievementSystem 
                gameHistory={[]}
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

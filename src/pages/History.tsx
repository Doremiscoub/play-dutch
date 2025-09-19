
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import EnhancedGameHistory from '@/components/history/EnhancedGameHistory';
import { EnrichedStatsV2 } from '@/components/statistics/EnrichedStatsV2';
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

  // Données simulées pour les tests et démonstration
  const simulatedGameHistory = [
    {
      id: 'game-1',
      players: [
        { id: 'player-1', name: 'Alice', totalScore: 45, rounds: [{ score: 15, isDutch: false }, { score: 20, isDutch: true }, { score: 10, isDutch: false }] },
        { id: 'player-2', name: 'Bob', totalScore: 55, rounds: [{ score: 20, isDutch: false }, { score: 25, isDutch: false }, { score: 10, isDutch: false }] },
        { id: 'current-user', name: user?.email?.split('@')[0] || 'Vous', totalScore: 40, rounds: [{ score: 10, isDutch: false }, { score: 15, isDutch: false }, { score: 15, isDutch: true }] }
      ],
      date: new Date(Date.now() - 86400000), // Yesterday
      winner: 'current-user',
      totalRounds: 3,
      duration: 1800 // 30 minutes
    },
    {
      id: 'game-2',
      players: [
        { id: 'player-1', name: 'Alice', totalScore: 65, rounds: [{ score: 25, isDutch: false }, { score: 40, isDutch: false }] },
        { id: 'current-user', name: user?.email?.split('@')[0] || 'Vous', totalScore: 35, rounds: [{ score: 15, isDutch: true }, { score: 20, isDutch: false }] }
      ],
      date: new Date(Date.now() - 172800000), // 2 days ago
      winner: 'current-user',
      totalRounds: 2,
      duration: 1200 // 20 minutes
    },
    {
      id: 'game-3',
      players: [
        { id: 'player-1', name: 'Alice', totalScore: 75, rounds: [{ score: 25, isDutch: false }, { score: 30, isDutch: true }, { score: 20, isDutch: false }] },
        { id: 'player-2', name: 'Bob', totalScore: 50, rounds: [{ score: 20, isDutch: false }, { score: 15, isDutch: false }, { score: 15, isDutch: false }] },
        { id: 'player-3', name: 'Charlie', totalScore: 45, rounds: [{ score: 15, isDutch: true }, { score: 15, isDutch: false }, { score: 15, isDutch: false }] },
        { id: 'current-user', name: user?.email?.split('@')[0] || 'Vous', totalScore: 60, rounds: [{ score: 20, isDutch: false }, { score: 20, isDutch: false }, { score: 20, isDutch: false }] }
      ],
      date: new Date(Date.now() - 259200000), // 3 days ago
      winner: 'player-3',
      totalRounds: 3,
      duration: 2100 // 35 minutes
    }
  ];

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
                gameHistory={simulatedGameHistory}
                className="mb-6"
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

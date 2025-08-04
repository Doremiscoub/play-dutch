import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Activity, Users, Radar, TrendingUp, Award } from 'lucide-react';
import { StatsOverview } from './StatsOverview';
import { PlayerTrends } from './PlayerTrends';
import { PlayerRadar } from './PlayerRadar';
import { RoundHeatmap } from './RoundHeatmap';
import { AdvancedStats } from './AdvancedStats';
import { AchievementsBadges } from './AchievementsBadges';

interface StatsDashboardProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  players,
  roundCount,
  scoreLimit,
  roundHistory
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const tabItems = [
    { 
      value: 'overview', 
      label: 'Aperçu', 
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Vue d\'ensemble de la partie'
    },
    { 
      value: 'trends', 
      label: 'Tendances', 
      icon: <TrendingUp className="h-4 w-4" />,
      description: 'Évolution des performances'
    },
    { 
      value: 'radar', 
      label: 'Comparaison', 
      icon: <Radar className="h-4 w-4" />,
      description: 'Profils des joueurs'
    },
    { 
      value: 'heatmap', 
      label: 'Heatmap', 
      icon: <Activity className="h-4 w-4" />,
      description: 'Analyse par manche'
    },
    { 
      value: 'advanced', 
      label: 'Avancé', 
      icon: <Users className="h-4 w-4" />,
      description: 'Statistiques détaillées'
    },
    { 
      value: 'achievements', 
      label: 'Exploits', 
      icon: <Award className="h-4 w-4" />,
      description: 'Badges et récompenses'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-7xl mx-auto space-y-6"
    >
      {/* En-tête avec sélecteur de joueur */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl shadow-lg">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Tableau de Bord Statistiques
          </h1>
        </div>
        <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
          Analyse complète des performances, tendances et insights de votre partie Dutch
        </p>

        {/* Sélecteur de joueur rapide */}
        {players.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-sm font-medium text-muted-foreground mr-2">Focus joueur:</span>
            <button
              onClick={() => setSelectedPlayer(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                !selectedPlayer 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }`}
            >
              Tous
            </button>
            {players.map((player) => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                  selectedPlayer?.id === player.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                <span>{player.emoji || '😊'}</span>
                {player.name}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Navigation par onglets */}
      <Tabs defaultValue="overview" className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1 bg-card/50 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-border/20">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-xl transition-all duration-300 flex flex-col lg:flex-row items-center gap-1 lg:gap-2 py-3 lg:py-2 px-2 lg:px-4"
              >
                {tab.icon}
                <div className="text-center lg:text-left">
                  <div className="font-medium text-xs lg:text-sm">{tab.label}</div>
                  <div className="text-xs text-muted-foreground hidden lg:block">{tab.description}</div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        {/* Contenu des onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <TabsContent value="overview" className="mt-0">
            <StatsOverview 
              players={players}
              roundCount={roundCount}
              scoreLimit={scoreLimit}
              roundHistory={roundHistory}
              selectedPlayer={selectedPlayer}
            />
          </TabsContent>

          <TabsContent value="trends" className="mt-0">
            <PlayerTrends 
              players={players}
              roundHistory={roundHistory}
              selectedPlayer={selectedPlayer}
            />
          </TabsContent>

          <TabsContent value="radar" className="mt-0">
            <PlayerRadar 
              players={players}
              selectedPlayer={selectedPlayer}
            />
          </TabsContent>

          <TabsContent value="heatmap" className="mt-0">
            <RoundHeatmap 
              players={players}
              roundHistory={roundHistory}
            />
          </TabsContent>

          <TabsContent value="advanced" className="mt-0">
            <AdvancedStats 
              players={players}
              roundHistory={roundHistory}
              selectedPlayer={selectedPlayer}
            />
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <AchievementsBadges 
              players={players}
              roundHistory={roundHistory}
            />
          </TabsContent>
        </motion.div>
      </Tabs>
    </motion.div>
  );
};
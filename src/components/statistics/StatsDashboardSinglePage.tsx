import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { ArrowLeft, BarChart3, TrendingUp, Users, Activity, Zap, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsOverview } from './StatsOverview';
import { PlayerTrends } from './PlayerTrends';
import { PlayerRadar } from './PlayerRadar';
import { RoundHeatmap } from './RoundHeatmap';
import { AdvancedStats } from './AdvancedStats';
import { AchievementsBadges } from './AchievementsBadges';

interface StatsDashboardSinglePageProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  onBack?: () => void;
}

export const StatsDashboardSinglePage: React.FC<StatsDashboardSinglePageProps> = ({
  players,
  roundCount,
  scoreLimit,
  roundHistory,
  onBack
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const sections = [
    { 
      id: 'overview', 
      title: 'Aperçu Global', 
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Métriques clés de la partie en cours',
      component: (
        <StatsOverview 
          players={players}
          roundCount={roundCount}
          scoreLimit={scoreLimit}
          roundHistory={roundHistory}
          selectedPlayer={selectedPlayer}
        />
      )
    },
    { 
      id: 'trends', 
      title: 'Tendances Clés', 
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Évolution des performances par joueur',
      component: (
        <PlayerTrends 
          players={players}
          roundHistory={roundHistory}
          selectedPlayer={selectedPlayer}
        />
      )
    },
    { 
      id: 'comparison', 
      title: 'Comparaison Joueurs', 
      icon: <Users className="h-5 w-5" />,
      description: 'Profils et forces de chaque joueur',
      component: (
        <PlayerRadar 
          players={players}
          selectedPlayer={selectedPlayer}
        />
      )
    },
    { 
      id: 'heatmap', 
      title: 'Analyse par Manche', 
      icon: <Activity className="h-5 w-5" />,
      description: 'Heatmap des performances par round',
      component: (
        <RoundHeatmap 
          players={players}
          roundHistory={roundHistory}
        />
      )
    },
    { 
      id: 'insights', 
      title: 'Insights Avancés', 
      icon: <Zap className="h-5 w-5" />,
      description: 'Prédictions et momentum',
      component: (
        <AdvancedStats 
          players={players}
          roundHistory={roundHistory}
          selectedPlayer={selectedPlayer}
        />
      )
    },
    { 
      id: 'achievements', 
      title: 'Fun Facts & Exploits', 
      icon: <Award className="h-5 w-5" />,
      description: 'Badges et récompenses gagnés',
      component: (
        <AchievementsBadges 
          players={players}
          roundHistory={roundHistory}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background animé */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary))_0%,transparent_50%)] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_40%,hsl(var(--accent))_0%,transparent_50%)] opacity-[0.03]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Header avec bouton retour */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          {onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="glass-button h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <motion.div
              className="p-3 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <BarChart3 className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Statistiques Dutch
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base font-medium">
                Analyse complète de votre partie • {players.length} joueur{players.length > 1 ? 's' : ''} • {roundCount} manche{roundCount > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sélecteur de joueur */}
        {players.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Focus sur un joueur :
              </span>
              <Button
                onClick={() => setSelectedPlayer(null)}
                variant={!selectedPlayer ? "default" : "ghost"}
                size="sm"
                className={`rounded-2xl font-medium transition-all duration-300 ${
                  !selectedPlayer 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'glass-button bg-white/50 hover:bg-white/70 text-foreground border border-white/30'
                }`}
              >
                Tous les joueurs
              </Button>
              {players.map((player) => (
                <Button
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  variant={selectedPlayer?.id === player.id ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedPlayer?.id === player.id 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                      : 'glass-button bg-white/50 hover:bg-white/70 text-foreground border border-white/30'
                  }`}
                >
                  <span className="text-base">{player.emoji || '😊'}</span>
                  {player.name}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sections empilées */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              data-testid={`stats-section-${section.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Mini-header de section */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-3 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {section.icon}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground text-sm font-medium">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Contenu de la section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  {section.component}
                </div>
              </motion.div>
            </motion.section>
          ))}
        </div>

        {/* Footer spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
};
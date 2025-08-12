import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { ArrowLeft, BarChart3, TrendingUp, Users, Activity, Zap, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useIsMobile from '@/hooks/use-mobile';
import { LazyStatisticsSection, useVisibilityTracker } from './LazyStatisticsSection';

// Import des composants avec lazy loading
import { StatsOverview } from './StatsOverview';
import { PlayerTrends } from './PlayerTrends';
import { PlayerRadar } from './PlayerRadar';
import { RoundHeatmap } from './RoundHeatmap';
import { AdvancedStats } from './AdvancedStats';
import { AchievementsBadges } from './AchievementsBadges';
interface OptimizedStatsDashboardProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: {
    scores: number[];
    dutchPlayerId?: string;
  }[];
  onBack?: () => void;
}
export const OptimizedStatsDashboard: React.FC<OptimizedStatsDashboardProps> = ({
  players,
  roundCount,
  scoreLimit,
  roundHistory,
  onBack
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const isMobile = useIsMobile();
  const {
    visibleSections,
    trackElement
  } = useVisibilityTracker();

  // Memoization des props pour éviter les re-renders inutiles
  const memoizedProps = useMemo(() => ({
    overview: {
      players,
      roundCount,
      scoreLimit,
      roundHistory,
      selectedPlayer
    },
    trends: {
      players,
      roundHistory,
      selectedPlayer
    },
    radar: {
      players,
      selectedPlayer
    },
    heatmap: {
      players,
      roundHistory
    },
    advanced: {
      players,
      roundHistory,
      selectedPlayer
    },
    achievements: {
      players,
      roundHistory
    }
  }), [players, roundCount, scoreLimit, roundHistory, selectedPlayer]);

  // Configuration des sections avec lazy loading conditionnel
  const sections = useMemo(() => [{
    id: 'overview',
    title: 'Aperçu Global',
    icon: <BarChart3 className="h-5 w-5" />,
    description: 'Métriques clés de la partie en cours',
    component: StatsOverview,
    props: memoizedProps.overview,
    priority: 1 // Toujours charger en premier
  }, {
    id: 'trends',
    title: 'Tendances Clés',
    icon: <TrendingUp className="h-5 w-5" />,
    description: 'Évolution des performances par joueur',
    component: PlayerTrends,
    props: memoizedProps.trends,
    priority: 2
  }, {
    id: 'comparison',
    title: 'Comparaison Joueurs',
    icon: <Users className="h-5 w-5" />,
    description: 'Profils et forces de chaque joueur',
    component: PlayerRadar,
    props: memoizedProps.radar,
    priority: 3
  }, {
    id: 'heatmap',
    title: 'Analyse par Manche',
    icon: <Activity className="h-5 w-5" />,
    description: 'Heatmap des performances par round',
    component: RoundHeatmap,
    props: memoizedProps.heatmap,
    priority: isMobile ? 5 : 4 // Moins prioritaire sur mobile
  }, {
    id: 'insights',
    title: 'Insights Avancés',
    icon: <Zap className="h-5 w-5" />,
    description: 'Prédictions et momentum',
    component: AdvancedStats,
    props: memoizedProps.advanced,
    priority: isMobile ? 6 : 4
  }, {
    id: 'achievements',
    title: 'Fun Facts & Exploits',
    icon: <Award className="h-5 w-5" />,
    description: 'Badges et récompenses gagnés',
    component: AchievementsBadges,
    props: memoizedProps.achievements,
    priority: isMobile ? 4 : 6
  }], [memoizedProps, isMobile]);

  // Callback optimisé pour la sélection de joueur
  const handlePlayerSelect = useCallback((player: Player | null) => {
    setSelectedPlayer(player);
  }, []);

  // Ref callback pour tracker la visibilité
  const createSectionRef = useCallback((sectionId: string) => (element: HTMLElement | null) => trackElement(element, sectionId), [trackElement]);
  return <div className={`min-h-screen relative ${isMobile ? "mobile-optimized ultra-mobile safe-area-bottom overflow-x-hidden performance-optimized" : ""} stats-responsive`}>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 space-y-6 md:space-y-8">
        {/* Header mobile-optimized */}
        

        {/* Sélecteur de joueur mobile-optimized */}
        {players.length > 0 && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="glass-card bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/50 shadow-xl">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2">
                <Users className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                {isMobile ? 'Focus :' : 'Focus sur un joueur :'}
              </span>
              <Button onClick={() => handlePlayerSelect(null)} variant={!selectedPlayer ? "default" : "ghost"} size="sm" className={`rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all duration-300 ${!selectedPlayer ? 'bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105' : 'glass-button bg-white/50 hover:bg-white/70 text-foreground border border-white/30'}`} style={!selectedPlayer ? {
            background: 'linear-gradient(90deg, rgb(10,132,255), rgb(139,92,246))',
            color: 'white'
          } : undefined}>
                {isMobile ? 'Tous' : 'Tous les joueurs'}
              </Button>
              {players.map(player => <Button key={player.id} onClick={() => handlePlayerSelect(player)} variant={selectedPlayer?.id === player.id ? "default" : "ghost"} size="sm" className={`rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1 md:gap-2 ${selectedPlayer?.id === player.id ? 'bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105' : 'glass-button bg-white/50 hover:bg-white/70 text-foreground border border-white/30'}`} style={selectedPlayer?.id === player.id ? {
            background: 'linear-gradient(90deg, rgb(10,132,255), rgb(139,92,246))',
            color: 'white'
          } : undefined}>
                  <span className="text-sm md:text-base">{player.emoji || '😊'}</span>
                  {isMobile ? player.name.split(' ')[0] : player.name}
                </Button>)}
            </div>
          </motion.div>}

        {/* Sections empilées avec lazy loading */}
        <div className="space-y-8 md:space-y-12">
          {sections.sort((a, b) => a.priority - b.priority).map((section, index) => {
          const isVisible = visibleSections.has(section.id);
          const shouldRender = true; // Always render sections on mobile and desktop to avoid lazy-load issues inside scroll containers
          return <motion.section key={section.id} ref={createSectionRef(section.id)} data-testid={`stats-section-${section.id}`} initial={{
            opacity: 0,
            y: 40
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2 + index * 0.1,
            duration: 0.6
          }} className="space-y-4 md:space-y-6">
                  {/* Mini-header de section */}
                  <div className="flex items-center gap-3 md:gap-4">
                     <motion.div className="p-2 md:p-3 bg-gradient-to-r from-trinity-blue-500/30 via-trinity-purple-500/30 to-trinity-orange-500/30 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/30 shadow-lg" whileHover={{
                scale: 1.05,
                rotate: 3
              }} transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }} style={{
                background: 'linear-gradient(90deg, rgba(10,132,255,0.3), rgba(139,92,246,0.3), rgba(255,159,10,0.3))',
                color: 'rgb(10,132,255)'
              }}>
                       {section.icon}
                     </motion.div>
                     <div>
                       <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 bg-clip-text text-transparent" style={{
                  background: 'linear-gradient(90deg, rgb(10,132,255), rgb(139,92,246))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                         {section.title}
                       </h2>
                      {!isMobile && <p className="text-muted-foreground text-sm font-medium">
                          {section.description}
                        </p>}
                    </div>
                  </div>

                  {/* Contenu de la section avec lazy loading */}
                  <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.3 + index * 0.1
            }} className="glass-card w-full max-w-full bg-white/40 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/50 shadow-xl overflow-hidden">
                    <div className="p-4 md:p-6 lg:p-8 w-full max-w-full">
                      <LazyStatisticsSection sectionId={section.id} component={section.component} props={section.props} isVisible={shouldRender} />
                    </div>
                  </motion.div>
                </motion.section>;
        })}
        </div>

        {/* Footer spacer */}
        <div className="h-4 md:h-8" />
      </div>
    </div>;
};
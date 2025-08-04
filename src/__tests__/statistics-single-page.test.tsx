import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatsDashboardSinglePage } from '@/components/statistics/StatsDashboardSinglePage';
import { Player } from '@/types';

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Alice',
    avatarColor: '#3B82F6',
    emoji: '🎯',
    totalScore: 45,
    rounds: [
      { score: 10, isDutch: false },
      { score: 15, isDutch: false },
      { score: 20, isDutch: false }
    ],
    stats: {
      playerId: '1',
      roundsPlayed: 3,
      meanScore: 15,
      totalScore: 45,
      averageScore: 15,
      bestRound: 10,
      worstRound: 20,
      dutchCount: 0,
      improvementRate: 0.1,
      consistencyScore: 0.7,
      winStreak: 2
    }
  },
  {
    id: '2',
    name: 'Bob',
    avatarColor: '#10B981',
    emoji: '🚀',
    totalScore: 60,
    rounds: [
      { score: 5, isDutch: true },
      { score: 25, isDutch: false },
      { score: 30, isDutch: false }
    ],
    stats: {
      playerId: '2',
      roundsPlayed: 3,
      meanScore: 20,
      totalScore: 60,
      averageScore: 20,
      bestRound: 5,
      worstRound: 30,
      dutchCount: 1,
      improvementRate: -0.2,
      consistencyScore: 0.5,
      winStreak: 0
    }
  }
];

const mockRoundHistory = [
  { scores: [10, 5], dutchPlayerId: '2' },
  { scores: [15, 25] },
  { scores: [20, 30] }
];

// Mock framer-motion au niveau du module
const mockMotion = {
  div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  section: ({ children, ...props }: any) => <section {...props}>{children}</section>
};

// @ts-ignore
global.jest = { mock: () => {} };

// Mock manual de framer-motion
const originalModule = require('framer-motion');
Object.assign(originalModule, { motion: mockMotion });

describe('StatsDashboardSinglePage', () => {

  it('affiche les 6 sections principales sans onglets', () => {
    render(
      <StatsDashboardSinglePage
        players={mockPlayers}
        roundCount={3}
        scoreLimit={100}
        roundHistory={mockRoundHistory}
      />
    );

    // Vérifier la présence des 6 sections clés
    expect(screen.getByTestId('stats-section-overview')).toBeInTheDocument();
    expect(screen.getByTestId('stats-section-trends')).toBeInTheDocument();
    expect(screen.getByTestId('stats-section-comparison')).toBeInTheDocument();
    expect(screen.getByTestId('stats-section-heatmap')).toBeInTheDocument();
    expect(screen.getByTestId('stats-section-insights')).toBeInTheDocument();
    expect(screen.getByTestId('stats-section-achievements')).toBeInTheDocument();

    // Vérifier les titres des sections
    expect(screen.getByText('Aperçu Global')).toBeInTheDocument();
    expect(screen.getByText('Tendances Clés')).toBeInTheDocument();
    expect(screen.getByText('Comparaison Joueurs')).toBeInTheDocument();
    expect(screen.getByText('Analyse par Manche')).toBeInTheDocument();
    expect(screen.getByText('Insights Avancés')).toBeInTheDocument();
    expect(screen.getByText('Fun Facts & Exploits')).toBeInTheDocument();
  });

  it('ne contient aucun élément role="tab" (pas de sous-onglets)', () => {
    render(
      <StatsDashboardSinglePage
        players={mockPlayers}
        roundCount={3}
        scoreLimit={100}
        roundHistory={mockRoundHistory}
      />
    );

    // Vérifier qu'aucun élément avec role="tab" n'est présent
    const tabElements = screen.queryAllByRole('tab');
    expect(tabElements).toHaveLength(0);
  });

  it('affiche le sélecteur de joueurs', () => {
    render(
      <StatsDashboardSinglePage
        players={mockPlayers}
        roundCount={3}
        scoreLimit={100}
        roundHistory={mockRoundHistory}
      />
    );

    // Vérifier la présence du sélecteur de joueurs
    expect(screen.getByText('Focus sur un joueur :')).toBeInTheDocument();
    expect(screen.getByText('Tous les joueurs')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('affiche le titre principal et les métriques de base', () => {
    render(
      <StatsDashboardSinglePage
        players={mockPlayers}
        roundCount={3}
        scoreLimit={100}
        roundHistory={mockRoundHistory}
      />
    );

    // Vérifier le titre principal
    expect(screen.getByText('Statistiques Dutch')).toBeInTheDocument();
    
    // Vérifier les métriques dans la description
    expect(screen.getByText(/2 joueurs/)).toBeInTheDocument();
    expect(screen.getByText(/3 manches/)).toBeInTheDocument();
  });

  it('affiche les descriptions des sections', () => {
    render(
      <StatsDashboardSinglePage
        players={mockPlayers}
        roundCount={3}
        scoreLimit={100}
        roundHistory={mockRoundHistory}
      />
    );

    // Vérifier les descriptions des sections
    expect(screen.getByText('Métriques clés de la partie en cours')).toBeInTheDocument();
    expect(screen.getByText('Évolution des performances par joueur')).toBeInTheDocument();
    expect(screen.getByText('Profils et forces de chaque joueur')).toBeInTheDocument();
    expect(screen.getByText('Heatmap des performances par round')).toBeInTheDocument();
    expect(screen.getByText('Prédictions et momentum')).toBeInTheDocument();
    expect(screen.getByText('Badges et récompenses gagnés')).toBeInTheDocument();
  });
});
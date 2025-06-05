
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import GameSettings from '@/components/GameSettings';
import { User, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes entre amis',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur Professeur Cartouche. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche'
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header with settings */}
      <header className="absolute top-4 right-4 z-50 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 rounded-full"
          aria-label="Profil utilisateur"
        >
          <User className="h-5 w-5" />
        </Button>
        <GameSettings />
      </header>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Hero Section */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
              Dutch
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Le jeu de cartes qui révèle vos stratégies
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Application gratuite pour suivre les scores de vos parties Dutch. 
              Avec l'IA Professeur Cartouche pour des commentaires amusants !
            </p>
          </div>

          {/* Main CTA */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate('/game/setup')}
              size="lg"
              className="bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange text-white font-bold text-xl px-12 py-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Play className="h-6 w-6 mr-3" />
              Commencer une partie
            </Button>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <Button
                variant="ghost"
                onClick={() => navigate('/rules')}
                className="hover:text-dutch-blue"
              >
                📖 Règles du jeu
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/history')}
                className="hover:text-dutch-blue"
              >
                📊 Historique
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/settings')}
                className="hover:text-dutch-blue"
              >
                ⚙️ Paramètres
              </Button>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-16">
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Calcul automatique</h3>
            <p className="text-gray-600">Scores et "Dutch" calculés automatiquement</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold mb-2">IA Commentateur</h3>
            <p className="text-gray-600">Le Professeur Cartouche anime vos parties</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Hors ligne</h3>
            <p className="text-gray-600">Fonctionne sans connexion internet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

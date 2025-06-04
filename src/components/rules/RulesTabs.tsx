
import React from 'react';
import { motion } from 'framer-motion';
import { Book, Zap, Trophy, Target, Users, Play } from 'lucide-react';
import { GameCard } from '@/components/ui/game-card';
import { GameText, GameHeader, ActionText } from '@/components/ui/game-typography';
import { GameButton } from '@/components/ui/game-button';

interface RulesTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RulesTabs: React.FC<RulesTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'introduction', label: 'Introduction', icon: Book, color: 'uno' },
    { id: 'setup', label: 'Préparation', icon: Users, color: 'pokemon' },
    { id: 'gameplay', label: 'Déroulement', icon: Play, color: 'dutch' },
    { id: 'dutch', label: 'Le Dutch', icon: Zap, color: 'classic' },
    { id: 'scoring', label: 'Comptage', icon: Target, color: 'ghost' },
    { id: 'winning', label: 'Victoire', icon: Trophy, color: 'uno' }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'introduction':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <GameHeader gameColor="primary" effect="shadow">
              Bienvenue dans le Dutch !
            </GameHeader>
            
            <GameCard variant="playingCard" className="p-6">
              <GameText variant="adventure" gameColor="secondary" className="mb-4">
                🎴 Le jeu de cartes addictif
              </GameText>
              <GameText variant="body" className="text-lg leading-relaxed">
                Le Dutch est un jeu de cartes passionnant qui mélange stratégie, chance et bluff. 
                L'objectif est simple : avoir le score le plus bas possible ! Mais attention, 
                un système de "Dutch" peut tout changer...
              </GameText>
            </GameCard>

            <GameCard variant="pokemonCard" className="p-6">
              <GameText variant="cardTitle" className="mb-3">
                ✨ Pourquoi jouer au Dutch ?
              </GameText>
              <div className="space-y-2">
                <GameText variant="body">• 🎯 Simple à apprendre, difficile à maîtriser</GameText>
                <GameText variant="body">• ⚡ Parties rapides et dynamiques</GameText>
                <GameText variant="body">• 🎭 Suspense jusqu'à la dernière carte</GameText>
                <GameText variant="body">• 👥 Parfait entre amis (2-10 joueurs)</GameText>
              </div>
            </GameCard>
          </motion.div>
        );

      case 'setup':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <GameHeader gameColor="secondary" effect="shadow">
              Préparation de la partie
            </GameHeader>
            
            <GameCard variant="playingCard" className="p-6">
              <GameText variant="cardTitle" className="mb-4">
                🎮 Matériel nécessaire
              </GameText>
              <div className="space-y-3">
                <GameCard variant="score" className="p-3">
                  <GameText variant="body" className="font-semibold">
                    🃏 Un jeu de 52 cartes classique
                  </GameText>
                </GameCard>
                <GameCard variant="score" className="p-3">
                  <GameText variant="body" className="font-semibold">
                    📱 Cette application pour compter les scores !
                  </GameText>
                </GameCard>
                <GameCard variant="score" className="p-3">
                  <GameText variant="body" className="font-semibold">
                    👥 2 à 10 joueurs motivés
                  </GameText>
                </GameCard>
              </div>
            </GameCard>

            <GameCard variant="pokemonCard" className="p-6">
              <GameText variant="cardTitle" className="mb-4">
                🎯 Configuration
              </GameText>
              <div className="space-y-3">
                <GameText variant="body">
                  <strong>1.</strong> Choisissez un donneur (qui change à chaque manche)
                </GameText>
                <GameText variant="body">
                  <strong>2.</strong> Définissez la limite de score (généralement 100 points)
                </GameText>
                <GameText variant="body">
                  <strong>3.</strong> Distribuez 4 cartes à chaque joueur
                </GameText>
                <GameText variant="body">
                  <strong>4.</strong> Placez le reste des cartes au centre (pioche)
                </GameText>
              </div>
            </GameCard>
          </motion.div>
        );

      case 'gameplay':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <GameHeader gameColor="accent" effect="shadow">
              Déroulement d'une manche
            </GameHeader>
            
            <GameCard variant="playingCard" className="p-6">
              <GameText variant="cardTitle" className="mb-4">
                🎲 Tour de jeu
              </GameText>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <GameCard variant="unoCard" className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <ActionText gameColor="white">1</ActionText>
                  </GameCard>
                  <GameText variant="body">
                    Piochez une carte de la pioche ou de la défausse
                  </GameText>
                </div>
                <div className="flex items-start gap-3">
                  <GameCard variant="unoCard" className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <ActionText gameColor="white">2</ActionText>
                  </GameCard>
                  <GameText variant="body">
                    Défaussez une carte de votre choix
                  </GameText>
                </div>
                <div className="flex items-start gap-3">
                  <GameCard variant="unoCard" className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <ActionText gameColor="white">3</ActionText>
                  </GameCard>
                  <GameText variant="body">
                    Passez la main au joueur suivant
                  </GameText>
                </div>
              </div>
            </GameCard>

            <GameCard variant="score" className="p-6">
              <GameText variant="cardTitle" className="mb-4">
                🎯 Fin de manche
              </GameText>
              <GameText variant="body" className="mb-3">
                La manche se termine quand un joueur annonce "Dutch" ou que la pioche est vide.
              </GameText>
              <GameText variant="body">
                <strong>Comptage :</strong> Additionnez la valeur de vos 4 cartes restantes.
              </GameText>
            </GameCard>
          </motion.div>
        );

      case 'dutch':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <GameHeader gameColor="gameGradient" effect="shadow">
              <Zap className="inline mr-3 h-8 w-8" />
              Le système Dutch
            </GameHeader>
            
            <GameCard variant="pokemonCard" className="p-6">
              <GameText variant="adventure" gameColor="accent" className="mb-4">
                ⚡ Le moment décisif !
              </GameText>
              <GameText variant="body" className="text-lg leading-relaxed">
                Quand vous pensez avoir un score bas, vous pouvez "couper" en annonçant "Dutch" ! 
                Mais attention, c'est risqué...
              </GameText>
            </GameCard>

            <GameCard variant="playingCard" className="p-6">
              <GameText variant="cardTitle" className="mb-4">
                🎲 Comment ça marche ?
              </GameText>
              <div className="space-y-4">
                <GameCard variant="score" className="p-4">
                  <GameText variant="body" className="font-semibold text-green-700">
                    ✅ Si vous avez le score le plus bas : Bravo ! Vous marquez 0 point.
                  </GameText>
                </GameCard>
                <GameCard variant="score" className="p-4">
                  <GameText variant="body" className="font-semibold text-red-700">
                    ❌ Si quelqu'un a un score égal ou inférieur : Vous doublez votre score !
                  </GameText>
                </GameCard>
              </div>
            </GameCard>

            <GameCard variant="unoCard" className="p-6">
              <GameText variant="cardTitle" gameColor="white" className="mb-3">
                💡 Stratégie
              </GameText>
              <GameText variant="body" gameColor="white">
                Ne coupez que si vous êtes sûr de votre coup ! 
                Un Dutch raté peut vous coûter très cher...
              </GameText>
            </GameCard>
          </motion.div>
        );

      case 'scoring':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <GameHeader gameColor="primary" effect="shadow">
              Système de points
            </GameHeader>
            
            <GameCard variant="playingCard" className="p-6">
              <GameText variant="cardTitle" className="mb-4">
                🃏 Valeur des cartes
              </GameText>
              <div className="grid grid-cols-2 gap-4">
                <GameCard variant="score" className="p-3 text-center">
                  <GameText variant="scoreDisplay" className="text-2xl mb-1">A</GameText>
                  <GameText variant="caption">1 point</GameText>
                </GameCard>
                <GameCard variant="score" className="p-3 text-center">
                  <GameText variant="scoreDisplay" className="text-2xl mb-1">2-10</GameText>
                  <GameText variant="caption">Valeur faciale</GameText>
                </GameCard>
                <GameCard variant="score" className="p-3 text-center">
                  <GameText variant="scoreDisplay" className="text-2xl mb-1">V</GameText>
                  <GameText variant="caption">11 points</GameText>
                </GameCard>
                <GameCard variant="score" className="p-3 text-center">
                  <GameText variant="scoreDisplay" className="text-2xl mb-1">D-R</GameText>
                  <GameText variant="caption">12-13 points</GameText>
                </GameCard>
              </div>
            </GameCard>

            <GameCard variant="pokemonCard" className="p-6">
              <GameText variant="cardTitle" className="mb-4">
                📊 Exemples de scores
              </GameText>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                  <GameText variant="body">A♠ + 2♥ + 3♦ + 4♣</GameText>
                  <GameText variant="scoreDisplay" gameColor="accent">10 pts</GameText>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                  <GameText variant="body">R♠ + D♥ + V♦ + 10♣</GameText>
                  <GameText variant="scoreDisplay" gameColor="accent">46 pts</GameText>
                </div>
              </div>
            </GameCard>
          </motion.div>
        );

      case 'winning':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <GameHeader gameColor="gameGradient" effect="shadow">
              <Trophy className="inline mr-3 h-8 w-8" />
              Comment gagner
            </GameHeader>
            
            <GameCard variant="pokemonCard" className="p-6">
              <GameText variant="adventure" gameColor="accent" className="mb-4">
                🏆 L'objectif ultime
              </GameText>
              <GameText variant="body" className="text-lg leading-relaxed">
                Le premier joueur à atteindre ou dépasser la limite fixée (généralement 100 points) 
                a perdu ! Le gagnant est celui qui a le score le plus bas à ce moment.
              </GameText>
            </GameCard>

            <GameCard variant="playingCard" className="p-6">
              <GameText variant="cardTitle" className="mb-4">
                🎯 Conseils pour gagner
              </GameText>
              <div className="space-y-3">
                <GameCard variant="score" className="p-3">
                  <GameText variant="body">
                    💡 <strong>Observez</strong> les cartes défaussées par vos adversaires
                  </GameText>
                </GameCard>
                <GameCard variant="score" className="p-3">
                  <GameText variant="body">
                    ⚡ <strong>Coupez stratégiquement</strong> au bon moment
                  </GameText>
                </GameCard>
                <GameCard variant="score" className="p-3">
                  <GameText variant="body">
                    🎭 <strong>Bluffez</strong> pour tromper vos adversaires
                  </GameText>
                </GameCard>
                <GameCard variant="score" className="p-3">
                  <GameText variant="body">
                    🎲 <strong>Prenez des risques calculés</strong> avec le Dutch
                  </GameText>
                </GameCard>
              </div>
            </GameCard>

            <GameCard variant="unoCard" className="p-6 text-center">
              <GameText variant="adventure" gameColor="white" className="text-2xl">
                Bonne chance ! 🍀
              </GameText>
            </GameCard>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.div
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GameButton
                variant={activeTab === tab.id ? tab.color as any : 'ghost'}
                size="lg"
                onClick={() => onTabChange(tab.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-5 w-5" />
                <ActionText>{tab.label}</ActionText>
              </GameButton>
            </motion.div>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {getTabContent()}
      </div>
    </div>
  );
};

export default RulesTabs;

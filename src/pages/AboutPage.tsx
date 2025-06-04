
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import { UnifiedCard } from '@/components/ui/unified-card';
import { UnifiedButton } from '@/components/ui/unified-button';
import { useSEO } from '@/hooks/useSEO';
import { StructuredData } from '@/components/seo/StructuredData';
import { Heart, Users, Smartphone, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'À propos - Dutch Card Game | Application jeu de cartes',
    description: 'Découvrez Dutch Card Game, l\'application web gratuite pour suivre vos scores de jeu de cartes. Créée pour les soirées entre amis, interface moderne et intuitive.',
    keywords: 'dutch card game, à propos, application jeu cartes, équipe développement, histoire dutch'
  });

  return (
    <>
      <StructuredData 
        type="WebApplication" 
        data={{
          name: 'Dutch Card Game',
          description: 'Application web pour le jeu de cartes Dutch',
          applicationCategory: 'Game',
          operatingSystem: 'Web Browser'
        }} 
      />
      
      <UnifiedPageLayout
        title="À propos de Dutch"
        showBackButton
        onBack={() => navigate('/')}
        backgroundVariant="subtle"
      >
        <div className="space-y-8">
          {/* Introduction */}
          <UnifiedCard variant="light" padding="lg">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                L'application compagnon pour vos soirées jeux
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Dutch Card Game est née d'une frustration simple : combien de fois avez-vous perdu 
                le carnet de scores au milieu d'une partie ? Nous avons créé cette application pour 
                que vous puissiez vous concentrer sur l'essentiel : passer un bon moment entre amis.
              </p>
            </div>
          </UnifiedCard>

          {/* Fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UnifiedCard variant="light" padding="lg">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-dutch-blue/10 rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-dutch-blue" />
                </div>
                <h3 className="text-lg font-semibold">100% Web</h3>
                <p className="text-gray-600 text-sm">
                  Aucune installation nécessaire. Fonctionne sur tous vos appareils, même hors-ligne.
                </p>
              </div>
            </UnifiedCard>

            <UnifiedCard variant="light" padding="lg">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-dutch-purple/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-dutch-purple" />
                </div>
                <h3 className="text-lg font-semibold">Multijoueur</h3>
                <p className="text-gray-600 text-sm">
                  Jusqu'à 10 joueurs simultanés. Parfait pour les grandes tablées.
                </p>
              </div>
            </UnifiedCard>

            <UnifiedCard variant="light" padding="lg">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-dutch-orange/10 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-dutch-orange" />
                </div>
                <h3 className="text-lg font-semibold">IA Intégrée</h3>
                <p className="text-gray-600 text-sm">
                  Le Professeur Cartouche commente vos parties avec humour et perspicacité.
                </p>
              </div>
            </UnifiedCard>

            <UnifiedCard variant="light" padding="lg">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold">Gratuit</h3>
                <p className="text-gray-600 text-sm">
                  Et ça le restera ! Aucune publicité intrusive, aucun abonnement caché.
                </p>
              </div>
            </UnifiedCard>
          </div>

          {/* Mission */}
          <UnifiedCard variant="light" padding="lg">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">Notre Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous croyons que les meilleurs moments se passent autour d'une table, avec des amis, 
                des cartes et quelques éclats de rire. Notre mission est de faciliter ces moments 
                précieux en vous débarrassant des tracas logistiques.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dutch Card Game n'est pas qu'une application, c'est un facilitateur de souvenirs. 
                Chaque partie enregistrée, chaque statistique calculée, chaque commentaire du 
                Professeur Cartouche contribue à enrichir l'expérience de jeu.
              </p>
            </div>
          </UnifiedCard>

          {/* Call to action */}
          <div className="text-center">
            <UnifiedButton 
              onClick={() => navigate('/game/setup')}
              variant="primary"
              size="lg"
            >
              Commencer une partie
            </UnifiedButton>
          </div>
        </div>
      </UnifiedPageLayout>
    </>
  );
};

export default AboutPage;

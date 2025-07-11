
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSEO } from '@/hooks/useSEO';
import { StructuredData } from '@/components/seo/StructuredData';
import { Heart, Users, Smartphone, Zap } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import UnifiedHeader from '@/components/layout/UnifiedHeader';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'À propos - Dutch Card Game | Application jeu de cartes',
    description: 'Découvrez Dutch Card Game, l\'application web gratuite pour suivre vos scores de jeu de cartes. Créée pour les soirées entre amis, interface moderne et intuitive.',
    keywords: 'dutch card game, à propos, application jeu cartes, équipe développement, histoire dutch'
  });

  return (
    <PageShell variant="minimal">
      <StructuredData 
        type="WebApplication" 
        data={{
          name: 'Dutch Card Game',
          description: 'Application web pour le jeu de cartes Dutch',
          applicationCategory: 'Game',
          operatingSystem: 'Web Browser'
        }} 
      />
      
      <UnifiedHeader 
        title="À propos de Dutch"
        showBackButton
        onBack={() => navigate('/')}
        showSettings={true}
      />

      <div className="p-8 pt-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="vision-card">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  L'application compagnon pour vos soirées jeux
                </h2>
                <p className="max-w-2xl mx-auto leading-relaxed text-gray-600">
                  Dutch Card Game est née d'une frustration simple : combien de fois avez-vous perdu 
                  le carnet de scores au milieu d'une partie ? Nous avons créé cette application pour 
                  que vous puissiez vous concentrer sur l'essentiel : passer un bon moment entre amis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="vision-card">
              <CardContent className="p-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold">100% Web</h3>
                  <p className="text-sm text-gray-600">
                    Aucune installation nécessaire. Fonctionne sur tous vos appareils, même hors-ligne.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="vision-card">
              <CardContent className="p-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Multijoueur</h3>
                  <p className="text-sm text-gray-600">
                    Jusqu'à 10 joueurs simultanés. Parfait pour les grandes tablées.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="vision-card">
              <CardContent className="p-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold">IA Intégrée</h3>
                  <p className="text-sm text-gray-600">
                    Le Professeur Cartouche commente vos parties avec humour et perspicacité.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="vision-card">
              <CardContent className="p-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Gratuit</h3>
                  <p className="text-sm text-gray-600">
                    Et ça le restera ! Aucune publicité intrusive, aucun abonnement caché.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mission */}
          <Card className="vision-card">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Notre Mission</h3>
                <p className="leading-relaxed text-gray-600">
                  Nous croyons que les meilleurs moments se passent autour d'une table, avec des amis, 
                  des cartes et quelques éclats de rire. Notre mission est de faciliter ces moments 
                  précieux en vous débarrassant des tracas logistiques.
                </p>
                <p className="leading-relaxed text-gray-600">
                  Dutch Card Game n'est pas qu'une application, c'est un facilitateur de souvenirs. 
                  Chaque partie enregistrée, chaque statistique calculée, chaque commentaire du 
                  Professeur Cartouche contribue à enrichir l'expérience de jeu.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to action */}
          <div className="text-center">
            <Button 
              variant="default"
              size="lg"
              onClick={() => navigate('/setup')}
              className="glass-button"
            >
              Commencer une partie
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AboutPage;

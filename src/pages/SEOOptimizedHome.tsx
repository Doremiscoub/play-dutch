import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { EnhancedSEO } from '@/components/seo/EnhancedSEO';
import { CoreWebVitalsOptimizer } from '@/components/seo/CoreWebVitalsOptimizer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, Users, Zap, BarChart3, Sparkles } from 'lucide-react';
import LazyHomeSections from '@/components/home/LazyHomeSections';

const SEOOptimizedHome: React.FC = () => {
  const navigate = useNavigate();

  // SEO ultra-optimisé pour la page d'accueil
  useSEO({
    title: 'Dutch Card Game - Application Gratuite pour Jeu de Cartes Entre Amis',
    description: 'Application web gratuite pour jouer au Dutch, le célèbre jeu de cartes convivial. Interface moderne, hors-ligne, avec IA commentateur. Support 2-10 joueurs. Parfait pour vos soirées entre amis.',
    keywords: 'dutch card game, jeu de cartes dutch, application gratuite, soirée entre amis, jeu de société, PWA, hors-ligne, multijoueur, IA commentateur, scores automatiques, statistiques, mobile, desktop',
    image: '/opengraph-dutch.png',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dutch-card-game.lovable.app/' }
    ],
    faqItems: [
      {
        question: 'Qu\'est-ce que le jeu de cartes Dutch ?',
        answer: 'Le Dutch est un jeu de cartes stratégique où l\'objectif est d\'obtenir le score le plus bas possible en utilisant les pouvoirs spéciaux des cartes. Parfait pour 2 à 10 joueurs.'
      },
      {
        question: 'L\'application Dutch Card Game est-elle gratuite ?',
        answer: 'Oui, l\'application Dutch Card Game est entièrement gratuite. Aucun achat intégré, aucun abonnement. Jouez autant que vous voulez sans limitation.'
      },
      {
        question: 'Peut-on jouer hors-ligne ?',
        answer: 'Absolument ! L\'application fonctionne entièrement hors-ligne grâce à la technologie PWA. Idéal pour jouer n\'importe où, même sans connexion internet.'
      },
      {
        question: 'Combien de joueurs peuvent participer ?',
        answer: 'L\'application supporte de 2 à 10 joueurs simultanément. Parfait pour les petites soirées ou les grandes réunions de famille.'
      }
    ],
    gameInfo: {
      players: '2-10',
      duration: '15-30 minutes',
      difficulty: 'Facile à apprendre'
    }
  });

  const features = [
    {
      icon: <Play className="h-8 w-8 text-primary" />,
      title: 'Interface Simple',
      description: 'Interface intuitive et moderne, optimisée pour tous les appareils. Commencez à jouer en quelques clics.',
      highlight: 'Démarrage instantané'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: '2-10 Joueurs',
      description: 'Parfait pour les soirées entre amis ou en famille. Gérez facilement tous les joueurs.',
      highlight: 'Multijoueur local'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: '100% Gratuit',
      description: 'Application entièrement gratuite, sans publicité intrusive ni achat intégré.',
      highlight: 'Toujours gratuit'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'IA Commentateur',
      description: 'Professeur Cartouche vous accompagne avec des commentaires amusants et personnalisés.',
      highlight: 'IA unique'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: 'Statistiques Avancées',
      description: 'Suivez vos performances, consultez l\'historique et analysez vos stratégies.',
      highlight: 'Analytics complets'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: 'Hors-ligne',
      description: 'Fonctionne parfaitement sans connexion internet grâce à la technologie PWA.',
      highlight: 'PWA avancée'
    }
  ];

  return (
    <>
      <CoreWebVitalsOptimizer />
      <EnhancedSEO 
        title="Dutch Card Game - Application Gratuite pour Jeu de Cartes Entre Amis"
        description="Application web gratuite pour jouer au Dutch, le célèbre jeu de cartes convivial. Interface moderne, hors-ligne, avec IA commentateur. Support 2-10 joueurs."
        keywords="dutch card game, jeu de cartes dutch, application gratuite, soirée entre amis, jeu de société, PWA, hors-ligne, multijoueur"
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dutch-card-game.lovable.app/' }
        ]}
        faqItems={[
          {
            question: 'Qu\'est-ce que le jeu de cartes Dutch ?',
            answer: 'Le Dutch est un jeu de cartes stratégique où l\'objectif est d\'obtenir le score le plus bas possible en utilisant les pouvoirs spéciaux des cartes.'
          }
        ]}
        gameInfo={{
          players: '2-10',
          duration: '15-30 minutes',
          difficulty: 'Facile à apprendre'
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          
          {/* Hero Section Optimisée SEO */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Dutch Card Game
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              L'application gratuite pour jouer au <strong>Dutch</strong>, le jeu de cartes convivial parfait pour vos soirées entre amis
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interface moderne • Hors-ligne • IA commentateur • 2-10 joueurs • Statistiques avancées
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/setup')}
                className="px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Commencer une partie
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/rules')}
                className="px-8 py-4 text-lg"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Apprendre les règles
              </Button>
            </div>
          </motion.section>

          {/* Features Grid - SEO Optimisé */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Pourquoi choisir notre application Dutch ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {feature.icon}
                        <div className="ml-3">
                          <h3 className="font-semibold text-lg">{feature.title}</h3>
                          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                            {feature.highlight}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* SEO Content enrichi */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16 prose prose-lg max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Le Dutch : Votre nouveau jeu de cartes préféré</h2>
            <p className="text-muted-foreground mb-4">
              Le <strong>jeu de cartes Dutch</strong> est devenu un incontournable des soirées entre amis. 
              Notre application gratuite vous permet de découvrir ce jeu passionnant avec une interface moderne 
              et des fonctionnalités uniques comme l'IA commentateur <strong>Professeur Cartouche</strong>.
            </p>
            <p className="text-muted-foreground mb-4">
              Que vous soyez débutant ou expert, notre application s'adapte à votre niveau. 
              Les <strong>règles du Dutch</strong> sont simples à apprendre mais offrent une profondeur stratégique 
              qui rend chaque partie unique et captivante.
            </p>
            <p className="text-muted-foreground">
              Téléchargeable gratuitement et fonctionnant hors-ligne, c'est l'outil parfait pour animer 
              vos soirées jeux, que vous soyez chez vous ou en déplacement.
            </p>
          </motion.section>

          {/* Lazy loaded sections pour les performances */}
          <LazyHomeSections navigate={navigate} />
        </div>
      </div>
    </>
  );
};

export default SEOOptimizedHome;
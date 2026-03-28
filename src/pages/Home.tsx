import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { useTutorial } from '@/hooks/useTutorial';
import { InteractiveTutorialV2 } from '@/components/tutorial/InteractiveTutorialV2';
import { motion } from 'framer-motion';
import { Gamepad2, Users, Heart, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import SimplifiedHeroSection from '@/components/home/SimplifiedHeroSection';
import LazyHomeSections from '@/components/home/LazyHomeSections';
import HomeLayout from '@/components/layout/HomeLayout';
import PWAPromotionCard from '@/components/pwa/PWAPromotionCard';
import { useAds } from '@/contexts/EnhancedAdContext';
import ProductionAdSlot from '@/components/ads/ProductionAdSlot';
import AdPerformanceTracker from '@/components/ads/AdPerformanceTracker';
import AdSenseMetrics from '@/components/ads/AdSenseMetrics';
import { logger } from '@/utils/logger';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { showTutorial, closeTutorial, startTutorial: _startTutorial, isLoading } = useTutorial();
  const { shouldShowAds } = useAds();

  const seoData = {
    title: 'Dutch Card Game - Application compagnon gratuite pour jeu de cartes avec IA',
    description: 'Application compagnon pour vos parties de cartes Dutch réelles. Calculez automatiquement les scores, consultez les statistiques et amusez-vous avec le Professeur Cartouche !',
    keywords: 'dutch, application compagnon, cartes physiques, calculateur scores, professeur cartouche, hors ligne, gratuit'
  };
  useSEO(seoData);

  const features = [
    {
      icon: <div className="text-xl">🃏</div>,
      title: "Compagnon de cartes",
      description: "Sortez vos cartes Dutch, on gère les scores !",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "2 à 10 joueurs",
      description: "Parfait pour vos tablées entre amis",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "100% hors-ligne",
      description: "Fonctionne sans internet ni inscription",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "IA Professeur Cartouche",
      description: "Commentaires intelligents en temps réel",
      color: "text-green-600",
      bg: "bg-green-50",
    }
  ];

  return (
    <>
      <PageShell variant="default">
        <MobileOptimizer pageType="home" className="min-h-screen">
          <UnifiedHeader
            {...useUnifiedHeader({ hideTitle: true })}
          />

          <HomeLayout>
            <SimplifiedHeroSection />

            {shouldShowAds && (
              <section className="py-4">
                <ProductionAdSlot placement="homepage-hero" priority="high" />
              </section>
            )}

            {/* Features Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6">
              <div className="w-full max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-3 text-foreground">
                    Votre compagnon de jeu idéal
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                    Sortez vos cartes Dutch et laissez l'application s'occuper du reste
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-5 sm:p-6 text-center">
                          <div className={`${feature.bg} ${feature.color} rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4`}>
                            {feature.icon}
                          </div>
                          <h3 className="font-semibold text-foreground mb-1.5">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full max-w-3xl mx-auto"
              >
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-[hsl(221,83%,53%)] via-[hsl(258,90%,60%)] to-[hsl(258,90%,50%)] text-white shadow-lg">
                  <CardContent className="p-8 sm:p-10 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold font-display mb-3">
                      Prêt à jouer ?
                    </h2>
                    <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                      Sortez vos cartes Dutch et lancez l'application. C'est gratuit, intelligent et sans inscription.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => navigate('/setup')}
                        size="xl"
                        className="bg-white text-[hsl(258,90%,50%)] hover:bg-white/90 font-bold rounded-xl"
                      >
                        <Gamepad2 className="h-5 w-5" />
                        Nouvelle partie
                      </Button>
                      <Button
                        onClick={() => navigate('/rules')}
                        variant="outline"
                        size="lg"
                        className="border-white/40 text-white bg-white/10 hover:bg-white/20 rounded-xl"
                      >
                        <BookOpen className="h-4 w-4" />
                        Voir les règles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            <LazyHomeSections navigate={navigate} />

            {shouldShowAds && (
              <section className="mt-12 mb-8">
                <ProductionAdSlot placement="stats-top" priority="low" />
              </section>
            )}
          </HomeLayout>

          <AdPerformanceTracker />
          <AdSenseMetrics />

          <div className="container mx-auto px-4 pb-6">
            <PWAPromotionCard
              onInstall={() => logger.debug('PWA Install triggered')}
              onDismiss={() => logger.debug('PWA Promo dismissed')}
            />
          </div>
        </MobileOptimizer>
      </PageShell>

      {!isLoading && (
        <Suspense fallback={null}>
          <InteractiveTutorialV2
            isOpen={showTutorial}
            onClose={closeTutorial}
          />
        </Suspense>
      )}
    </>
  );
};

export default Home;

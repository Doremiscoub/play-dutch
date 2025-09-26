import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { useTutorial } from '@/hooks/useTutorial';
import { InteractiveTutorialV2 } from '@/components/tutorial/InteractiveTutorialV2';
import { motion } from 'framer-motion';
import { Gamepad2, Users, Heart, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
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
import { PWAInstallBannerV2 } from '@/components/pwa/PWAInstallBannerV2';
import { useAds } from '@/contexts/EnhancedAdContext';
import ProductionAdSlot from '@/components/ads/ProductionAdSlot';
import AdPerformanceTracker from '@/components/ads/AdPerformanceTracker';
import AdSenseMetrics from '@/components/ads/AdSenseMetrics';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { showTutorial, closeTutorial, startTutorial, isLoading } = useTutorial();
  const { shouldShowAds } = useAds();

  // SEO optimisé
  const seoData = {
    title: 'Dutch Card Game - Application compagnon gratuite pour jeu de cartes avec IA',
    description: 'Application compagnon pour vos parties de cartes Dutch réelles. Calculez automatiquement les scores, consultez les statistiques et amusez-vous avec le Professeur Cartouche ! Fonctionne hors-ligne, gratuit et sans inscription.',
    keywords: 'dutch, application compagnon, cartes physiques, calculateur scores, professeur cartouche, IA commentateur, hors ligne, gratuit, soirée entre amis, compagnon de jeu'
  };

  useSEO(seoData);

  const features = [
    {
      icon: <div className="text-2xl">🃏</div>,
      title: "Compagnon de cartes",
      description: "Sortez vos cartes Dutch, on gère les scores !",
      gradient: "from-trinity-orange-400 to-trinity-orange-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "2 à 10 joueurs",
      description: "Parfait pour vos tablées entre amis",
      gradient: "from-trinity-blue-400 to-trinity-blue-600"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "100% hors-ligne",
      description: "Fonctionne sans internet ni inscription",
      gradient: "from-trinity-purple-400 to-trinity-purple-600"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "IA Professeur Cartouche",
      description: "Commentaires intelligents en temps réel",
      gradient: "from-trinity-blue-500 to-trinity-purple-500"
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

            {/* Ad optimisée après le hero */}
            <section className="py-4">
              <ProductionAdSlot placement="homepage-hero" priority="high" />
            </section>

            {/* Section Features Colorée */}
            <section className="relative py-12 sm:py-20 px-2 sm:px-4 z-10">
              <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent mb-6 leading-tight py-2">
                    🌟 Votre Compagnon de Jeu Idéal 🌟
                  </h2>
                  <p className="text-xl text-neutral-700 font-bold max-w-3xl mx-auto">
                    🃏 Sortez vos cartes Dutch physiques et laissez l'application s'occuper du reste ! 📱✨
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="group"
                    >
                      <Card className="h-full bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden relative">
                        {/* Gradient de fond animé */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        />
                        
                        <CardContent className="relative z-10 p-4 sm:p-6 lg:p-8 text-center">
                          <motion.div
                            className={`bg-gradient-to-br ${feature.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <h3 className="font-black text-xl text-gray-900 mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 font-semibold">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Final Ultra-Coloré */}
            <section className="relative py-12 sm:py-20 px-2 sm:px-4 z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-4xl mx-auto px-2 sm:px-4"
              >
                <Card className="bg-gradient-to-br from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 backdrop-blur-xl border-0 shadow-3xl text-white overflow-hidden relative">
                  {/* Overlay pour améliorer le contraste */}
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Effets de particules dans le fond - réduits pour la lisibilité */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/15 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [-20, 20, -20],
                          opacity: [0.1, 0.3, 0.1],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 4 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.5
                        }}
                      />
                    ))}
                  </div>
                  
                  <CardContent className="relative z-10 p-6 sm:p-8 lg:p-12 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="space-y-8"
                    >
                      <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                          Prêt à accompagner votre première partie ?
                        </h2>
                        <p className="text-lg md:text-xl font-semibold text-white/90 max-w-2xl mx-auto leading-relaxed">
                          🃏 Sortez vos cartes Dutch et lancez l'application compagnon !<br/>
                          C'est gratuit, intelligent et sans inscription ! 🚀✨
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={() => navigate('/setup')}
                            size="xl"
                            className="bg-white text-trinity-purple-900 hover:bg-trinity-purple-700 hover:text-white font-black text-lg px-8 py-4 shadow-xl rounded-2xl border-2 border-trinity-purple-200 transition-all duration-300 min-w-[200px]"
                          >
                            <Gamepad2 className="h-5 w-5 mr-2" />
                            C'EST PARTI !
                          </Button>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={() => navigate('/rules')}
                            variant="outline"
                            size="lg"
                            className="border-2 border-white/80 text-white bg-white/10 hover:bg-white hover:text-trinity-purple-700 font-semibold text-base px-6 py-3 rounded-2xl backdrop-blur-sm transition-all duration-300 min-w-[140px]"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Règles
                          </Button>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={startTutorial}
                            variant="outline"
                            size="lg"
                            className="border-2 border-white/80 text-white bg-white/10 hover:bg-white hover:text-trinity-purple-700 font-semibold text-base px-6 py-3 rounded-2xl backdrop-blur-sm transition-all duration-300 min-w-[160px]"
                          >
                            <HelpCircle className="h-4 w-4 mr-2" />
                            Guide interactif
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            <LazyHomeSections navigate={navigate} />

            {/* Bannière publicitaire finale */}
            <section className="mt-16 mb-8">
              <ProductionAdSlot placement="stats-top" priority="low" />
            </section>
          </HomeLayout>

          {/* Performance trackers invisibles */}
          <AdPerformanceTracker />
          <AdSenseMetrics />

          {/* PWA Promotion Card */}
          <div className="container mx-auto px-4 pb-6">
            <PWAPromotionCard 
              onInstall={() => console.log('PWA Install triggered')}
              onDismiss={() => console.log('PWA Promo dismissed')}
            />
          </div>
        </MobileOptimizer>
    </PageShell>

    {/* Tutorial interactif */}
    {!isLoading && (
      <Suspense fallback={null}>
        <InteractiveTutorialV2 
          isOpen={showTutorial} 
          onClose={closeTutorial}
        />
      </Suspense>
    )}
  </>);
};

export default Home;
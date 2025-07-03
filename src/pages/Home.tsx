import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Users, Trophy, Heart, Zap, Sparkles, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import PageShell from '@/components/layout/PageShell';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes entre amis',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur Professeur Cartouche. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche'
  });

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Interface simple",
      description: "Ajoutez les scores en un clic",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "2 à 10 joueurs",
      description: "Pour toutes les tablées",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "100% gratuit",
      description: "Aucun abonnement requis",
      gradient: "from-pink-400 to-red-500"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "IA Professeur Cartouche",
      description: "Commentaires humoristiques",
      gradient: "from-purple-400 to-indigo-500"
    }
  ];

  return (
    <PageShell variant="default">
      {/* Fond coloré dynamique */}
      <div className="fixed inset-0 bg-gradient-to-br from-dutch-blue/20 via-dutch-purple/15 to-dutch-orange/20">
        {/* Particules flottantes colorées */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              i % 4 === 0 ? 'bg-dutch-blue/30' :
              i % 4 === 1 ? 'bg-dutch-purple/30' :
              i % 4 === 2 ? 'bg-dutch-orange/30' : 'bg-yellow-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
        
        {/* Formes géométriques colorées */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-dutch-orange/25 to-yellow-400/25 rounded-full blur-lg"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <UnifiedHeader 
        title="Dutch Card Game"
        showBackButton={false}
        showSettings={true}
        hideTitle={true}
      />

      {/* Hero Section Ultra-Colorée */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 z-10">
        <div className="relative text-center max-w-4xl mx-auto">
          {/* Logo avec effets colorés */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            {/* Halo coloré derrière le logo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-dutch-blue/30 via-dutch-purple/30 to-dutch-orange/30 rounded-full blur-2xl scale-150"
              animate={{
                rotate: [0, 360],
                scale: [1.2, 1.6, 1.2]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <img 
              src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
              alt="Dutch Card Game"
              className="relative z-10 w-auto h-36 sm:h-44 md:h-52 mx-auto object-contain drop-shadow-2xl"
            />
            
            {/* Étoiles scintillantes autour du logo */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-2xl"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${15 + Math.random() * 70}%`,
                }}
                animate={{
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                ⭐
              </motion.div>
            ))}
          </motion.div>

          {/* Titre avec gradient coloré */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent drop-shadow-lg">
                Le jeu de cartes Dutch
              </span>
              <br />
              <span className="bg-gradient-to-r from-dutch-orange via-yellow-400 to-dutch-blue bg-clip-text text-transparent">
                réinventé
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 font-bold max-w-2xl mx-auto leading-relaxed">
              🎉 Suivez vos scores, défiez vos amis, amusez-vous avec le{' '}
              <span className="text-dutch-purple font-black">Professeur Cartouche</span> ! 🎓
            </p>
          </motion.div>

          {/* CTA Mega-Visible */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Bouton principal MEGA visible */}
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Effet de brillance animé */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange rounded-2xl blur opacity-70"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <Button
                  onClick={() => navigate('/setup')}
                  size="xl"
                  className="relative z-10 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange hover:from-dutch-purple hover:via-dutch-orange hover:to-dutch-blue text-white font-black text-xl sm:text-2xl px-16 py-8 shadow-2xl border-4 border-white/50 group-hover:border-white transition-all duration-300"
                >
                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <Gamepad2 className="h-8 w-8 group-hover:animate-pulse" />
                    🎮 JOUER MAINTENANT ! 🚀
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </motion.div>
                </Button>
              </motion.div>
              
              {/* Bouton secondaire stylé */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate('/rules')}
                  variant="outline"
                  size="xl"
                  className="border-4 border-dutch-blue bg-white/90 backdrop-blur-sm hover:bg-dutch-blue hover:text-white transition-all duration-300 text-dutch-blue font-bold text-lg px-10 py-6 shadow-lg"
                >
                  <BookOpen className="h-6 w-6 mr-3" />
                  📖 Les règles
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats colorées et fun */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-gradient-to-br from-dutch-blue/80 to-dutch-purple/80 backdrop-blur-xl rounded-2xl p-6 text-white shadow-2xl border border-white/30"
            >
              <div className="text-3xl font-black">2,500+</div>
              <div className="text-sm font-bold opacity-90">🏆 joueurs actifs</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="bg-gradient-to-br from-dutch-orange/80 to-yellow-400/80 backdrop-blur-xl rounded-2xl p-6 text-white shadow-2xl border border-white/30"
            >
              <div className="text-3xl font-black">15k+</div>
              <div className="text-sm font-bold opacity-90">🎮 parties jouées</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-gradient-to-br from-dutch-purple/80 to-pink-500/80 backdrop-blur-xl rounded-2xl p-6 text-white shadow-2xl border border-white/30"
            >
              <div className="text-3xl font-black">100%</div>
              <div className="text-sm font-bold opacity-90">💖 gratuit</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Features Colorée */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent mb-6">
              🌟 Pourquoi Dutch Card Game ? 🌟
            </h2>
            <p className="text-xl text-gray-700 font-bold max-w-3xl mx-auto">
              Une application pensée pour transformer vos soirées jeux en moments inoubliables ! 🎉
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  
                  <CardContent className="relative z-10 p-8 text-center">
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
      <section className="relative py-20 px-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-dutch-blue/90 via-dutch-purple/90 to-dutch-orange/90 backdrop-blur-xl border-0 shadow-3xl text-white overflow-hidden relative">
            {/* Effets de particules dans le fond */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
            
            <CardContent className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  🎊 Prêt pour votre première partie ? 🎊
                </h2>
                <p className="text-xl font-bold mb-8 max-w-2xl mx-auto">
                  Lancez-vous dès maintenant dans l'aventure Dutch ! 
                  C'est gratuit, fun et sans inscription ! 🚀✨
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => navigate('/setup')}
                      size="xl"
                      className="bg-white text-dutch-purple hover:bg-yellow-400 hover:text-dutch-blue font-black text-xl px-12 py-6 shadow-2xl border-4 border-white/50 transition-all duration-300"
                    >
                      <Gamepad2 className="h-6 w-6 mr-3" />
                      🎮 C'EST PARTI ! 🎯
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => navigate('/history')}
                      variant="outline"
                      size="xl"
                      className="border-4 border-white text-white bg-transparent hover:bg-white hover:text-dutch-purple font-bold text-lg px-10 py-6 transition-all duration-300"
                    >
                      <Trophy className="h-5 w-5 mr-2" />
                      📊 Historique
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </PageShell>
  );
};

export default Home;
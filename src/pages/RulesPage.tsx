import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, Gamepad2, Clock, Target, Award, CopyCheck, Crown, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/hooks/use-theme';

const RulesPage: React.FC = () => {
  const navigate = useNavigate();
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto p-4 pb-16 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/')} 
          className="shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-dutch-blue" />
          Règles du jeu
        </h1>
      </div>

      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden rounded-3xl border-none bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-dutch-purple" />
                À propos de Dutch
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-dutch-orange" />
                  </div>
                  <span>2 à 10 joueurs</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-dutch-orange" />
                  </div>
                  <span>Environ 30 minutes</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                    <Target className="h-4 w-4 text-dutch-orange" />
                  </div>
                  <span>Objectif : Avoir le score le plus bas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden rounded-3xl border-none bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-dutch-purple" />
                Déroulement
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex gap-3 items-start bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-dutch-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-dutch-blue font-medium">1</span>
                  </div>
                  <p>Chaque joueur reçoit 4 cartes face cachée. Il est interdit de regarder ses cartes sans autorisation.</p>
                </div>
                <div className="flex gap-3 items-start bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-dutch-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-dutch-blue font-medium">2</span>
                  </div>
                  <p>Au début, chaque joueur peut regarder 2 de ses 4 cartes. Les joueurs jouent à tour de rôle dans le sens des aiguilles d'une montre.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden rounded-3xl border-none bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <CopyCheck className="h-5 w-5 text-dutch-purple" />
                À votre tour
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="font-medium">
                  Piochez une carte. Vous pouvez soit :
                </p>
                <div className="bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-dutch-orange/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-dutch-orange font-medium">•</span>
                    </div>
                    <span>Échanger cette carte avec l'une de vos cartes face cachée</span>
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-dutch-orange/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-dutch-orange font-medium">•</span>
                    </div>
                    <span>La défausser directement</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 backdrop-blur-sm border border-white/40 shadow-sm">
                  <p className="italic text-gray-700">
                    Lorsqu'un joueur défausse une carte, tous les autres peuvent se défausser immédiatement de la même carte (si elle est dans leur main).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden rounded-3xl border-none bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <Crown className="h-5 w-5 text-dutch-purple" />
                Fin de manche
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex gap-3 items-start bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-dutch-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-dutch-blue font-medium">1</span>
                  </div>
                  <p>Un joueur peut décider d'arrêter la manche en disant "Dutch". Tous les autres joueurs jouent alors un dernier tour.</p>
                </div>
                <div className="flex gap-3 items-start bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-dutch-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-dutch-blue font-medium">2</span>
                  </div>
                  <p>Les points sont comptés à la fin de la manche.</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-dutch-orange/20 to-dutch-orange/10 backdrop-blur-sm border border-white/40 shadow-sm">
                  <p className="font-medium text-dutch-orange">
                    Si le joueur qui a dit "Dutch" n'a pas le score le plus bas, il reçoit une pénalité de 10 points.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden rounded-3xl border-none bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <Award className="h-5 w-5 text-dutch-purple" />
                Valeur des cartes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                      <span className="text-dutch-blue font-medium">1-10</span>
                    </div>
                    <span className="text-gray-700">Valeur numérique</span>
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                      <span className="text-dutch-blue font-medium">J/Q/K</span>
                    </div>
                    <span className="text-gray-700">10 points</span>
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                      <span className="text-dutch-blue font-medium">K♠</span>
                    </div>
                    <span className="text-gray-700">15 points</span>
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                      <span className="text-dutch-blue font-medium">K♥♦</span>
                    </div>
                    <span className="text-gray-700">0 point</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden rounded-3xl border-none bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-dutch-purple" />
                Cartes spéciales
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-dutch-purple/10 flex items-center justify-center">
                    <span className="text-dutch-purple font-medium">J</span>
                  </div>
                  <span>Échange deux cartes entre n'importe quels joueurs</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-dutch-purple/10 flex items-center justify-center">
                    <span className="text-dutch-purple font-medium">Q</span>
                  </div>
                  <span>Permet de regarder une de ses propres cartes</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-dutch-purple/10 flex items-center justify-center">
                    <span className="text-dutch-purple font-medium">K♥♦</span>
                  </div>
                  <span>Valent 0 point</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center pt-4"
        >
          <Button
            onClick={() => navigate('/')}
            className="rounded-full"
            variant="gradient"
          >
            Retour à l'accueil
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RulesPage;

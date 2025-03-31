
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, Gamepad2, Clock, Target, Award, CopyCheck, Crown, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RulesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto p-4 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-dutch-blue flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Règles du jeu
        </h1>
      </div>

      <motion.div 
        className="space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="dutch-card hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-3 text-dutch-blue flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-dutch-purple" />
            À propos de Dutch
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Users className="h-4 w-4 text-dutch-orange flex-shrink-0" />
              <span>2 à 10 joueurs</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-dutch-orange flex-shrink-0" />
              <span>Environ 30 minutes</span>
            </li>
            <li className="flex items-center gap-2">
              <Target className="h-4 w-4 text-dutch-orange flex-shrink-0" />
              <span>Objectif : Avoir le score le plus bas</span>
            </li>
          </ul>
        </div>

        <div className="dutch-card hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-3 text-dutch-blue flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-dutch-purple" />
            Déroulement
          </h2>
          <div className="space-y-3 text-gray-700">
            <p className="flex gap-2">
              <span className="text-dutch-blue font-medium rounded-full bg-dutch-blue/10 h-5 w-5 flex items-center justify-center flex-shrink-0">1</span>
              Chaque joueur reçoit 4 cartes face cachée. Il est interdit de regarder ses cartes sans autorisation.
            </p>
            <p className="flex gap-2">
              <span className="text-dutch-blue font-medium rounded-full bg-dutch-blue/10 h-5 w-5 flex items-center justify-center flex-shrink-0">2</span>
              Au début, chaque joueur peut regarder 2 de ses 4 cartes. Les joueurs jouent à tour de rôle dans le sens des aiguilles d'une montre.
            </p>
          </div>
        </div>

        <div className="dutch-card hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-3 text-dutch-blue flex items-center gap-2">
            <CopyCheck className="h-5 w-5 text-dutch-purple" />
            À votre tour
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              Piochez une carte. Vous pouvez soit :
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-dutch-orange font-medium rounded-full bg-dutch-orange/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
                <span>Échanger cette carte avec l'une de vos cartes face cachée</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-dutch-orange font-medium rounded-full bg-dutch-orange/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
                <span>La défausser directement</span>
              </li>
            </ul>
            <p className="bg-dutch-blue/5 p-3 rounded-xl italic">
              Lorsqu'un joueur défausse une carte, tous les autres peuvent se défausser immédiatement de la même carte (si elle est dans leur main).
            </p>
          </div>
        </div>

        <div className="dutch-card hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-3 text-dutch-blue flex items-center gap-2">
            <Crown className="h-5 w-5 text-dutch-purple" />
            Fin de manche
          </h2>
          <div className="space-y-3 text-gray-700">
            <p className="flex gap-2">
              <span className="text-dutch-blue font-medium rounded-full bg-dutch-blue/10 h-5 w-5 flex items-center justify-center flex-shrink-0">1</span>
              Un joueur peut décider d'arrêter la manche en disant "Dutch". Tous les autres joueurs jouent alors un dernier tour.
            </p>
            <p className="flex gap-2">
              <span className="text-dutch-blue font-medium rounded-full bg-dutch-blue/10 h-5 w-5 flex items-center justify-center flex-shrink-0">2</span>
              Les points sont comptés à la fin de la manche.
            </p>
            <p className="bg-dutch-orange/10 p-3 rounded-xl text-dutch-orange font-medium">
              Si le joueur qui a dit "Dutch" n'a pas le score le plus bas, il reçoit une pénalité de 10 points.
            </p>
          </div>
        </div>

        <div className="dutch-card hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-3 text-dutch-blue flex items-center gap-2">
            <Award className="h-5 w-5 text-dutch-purple" />
            Valeur des cartes
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-dutch-blue font-medium rounded-full bg-dutch-blue/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
              <span>Cartes numérotées : leur valeur numérique</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dutch-blue font-medium rounded-full bg-dutch-blue/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
              <span>Figures (Valet, Dame, Roi noir) : 10 points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dutch-blue font-medium rounded-full bg-dutch-blue/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
              <span>Roi noir : 15 points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dutch-blue font-medium rounded-full bg-dutch-blue/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
              <span>Rois rouges : 0 point</span>
            </li>
          </ul>
        </div>

        <div className="dutch-card hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-3 text-dutch-blue flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-dutch-purple" />
            Cartes spéciales
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-dutch-purple font-medium rounded-full bg-dutch-purple/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
              <span>Valet : Échange deux cartes entre n'importe quels joueurs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dutch-purple font-medium rounded-full bg-dutch-purple/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
              <span>Dame : Permet de regarder une de ses propres cartes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-dutch-purple font-medium rounded-full bg-dutch-purple/10 h-5 w-5 flex items-center justify-center flex-shrink-0">•</span>
              <span>Rois rouges : Valent 0 point</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RulesPage;

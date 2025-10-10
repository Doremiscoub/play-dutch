
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, ChevronRight, X, Play, Award, DollarSign, Users, Clock, Rotate3D, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface InteractiveTutorialProps {
  onComplete: () => void;
}

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const tutorialSteps = [
    {
      title: "Bienvenue dans Dutch Blitz",
      description: "Apprenez les règles du jeu et comment utiliser cette application.",
      icon: BookOpen,
      color: "text-dutch-blue",
      content: (
        <div className="space-y-4">
          <p>Dutch Blitz est un jeu de cartes rapide et compétitif, parfait pour les soirées entre amis ou en famille.</p>
          <div className="flex items-center gap-2 justify-center my-4">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 rounded-full bg-dutch-blue flex items-center justify-center text-white text-2xl font-bold"
            >
              D
            </motion.div>
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
              className="h-16 w-16 rounded-full bg-dutch-orange flex items-center justify-center text-white text-2xl font-bold"
            >
              U
            </motion.div>
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              className="h-16 w-16 rounded-full bg-dutch-purple flex items-center justify-center text-white text-2xl font-bold"
            >
              T
            </motion.div>
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
              className="h-16 w-16 rounded-full bg-dutch-pink flex items-center justify-center text-white text-2xl font-bold"
            >
              C
            </motion.div>
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2 }}
              className="h-16 w-16 rounded-full bg-dutch-green flex items-center justify-center text-white text-2xl font-bold"
            >
              H
            </motion.div>
          </div>
          <p>Ce tutoriel vous expliquera les règles de base et comment utiliser l'application pour suivre vos scores.</p>
        </div>
      )
    },
    {
      title: "Principe du jeu",
      description: "Comprendre l'objectif et le déroulement du jeu.",
      icon: Trophy,
      color: "text-dutch-orange",
      content: (
        <div className="space-y-4">
          <p>Dans Dutch Blitz, chaque joueur a son propre jeu de cartes avec quatre couleurs différentes.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/70 p-3 rounded-xl border border-white/50 text-center">
              <div className="mb-2 font-medium">Objectif</div>
              <p className="text-sm">Être le premier à se débarrasser de toutes ses cartes en les plaçant au centre dans l'ordre croissant.</p>
            </div>
            <div className="bg-white/70 p-3 rounded-xl border border-white/50 text-center">
              <div className="mb-2 font-medium">Points</div>
              <p className="text-sm">Comptez les points à la fin de chaque manche pour déterminer un vainqueur.</p>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-20 bg-blue-500 rounded-lg relative flex items-center justify-center text-white font-bold"
            >
              1
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="w-14 h-20 bg-red-500 rounded-lg relative flex items-center justify-center text-white font-bold"
            >
              2
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="w-14 h-20 bg-green-500 rounded-lg relative flex items-center justify-center text-white font-bold"
            >
              3
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="w-14 h-20 bg-yellow-500 rounded-lg relative flex items-center justify-center text-white font-bold"
            >
              4
            </motion.div>
          </div>
        </div>
      )
    },
    {
      title: "Déroulement d'une manche",
      description: "Comment jouer une manche de Dutch Blitz.",
      icon: Clock,
      color: "text-dutch-purple",
      content: (
        <div className="space-y-4">
          <p>Chaque joueur joue simultanément, essayant de placer ses cartes sur les piles centrales.</p>
          
          <ol className="list-decimal pl-5 space-y-2">
            <li>Tous les joueurs jouent en même temps, sans attendre leur tour.</li>
            <li>Placez vos cartes au centre dans l'ordre croissant, de 1 à 10.</li>
            <li>Le premier joueur qui se débarrasse de toutes ses cartes crie "Dutch!" et la manche se termine.</li>
            <li>Les points sont calculés: on compte les cartes placées au centre (points positifs) et les cartes restantes (points négatifs).</li>
          </ol>
          
          <div className="bg-dutch-purple/10 p-3 rounded-xl text-dutch-purple flex items-center gap-2">
            <Rotate3D className="h-5 w-5 flex-shrink-0" />
            <p>Jouez vite! C'est un jeu d'adresse et de rapidité. Plus vous êtes rapide, plus vous avez de chances de gagner.</p>
          </div>
        </div>
      )
    },
    {
      title: "Le score 'Dutch'",
      description: "Comprendre les règles de score et le comptage des points.",
      icon: DollarSign,
      color: "text-dutch-green",
      content: (
        <div className="space-y-4">
          <p>À la fin de chaque manche, les scores sont calculés comme suit:</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/70 p-3 rounded-xl border border-dutch-green/30">
              <div className="text-center mb-2 font-medium text-dutch-green">Points positifs</div>
              <p className="text-sm">+1 point pour chaque carte que vous avez réussi à placer au centre.</p>
            </div>
            <div className="bg-white/70 p-3 rounded-xl border border-red-300">
              <div className="text-center mb-2 font-medium text-red-500">Points négatifs</div>
              <p className="text-sm">-2 points pour chaque carte qui vous reste en main à la fin.</p>
            </div>
          </div>
          
          <div className="bg-white/70 p-3 rounded-xl border border-dutch-orange/30">
            <div className="text-center mb-2 font-medium text-dutch-orange">Crier "Dutch!"</div>
            <p className="text-sm">Le joueur qui termine en premier crie "Dutch!" et la manche se termine immédiatement. C'est ce que nous notons comme "Dutch" dans l'application.</p>
          </div>
          
          <p className="text-center font-medium">Le joueur avec le score le plus bas à la fin de la partie est le vainqueur!</p>
        </div>
      )
    },
    {
      title: "Utiliser l'application",
      description: "Comment utiliser cette application pour suivre vos scores.",
      icon: Users,
      color: "text-dutch-pink",
      content: (
        <div className="space-y-4">
          <p>Cette application vous aide à suivre les scores de vos parties de Dutch Blitz.</p>
          
          <div className="space-y-2">
            <div className="bg-white/70 p-3 rounded-xl border border-white/50 flex items-start gap-3">
              <div className="bg-dutch-blue/20 p-2 rounded-full text-dutch-blue">1</div>
              <div>
                <div className="font-medium">Commencer une partie</div>
                <p className="text-sm">Ajoutez les noms des joueurs et commencez une nouvelle partie.</p>
              </div>
            </div>
            
            <div className="bg-white/70 p-3 rounded-xl border border-white/50 flex items-start gap-3">
              <div className="bg-dutch-blue/20 p-2 rounded-full text-dutch-blue">2</div>
              <div>
                <div className="font-medium">Ajouter les scores</div>
                <p className="text-sm">Après chaque manche, entrez le score de chaque joueur. Indiquez qui a crié "Dutch!"</p>
              </div>
            </div>
            
            <div className="bg-white/70 p-3 rounded-xl border border-white/50 flex items-start gap-3">
              <div className="bg-dutch-blue/20 p-2 rounded-full text-dutch-blue">3</div>
              <div>
                <div className="font-medium">Suivre les statistiques</div>
                <p className="text-sm">Consultez les statistiques détaillées pour voir les performances de chaque joueur.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dutch-pink/10 p-3 rounded-xl text-dutch-pink flex items-center gap-2">
            <Award className="h-5 w-5 flex-shrink-0" />
            <p>Vous pouvez utiliser le mode multijoueur pour que chaque joueur puisse suivre les scores sur son propre appareil!</p>
          </div>
        </div>
      )
    },
    {
      title: "Prêt à jouer!",
      description: "Vous connaissez maintenant les bases de Dutch Blitz.",
      icon: Play,
      color: "text-dutch-blue",
      content: (
        <div className="space-y-4 text-center">
          <div className="py-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto"
            >
              <Trophy className="h-20 w-20 text-dutch-yellow mx-auto" />
            </motion.div>
            <h3 className="text-lg font-medium mt-4">Félicitations!</h3>
            <p>Vous êtes maintenant prêt à jouer à Dutch Blitz.</p>
          </div>
          
          <div className="bg-dutch-blue/10 p-4 rounded-xl">
            <p className="mb-2">Conseil: Pour la première partie, commencez avec un jeu plus lent pour vous habituer aux règles, puis accélérez le rythme!</p>
            <Badge className="bg-dutch-blue text-white">Bon jeu!</Badge>
          </div>
          
          <Button 
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md mt-4"
          >
            <Play className="h-4 w-4 mr-2" />
            Commencer à jouer
          </Button>
        </div>
      )
    },
  ];
  
  const currentStep = tutorialSteps[step];
  const progress = ((step + 1) / tutorialSteps.length) * 100;
  
  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
      setShowTutorial(false);
    }
  };
  
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (!showTutorial) {
    return (
      <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-dutch-blue" />
            Tutoriel Interactif
          </CardTitle>
          <CardDescription>
            Apprenez à jouer à Dutch Blitz et à utiliser l'application
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-dutch-blue" />
                  <span className="font-medium">Apprenez les règles du jeu</span>
                </div>
                <Badge variant="outline" className="bg-dutch-blue/10 text-dutch-blue">5 min</Badge>
              </div>
              
              <p className="text-sm text-gray-600">
                Ce tutoriel interactif vous expliquera les règles de base de Dutch Blitz et comment utiliser cette application pour suivre vos scores.
              </p>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/70 rounded-xl p-2 text-center">
                  <Trophy className="h-4 w-4 text-dutch-orange mx-auto mb-1" />
                  <span className="text-xs">Règles</span>
                </div>
                <div className="bg-white/70 rounded-xl p-2 text-center">
                  <DollarSign className="h-4 w-4 text-dutch-green mx-auto mb-1" />
                  <span className="text-xs">Scores</span>
                </div>
                <div className="bg-white/70 rounded-xl p-2 text-center">
                  <Users className="h-4 w-4 text-dutch-purple mx-auto mb-1" />
                  <span className="text-xs">Application</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md"
            onClick={() => setShowTutorial(true)}
          >
            <Play className="h-4 w-4 mr-2" />
            Démarrer le tutoriel
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-xl">
          <CardHeader className="relative pb-2">
            <Button 
              variant="ghost" 
              size="icon-sm"
              onClick={() => setShowTutorial(false)}
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep.color} bg-white shadow-md mb-2`}>
              <currentStep.icon className="h-5 w-5" />
            </div>
            
            <Progress value={progress} className="h-1 mb-3" />
            
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{currentStep.title}</CardTitle>
                <CardDescription>{currentStep.description}</CardDescription>
              </div>
              <Badge variant="outline">{step + 1}/{tutorialSteps.length}</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            {currentStep.content}
          </CardContent>
          
          <CardFooter className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={step === 0}
              className="bg-white/50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </Button>
            
            <Button 
              onClick={nextStep}
              className={`bg-gradient-to-r ${step === tutorialSteps.length - 1 ? 'from-dutch-green to-dutch-blue' : 'from-dutch-blue to-dutch-purple'} text-white`}
            >
              {step === tutorialSteps.length - 1 ? 'Terminer' : 'Suivant'}
              {step === tutorialSteps.length - 1 ? <Play className="h-4 w-4 ml-1" /> : <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default InteractiveTutorial;

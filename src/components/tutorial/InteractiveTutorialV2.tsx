/**
 * Tutorial interactif moderne pour Dutch
 * Guide pas à pas pour les nouveaux utilisateurs
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Users,
  Target,
  Award,
  Sparkles,
  X,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
  tip?: string;
  action?: {
    label: string;
    handler: () => void;
  };
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: "Bienvenue dans Dutch!",
    description: "Découvrez comment jouer et gérer vos parties",
    content: (
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        <p className="text-lg">
          Dutch est votre compagnon digital pour les parties de cartes entre amis.
        </p>
        <p className="text-gray-600">
          Suivez ce guide interactif pour maîtriser toutes les fonctionnalités.
        </p>
      </div>
    ),
    tip: "Ce tutorial ne prend que 2 minutes ⏰"
  },
  {
    id: 2,
    title: "Créer une partie",
    description: "Ajoutez vos joueurs et configurez la partie",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Étape 1: Ajouter les joueurs
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Saisissez les noms des joueurs (2 à 10 maximum)
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Badge>👤</Badge>
              <span>Alice</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge>👤</Badge>
              <span>Bob</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge>👤</Badge>
              <span>Charlie</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 bg-green-50">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Étape 2: Définir la limite
          </h4>
          <p className="text-sm text-gray-600">
            Choisissez le score limite (généralement 100 points)
          </p>
        </div>
      </div>
    ),
    tip: "Les emojis sont automatiquement attribués aux joueurs 😊"
  },
  {
    id: 3,
    title: "Ajouter des manches",
    description: "Enregistrez les scores de chaque manche",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Interface de score</h4>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['Alice', 'Bob', 'Charlie'].map((name, i) => (
              <div key={name} className="text-center">
                <div className="bg-gray-100 rounded p-2 mb-1">
                  <span className="text-2xl">🎲</span>
                </div>
                <p className="text-sm font-medium">{name}</p>
                <div className="bg-blue-100 rounded px-2 py-1 text-sm">
                  {[15, 22, 8][i]} pts
                </div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-sm">
              <strong>🎯 Dutch:</strong> Quand un joueur fait exactement 0 point, 
              il fait "Dutch" et marque un point spécial !
            </p>
          </div>
        </div>
      </div>
    ),
    tip: "Utilisez le bouton 'Annuler' si vous faites une erreur ↩️"
  },
  {
    id: 4,
    title: "Professeur Cartouche",
    description: "Votre assistant IA personnel",
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎩</span>
          </div>
          <div>
            <h4 className="font-medium">Professeur Cartouche</h4>
            <p className="text-sm text-gray-600">
              Votre coach personnel pour Dutch
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm italic">
            "Excellent jeu, Alice ! Tu es en tête avec seulement 45 points. 
            Attention Bob, tu te rapproches dangereusement des 100 points ! 🎯"
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Commentaires personnalisés</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Conseils stratégiques</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Encouragements</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Ambiance festive</span>
          </div>
        </div>
      </div>
    ),
    tip: "Le professeur s'adapte au niveau et au style de chaque partie 🎭"
  },
  {
    id: 5,
    title: "Fonctionnalités avancées",
    description: "Statistiques, historique et plus",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-lg p-3 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
            <h5 className="font-medium text-sm">Statistiques</h5>
            <p className="text-xs text-gray-600">
              Moyenne, victoires, performances
            </p>
          </div>
          
          <div className="border rounded-lg p-3 text-center">
            <RotateCcw className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <h5 className="font-medium text-sm">Historique</h5>
            <p className="text-xs text-gray-600">
              Toutes vos parties sauvegardées
            </p>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Mode multijoueur (bientôt)
          </h4>
          <p className="text-sm text-gray-600">
            Partagez vos parties en temps réel avec vos amis, 
            même à distance !
          </p>
        </div>
      </div>
    ),
    tip: "Toutes vos données sont sauvegardées automatiquement 💾"
  },
  {
    id: 6,
    title: "Prêt à jouer !",
    description: "Vous maîtrisez maintenant Dutch",
    content: (
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        
        <div>
          <h3 className="text-xl font-bold mb-2">Félicitations ! 🎉</h3>
          <p className="text-gray-600 mb-4">
            Vous êtes prêt à créer votre première partie de Dutch.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm">
            <strong>Conseil pro:</strong> Dutch se joue mieux entre amis 
            avec des boissons et de la bonne humeur ! 🍻
          </p>
        </div>
      </div>
    ),
    action: {
      label: "Créer ma première partie",
      handler: () => {
        window.location.href = '/setup';
      }
    }
  }
];

interface InteractiveTutorialV2Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const InteractiveTutorialV2: React.FC<InteractiveTutorialV2Props> = ({
  isOpen,
  onClose,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = TUTORIAL_STEPS.length;
  const progress = (currentStep / totalSteps) * 100;
  const currentStepData = TUTORIAL_STEPS.find(step => step.id === currentStep);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      // Marquer le tutorial comme terminé
      localStorage.setItem('dutch_tutorial_completed', 'true');
      toast.success('Tutorial terminé ! 🎉');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCompletedSteps(prev => prev.filter(step => step !== currentStep - 1));
    }
  };

  const handleSkip = () => {
    localStorage.setItem('dutch_tutorial_completed', 'true');
    localStorage.setItem('dutch_tutorial_skipped', 'true');
    toast.info('Tutorial ignoré');
    onClose();
  };

  const handleClose = () => {
    if (isCompleted) {
      localStorage.setItem('dutch_tutorial_completed', 'true');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-2xl ${className}`}
      >
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Guide interactif Dutch
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Étape {currentStep} sur {totalSteps}
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-4">
              <Progress value={progress} className="bg-blue-600/30" />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {currentStepData && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {currentStepData.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {currentStepData.description}
                    </p>
                  </div>

                  <div className="min-h-[300px]">
                    {currentStepData.content}
                  </div>

                  {currentStepData.tip && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>💡 Astuce:</strong> {currentStepData.tip}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <div className="border-t bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={handleSkip}>
                    Ignorer le guide
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentStepData?.action ? (
                  <Button onClick={currentStepData.action.handler} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    {currentStepData.action.label}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    {currentStep === totalSteps ? 'Terminer' : 'Suivant'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
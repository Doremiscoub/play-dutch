
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface TimelineStep {
  step: string;
  title: string;
  description: string;
  color: string;
  details: string;
}

const timelineSteps: TimelineStep[] = [
  {
    step: "1",
    title: "Distribution",
    description: "Chaque joueur reçoit des cartes selon le nombre de participants",
    color: "bg-dutch-blue",
    details: "Le donneur distribue les cartes une par une dans le sens des aiguilles d'une montre. Le nombre de cartes dépend du nombre de joueurs (généralement 7 cartes pour 4 joueurs)."
  },
  {
    step: "2", 
    title: "Objectif",
    description: "Faire le moins de points possible en évitant les cartes de cœur",
    color: "bg-dutch-purple",
    details: "Chaque carte de cœur vaut 1 point, la Dame de pique vaut 13 points. L'objectif est d'éviter ces cartes ou de toutes les prendre (faire le 'dutch')."
  },
  {
    step: "3",
    title: "Victoire", 
    description: "Le joueur avec le moins de points gagne quand la limite est atteinte",
    color: "bg-dutch-orange",
    details: "La partie se termine quand un joueur atteint la limite de points fixée (généralement 100). Le joueur avec le moins de points remporte la victoire."
  }
];

export const InteractiveTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % timelineSteps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + timelineSteps.length) % timelineSteps.length);
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center gap-4 mb-8">
        <Button
          onClick={prevStep}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          {timelineSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeStep ? 'bg-dutch-blue scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextStep}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative h-80 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Card className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl h-full">
              <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${timelineSteps[activeStep].color} flex items-center justify-center text-white font-bold text-3xl shadow-lg`}
                >
                  {timelineSteps[activeStep].step}
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="font-semibold mb-4 text-2xl text-gray-800"
                >
                  {timelineSteps[activeStep].title}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-gray-600 mb-4 text-lg"
                >
                  {timelineSteps[activeStep].description}
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-gray-500 text-sm leading-relaxed"
                >
                  {timelineSteps[activeStep].details}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

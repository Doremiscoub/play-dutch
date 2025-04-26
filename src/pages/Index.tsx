
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, ClipboardList, BookOpen } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ModernTitle } from '@/components/ui/modern-title';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-10 relative overflow-hidden">
      {/* Background elements */}
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative z-10"
      >
        <ModernTitle withSparkles className="mb-4">
          Dutch Card Game
        </ModernTitle>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Le jeu de cartes convivial pour vos soirées entre amis
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex"
        >
          <Card className="w-full ios-card hover-lift flex flex-col">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="h-12 w-12 rounded-full bg-dutch-blue/10 flex items-center justify-center mb-4">
                <PlayCircle className="h-6 w-6 text-dutch-blue" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Jouer</h2>
              <p className="text-gray-600 mb-4 flex-grow">Commencez une nouvelle partie avec vos amis</p>
              <Button 
                onClick={() => navigate('/game')} 
                variant="gradient"
                elevated
                animated
                className="w-full mt-auto text-white rounded-xl"
              >
                Démarrer
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex"
        >
          <Card className="w-full ios-card hover-lift flex flex-col">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="h-12 w-12 rounded-full bg-dutch-purple/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-dutch-purple" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Règles du jeu</h2>
              <p className="text-gray-600 mb-4 flex-grow">Apprenez à jouer avec les règles complètes</p>
              <Button 
                onClick={() => navigate('/rules')} 
                variant="glass"
                elevated
                animated
                className="w-full mt-auto text-dutch-purple border-dutch-purple/20 rounded-xl"
              >
                Consulter
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex"
        >
          <Card className="w-full ios-card hover-lift flex flex-col">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="h-12 w-12 rounded-full bg-dutch-orange/10 flex items-center justify-center mb-4">
                <ClipboardList className="h-6 w-6 text-dutch-orange" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Historique</h2>
              <p className="text-gray-600 mb-4 flex-grow">Consultez l'historique de vos parties</p>
              <Button 
                onClick={() => navigate('/history')} 
                variant="glass"
                elevated
                animated
                className="w-full mt-auto text-dutch-orange border-dutch-orange/20 rounded-xl"
              >
                Voir
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-gray-500 text-sm relative z-10"
      >
        <p>© {new Date().getFullYear()} Dutch Card Game</p>
      </motion.div>
    </div>
  );
};

export default Index;

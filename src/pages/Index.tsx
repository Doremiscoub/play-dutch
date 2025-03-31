
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, ClipboardList, BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-10">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-gray-200/80 z-0" />
      
      <motion.div
        className="absolute top-20 left-[15%] w-60 h-60 rounded-full bg-dutch-blue/10 blur-3xl -z-5"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-[10%] w-72 h-72 rounded-full bg-dutch-orange/10 blur-3xl -z-5"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-4">
          Dutch Card Game
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Le jeu de cartes convivial pour vos soirées entre amis
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full ios-card hover-lift">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="h-12 w-12 rounded-full bg-dutch-blue/10 flex items-center justify-center mb-4">
                <PlayCircle className="h-6 w-6 text-dutch-blue" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Jouer</h2>
              <p className="text-gray-600 mb-4 flex-grow">Commencez une nouvelle partie avec vos amis</p>
              <Button 
                onClick={() => navigate('/game')} 
                variant="ios" 
                rounded="full"
                elevated 
                className="w-full"
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
        >
          <Card className="h-full ios-card hover-lift">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="h-12 w-12 rounded-full bg-dutch-purple/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-dutch-purple" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Règles du jeu</h2>
              <p className="text-gray-600 mb-4 flex-grow">Apprenez à jouer avec les règles complètes</p>
              <Button 
                onClick={() => navigate('/rules')} 
                variant="outline" 
                rounded="full"
                glassmorphism 
                elevated 
                className="w-full"
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
        >
          <Card className="h-full ios-card hover-lift">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="h-12 w-12 rounded-full bg-dutch-orange/10 flex items-center justify-center mb-4">
                <ClipboardList className="h-6 w-6 text-dutch-orange" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Historique</h2>
              <p className="text-gray-600 mb-4 flex-grow">Consultez l'historique de vos parties</p>
              <Button 
                onClick={() => navigate('/history')} 
                variant="outline" 
                rounded="full"
                glassmorphism 
                elevated 
                className="w-full"
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
      
      {/* Floating elements */}
      <motion.div
        className="absolute bottom-[30%] left-12 w-4 h-4 rounded-full bg-dutch-blue/30 z-0"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-[25%] right-14 w-3 h-3 rounded-full bg-dutch-orange/40 z-0"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-[40%] left-20 w-2 h-2 rounded-full bg-dutch-purple/40 z-0"
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
};

export default Index;

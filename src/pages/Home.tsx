
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayCircle, History, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
            Dutch
          </h1>
          <p className="text-gray-600">Votre compagnon de jeu</p>
        </motion.div>
        
        <div className="space-y-4">
          <Link to="/game">
            <Button className="w-full h-16 dutch-button bg-dutch-blue hover:bg-dutch-blue/90 text-lg">
              <PlayCircle className="mr-2 h-6 w-6" /> Nouvelle partie
            </Button>
          </Link>
          
          <Link to="/history">
            <Button variant="outline" className="w-full h-14 dutch-button bg-white text-dutch-blue border-2 border-dutch-blue hover:bg-dutch-blue/5">
              <History className="mr-2 h-5 w-5" /> Historique
            </Button>
          </Link>
          
          <Link to="/rules">
            <Button variant="ghost" className="w-full h-12 dutch-button text-gray-700 hover:bg-gray-100">
              <Info className="mr-2 h-5 w-5" /> Règles du jeu
            </Button>
          </Link>
        </div>
        
        <motion.div 
          className="mt-16 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Version 1.0</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;

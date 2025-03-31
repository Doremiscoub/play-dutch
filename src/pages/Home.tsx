
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayCircle, History, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-100/90 to-gray-200/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
            Dutch
          </h1>
          <p className="text-gray-600 backdrop-blur-sm">Votre compagnon de jeu</p>
        </motion.div>
        
        <div className="space-y-6">
          <Link to="/game" className="block">
            <Button className="w-full h-16 rounded-2xl bg-white/70 hover:bg-white/80 text-dutch-blue text-lg font-semibold border border-white/40 shadow-sm backdrop-blur-md transition-all">
              <PlayCircle className="mr-2 h-6 w-6" aria-hidden="true" /> Nouvelle partie
            </Button>
          </Link>
          
          <Link to="/history" className="block">
            <Button variant="outline" className="w-full h-14 rounded-2xl bg-white/60 text-gray-700 border border-white/40 hover:bg-white/70 backdrop-blur-md transition-all">
              <History className="mr-2 h-5 w-5" aria-hidden="true" /> Historique
            </Button>
          </Link>
          
          <Link to="/rules" className="block">
            <Button variant="ghost" className="w-full h-14 rounded-2xl bg-white/50 text-gray-600 hover:bg-white/60 border border-white/30 backdrop-blur-md transition-all">
              <Info className="mr-2 h-5 w-5" aria-hidden="true" /> Règles du jeu
            </Button>
          </Link>
        </div>
        
        <motion.div 
          className="mt-16 text-center text-gray-500 text-sm backdrop-blur-md px-4 py-2 rounded-full bg-white/50 border border-white/30 mx-auto w-max shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Version 1.0</p>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 right-8 rounded-full w-8 h-8 bg-gradient-to-r from-dutch-blue to-dutch-purple opacity-30 blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-16 left-16 rounded-full w-12 h-12 bg-gradient-to-r from-dutch-orange to-dutch-pink opacity-20 blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

export default Home;

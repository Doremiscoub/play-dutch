
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayCircle, History, Info, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background blur elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-200/60 z-0" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-[15%] w-36 h-36 rounded-full bg-dutch-blue/10 blur-3xl"
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
        className="absolute bottom-24 right-[10%] w-48 h-48 rounded-full bg-dutch-orange/10 blur-3xl"
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
        className="absolute -top-10 right-[20%] w-32 h-32 rounded-full bg-dutch-purple/10 blur-3xl"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-14"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent mb-2">
              Dutch
            </h1>
            <motion.div 
              className="absolute -right-4 -top-3"
              animate={{ 
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Sparkles className="w-6 h-6 text-dutch-orange" />
            </motion.div>
          </div>
          <p className="text-gray-600 backdrop-blur-sm text-lg">Votre compagnon de jeu</p>
        </motion.div>
        
        <div className="space-y-5">
          <Link to="/game" className="block">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button className="w-full h-16 rounded-2xl glassmorphism bg-white/50 hover:bg-white/60 text-dutch-blue text-lg font-semibold border border-white/40 shadow-md backdrop-blur-md transition-all">
                <PlayCircle className="mr-2 h-6 w-6 text-dutch-blue" aria-hidden="true" /> 
                <span className="bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Nouvelle partie</span>
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/history" className="block">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="outline" className="w-full h-14 rounded-2xl glassmorphism bg-white/40 text-gray-700 border border-white/30 hover:bg-white/50 backdrop-blur-md transition-all">
                <History className="mr-2 h-5 w-5 text-dutch-purple" aria-hidden="true" /> Historique
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/rules" className="block">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="ghost" className="w-full h-14 rounded-2xl glassmorphism bg-white/30 text-gray-600 hover:bg-white/40 border border-white/20 backdrop-blur-md transition-all">
                <Info className="mr-2 h-5 w-5 text-dutch-orange" aria-hidden="true" /> Règles du jeu
              </Button>
            </motion.div>
          </Link>
        </div>
        
        <motion.div 
          className="mt-16 text-center text-gray-500 text-sm backdrop-blur-md px-4 py-2 rounded-full bg-white/40 border border-white/20 mx-auto w-max shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p>Version 1.0</p>
        </motion.div>
      </motion.div>
      
      {/* Small floating elements */}
      <motion.div
        className="absolute bottom-[30%] left-12 w-4 h-4 rounded-full bg-dutch-blue/30"
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
        className="absolute top-[25%] right-14 w-3 h-3 rounded-full bg-dutch-orange/40"
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
        className="absolute top-[40%] left-20 w-2 h-2 rounded-full bg-dutch-purple/40"
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

export default Home;

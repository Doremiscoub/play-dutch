
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayCircle, History, Info, Sparkles, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import BrickBreaker from '@/components/EasterEgg/BrickBreaker';
import AnimatedBackground from '@/components/AnimatedBackground';

const Home: React.FC = () => {
  const [versionClickCount, setVersionClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleVersionClick = () => {
    const newCount = versionClickCount + 1;
    setVersionClickCount(newCount);
    
    if (newCount >= 10) {
      setShowEasterEgg(true);
      setVersionClickCount(0);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background elements */}
      <AnimatedBackground />
      
      {/* New decorative elements */}
      <motion.div 
        className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dutch-blue/20 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dutch-purple/20 to-transparent"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      
      {/* Animated patterns */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>
      
      {/* Particles animation */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-dutch-blue/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Subtle wave animation */}
      <svg className="absolute bottom-0 left-0 right-0 opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <motion.path 
          fill="#8B5CF6" 
          fillOpacity="1" 
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,181.3C96,203,192,245,288,229.3C384,213,480,139,576,128C672,117,768,171,864,186.7C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </svg>
      <svg className="absolute bottom-0 left-0 right-0 opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <motion.path 
          fill="#F97316" 
          fillOpacity="0.6" 
          d="M0,128L34.3,144C68.6,160,137,192,206,202.7C274.3,213,343,203,411,192C480,181,549,171,617,160C685.7,149,754,139,823,149.3C891.4,160,960,192,1029,208C1097.1,224,1166,224,1234,208C1302.9,192,1371,160,1406,144L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          animate={{
            d: [
              "M0,128L34.3,144C68.6,160,137,192,206,202.7C274.3,213,343,203,411,192C480,181,549,171,617,160C685.7,149,754,139,823,149.3C891.4,160,960,192,1029,208C1097.1,224,1166,224,1234,208C1302.9,192,1371,160,1406,144L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z",
              "M0,96L34.3,117.3C68.6,139,137,181,206,208C274.3,235,343,245,411,224C480,203,549,149,617,133.3C685.7,117,754,139,823,170.7C891.4,203,960,245,1029,261.3C1097.1,277,1166,267,1234,234.7C1302.9,203,1371,149,1406,122.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z",
              "M0,128L34.3,144C68.6,160,137,192,206,202.7C274.3,213,343,203,411,192C480,181,549,171,617,160C685.7,149,754,139,823,149.3C891.4,160,960,192,1029,208C1097.1,224,1166,224,1234,208C1302.9,192,1371,160,1406,144L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>
      
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
          <SignedIn>
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
          </SignedIn>
          
          <SignedOut>
            <Link to="/sign-in" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  className="w-full h-16 rounded-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple text-white text-lg font-semibold border border-white/40 shadow-lg hover:shadow-xl backdrop-blur-md transition-all"
                >
                  <User className="mr-2 h-6 w-6" aria-hidden="true" /> 
                  <span className="text-white">Connexion / Inscription</span>
                </Button>
              </motion.div>
            </Link>
          </SignedOut>
          
          <Link to="/history" className="block">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="outline" className="w-full h-14 rounded-2xl glassmorphism bg-white/50 text-gray-700 border border-white/30 hover:bg-white/60 backdrop-blur-md transition-all">
                <History className="mr-2 h-5 w-5 text-dutch-purple" aria-hidden="true" /> Historique
              </Button>
            </motion.div>
          </Link>
          
          <div className="flex gap-2">
            <Link to="/rules" className="block flex-1">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="ghost" className="w-full h-14 rounded-2xl glassmorphism bg-white/40 text-gray-600 hover:bg-white/50 border border-white/20 backdrop-blur-md transition-all">
                  <Info className="mr-2 h-5 w-5 text-dutch-orange" aria-hidden="true" /> Règles
                </Button>
              </motion.div>
            </Link>
            
            <Link to="/settings" className="block flex-1">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="ghost" className="w-full h-14 rounded-2xl glassmorphism bg-white/40 text-gray-600 hover:bg-white/50 border border-white/20 backdrop-blur-md transition-all">
                  <Settings className="mr-2 h-5 w-5 text-dutch-blue" aria-hidden="true" /> Réglages
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
        
        <motion.div 
          className="mt-16 text-center text-gray-500 text-sm backdrop-blur-md px-4 py-2 rounded-full bg-white/50 border border-white/30 mx-auto w-max shadow-sm cursor-pointer hover:bg-white/60 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          onClick={handleVersionClick}
          whileTap={{ scale: 0.98 }}
        >
          <p>Version 1.0</p>
        </motion.div>
      </motion.div>
      
      {/* Easter Egg */}
      <AnimatePresence>
        {showEasterEgg && (
          <BrickBreaker onClose={() => setShowEasterEgg(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;

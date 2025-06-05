
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface GameSetupCardProps {
  selectedEmoji: string;
  children: React.ReactNode;
}

const GameSetupCard: React.FC<GameSetupCardProps> = ({ selectedEmoji, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="border border-white/50 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-dutch-blue/10 via-dutch-purple/8 to-dutch-orange/10 text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <motion.span 
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {selectedEmoji}
            </motion.span>
            <span className="bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent font-bold">
              Configuration de partie
            </span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Ajoutez les joueurs et commencez votre partie de Dutch
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameSetupCard;

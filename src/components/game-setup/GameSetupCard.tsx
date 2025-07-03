
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
      <Card className="card-glass shadow-glass-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-trinity-blue-50 via-trinity-purple-50 to-trinity-orange-50 text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <motion.span 
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {selectedEmoji}
            </motion.span>
            <span className="text-trinity font-bold">
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

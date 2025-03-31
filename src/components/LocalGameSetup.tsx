
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

interface LocalGameSetupProps {
  onStartGame: (players: string[]) => void;
}

const LocalGameSetup: React.FC<LocalGameSetupProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill('').map((_, i) => `Joueur ${i + 1}`));
  const { colors } = useTheme();

  const handleNumPlayersChange = (increment: boolean) => {
    const newNum = increment 
      ? Math.min(numPlayers + 1, 10) 
      : Math.max(numPlayers - 1, 2);
    
    setNumPlayers(newNum);
    
    // Adjust player names array
    if (increment && numPlayers < 10) {
      setPlayerNames([...playerNames, `Joueur ${numPlayers + 1}`]);
    } else if (!increment && numPlayers > 2) {
      setPlayerNames(playerNames.slice(0, -1));
    }
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    // Validate player names (ensure no empty names)
    const validPlayerNames = playerNames.map(name => name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name);
    onStartGame(validPlayerNames);
  };

  return (
    <div className="space-y-6 relative">
      <motion.div 
        className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm hover:shadow-lg transition-all"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
          <span className="h-6 w-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${colors.primary}10` }}>
            <span className="text-xs font-bold" style={{ color: colors.primary }}>#</span>
          </span>
          Nombre de joueurs
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleNumPlayersChange(false)}
            disabled={numPlayers <= 2}
            className="h-10 w-10 rounded-full border shadow-sm hover:bg-opacity-5"
            style={{ borderColor: `${colors.primary}20`, color: colors.primary }}
          >
            <Minus className="h-5 w-5" />
          </Button>
          <motion.span 
            key={numPlayers}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-semibold w-12 text-center"
            style={{ color: colors.primary }}
          >
            {numPlayers}
          </motion.span>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleNumPlayersChange(true)}
            disabled={numPlayers >= 10}
            className="h-10 w-10 rounded-full border shadow-sm hover:bg-opacity-5"
            style={{ borderColor: `${colors.primary}20`, color: colors.primary }}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm hover:shadow-lg transition-all"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
          <span className="h-6 w-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${colors.primary}10` }}>
            <span className="text-xs font-bold" style={{ color: colors.primary }}>@</span>
          </span>
          Noms des joueurs
        </h2>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1 scrollbar-none">
          {playerNames.map((name, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
            >
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
              >
                {index + 1}
              </div>
              <div className="relative flex-grow">
                <motion.div 
                  className="absolute -inset-0.5 rounded-xl blur opacity-30"
                  style={{ background: `linear-gradient(to right, ${colors.primary}05, ${colors.secondary}05)` }}
                  animate={{ opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Input
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Joueur ${index + 1}`}
                  className="border bg-white/90 rounded-xl shadow-sm relative z-10"
                  style={{ borderColor: `${colors.primary}10` }}
                  maxLength={20}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        className="fixed left-0 right-0 bottom-8 flex justify-center px-6 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          onClick={handleStartGame}
          size="lg"
          className="w-full max-w-md py-6 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.primary})`, backgroundSize: '200% 100%' }}
            animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <Play className="mr-2 h-5 w-5" /> Commencer la partie
          </span>
        </Button>
      </motion.div>
    </div>
  );
};

export default LocalGameSetup;

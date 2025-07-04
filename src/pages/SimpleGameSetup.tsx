import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const SimpleGameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createGame } = useSimpleGameState();
  const [playerNames, setPlayerNames] = useState(['', '', '', '']);

  const handleCreateGame = () => {
    const validNames = playerNames.filter(name => name.trim().length >= 2);
    
    if (validNames.length < 2) {
      alert('Il faut au moins 2 joueurs avec des noms valides');
      return;
    }

    if (createGame(validNames)) {
      navigate('/simple-game');
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const addPlayer = () => {
    setPlayerNames([...playerNames, '']);
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 2) {
      const newNames = playerNames.filter((_, i) => i !== index);
      setPlayerNames(newNames);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Configuration Simple</h1>
          
          <div className="space-y-4">
            {playerNames.map((name, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
              >
                <Input
                  placeholder={`Joueur ${index + 1}`}
                  value={name}
                  onChange={(e) => updatePlayerName(index, e.target.value)}
                  className="flex-1"
                />
                {playerNames.length > 2 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removePlayer(index)}
                  >
                    ✕
                  </Button>
                )}
              </motion.div>
            ))}
            
            {playerNames.length < 8 && (
              <Button variant="outline" onClick={addPlayer} className="w-full">
                + Ajouter un joueur
              </Button>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <Button 
              onClick={handleCreateGame} 
              className="w-full"
              disabled={playerNames.filter(n => n.trim().length >= 2).length < 2}
            >
              Commencer la partie
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Retour
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SimpleGameSetup;
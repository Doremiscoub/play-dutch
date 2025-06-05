
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Globe, Plus, Minus, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button-unified';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ComingSoonBanner from './ComingSoonBanner';
import LocalGameSetupInfo from './LocalGameSetupInfo';

interface UnifiedGameSetupProps {
  onStartGame: (playerNames: string[], isMultiplayer?: boolean) => void;
}

const UnifiedGameSetup: React.FC<UnifiedGameSetupProps> = ({ onStartGame }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  const [scoreLimit, setScoreLimit] = useState<number>(100);

  const addPlayer = () => {
    if (playerNames.length < 10) {
      setPlayerNames([...playerNames, '']);
    } else {
      toast.error('Maximum 10 joueurs autorisés');
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    } else {
      toast.error('Minimum 2 joueurs requis');
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const shufflePlayers = () => {
    const shuffled = [...playerNames].sort(() => Math.random() - 0.5);
    setPlayerNames(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  const handleStartGame = () => {
    const validNames = playerNames.filter(name => name.trim() !== '');
    
    if (validNames.length < 2) {
      toast.error('Au moins 2 joueurs sont requis');
      return;
    }
    
    onStartGame(validNames, false);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Tabs defaultValue="local" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-white/50">
          <TabsTrigger 
            value="local" 
            className="flex items-center gap-2 data-[state=active]:bg-dutch-blue/10 data-[state=active]:text-dutch-blue"
          >
            <Users className="h-4 w-4" />
            Partie locale
          </TabsTrigger>
          <TabsTrigger 
            value="multiplayer" 
            className="flex items-center gap-2 data-[state=active]:bg-dutch-purple/10 data-[state=active]:text-dutch-purple"
          >
            <Globe className="h-4 w-4" />
            Multijoueur
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="local" className="mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="text-center">Configuration de la partie</CardTitle>
              <LocalGameSetupInfo />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score limit */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Limite de score</label>
                <Input
                  type="number"
                  value={scoreLimit}
                  onChange={(e) => setScoreLimit(Number(e.target.value))}
                  min={50}
                  max={500}
                  step={10}
                  className="bg-white/70 backdrop-blur-xl border border-white/50"
                />
              </div>

              {/* Players */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Joueurs ({playerNames.length})</label>
                  <div className="flex gap-2">
                    <Button
                      variant="glass"
                      size="icon-sm"
                      onClick={shufflePlayers}
                      disabled={playerNames.filter(n => n.trim()).length < 2}
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="glass"
                      size="icon-sm"
                      onClick={addPlayer}
                      disabled={playerNames.length >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3">
                  {playerNames.map((name, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Joueur ${index + 1}`}
                        value={name}
                        onChange={(e) => updatePlayerName(index, e.target.value)}
                        className="bg-white/70 backdrop-blur-xl border border-white/50"
                      />
                      {playerNames.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePlayer(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleStartGame}
                className="w-full"
                animated
                elevated
              >
                Commencer la partie
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="multiplayer" className="mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="text-center">Mode Multijoueur</CardTitle>
            </CardHeader>
            <CardContent>
              <ComingSoonBanner 
                title="Fonctionnalité en développement"
                description="Le mode multijoueur sera bientôt disponible. Restez connectés !"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedGameSetup;

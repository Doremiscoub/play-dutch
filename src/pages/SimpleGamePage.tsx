import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const SimpleGamePage: React.FC = () => {
  const navigate = useNavigate();
  const { players, roundHistory, addRound, undoLastRound, resetGame, loadFromStorage, hasGame, isGameOver } = useSimpleGameState();
  const [scores, setScores] = useState<string[]>([]);

  useEffect(() => {
    if (!hasGame) {
      const loaded = loadFromStorage();
      if (!loaded) {
        navigate('/simple-setup');
        return;
      }
    }
    setScores(players.map(() => ''));
  }, [hasGame, loadFromStorage, navigate, players]);

  const handleAddRound = () => {
    const numericScores = scores.map(s => parseInt(s) || 0);
    if (numericScores.some(s => isNaN(s))) {
      alert('Veuillez entrer des scores valides');
      return;
    }
    
    addRound(numericScores);
    setScores(players.map(() => ''));
  };

  const handleRestart = () => {
    resetGame();
    navigate('/simple-setup');
  };

  if (!hasGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl mb-4">Aucune partie en cours</h2>
          <Button onClick={() => navigate('/simple-setup')}>
            Créer une partie
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Partie Dutch</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={undoLastRound} disabled={roundHistory.length === 0}>
              Annuler
            </Button>
            <Button variant="outline" onClick={handleRestart}>
              Recommencer
            </Button>
          </div>
        </div>

        {/* Scores des joueurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {players.map((player, index) => {
            const isWinning = player.totalScore === Math.min(...players.map(p => p.totalScore));
            const dutchCount = player.rounds.filter(r => r.isDutch).length;
            
            return (
              <Card key={player.id} className={`p-4 ${isWinning ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}`}>
                <div className="text-center">
                  <div className="text-2xl mb-2">{player.emoji}</div>
                  <h3 className="font-semibold">{player.name}</h3>
                  <div className={`text-2xl font-bold ${isWinning ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {player.totalScore}
                  </div>
                  <div className="text-sm text-gray-500">
                    {player.rounds.length} manches • {dutchCount} Dutch
                  </div>
                  {isWinning && <div className="text-xs text-yellow-600 font-semibold">👑 En tête</div>}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Game Over */}
        {isGameOver && (
          <Card className="p-6 mb-6 bg-green-50 border-green-200">
            <div className="text-center">
              <h2 className="text-xl font-bold text-green-800 mb-2">Partie terminée!</h2>
              <div className="text-green-700">
                {(() => {
                  const winner = players.reduce((prev, current) => 
                    prev.totalScore < current.totalScore ? prev : current
                  );
                  return `${winner.name} a gagné avec ${winner.totalScore} points!`;
                })()}
              </div>
            </div>
          </Card>
        )}

        {/* Ajouter une manche */}
        {!isGameOver && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Nouvelle manche</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {players.map((player, index) => (
                <div key={player.id}>
                  <label className="block text-sm font-medium mb-1">{player.name}</label>
                  <Input
                    type="number"
                    placeholder="Score"
                    value={scores[index] || ''}
                    onChange={(e) => {
                      const newScores = [...scores];
                      newScores[index] = e.target.value;
                      setScores(newScores);
                    }}
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleAddRound} className="w-full">
              Ajouter la manche
            </Button>
          </Card>
        )}

        {/* Historique */}
        {roundHistory.length > 0 && (
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Historique ({roundHistory.length} manches)</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {roundHistory.map((round, roundIndex) => (
                <div key={roundIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">Manche {roundIndex + 1}</span>
                  <div className="flex gap-4">
                    {round.scores.map((score, playerIndex) => (
                      <span key={playerIndex} className="text-sm">
                        {players[playerIndex]?.name}: {score}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SimpleGamePage;
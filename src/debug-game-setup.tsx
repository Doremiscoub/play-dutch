import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Composant de debug temporaire pour tester le flow
const DebugGameSetup: React.FC = () => {
  const navigate = useNavigate();

  const testNavigation = () => {
    console.log('🔍 DEBUG: Tentative de navigation vers /setup');
    try {
      navigate('/setup');
      console.log('✅ DEBUG: Navigation vers /setup réussie');
    } catch (error) {
      console.error('❌ DEBUG: Erreur navigation:', error);
    }
  };

  const testGameCreation = () => {
    console.log('🔍 DEBUG: Test création de partie');
    try {
      const testPlayers = ['Alice', 'Bob', 'Charlie', 'Diana'];
      localStorage.setItem('dutch_simple_game', JSON.stringify({
        players: testPlayers.map(name => ({
          id: `test-${name.toLowerCase()}`,
          name,
          emoji: '🎲',
          totalScore: 0,
          rounds: [],
          avatarColor: '#FF6B6B'
        })),
        roundHistory: [],
        scoreLimit: 100,
        gameStartTime: new Date().toISOString(),
        isGameOver: false
      }));
      console.log('✅ DEBUG: Partie test créée dans localStorage');
      navigate('/game');
      console.log('✅ DEBUG: Navigation vers /game');
    } catch (error) {
      console.error('❌ DEBUG: Erreur création:', error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-4 rounded-lg space-y-2">
      <h3 className="font-bold">🚨 DEBUG MODE</h3>
      <Button onClick={testNavigation} size="sm" className="w-full bg-blue-600">
        Test Navigation Setup
      </Button>
      <Button onClick={testGameCreation} size="sm" className="w-full bg-green-600">
        Test Game Creation
      </Button>
      <Button onClick={() => console.log('localStorage:', localStorage.getItem('dutch_simple_game'))} size="sm" className="w-full bg-purple-600">
        Check Storage
      </Button>
    </div>
  );
};

export default DebugGameSetup;
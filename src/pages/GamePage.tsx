
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ScoreBoard from '@/components/ScoreBoard';
import GameOverScreen from '@/components/GameOverScreen';
import { Player, Game } from '@/types';
import { updateAllPlayersStats, isGameOver } from '@/utils/playerStatsCalculator';
import { toast } from 'sonner';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [roundHistory, setRoundHistory] = useState<{ scores: number[], dutchPlayerId?: string }[]>([]);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState<boolean>(false);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  
  // Initialiser la partie à partir du localStorage
  useEffect(() => {
    const initializeGame = () => {
      // Vérifier s'il y a une partie en cours
      const savedGame = localStorage.getItem('current_dutch_game');
      
      if (savedGame) {
        try {
          const parsedGame = JSON.parse(savedGame);
          setPlayers(parsedGame.players);
          setRoundHistory(parsedGame.roundHistory || []);
          setScoreLimit(parsedGame.scoreLimit || 100);
          
          // Vérifier si on doit afficher l'écran de fin
          if (parsedGame.isGameOver) {
            setShowGameOver(true);
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la partie :', error);
          createNewGame();
        }
      } else {
        // S'il n'y a pas de partie en cours, créer une nouvelle partie
        createNewGame();
      }
    };
    
    initializeGame();
  }, []);
  
  // Sauvegarder l'état de la partie quand il change
  useEffect(() => {
    if (players.length > 0) {
      const gameState = {
        players,
        roundHistory,
        isGameOver: showGameOver,
        scoreLimit
      };
      
      localStorage.setItem('current_dutch_game', JSON.stringify(gameState));
    }
  }, [players, roundHistory, showGameOver, scoreLimit]);
  
  // Créer une nouvelle partie avec les noms des joueurs depuis le setup
  const createNewGame = useCallback(() => {
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (!playerSetup) {
      toast.error('Aucune configuration de joueurs trouvée');
      navigate('/game/setup');
      return;
    }
    
    try {
      const playerNames = JSON.parse(playerSetup);
      
      if (!Array.isArray(playerNames) || playerNames.length < 2) {
        throw new Error('Configuration de joueurs invalide');
      }
      
      const newPlayers: Player[] = playerNames.map(name => ({
        id: uuidv4(),
        name,
        totalScore: 0,
        rounds: []
      }));
      
      setPlayers(newPlayers);
      setRoundHistory([]);
      setShowGameOver(false);
    } catch (error) {
      console.error('Erreur lors de la création de la partie :', error);
      toast.error('Erreur lors de la création de la partie');
      navigate('/game/setup');
    }
  }, [navigate]);
  
  // Ajouter un tour
  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    // Mettre à jour l'historique des rounds
    setRoundHistory(prev => [...prev, { scores, dutchPlayerId }]);
    
    // Mettre à jour les scores des joueurs
    setPlayers(currentPlayers => {
      const updatedPlayers = currentPlayers.map((player, index) => {
        const score = scores[index];
        const isDutch = player.id === dutchPlayerId;
        
        return {
          ...player,
          totalScore: player.totalScore + score,
          rounds: [
            ...player.rounds,
            { score, isDutch }
          ]
        };
      });
      
      // Mettre à jour les statistiques des joueurs
      const playersWithStats = updateAllPlayersStats(updatedPlayers);
      
      // Vérifier si la partie est terminée
      if (isGameOver(playersWithStats, scoreLimit)) {
        setTimeout(() => {
          setShowGameOver(true);
        }, 1000);
      }
      
      return playersWithStats;
    });
  };
  
  // Annuler le dernier tour
  const handleUndoLastRound = () => {
    if (roundHistory.length === 0) return;
    
    // Retirer le dernier round de l'historique
    setRoundHistory(prev => prev.slice(0, -1));
    
    // Mettre à jour les scores des joueurs
    setPlayers(currentPlayers => {
      const updatedPlayers = currentPlayers.map(player => {
        const newRounds = player.rounds.slice(0, -1);
        const newTotalScore = newRounds.reduce((sum, round) => sum + round.score, 0);
        
        return {
          ...player,
          totalScore: newTotalScore,
          rounds: newRounds
        };
      });
      
      // Mettre à jour les statistiques des joueurs
      return updateAllPlayersStats(updatedPlayers);
    });
    
    // Si l'écran de fin était affiché, le fermer
    if (showGameOver) {
      setShowGameOver(false);
    }
    
    toast.success('Dernière manche annulée');
  };
  
  // Demander à terminer la partie
  const handleRequestEndGame = () => {
    setShowGameEndConfirmation(true);
  };
  
  // Confirmer la fin de partie
  const handleConfirmEndGame = () => {
    // Sauvegarder la partie dans l'historique
    saveGameToHistory();
    
    // Afficher l'écran de fin
    setShowGameOver(true);
    setShowGameEndConfirmation(false);
  };
  
  // Annuler la fin de partie
  const handleCancelEndGame = () => {
    setShowGameEndConfirmation(false);
  };
  
  // Continuer la partie avec une nouvelle limite de score
  const handleContinueGame = (newLimit: number) => {
    setScoreLimit(newLimit);
    setShowGameOver(false);
  };
  
  // Sauvegarder la partie dans l'historique
  const saveGameToHistory = () => {
    try {
      // Déterminer le gagnant (joueur avec le score le plus bas)
      const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
      const winner = sortedPlayers[0].name;
      
      // Créer l'objet de jeu pour l'historique
      const game: Game = {
        id: uuidv4(),
        date: new Date(),
        rounds: players[0]?.rounds?.length || 0,
        players: players.map(p => ({ name: p.name, score: p.totalScore, isDutch: false })),
        winner
      };
      
      // Récupérer l'historique existant
      const savedGames = localStorage.getItem('dutch_games');
      const games: Game[] = savedGames ? JSON.parse(savedGames) : [];
      
      // Ajouter la nouvelle partie et sauvegarder
      games.push(game);
      localStorage.setItem('dutch_games', JSON.stringify(games));
      
      toast.success('Partie sauvegardée dans l\'historique');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la partie :', error);
      toast.error('Erreur lors de la sauvegarde de la partie');
    }
  };
  
  // Démarrer une nouvelle partie
  const handleRestart = () => {
    localStorage.removeItem('current_dutch_game');
    navigate('/game/setup');
  };
  
  // Afficher l'écran de fin de partie ou le tableau des scores
  return showGameOver ? (
    <GameOverScreen 
      players={players}
      onRestart={handleRestart}
      onContinueGame={handleContinueGame}
      currentScoreLimit={scoreLimit}
    />
  ) : (
    <ScoreBoard 
      players={players}
      onAddRound={handleAddRound}
      onEndGame={handleRequestEndGame}
      onUndoLastRound={handleUndoLastRound}
      roundHistory={roundHistory}
      showGameEndConfirmation={showGameEndConfirmation}
      onConfirmEndGame={handleConfirmEndGame}
      onCancelEndGame={handleCancelEndGame}
      scoreLimit={scoreLimit}
    />
  );
};

export default GamePage;

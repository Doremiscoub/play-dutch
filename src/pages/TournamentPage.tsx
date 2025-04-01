
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, Users, ArrowLeft, Play, Home, Medal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TournamentPlayer, Tournament } from '@/types';
import { toast } from 'sonner';
import useTournamentStore from '@/store/useTournamentStore';
import { composedClasses } from '@/config/uiConfig';

/**
 * Page de création et gestion des tournois
 */
const TournamentPage: React.FC = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  
  const { 
    tournaments, 
    currentTournament, 
    createTournament, 
    getTournamentById,
    completeTournament
  } = useTournamentStore();
  
  const [tournamentName, setTournamentName] = useState<string>('Tournoi Dutch');
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '']);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  
  // Charger le tournoi si un ID est fourni
  useEffect(() => {
    if (tournamentId) {
      const foundTournament = getTournamentById(tournamentId);
      setTournament(foundTournament);
    } else if (currentTournament) {
      setTournament(currentTournament);
    }
  }, [tournamentId, currentTournament, getTournamentById]);
  
  // Ajouter un champ joueur
  const addPlayerField = () => {
    setPlayerNames([...playerNames, '']);
  };
  
  // Retirer un champ joueur
  const removePlayerField = (index: number) => {
    if (playerNames.length <= 2) {
      toast.error('Il faut au moins 2 joueurs pour un tournoi !');
      return;
    }
    
    const newPlayerNames = [...playerNames];
    newPlayerNames.splice(index, 1);
    setPlayerNames(newPlayerNames);
  };
  
  // Mettre à jour le nom d'un joueur
  const updatePlayerName = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };
  
  // Créer un nouveau tournoi
  const handleCreateTournament = () => {
    // Valider les noms des joueurs
    const validPlayerNames = playerNames.filter(name => name.trim() !== '');
    
    if (validPlayerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour un tournoi !');
      return;
    }
    
    if (tournamentName.trim() === '') {
      toast.error('Veuillez donner un nom au tournoi');
      return;
    }
    
    // Créer le tournoi
    createTournament(tournamentName, validPlayerNames);
    toast.success('Tournoi créé avec succès !');
    
    // Rediriger vers la page de jeu
    navigate('/game');
  };
  
  // Démarrer ou continuer une partie dans le tournoi
  const handleStartGame = () => {
    navigate('/game');
  };
  
  // Terminer le tournoi
  const handleCompleteTournament = () => {
    completeTournament();
    toast.success('Tournoi terminé !');
    navigate('/');
  };
  
  // Retourner à l'accueil
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="container max-w-3xl px-4 py-8 min-h-screen">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBackToHome}
        className="mb-4 rounded-full"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <h1 className={composedClasses.title}>
        {tournament ? 'Détails du tournoi' : 'Nouveau tournoi'}
      </h1>
      
      <AnimatePresence mode="wait">
        {tournament ? (
          <motion.div
            key="tournament-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 mt-4"
          >
            <Card className={composedClasses.card}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold">{tournament.name}</CardTitle>
                    <CardDescription>
                      {new Date(tournament.date).toLocaleDateString()} • {tournament.players.length} joueurs
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    {tournament.completed ? (
                      <div className="bg-dutch-green/20 text-dutch-green text-xs px-2 py-1 rounded-full">
                        Terminé
                      </div>
                    ) : (
                      <div className="bg-dutch-orange/20 text-dutch-orange text-xs px-2 py-1 rounded-full">
                        En cours
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <Trophy className="h-5 w-5 text-dutch-yellow mr-2" />
                      <span>Classement</span>
                    </h3>
                    
                    <div className={composedClasses.table}>
                      <Table>
                        <TableHeader className={composedClasses.tableHeader}>
                          <TableRow>
                            <TableHead>Pos.</TableHead>
                            <TableHead>Joueur</TableHead>
                            <TableHead className="text-center">Pts</TableHead>
                            <TableHead className="text-center">Vic.</TableHead>
                            <TableHead className="text-center">Parties</TableHead>
                            <TableHead className="text-center">Score</TableHead>
                            <TableHead className="text-center">Moy.</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[...tournament.players]
                            .sort((a, b) => b.score - a.score)
                            .map((player, index) => (
                              <TableRow key={player.id} className={index === 0 && tournament.completed ? 'bg-dutch-yellow/10' : ''}>
                                <TableCell className="font-medium">
                                  {index + 1}{index === 0 && tournament.completed && (
                                    <Trophy className="h-3.5 w-3.5 text-dutch-yellow inline ml-1" />
                                  )}
                                </TableCell>
                                <TableCell>{player.name}</TableCell>
                                <TableCell className="text-center font-bold">{player.score}</TableCell>
                                <TableCell className="text-center">{player.wins}</TableCell>
                                <TableCell className="text-center">{player.gamesPlayed}</TableCell>
                                <TableCell className="text-center">{player.totalScore}</TableCell>
                                <TableCell className="text-center">{player.avgScorePerGame}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <Medal className="h-5 w-5 text-dutch-purple mr-2" />
                      <span>Parties jouées</span>
                    </h3>
                    
                    {tournament.games.length > 0 ? (
                      <div className="space-y-3">
                        {tournament.games.map((game, gameIndex) => (
                          <div 
                            key={game.id} 
                            className={`${composedClasses.card} p-3`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-semibold">Partie {gameIndex + 1}</div>
                                <div className="text-sm text-gray-500">
                                  {new Date(game.date).toLocaleDateString()} • {game.rounds} manches
                                </div>
                              </div>
                              <div className="text-dutch-blue font-medium">
                                {game.winner} a gagné
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        Aucune partie jouée pour le moment
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-3 mt-2">
                {!tournament.completed && (
                  <>
                    <Button 
                      variant="dutch-blue" 
                      onClick={handleStartGame}
                      className="flex-1 sm:flex-initial"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Jouer maintenant
                    </Button>
                    
                    <Button 
                      variant="dutch-outline" 
                      onClick={handleCompleteTournament}
                      className="flex-1 sm:flex-initial"
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      Terminer le tournoi
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="tournament-create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 mt-4"
          >
            <Card className={composedClasses.card}>
              <CardHeader>
                <CardTitle>Créer un tournoi</CardTitle>
                <CardDescription>
                  Un tournoi permet d'enchaîner plusieurs parties avec un classement cumulé
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="tournament-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du tournoi
                  </label>
                  <Input
                    id="tournament-name"
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                    placeholder="Entrez le nom du tournoi"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Joueurs
                    </label>
                    <Button
                      size="sm"
                      variant="dutch-outline"
                      onClick={addPlayerField}
                      className="text-xs h-7 px-2"
                    >
                      Ajouter un joueur
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {playerNames.map((name, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-dutch-blue/10 flex items-center justify-center text-dutch-blue font-medium">
                          {index + 1}
                        </div>
                        <Input
                          value={name}
                          onChange={(e) => updatePlayerName(index, e.target.value)}
                          placeholder={`Nom du joueur ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removePlayerField(index)}
                          className="w-8 h-8 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between gap-3 mt-2">
                <Button 
                  variant="ghost"
                  onClick={handleBackToHome}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                
                <Button 
                  variant="dutch-blue"
                  onClick={handleCreateTournament}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Créer le tournoi
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TournamentPage;

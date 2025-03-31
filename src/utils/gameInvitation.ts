
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Store active game sessions
type GameSession = {
  id: string;
  hostId: string;
  hostName: string;
  players: { id: string; name: string }[];
  createdAt: Date;
  gameState: any; // Will contain the current game state
  lastActivity: Date;
};

// In-memory storage for active games (in a real app, this would be in a database)
const activeGames: Record<string, GameSession> = {};

// Purge old game sessions (older than 24 hours)
const purgeOldSessions = () => {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  Object.keys(activeGames).forEach(gameId => {
    if (activeGames[gameId].lastActivity < oneDayAgo) {
      delete activeGames[gameId];
    }
  });
};

/**
 * Creates a new game session and returns the game code
 */
export const createGameSession = (hostId: string, hostName: string): string => {
  // Generate a 6-character alphanumeric code that's easy to type and remember
  const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  activeGames[gameId] = {
    id: gameId,
    hostId,
    hostName,
    players: [{ id: hostId, name: hostName }],
    createdAt: new Date(),
    gameState: null,
    lastActivity: new Date()
  };
  
  // Periodically purge old sessions
  purgeOldSessions();
  
  return gameId;
};

/**
 * Joins an existing game session
 */
export const joinGameSession = (gameId: string, playerId: string, playerName: string): GameSession | null => {
  const game = activeGames[gameId];
  
  if (!game) {
    toast.error("Code de partie invalide");
    return null; // Game not found
  }
  
  // Add player if not already in the game
  if (!game.players.some(p => p.id === playerId)) {
    game.players.push({ id: playerId, name: playerName });
  }
  
  game.lastActivity = new Date();
  
  return game;
};

/**
 * Get active game session by ID
 */
export const getGameSession = (gameId: string): GameSession | null => {
  const game = activeGames[gameId] || null;
  
  if (game) {
    game.lastActivity = new Date();
  }
  
  return game;
};

/**
 * Update game state
 */
export const updateGameState = (gameId: string, gameState: any): boolean => {
  const game = activeGames[gameId];
  
  if (!game) {
    return false;
  }
  
  game.gameState = gameState;
  game.lastActivity = new Date();
  return true;
};

/**
 * Generate shareable game link
 */
export const generateGameLink = (gameId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/game?join=${gameId}`;
};

/**
 * Share game invitation via native sharing if available
 */
export const shareGameInvitation = async (gameId: string, hostName: string): Promise<boolean> => {
  const shareLink = generateGameLink(gameId);
  const shareText = `${hostName} vous invite à rejoindre une partie de Dutch Card Game ! Utilisez le code ${gameId} ou cliquez sur le lien.`;
  
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Invitation à Dutch Card Game',
        text: shareText,
        url: shareLink
      });
      return true;
    } else {
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(`${shareText} ${shareLink}`);
      toast.success("Lien copié dans le presse-papier !");
      return true;
    }
  } catch (error) {
    console.error("Erreur lors du partage:", error);
    // Fallback to copying to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareLink}`);
      toast.success("Lien copié dans le presse-papier !");
      return true;
    } catch (err) {
      toast.error("Impossible de partager l'invitation");
      return false;
    }
  }
};

/**
 * Leave a game session
 */
export const leaveGameSession = (gameId: string, playerId: string): boolean => {
  const game = activeGames[gameId];
  
  if (!game) {
    return false;
  }
  
  game.players = game.players.filter(p => p.id !== playerId);
  
  // If no players left, remove the game
  if (game.players.length === 0) {
    delete activeGames[gameId];
  } else {
    // If host leaves, assign a new host
    if (playerId === game.hostId && game.players.length > 0) {
      game.hostId = game.players[0].id;
      game.hostName = game.players[0].name;
    }
    
    game.lastActivity = new Date();
  }
  
  return true;
};

/**
 * Gets a list of players in a game
 */
export const getGamePlayers = (gameId: string): { id: string; name: string }[] => {
  const game = activeGames[gameId];
  return game ? game.players : [];
};

/**
 * Check if a game exists
 */
export const gameExists = (gameId: string): boolean => {
  return !!activeGames[gameId];
};

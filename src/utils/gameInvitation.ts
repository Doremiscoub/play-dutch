
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Store active game sessions with improved typing
type GameSession = {
  id: string;
  hostId: string;
  hostName: string;
  players: { 
    id: string; 
    name: string;
    avatar?: string;
    online: boolean;
    lastActivity: Date;
  }[];
  createdAt: Date;
  gameState: any; // Will contain the current game state
  lastActivity: Date;
  isPublic: boolean;
  settings?: {
    targetScore?: number;
    allowSpectators?: boolean;
    roundTimeLimit?: number;
  };
};

// In-memory storage for active games (in a real app, this would be in a database)
const activeGames: Record<string, GameSession> = {};

// Polling interval for real-time updates (milliseconds)
const POLLING_INTERVAL = 3000;
const PLAYER_TIMEOUT = 60000; // 1 minute of inactivity to mark player as offline

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

// Check for inactive players and mark them as offline
const updatePlayerStatus = (gameId: string) => {
  const game = activeGames[gameId];
  if (!game) return;
  
  const now = new Date();
  game.players = game.players.map(player => ({
    ...player,
    online: now.getTime() - player.lastActivity.getTime() < PLAYER_TIMEOUT
  }));
};

/**
 * Creates a new game session and returns the game code
 */
export const createGameSession = (hostId: string, hostName: string, isPublic: boolean = false): string => {
  // Generate a 6-character alphanumeric code that's easy to type and remember
  const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  activeGames[gameId] = {
    id: gameId,
    hostId,
    hostName,
    players: [{ 
      id: hostId, 
      name: hostName, 
      online: true,
      lastActivity: new Date()
    }],
    createdAt: new Date(),
    gameState: null,
    lastActivity: new Date(),
    isPublic,
    settings: {
      targetScore: 100,
      allowSpectators: true,
      roundTimeLimit: 0
    }
  };
  
  // Periodically purge old sessions
  purgeOldSessions();
  
  return gameId;
};

/**
 * Updates a player's online status
 */
export const updatePlayerActivity = (gameId: string, playerId: string): boolean => {
  const game = activeGames[gameId];
  
  if (!game) return false;
  
  const playerIndex = game.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return false;
  
  game.players[playerIndex].lastActivity = new Date();
  game.players[playerIndex].online = true;
  game.lastActivity = new Date();
  
  return true;
};

/**
 * Joins an existing game session
 */
export const joinGameSession = (gameId: string, playerId: string, playerName: string, avatar?: string): GameSession | null => {
  const game = activeGames[gameId];
  
  if (!game) {
    toast.error("Code de partie invalide");
    return null; // Game not found
  }
  
  // Add player if not already in the game
  if (!game.players.some(p => p.id === playerId)) {
    game.players.push({ 
      id: playerId, 
      name: playerName, 
      avatar,
      online: true,
      lastActivity: new Date()
    });
    
    // Notify other players (in a real app, this would use WebSockets)
    toast.success(`${playerName} a rejoint la partie!`);
  } else {
    // Update existing player's status to online
    const playerIndex = game.players.findIndex(p => p.id === playerId);
    game.players[playerIndex].online = true;
    game.players[playerIndex].lastActivity = new Date();
    if (avatar) game.players[playerIndex].avatar = avatar;
  }
  
  game.lastActivity = new Date();
  
  return game;
};

/**
 * Get active game session by ID with updated player statuses
 */
export const getGameSession = (gameId: string): GameSession | null => {
  const game = activeGames[gameId] || null;
  
  if (game) {
    updatePlayerStatus(gameId);
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
 * Update game settings
 */
export const updateGameSettings = (gameId: string, settings: Partial<GameSession['settings']>): boolean => {
  const game = activeGames[gameId];
  
  if (!game) {
    return false;
  }
  
  game.settings = {
    ...game.settings,
    ...settings
  };
  
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
 * Generate download app link with game code
 */
export const generateAppDownloadLink = (gameId: string): string => {
  // This would link to the app store with a deep link to the game
  return `https://dutchgame.app/download?join=${gameId}`;
};

/**
 * Generate QR code data for game invitation
 */
export const generateQRCodeData = (gameId: string): string => {
  return generateGameLink(gameId);
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
  
  const leavingPlayer = game.players.find(p => p.id === playerId);
  const playerName = leavingPlayer ? leavingPlayer.name : 'Un joueur';
  
  game.players = game.players.filter(p => p.id !== playerId);
  
  // Notify other players (in a real app, this would use WebSockets)
  if (game.players.length > 0 && leavingPlayer) {
    toast.info(`${playerName} a quitté la partie`);
  }
  
  // If no players left, remove the game
  if (game.players.length === 0) {
    delete activeGames[gameId];
  } else {
    // If host leaves, assign a new host
    if (playerId === game.hostId && game.players.length > 0) {
      game.hostId = game.players[0].id;
      game.hostName = game.players[0].name;
      
      // Notify new host (in a real app, this would use WebSockets)
      toast.info(`${game.hostName} est maintenant l'hôte de la partie`);
    }
    
    game.lastActivity = new Date();
  }
  
  return true;
};

/**
 * Gets a list of players in a game with online status
 */
export const getGamePlayers = (gameId: string): { id: string; name: string; avatar?: string; online: boolean }[] => {
  const game = activeGames[gameId];
  if (!game) return [];
  
  updatePlayerStatus(gameId);
  return game.players;
};

/**
 * Get a single player by ID
 */
export const getPlayer = (gameId: string, playerId: string) => {
  const game = activeGames[gameId];
  if (!game) return null;
  
  return game.players.find(p => p.id === playerId) || null;
};

/**
 * Check if a game exists
 */
export const gameExists = (gameId: string): boolean => {
  return !!activeGames[gameId];
};

/**
 * Get a list of all active games
 */
export const getAllActiveGames = (): { id: string; hostName: string; playerCount: number; isPublic: boolean }[] => {
  return Object.values(activeGames).map(game => ({
    id: game.id,
    hostName: game.hostName,
    playerCount: game.players.length,
    isPublic: game.isPublic
  }));
};

/**
 * Get public games that can be joined
 */
export const getPublicGames = (): { id: string; hostName: string; playerCount: number }[] => {
  return Object.values(activeGames)
    .filter(game => game.isPublic)
    .map(game => ({
      id: game.id,
      hostName: game.hostName,
      playerCount: game.players.length
    }));
};

/**
 * Create an invitation link with additional metadata
 */
export const createDeepLink = (gameId: string, hostName: string): string => {
  const baseLink = generateGameLink(gameId);
  const queryParams = new URLSearchParams();
  
  queryParams.set('join', gameId);
  queryParams.set('host', hostName);
  
  return `${baseLink}&${queryParams.toString()}`;
};

/**
 * Send a custom message to players in a game
 */
export const sendGameMessage = (gameId: string, senderId: string, message: string): boolean => {
  const game = activeGames[gameId];
  if (!game) return false;
  
  const sender = game.players.find(p => p.id === senderId);
  if (!sender) return false;
  
  // In a real app, this would use WebSockets to send the message to other players
  // For now, we'll just show a toast to current user
  toast.info(`${sender.name}: ${message}`);
  
  return true;
};

/**
 * Get player statistics for a specific game
 */
export const getGamePlayerStats = (gameId: string) => {
  const game = activeGames[gameId];
  if (!game || !game.gameState || !game.gameState.players) return [];
  
  return game.gameState.players.map((player: any) => {
    if (!player.stats) return player;
    return player;
  });
};

// Set up periodic cleanup of inactive sessions
setInterval(purgeOldSessions, 3600000); // Every hour

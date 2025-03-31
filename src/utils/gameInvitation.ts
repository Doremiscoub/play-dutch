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
    reconnectAttempts?: number;
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

// Online status constants
const PLAYER_TIMEOUT = 30000; // 30 seconds of inactivity to mark player as offline (reduced for better UX)
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_WINDOW = 5 * 60 * 1000; // 5 minutes to allow reconnection

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
  game.players = game.players.map(player => {
    const timeElapsed = now.getTime() - player.lastActivity.getTime();
    const isOnline = timeElapsed < PLAYER_TIMEOUT;
    
    return {
      ...player,
      online: isOnline,
      // If player was online but is now offline, initialize reconnect attempts
      reconnectAttempts: player.online && !isOnline 
        ? (player.reconnectAttempts || 0) 
        : player.reconnectAttempts
    };
  });
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
      lastActivity: new Date(),
      reconnectAttempts: 0
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
  
  // Reset reconnect attempts on successful activity update
  if (game.players[playerIndex].reconnectAttempts !== undefined) {
    game.players[playerIndex].reconnectAttempts = 0;
  }
  
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
  
  // Check if player was previously in the game but disconnected
  const existingPlayerIndex = game.players.findIndex(p => p.id === playerId);
  
  if (existingPlayerIndex !== -1) {
    // Update existing player's status to online
    game.players[existingPlayerIndex].online = true;
    game.players[existingPlayerIndex].lastActivity = new Date();
    game.players[existingPlayerIndex].reconnectAttempts = 0;
    if (avatar) game.players[existingPlayerIndex].avatar = avatar;
    
    // Maybe the name has changed
    if (playerName && playerName !== game.players[existingPlayerIndex].name) {
      game.players[existingPlayerIndex].name = playerName;
    }
    
    // Notify about reconnection
    toast.success(`Reconnecté en tant que ${playerName}`);
  } else {
    // Add player if not already in the game
    game.players.push({ 
      id: playerId, 
      name: playerName, 
      avatar,
      online: true,
      lastActivity: new Date(),
      reconnectAttempts: 0
    });
    
    // Notify other players (in a real app, this would use WebSockets)
    toast.success(`${playerName} a rejoint la partie!`);
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
 * Attempt to reconnect a player
 */
export const attemptReconnect = (gameId: string, playerId: string): boolean => {
  const game = activeGames[gameId];
  
  if (!game) return false;
  
  const playerIndex = game.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return false;
  
  const player = game.players[playerIndex];
  
  // If player has exceeded max reconnect attempts, reject
  if (player.reconnectAttempts !== undefined && 
      player.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    return false;
  }
  
  // If player has been offline for too long, reject
  const now = new Date();
  const timeOffline = now.getTime() - player.lastActivity.getTime();
  if (timeOffline > RECONNECT_WINDOW) {
    return false;
  }
  
  // Increment reconnect attempts
  player.reconnectAttempts = (player.reconnectAttempts || 0) + 1;
  
  // Try to update activity
  return updatePlayerActivity(gameId, playerId);
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

// Setup automatic cleanup of disconnected players
const cleanupDisconnectedPlayers = () => {
  const now = new Date();
  
  Object.keys(activeGames).forEach(gameId => {
    const game = activeGames[gameId];
    
    // Remove players who have been offline for too long and exceeded reconnection attempts
    const activePlayers = game.players.filter(player => {
      if (player.online) return true;
      
      const timeOffline = now.getTime() - player.lastActivity.getTime();
      const tooManyAttempts = (player.reconnectAttempts || 0) >= MAX_RECONNECT_ATTEMPTS;
      
      return !(timeOffline > RECONNECT_WINDOW && tooManyAttempts);
    });
    
    // Update the player list
    if (activePlayers.length !== game.players.length) {
      game.players = activePlayers;
    }
    
    // If no players left, remove the game
    if (game.players.length === 0) {
      delete activeGames[gameId];
    }
  });
};

// Set up periodic cleanup of inactive sessions
setInterval(purgeOldSessions, 3600000); // Every hour
setInterval(cleanupDisconnectedPlayers, 300000); // Every 5 minutes

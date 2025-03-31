
import { v4 as uuidv4 } from 'uuid';

// Store active game sessions
type GameSession = {
  id: string;
  hostId: string;
  players: string[];
  createdAt: Date;
  gameState: any; // Will contain the current game state
};

// In-memory storage for active games (in a real app, this would be in a database)
const activeGames: Record<string, GameSession> = {};

/**
 * Creates a new game session and returns the game code
 */
export const createGameSession = (hostId: string): string => {
  const gameId = uuidv4().substring(0, 8).toUpperCase(); // Create a shorter, readable game ID
  
  activeGames[gameId] = {
    id: gameId,
    hostId,
    players: [hostId],
    createdAt: new Date(),
    gameState: null
  };
  
  return gameId;
};

/**
 * Joins an existing game session
 */
export const joinGameSession = (gameId: string, playerId: string): GameSession | null => {
  const game = activeGames[gameId];
  
  if (!game) {
    return null; // Game not found
  }
  
  // Add player if not already in the game
  if (!game.players.includes(playerId)) {
    game.players.push(playerId);
  }
  
  return game;
};

/**
 * Get active game session by ID
 */
export const getGameSession = (gameId: string): GameSession | null => {
  return activeGames[gameId] || null;
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
  return true;
};

/**
 * Generate shareable game link
 */
export const generateGameLink = (gameId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/game?join=${gameId}`;
};

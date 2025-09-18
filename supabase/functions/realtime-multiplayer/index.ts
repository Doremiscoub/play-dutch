import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

interface GameState {
  gameId: string;
  players: any[];
  roundHistory: any[];
  scoreLimit: number;
  currentRound: number;
  isGameOver: boolean;
  hostId: string;
  lastUpdatedBy?: string;
  timestamp: number;
}

interface ConnectedClient {
  socket: WebSocket;
  gameId?: string;
  userId?: string;
  playerName?: string;
}

// Stockage en mémoire des connexions et états de jeu
const connectedClients = new Map<string, ConnectedClient>();
const gameStates = new Map<string, GameState>();

const broadcastToGame = (gameId: string, message: any, excludeClientId?: string) => {
  console.log(`Broadcasting to game ${gameId}:`, message);
  
  for (const [clientId, client] of connectedClients.entries()) {
    if (client.gameId === gameId && clientId !== excludeClientId && client.socket.readyState === WebSocket.OPEN) {
      try {
        client.socket.send(JSON.stringify(message));
      } catch (error) {
        console.error(`Error sending message to client ${clientId}:`, error);
        // Nettoyer les connexions fermées
        connectedClients.delete(clientId);
      }
    }
  }
};

const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { 
      status: 400, 
      headers: corsHeaders 
    });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  const clientId = crypto.randomUUID();
  
  console.log(`New WebSocket connection: ${clientId}`);

  socket.onopen = () => {
    console.log(`Client ${clientId} connected`);
    connectedClients.set(clientId, { socket });
    
    // Envoyer confirmation de connexion
    socket.send(JSON.stringify({
      type: 'connected',
      clientId,
      timestamp: Date.now()
    }));
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      console.log(`Message from ${clientId}:`, message);

      const client = connectedClients.get(clientId);
      if (!client) return;

      switch (message.type) {
        case 'create_game':
          {
            const gameId = generateRoomCode();
            const gameState: GameState = {
              gameId,
              players: message.players || [],
              roundHistory: [],
              scoreLimit: message.scoreLimit || 100,
              currentRound: 0,
              isGameOver: false,
              hostId: message.userId,
              timestamp: Date.now()
            };

            gameStates.set(gameId, gameState);
            client.gameId = gameId;
            client.userId = message.userId;
            client.playerName = message.playerName;

            socket.send(JSON.stringify({
              type: 'game_created',
              gameId,
              gameState,
              roomCode: gameId,
              timestamp: Date.now()
            }));

            console.log(`Game created: ${gameId} by ${message.userId}`);
          }
          break;

        case 'join_game':
          {
            const { gameId, userId, playerName } = message;
            const gameState = gameStates.get(gameId);

            if (!gameState) {
              socket.send(JSON.stringify({
                type: 'error',
                message: 'Partie non trouvée',
                timestamp: Date.now()
              }));
              return;
            }

            if (gameState.isGameOver) {
              socket.send(JSON.stringify({
                type: 'error',
                message: 'Cette partie est terminée',
                timestamp: Date.now()
              }));
              return;
            }

            // Vérifier si le joueur existe déjà
            const existingPlayer = gameState.players.find(p => p.id === userId);
            if (!existingPlayer) {
              // Ajouter le nouveau joueur
              gameState.players.push({
                id: userId,
                name: playerName,
                totalScore: 0,
                rounds: [],
                avatarColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                emoji: ['🎲', '🃏', '🎯', '⭐', '🔥', '💎'][gameState.players.length % 6]
              });
            }

            client.gameId = gameId;
            client.userId = userId;
            client.playerName = playerName;

            // Confirmer la connexion au joueur
            socket.send(JSON.stringify({
              type: 'game_joined',
              gameId,
              gameState,
              timestamp: Date.now()
            }));

            // Notifier les autres joueurs
            broadcastToGame(gameId, {
              type: 'player_joined',
              player: { id: userId, name: playerName },
              gameState,
              timestamp: Date.now()
            }, clientId);

            console.log(`Player ${playerName} joined game ${gameId}`);
          }
          break;

        case 'add_round':
          {
            const { gameId, scores, dutchPlayerId } = message;
            const gameState = gameStates.get(gameId);

            if (!gameState) {
              socket.send(JSON.stringify({
                type: 'error',
                message: 'Partie non trouvée',
                timestamp: Date.now()
              }));
              return;
            }

            // Ajouter la manche
            const roundEntry = {
              scores: scores,
              dutchPlayerId: dutchPlayerId,
              timestamp: Date.now()
            };

            gameState.roundHistory.push(roundEntry);
            gameState.currentRound++;
            gameState.lastUpdatedBy = client.userId;
            gameState.timestamp = Date.now();

            // Mettre à jour les scores des joueurs
            gameState.players.forEach((player, index) => {
              if (scores[index] !== undefined) {
                player.rounds = player.rounds || [];
                player.rounds.push(scores[index]);
                player.totalScore = player.rounds.reduce((sum, score) => sum + score, 0);
              }
            });

            // Vérifier si quelqu'un a atteint la limite
            const maxScore = Math.max(...gameState.players.map(p => p.totalScore));
            if (maxScore >= gameState.scoreLimit) {
              gameState.isGameOver = true;
            }

            // Diffuser la mise à jour à tous les joueurs
            broadcastToGame(gameId, {
              type: 'round_added',
              round: roundEntry,
              gameState,
              timestamp: Date.now()
            });

            console.log(`Round added to game ${gameId} by ${client.playerName}`);
          }
          break;

        case 'undo_round':
          {
            const { gameId } = message;
            const gameState = gameStates.get(gameId);

            if (!gameState || gameState.roundHistory.length === 0) {
              socket.send(JSON.stringify({
                type: 'error',
                message: 'Aucune manche à annuler',
                timestamp: Date.now()
              }));
              return;
            }

            // Supprimer la dernière manche
            const lastRound = gameState.roundHistory.pop();
            gameState.currentRound--;
            gameState.isGameOver = false;
            gameState.lastUpdatedBy = client.userId;
            gameState.timestamp = Date.now();

            // Recalculer les scores
            gameState.players.forEach(player => {
              if (player.rounds && player.rounds.length > 0) {
                player.rounds.pop();
                player.totalScore = player.rounds.reduce((sum, score) => sum + score, 0);
              }
            });

            // Diffuser la mise à jour
            broadcastToGame(gameId, {
              type: 'round_undone',
              gameState,
              timestamp: Date.now()
            });

            console.log(`Round undone in game ${gameId} by ${client.playerName}`);
          }
          break;

        case 'ping':
          socket.send(JSON.stringify({
            type: 'pong',
            timestamp: Date.now()
          }));
          break;

        default:
          console.log(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      socket.send(JSON.stringify({
        type: 'error',
        message: 'Erreur lors du traitement du message',
        timestamp: Date.now()
      }));
    }
  };

  socket.onclose = () => {
    console.log(`Client ${clientId} disconnected`);
    const client = connectedClients.get(clientId);
    
    if (client && client.gameId) {
      // Notifier les autres joueurs de la déconnexion
      broadcastToGame(client.gameId, {
        type: 'player_disconnected',
        player: { id: client.userId, name: client.playerName },
        timestamp: Date.now()
      }, clientId);
    }
    
    connectedClients.delete(clientId);
  };

  socket.onerror = (error) => {
    console.error(`WebSocket error for client ${clientId}:`, error);
  };

  return response;
});
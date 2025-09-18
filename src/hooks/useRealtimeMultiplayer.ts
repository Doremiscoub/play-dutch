/**
 * Hook pour la gestion du multijoueur temps réel
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { Player, RoundHistoryEntry } from '@/types';
import { toast } from 'sonner';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';

interface GameState {
  gameId: string;
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  currentRound: number;
  isGameOver: boolean;
  hostId: string;
  lastUpdatedBy?: string;
  timestamp: number;
}

interface RealtimeMessage {
  type: string;
  gameId?: string;
  gameState?: GameState;
  player?: any;
  round?: any;
  message?: string;
  timestamp: number;
  [key: string]: any;
}

export const useRealtimeMultiplayer = () => {
  const { user, isSignedIn } = useSupabaseAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [roomCode, setRoomCode] = useState<string>('');
  const [connectedPlayers, setConnectedPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(false);
  const reconnectTimeoutRef = useRef<number>();
  const heartbeatIntervalRef = useRef<number>();

  // URL WebSocket de l'edge function
  const WS_URL = 'wss://ngtvzjgvvabortrdugty.functions.supabase.co/realtime-multiplayer';

  const connectWebSocket = useCallback(() => {
    if (!isSignedIn || isConnecting) return;

    setIsConnecting(true);
    console.log('🔌 Connecting to WebSocket:', WS_URL);

    try {
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('✅ WebSocket connected');
        setSocket(ws);
        setIsConnected(true);
        setIsConnecting(false);
        
        // Démarrer le heartbeat
        heartbeatIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000);
      };

      ws.onmessage = (event) => {
        try {
          const message: RealtimeMessage = JSON.parse(event.data);
          console.log('📨 Received message:', message);
          handleMessage(message);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('🔌 WebSocket closed:', event.code, event.reason);
        setSocket(null);
        setIsConnected(false);
        setIsConnecting(false);

        // Clearance des intervals
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }

        // Reconnexion automatique si ce n'est pas une fermeture intentionnelle
        if (event.code !== 1000 && isSignedIn) {
          console.log('🔄 Attempting to reconnect in 3 seconds...');
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setIsConnecting(false);
        toast.error('Erreur de connexion au serveur multijoueur');
      };

    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setIsConnecting(false);
      toast.error('Impossible de se connecter au serveur multijoueur');
    }
  }, [isSignedIn, isConnecting]);

  const handleMessage = (message: RealtimeMessage) => {
    switch (message.type) {
      case 'connected':
        console.log('✅ Client connected with ID:', message.clientId);
        break;

      case 'game_created':
        console.log('🎮 Game created:', message.gameId);
        setGameState(message.gameState!);
        setRoomCode(message.roomCode || message.gameId!);
        setIsHost(true);
        toast.success(`Partie créée ! Code: ${message.roomCode || message.gameId}`);
        break;

      case 'game_joined':
        console.log('🎯 Joined game:', message.gameId);
        setGameState(message.gameState!);
        setRoomCode(message.gameId!);
        setIsHost(false);
        toast.success('Partie rejointe avec succès !');
        break;

      case 'player_joined':
        console.log('👥 Player joined:', message.player);
        if (message.gameState) {
          setGameState(message.gameState);
          setConnectedPlayers(message.gameState.players);
        }
        toast.info(`${message.player?.name} a rejoint la partie`);
        break;

      case 'round_added':
        console.log('➕ Round added:', message.round);
        if (message.gameState) {
          setGameState(message.gameState);
        }
        toast.success('Nouvelle manche ajoutée !');
        break;

      case 'round_undone':
        console.log('↩️ Round undone');
        if (message.gameState) {
          setGameState(message.gameState);
        }
        toast.info('Dernière manche annulée');
        break;

      case 'player_disconnected':
        console.log('👋 Player disconnected:', message.player);
        toast.warning(`${message.player?.name} s'est déconnecté`);
        break;

      case 'error':
        console.error('❌ Server error:', message.message);
        toast.error(message.message || 'Erreur serveur');
        break;

      case 'pong':
        // Heartbeat response
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  };

  const createGame = useCallback(async (players: Player[], scoreLimit: number = 100) => {
    if (!socket || !isConnected || !user) {
      toast.error('Connexion non établie');
      return false;
    }

    try {
      socket.send(JSON.stringify({
        type: 'create_game',
        players,
        scoreLimit,
        userId: user.id,
        playerName: user.fullName || user.email || 'Anonyme'
      }));
      return true;
    } catch (error) {
      console.error('Error creating game:', error);
      toast.error('Erreur lors de la création de la partie');
      return false;
    }
  }, [socket, isConnected, user]);

  const joinGame = useCallback(async (gameId: string) => {
    if (!socket || !isConnected || !user) {
      toast.error('Connexion non établie');
      return false;
    }

    try {
      socket.send(JSON.stringify({
        type: 'join_game',
        gameId: gameId.toUpperCase(),
        userId: user.id,
        playerName: user.fullName || user.email || 'Anonyme'
      }));
      return true;
    } catch (error) {
      console.error('Error joining game:', error);
      toast.error('Erreur lors de la connexion à la partie');
      return false;
    }
  }, [socket, isConnected, user]);

  const addRound = useCallback(async (scores: number[], dutchPlayerId?: string) => {
    if (!socket || !isConnected || !gameState) {
      toast.error('Partie non active');
      return false;
    }

    try {
      socket.send(JSON.stringify({
        type: 'add_round',
        gameId: gameState.gameId,
        scores,
        dutchPlayerId
      }));
      return true;
    } catch (error) {
      console.error('Error adding round:', error);
      toast.error('Erreur lors de l\'ajout de la manche');
      return false;
    }
  }, [socket, isConnected, gameState]);

  const undoRound = useCallback(async () => {
    if (!socket || !isConnected || !gameState) {
      toast.error('Partie non active');
      return false;
    }

    try {
      socket.send(JSON.stringify({
        type: 'undo_round',
        gameId: gameState.gameId
      }));
      return true;
    } catch (error) {
      console.error('Error undoing round:', error);
      toast.error('Erreur lors de l\'annulation de la manche');
      return false;
    }
  }, [socket, isConnected, gameState]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }
    if (socket) {
      socket.close(1000, 'Intentional disconnect');
    }
    setSocket(null);
    setIsConnected(false);
    setGameState(null);
    setRoomCode('');
    setConnectedPlayers([]);
    setIsHost(false);
  }, [socket]);

  // Connexion automatique au montage si l'utilisateur est connecté
  useEffect(() => {
    if (isSignedIn && !socket && !isConnecting) {
      connectWebSocket();
    }
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [isSignedIn, connectWebSocket]);

  // Nettoyage à la déconnexion de l'utilisateur
  useEffect(() => {
    if (!isSignedIn) {
      disconnect();
    }
  }, [isSignedIn, disconnect]);

  return {
    // État de connexion
    isConnected,
    isConnecting,
    
    // État du jeu
    gameState,
    roomCode,
    connectedPlayers: gameState?.players || [],
    isHost,
    
    // Actions
    connectWebSocket,
    createGame,
    joinGame,
    addRound,
    undoRound,
    disconnect,
    
    // Utilitaires
    canManageGame: isHost || (gameState?.hostId === user?.id)
  };
};
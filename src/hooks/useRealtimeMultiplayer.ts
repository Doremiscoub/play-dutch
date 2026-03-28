/**
 * Hook pour la gestion du multijoueur temps réel
 *
 * Robustness features:
 * - Exponential backoff reconnection (1s -> 30s cap)
 * - Heartbeat with 10s pong timeout detection
 * - Offline message queue with flush on reconnect
 * - UUID-based player IDs
 * - Duplicate state update guard
 * - Throttled game state broadcasts (500ms for add_round/undo_round)
 * - Full cleanup on unmount
 * - Beta warning toast (once per session)
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { Player, RoundHistoryEntry } from '@/types';
import { toast } from 'sonner';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { logger } from '@/utils/logger';
import { v4 as uuidv4 } from 'uuid';

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

// Session-level flag so the beta toast only shows once
let betaToastShownThisSession = false;

const HEARTBEAT_INTERVAL_MS = 30_000;
const HEARTBEAT_TIMEOUT_MS = 10_000;
const RECONNECT_BASE_MS = 1_000;
const RECONNECT_CAP_MS = 30_000;
const THROTTLE_MS = 500;

export const useRealtimeMultiplayer = () => {
  const { user, isSignedIn } = useSupabaseAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [roomCode, setRoomCode] = useState<string>('');
  const [_connectedPlayers, setConnectedPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const heartbeatTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const reconnectAttemptsRef = useRef(0);
  const messageQueueRef = useRef<string[]>([]);
  const connectedPlayersSnapshotRef = useRef<string>('');
  const lastThrottledSendRef = useRef<Record<string, number>>({});
  const throttleTimerRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const intentionalCloseRef = useRef(false);
  const playerIdRef = useRef<string>(uuidv4());
  const mountedRef = useRef(true);

  // URL WebSocket de l'edge function
  const WS_URL = 'wss://ngtvzjgvvabortrdugty.functions.supabase.co/realtime-multiplayer';

  // --- Helpers ---

  const clearAllTimers = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = undefined;
    }
    if (heartbeatTimeoutRef.current) {
      clearTimeout(heartbeatTimeoutRef.current);
      heartbeatTimeoutRef.current = undefined;
    }
    for (const key of Object.keys(throttleTimerRef.current)) {
      clearTimeout(throttleTimerRef.current[key]);
    }
    throttleTimerRef.current = {};
  }, []);

  /**
   * Send a raw string through the socket, or queue it when offline.
   */
  const sendRaw = useCallback((data: string) => {
    const ws = socketRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    } else {
      messageQueueRef.current.push(data);
      logger.debug('📦 Message queued (offline). Queue size:', messageQueueRef.current.length);
    }
  }, []);

  /**
   * Flush the offline message queue through the live socket.
   */
  const flushQueue = useCallback(() => {
    const ws = socketRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    const queue = messageQueueRef.current.splice(0);
    for (const msg of queue) {
      ws.send(msg);
    }
    if (queue.length > 0) {
      logger.debug('📤 Flushed', queue.length, 'queued messages');
    }
  }, []);

  /**
   * Throttled send for specific action types (add_round, undo_round).
   * At most 1 message per THROTTLE_MS per action type.
   */
  const sendThrottled = useCallback((payload: Record<string, any>) => {
    const actionType = payload.type as string;
    const now = Date.now();
    const lastSent = lastThrottledSendRef.current[actionType] || 0;
    const data = JSON.stringify(payload);

    if (now - lastSent >= THROTTLE_MS) {
      lastThrottledSendRef.current[actionType] = now;
      sendRaw(data);
    } else {
      // Debounce: schedule to send at the end of the throttle window
      if (throttleTimerRef.current[actionType]) {
        clearTimeout(throttleTimerRef.current[actionType]);
      }
      const remaining = THROTTLE_MS - (now - lastSent);
      throttleTimerRef.current[actionType] = setTimeout(() => {
        lastThrottledSendRef.current[actionType] = Date.now();
        sendRaw(data);
        delete throttleTimerRef.current[actionType];
      }, remaining);
    }
  }, [sendRaw]);

  /**
   * Guard: only update connectedPlayers if the list actually changed.
   */
  const updateConnectedPlayersIfChanged = useCallback((players: Player[]) => {
    const snapshot = JSON.stringify(players.map(p => p.id).sort());
    if (snapshot !== connectedPlayersSnapshotRef.current) {
      connectedPlayersSnapshotRef.current = snapshot;
      setConnectedPlayers(players);
    }
  }, []);

  // --- Message handler ---

  const handleMessage = useCallback((message: RealtimeMessage) => {
    switch (message.type) {
      case 'connected':
        logger.debug('Client connected with ID:', message.clientId);
        break;

      case 'game_created':
        logger.debug('Game created:', message.gameId);
        setGameState(message.gameState!);
        setRoomCode(message.roomCode || message.gameId!);
        setIsHost(true);
        toast.success(`Partie creee ! Code: ${message.roomCode || message.gameId}`);
        break;

      case 'game_joined':
        logger.debug('Joined game:', message.gameId);
        setGameState(message.gameState!);
        setRoomCode(message.gameId!);
        setIsHost(false);
        toast.success('Partie rejointe avec succes !');
        break;

      case 'player_joined':
        logger.debug('Player joined:', message.player);
        if (message.gameState) {
          setGameState(message.gameState);
          updateConnectedPlayersIfChanged(message.gameState.players);
        }
        toast.info(`${message.player?.name} a rejoint la partie`);
        break;

      case 'round_added':
        logger.debug('Round added:', message.round);
        if (message.gameState) {
          setGameState(message.gameState);
        }
        toast.success('Nouvelle manche ajoutee !');
        break;

      case 'round_undone':
        logger.debug('Round undone');
        if (message.gameState) {
          setGameState(message.gameState);
        }
        toast.info('Derniere manche annulee');
        break;

      case 'player_disconnected':
        logger.debug('Player disconnected:', message.player);
        toast.warning(`${message.player?.name} s'est deconnecte`);
        break;

      case 'error':
        console.error('Server error:', message.message);
        toast.error(message.message || 'Erreur serveur');
        break;

      case 'pong':
        // Clear the heartbeat timeout — server is alive
        if (heartbeatTimeoutRef.current) {
          clearTimeout(heartbeatTimeoutRef.current);
          heartbeatTimeoutRef.current = undefined;
        }
        break;

      default:
        logger.debug('Unknown message type:', message.type);
    }
  }, [updateConnectedPlayersIfChanged]);

  // --- WebSocket connection ---

  const connectWebSocket = useCallback(() => {
    if (!isSignedIn || isConnecting) return;
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return;

    setIsConnecting(true);
    logger.debug('Connecting to WebSocket:', WS_URL);

    // Show beta toast once per session
    if (!betaToastShownThisSession) {
      betaToastShownThisSession = true;
      toast.info('Mode multijoueur en beta — des instabilites sont possibles.');
    }

    try {
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        if (!mountedRef.current) {
          ws.close(1000, 'Component unmounted during connect');
          return;
        }
        logger.debug('WebSocket connected');
        socketRef.current = ws;
        setSocket(ws);
        setIsConnected(true);
        setIsConnecting(false);
        reconnectAttemptsRef.current = 0;

        // Flush any queued messages
        flushQueue();

        // Start heartbeat with timeout detection
        heartbeatIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));

            // Set a timeout: if no pong in 10s, consider connection dead
            heartbeatTimeoutRef.current = setTimeout(() => {
              logger.debug('Heartbeat timeout — no pong received. Closing socket.');
              setIsConnected(false);
              ws.close(4000, 'Heartbeat timeout');
            }, HEARTBEAT_TIMEOUT_MS);
          }
        }, HEARTBEAT_INTERVAL_MS);
      };

      ws.onmessage = (event) => {
        try {
          const message: RealtimeMessage = JSON.parse(event.data);
          logger.debug('Received message:', message);
          handleMessage(message);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onclose = (event) => {
        logger.debug('WebSocket closed:', event.code, event.reason);
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
        setIsConnecting(false);

        // Clear heartbeat timers
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = undefined;
        }
        if (heartbeatTimeoutRef.current) {
          clearTimeout(heartbeatTimeoutRef.current);
          heartbeatTimeoutRef.current = undefined;
        }

        // Reconnect with exponential backoff unless intentional close or unmounted
        if (event.code !== 1000 && !intentionalCloseRef.current && isSignedIn && mountedRef.current) {
          const attempt = reconnectAttemptsRef.current;
          const delay = Math.min(RECONNECT_BASE_MS * Math.pow(2, attempt), RECONNECT_CAP_MS);
          reconnectAttemptsRef.current = attempt + 1;
          logger.debug(`Attempting to reconnect in ${delay}ms (attempt ${attempt + 1})...`);

          reconnectTimeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              connectWebSocket();
            }
          }, delay);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnecting(false);
        toast.error('Erreur de connexion au serveur multijoueur');
      };

    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setIsConnecting(false);
      toast.error('Impossible de se connecter au serveur multijoueur');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, isConnecting, flushQueue, handleMessage]);

  // --- Public actions ---

  const createGame = useCallback(async (players: Player[], scoreLimit: number = 100) => {
    if (!socketRef.current || !isConnected || !user) {
      toast.error('Connexion non etablie');
      return false;
    }

    try {
      // Assign UUID-based IDs to players
      const playersWithUUIDs = players.map(p => ({
        ...p,
        id: p.id || uuidv4(),
      }));

      sendRaw(JSON.stringify({
        type: 'create_game',
        players: playersWithUUIDs,
        scoreLimit,
        userId: user.id,
        playerId: playerIdRef.current,
        playerName: user.fullName || user.email || 'Anonyme'
      }));
      return true;
    } catch (error) {
      console.error('Error creating game:', error);
      toast.error('Erreur lors de la creation de la partie');
      return false;
    }
  }, [isConnected, user, sendRaw]);

  const joinGame = useCallback(async (gameId: string) => {
    if (!socketRef.current || !isConnected || !user) {
      toast.error('Connexion non etablie');
      return false;
    }

    try {
      sendRaw(JSON.stringify({
        type: 'join_game',
        gameId: gameId.toUpperCase(),
        userId: user.id,
        playerId: playerIdRef.current,
        playerName: user.fullName || user.email || 'Anonyme'
      }));
      return true;
    } catch (error) {
      console.error('Error joining game:', error);
      toast.error('Erreur lors de la connexion a la partie');
      return false;
    }
  }, [isConnected, user, sendRaw]);

  const addRound = useCallback(async (scores: number[], dutchPlayerId?: string) => {
    if (!isConnected && messageQueueRef.current.length === 0 && !socketRef.current) {
      toast.error('Partie non active');
      return false;
    }
    if (!gameState) {
      toast.error('Partie non active');
      return false;
    }

    try {
      sendThrottled({
        type: 'add_round',
        gameId: gameState.gameId,
        scores,
        dutchPlayerId
      });
      return true;
    } catch (error) {
      console.error('Error adding round:', error);
      toast.error("Erreur lors de l'ajout de la manche");
      return false;
    }
  }, [isConnected, gameState, sendThrottled]);

  const undoRound = useCallback(async () => {
    if (!isConnected && messageQueueRef.current.length === 0 && !socketRef.current) {
      toast.error('Partie non active');
      return false;
    }
    if (!gameState) {
      toast.error('Partie non active');
      return false;
    }

    try {
      sendThrottled({
        type: 'undo_round',
        gameId: gameState.gameId
      });
      return true;
    } catch (error) {
      console.error('Error undoing round:', error);
      toast.error("Erreur lors de l'annulation de la manche");
      return false;
    }
  }, [isConnected, gameState, sendThrottled]);

  const disconnect = useCallback(() => {
    intentionalCloseRef.current = true;
    clearAllTimers();

    if (socketRef.current) {
      socketRef.current.close(1000, 'Intentional disconnect');
      socketRef.current = null;
    }
    setSocket(null);
    setIsConnected(false);
    setGameState(null);
    setRoomCode('');
    setConnectedPlayers([]);
    connectedPlayersSnapshotRef.current = '';
    setIsHost(false);
    messageQueueRef.current = [];

    // Allow reconnection after intentional disconnect is cleaned up
    setTimeout(() => {
      intentionalCloseRef.current = false;
    }, 0);
  }, [clearAllTimers]);

  // --- Effects ---

  // Auto-connect on mount if signed in
  useEffect(() => {
    mountedRef.current = true;
    intentionalCloseRef.current = false;

    if (isSignedIn && !socketRef.current && !isConnecting) {
      connectWebSocket();
    }

    // Full cleanup on unmount: close socket, clear ALL timers
    return () => {
      mountedRef.current = false;
      clearAllTimers();

      if (socketRef.current) {
        socketRef.current.close(1000, 'Component unmounted');
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  // Clean up when user signs out
  useEffect(() => {
    if (!isSignedIn) {
      disconnect();
    }
  }, [isSignedIn, disconnect]);

  return {
    // Connection state
    isConnected,
    isConnecting,

    // Game state
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

    // Utilities
    canManageGame: isHost || (gameState?.hostId === user?.id)
  };
};

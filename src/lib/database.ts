
import Dexie, { Table } from 'dexie';
import { Game, Player } from '@/types';

// Types pour la base de données
export interface OngoingGame {
  id: string;
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  isGameOver: boolean;
  scoreLimit: number;
  gameStartTime: string | null;
  lastUpdated: string;
}

export interface UserPreferences {
  id: string;
  soundEnabled: boolean;
  theme: string;
  lastSync?: string;
}

// Définition de la base de données
export class DutchDB extends Dexie {
  ongoingGames!: Table<OngoingGame>;
  gameHistory!: Table<Game>;
  userPreferences!: Table<UserPreferences>;

  constructor() {
    super('DutchDB');
    
    this.version(1).stores({
      ongoingGames: 'id, lastUpdated',
      gameHistory: 'id, date',
      userPreferences: 'id'
    });
  }
}

// Instance unique de la base de données
export const db = new DutchDB();

// Fonction utilitaire pour vérifier la disponibilité d'IndexedDB
export const isIndexedDBAvailable = async (): Promise<boolean> => {
  try {
    // Tente une opération simple pour vérifier si IndexedDB fonctionne
    await db.ongoingGames.count();
    return true;
  } catch (error) {
    console.warn('IndexedDB non disponible:', error);
    return false;
  }
};


/**
 * Tests d'intégrité pour le moteur de scores
 */
import { describe, test, expect, beforeEach } from 'vitest';
import { Player } from '@/types';
import {
  validatePlayerData,
  recalculatePlayerTotalScore,
  checkScoreIntegrity,
  fixPlayerScore,
  addRoundToPlayers,
  removeLastRoundFromPlayers,
  auditScoreIntegrity,
  validateRoundData
} from '@/utils/scoreEngine';

describe('Score Engine Integrity Tests', () => {
  let players: Player[];

  beforeEach(() => {
    players = [
      {
        id: 'player1',
        name: 'Alice',
        totalScore: 15,
        rounds: [
          { score: 5, isDutch: false },
          { score: 10, isDutch: true }
        ],
        avatarColor: '#FF6B6B',
        emoji: '🎲'
      },
      {
        id: 'player2',
        name: 'Bob',
        totalScore: 20,
        rounds: [
          { score: 15, isDutch: false },
          { score: 5, isDutch: false }
        ],
        avatarColor: '#4ECDC4',
        emoji: '🃏'
      }
    ];
  });

  describe('validatePlayerData', () => {
    test('should validate correct player data', () => {
      expect(validatePlayerData(players[0])).toBe(true);
    });

    test('should reject invalid player data', () => {
      expect(validatePlayerData(null as any)).toBe(false);
      expect(validatePlayerData({} as any)).toBe(false);
      expect(validatePlayerData({ id: 'test' } as any)).toBe(false);
      expect(validatePlayerData({ id: 'test', name: 'Test', rounds: 'invalid' } as any)).toBe(false);
    });
  });

  describe('recalculatePlayerTotalScore', () => {
    test('should calculate correct total from rounds', () => {
      expect(recalculatePlayerTotalScore(players[0])).toBe(15);
      expect(recalculatePlayerTotalScore(players[1])).toBe(20);
    });

    test('should return 0 for player with no rounds', () => {
      const emptyPlayer = { ...players[0], rounds: [] };
      expect(recalculatePlayerTotalScore(emptyPlayer)).toBe(0);
    });
  });

  describe('checkScoreIntegrity', () => {
    test('should validate consistent scores', () => {
      const result = checkScoreIntegrity(players[0]);
      expect(result.isValid).toBe(true);
      expect(result.calculatedTotal).toBe(15);
      expect(result.storedTotal).toBe(15);
    });

    test('should detect score mismatches', () => {
      const corruptedPlayer = { ...players[0], totalScore: 999 };
      const result = checkScoreIntegrity(corruptedPlayer);
      expect(result.isValid).toBe(false);
      expect(result.calculatedTotal).toBe(15);
      expect(result.storedTotal).toBe(999);
    });
  });

  describe('addRoundToPlayers', () => {
    test('should add round correctly', () => {
      const scores = [3, 7];
      const result = addRoundToPlayers(players, scores, 'player1');
      
      expect(result.success).toBe(true);
      expect(result.updatedPlayers[0].totalScore).toBe(18); // 15 + 3
      expect(result.updatedPlayers[1].totalScore).toBe(27); // 20 + 7
      expect(result.updatedPlayers[0].rounds).toHaveLength(3);
    });

    test('should reject invalid scores', () => {
      const invalidScores = [NaN, 5];
      const result = addRoundToPlayers(players, invalidScores, 'player1');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Scores invalides');
    });

    test('should reject mismatched array lengths', () => {
      const scores = [5]; // Only one score for two players
      const result = addRoundToPlayers(players, scores, 'player1');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Nombre de scores incorrect');
    });
  });

  describe('removeLastRoundFromPlayers', () => {
    test('should remove last round correctly', () => {
      const result = removeLastRoundFromPlayers(players);
      
      expect(result.success).toBe(true);
      expect(result.updatedPlayers[0].totalScore).toBe(5); // Only first round remains
      expect(result.updatedPlayers[1].totalScore).toBe(15); // Only first round remains
      expect(result.updatedPlayers[0].rounds).toHaveLength(1);
    });

    test('should handle players with no rounds', () => {
      const playersWithNoRounds = players.map(p => ({ ...p, rounds: [] }));
      const result = removeLastRoundFromPlayers(playersWithNoRounds);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Aucune manche à annuler');
    });
  });

  describe('auditScoreIntegrity', () => {
    test('should pass audit for valid scores', () => {
      const audit = auditScoreIntegrity(players);
      
      expect(audit.isValid).toBe(true);
      expect(audit.errors).toHaveLength(0);
      expect(audit.corrections).toHaveLength(0);
    });

    test('should detect integrity issues', () => {
      const corruptedPlayers = [
        { ...players[0], totalScore: 999 },
        { ...players[1], totalScore: 888 }
      ];
      
      const audit = auditScoreIntegrity(corruptedPlayers);
      
      expect(audit.isValid).toBe(false);
      expect(audit.errors).toHaveLength(2);
      expect(audit.corrections).toHaveLength(2);
      expect(audit.corrections[0].from).toBe(999);
      expect(audit.corrections[0].to).toBe(15);
    });
  });

  describe('validateRoundData', () => {
    test('should validate correct round data', () => {
      const scores = [5, 10];
      const dutchPlayerId = 'player1';
      const playerIds = ['player1', 'player2'];
      
      expect(validateRoundData(scores, dutchPlayerId, playerIds)).toBe(true);
    });

    test('should reject invalid Dutch player assignment', () => {
      const scores = [10, 5]; // player2 has lower score
      const dutchPlayerId = 'player1'; // but player1 is marked as Dutch
      const playerIds = ['player1', 'player2'];
      
      expect(validateRoundData(scores, dutchPlayerId, playerIds)).toBe(false);
    });

    test('should reject out-of-bounds scores', () => {
      const scores = [5, 1000]; // 1000 is too high
      const dutchPlayerId = 'player1';
      const playerIds = ['player1', 'player2'];
      
      expect(validateRoundData(scores, dutchPlayerId, playerIds)).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    test('should maintain integrity through full game flow', () => {
      let currentPlayers = [...players];
      
      // Add several rounds
      for (let i = 0; i < 5; i++) {
        const scores = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
        const minScore = Math.min(...scores);
        const dutchPlayerIndex = scores.indexOf(minScore);
        const dutchPlayerId = currentPlayers[dutchPlayerIndex].id;
        
        const result = addRoundToPlayers(currentPlayers, scores, dutchPlayerId);
        expect(result.success).toBe(true);
        currentPlayers = result.updatedPlayers;
        
        // Verify integrity after each round
        const audit = auditScoreIntegrity(currentPlayers);
        expect(audit.isValid).toBe(true);
      }
      
      // Remove some rounds
      for (let i = 0; i < 3; i++) {
        const result = removeLastRoundFromPlayers(currentPlayers);
        expect(result.success).toBe(true);
        currentPlayers = result.updatedPlayers;
        
        // Verify integrity after each removal
        const audit = auditScoreIntegrity(currentPlayers);
        expect(audit.isValid).toBe(true);
      }
    });
  });
});
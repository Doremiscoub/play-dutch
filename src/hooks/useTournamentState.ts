
import { useState, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { Player } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export interface TournamentMatch {
  id: string;
  matchNumber: number;
  players: Player[];
  isCompleted: boolean;
  winner?: string;
  gameStartTime: Date;
  gameEndTime?: Date;
}

export interface Tournament {
  id: string;
  name: string;
  playerNames: string[];
  totalRounds: number;
  currentRound: number;
  matches: TournamentMatch[];
  isCompleted: boolean;
  overallStandings: { playerName: string; totalScore: number; wins: number }[];
  createdAt: Date;
}

export const useTournamentState = () => {
  const [currentTournament, setCurrentTournament] = useLocalStorage<Tournament | null>('dutch_current_tournament', null);
  const [tournamentHistory] = useLocalStorage<Tournament[]>('dutch_tournament_history', []);

  const createTournament = useCallback((name: string, playerNames: string[], rounds: number) => {
    const tournament: Tournament = {
      id: uuidv4(),
      name,
      playerNames,
      totalRounds: rounds,
      currentRound: 1,
      matches: [],
      isCompleted: false,
      overallStandings: playerNames.map(name => ({
        playerName: name,
        totalScore: 0,
        wins: 0
      })),
      createdAt: new Date()
    };

    setCurrentTournament(tournament);
    toast.success(`Tournoi "${name}" créé avec succès !`);
    return tournament;
  }, [setCurrentTournament]);

  const startNextMatch = useCallback(() => {
    if (!currentTournament) return null;

    const newMatch: TournamentMatch = {
      id: uuidv4(),
      matchNumber: currentTournament.matches.length + 1,
      players: [],
      isCompleted: false,
      gameStartTime: new Date()
    };

    const updatedTournament = {
      ...currentTournament,
      matches: [...currentTournament.matches, newMatch]
    };

    setCurrentTournament(updatedTournament);
    return newMatch;
  }, [currentTournament, setCurrentTournament]);

  const completeMatch = useCallback((matchId: string, players: Player[]) => {
    if (!currentTournament) return;

    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const winner = sortedPlayers[0];

    const updatedMatches = currentTournament.matches.map(match => 
      match.id === matchId 
        ? {
            ...match,
            players: sortedPlayers,
            isCompleted: true,
            winner: winner.name,
            gameEndTime: new Date()
          }
        : match
    );

    // Mettre à jour les standings généraux
    const updatedStandings = currentTournament.overallStandings.map(standing => {
      const player = players.find(p => p.name === standing.playerName);
      if (player) {
        return {
          ...standing,
          totalScore: standing.totalScore + player.totalScore,
          wins: standing.wins + (player.name === winner.name ? 1 : 0)
        };
      }
      return standing;
    });

    const updatedTournament = {
      ...currentTournament,
      matches: updatedMatches,
      overallStandings: updatedStandings
    };

    // Vérifier si le tournoi est terminé
    if (updatedMatches.length >= currentTournament.totalRounds) {
      updatedTournament.isCompleted = true;
      toast.success('Tournoi terminé !');
    }

    setCurrentTournament(updatedTournament);
  }, [currentTournament, setCurrentTournament]);

  const getCurrentMatch = useCallback(() => {
    if (!currentTournament) return null;
    return currentTournament.matches.find(match => !match.isCompleted) || null;
  }, [currentTournament]);

  const getTournamentProgress = useCallback(() => {
    if (!currentTournament) return { current: 0, total: 0, percentage: 0 };
    
    const completedMatches = currentTournament.matches.filter(m => m.isCompleted).length;
    const totalMatches = currentTournament.totalRounds;
    
    return {
      current: completedMatches,
      total: totalMatches,
      percentage: totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0
    };
  }, [currentTournament]);

  const finalizeTournament = useCallback(() => {
    if (!currentTournament || !currentTournament.isCompleted) return;

    // Sauvegarder dans l'historique
    const history = JSON.parse(localStorage.getItem('dutch_tournament_history') || '[]');
    history.push(currentTournament);
    localStorage.setItem('dutch_tournament_history', JSON.stringify(history));

    // Nettoyer le tournoi actuel
    setCurrentTournament(null);
    
    toast.success('Tournoi sauvegardé dans l\'historique');
  }, [currentTournament, setCurrentTournament]);

  return {
    currentTournament,
    createTournament,
    startNextMatch,
    completeMatch,
    getCurrentMatch,
    getTournamentProgress,
    finalizeTournament,
    tournamentHistory
  };
};

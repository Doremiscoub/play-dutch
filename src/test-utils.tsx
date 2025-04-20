
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
}

export function setupTestPlayers(names: string[]) {
  const players = names.map((name, index) => ({
    id: `test-${index}`,
    name,
    totalScore: 0,
    rounds: [],
    avatarColor: '#000000'
  }));
  
  localStorage.setItem('dutch_player_setup', JSON.stringify({
    players: names,
    scoreLimit: 100
  }));
  
  return players;
}


import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
}

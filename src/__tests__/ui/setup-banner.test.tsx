
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import LocalGameSetup from '../../components/game-setup/LocalGameSetup';

describe('UI: Setup Banner', () => {
  it('should display the local game setup', () => {
    render(<LocalGameSetup onStartGame={() => {}} />);
    
    expect(screen.getByText(/commencer la partie/i)).toBeInTheDocument();
  });
});

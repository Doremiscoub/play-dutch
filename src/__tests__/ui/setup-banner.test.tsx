
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import LocalGameSetupContainer from '../../components/game-setup/LocalGameSetupContainer';

describe('UI: Setup Banner', () => {
  it('should display the single device info banner', () => {
    render(<LocalGameSetupContainer onStartGame={() => {}} />);
    
    expect(screen.getByText(/un seul appareil suffit/i)).toBeInTheDocument();
  });
});

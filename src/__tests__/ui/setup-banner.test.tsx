
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import UnifiedGameSetup from '../../components/game-setup/UnifiedGameSetup';

describe('UI: Setup Banner', () => {
  it('should display the single device info banner', () => {
    render(<UnifiedGameSetup onStartGame={() => {}} />);
    
    expect(screen.getByText(/un seul appareil suffit/i)).toBeInTheDocument();
  });
});


import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfessorAvatar from '../../components/game/ProfessorAvatar';

describe('UI: Professor Avatar', () => {
  it('should render avatar image when loading succeeds', () => {
    render(<ProfessorAvatar />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it('should return null when image fails to load', () => {
    const { container } = render(<ProfessorAvatar />);
    const image = screen.getByRole('img');
    
    // Simulate image load error
    image.dispatchEvent(new Event('error'));
    
    expect(container.innerHTML).toBe('');
  });
});

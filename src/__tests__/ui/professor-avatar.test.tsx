
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { ProfessorAvatar } from '@/features/ai-commentator';

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

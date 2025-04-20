
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedBackground from '../../components/AnimatedBackground';

describe('UI: Background', () => {
  it('should render a canvas element for the background', () => {
    const { container } = render(<AnimatedBackground />);
    const canvas = container.querySelector('canvas');
    
    expect(canvas).not.toBeNull();
    expect(canvas?.classList.contains('fixed')).toBe(true);
    expect(canvas?.classList.contains('inset-0')).toBe(true);
  });
  
  it('should have pointer-events-none to not interfere with UI', () => {
    const { container } = render(<AnimatedBackground />);
    const canvas = container.querySelector('canvas');
    
    expect(canvas?.classList.contains('pointer-events-none')).toBe(true);
  });
  
  it('should accept a variant prop', () => {
    // This tests that the component accepts the variant prop without errors
    const { container } = render(<AnimatedBackground variant="subtle" />);
    const canvas = container.querySelector('canvas');
    
    expect(canvas).not.toBeNull();
  });
});

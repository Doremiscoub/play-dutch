
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedBackground from '../../components/background/AnimatedBackground';

describe('UI: Background', () => {
  it('should render exactly two waves with correct animation durations', () => {
    const { container } = render(<AnimatedBackground />);
    const waves = container.querySelectorAll('svg');
    
    expect(waves.length).toBe(2);
    
    const styles = Array.from(waves).map(wave => 
      wave.style.animation
    );
    
    expect(styles[0]).toContain('60s');
    expect(styles[1]).toContain('120s');
  });
});

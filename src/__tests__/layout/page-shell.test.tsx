
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageShell from '@/components/layout/PageShell';

describe('PageShell Component', () => {
  it('renders children correctly', () => {
    render(
      <PageShell>
        <div data-testid="child-content">Test Content</div>
      </PageShell>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct classes and layout structure', () => {
    render(
      <PageShell className="custom-class">
        <div>Content</div>
      </PageShell>
    );

    const container = screen.getByText('Content').closest('.min-h-screen');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('min-h-screen', 'relative', 'custom-class');
  });

  it('supports different variants', () => {
    const { rerender } = render(
      <PageShell variant="minimal">
        <div data-testid="content">Minimal Content</div>
      </PageShell>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();

    rerender(
      <PageShell variant="game">
        <div data-testid="content">Game Content</div>
      </PageShell>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('integrates with UnifiedBackground component', () => {
    render(
      <PageShell variant="default">
        <div data-testid="background-content">Background Test</div>
      </PageShell>
    );

    const content = screen.getByTestId('background-content');
    expect(content).toBeInTheDocument();
    
    // Check that the component is wrapped in the expected structure
    const container = content.closest('.min-h-screen');
    expect(container).toBeInTheDocument();
  });
});

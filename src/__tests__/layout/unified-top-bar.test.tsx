
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import UnifiedTopBar from '@/components/scoreboard/UnifiedTopBar';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UnifiedTopBar Component', () => {
  const TopBarWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

  beforeEach(() => {
    mockNavigate.mockClear();
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders title correctly', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar title="Game Score" />
      </TopBarWrapper>
    );

    expect(screen.getByText('Game Score')).toBeInTheDocument();
  });

  it('shows back button when enabled', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar title="Test" showBackButton={true} />
      </TopBarWrapper>
    );

    const backButton = screen.getByRole('button');
    expect(backButton).toBeInTheDocument();
  });

  it('handles custom back function', () => {
    const mockOnBack = vi.fn();
    render(
      <TopBarWrapper>
        <UnifiedTopBar 
          title="Test" 
          showBackButton={true}
          onBack={mockOnBack}
        />
      </TopBarWrapper>
    );

    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('displays game info badges when provided', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar 
          title="Game" 
          roundCount={5}
          scoreLimit={500}
        />
      </TopBarWrapper>
    );

    expect(screen.getByText('Manche 5')).toBeInTheDocument();
    expect(screen.getByText('Limite 500 pts')).toBeInTheDocument();
  });

  it('shows settings and rules buttons by default', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar title="Test" />
      </TopBarWrapper>
    );

    // Should have multiple buttons (back, rules, settings)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
  });

  it('hides settings button when disabled', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar 
          title="Test" 
          showSettings={false}
          showRules={false}
          showBackButton={false}
        />
      </TopBarWrapper>
    );

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('applies custom className', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar 
          title="Test" 
          className="custom-topbar-class"
        />
      </TopBarWrapper>
    );

    const container = screen.getByText('Test').closest('div');
    expect(container).toHaveClass('custom-topbar-class');
  });
});

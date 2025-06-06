
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
    localStorage.clear();
  });

  it('renders with transparent background and gradient title', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar title="Test Title" />
      </TopBarWrapper>
    );

    const topbar = screen.getByTestId('unified-topbar');
    expect(topbar).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    
    // Check for transparent header (no gradient background)
    expect(topbar).not.toHaveClass('bg-gradient-to-r');
    expect(topbar).toHaveClass('relative');
    
    // Check for gradient text
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('bg-gradient-to-r');
    expect(title).toHaveClass('from-dutch-blue');
    expect(title).toHaveClass('via-dutch-purple');
    expect(title).toHaveClass('to-dutch-orange');
    expect(title).toHaveClass('bg-clip-text');
    expect(title).toHaveClass('text-transparent');
  });

  it('shows back button when enabled with glass styling', () => {
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

    const backButton = screen.getByLabelText('Retour');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass('bg-white/20');
    
    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('displays game info when provided', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar 
          title="Game" 
          roundCount={5}
          scoreLimit={100}
        />
      </TopBarWrapper>
    );

    expect(screen.getByText('Manche 5')).toBeInTheDocument();
    expect(screen.getByText('Objectif : 100 pts')).toBeInTheDocument();
  });

  it('shows settings button', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar title="Test" showSettings={true} />
      </TopBarWrapper>
    );

    // Should have settings button
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('has correct font and size styling for title', () => {
    render(
      <TopBarWrapper>
        <UnifiedTopBar title="Test Title" />
      </TopBarWrapper>
    );

    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('text-3xl');
    expect(title).toHaveClass('md:text-4xl');
    expect(title).toHaveClass('font-extrabold');
  });
});

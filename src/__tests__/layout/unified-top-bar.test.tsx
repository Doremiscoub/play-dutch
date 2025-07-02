
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import UnifiedHeader from '@/components/layout/UnifiedHeader';

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
        <UnifiedHeader title="Test Title" />
      </TopBarWrapper>
    );

    const topbar = screen.getByTestId('unified-topbar');
    expect(topbar).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    
    // Check for transparent header
    expect(topbar).toHaveClass('bg-transparent');
    
    // Check for gradient text
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('bg-gradient-to-r');
    expect(title).toHaveClass('from-dutch-blue');
    expect(title).toHaveClass('via-dutch-purple');
    expect(title).toHaveClass('to-dutch-orange');
    expect(title).toHaveClass('bg-clip-text');
    expect(title).toHaveClass('text-transparent');
    expect(title).toHaveClass('animate-gradient-x');
  });

  it('shows back button when enabled with glass styling', () => {
    const mockOnBack = vi.fn();
    render(
      <TopBarWrapper>
        <UnifiedHeader 
          title="Test" 
          showBackButton={true}
          onBack={mockOnBack}
        />
      </TopBarWrapper>
    );

    const backButton = screen.getByLabelText('Retour');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass('bg-white/20');
    expect(backButton).toHaveClass('backdrop-blur-sm');
    
    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('displays game info when provided', () => {
    render(
      <TopBarWrapper>
        <UnifiedHeader 
          title="Game" 
          roundCount={5}
          scoreLimit={100}
          variant="game"
        />
      </TopBarWrapper>
    );

    expect(screen.getByText('Manche 5')).toBeInTheDocument();
    expect(screen.getByText('Objectif : 100 pts')).toBeInTheDocument();
  });

  it('shows settings button', () => {
    render(
      <TopBarWrapper>
        <UnifiedHeader title="Test" showSettings={true} />
      </TopBarWrapper>
    );

    // Should have settings button
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('has correct font and size styling for title', () => {
    render(
      <TopBarWrapper>
        <UnifiedHeader title="Test Title" />
      </TopBarWrapper>
    );

    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('text-3xl');
    expect(title).toHaveClass('md:text-4xl');
    expect(title).toHaveClass('font-extrabold');
    expect(title).toHaveClass('tracking-tight');
  });

  it('applies glassmorphic styling to buttons', () => {
    const mockOnBack = vi.fn();
    render(
      <TopBarWrapper>
        <UnifiedHeader 
          title="Test" 
          showBackButton={true}
          onBack={mockOnBack}
          showSettings={true}
        />
      </TopBarWrapper>
    );

    const backButton = screen.getByLabelText('Retour');
    expect(backButton).toHaveClass('rounded-xl');
    expect(backButton).toHaveClass('border');
    expect(backButton).toHaveClass('border-white/30');
  });
});

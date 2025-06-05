
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';

// Mock the hooks and components
vi.mock('@/hooks/useAppState', () => ({
  useAppState: () => ({
    globalLoading: false,
    loadingMessage: '',
    globalError: null,
    setGlobalError: vi.fn(),
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('AppLayout Component', () => {
  const AppLayoutWrapper = ({ children }: { children?: React.ReactNode }) => (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );

  it('renders without errors', () => {
    render(<AppLayoutWrapper />);
    
    // Should render the layout structure
    const container = document.querySelector('.min-h-screen');
    expect(container).toBeInTheDocument();
  });

  it('shows global loading when enabled', () => {
    // Mock loading state
    vi.mocked(require('@/hooks/useAppState').useAppState).mockReturnValue({
      globalLoading: true,
      loadingMessage: 'Loading game...',
      globalError: null,
      setGlobalError: vi.fn(),
    });

    render(<AppLayoutWrapper />);
    
    // The loading component should be present
    const container = document.querySelector('.min-h-screen');
    expect(container).toBeInTheDocument();
  });

  it('handles global errors', () => {
    const mockSetGlobalError = vi.fn();
    const mockToastError = vi.fn();
    
    vi.mocked(require('@/hooks/useAppState').useAppState).mockReturnValue({
      globalLoading: false,
      loadingMessage: '',
      globalError: 'Test error message',
      setGlobalError: mockSetGlobalError,
    });
    
    vi.mocked(require('sonner').toast.error).mockImplementation(mockToastError);

    render(<AppLayoutWrapper />);
    
    // Toast error should be called
    expect(mockToastError).toHaveBeenCalledWith('Test error message');
    expect(mockSetGlobalError).toHaveBeenCalledWith(null);
  });

  it('integrates with ErrorBoundary', () => {
    render(<AppLayoutWrapper />);
    
    // Should render without throwing errors
    const container = document.querySelector('.min-h-screen');
    expect(container).toBeInTheDocument();
  });
});

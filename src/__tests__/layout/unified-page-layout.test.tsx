
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';

describe('UnifiedPageLayout Component', () => {
  it('renders with title and content', () => {
    render(
      <UnifiedPageLayout title="Test Page">
        <div data-testid="page-content">Page Content</div>
      </UnifiedPageLayout>
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  it('shows back button when enabled', () => {
    const mockOnBack = vi.fn();
    render(
      <UnifiedPageLayout 
        title="Test Page" 
        showBackButton={true}
        onBack={mockOnBack}
      >
        <div>Content</div>
      </UnifiedPageLayout>
    );

    const backButton = screen.getByRole('button');
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('hides back button when disabled', () => {
    render(
      <UnifiedPageLayout 
        title="Test Page" 
        showBackButton={false}
      >
        <div>Content</div>
      </UnifiedPageLayout>
    );

    const backButton = screen.queryByRole('button');
    expect(backButton).not.toBeInTheDocument();
  });

  it('applies different background variants', () => {
    const { rerender } = render(
      <UnifiedPageLayout 
        title="Test" 
        backgroundVariant="minimal"
      >
        <div data-testid="content">Content</div>
      </UnifiedPageLayout>
    );

    let container = screen.getByTestId('content').closest('.min-h-screen');
    expect(container).toHaveClass('bg-gray-50');

    rerender(
      <UnifiedPageLayout 
        title="Test" 
        backgroundVariant="subtle"
      >
        <div data-testid="content">Content</div>
      </UnifiedPageLayout>
    );

    container = screen.getByTestId('content').closest('.min-h-screen');
    expect(container).toHaveClass('bg-gradient-to-br', 'from-gray-50', 'to-white');
  });

  it('applies custom className to main content', () => {
    render(
      <UnifiedPageLayout 
        title="Test" 
        className="custom-main-class"
      >
        <div data-testid="content">Content</div>
      </UnifiedPageLayout>
    );

    const mainElement = screen.getByTestId('content').closest('main');
    expect(mainElement).toHaveClass('custom-main-class');
  });

  it('renders sticky header with backdrop blur', () => {
    render(
      <UnifiedPageLayout title="Sticky Header Test">
        <div>Content</div>
      </UnifiedPageLayout>
    );

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50', 'backdrop-blur-xl');
    expect(screen.getByText('Sticky Header Test')).toBeInTheDocument();
  });
});

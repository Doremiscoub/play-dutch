
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

describe('Tooltip Components', () => {
  const TooltipExample = ({ content = "Tooltip content" }: { content?: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  it('renders trigger correctly', () => {
    render(<TooltipExample />);
    const trigger = screen.getByRole('button', { name: /hover me/i });
    expect(trigger).toBeInTheDocument();
  });

  it('shows tooltip content on hover', async () => {
    render(<TooltipExample content="Test tooltip" />);
    const trigger = screen.getByRole('button', { name: /hover me/i });
    
    // Initially, tooltip content should not be visible
    expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    
    // Hover over the trigger
    fireEvent.mouseEnter(trigger);
    
    // Wait for tooltip to appear
    await waitFor(() => {
      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip content on mouse leave', async () => {
    render(<TooltipExample content="Hide me" />);
    const trigger = screen.getByRole('button', { name: /hover me/i });
    
    // Show tooltip
    fireEvent.mouseEnter(trigger);
    await waitFor(() => {
      expect(screen.getByText('Hide me')).toBeInTheDocument();
    });
    
    // Hide tooltip
    fireEvent.mouseLeave(trigger);
    await waitFor(() => {
      expect(screen.queryByText('Hide me')).not.toBeInTheDocument();
    });
  });

  it('shows tooltip content on focus', async () => {
    render(<TooltipExample content="Focus tooltip" />);
    const trigger = screen.getByRole('button', { name: /hover me/i });
    
    fireEvent.focus(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Focus tooltip')).toBeInTheDocument();
    });
  });

  it('applies correct tooltip content classes', async () => {
    render(<TooltipExample />);
    const trigger = screen.getByRole('button', { name: /hover me/i });
    
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      const tooltip = screen.getByText('Tooltip content').closest('[role="tooltip"]');
      expect(tooltip).toHaveClass(
        'z-50',
        'overflow-hidden',
        'rounded-md',
        'border',
        'bg-popover',
        'px-3',
        'py-1.5',
        'text-sm',
        'text-popover-foreground',
        'shadow-md'
      );
    });
  });

  it('supports custom className on tooltip content', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Custom tooltip</button>
          </TooltipTrigger>
          <TooltipContent className="custom-tooltip">
            <p>Custom content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = screen.getByRole('button', { name: /custom tooltip/i });
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      const tooltip = screen.getByText('Custom content').closest('[role="tooltip"]');
      expect(tooltip).toHaveClass('custom-tooltip');
      expect(tooltip).toHaveClass('z-50'); // Keeps base classes
    });
  });

  it('works with different trigger elements', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>Span trigger</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Span tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = screen.getByText('Span trigger');
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Span tooltip')).toBeInTheDocument();
    });
  });

  it('supports side offset configuration', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Offset tooltip</button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>
            <p>Offset content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = screen.getByRole('button', { name: /offset tooltip/i });
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Offset content')).toBeInTheDocument();
    });
  });
});

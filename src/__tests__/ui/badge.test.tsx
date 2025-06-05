
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'rounded-full',
      'border',
      'px-2.5',
      'py-0.5',
      'text-xs',
      'font-semibold',
      'border-transparent',
      'bg-primary',
      'text-primary-foreground'
    );
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass(
      'border-transparent',
      'bg-secondary',
      'text-secondary-foreground'
    );
  });

  it('renders with destructive variant', () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    const badge = screen.getByText('Destructive Badge');
    expect(badge).toHaveClass(
      'border-transparent',
      'bg-destructive',
      'text-destructive-foreground'
    );
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badge = screen.getByText('Outline Badge');
    expect(badge).toHaveClass('text-foreground');
    expect(badge).not.toHaveClass('border-transparent');
  });

  it('applies custom className correctly', () => {
    render(<Badge className="custom-badge">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-badge');
    expect(badge).toHaveClass('inline-flex'); // Keeps base classes
  });

  it('supports custom HTML attributes', () => {
    render(
      <Badge data-testid="test-badge" role="status">
        Test Badge
      </Badge>
    );
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveAttribute('role', 'status');
  });

  it('handles click events when used as clickable element', () => {
    const handleClick = vi.fn();
    render(
      <Badge onClick={handleClick} style={{ cursor: 'pointer' }}>
        Clickable Badge
      </Badge>
    );
    
    const badge = screen.getByText('Clickable Badge');
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

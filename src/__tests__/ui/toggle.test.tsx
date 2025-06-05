
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from '@/components/ui/toggle';

describe('Toggle Component', () => {
  it('renders with default variant and size', () => {
    render(<Toggle>Toggle Text</Toggle>);
    const toggle = screen.getByText('Toggle Text');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'text-sm',
      'font-medium',
      'h-10',
      'px-3'
    );
  });

  it('handles pressed state correctly', () => {
    render(<Toggle defaultPressed>Pressed Toggle</Toggle>);
    const toggle = screen.getByText('Pressed Toggle');
    expect(toggle).toHaveAttribute('data-state', 'on');
  });

  it('can be toggled on/off', () => {
    const handlePressedChange = vi.fn();
    render(
      <Toggle onPressedChange={handlePressedChange}>
        Clickable Toggle
      </Toggle>
    );
    
    const toggle = screen.getByText('Clickable Toggle');
    
    fireEvent.click(toggle);
    expect(handlePressedChange).toHaveBeenCalledWith(true);
    
    fireEvent.click(toggle);
    expect(handlePressedChange).toHaveBeenCalledWith(false);
  });

  it('renders with outline variant', () => {
    render(<Toggle variant="outline">Outline Toggle</Toggle>);
    const toggle = screen.getByText('Outline Toggle');
    expect(toggle).toHaveClass('border', 'border-input', 'bg-transparent');
  });

  it('handles different sizes correctly', () => {
    const { rerender } = render(<Toggle size="sm">Small</Toggle>);
    expect(screen.getByText('Small')).toHaveClass('h-9', 'px-2.5');

    rerender(<Toggle size="lg">Large</Toggle>);
    expect(screen.getByText('Large')).toHaveClass('h-11', 'px-5', 'text-lg', 'font-semibold');

    rerender(<Toggle size="xs">Extra Small</Toggle>);
    expect(screen.getByText('Extra Small')).toHaveClass('h-8', 'px-2');
  });

  it('can be disabled', () => {
    render(<Toggle disabled>Disabled Toggle</Toggle>);
    const toggle = screen.getByText('Disabled Toggle');
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Toggle className="custom-toggle">Custom Toggle</Toggle>);
    const toggle = screen.getByText('Custom Toggle');
    expect(toggle).toHaveClass('custom-toggle');
    expect(toggle).toHaveClass('inline-flex'); // Keeps base classes
  });

  it('supports controlled state', () => {
    const handlePressedChange = vi.fn();
    const { rerender } = render(
      <Toggle pressed={false} onPressedChange={handlePressedChange}>
        Controlled Toggle
      </Toggle>
    );
    
    const toggle = screen.getByText('Controlled Toggle');
    expect(toggle).toHaveAttribute('data-state', 'off');

    rerender(
      <Toggle pressed={true} onPressedChange={handlePressedChange}>
        Controlled Toggle
      </Toggle>
    );
    expect(toggle).toHaveAttribute('data-state', 'on');
  });

  it('supports accessibility attributes', () => {
    render(
      <Toggle aria-label="Toggle setting" role="switch">
        Setting
      </Toggle>
    );
    
    const toggle = screen.getByLabelText('Toggle setting');
    expect(toggle).toHaveAttribute('role', 'switch');
  });
});

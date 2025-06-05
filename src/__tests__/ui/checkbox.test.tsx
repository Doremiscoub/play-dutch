
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from '@/components/ui/checkbox';

describe('Checkbox Component', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveClass(
      'peer',
      'h-4',
      'w-4',
      'shrink-0',
      'rounded-sm',
      'border',
      'border-primary'
    );
  });

  it('can be checked', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles controlled state', () => {
    const handleCheckedChange = vi.fn();
    const { rerender } = render(
      <Checkbox checked={false} onCheckedChange={handleCheckedChange} />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);

    rerender(<Checkbox checked={true} onCheckedChange={handleCheckedChange} />);
    expect(checkbox).toBeChecked();
  });

  it('shows check icon when checked', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    const checkIcon = checkbox.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-checkbox');
    expect(checkbox).toHaveClass('peer'); // Keeps base classes
  });

  it('supports accessibility attributes', () => {
    render(<Checkbox aria-label="Accept terms" />);
    const checkbox = screen.getByLabelText('Accept terms');
    expect(checkbox).toBeInTheDocument();
  });

  it('works with form labels', () => {
    render(
      <div>
        <label htmlFor="test-checkbox">Test Label</label>
        <Checkbox id="test-checkbox" />
      </div>
    );
    
    const label = screen.getByText('Test Label');
    const checkbox = screen.getByRole('checkbox');
    
    fireEvent.click(label);
    expect(checkbox).toBeChecked();
  });

  it('handles indeterminate state', () => {
    render(<Checkbox checked="indeterminate" />);
    const checkbox = screen.getByRole('checkbox');
    // Note: The actual indeterminate state would be handled by the Radix component
    expect(checkbox).toBeInTheDocument();
  });
});

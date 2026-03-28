
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from '@/components/ui/label';

describe('Label Component', () => {
  it('renders with default properties', () => {
    render(<Label>Username</Label>);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(
      'text-sm',
      'font-medium',
      'leading-none',
      'peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-70'
    );
  });

  it('applies htmlFor attribute correctly', () => {
    render(<Label htmlFor="username">Username</Label>);
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username');
  });

  it('applies custom className', () => {
    render(<Label className="custom-label">Custom Label</Label>);
    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-label');
    expect(label).toHaveClass('text-sm'); // Keeps base classes
  });

  it('works with form inputs', () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" type="text" />
      </div>
    );
    
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('supports accessibility attributes', () => {
    render(
      <Label aria-label="Accessible label" role="label">
        Form Label
      </Label>
    );
    
    const label = screen.getByText('Form Label');
    expect(label).toHaveAttribute('aria-label', 'Accessible label');
    expect(label).toHaveAttribute('role', 'label');
  });

  it('handles nested content', () => {
    render(
      <Label>
        <span>Required</span>
        <strong>*</strong>
      </Label>
    );
    
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

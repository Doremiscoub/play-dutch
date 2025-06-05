
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('renders with default properties', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      'flex',
      'h-10',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2'
    );
  });

  it('applies custom className correctly', () => {
    render(<Input className="custom-input" placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('custom-input');
    expect(input).toHaveClass('flex'); // Keeps base classes
  });

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(
      <Input 
        placeholder="Focus test" 
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
    
    const input = screen.getByPlaceholderText('Focus test');
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('handles different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" placeholder="Number" />);
    expect(screen.getByPlaceholderText('Number')).toHaveAttribute('type', 'number');
  });

  it('supports controlled input', () => {
    const handleChange = vi.fn();
    render(
      <Input 
        value="controlled value" 
        onChange={handleChange} 
        placeholder="Controlled"
      />
    );
    
    const input = screen.getByDisplayValue('controlled value');
    expect(input).toBeInTheDocument();
    
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('supports ref forwarding', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref test" />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe('Ref test');
  });
});

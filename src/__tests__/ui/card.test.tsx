
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default variant', () => {
      render(<Card data-testid="card">Default Card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg', 'text-card-foreground', 'shadow-sm', 'border', 'bg-card');
    });

    it('renders with glass variant', () => {
      render(<Card variant="glass" data-testid="card">Glass Card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('glass-card', 'border-white/30');
    });

    it('renders with elevated variant', () => {
      render(<Card variant="elevated" data-testid="card">Elevated Card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-white', 'shadow-lg', 'border-gray-200');
    });

    it('renders with subtle variant', () => {
      render(<Card variant="subtle" data-testid="card">Subtle Card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-gray-50/80', 'border-gray-200/50');
    });

    it('applies custom className', () => {
      render(<Card className="custom-card" data-testid="card">Custom Card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card', 'rounded-lg');
    });
  });

  describe('CardHeader', () => {
    it('renders correctly', () => {
      render(<CardHeader data-testid="header">Header Content</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 with correct classes', () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
    });
  });

  describe('CardDescription', () => {
    it('renders with correct classes', () => {
      render(<CardDescription data-testid="description">Description text</CardDescription>);
      const description = screen.getByTestId('description');
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
    });
  });

  describe('CardContent', () => {
    it('renders with correct padding', () => {
      render(<CardContent data-testid="content">Content here</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('p-6', 'pt-0');
    });
  });

  describe('CardFooter', () => {
    it('renders with flex layout', () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });
  });

  describe('Complete Card Structure', () => {
    it('renders full card structure correctly', () => {
      render(
        <Card data-testid="full-card">
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Test content paragraph</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId('full-card')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test content paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /action button/i })).toBeInTheDocument();
    });
  });
});

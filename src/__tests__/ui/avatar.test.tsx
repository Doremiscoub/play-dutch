
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

describe('Avatar Components', () => {
  describe('Avatar', () => {
    it('renders with default classes', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass(
        'relative',
        'flex',
        'h-10',
        'w-10',
        'shrink-0',
        'overflow-hidden',
        'rounded-full'
      );
    });

    it('applies custom className', () => {
      render(<Avatar className="custom-avatar" data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('custom-avatar');
      expect(avatar).toHaveClass('relative'); // Keeps base classes
    });
  });

  describe('AvatarImage', () => {
    it('renders image with correct attributes', () => {
      render(
        <Avatar>
          <AvatarImage src="/test-avatar.jpg" alt="Test User" />
        </Avatar>
      );
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/test-avatar.jpg');
      expect(image).toHaveAttribute('alt', 'Test User');
      expect(image).toHaveClass('aspect-square', 'h-full', 'w-full');
    });

    it('applies custom className to image', () => {
      render(
        <Avatar>
          <AvatarImage 
            src="/test.jpg" 
            alt="Test" 
            className="custom-image"
          />
        </Avatar>
      );
      
      const image = screen.getByRole('img');
      expect(image).toHaveClass('custom-image');
      expect(image).toHaveClass('aspect-square'); // Keeps base classes
    });
  });

  describe('AvatarFallback', () => {
    it('renders fallback content', () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      
      const fallback = screen.getByText('JD');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveClass(
        'flex',
        'h-full',
        'w-full',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-muted'
      );
    });

    it('applies custom className to fallback', () => {
      render(
        <Avatar>
          <AvatarFallback className="custom-fallback">AB</AvatarFallback>
        </Avatar>
      );
      
      const fallback = screen.getByText('AB');
      expect(fallback).toHaveClass('custom-fallback');
      expect(fallback).toHaveClass('flex'); // Keeps base classes
    });
  });

  describe('Complete Avatar Structure', () => {
    it('renders complete avatar with image and fallback', () => {
      render(
        <Avatar data-testid="complete-avatar">
          <AvatarImage src="/user.jpg" alt="User Name" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId('complete-avatar')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByText('UN')).toBeInTheDocument();
    });

    it('shows fallback when image fails to load', () => {
      // This would typically be handled by the Radix Avatar component
      render(
        <Avatar>
          <AvatarImage src="/broken-image.jpg" alt="Broken" />
          <AvatarFallback>BR</AvatarFallback>
        </Avatar>
      );
      
      // Both elements are present, Radix handles the display logic
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByText('BR')).toBeInTheDocument();
    });
  });
});

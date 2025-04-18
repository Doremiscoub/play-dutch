
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SignedOutButtons from '@/components/home/SignedOutButtons';
import SignOutButton from '@/components/settings/SignOutButton';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn()
}));

describe('Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('clicking sign in button navigates to /sign-in', () => {
    const navigate = vi.fn();
    (useNavigate as any).mockReturnValue(navigate);

    render(<SignedOutButtons />);
    
    const signInButton = screen.getByText(/Connexion/i);
    fireEvent.click(signInButton);
    
    expect(navigate).toHaveBeenCalledWith('/sign-in');
  });

  it('clicking sign out button clears localStorage and navigates to home', async () => {
    const navigate = vi.fn();
    const signOut = vi.fn();
    
    (useNavigate as any).mockReturnValue(navigate);
    (useAuth as any).mockReturnValue({ signOut, isSignedIn: true });

    const localStorageSpy = vi.spyOn(Storage.prototype, 'clear');

    render(<SignOutButton />);
    
    const signOutButton = screen.getByText(/Se déconnecter/i);
    fireEvent.click(signOutButton);

    expect(signOut).toHaveBeenCalled();
    expect(localStorageSpy).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/');
  });
});

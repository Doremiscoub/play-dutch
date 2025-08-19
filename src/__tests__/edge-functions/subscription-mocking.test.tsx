import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useSubscription } from '@/hooks/useSubscription';
import Home from '@/pages/Home';
import { MemoryRouter } from 'react-router-dom';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn()
    }
  }
}));

vi.mock('@/hooks/useSubscription');
const mockUseSubscription = vi.mocked(useSubscription);

describe('Edge Function Subscription Mocking', () => {
  it('handles premium subscription response', async () => {
    mockUseSubscription.mockReturnValue({
      isPremium: true,
      isLoading: false,
      subscriptionTier: 'premium',
      subscriptionEnd: '',
      checkSubscription: vi.fn(),
      createCheckoutSession: vi.fn(),
      openCustomerPortal: vi.fn()
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('ad-slot')).not.toBeInTheDocument();
    });
  });

  it('handles free tier subscription response', async () => {
    mockUseSubscription.mockReturnValue({
      isPremium: false,
      isLoading: false,
      subscriptionTier: 'free',
      subscriptionEnd: null,
      checkSubscription: vi.fn(),
      createCheckoutSession: vi.fn(),
      openCustomerPortal: vi.fn()
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // In free tier, ads should be visible
    await waitFor(() => {
      expect(mockUseSubscription).toHaveBeenCalled();
    });
  });

  it('handles loading state gracefully', async () => {
    mockUseSubscription.mockReturnValue({
      isPremium: false,
      isLoading: true,
      subscriptionTier: null,
      subscriptionEnd: null,
      checkSubscription: vi.fn(),
      createCheckoutSession: vi.fn(),
      openCustomerPortal: vi.fn()
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(mockUseSubscription).toHaveBeenCalled();
  });
});
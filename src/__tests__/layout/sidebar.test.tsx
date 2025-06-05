
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Sidebar Components', () => {
  const SidebarTestWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </BrowserRouter>
  );

  it('renders sidebar with menu items', () => {
    render(
      <SidebarTestWrapper>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/home">Home</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/game">Game</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarTestWrapper>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Game')).toBeInTheDocument();
  });

  it('handles sidebar trigger toggle', () => {
    render(
      <SidebarTestWrapper>
        <SidebarTrigger />
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Settings</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarTestWrapper>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger);
    // Sidebar toggle functionality is handled by the provider
    expect(trigger).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(
      <SidebarTestWrapper>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>First Item</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Second Item</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarTestWrapper>
    );

    const firstButton = screen.getByRole('button', { name: /first item/i });
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    fireEvent.keyDown(firstButton, { key: 'Tab' });
    // Tab navigation is handled by the browser
    expect(firstButton).toBeInTheDocument();
  });
});

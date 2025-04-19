
/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils";
import App from "../App";

describe("Flow: Create and Resume Game", () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("should create a game with 3 players and persist it after reload", async () => {
    const user = userEvent.setup();
    
    // 1. Initial render
    const { unmount } = renderWithProviders(<App />);
    
    // 2. Navigate to setup
    const startButton = await screen.findByText(/Nouvelle partie/i);
    await user.click(startButton);
    
    // 3. Enter player names
    const playerInputs = await screen.findAllByPlaceholderText(/Nom du joueur/i);
    await user.type(playerInputs[0], "Alice");
    await user.type(playerInputs[1], "Bob");
    await user.type(playerInputs[2], "Cara");
    
    // Start game
    const createButton = screen.getByText(/Commencer la partie/i);
    await user.click(createButton);
    
    // 4. Verify Scoreboard appears
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Cara")).toBeInTheDocument();
    
    // Verify localStorage
    const savedGame = JSON.parse(localStorage.getItem("current_dutch_game") || "{}");
    expect(savedGame.players).toHaveLength(3);
    expect(savedGame.players.map((p: any) => p.name)).toEqual(["Alice", "Bob", "Cara"]);
    
    // 5. Simulate reload
    unmount();
    
    // 6. Render again and check persistence
    renderWithProviders(<App />);
    const resumeButton = await screen.findByText(/Reprendre la partie/i);
    await user.click(resumeButton);
    
    // Verify players are still there
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Cara")).toBeInTheDocument();
  });
});

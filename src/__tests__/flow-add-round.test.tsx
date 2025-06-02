
/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils";
import App from "../App";

describe("Flow: Add Round", () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("should add a new round and update scores correctly", async () => {
    const user = userEvent.setup();
    
    // 1. Setup initial game state
    localStorage.setItem("current_dutch_game", JSON.stringify({
      players: [
        { id: "1", name: "Alice", totalScore: 0, rounds: [], avatarColor: "#8B5CF6" },
        { id: "2", name: "Bob", totalScore: 0, rounds: [], avatarColor: "#F97316" },
        { id: "3", name: "Cara", totalScore: 0, rounds: [], avatarColor: "#1EAEDB" }
      ],
      roundHistory: [],
      isGameOver: false,
      scoreLimit: 100
    }));
    
    // Render app and resume game
    renderWithProviders(<App />);
    const resumeButton = await screen.findByText(/Reprendre la partie/i);
    await user.click(resumeButton);
    
    // 2. Click "New Round"
    const newRoundButton = await screen.findByText(/Nouvelle manche/i);
    await user.click(newRoundButton);
    
    // 3. Enter scores
    const scoreInputs = await screen.findAllByPlaceholderText("0");
    await user.type(scoreInputs[0], "5");
    await user.type(scoreInputs[1], "-2");
    await user.type(scoreInputs[2], "-3");
    
    // 4. Submit scores
    const submitButton = screen.getByText(/Ajouter la manche/i);
    await user.click(submitButton);
    
    // Verify round counter
    expect(await screen.findByText(/Manche 1/i)).toBeInTheDocument();
    
    // Verify updated scores in UI
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("-2")).toBeInTheDocument();
    expect(screen.getByText("-3")).toBeInTheDocument();
    
    // Verify localStorage
    const savedGame = JSON.parse(localStorage.getItem("current_dutch_game") || "{}");
    expect(savedGame.roundHistory).toHaveLength(1);
    expect(savedGame.players[0].totalScore).toBe(5);
    expect(savedGame.players[1].totalScore).toBe(-2);
    expect(savedGame.players[2].totalScore).toBe(-3);
  });
});

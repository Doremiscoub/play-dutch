
/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import { ProfessorAvatar } from "@/features/ai-commentator";

describe("UI: Professor Avatar", () => {
  const consoleSpy = vi.spyOn(console, "error");
  
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  it("should render professor avatar without errors", () => {
    render(<ProfessorAvatar size="lg" animate={true} />);
    
    const avatar = screen.getByAltText("Professeur Cartouche");
    expect(avatar).toBeInTheDocument();
    
    // Verify no 404 errors
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("404")
    );
  });

  it("should handle image load error gracefully", () => {
    render(<ProfessorAvatar size="lg" animate={true} />);
    
    const avatar = screen.getByAltText("Professeur Cartouche");
    fireEvent.error(avatar);
    
    // Should switch to fallback image
    const fallbackAvatar = screen.getByAltText("Professeur Cartouche (Fallback)");
    expect(fallbackAvatar).toBeInTheDocument();
  });
});

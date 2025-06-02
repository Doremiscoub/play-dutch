
/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import ProfessorAvatar from "../components/ProfessorAvatar";

describe("UI: Professor Avatar", () => {
  const consoleSpy = vi.spyOn(console, "error");
  
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  it("should render professor image without falling back to emoji", () => {
    render(<ProfessorAvatar message="Test message" />);
    
    const avatar = screen.getByAltText("Professeur Cartouche");
    expect(avatar).toBeInTheDocument();
    
    // Verify no emoji fallback
    const domContent = screen.getByRole("img").parentElement?.textContent || "";
    expect(domContent).not.toContain("👴🏼");
    
    // Verify no 404 errors
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("404")
    );
  });

  it("should handle image load error gracefully", () => {
    render(<ProfessorAvatar message="Test message" />);
    
    const avatar = screen.getByAltText("Professeur Cartouche");
    fireEvent.error(avatar);
    
    // Should switch to fallback image
    expect(avatar.getAttribute("src")).toContain("fallback");
  });
});

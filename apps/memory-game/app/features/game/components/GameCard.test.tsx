import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { GameCard } from "./GameCard";

describe("GameCard", () => {
  test("renders correctly with default props (not flipped, not matched)", () => {
    const mockOnClick = vi.fn();
    render(
      <GameCard
        emoji="🍎"
        isFlipped={false}
        isMatched={false}
        onClick={mockOnClick}
      />,
    );

    // Should render the question mark when not flipped
    expect(screen.getByText("❓")).toBeInTheDocument();

    // Should have the correct styling for not flipped state
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-secondary");
    expect(button).toHaveClass("cursor-pointer");
  });

  test("renders with emoji when flipped", () => {
    const mockOnClick = vi.fn();
    render(
      <GameCard
        emoji="🍎"
        isFlipped={true}
        isMatched={false}
        onClick={mockOnClick}
      />,
    );

    // Should show the emoji when flipped
    expect(screen.getByText("🍎")).toBeInTheDocument();

    // Should have the correct styling for flipped state
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });

  test("renders with emoji when matched but not flipped", () => {
    const mockOnClick = vi.fn();
    render(
      <GameCard
        emoji="🍎"
        isFlipped={false}
        isMatched={true}
        onClick={mockOnClick}
      />,
    );

    // Should show the emoji when matched (even if not flipped)
    expect(screen.getByText("🍎")).toBeInTheDocument();

    // Should have the correct styling for matched state (same as flipped)
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });

  test("triggers onClick when clicked", () => {
    const mockOnClick = vi.fn();
    render(
      <GameCard
        emoji="🍎"
        isFlipped={false}
        isMatched={false}
        onClick={mockOnClick}
      />,
    );

    // Click the button
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Should call the onClick handler
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("doesn't render with group-hover class when flipped", () => {
    const mockOnClick = vi.fn();
    render(
      <GameCard
        emoji="🍎"
        isFlipped={true}
        isMatched={false}
        onClick={mockOnClick}
      />,
    );

    // The value span should not have the hover class when flipped
    const valueSpan = screen.getByText("🍎");
    expect(valueSpan).not.toHaveClass("group-hover:scale-120");
  });

  test("renders with group-hover class when not flipped", () => {
    const mockOnClick = vi.fn();
    render(
      <GameCard
        emoji="🍎"
        isFlipped={false}
        isMatched={false}
        onClick={mockOnClick}
      />,
    );

    // The value span should have the hover class when not flipped
    const valueSpan = screen.getByText("❓");
    expect(valueSpan).toHaveClass("group-hover:scale-120");
  });
});

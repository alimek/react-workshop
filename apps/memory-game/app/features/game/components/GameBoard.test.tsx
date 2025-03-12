import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Card } from "@workshop/interfaces/game";

import * as gameHooks from "../hooks/game";
import { GameBoard } from "./GameBoard";

// Mock for the custom hooks
vi.mock("../hooks/game", () => ({
  useGameSize: vi.fn(),
  useGameCards: vi.fn(),
}));

describe("GameBoard", () => {
  // Common test data
  const mockCards: Card[] = [
    { emoji: "🐶", isFlipped: false, isMatched: false },
    { emoji: "🐱", isFlipped: true, isMatched: false },
    { emoji: "🐶", isFlipped: false, isMatched: true },
    { emoji: "🐱", isFlipped: false, isMatched: false },
  ];
  const mockSize = 2;
  const mockOnCardClick = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    vi.mocked(gameHooks.useGameSize).mockReturnValue(mockSize);
    vi.mocked(gameHooks.useGameCards).mockReturnValue(mockCards);
  });

  it("renders with the correct grid size from useGameSize", () => {
    // Arrange
    render(<GameBoard onCardClick={mockOnCardClick} />);

    // Act
    const gridElement = screen.getByTestId("game-board-grid");

    // Assert
    // Check that the style attribute contains the correct value
    expect(gridElement.getAttribute("style")).toContain(`--size: ${mockSize}`);
    expect(gridElement).toHaveClass("grid-cols-[repeat(var(--size),1fr)]");
    expect(gridElement).toHaveClass("grid-rows-[repeat(var(--size),1fr)]");
  });

  it("renders the correct number of GameCard components", () => {
    // Arrange
    render(<GameBoard onCardClick={mockOnCardClick} />);

    // Act
    const cardButtons = screen.getAllByRole("button");

    // Assert
    expect(cardButtons).toHaveLength(mockCards.length);
  });

  it("passes the correct props to each GameCard", () => {
    // Arrange
    render(<GameBoard onCardClick={mockOnCardClick} />);

    // Act & Assert
    // Get all question marks - there should be two of them (first and fourth cards)
    const questionMarks = screen.getAllByText("❓");
    expect(questionMarks).toHaveLength(2);

    // Get emojis for flipped and matched cards
    expect(screen.getByText("🐱")).toBeInTheDocument(); // Second card (flipped)
    expect(screen.getByText("🐶")).toBeInTheDocument(); // Third card (matched)
  });

  it("calls onCardClick with the correct parameters when a card is clicked", () => {
    // Arrange
    render(<GameBoard onCardClick={mockOnCardClick} />);

    // Act
    const cardButtons = screen.getAllByRole("button");
    fireEvent.click(cardButtons[0]); // Click on the first card

    // Assert
    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
    expect(mockOnCardClick).toHaveBeenCalledWith({
      card: mockCards[0],
      index: 0,
    });
  });

  it("calls onCardClick with the correct parameters when another card is clicked", () => {
    // Arrange
    render(<GameBoard onCardClick={mockOnCardClick} />);

    // Act
    const cardButtons = screen.getAllByRole("button");
    fireEvent.click(cardButtons[3]); // Click on the fourth card

    // Assert
    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
    expect(mockOnCardClick).toHaveBeenCalledWith({
      card: mockCards[3],
      index: 3,
    });
  });

  it("renders correctly when using the context directly (integration test)", () => {
    // Arrange
    const testCards: Card[] = [
      { emoji: "🍎", isFlipped: false, isMatched: false },
      { emoji: "🍌", isFlipped: false, isMatched: false },
    ];
    const testSize = 1;

    // Override the mocks for this test
    vi.mocked(gameHooks.useGameSize).mockReturnValue(testSize);
    vi.mocked(gameHooks.useGameCards).mockReturnValue(testCards);

    // Act
    render(<GameBoard onCardClick={mockOnCardClick} />);

    // Assert
    const gridElement = screen.getByTestId("game-board-grid");
    expect(gridElement.getAttribute("style")).toContain(`--size: ${testSize}`);

    const cardButtons = screen.getAllByRole("button");
    expect(cardButtons).toHaveLength(testCards.length);

    // All cards should show question marks (not flipped)
    const questionMarks = screen.getAllByText("❓");
    expect(questionMarks).toHaveLength(2);
  });
});

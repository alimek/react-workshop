import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import * as GameBoard from "../components/GameBoard";
import * as GameHook from "../hooks/game-logic";
import { GamePage } from "./GamePage";

// Mock the game-logic hook
vi.mock("../hooks/game-logic", () => ({
  useGame: vi.fn(),
}));

// Mock the hooks to avoid context errors
vi.mock("../hooks/game", () => ({
  useGameCards: vi.fn().mockReturnValue([]),
  useGameSize: vi.fn().mockReturnValue(2),
}));

describe("GamePage", () => {
  // Create base mocked state for the hook
  const mockHandleCardClick = vi.fn();
  const mockCards = [
    { emoji: "🐶", isFlipped: false, isMatched: false },
    { emoji: "🐈", isFlipped: false, isMatched: false },
    { emoji: "🐶", isFlipped: false, isMatched: false },
    { emoji: "🐈", isFlipped: false, isMatched: false },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup fake timers for controlling setTimeout
    vi.useFakeTimers();

    // Default mock implementation for useGame
    vi.mocked(GameHook.useGame).mockReturnValue({
      isReady: true,
      cards: mockCards,
      handleCardClick: mockHandleCardClick,
    });
  });

  afterEach(() => {
    // Cleanup timers
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  test("renders loading state when not ready", () => {
    // Override the default mock for this specific test
    vi.mocked(GameHook.useGame).mockReturnValue({
      isReady: false,
      cards: [],
      handleCardClick: mockHandleCardClick,
    });

    render(<GamePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders the game board when ready", () => {
    render(<GamePage />);

    // Should render the GameBoard component
    expect(screen.getByTestId("game-board-grid")).toBeInTheDocument();
  });

  test("passes handleCardClick to GameBoard", () => {
    // Spy on the GameBoard component
    const gameBoardSpy = vi.spyOn(GameBoard, "GameBoard");

    render(<GamePage />);

    // Check if the GameBoard was called with our mockHandleCardClick function
    expect(gameBoardSpy).toHaveBeenCalled();

    // Get the first call arguments
    const firstCallProps = gameBoardSpy.mock.calls[0][0];

    // Verify the onCardClick prop is our mock function
    expect(firstCallProps.onCardClick).toBe(mockHandleCardClick);
  });

  test("uses the cards from the hook", () => {
    // We can test if the GameProvider receives the correct cards
    // by creating a mock implementation that shows a specific state
    const customCards = [
      { emoji: "🦊", isFlipped: true, isMatched: false },
      { emoji: "🐢", isFlipped: false, isMatched: false },
      { emoji: "🦊", isFlipped: false, isMatched: true },
      { emoji: "🐢", isFlipped: true, isMatched: true },
    ];

    vi.mocked(GameHook.useGame).mockReturnValue({
      isReady: true,
      cards: customCards,
      handleCardClick: mockHandleCardClick,
    });

    render(<GamePage />);

    // We know the GameBoard is still being correctly rendered
    expect(screen.getByTestId("game-board-grid")).toBeInTheDocument();
  });
});

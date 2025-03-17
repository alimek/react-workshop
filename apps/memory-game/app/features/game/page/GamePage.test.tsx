import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { useSettingsStoreReady } from "~/lib/store/settings";
import * as GameHook from "../hooks/game-logic";
import { GamePage } from "./GamePage";

// Create a variable to control Suspense behavior in tests
let suspenseShouldFallback = false;

// Mock the game-logic hook
vi.mock("../hooks/game-logic", () => ({
  useGame: vi.fn(),
}));

// Mock the hooks to avoid context errors
vi.mock("../hooks/game", () => ({
  useGameCards: vi.fn().mockReturnValue([]),
}));

vi.mock("~/lib/store/settings", () => ({
  useSettingsStoreReady: vi.fn().mockReturnValue(false),
}));

// Mock React's Suspense to test loading state
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    Suspense: ({
      children,
      fallback,
    }: {
      children: React.ReactNode;
      fallback: React.ReactNode;
    }) => {
      return suspenseShouldFallback ? fallback : children;
    },
  };
});

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
    suspenseShouldFallback = false;

    // Setup fake timers for controlling setTimeout
    vi.useFakeTimers();

    // Default mock implementation for useGame
    vi.mocked(GameHook.useGame).mockReturnValue({
      cards: mockCards,
      size: 2,
      handleCardClick: mockHandleCardClick,
    });
    vi.mocked(useSettingsStoreReady).mockReturnValue(true);
  });

  afterEach(() => {
    // Cleanup timers
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  test("renders loading state when settings are not ready", () => {
    // Override the default mock for this specific test
    vi.mocked(GameHook.useGame).mockReturnValue({
      cards: [],
      size: 2,
      handleCardClick: mockHandleCardClick,
    });

    vi.mocked(useSettingsStoreReady).mockReturnValue(false);

    render(<GamePage />);

    expect(screen.getByText("Loading Settings...")).toBeInTheDocument();
  });

  test("renders the game board when ready", () => {
    // Ensure Suspense shows children, not fallback
    suspenseShouldFallback = false;

    render(<GamePage />);

    // Should render the GameBoard component
    expect(screen.getByTestId("game-board-grid")).toBeInTheDocument();
  });

  test("renders suspense fallback when game is loading", () => {
    // When settings are ready, but Suspense is triggering fallback
    vi.mocked(useSettingsStoreReady).mockReturnValue(true);
    suspenseShouldFallback = true;

    render(<GamePage />);

    expect(screen.getByText("Loading Game...")).toBeInTheDocument();
  });
});

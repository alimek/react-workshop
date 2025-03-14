import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { levelToRevealTime } from "@workshop/interfaces/game";

import { useGameStore } from "./game";

// Mock setTimeout and clearTimeout
vi.useFakeTimers();

describe("Game Store", () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useGameStore.setState({
        timeout: null,
        cards: [],
        level: "easy",
        flippedIndices: [],
      });
    });
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const state = useGameStore.getState();

    expect(state.timeout).toBeNull();
    expect(state.cards).toEqual([]);
    expect(state.level).toBe("easy");
    expect(state.flippedIndices).toEqual([]);
    expect(state.actions).toBeDefined();
  });

  it("should start a game with provided cards and level", () => {
    const { actions } = useGameStore.getState();
    const mockCards = [
      { emoji: "🍎", isFlipped: false, isMatched: false },
      { emoji: "🍎", isFlipped: false, isMatched: false },
    ];

    act(() => {
      actions.startGame(mockCards, "medium");
    });

    const state = useGameStore.getState();
    expect(state.cards).toEqual(mockCards);
    expect(state.level).toBe("medium");
  });

  describe("flipCard action", () => {
    const setupCards = () => [
      { emoji: "🍎", isFlipped: false, isMatched: false },
      { emoji: "🍌", isFlipped: false, isMatched: false },
      { emoji: "🍎", isFlipped: false, isMatched: false },
      { emoji: "🍌", isFlipped: false, isMatched: false },
    ];

    it("should flip a card when it's the first card", () => {
      const { actions } = useGameStore.getState();
      const mockCards = setupCards();

      act(() => {
        actions.startGame(mockCards, "easy");
        actions.flipCard(0);
      });

      const state = useGameStore.getState();
      expect(state.flippedIndices).toEqual([0]);
      expect(state.cards[0].isFlipped).toBe(true);
      expect(state.timeout).not.toBeNull();
    });

    it("should flip back a single card after the reveal time", () => {
      const { actions } = useGameStore.getState();
      const mockCards = setupCards();
      const revealTime = levelToRevealTime.easy * 1000;

      act(() => {
        actions.startGame(mockCards, "easy");
        actions.flipCard(0);
      });

      // Card should be flipped
      expect(useGameStore.getState().cards[0].isFlipped).toBe(true);

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(revealTime);
      });

      // Card should be flipped back
      expect(useGameStore.getState().cards[0].isFlipped).toBe(false);
      expect(useGameStore.getState().flippedIndices).toEqual([]);
    });

    it("should handle matching cards correctly", () => {
      const { actions } = useGameStore.getState();
      const mockCards = setupCards();

      act(() => {
        actions.startGame(mockCards, "easy");
        actions.flipCard(0); // First 🍎
        actions.flipCard(2); // Second 🍎
      });

      const state = useGameStore.getState();
      expect(state.flippedIndices).toEqual([]);
      expect(state.cards[0].isFlipped).toBe(true);
      expect(state.cards[0].isMatched).toBe(true);
      expect(state.cards[2].isFlipped).toBe(true);
      expect(state.cards[2].isMatched).toBe(true);
      expect(state.timeout).toBeNull();
    });

    it("should handle non-matching cards correctly", () => {
      const { actions } = useGameStore.getState();
      const mockCards = setupCards();
      const revealTime = levelToRevealTime.easy * 1000;

      act(() => {
        actions.startGame(mockCards, "easy");
        actions.flipCard(0); // 🍎
        actions.flipCard(1); // 🍌
      });

      // Both cards should be flipped
      const stateAfterFlip = useGameStore.getState();
      expect(stateAfterFlip.flippedIndices).toEqual([0, 1]);
      expect(stateAfterFlip.cards[0].isFlipped).toBe(true);
      expect(stateAfterFlip.cards[1].isFlipped).toBe(true);

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(revealTime);
      });

      // Both cards should be flipped back
      const stateAfterTimeout = useGameStore.getState();
      expect(stateAfterTimeout.flippedIndices).toEqual([]);
      expect(stateAfterTimeout.cards[0].isFlipped).toBe(false);
      expect(stateAfterTimeout.cards[1].isFlipped).toBe(false);
    });

    it("should not flip a card that is already matched", () => {
      const { actions } = useGameStore.getState();
      const mockCards = setupCards();
      mockCards[0].isMatched = true;

      act(() => {
        actions.startGame(mockCards, "easy");
        actions.flipCard(0);
      });

      // State should not change
      const state = useGameStore.getState();
      expect(state.flippedIndices).toEqual([]);
      expect(state.cards).toEqual(mockCards);
    });

    it("should handle more than 2 cards flipped (edge case)", () => {
      const { actions } = useGameStore.getState();
      const mockCards = setupCards();

      // Manually set the state to have 2 flipped cards
      act(() => {
        actions.startGame(mockCards, "easy");
        useGameStore.setState({
          flippedIndices: [0, 1],
          cards: mockCards.map((card, i) =>
            i === 0 || i === 1 ? { ...card, isFlipped: true } : card,
          ),
        });
        actions.flipCard(2);
      });

      // Should reset to just the new card being flipped
      const state = useGameStore.getState();
      expect(state.flippedIndices).toEqual([2]);
      expect(state.cards[0].isFlipped).toBe(false);
      expect(state.cards[1].isFlipped).toBe(false);
      expect(state.cards[2].isFlipped).toBe(true);
    });
  });
});

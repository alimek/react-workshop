import type { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Card } from "@workshop/interfaces/game";

import { GameProvider } from "../context/game";
import { useGameCards, useGameSize } from "./game";

// Mock wrapper for providing context
const createWrapper = (contextSize: number, contextCards: Card[]) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <GameProvider value={{ size: contextSize, cards: contextCards }}>
      {children}
    </GameProvider>
  );
  return Wrapper;
};

describe("Game Hooks", () => {
  describe("useGameSize", () => {
    it("should return the size from context", () => {
      // Arrange
      const expectedSize = 4;
      const wrapper = createWrapper(expectedSize, []);

      // Act
      const { result } = renderHook(() => useGameSize(), { wrapper });

      // Assert
      expect(result.current).toBe(expectedSize);
    });

    it("should use default size when no provider is present", () => {
      // Act
      const { result } = renderHook(() => useGameSize());

      // Assert
      expect(result.current).toBe(2); // Default size is 2
    });
  });

  describe("useGameCards", () => {
    it("should return the cards from context", () => {
      // Arrange
      const expectedCards: Card[] = [
        { emoji: "🐶", isFlipped: false, isMatched: false },
        { emoji: "🐱", isFlipped: true, isMatched: false },
      ];
      const wrapper = createWrapper(2, expectedCards);

      // Act
      const { result } = renderHook(() => useGameCards(), { wrapper });

      // Assert
      expect(result.current).toEqual(expectedCards);
      expect(result.current.length).toBe(2);
    });

    it("should use default empty array when no provider is present", () => {
      // Act
      const { result } = renderHook(() => useGameCards());

      // Assert
      expect(result.current).toEqual([]);
      expect(result.current.length).toBe(0);
    });
  });
});

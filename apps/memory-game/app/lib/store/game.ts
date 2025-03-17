import { create } from "zustand";

import type { Card, Level } from "@workshop/interfaces/game";
import { levelToRevealTime } from "@workshop/interfaces/game";

interface GameStore {
  timeout: NodeJS.Timeout | null;
  cards: Card[];
  level: "easy" | "medium" | "hard";
  flippedIndices: number[];
  actions: {
    flipCard: (index: number) => void;
    startGame: (cards: Card[], level: Level) => void;
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  timeout: null,
  cards: [],
  level: "easy",
  flippedIndices: [],
  actions: {
    flipCard: (index: number) => {
      const { flippedIndices, cards, timeout, level } = get();
      const revealTime = levelToRevealTime[level] * 1000;

      // Don't do anything if the card is already flipped or matched
      if (flippedIndices.includes(index) || cards[index].isMatched) {
        return;
      }

      // Clear any existing timeout
      if (timeout) {
        clearTimeout(timeout);
      }

      // Handle based on how many cards are currently flipped
      switch (flippedIndices.length) {
        case 0: {
          // First card flipped - show it and start timer
          set({
            flippedIndices: [index],
            cards: cards.map((card, i) =>
              i === index ? { ...card, isFlipped: true } : card,
            ),
            timeout: setTimeout(() => {
              set({
                flippedIndices: [],
                cards: cards.map((card, i) =>
                  i === index ? { ...card, isFlipped: false } : card,
                ),
              });
            }, revealTime),
          });
          break;
        }
        case 1: {
          // Second card flipped - check for match
          const firstIndex = flippedIndices[0];
          const isMatch = cards[firstIndex].emoji === cards[index].emoji;

          if (isMatch) {
            // Cards match - mark them as matched
            set({
              flippedIndices: [],
              cards: cards.map((card, i) =>
                i === firstIndex || i === index
                  ? { ...card, isFlipped: true, isMatched: true }
                  : card,
              ),
              timeout: null,
            });
          } else {
            // Cards don't match - flip them back after delay
            set({
              flippedIndices: [...flippedIndices, index],
              cards: cards.map((card, i) =>
                i === index ? { ...card, isFlipped: true } : card,
              ),
              timeout: setTimeout(() => {
                set({
                  flippedIndices: [],
                  cards: cards.map((card, i) =>
                    i === firstIndex || i === index
                      ? { ...card, isFlipped: false }
                      : card,
                  ),
                });
              }, revealTime),
            });
          }
          break;
        }
        default: {
          // More than 2 cards flipped (shouldn't happen normally)
          // Reset to just this card being flipped
          set({
            flippedIndices: [index],
            cards: cards.map((card, i) => {
              if (card.isMatched) return card;
              return i === index
                ? { ...card, isFlipped: true }
                : { ...card, isFlipped: false };
            }),
            timeout: setTimeout(() => {
              set({
                flippedIndices: [],
                cards: cards.map((card, i) =>
                  i === index ? { ...card, isFlipped: false } : card,
                ),
              });
            }, revealTime / 2),
          });
        }
      }
    },
    startGame: (cards, level) => set({ cards, level }),
  },
}));

export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameCards = () => useGameStore((state) => state.cards);
export const useFlippedIndices = () =>
  useGameStore((state) => state.flippedIndices);

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
      console.log("🃏flipCard", index);
      const { flippedIndices, cards, timeout, level } = get();
      const revealTime = levelToRevealTime[level] * 1000;

      console.log("flippedIndices", flippedIndices);
      if (flippedIndices.includes(index)) {
        console.log("card already flipped", flippedIndices);
        return;
      }

      if (timeout) {
        console.log("clearing timeout");
        clearTimeout(timeout);
      }

      if (flippedIndices.length === 0) {
        console.log("first card flipped");
        set((state) => ({
          flippedIndices: [...state.flippedIndices, index],
          cards: state.cards.map((card, i) =>
            i === index ? { ...card, isFlipped: true } : card,
          ),
          timeout: setTimeout(() => {
            set((state) => ({
              flippedIndices: [],
              cards: state.cards.map((card) => ({ ...card, isFlipped: false })),
            }));
          }, revealTime),
        }));
      }

      if (flippedIndices.length === 1) {
        console.log("second card flipped");
        const [firstIndex] = flippedIndices;
        const firstCard = cards[firstIndex];
        const secondCard = cards[index];

        if (firstCard.emoji === secondCard.emoji) {
          console.log("cards matching");

          set((state) => ({
            flippedIndices: [],
            cards: state.cards.map((card, i) =>
              i === firstIndex || i === index
                ? { ...card, isFlipped: true, isMatched: true }
                : card,
            ),
            timeout: null,
          }));
        } else {
          console.log("cards not matching");
          set((state) => ({
            flippedIndices: [...state.flippedIndices, index],
            cards: state.cards.map((card, i) =>
              i === index ? { ...card, isFlipped: true } : card,
            ),
            timeout: setTimeout(() => {
              set((state) => ({
                flippedIndices: [],
                cards: state.cards.map((card, i) =>
                  i === firstIndex || i === index
                    ? { ...card, isFlipped: false }
                    : card,
                ),
              }));
            }, revealTime),
          }));
        }
      }

      if (flippedIndices.length >= 2) {
        console.log("3rd card flipped, clearing");
        set((state) => ({
          flippedIndices: [index],
          cards: state.cards.map((card, i) => {
            if (card.isMatched) {
              return card;
            }
            if (i === index) {
              return { ...card, isFlipped: true };
            }

            return { ...card, isFlipped: false };
          }),
          timeout: setTimeout(() => {
            set((state) => ({
              flippedIndices: [],
              cards: state.cards.map((card, i) =>
                i === index ? { ...card, isFlipped: false } : card,
              ),
            }));
          }, revealTime),
        }));
      }
    },
    startGame: (cards, level) => set({ cards, level }),
  },
}));

export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameCards = () => useGameStore((state) => state.cards);
export const useFlippedIndices = () =>
  useGameStore((state) => state.flippedIndices);

import { useEffect, useRef, useState } from "react";

import type { Card } from "@workshop/interfaces/game";
import { levelToRevealTime } from "@workshop/interfaces/game";

import { useSettingsStore } from "~/lib/store/settings";
import { useGameCards } from "./game";

export const useGame = () => {
  const size = useSettingsStore((state) => state.gridSize);

  const [cards, setCards] = useState<Card[]>([]);
  const level = useSettingsStore((state) => state.level);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const revealTime = levelToRevealTime[level] * 1000;
  const { cards: initialCards } = useGameCards();

  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  // Set timeout when flippedIndices changes
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // If one card is flipped, set a n-second timeout
    if (flippedIndices.length === 1) {
      timeoutRef.current = setTimeout(() => {
        setCards((cards) =>
          cards.map((card, i) =>
            flippedIndices.includes(i) ? { ...card, isFlipped: false } : card,
          ),
        );
        setFlippedIndices([]);
      }, revealTime);
    }
    // If two cards are flipped, check if they match
    else if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      // Check if cards match (have the same emoji)
      if (firstCard.emoji === secondCard.emoji) {
        // If they match, mark them as matched
        setCards((cards) =>
          cards.map((card, i) =>
            flippedIndices.includes(i) ? { ...card, isMatched: true } : card,
          ),
        );
        // Clear flipped indices as we've handled the match
        setFlippedIndices([]);
      } else {
        // If they don't match, set timeout to flip them back
        timeoutRef.current = setTimeout(() => {
          setCards((cards) =>
            cards.map((card, i) =>
              flippedIndices.includes(i) ? { ...card, isFlipped: false } : card,
            ),
          );
          setFlippedIndices([]);
        }, revealTime / 2);
      }
    }
  }, [flippedIndices, cards, revealTime]);

  const handleCardClick = ({ index }: { card: Card; index: number }) => {
    // If the card is already flipped or matched, do nothing
    if (cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    if (flippedIndices.length < 2) {
      // Flip the card that was clicked
      const newCards = cards.map((card, i) => {
        if (i === index) {
          return { ...card, isFlipped: true };
        }
        return card;
      });
      setCards(newCards);
      setFlippedIndices([...flippedIndices, index]);
    } else {
      // If two cards are already flipped, flip them back and flip only the newly clicked card
      const newCards = cards.map((card, i) => {
        if (i === index) {
          return { ...card, isFlipped: true };
        } else if (flippedIndices.includes(i) && !card.isMatched) {
          return { ...card, isFlipped: false };
        }
        return card;
      });
      setCards(newCards);
      setFlippedIndices([index]);
    }
  };

  return {
    cards,
    size,
    handleCardClick,
  };
};

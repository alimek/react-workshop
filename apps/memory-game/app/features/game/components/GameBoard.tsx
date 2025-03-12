import type { CSSProperties } from "react";

import type { Card } from "@workshop/interfaces/game";

import { useGameCards, useGameSize } from "../hooks/game";
import { GameCard } from "./GameCard";

interface Props {
  onCardClick: (params: { card: Card; index: number }) => void;
}

export function GameBoard({ onCardClick }: Props) {
  const size = useGameSize();
  const cards = useGameCards();

  return (
    <div
      data-testid="game-board-grid"
      style={{ "--size": size } as CSSProperties}
      className="grid flex-1 grid-cols-[repeat(var(--size),1fr)] grid-rows-[repeat(var(--size),1fr)] gap-4"
    >
      {cards.map((card, index) => (
        <GameCard
          key={index}
          emoji={card.emoji}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick({ card, index })}
        />
      ))}
    </div>
  );
}

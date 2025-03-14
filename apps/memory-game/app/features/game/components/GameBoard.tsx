import type { CSSProperties } from "react";

import { useGame } from "../hooks/game-logic";
import { GameCard } from "./GameCard";

export function GameBoard() {
  const { handleCardClick, cards, size } = useGame();

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
          onClick={() => handleCardClick({ card, index })}
        />
      ))}
    </div>
  );
}

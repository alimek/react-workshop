import { GameCard } from "./GameCard";

interface Props {
  size: number;
}

export function GameBoard({ size }: Props) {
  return (
    <div className="grid flex-1 grid-cols-4 gap-4">
      {Array.from({ length: size * size }).map((_, index) => (
        <GameCard key={index} emoji="🐶" isFlipped={false} isMatched={false} />
      ))}
    </div>
  );
}

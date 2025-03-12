import { cva } from "class-variance-authority";

import type { Card } from "@workshop/interfaces/game";

const variants = cva(
  "group border-border flex h-full w-full items-center justify-center rounded-xl border p-4 shadow-md",
  {
    variants: {
      flipped: {
        true: "bg-primary",
        false: "bg-secondary",
      },
    },
    defaultVariants: {
      flipped: false,
    },
  },
);

const valueVariants = cva(
  "text-4xl transition-all select-none md:text-[100px]",
  {
    variants: {
      flipped: {
        true: "",
        false: "group-hover:scale-120",
      },
    },
    defaultVariants: {
      flipped: false,
    },
  },
);

export function GameCard({ emoji, isFlipped, isMatched }: Card) {
  const flipped = isFlipped || isMatched;
  const cardValue = flipped ? emoji : "❓";

  return (
    <div className={variants({ flipped })}>
      <span className={valueVariants({ flipped })}>{cardValue}</span>
    </div>
  );
}

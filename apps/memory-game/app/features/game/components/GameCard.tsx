import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
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

export function GameCard({ emoji, isMatched }: Card) {
  const [flipped, setFlipped] = useState(false);

  const isFlipped = flipped || isMatched;
  const cardValue = flipped ? emoji : "❓";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFlipped(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [flipped]);

  const handleOnClick: MouseEventHandler<HTMLDivElement> = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className={variants({ flipped: isFlipped })} onClick={handleOnClick}>
      <span className={valueVariants({ flipped: isFlipped })}>{cardValue}</span>
    </div>
  );
}

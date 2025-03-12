import { createContext } from "react";

import type { Card } from "@workshop/interfaces/game";

interface GameContext {
  size: number;
  cards: Card[];
}

export const gameContext = createContext<GameContext>({
  size: 2,
  cards: [],
});

export const GameProvider = gameContext.Provider;

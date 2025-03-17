import { useEffect } from "react";

import type { Card } from "@workshop/interfaces/game";

import { useGameActions, useGameCards } from "~/lib/store/game";
import { useSettingsGridSize, useSettingsLevel } from "~/lib/store/settings";
import { useGameConfig } from "./game";

export const useGame = () => {
  const size = useSettingsGridSize();
  const level = useSettingsLevel();
  const cards = useGameCards();

  const { startGame, flipCard } = useGameActions();
  const { cards: initialCards } = useGameConfig();

  useEffect(() => {
    startGame(initialCards, level);
  }, [initialCards, level, startGame]);

  const handleCardClick = ({ index }: { card: Card; index: number }) => {
    flipCard(index);
  };

  return {
    cards,
    size,
    handleCardClick,
  };
};

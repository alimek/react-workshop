import { useContext } from "react";

import { gameContext } from "../context/game";

export const useGameSize = () => {
  const { size } = useContext(gameContext);
  return size;
};

export const useGameCards = () => {
  const { cards } = useContext(gameContext);
  return cards;
};

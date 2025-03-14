import { useSuspenseQuery } from "@tanstack/react-query";

import type { Card } from "@workshop/interfaces/game";

import { useSettingsStore } from "~/lib/store/settings";

const getGameBoard = async (size: number, delay: number) => {
  const response = await fetch(
    `http://localhost:4000/api/game/config?size=${size}&delay=${delay}`,
  );
  const data = (await response.json()) as { board: Card[] };

  return data.board;
};

export const useGameCards = (delay = 0) => {
  const size = useSettingsStore((state) => state.gridSize);

  const { data, ...other } = useSuspenseQuery({
    queryKey: ["gameCards", size, delay],
    queryFn: () => getGameBoard(size, delay),
  });

  return {
    cards: data,
    ...other,
  };
};

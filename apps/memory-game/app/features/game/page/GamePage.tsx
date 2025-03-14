import { GameBoard } from "../components/GameBoard";
import { GameProvider } from "../context/game";
import { useGame } from "../hooks/game-logic";

export function GamePage() {
  const { isReady, cards, handleCardClick } = useGame();

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <GameProvider value={{ size: 2, cards }}>
      <GameBoard onCardClick={handleCardClick} />
    </GameProvider>
  );
}

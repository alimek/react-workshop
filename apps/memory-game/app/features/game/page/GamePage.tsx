import { Suspense } from "react";

import { useSettingsStoreReady } from "~/lib/store/settings";
import { GameBoard } from "../components/GameBoard";

export function GamePage() {
  const isReady = useSettingsStoreReady();

  if (!isReady) {
    return <div>Loading Settings...</div>;
  }

  return (
    <Suspense fallback={<div>Loading Game...</div>}>
      <GameBoard />
    </Suspense>
  );
}

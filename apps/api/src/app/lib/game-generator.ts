import type { Card } from "@workshop/interfaces/game";
import { emojis } from "@workshop/interfaces/game";

export function generateBoard(size: number) {
  // We need pairs of emojis, so take half the board size
  const numPairs = (size * size) / 2;

  // Get random emojis for pairs by repeating the array if needed
  const neededEmojis = emojis.slice();
  while (neededEmojis.length < numPairs) {
    neededEmojis.push(...emojis);
  }

  // Take exactly the number of pairs we need and double them
  const selectedEmojis = neededEmojis
    .slice(0, numPairs)
    .flatMap((emoji) => [emoji, emoji]); // Double each emoji for pairs

  // Shuffle the emojis
  const shuffledEmojis = selectedEmojis.sort(() => Math.random() - 0.5);

  // Create the board grid
  const board: Card[] = [];
  let emojiIndex = 0;

  for (let i = 0; i < size * size; i++) {
    const emoji = shuffledEmojis[emojiIndex++];

    if (!emoji) {
      throw new Error("Not enough emojis to generate board");
    }

    board.push({
      emoji,
      isFlipped: false,
      isMatched: false,
    });
  }

  return board;
}

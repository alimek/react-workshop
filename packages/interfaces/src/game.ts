export const boardSizes = [2, 4, 6, 8, 10] as const;
export const levels = ["easy", "medium", "hard"] as const;
export const levelToRevealTime = {
  easy: 10,
  medium: 4,
  hard: 1,
} as const satisfies Record<(typeof levels)[number], number>;
export type Level = (typeof levels)[number];
export type BoardSize = (typeof boardSizes)[number];

export interface GameConfig {
  /**
   * Number of rows and columns
   */
  boardSize: number;
  /**
   * level of difficulty, affects the number of cards and the time to reveal a card
   */
  level: Level;
}

export const defaultGameConfig: GameConfig = {
  boardSize: 2,
  level: "easy",
};

export interface Card {
  /**
   * The emoji to display on the card
   */
  emoji: string;
  /**
   * Whether the card is flipped
   */
  isFlipped: boolean;
  /**
   * Whether the card is matched
   */
  isMatched: boolean;
}

export const emojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐣",
  "🐥",
  "🐺",
  "🐗",
  "🐴",
  "🐝",
  "🐛",
  "🐜",
  "🐞",
  "🐾",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐣",
  "🐥",
  "🐺",
] as const;

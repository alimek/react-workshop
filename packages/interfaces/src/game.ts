export interface GameConfig {
  /**
   * Number of rows and columns
   */
  boardSize: number;
  /**
   * level of difficulty, affects the number of cards and the time to reveal a card
   */
  level: "easy" | "medium" | "hard";
}

export const boardSizes = [2, 4, 6, 8, 10] as const;
export const levels = ["easy", "medium", "hard"] as const;
export const levelToRevealTime = {
  easy: 3,
  medium: 5,
  hard: 10,
} as const satisfies Record<(typeof levels)[number], number>;

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

export interface GameConfig {
  /**
   * Number of rows and columns
   */
  boardSize: number;
  /**
   * Time in seconds
   */
  revealTime: number;
}

export const defaultGameConfig: GameConfig = {
  boardSize: 2,
  revealTime: 3,
};

export interface Card {
  /**
   * The emoji to display on the card
   */
  emoji: string;
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

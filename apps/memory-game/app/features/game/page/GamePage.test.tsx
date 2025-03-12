import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { GamePage } from "./GamePage";

test("GamePage", () => {
  render(<GamePage />);

  expect(screen.getByText("GamePage")).toBeInTheDocument();
});

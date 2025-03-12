import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { SettingsPage } from "./SettingsPage";

test("SettingsPage", () => {
  render(<SettingsPage />);

  expect(screen.getByText("SettingsPage")).toBeInTheDocument();
});
